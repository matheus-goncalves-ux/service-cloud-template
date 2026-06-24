import { LightningElement } from 'lwc';
import { getCurrentRoute, navigate } from '../../../router';
import { getPersonalAccountById, formatCurrencyBRL } from 'data/personalAccounts';

/** Normalize string → CSS-safe lowercase token. */
function toCssToken(str) {
    return (str || '')
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g, '-');
}

/** PT-BR labels for opportunity stage keys. */
const OPP_STAGE_LABELS = {
    Prospecting: 'Prospecção',
    Qualification: 'Qualificação',
    Proposal: 'Proposta',
    Negotiation: 'Negociação',
    'Closed Won': 'Ganha',
    'Closed Lost': 'Perdida',
};

/**
 * page-personal-account-detail — Compra Agora B2C Person Account record page.
 *
 * Console 2-column layout (mirrors page-account-detail):
 *   Left  (8/12 ≈ 66%): tabs — Relacionado | Detalhes
 *     · Relacionado: Oportunidades, Casos
 *     · Detalhes: identidade, preferências, segmento
 *   Right (4/12 ≈ 33%): tabs — Atividade | Chatter
 */
export default class PersonalAccountDetail extends LightningElement {
    record = null;
    activeTab = 'related';
    activeSideTab = 'activity';
    composerTab = 'post';
    _sections = { identity: true, preferences: true, segment: true };
    feedFilter = 'all';
    feedComment = '';
    feedSort = 'recent';
    feedSearch = '';

    connectedCallback() {
        const route = getCurrentRoute();
        const id = route?.params?.id;
        if (id) {
            this.record = getPersonalAccountById(id);
        }
    }

    // ---------------------------------------------------------------------------
    // Identity
    // ---------------------------------------------------------------------------

    get hasRecord() {
        return this.record !== null;
    }

    get fullName() {
        return this.record?.name || 'Conta desconhecida';
    }

    get initials() {
        const name = this.record?.name || '';
        return name
            .split(' ')
            .filter(Boolean)
            .slice(0, 2)
            .map((w) => w[0])
            .join('')
            .toUpperCase();
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

    get marketingLabel() {
        return this.record?.marketingOptIn ? 'Opt-in: Sim' : 'Opt-in: Não';
    }

    // ---------------------------------------------------------------------------
    // Header highlight strip
    // ---------------------------------------------------------------------------

    get headerFields() {
        if (!this.record) return [];
        const r = this.record;
        return [
            { key: 'cpf',     label: 'CPF',             value: r.cpf },
            { key: 'mobile',  label: 'Celular',          value: r.mobile },
            { key: 'city',    label: 'Cidade',           value: `${r.city}, ${r.state}` },
            { key: 'tier',    label: 'Tier',             value: r.loyaltyTier },
            { key: 'ltv',     label: 'Lifetime Value',   value: formatCurrencyBRL(r.lifetimeValue) },
        ];
    }

    // ---------------------------------------------------------------------------
    // Left tabs
    // ---------------------------------------------------------------------------

    get tabs() {
        return [
            { value: 'related',  label: 'Relacionado' },
            { value: 'details',  label: 'Detalhes' },
        ].map((t) => {
            const active = t.value === this.activeTab;
            return {
                ...t,
                itemClass: active ? 'slds-tabs_default__item slds-is-active' : 'slds-tabs_default__item',
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

    get relatedContentClass()  { return this._contentClass('related'); }
    get detailsContentClass()  { return this._contentClass('details'); }

    // ---------------------------------------------------------------------------
    // Relacionado — Oportunidades
    // ---------------------------------------------------------------------------

    get opportunities() {
        return (this.record?.opportunities || []).map((o) => ({
            ...o,
            stageLabel:  OPP_STAGE_LABELS[o.stage] || o.stage,
            amountLabel: formatCurrencyBRL(o.amount || 0),
        }));
    }

    get hasOpportunities() { return this.opportunities.length > 0; }

    get opportunitiesTitle() {
        return `Oportunidades (${this.record?.opportunities?.length || 0})`;
    }

    // ---------------------------------------------------------------------------
    // Relacionado — Casos
    // ---------------------------------------------------------------------------

    get cases() {
        return (this.record?.cases || []).map((c) => ({
            ...c,
            slaOverdue: c.slaStatus === 'overdue',
            slaText: 'SLA expirado',
        }));
    }

    get hasCases() { return this.cases.length > 0; }

    get casesTitle() {
        return `Casos (${this.record?.cases?.length || 0})`;
    }

    // ---------------------------------------------------------------------------
    // Detalhes tab — collapsible sections
    // ---------------------------------------------------------------------------

    handleSection(event) {
        const key = event.currentTarget.dataset.section;
        if (key) {
            this._sections = { ...this._sections, [key]: !this._sections[key] };
        }
    }

    _sectionMeta(key, label) {
        const open = !!this._sections[key];
        return { key, label, open, icon: open ? 'utility:chevrondown' : 'utility:chevronright' };
    }

    get detailSections() {
        if (!this.record) return [];
        const r = this.record;
        return [
            {
                ...this._sectionMeta('identity', 'Identidade pessoal'),
                fields: [
                    { key: 'firstName',  label: 'Nome',               value: r.personFirstName },
                    { key: 'lastName',   label: 'Sobrenome',          value: r.personLastName },
                    { key: 'cpf',        label: 'CPF',                value: r.cpf },
                    { key: 'birth',      label: 'Data de nascimento', value: r.birthDate },
                    { key: 'gender',     label: 'Gênero',             value: r.gender },
                    { key: 'email',      label: 'E-mail',             value: r.email },
                    { key: 'mobile',     label: 'Celular',            value: r.mobile },
                    { key: 'address',    label: 'Endereço',           value: r.address },
                    { key: 'city',       label: 'Cidade',             value: r.city },
                    { key: 'state',      label: 'Estado',             value: r.state },
                    { key: 'zip',        label: 'CEP',                value: r.zip },
                ],
            },
            {
                ...this._sectionMeta('preferences', 'Preferências'),
                fields: [
                    { key: 'channel',   label: 'Canal preferido',     value: r.preferredChannel },
                    { key: 'optIn',     label: 'Opt-in de marketing', value: r.marketingOptIn ? 'Sim' : 'Não' },
                    { key: 'language',  label: 'Idioma',              value: r.language },
                ],
            },
            {
                ...this._sectionMeta('segment', 'Segmento de cliente'),
                fields: [
                    { key: 'tier',      label: 'Tier de fidelidade',     value: r.loyaltyTier },
                    { key: 'ltv',       label: 'Lifetime Value',         value: formatCurrencyBRL(r.lifetimeValue) },
                    { key: 'first',     label: 'Primeiro contato',       value: r.firstContactDate },
                    { key: 'segment',   label: 'Segmento',               value: r.segment },
                    { key: 'status',    label: 'Status',                 value: r.status },
                ],
            },
        ];
    }

    // ---------------------------------------------------------------------------
    // Right tabs
    // ---------------------------------------------------------------------------

    get sideTabs() {
        return [
            { value: 'activity', label: 'Atividade' },
            { value: 'chatter',  label: 'Chatter' },
        ].map((t) => {
            const active = t.value === this.activeSideTab;
            return {
                ...t,
                itemClass: active ? 'slds-tabs_default__item slds-is-active' : 'slds-tabs_default__item',
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

    get activityContentClass() { return this._sideContentClass('activity'); }
    get chatterContentClass()  { return this._sideContentClass('chatter'); }
    get activityItems()        { return this.record?.activity || []; }

    // ---------------------------------------------------------------------------
    // Chatter
    // ---------------------------------------------------------------------------

    get composerTabs() {
        return [
            { value: 'post', label: 'Publicar' },
            { value: 'poll', label: 'Enquete' },
        ].map((t) => {
            const active = t.value === this.composerTab;
            return {
                ...t,
                itemClass: active ? 'slds-tabs_scoped__item slds-is-active' : 'slds-tabs_scoped__item',
                ariaSelected: active ? 'true' : 'false',
                tabIndex: active ? '0' : '-1',
            };
        });
    }

    get feedFilters() {
        return [
            { value: 'all',    label: 'Todas as atualizações' },
            { value: 'posts',  label: 'Publicações' },
            { value: 'status', label: 'Mudanças de status' },
        ].map((t) => {
            const active = t.value === this.feedFilter;
            return {
                ...t,
                itemClass: active ? 'slds-tabs_default__item slds-is-active' : 'slds-tabs_default__item',
                ariaSelected: active ? 'true' : 'false',
                tabIndex: active ? '0' : '-1',
            };
        });
    }

    get feedPosts() {
        return (this.record?.posts || []).map((p) => ({
            ...p,
            recipient: 'Para: Interno',
            initials: p.author.split(' ').filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase(),
        }));
    }

    get hasFeedPosts() { return this.feedPosts.length > 0; }

    get feedSortOptions() {
        return [
            { label: 'Atividade mais recente', value: 'recent' },
            { label: 'Atividade mais antiga',  value: 'oldest' },
        ];
    }

    get feedSortLabel() {
        const opt = this.feedSortOptions.find((o) => o.value === this.feedSort);
        return opt ? opt.label : 'Atividade mais recente';
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

    handleFeedChange(event)  { this.feedComment = event.detail.value; }
    handleFeedShare()        { this.feedComment = ''; }
    handleFeedSort(event)    { this.feedSort = event.detail.value; }
    handleFeedSearch(event)  { this.feedSearch = event.detail.value; }

    handleNoop(event)        { event.preventDefault(); }

    handleBackToList()       { navigate('/personal-accounts'); }
}
