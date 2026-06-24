import { LightningElement } from 'lwc';
import { getCurrentRoute, navigate } from '../../../router';
import { getContactById } from 'data/contacts';

/** Normalize a string to a CSS-safe lowercase token. */
function toCssToken(str) {
    return (str || '')
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g, '-');
}

/** Compact BRL formatter for opportunity amounts. */
function formatBRL(value) {
    if (!value && value !== 0) return '\u2014';
    return value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        maximumFractionDigits: 0
    });
}

/** PT-BR labels para os estágios de oportunidade. */
const OPP_STAGE_LABELS = {
    Prospecting: 'Prospecção',
    Qualification: 'Qualificação',
    Proposal: 'Proposta',
    Negotiation: 'Negociação',
    'Closed Won': 'Ganha',
    'Closed Lost': 'Perdida'
};

/** Activity timeline sample (right column). */
const ACTIVITY_ITEMS = [
    { id: 'ct-sec-upcoming', type: 'section', label: 'Próximos e Vencidos' },
    { id: 'ct-sec-jun', type: 'section', label: 'Junho • 2026' },
    {
        id: 'ct-a1',
        iconName: 'standard:event',
        subjectIcon: 'utility:world',
        subject: 'Visita ao ponto de venda — revisão de mix e gôndola',
        date: '10:00 | 20/06/26',
        actor: 'Você',
        actorAction: 'criou um evento com',
        actorTargets: [{ label: 'Carlos Mendonça' }],
        actorSuffix: '',
        fields: [
            { label: 'Local', value: 'Mercadinho Bom Preço — Zona Norte, SP', linkable: true },
            { label: 'Quando', value: '20 de junho de 2026 10:00 – 11:30 (BRT)', linkable: true }
        ],
        description: 'Verificação do espaço de gôndola, mix de produtos Unilever e ativação da campanha Verão.'
    },
    {
        id: 'ct-a2',
        iconName: 'standard:log_a_call',
        subject: 'Ligação — acompanhamento do pedido com atraso',
        date: 'há 3 dias',
        description: 'Explicado o motivo do atraso e confirmado novo prazo de entrega para 24/06.'
    },
    {
        id: 'ct-a3',
        iconName: 'standard:email',
        subject: 'E-mail — tabela promocional Limpeza & Higiene enviada',
        date: 'há 1 semana',
        description: 'Encaminhada tabela de preços promocionais para a campanha de inverno 2026.'
    }
];

const COMPOSER_TABS = [
    { value: 'post', label: 'Publicação' },
    { value: 'poll', label: 'Enquete' }
];

const FEED_POSTS = [
    {
        id: 'fp1',
        author: 'Beatriz Cunha',
        initials: 'BC',
        date: 'há 2 dias',
        recipient: 'Carlos Mendonça',
        body: 'Visita realizada com sucesso — loja bem organizada, gôndola alinhada ao planograma Unilever. Recomendo expandir o mix de higiene.'
    },
    {
        id: 'fp2',
        author: 'Rafael Souza',
        initials: 'RS',
        date: 'há 5 dias',
        recipient: 'Carlos Mendonça',
        body: 'Caso de atraso na entrega encerrado. Logística confirmou regularização e cliente ficou satisfeito com o acompanhamento.'
    }
];

/**
 * page-contact-detail — Sales console contact record page.
 *
 * Mirrors the page-account-detail 2-column console layout (66% / 33%):
 *   Left  (8/12): tabs — Related | Details
 *     · Related: Opportunities, Cases, Campaign History, Notes & Attachments
 *     · Details: contact field sections
 *   Right (4/12): tabs — Activity | Chatter
 */
export default class ContactDetail extends LightningElement {
    record = null;
    activeTab = 'related';
    activeSideTab = 'activity';
    composerTab = 'post';
    isFollowing = false;
    feedComment = '';
    _sections = { info: true, contact: true, address: true, system: true };

    activityItems = ACTIVITY_ITEMS;
    composerTabsData = COMPOSER_TABS;
    feedPostsData = FEED_POSTS;

    connectedCallback() {
        const route = getCurrentRoute();
        const id = route?.params?.id;
        if (id) {
            this.record = getContactById(id);
        }
    }

    // ---------------------------------------------------------------------------
    // Identity
    // ---------------------------------------------------------------------------

    get hasContact() {
        return this.record !== null;
    }

    get iconName() {
        return 'standard:contact';
    }

    get contactName() {
        return this.record?.name || 'Contato não encontrado';
    }

    get headerFields() {
        if (!this.record) return [];
        const r = this.record;
        return [
            { key: 'title', label: 'Cargo', value: r.title },
            { key: 'account', label: 'Nome da Conta', value: r.accountName },
            { key: 'phone', label: 'Telefone', value: r.phone },
            { key: 'email', label: 'E-mail', value: r.email }
        ];
    }

    // ---------------------------------------------------------------------------
    // Left tabs (Related | Details)
    // ---------------------------------------------------------------------------

    get tabs() {
        const items = [
            { value: 'related', label: 'Relacionado' },
            { value: 'details', label: 'Detalhes' }
        ];
        return items.map((t) => {
            const active = t.value === this.activeTab;
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
    // Related — Opportunities
    // ---------------------------------------------------------------------------

    get opportunities() {
        return (this.record?.opportunities || []).map((o) => ({
            ...o,
            stageClass: `c-opp-stage c-opp-stage_${toCssToken(o.stage)}`,
            stage: OPP_STAGE_LABELS[o.stage] || o.stage,
            amountLabel: formatBRL(o.amount)
        }));
    }

    get hasOpportunities() {
        return this.opportunities.length > 0;
    }

    get opportunitiesTitle() {
        return `Oportunidades (${this.record?.opportunities?.length || 0})`;
    }

    // ---------------------------------------------------------------------------
    // Related — Cases
    // ---------------------------------------------------------------------------

    get cases() {
        return (this.record?.cases || []).map((c) => ({
            ...c,
            slaOverdue: c.slaStatus === 'overdue',
            slaText: c.slaText || ''
        }));
    }

    get hasCases() {
        return this.cases.length > 0;
    }

    get casesTitle() {
        return `Casos (${this.record?.cases?.length || 0})`;
    }

    // ---------------------------------------------------------------------------
    // Related — Campaign History
    // ---------------------------------------------------------------------------

    get campaigns() {
        return (this.record?.campaigns || []).map((c) => ({
            ...c,
            metaText: `${c.status} \u2022 Respondeu: ${c.responded}`
        }));
    }

    get hasCampaigns() {
        return this.campaigns.length > 0;
    }

    get campaignsTitle() {
        return `Histórico de Campanhas (${this.record?.campaigns?.length || 0})`;
    }

    // ---------------------------------------------------------------------------
    // Related — Notes & Attachments
    // ---------------------------------------------------------------------------

    get notes() {
        return this.record?.notes || [];
    }

    get hasNotes() {
        return this.notes.length > 0;
    }

    get notesTitle() {
        return `Notas e Anexos (${this.record?.notes?.length || 0})`;
    }

    // ---------------------------------------------------------------------------
    // Details tab — collapsible field sections
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
            icon: open ? 'utility:chevrondown' : 'utility:chevronright'
        };
    }

    get mailingAddress() {
        if (!this.record) return '';
        const c = this.record;
        const region = [c.mailingCity, c.mailingState].filter(Boolean).join(', ');
        return `${c.mailingStreet}, ${region} ${c.mailingZip}`.trim();
    }

    get detailSections() {
        if (!this.record) return [];
        const r = this.record;
        const sections = [
            {
                ...this._sectionMeta('info', 'Informações do Contato'),
                fields: [
                    { key: 'name', label: 'Nome', value: r.name },
                    { key: 'title', label: 'Cargo', value: r.title },
                    { key: 'account', label: 'Nome da Conta', value: r.accountName },
                    { key: 'department', label: 'Departamento', value: r.department }
                ]
            },
            {
                ...this._sectionMeta('contact', 'Formas de Contato'),
                fields: [
                    { key: 'email', label: 'E-mail', value: r.email },
                    { key: 'phone', label: 'Telefone', value: r.phone },
                    { key: 'mobile', label: 'Celular', value: r.mobile }
                ]
            },
            {
                ...this._sectionMeta('address', 'Endereço de Correspondência'),
                fields: [
                    { key: 'street', label: 'Rua', value: r.mailingStreet },
                    { key: 'city', label: 'Cidade', value: r.mailingCity },
                    { key: 'state', label: 'Estado/Província', value: r.mailingState || '\u2014' },
                    { key: 'zip', label: 'CEP', value: r.mailingZip }
                ]
            },
            {
                ...this._sectionMeta('system', 'Informações do Sistema'),
                fields: [
                    { key: 'activity', label: 'Última Atividade', value: r.lastActivity },
                    { key: 'desc', label: 'Descrição', value: r.description }
                ]
            }
        ];
        return sections;
    }

    // ---------------------------------------------------------------------------
    // Right tabs (Activity | Chatter)
    // ---------------------------------------------------------------------------

    get sideTabs() {
        const items = [
            { value: 'activity', label: 'Atividade' },
            { value: 'chatter', label: 'Chatter' }
        ];
        return items.map((t) => {
            const active = t.value === this.activeSideTab;
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

    get activityContentClass() {
        return this.activeSideTab === 'activity'
            ? 'slds-tabs_default__content slds-show'
            : 'slds-tabs_default__content slds-hide';
    }

    get chatterContentClass() {
        return this.activeSideTab === 'chatter'
            ? 'slds-tabs_default__content slds-show'
            : 'slds-tabs_default__content slds-hide';
    }

    // ---------------------------------------------------------------------------
    // Chatter composer + feed
    // ---------------------------------------------------------------------------

    get composerTabs() {
        return this.composerTabsData.map((t) => {
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

    get feedPosts() {
        return this.feedPostsData;
    }

    get hasFeedPosts() {
        return this.feedPostsData.length > 0;
    }

    handleComposerTab(event) {
        event.preventDefault();
        const value = event.currentTarget.dataset.composer;
        if (value) {
            this.composerTab = value;
        }
    }

    handleFeedChange(event) {
        this.feedComment = event.detail.value;
    }

    handleFeedShare() {
        this.feedComment = '';
    }

    // ---------------------------------------------------------------------------
    // Follow + navigation
    // ---------------------------------------------------------------------------

    get followLabel() {
        return this.isFollowing ? 'Seguindo' : 'Seguir';
    }

    get followVariant() {
        return this.isFollowing ? 'brand' : 'neutral';
    }

    get followIconName() {
        return this.isFollowing ? 'utility:check' : 'utility:add';
    }

    handleFollow() {
        this.isFollowing = !this.isFollowing;
    }

    handleTabSelect(event) {
        event.preventDefault();
        const value = event.currentTarget.dataset.tab;
        if (value) {
            this.activeTab = value;
        }
    }

    handleSideTabSelect(event) {
        event.preventDefault();
        const value = event.currentTarget.dataset.tab;
        if (value) {
            this.activeSideTab = value;
        }
    }

    handleNoop(event) {
        event.preventDefault();
    }

    handleBackToList() {
        navigate('/contacts');
    }
}
