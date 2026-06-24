import { LightningElement } from 'lwc';
import { getCurrentRoute, navigate } from '../../../router';
import {
    getOpportunityById,
    getRelatedOpportunities,
    getStageMeta,
    OPEN_STAGES,
    formatCurrency,
} from 'data/opportunities';

const DETAIL_FIELDS = [
    { key: 'name', label: 'Nome da oportunidade' },
    { key: 'accountName', label: 'Conta' },
    { key: 'amountFull', label: 'Valor' },
    { key: 'stage', label: 'Estágio' },
    { key: 'type', label: 'Tipo' },
    { key: 'leadSource', label: 'Origem do lead' },
    { key: 'forecastCategory', label: 'Categoria de previsão' },
    { key: 'closeDate', label: 'Data de fechamento' },
    { key: 'ownerName', label: 'Proprietário' },
];

const CONTACT_FIELDS = [
    { key: 'contactName', label: 'Nome do contato' },
    { key: 'contactTitle', label: 'Cargo' },
    { key: 'contactEmail', label: 'E-mail' },
    { key: 'contactPhone', label: 'Telefone' },
];

export default class OpportunityDetail extends LightningElement {
    record = null;
    related = [];
    activeTab = 'activity';
    note = '';
    _loadedId = null;

    // Collapsible related-list cards (right sidebar), all open by default
    openSections = {
        products: true,
        notes: true,
        contactRoles: true,
        partners: true,
        stageHistory: true,
        related: true,
    };

    connectedCallback() {
        this._loadFromRoute();
    }

    renderedCallback() {
        // Keep the view in sync when navigating between related opportunities
        const id = getCurrentRoute()?.params?.id;
        if (id && id !== this._loadedId) {
            this._loadFromRoute();
        }
    }

    _loadFromRoute() {
        const id = getCurrentRoute()?.params?.id;
        this._loadedId = id;
        this.record = id ? getOpportunityById(id) : null;
        this.related = this.record
            ? getRelatedOpportunities(this.record.accountName, this.record.id)
            : [];
    }

    get hasRecord() {
        return this.record !== null;
    }

    get name() {
        return this.record?.name || 'Oportunidade';
    }

    get accountLabel() {
        return this.record ? this.record.accountName : '';
    }

    get stage() {
        return this.record?.stage || '';
    }

    get forecastCategory() {
        return this.record?.forecastCategory || '';
    }

    // --- Collapsible related-list section state (open flag + chevron icon) ---
    get ui() {
        const s = this.openSections;
        const chev = (open) => (open ? 'utility:chevrondown' : 'utility:chevronright');
        return {
            products: s.products,
            productsChevron: chev(s.products),
            notes: s.notes,
            notesChevron: chev(s.notes),
            contactRoles: s.contactRoles,
            contactRolesChevron: chev(s.contactRoles),
            partners: s.partners,
            partnersChevron: chev(s.partners),
            stageHistory: s.stageHistory,
            stageHistoryChevron: chev(s.stageHistory),
            related: s.related,
            relatedChevron: chev(s.related),
        };
    }

    // --- Details tab cards ---
    get detailFields() {
        if (!this.record) return [];
        return DETAIL_FIELDS.map((f) => ({ ...f, value: this.record[f.key] }));
    }

    get contactFields() {
        if (!this.record) return [];
        return CONTACT_FIELDS.map((f) => ({ ...f, value: this.record[f.key] }));
    }

    get description() {
        return this.record?.description || '';
    }

    get nextStep() {
        return this.record?.nextStep || '';
    }

    // --- Path ---
    get pathStages() {
        if (!this.record) return [];
        const closing = this.record.isLost ? 'Closed Lost' : 'Closed Won';
        const sequence = [...OPEN_STAGES, closing];
        const currentIndex = sequence.indexOf(this.record.stage);
        return sequence.map((label, index) => {
            const isComplete = index < currentIndex;
            const isCurrent = index === currentIndex;
            let itemClass = 'slds-path__item';
            if (this.record.isLost && isCurrent) {
                itemClass += ' slds-is-current slds-is-active c-path__item_lost';
            } else if (isComplete) {
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
                tabIndex: isCurrent ? '0' : '-1',
            };
        });
    }

    get isClosed() {
        return !!this.record?.isClosed;
    }

    get markCompleteLabel() {
        return this.isClosed ? 'Mudar estágio fechado' : 'Marcar estágio como concluído';
    }

    // --- Einstein scoped notification ---
    get scoreInsight() {
        return this.record?.scoreInsight || '';
    }

    get scoreHeadline() {
        if (!this.record) return '';
        return `Einstein • Score ${this.record.einsteinScore} (${this.record.scoreTrendLabel})`;
    }

    get scoreNotificationClass() {
        const base = 'slds-scoped-notification slds-media slds-media_center';
        const band = this.record?.scoreBand;
        if (band === 'strong') return `${base} slds-theme_success`;
        if (band === 'weak') return `${base} slds-theme_error`;
        return `${base} slds-scoped-notification_light`;
    }

    get scoreIconVariant() {
        const band = this.record?.scoreBand;
        return band === 'strong' || band === 'weak' ? 'inverse' : '';
    }

    // --- Products ---
    get products() {
        return (this.record?.products || []).map((p) => ({
            ...p,
            unitPriceLabel: formatCurrency(p.unitPrice),
            totalLabel: formatCurrency(p.quantity * p.unitPrice),
        }));
    }

    get productsTitle() {
        return `Produtos (${this.products.length})`;
    }

    get amountTotalLabel() {
        return this.record?.amountFull || '';
    }

    // --- Notes & Attachments / Partners (static related lists) ---
    get notesTitle() {
        return 'Notas e anexos (0)';
    }

    get partnersTitle() {
        return 'Parceiros (0)';
    }

    // --- Contact Roles ---
    get contactRoles() {
        if (!this.record) return [];
        return [
            {
                id: 'cr1',
                name: this.record.contactName,
                role: 'Tomador de decisão',
                title: this.record.contactTitle,
            },
        ];
    }

    get contactRolesTitle() {
        return `Funções de contato (${this.contactRoles.length})`;
    }

    // --- Stage History (snapshot of the current stage) ---
    get stageHistory() {
        if (!this.record) return [];
        const r = this.record;
        const expected = formatCurrency(Math.round((r.amount * r.probability) / 100));
        return [
            { key: 'stage', label: 'Estágio', value: r.stage },
            { key: 'amount', label: 'Valor', value: r.amountFull },
            { key: 'prob', label: 'Probabilidade (%)', value: `${r.probability}%` },
            { key: 'expected', label: 'Receita esperada', value: expected },
            { key: 'close', label: 'Data de fechamento', value: r.closeDate },
            { key: 'modifiedBy', label: 'Última modificação por', value: r.ownerName },
            { key: 'modifiedAt', label: 'Última modificação', value: '19/06/2026 14:47' },
        ];
    }

    get stageHistoryTitle() {
        return 'Histórico de estágios (1)';
    }

    // --- Activity ---
    get activityItems() {
        return this.record?.activity || [];
    }

    get hasActivities() {
        return this.activityItems.length > 0;
    }

    // --- Related opportunities (same account) ---
    get relatedTitle() {
        return `Oportunidades da conta (${this.related.length})`;
    }

    get hasRelated() {
        return this.related.length > 0;
    }

    // --- Tabs (SLDS default tabs blueprint, driven by activeTab) ---
    get tabs() {
        const items = [
            { value: 'activity', label: 'Atividade' },
            { value: 'details', label: 'Detalhes' },
            { value: 'chatter', label: 'Chatter' },
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

    get activityContentClass() {
        return this._contentClass('activity');
    }

    get detailsContentClass() {
        return this._contentClass('details');
    }

    get chatterContentClass() {
        return this._contentClass('chatter');
    }

    // --- Handlers ---
    handleMarkComplete() {
        if (!this.record || this.record.isClosed) return;
        const idx = OPEN_STAGES.indexOf(this.record.stage);
        const nextName =
            idx >= 0 && idx < OPEN_STAGES.length - 1 ? OPEN_STAGES[idx + 1] : 'Closed Won';
        this._setStage(nextName);
    }

    handleStageClick(event) {
        event.preventDefault();
        const stage = event.currentTarget.dataset.stage;
        if (stage) this._setStage(stage);
    }

    _setStage(stageName) {
        if (!this.record) return;
        const meta = getStageMeta(stageName);
        this.record = {
            ...this.record,
            stage: stageName,
            probability: meta.probability,
            isClosed: meta.isClosed,
            isWon: meta.isWon,
            isLost: stageName === 'Closed Lost',
        };
    }

    handleTabSelect(event) {
        event.preventDefault();
        const tab = event.currentTarget.dataset.tab;
        if (tab) {
            this.activeTab = tab;
        }
    }

    handleToggleSection(event) {
        const key = event.currentTarget.dataset.section;
        if (!key) return;
        this.openSections = {
            ...this.openSections,
            [key]: !this.openSections[key],
        };
    }

    handleNoteChange(event) {
        this.note = event.detail.value;
    }

    handleRelatedClick(event) {
        event.preventDefault();
        const id = event.currentTarget.dataset.id;
        if (id) navigate(`/opportunities/${id}`);
    }

    handlePreventDefault(event) {
        // Highlights links (Account, Owner) are display-only in this prototype
        event.preventDefault();
    }

    handleBackToList() {
        navigate('/opportunities');
    }
}
