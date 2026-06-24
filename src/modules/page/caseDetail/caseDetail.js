
import { LightningElement } from 'lwc';
import { getCurrentRoute, navigate } from '../../../router';
import { getCaseById, CASE_STAGES, CASE_STAGES_BY_TYPE } from 'data/cases';

const GENERAL_FIELDS = [
    { key: 'caseNumber', label: 'Número do caso' },
    { key: 'status', label: 'Status' },
    { key: 'priority', label: 'Prioridade' },
    { key: 'type', label: 'Tipo de caso' },
    { key: 'reason', label: 'Motivo' },
    { key: 'origin', label: 'Canal de abertura' }
];

const CONTACT_FIELDS = [
    { key: 'contactName', label: 'Contato' },
    { key: 'contactTitle', label: 'Cargo' },
    { key: 'accountName', label: 'Conta' },
    { key: 'contactEmail', label: 'E-mail' },
    { key: 'contactPhone', label: 'Telefone' }
];

const SYSTEM_FIELDS = [
    { key: 'ownerName', label: 'Responsável' },
    { key: 'dateOpened', label: 'Data de abertura' },
    { key: 'dateModified', label: 'Última modificação' },
    { key: 'escalatedLabel', label: 'Escalado' },
    { key: 'slaText', label: 'Status do SLA' }
];

const HISTORY_COLUMNS = ['Data', 'Usuário', 'Campo', 'Valor original', 'Novo valor'];

export default class CaseDetail extends LightningElement {
    record = null;
    activeTab = 'feed';
    composerTab = 'post';
    feedFilter = 'all';
    feedComment = '';
    feedSort = 'recent';
    feedSearch = '';
    _sections = { general: true, contact: true, system: false };

    connectedCallback() {
        const route = getCurrentRoute();
        const id = route?.params?.id;
        if (id) {
            this.record = getCaseById(id);
        }
    }

    get hasCase() {
        return this.record !== null;
    }

    get caseTitle() {
        return this.record?.subject || 'Unknown Case';
    }

    get caseNumberLabel() {
        return this.record ? `Caso ${this.record.caseNumber}` : '';
    }

    // --- Highlights panel detail strip ---
    get headerFields() {
        if (!this.record) return [];
        return [
            { key: 'contact', label: 'Contato', value: this.record.contactName },
            { key: 'account', label: 'Conta', value: this.record.accountName },
            { key: 'origin', label: 'Canal', value: this.record.origin },
            { key: 'owner', label: 'Responsável', value: this.record.ownerName },
            { key: 'opened', label: 'Data de abertura', value: this.record.dateOpened }
        ];
    }

    get priority() {
        return this.record?.priority || '';
    }

    get status() {
        return this.record?.status || '';
    }

    get caseTypeLabel() {
        return this.record?.caseType || '';
    }

    get priorityClass() {
        const level = (this.record?.priority || '').toLowerCase();
        return `c-priority c-priority_${level}`;
    }

    // --- Collapsible info sections (right column) ---
    get description() {
        return this.record?.description || '';
    }

    _fieldValue(key) {
        if (!this.record) return '';
        if (key === 'escalatedLabel') return this.record.isEscalated ? 'Sim' : 'Não';
        return this.record[key];
    }

    _mapFields(defs) {
        return defs.map((f) => ({ ...f, value: this._fieldValue(f.key) }));
    }

    get generalFields() {
        return this._mapFields(GENERAL_FIELDS);
    }

    get contactInfoFields() {
        return this._mapFields(CONTACT_FIELDS);
    }

    get systemFields() {
        return this._mapFields(SYSTEM_FIELDS);
    }

    _sectionMeta(key, label) {
        const open = !!this._sections[key];
        return {
            key,
            label,
            open,
            wrapperClass: `slds-section${open ? ' slds-is-open' : ''}`,
            icon: open ? 'utility:chevrondown' : 'utility:chevronright'
        };
    }

    get generalSection() {
        return this._sectionMeta('general', 'Informações gerais');
    }

    get contactSection() {
        return this._sectionMeta('contact', 'Informações de contato');
    }

    get systemSection() {
        return this._sectionMeta('system', 'Informações de sistema');
    }

    // --- Path ---
    get pathStages() {
        if (!this.record) return [];
        const stages =
            CASE_STAGES_BY_TYPE[this.record.caseType] ||
            CASE_STAGES_BY_TYPE.Queixas;
        const statusIndexMap = { New: 0, Working: 1, Escalated: 2, Closed: 3 };
        const currentIndex = statusIndexMap[this.record.status] ?? 0;
        return stages.map((label, index) => {
            const isComplete = index < currentIndex;
            const isCurrent = index === currentIndex;
            let itemClass = 'slds-path__item';
            if (isComplete) {
                itemClass += ' slds-is-complete';
            } else if (isCurrent) {
                itemClass += ' slds-is-current slds-is-active';
            } else {
                itemClass += ' slds-is-incomplete';
            }
            return {
                key: label,
                label,
                itemClass,
                isComplete,
                isCurrent,
                ariaSelected: isCurrent ? 'true' : 'false',
                tabIndex: isCurrent ? '0' : '-1'
            };
        });
    }

    get isClosed() {
        return this.record?.status === 'Closed';
    }

    get markCompleteLabel() {
        return this.isClosed ? 'Encerrado' : 'Avançar status';
    }

    // --- Milestones (right column) ---
    get milestones() {
        if (!this.record) return [];
        const s = this.record.slaStatus;
        const resolutionDetailClass =
            s === 'overdue'
                ? 'c-sla-tile__detail c-sla-tile__detail_overdue'
                : s === 'met'
                  ? 'c-sla-tile__detail c-sla-tile__detail_done'
                  : 'c-sla-tile__detail';
        return [
            {
                id: 'm1',
                label: 'Primeira resposta',
                detail: 'Meta: 2h · concluída no prazo',
                detailClass: 'c-sla-tile__detail c-sla-tile__detail_done'
            },
            {
                id: 'm2',
                label: 'Tempo de resolução',
                detail: this.record.slaText,
                detailClass: resolutionDetailClass
            }
        ];
    }

    // --- SLA scoped notification ---
    get slaText() {
        return this.record?.slaText || '';
    }

    get slaNotificationClass() {
        const base = 'slds-scoped-notification slds-media slds-media_center';
        const status = this.record?.slaStatus;
        if (status === 'overdue') return `${base} slds-theme_error`;
        if (status === 'met') return `${base} slds-theme_success`;
        if (status === 'ontrack') return `${base} slds-scoped-notification_light`;
        return `${base} slds-scoped-notification_light`;
    }

    get slaIconName() {
        const status = this.record?.slaStatus;
        if (status === 'overdue') return 'utility:error';
        if (status === 'met') return 'utility:success';
        return 'utility:clock';
    }

    get slaIconVariant() {
        const status = this.record?.slaStatus;
        return status === 'overdue' || status === 'met' ? 'inverse' : '';
    }

    // --- Related data ---
    get activityItems() {
        return this.record?.activity || [];
    }

    get comments() {
        return this.record?.comments || [];
    }

    get emails() {
        return this.record?.emails || [];
    }

    get relatedCases() {
        return this.record?.relatedCases || [];
    }

    get knowledgeArticles() {
        return this.record?.knowledgeArticles || [];
    }

    get commentsTitle() {
        return `Comentários (${this.comments.length})`;
    }

    get knowledgeTitle() {
        return `Base de conhecimento (${this.knowledgeArticles.length})`;
    }

    get relatedCasesTitle() {
        return `Casos relacionados (${this.relatedCases.length})`;
    }

    get emailsTitle() {
        return `E-mails (${this.emails.length})`;
    }

    get hasRelatedCases() {
        return this.relatedCases.length > 0;
    }

    // --- Histórico do caso (table) ---
    get historyColumns() {
        return HISTORY_COLUMNS;
    }

    get caseHistory() {
        return this.record?.caseHistory || [];
    }

    // --- Arquivos ---
    get files() {
        return (this.record?.files || []).map((f) => ({
            ...f,
            iconName:
                f.fileType === 'PDF'
                    ? 'doctype:pdf'
                    : f.fileType === 'Imagem'
                      ? 'doctype:image'
                      : 'doctype:unknown',
            metaText: `${f.fileType} \u2022 ${f.size} \u2022 ${f.date}`
        }));
    }

    get filesTitle() {
        return `Arquivos (${this.files.length})`;
    }

    get hasFiles() {
        return this.files.length > 0;
    }

    // --- Related tab nested-card titles ---
    get nestedCasesTitle() {
        return `Casos (${this.relatedCases.length})`;
    }

    get nestedFilesTitle() {
        return `Arquivos (${this.files.length})`;
    }

    // --- Knowledge sugerido (Relacionado) ---
    get suggestedArticles() {
        return (this.record?.knowledgeArticles || []).map((a, idx) => ({
            ...a,
            number: a.number || String(1296 + idx).padStart(9, '0'),
            publishedDate: a.publishedDate || '24/12/2025'
        }));
    }

    get suggestedTitle() {
        return `Artigos sugeridos (${this.suggestedArticles.length})`;
    }

    get suggestedCountMeta() {
        const n = this.suggestedArticles.length;
        return `${n} resultado${n !== 1 ? 's' : ''} \u00b7 Ordenando por Relev\u00e2ncia`;
    }

    // --- Conversa (e-mails + notas internas) ---
    get conversation() {
        const emails = (this.record?.emails || []).map((e) => ({
            id: `e-${e.id}`,
            author: e.from,
            channel: 'E-mail',
            date: e.date,
            body: e.subject,
            iconName: 'standard:email'
        }));
        const comments = (this.record?.comments || []).map((c) => ({
            id: `c-${c.id}`,
            author: c.author,
            channel: 'Nota interna',
            date: c.date,
            body: c.body,
            iconName: 'standard:log_a_call'
        }));
        return [...emails, ...comments];
    }

    get hasConversation() {
        return this.conversation.length > 0;
    }

    // --- Tabs (SLDS default tabs blueprint, driven by activeTab) ---
    get tabs() {
        const items = [
            { value: 'feed', label: 'Feed' },
            { value: 'related', label: 'Relacionado' }
        ];
        return items.map((t) => {
            const active = t.value === this.activeTab;
            return {
                ...t,
                itemClass: active
                    ? 'slds-tabs_default__item slds-is-active'
                    : 'slds-tabs_default__item',
                contentId: `tab-${t.value}`,
                ariaSelected: active ? 'true' : 'false',
                tabIndex: active ? '0' : '-1',
            };
        });
    }

    _contentClass(value) {
        return this.activeTab === value
            ? 'slds-tabs_default__content slds-show'
            : 'slds-tabs_default__content slds-hide';
    }

    get feedContentClass() {
        return this._contentClass('feed');
    }

    get relatedContentClass() {
        return this._contentClass('related');
    }

    // --- Handlers ---
    handleMarkComplete() {
        if (!this.record || this.isClosed) return;
        const currentIndex = CASE_STAGES.indexOf(this.record.status);
        const nextStatus = CASE_STAGES[currentIndex + 1];
        if (nextStatus) {
            this.record = { ...this.record, status: nextStatus };
        }
    }

    handleStageClick(event) {
        event.preventDefault();
        const stage = event.currentTarget.dataset.stage;
        if (stage && this.record) {
            this.record = { ...this.record, status: stage };
        }
    }

    handleTabSelect(event) {
        event.preventDefault();
        const tab = event.currentTarget.dataset.tab;
        if (tab) {
            this.activeTab = tab;
        }
    }

    handleSection(event) {
        const key = event.currentTarget.dataset.section;
        if (key) {
            this._sections = { ...this._sections, [key]: !this._sections[key] };
        }
    }

    handleFeedChange(event) {
        this.feedComment = event.detail.value;
    }

    handleFeedShare() {
        this.feedComment = '';
    }

    // --- Compositor: Publicar | Enquete ---
    get composerTabs() {
        const items = [
            { value: 'post', label: 'Publicar' },
            { value: 'poll', label: 'Enquete' }
        ];
        return items.map((t) => {
            const active = t.value === this.composerTab;
            return {
                ...t,
                itemClass: active
                    ? 'slds-tabs_scoped__item slds-is-active'
                    : 'slds-tabs_scoped__item',
                ariaSelected: active ? 'true' : 'false',
                tabIndex: active ? '0' : '-1'
            };
        });
    }

    handleComposerTab(event) {
        event.preventDefault();
        const value = event.currentTarget.dataset.composer;
        if (value) {
            this.composerTab = value;
        }
    }

    // --- Filtros do feed (Todas / Chamadas / Publicações / Status) ---
    get feedFilters() {
        const items = [
            { value: 'all', label: 'Todas as atualizações' },
            { value: 'calls', label: 'Registros de chamadas' },
            { value: 'posts', label: 'Publicações' },
            { value: 'status', label: 'Mudanças de status' }
        ];
        return items.map((t) => {
            const active = t.value === this.feedFilter;
            return {
                ...t,
                itemClass: active
                    ? 'slds-tabs_default__item slds-is-active'
                    : 'slds-tabs_default__item',
                ariaSelected: active ? 'true' : 'false',
                tabIndex: active ? '0' : '-1'
            };
        });
    }

    handleFeedFilter(event) {
        event.preventDefault();
        const value = event.currentTarget.dataset.filter;
        if (value) {
            this.feedFilter = value;
        }
    }

    // --- Publicações do feed (estilo Chatter) ---
    get feedPosts() {
        return (this.record?.comments || []).map((c) => ({
            id: c.id,
            author: c.author,
            date: c.date,
            body: c.body,
            recipient: 'Para: Interno',
            initials: this._initials(c.author)
        }));
    }

    _initials(name) {
        if (!name) return '';
        return name
            .split(' ')
            .filter(Boolean)
            .slice(0, 2)
            .map((w) => w[0])
            .join('')
            .toUpperCase();
    }

    get feedSortOptions() {
        return [
            { label: 'Atividade mais recente', value: 'recent' },
            { label: 'Atividade mais antiga', value: 'oldest' },
            { label: 'Prioridade', value: 'priority' }
        ];
    }

    get feedSortLabel() {
        const opt = this.feedSortOptions.find((o) => o.value === this.feedSort);
        return opt ? opt.label : 'Atividade mais recente';
    }

    handleFeedSort(event) {
        this.feedSort = event.detail.value;
    }

    handleFeedSearch(event) {
        this.feedSearch = event.detail.value;
    }

    handleRelatedCaseClick(event) {
        event.preventDefault();
        const id = event.currentTarget.dataset.id;
        if (id) {
            navigate(`/cases/${id}`);
        }
    }

    handleBackToList() {
        navigate('/cases');
    }
}
