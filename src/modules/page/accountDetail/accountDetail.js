import { LightningElement } from 'lwc';
import { getCurrentRoute, navigate } from '../../../router';
import { getAccountById, formatCurrencyCompact } from 'data/accounts';

/** Normalize a string to a CSS-safe lowercase token. */
function toCssToken(str) {
    return (str || '')
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g, '-');
}

/** PT-BR labels for the English sales-stage keys stored in the mock data. */
const OPP_STAGE_LABELS = {
    Prospecting: 'Prospecção',
    Qualification: 'Qualificação',
    Proposal: 'Proposta',
    Negotiation: 'Negociação',
    'Closed Won': 'Ganha',
    'Closed Lost': 'Perdida',
};

/** fileType → doctype icon used by the Arquivos related list. */
const FILE_ICONS = {
    PDF: 'doctype:pdf',
    Planilha: 'doctype:excel',
    Imagem: 'doctype:image',
    Documento: 'doctype:word',
};

/**
 * page-account-detail — Compra Agora B2B account record page.
 *
 * Console 2-column layout (follows the caseDetail pattern):
 *   Left  (8/12 ≈ 66%): tabs — Relacionado | Detalhes
 *     · Relacionado: Contatos, Oportunidades, Casos, Arquivos, Parceiros
 *     · Detalhes: account field sections
 *   Right (4/12 ≈ 33%): tabs — Atividade | Chatter
 *
 * Handles both Business Accounts (CNPJ, related contacts) and Personal
 * Accounts (CPF, individual details surfaced in the Detalhes tab).
 */
export default class AccountDetail extends LightningElement {
    record = null;
    activeTab = 'related';
    activeSideTab = 'activity';
    composerTab = 'post';
    _sections = { info: true, address: true, financial: true, person: true };
    feedFilter = 'all';
    feedComment = '';
    feedSort = 'recent';
    feedSearch = '';

    connectedCallback() {
        const route = getCurrentRoute();
        const id = route?.params?.id;
        if (id) {
            this.record = getAccountById(id);
        }
    }

    // ---------------------------------------------------------------------------
    // Identity / type
    // ---------------------------------------------------------------------------

    get hasAccount() {
        return this.record !== null;
    }

    get isPersonAccount() {
        return this.record?.type === 'PersonAccount';
    }

    get iconName() {
        return this.isPersonAccount ? 'standard:person_account' : 'standard:account';
    }

    get accountTitle() {
        return this.record?.name || 'Conta desconhecida';
    }

    get accountTypeLabel() {
        return this.isPersonAccount ? 'Conta Pessoal' : 'Conta Empresarial';
    }

    get accountTypeBadgeClass() {
        return this.isPersonAccount
            ? 'c-type-badge c-type-badge_person'
            : 'c-type-badge c-type-badge_business';
    }

    get statusLabel() {
        return this.record?.status || '';
    }

    get statusClass() {
        return `c-status c-status_${toCssToken(this.record?.status || '')}`;
    }

    get tierLabel() {
        return this.record?.loyaltyTier || '';
    }

    get tierClass() {
        return `c-tier c-tier_${toCssToken(this.record?.loyaltyTier || '')}`;
    }

    // ---------------------------------------------------------------------------
    // Page-header highlight strip
    // ---------------------------------------------------------------------------

    get headerFields() {
        if (!this.record) return [];
        const r = this.record;
        return [
            {
                key: 'doc',
                label: this.isPersonAccount ? 'CPF' : 'CNPJ',
                value: this.isPersonAccount ? r.cpf : r.cnpj,
            },
            { key: 'segment', label: 'Segmento', value: r.segment },
            { key: 'city', label: 'Localização', value: `${r.city}, ${r.state}` },
            { key: 'gmv', label: 'GMV (30 dias)', value: formatCurrencyCompact(r.gmvLast30 || 0) },
            { key: 'csat', label: 'CSAT', value: `${r.csat} / 5.0` },
        ];
    }

    // ---------------------------------------------------------------------------
    // Left tabs (Relacionado | Detalhes)
    // ---------------------------------------------------------------------------

    get tabs() {
        const items = [
            { value: 'related', label: 'Relacionado' },
            { value: 'details', label: 'Detalhes' },
        ];
        return items.map((t) => {
            const active = t.value === this.activeTab;
            return {
                ...t,
                itemClass: active
                    ? 'slds-tabs_default__item slds-is-active'
                    : 'slds-tabs_default__item',
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

    get relatedContentClass() {
        return this._contentClass('related');
    }

    get detailsContentClass() {
        return this._contentClass('details');
    }

    // ---------------------------------------------------------------------------
    // Relacionado tab — Contatos
    // ---------------------------------------------------------------------------

    get contacts() {
        return (this.record?.contacts || []).map((c) => ({
            ...c,
            initials: this._initials(c.name),
        }));
    }

    get hasContacts() {
        return this.contacts.length > 0;
    }

    get contactsTitle() {
        return `Contatos (${this.record?.contacts?.length || 0})`;
    }

    // ---------------------------------------------------------------------------
    // Relacionado tab — Oportunidades
    // ---------------------------------------------------------------------------

    get opportunities() {
        return (this.record?.opportunities || []).map((o) => ({
            ...o,
            stageLabel: OPP_STAGE_LABELS[o.stage] || o.stage,
            stageClass: `c-opp-stage c-opp-stage_${toCssToken(o.stage)}`,
            amountLabel: formatCurrencyCompact(o.amount || 0),
        }));
    }

    get hasOpportunities() {
        return this.opportunities.length > 0;
    }

    get opportunitiesTitle() {
        return `Oportunidades (${this.record?.opportunities?.length || 0})`;
    }

    // ---------------------------------------------------------------------------
    // Relacionado tab — Casos
    // ---------------------------------------------------------------------------

    get cases() {
        return (this.record?.cases || []).map((c) => ({
            ...c,
            priorityClass: `c-priority c-priority_${toCssToken(c.priority || '')}`,
            slaOverdue: c.slaStatus === 'overdue',
        }));
    }

    get hasCases() {
        return this.cases.length > 0;
    }

    get casesTitle() {
        return `Casos (${this.record?.cases?.length || 0})`;
    }

    // ---------------------------------------------------------------------------
    // Relacionado tab — Arquivos
    // ---------------------------------------------------------------------------

    get files() {
        return (this.record?.files || []).map((f) => ({
            ...f,
            iconName: FILE_ICONS[f.fileType] || 'doctype:unknown',
            metaText: `${f.fileType} \u2022 ${f.size} \u2022 ${f.date}`,
        }));
    }

    get hasFiles() {
        return this.files.length > 0;
    }

    get filesTitle() {
        return `Arquivos (${this.record?.files?.length || 0})`;
    }

    // ---------------------------------------------------------------------------
    // Relacionado tab — Parceiros
    // ---------------------------------------------------------------------------

    get partners() {
        return (this.record?.partners || []).map((p) => ({
            ...p,
            metaText: `${p.role} \u2022 ${p.type}`,
        }));
    }

    get hasPartners() {
        return this.partners.length > 0;
    }

    get partnersTitle() {
        return `Parceiros (${this.record?.partners?.length || 0})`;
    }

    // ---------------------------------------------------------------------------
    // Detalhes tab — field sections (collapsible)
    // ---------------------------------------------------------------------------

    handleSection(event) {
        const key = event.currentTarget.dataset.section;
        if (key) {
            this._sections = { ...this._sections, [key]: !this._sections[key] };
        }
    }

    _sectionMeta(key, label) {
        const open = !!this._sections[key];
        return {
            key,
            label,
            open,
            icon: open ? 'utility:chevrondown' : 'utility:chevronright',
        };
    }

    get detailSections() {
        if (!this.record) return [];
        const r = this.record;
        const sections = [
            {
                ...this._sectionMeta('info', 'Informações da conta'),
                fields: [
                    { key: 'name', label: 'Nome da conta', value: r.name },
                    { key: 'doc', label: this.isPersonAccount ? 'CPF' : 'CNPJ', value: this.isPersonAccount ? r.cpf : r.cnpj },
                    { key: 'type', label: 'Tipo', value: this.accountTypeLabel },
                    { key: 'segment', label: 'Segmento', value: r.segment },
                    { key: 'industry', label: 'Setor', value: r.industry },
                    { key: 'owner', label: 'Responsável', value: r.ownerName },
                    { key: 'status', label: 'Status', value: r.status },
                    { key: 'activation', label: 'Data de ativação', value: r.activationDate || 'Pendente' },
                ],
            },
        ];

        if (this.isPersonAccount) {
            sections.push({
                ...this._sectionMeta('person', 'Dados pessoais'),
                fields: [
                    { key: 'first', label: 'Nome', value: r.personFirstName },
                    { key: 'last', label: 'Sobrenome', value: r.personLastName },
                    { key: 'birth', label: 'Data de nascimento', value: r.birthDate },
                ],
            });
        }

        sections.push({
            ...this._sectionMeta('address', 'Endereço e contato'),
            fields: [
                { key: 'address', label: 'Endereço', value: r.address },
                { key: 'city', label: 'Cidade', value: r.city },
                { key: 'state', label: 'Estado', value: r.state },
                { key: 'phone', label: 'Telefone', value: r.phone },
                { key: 'email', label: 'E-mail', value: r.email },
                { key: 'website', label: 'Website', value: r.website || '\u2014' },
            ],
        });

        sections.push({
            ...this._sectionMeta('financial', 'Dados financeiros'),
            fields: [
                { key: 'tier', label: 'Tier de fidelidade', value: r.loyaltyTier },
                { key: 'gmv', label: 'GMV (30 dias)', value: formatCurrencyCompact(r.gmvLast30 || 0) },
                { key: 'orders', label: 'Pedidos (30 dias)', value: String(r.ordersLast30 || 0) },
                { key: 'csat', label: 'CSAT', value: `${r.csat} / 5.0` },
                { key: 'limit', label: 'Limite de crédito', value: formatCurrencyCompact(r.creditLimit || 0) },
                { key: 'used', label: 'Crédito utilizado', value: formatCurrencyCompact(r.creditUsed || 0) },
            ],
        });

        return sections;
    }

    // ---------------------------------------------------------------------------
    // Right tabs (Atividade | Chatter)
    // ---------------------------------------------------------------------------

    get sideTabs() {
        const items = [
            { value: 'activity', label: 'Atividade' },
            { value: 'chatter', label: 'Chatter' },
        ];
        return items.map((t) => {
            const active = t.value === this.activeSideTab;
            return {
                ...t,
                itemClass: active
                    ? 'slds-tabs_default__item slds-is-active'
                    : 'slds-tabs_default__item',
                ariaSelected: active ? 'true' : 'false',
                tabIndex: active ? '0' : '-1',
            };
        });
    }

    _sideContentClass(value) {
        return this.activeSideTab === value
            ? 'slds-tabs_default__content slds-show'
            : 'slds-tabs_default__content slds-hide';
    }

    get activityContentClass() {
        return this._sideContentClass('activity');
    }

    get chatterContentClass() {
        return this._sideContentClass('chatter');
    }

    get activityItems() {
        return this.record?.activity || [];
    }

    // ---------------------------------------------------------------------------
    // Chatter — composer / toolbar / filters / posts
    // ---------------------------------------------------------------------------

    get composerTabs() {
        const items = [
            { value: 'post', label: 'Publicar' },
            { value: 'poll', label: 'Enquete' },
        ];
        return items.map((t) => {
            const active = t.value === this.composerTab;
            return {
                ...t,
                itemClass: active
                    ? 'slds-tabs_scoped__item slds-is-active'
                    : 'slds-tabs_scoped__item',
                ariaSelected: active ? 'true' : 'false',
                tabIndex: active ? '0' : '-1',
            };
        });
    }

    get feedFilters() {
        const items = [
            { value: 'all', label: 'Todas as atualizações' },
            { value: 'posts', label: 'Publicações' },
            { value: 'status', label: 'Mudanças de status' },
        ];
        return items.map((t) => {
            const active = t.value === this.feedFilter;
            return {
                ...t,
                itemClass: active
                    ? 'slds-tabs_default__item slds-is-active'
                    : 'slds-tabs_default__item',
                ariaSelected: active ? 'true' : 'false',
                tabIndex: active ? '0' : '-1',
            };
        });
    }

    get feedPosts() {
        return (this.record?.posts || []).map((p) => ({
            id: p.id,
            author: p.author,
            date: p.date,
            body: p.body,
            recipient: 'Para: Interno',
            initials: this._initials(p.author),
        }));
    }

    get hasFeedPosts() {
        return this.feedPosts.length > 0;
    }

    get feedSortOptions() {
        return [
            { label: 'Atividade mais recente', value: 'recent' },
            { label: 'Atividade mais antiga', value: 'oldest' },
        ];
    }

    get feedSortLabel() {
        const opt = this.feedSortOptions.find((o) => o.value === this.feedSort);
        return opt ? opt.label : 'Atividade mais recente';
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

    // ---------------------------------------------------------------------------
    // Handlers
    // ---------------------------------------------------------------------------

    handleTabSelect(event) {
        event.preventDefault();
        const tab = event.currentTarget.dataset.tab;
        if (tab) this.activeTab = tab;
    }

    handleSideTabSelect(event) {
        event.preventDefault();
        const tab = event.currentTarget.dataset.tab;
        if (tab) this.activeSideTab = tab;
    }

    handleComposerTab(event) {
        event.preventDefault();
        const value = event.currentTarget.dataset.composer;
        if (value) this.composerTab = value;
    }

    handleFeedFilter(event) {
        event.preventDefault();
        const value = event.currentTarget.dataset.filter;
        if (value) this.feedFilter = value;
    }

    handleFeedChange(event) {
        this.feedComment = event.detail.value;
    }

    handleFeedShare() {
        this.feedComment = '';
    }

    handleFeedSort(event) {
        this.feedSort = event.detail.value;
    }

    handleFeedSearch(event) {
        this.feedSearch = event.detail.value;
    }

    /** Prevent placeholder links from jumping to the top of the page. */
    handleNoop(event) {
        event.preventDefault();
    }

    handleBackToList() {
        navigate('/accounts');
    }
}
