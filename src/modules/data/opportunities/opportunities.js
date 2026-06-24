/**
 * Mock data for Sales Cloud Opportunities — Automotive Industry.
 * Reuses the same automotive accounts, contacts and owners as the Service
 * Cloud cases (data/cases) so the four clouds tell one coherent story about
 * the same customers.
 *
 * Consumed by:
 *   - page/pipeline          (Kanban board grouped by stage)
 *   - page/opportunityDetail (console record view with Path + related lists)
 *   - ui/dealCard            (reusable Kanban card)
 */

// --- Stages -----------------------------------------------------------

/**
 * Ordered sales stages with default win probability. `isClosed`/`isWon`
 * drive the Path state and KPI math on the board.
 */
export const SALES_STAGES = [
    { name: 'Prospecting', probability: 10, isClosed: false, isWon: false },
    { name: 'Qualification', probability: 25, isClosed: false, isWon: false },
    { name: 'Proposal', probability: 50, isClosed: false, isWon: false },
    { name: 'Negotiation', probability: 75, isClosed: false, isWon: false },
    { name: 'Closed Won', probability: 100, isClosed: true, isWon: true },
    { name: 'Closed Lost', probability: 0, isClosed: true, isWon: false },
];

/** Stage names that surface as Kanban columns (open pipeline + the win column). */
export const BOARD_STAGES = ['Prospecting', 'Qualification', 'Proposal', 'Negotiation', 'Closed Won'];

/** Open stages used to build the record Path before the closing step. */
export const OPEN_STAGES = ['Prospecting', 'Qualification', 'Proposal', 'Negotiation'];

/** Sales quota for the current quarter — drives the attainment KPI. */
export const QUARTER_QUOTA = 12000000;

export function getStageMeta(name) {
    return SALES_STAGES.find((s) => s.name === name) || SALES_STAGES[0];
}

// --- Currency helpers -------------------------------------------------

const BRL = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
});

const BRL_COMPACT = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    notation: 'compact',
    maximumFractionDigits: 1,
});

/** Full currency, e.g. "R$ 9.700.000". */
export function formatCurrency(value) {
    return BRL.format(value || 0);
}

/** Compact currency for space-constrained cards/columns, e.g. "R$ 9,7 mi". */
export function formatCurrencyCompact(value) {
    return BRL_COMPACT.format(value || 0);
}

// --- Raw opportunities ------------------------------------------------

const OPPORTUNITIES = [
    {
        id: '1',
        name: 'Frota 200 EVs ID.4 — renovação',
        accountName: 'Localiza Fleet',
        amount: 4800000,
        stage: 'Prospecting',
        probability: 10,
        closeDate: '31/08/2026',
        closeDateRelative: 'em 2 meses',
        ownerName: 'Camila Souza',
        type: 'Existing Business',
        leadSource: 'Conta existente',
        forecastCategory: 'Pipeline',
        einsteinScore: 48,
        scoreTrend: 'up',
        scoreInsight: 'Conta com histórico de recompra; engajamento crescente no último mês.',
        nextStep: 'Agendar workshop de eletrificação de frota com diretoria.',
        lastActivityDays: 3,
        contactName: 'André Costa',
        contactTitle: 'Diretor de Operações',
        contactEmail: 'acosta@localiza-fleet.com.br',
        contactPhone: '(31) 3506-5000',
        description:
            'Renovação programada da frota de locação corporativa com 200 unidades do VW ID.4. Localiza avalia migração de 30% da frota para elétricos até 2027, com foco em redução de TCO e apelo ESG.',
        products: [
            { id: 'p1', name: 'VW ID.4 Pro (frota)', quantity: 200, unitPrice: 22000 },
            { id: 'p2', name: 'Pacote de telemetria conectada', quantity: 200, unitPrice: 2000 },
        ],
        activity: [
            { id: 'a1', type: 'email', iconName: 'standard:email', subject: 'Proposta inicial de renovação enviada', date: '3 days ago', description: 'Enviado comparativo de TCO frota elétrica vs. combustão.' },
            { id: 'a2', type: 'task', iconName: 'standard:task', subject: 'Qualificar volume e prazo', date: '1 day ago', description: 'Confirmar número final de unidades e janela de entrega 2026/2027.' },
        ],
    },
    {
        id: '2',
        name: 'Showroom digital + 30 veículos demo',
        accountName: 'AutoNation Brasil',
        amount: 1250000,
        stage: 'Prospecting',
        probability: 10,
        closeDate: '15/08/2026',
        closeDateRelative: 'em 7 semanas',
        ownerName: 'Bruno Carvalho',
        type: 'New Business',
        leadSource: 'Indicação',
        forecastCategory: 'Pipeline',
        einsteinScore: 35,
        scoreTrend: 'flat',
        scoreInsight: 'Estágio inicial; ainda sem orçamento confirmado pelo cliente.',
        nextStep: 'Descobrir orçamento de marketing digital para 2026.',
        lastActivityDays: 9,
        contactName: 'Patricia Yamamoto',
        contactTitle: 'Coordenadora de Treinamento Técnico',
        contactEmail: 'pyamamoto@autonation-sp.com.br',
        contactPhone: '(11) 4000-8500',
        description:
            'Projeto de showroom digital imersivo com 30 veículos de demonstração para a rede AutoNation em São Paulo, integrando test-drive agendado e vitrine online.',
        products: [
            { id: 'p1', name: 'Plataforma showroom digital', quantity: 1, unitPrice: 350000 },
            { id: 'p2', name: 'Veículos demo (linha 2026)', quantity: 30, unitPrice: 30000 },
        ],
        activity: [
            { id: 'a1', type: 'call', iconName: 'standard:log_a_call', subject: 'Ligação de descoberta', date: '9 days ago', description: 'Mapeadas necessidades de digitalização da experiência de compra.' },
        ],
    },
    {
        id: '3',
        name: 'Pacote pós-venda conectado MIB3',
        accountName: 'Volkswagen do Brasil',
        amount: 2100000,
        stage: 'Qualification',
        probability: 25,
        closeDate: '22/07/2026',
        closeDateRelative: 'em 5 semanas',
        ownerName: 'Camila Souza',
        type: 'Existing Business',
        leadSource: 'Conta existente',
        forecastCategory: 'Pipeline',
        einsteinScore: 57,
        scoreTrend: 'up',
        scoreInsight: 'Relacionamento forte de pós-venda; caso de suporte recente bem resolvido.',
        nextStep: 'Apresentar ROI de serviços conectados ao comitê de pós-venda.',
        lastActivityDays: 2,
        contactName: 'Rafael Mendes',
        contactTitle: 'Gerente de Pós-venda',
        contactEmail: 'rmendes@vwbrasil.com.br',
        contactPhone: '(11) 3500-6200',
        description:
            'Pacote de serviços conectados para a base MIB3 (Polo, Nivus, T-Cross 2025/2026): diagnóstico remoto, atualizações OTA gerenciadas e renovação de assinatura de conectividade.',
        products: [
            { id: 'p1', name: 'Assinatura de conectividade (12m)', quantity: 5000, unitPrice: 300 },
            { id: 'p2', name: 'Módulo de diagnóstico remoto', quantity: 1, unitPrice: 600000 },
        ],
        activity: [
            { id: 'a1', type: 'email', iconName: 'standard:email', subject: 'Material técnico enviado', date: '5 days ago', description: 'Detalhamento do pacote de serviços conectados.' },
            { id: 'a2', type: 'task', iconName: 'standard:task', subject: 'Qualificar comitê decisor', date: '2 days ago', description: 'Identificar sponsors de pós-venda e TI.' },
        ],
    },
    {
        id: '4',
        name: 'Estações de recarga DC Fast — 12 unidades',
        accountName: 'BYD Motors Brasil',
        amount: 980000,
        stage: 'Qualification',
        probability: 25,
        closeDate: '18/07/2026',
        closeDateRelative: 'em 4 semanas',
        ownerName: 'Lucas Ferreira',
        type: 'New Business',
        leadSource: 'Evento',
        forecastCategory: 'Pipeline',
        einsteinScore: 44,
        scoreTrend: 'down',
        scoreInsight: 'Engajamento caiu após incidente de infraestrutura; requer reativação.',
        nextStep: 'Revisar SLA de infraestrutura após caso de suporte recente.',
        lastActivityDays: 6,
        contactName: 'Guilherme Teixeira',
        contactTitle: 'Gerente de Infraestrutura EV',
        contactEmail: 'gteixeira@byd-brasil.com.br',
        contactPhone: '(11) 5503-9900',
        description:
            'Fornecimento e instalação de 12 estações DC Fast (150 kW) para a expansão da rede de recarga BYD em shoppings e concessionárias da Grande São Paulo.',
        products: [
            { id: 'p1', name: 'Estação DC Fast 150 kW', quantity: 12, unitPrice: 70000 },
            { id: 'p2', name: 'Gestão OCPP (licença anual)', quantity: 12, unitPrice: 11666 },
        ],
        activity: [
            { id: 'a1', type: 'task', iconName: 'standard:task', subject: 'Reativar oportunidade', date: '6 days ago', description: 'Retomar conversa após resolução do caso de suporte de recarga.' },
        ],
    },
    {
        id: '5',
        name: 'Expansão showroom SP + 50 veículos',
        accountName: 'AutoNation Brasil',
        amount: 6400000,
        stage: 'Proposal',
        probability: 50,
        closeDate: '10/07/2026',
        closeDateRelative: 'em 3 semanas',
        ownerName: 'Bruno Carvalho',
        type: 'New Business',
        leadSource: 'Indicação',
        forecastCategory: 'Best Case',
        einsteinScore: 71,
        scoreTrend: 'up',
        scoreInsight: 'Proposta bem recebida; orçamento confirmado e prazo definido.',
        nextStep: 'Refinar proposta comercial com condições de financiamento de frota.',
        lastActivityDays: 1,
        contactName: 'Patricia Yamamoto',
        contactTitle: 'Coordenadora de Treinamento Técnico',
        contactEmail: 'pyamamoto@autonation-sp.com.br',
        contactPhone: '(11) 4000-8500',
        description:
            'Expansão de showroom da rede AutoNation em São Paulo com aquisição de 50 veículos da linha 2026 (mix SUV e híbridos) e reforma da área de experiência do cliente.',
        products: [
            { id: 'p1', name: 'Veículos linha 2026 (mix)', quantity: 50, unitPrice: 110000 },
            { id: 'p2', name: 'Reforma da área de experiência', quantity: 1, unitPrice: 900000 },
        ],
        activity: [
            { id: 'a1', type: 'email', iconName: 'standard:email', subject: 'Proposta comercial enviada', date: '4 days ago', description: 'Proposta com mix de veículos e cronograma de obra.' },
            { id: 'a2', type: 'call', iconName: 'standard:log_a_call', subject: 'Call de alinhamento de proposta', date: '1 day ago', description: 'Cliente pediu condições de financiamento de frota.' },
        ],
    },
    {
        id: '6',
        name: 'Contrato de manutenção de frota — 18 meses',
        accountName: 'Localiza Fleet',
        amount: 3300000,
        stage: 'Proposal',
        probability: 50,
        closeDate: '05/07/2026',
        closeDateRelative: 'em 2 semanas',
        ownerName: 'Camila Souza',
        type: 'Renewal',
        leadSource: 'Conta existente',
        forecastCategory: 'Best Case',
        einsteinScore: 66,
        scoreTrend: 'up',
        scoreInsight: 'Renovação com histórico positivo; risco baixo de churn.',
        nextStep: 'Negociar SLA de disponibilidade e preço por veículo/mês.',
        lastActivityDays: 2,
        contactName: 'André Costa',
        contactTitle: 'Diretor de Operações',
        contactEmail: 'acosta@localiza-fleet.com.br',
        contactPhone: '(31) 3506-5000',
        description:
            'Renovação do contrato de manutenção preventiva e corretiva para a frota Localiza (≈1.200 veículos) por 18 meses, com gestão de peças e SLA de disponibilidade.',
        products: [
            { id: 'p1', name: 'Manutenção por veículo/mês', quantity: 1200, unitPrice: 1500 },
            { id: 'p2', name: 'Gestão de peças e estoque', quantity: 1, unitPrice: 1500000 },
        ],
        activity: [
            { id: 'a1', type: 'email', iconName: 'standard:email', subject: 'Minuta de renovação enviada', date: '6 days ago', description: 'Proposta de SLA e preço por veículo.' },
            { id: 'a2', type: 'task', iconName: 'standard:task', subject: 'Negociar SLA', date: '2 days ago', description: 'Alinhar metas de disponibilidade da frota.' },
        ],
    },
    {
        id: '7',
        name: 'Fornecimento 120 Corolla Cross híbridos',
        accountName: 'Toyota AutoShow Rio',
        amount: 9700000,
        stage: 'Negotiation',
        probability: 75,
        closeDate: '28/06/2026',
        closeDateRelative: 'em 9 dias',
        ownerName: 'Bruno Carvalho',
        type: 'New Business',
        leadSource: 'Licitação',
        forecastCategory: 'Commit',
        einsteinScore: 83,
        scoreTrend: 'up',
        scoreInsight: 'Alta probabilidade; decisor engajado e proposta na fase final.',
        nextStep: 'Fechar condições de pagamento e assinar contrato.',
        lastActivityDays: 1,
        contactName: 'Fernanda Oliveira',
        contactTitle: 'Supervisora de Atendimento',
        contactEmail: 'foliveira@toyota-autoshow.com.br',
        contactPhone: '(21) 3900-7100',
        description:
            'Fornecimento de 120 unidades Corolla Cross híbrido para programa de mobilidade corporativa, com entrega faseada e pacote de manutenção dos 2 primeiros anos.',
        products: [
            { id: 'p1', name: 'Corolla Cross GR-S Híbrido', quantity: 120, unitPrice: 78000 },
            { id: 'p2', name: 'Manutenção 24 meses', quantity: 120, unitPrice: 2833 },
        ],
        activity: [
            { id: 'a1', type: 'call', iconName: 'standard:log_a_call', subject: 'Negociação de condições', date: '3 days ago', description: 'Discutidas condições de pagamento e cronograma de entrega.' },
            { id: 'a2', type: 'task', iconName: 'standard:task', subject: 'Enviar contrato para assinatura', date: '1 day ago', description: 'Minuta final em revisão jurídica.' },
        ],
    },
    {
        id: '8',
        name: 'Upgrade ADAS linha 2026 — rede SP',
        accountName: 'AutoNation Brasil',
        amount: 1850000,
        stage: 'Negotiation',
        probability: 75,
        closeDate: '30/06/2026',
        closeDateRelative: 'em 11 dias',
        ownerName: 'Lucas Ferreira',
        type: 'Existing Business',
        leadSource: 'Conta existente',
        forecastCategory: 'Commit',
        einsteinScore: 52,
        scoreTrend: 'down',
        scoreInsight: 'Decisão emperrada em aprovação interna; sem atividade há vários dias.',
        nextStep: 'Reengajar sponsor e remover bloqueio de aprovação.',
        lastActivityDays: 8,
        contactName: 'Marcos Pinheiro',
        contactTitle: 'Gerente de Peças e Acessórios',
        contactEmail: 'mpinheiro@autonation-sp.com.br',
        contactPhone: '(11) 4000-8510',
        description:
            'Upgrade de equipamentos de calibração ADAS e treinamento para 8 unidades da rede AutoNation em SP, reduzindo retornos pós-colisão.',
        products: [
            { id: 'p1', name: 'Kit de calibração ADAS', quantity: 8, unitPrice: 180000 },
            { id: 'p2', name: 'Treinamento técnico ADAS', quantity: 1, unitPrice: 410000 },
        ],
        activity: [
            { id: 'a1', type: 'email', iconName: 'standard:email', subject: 'Aguardando aprovação interna', date: '8 days ago', description: 'Cliente sinalizou trâmite de aprovação de capex.' },
        ],
    },
    {
        id: '9',
        name: 'Frota executiva 40 BYD Seal',
        accountName: 'BYD Motors Brasil',
        amount: 5200000,
        stage: 'Closed Won',
        probability: 100,
        closeDate: '02/06/2026',
        closeDateRelative: 'há 2 semanas',
        ownerName: 'Lucas Ferreira',
        type: 'New Business',
        leadSource: 'Evento',
        forecastCategory: 'Closed',
        einsteinScore: 100,
        scoreTrend: 'flat',
        scoreInsight: 'Negócio ganho e faturado.',
        nextStep: 'Iniciar onboarding de entrega e pós-venda.',
        lastActivityDays: 14,
        contactName: 'Guilherme Teixeira',
        contactTitle: 'Gerente de Infraestrutura EV',
        contactEmail: 'gteixeira@byd-brasil.com.br',
        contactPhone: '(11) 5503-9900',
        description:
            'Venda de 40 unidades BYD Seal para programa de frota executiva, incluindo instalação de wallbox nas residências dos executivos e plano de manutenção.',
        products: [
            { id: 'p1', name: 'BYD Seal GT', quantity: 40, unitPrice: 120000 },
            { id: 'p2', name: 'Wallbox + instalação', quantity: 40, unitPrice: 10000 },
        ],
        activity: [
            { id: 'a1', type: 'task', iconName: 'standard:task', subject: 'Contrato assinado', date: '2 weeks ago', description: 'Negócio fechado e ordem de faturamento emitida.' },
        ],
    },
    {
        id: '10',
        name: 'Lote 25 Tucson 4WD',
        accountName: 'Hyundai Caoa',
        amount: 2400000,
        stage: 'Closed Lost',
        probability: 0,
        closeDate: '28/05/2026',
        closeDateRelative: 'há 3 semanas',
        ownerName: 'Bruno Carvalho',
        type: 'New Business',
        leadSource: 'Licitação',
        forecastCategory: 'Closed',
        einsteinScore: 18,
        scoreTrend: 'down',
        scoreInsight: 'Perdido para concorrente por preço; reavaliar abordagem comercial.',
        nextStep: 'Registrar motivo de perda e nutrir conta para futura retomada.',
        lastActivityDays: 21,
        contactName: 'Marcos Pinheiro',
        contactTitle: 'Gerente de Peças e Acessórios',
        contactEmail: 'mpinheiro@autonation-sp.com.br',
        contactPhone: '(11) 4000-8510',
        description:
            'Proposta de lote com 25 unidades Tucson 4WD para frota corporativa. Cliente optou por concorrente com melhor condição de preço.',
        products: [
            { id: 'p1', name: 'Hyundai Tucson 4WD', quantity: 25, unitPrice: 96000 },
        ],
        activity: [
            { id: 'a1', type: 'task', iconName: 'standard:task', subject: 'Oportunidade perdida', date: '3 weeks ago', description: 'Concorrente venceu por preço. Motivo de perda registrado.' },
        ],
    },
    {
        id: '11',
        name: 'Test-drive elétrico — ativação de marca',
        accountName: 'Toyota AutoShow Rio',
        amount: 420000,
        stage: 'Prospecting',
        probability: 10,
        closeDate: '20/08/2026',
        closeDateRelative: 'em 8 semanas',
        ownerName: 'Lucas Ferreira',
        type: 'New Business',
        leadSource: 'Marketing',
        forecastCategory: 'Pipeline',
        einsteinScore: 29,
        scoreTrend: 'flat',
        scoreInsight: 'Oportunidade nova vinda de campanha; ainda em qualificação inicial.',
        nextStep: 'Validar interesse e orçamento de ativação de marca.',
        lastActivityDays: 5,
        contactName: 'Fernanda Oliveira',
        contactTitle: 'Supervisora de Atendimento',
        contactEmail: 'foliveira@toyota-autoshow.com.br',
        contactPhone: '(21) 3900-7100',
        description:
            'Programa de test-drive elétrico itinerante para ativação de marca em shoppings do Rio de Janeiro, com 6 veículos e equipe de ativação por 8 fins de semana.',
        products: [
            { id: 'p1', name: 'Ativação de marca (8 eventos)', quantity: 8, unitPrice: 40000 },
            { id: 'p2', name: 'Veículos para test-drive', quantity: 6, unitPrice: 16666 },
        ],
        activity: [
            { id: 'a1', type: 'email', iconName: 'standard:email', subject: 'Lead de campanha recebido', date: '5 days ago', description: 'Lead gerado pela campanha de eletrificação.' },
        ],
    },
    {
        id: '12',
        name: 'Renovação contrato de peças OEM',
        accountName: 'Volkswagen do Brasil',
        amount: 2750000,
        stage: 'Negotiation',
        probability: 75,
        closeDate: '25/06/2026',
        closeDateRelative: 'em 6 dias',
        ownerName: 'Camila Souza',
        type: 'Renewal',
        leadSource: 'Conta existente',
        forecastCategory: 'Commit',
        einsteinScore: 77,
        scoreTrend: 'up',
        scoreInsight: 'Renovação madura; condições praticamente acordadas.',
        nextStep: 'Aprovar reajuste anual e renovar por mais 12 meses.',
        lastActivityDays: 2,
        contactName: 'Rafael Mendes',
        contactTitle: 'Gerente de Pós-venda',
        contactEmail: 'rmendes@vwbrasil.com.br',
        contactPhone: '(11) 3500-6200',
        description:
            'Renovação do contrato de fornecimento de peças OEM para a rede de concessionárias VW, com SLA de entrega e catálogo eletrônico integrado.',
        products: [
            { id: 'p1', name: 'Fornecimento de peças OEM (12m)', quantity: 1, unitPrice: 2500000 },
            { id: 'p2', name: 'Catálogo eletrônico integrado', quantity: 1, unitPrice: 250000 },
        ],
        activity: [
            { id: 'a1', type: 'call', iconName: 'standard:log_a_call', subject: 'Negociação de reajuste', date: '2 days ago', description: 'Reajuste anual alinhado; aguardando aprovação final.' },
        ],
    },
];

// --- Decoration -------------------------------------------------------

const TREND_META = {
    up: { icon: 'utility:arrowup', class: 'c-trend c-trend_up', label: 'em alta' },
    down: { icon: 'utility:arrowdown', class: 'c-trend c-trend_down', label: 'em queda' },
    flat: { icon: 'utility:dash', class: 'c-trend c-trend_flat', label: 'estável' },
};

function ownerInitials(name) {
    return (name || '')
        .split(' ')
        .filter(Boolean)
        .map((part) => part[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();
}

function scoreBand(score) {
    if (score >= 70) return 'strong';
    if (score >= 40) return 'medium';
    return 'weak';
}

/** Compute display-ready fields without mutating the source record. */
function decorate(o) {
    const stage = getStageMeta(o.stage);
    const trend = TREND_META[o.scoreTrend] || TREND_META.flat;
    const band = scoreBand(o.einsteinScore);
    return {
        ...o,
        amountLabel: formatCurrencyCompact(o.amount),
        amountFull: formatCurrency(o.amount),
        probability: o.probability ?? stage.probability,
        initials: ownerInitials(o.ownerName),
        scoreTrendIcon: trend.icon,
        scoreTrendClass: trend.class,
        scoreTrendLabel: trend.label,
        scoreBand: band,
        scoreClass: `c-score c-score_${band}`,
        isClosed: stage.isClosed,
        isWon: stage.isWon,
        isLost: o.stage === 'Closed Lost',
        closeText: stage.isClosed ? `Fechado em ${o.closeDate}` : `Fecha em ${o.closeDate}`,
        staleWarning: !stage.isClosed && o.lastActivityDays >= 7,
    };
}

// --- Public accessors -------------------------------------------------

export function getAllOpportunities() {
    return OPPORTUNITIES.map(decorate);
}

export function getOpportunityById(id) {
    const found = OPPORTUNITIES.find((o) => o.id === id);
    return found ? decorate(found) : null;
}

/**
 * Kanban columns: one per BOARD_STAGES entry, each with its decorated deals,
 * raw total, formatted total and count. Column order matches BOARD_STAGES.
 */
export function getBoardColumns() {
    const all = getAllOpportunities();
    return BOARD_STAGES.map((stageName) => {
        const deals = all.filter((o) => o.stage === stageName);
        const total = deals.reduce((sum, d) => sum + d.amount, 0);
        const meta = getStageMeta(stageName);
        return {
            name: stageName,
            probability: meta.probability,
            isWon: meta.isWon,
            deals,
            count: deals.length,
            isEmpty: deals.length === 0,
            total,
            totalLabel: formatCurrencyCompact(total),
            columnClass: meta.isWon ? 'c-board__column c-board__column_won' : 'c-board__column',
        };
    });
}

/** Pipeline KPIs for the board header. Open = not closed. */
export function getPipelineKpis() {
    const all = getAllOpportunities();
    const open = all.filter((o) => !o.isClosed);
    const totalPipeline = open.reduce((sum, o) => sum + o.amount, 0);
    const weighted = open.reduce((sum, o) => sum + (o.amount * o.probability) / 100, 0);
    const closedWon = all
        .filter((o) => o.isWon)
        .reduce((sum, o) => sum + o.amount, 0);
    const attainmentPct = Math.min(100, Math.round((closedWon / QUARTER_QUOTA) * 100));
    return {
        totalPipeline,
        totalPipelineLabel: formatCurrencyCompact(totalPipeline),
        weighted,
        weightedLabel: formatCurrencyCompact(weighted),
        closedWon,
        closedWonLabel: formatCurrencyCompact(closedWon),
        quota: QUARTER_QUOTA,
        quotaLabel: formatCurrencyCompact(QUARTER_QUOTA),
        attainmentPct,
        openCount: open.length,
    };
}

/** Other open opportunities for the same account (for the detail related list). */
export function getRelatedOpportunities(accountName, excludeId) {
    return getAllOpportunities().filter(
        (o) => o.accountName === accountName && o.id !== excludeId
    );
}
