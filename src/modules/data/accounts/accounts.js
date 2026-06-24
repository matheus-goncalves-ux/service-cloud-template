/**
 * Compra Agora B2B — Account mock data.
 *
 * Models varejistas (retailers) that use the Compra Agora platform from
 * Unilever Brasil. Mix of Business Accounts (CNPJ) and Personal Accounts
 * (CPF, indivíduo dono do negócio).
 *
 * Consumed by:
 *   - page/accounts (list view)
 *   - page/accountDetail (record view)
 */

export const ACCOUNT_STAGES = ['Prospecto', 'Em Ativação', 'Ativo', 'VIP'];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

export function formatCurrencyCompact(value) {
    if (!value && value !== 0) return '—';
    if (value >= 1_000_000) {
        return `R$ ${(value / 1_000_000).toFixed(1).replace('.', ',')} mi`;
    }
    if (value >= 1_000) {
        return `R$ ${(value / 1_000).toFixed(1).replace('.', ',')} mil`;
    }
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const ACCOUNTS = [
    /* ------------------------------------------------------------------ */
    /* 1 · Padaria Central Ltda — Business Account, SP, tier Ouro          */
    /* ------------------------------------------------------------------ */
    {
        id: '1',
        name: 'Padaria Central Ltda',
        type: 'Business',
        cnpj: '12.345.678/0001-99',
        cpf: null,
        personFirstName: null,
        personLastName: null,
        birthDate: null,
        segment: 'Padaria e Confeitaria',
        industry: 'Alimentício',
        city: 'São Paulo',
        state: 'SP',
        address: 'Rua das Flores, 142, Loja 1 — Vila Madalena',
        phone: '(11) 3456-7890',
        email: 'contato@padariacentral.com.br',
        website: 'padariacentral.com.br',
        ownerName: 'Ana Lima',
        status: 'Ativo',
        loyaltyTier: 'Ouro',
        activationDate: '01/03/2025',
        gmvLast30: 8400,
        ordersLast30: 22,
        csat: 4.2,
        creditLimit: 15000,
        creditUsed: 4200,
        description:
            'Padaria e confeitaria de bairro com 12 anos de mercado em Vila Madalena, São Paulo. Foco em produtos artesanais e atendimento local. Compra principalmente Higiene Doméstica, Limpeza (Omo, Comfort) e Bebidas para a cafeteria interna.',
        contacts: [
            {
                id: 'ct1-1',
                name: 'João Costa',
                title: 'Proprietário',
                email: 'joao@padariacentral.com.br',
                phone: '(11) 98765-4321',
                isPrimary: true,
            },
            {
                id: 'ct1-2',
                name: 'Maria Santos',
                title: 'Gerente de Compras',
                email: 'maria@padariacentral.com.br',
                phone: '(11) 97654-3210',
                isPrimary: false,
            },
        ],
        cases: [
            {
                id: 'ca1-1',
                caseNumber: 'CA-2026-4521',
                subject: 'Pedido com item faltante — Omo Multiação 3 kg',
                status: 'Working',
                priority: 'Medium',
                origin: 'App',
                ownerName: 'Ana Lima',
                dateOpened: '20/06/2026 10:14',
                slaStatus: 'ontrack',
                slaText: 'SLA no prazo · 6h restantes',
            },
            {
                id: 'ca1-2',
                caseNumber: 'CA-2026-4389',
                subject: 'Cupom UNILEVER15 não aplicado no checkout',
                status: 'New',
                priority: 'Low',
                origin: 'Chat',
                ownerName: 'Ana Lima',
                dateOpened: '18/06/2026 15:30',
                slaStatus: 'ontrack',
                slaText: 'SLA no prazo · 2 dias restantes',
            },
        ],
        activity: [
            {
                id: 'at1-sec-future',
                type: 'section',
                label: 'Futuras & Vencidas',
            },
            {
                id: 'at1-sec-oct',
                type: 'section',
                label: 'Outubro • 2025',
            },
            {
                id: 'at1-1',
                iconName: 'standard:event',
                subjectIcon: 'utility:world',
                subject: 'Visita ao cliente – Seguro Fiança',
                date: '10:00 | 08/10/25',
                actor: 'Você',
                actorAction: 'criou um evento com',
                actorTargets: [{ label: 'Vicente' }],
                actorSuffix: 'e 2 outros',
                fields: [
                    {
                        label: 'Localização',
                        value: 'Rua das Flores, 245 – Centro, Campinas – SP',
                        linkable: true,
                    },
                    {
                        label: 'Participantes',
                        value: 'Beatriz (Organizadora) + 5 outros',
                        linkable: true,
                    },
                    {
                        label: 'Quando',
                        value: '12 de novembro de 2025 14:00 – 16:00 (BRT)',
                        linkable: true,
                    },
                ],
                description:
                    'Visita presencial ao cliente para apresentação do seguro fiança para locação residencial.',
            },
            {
                id: 'at1-2',
                iconName: 'standard:log_a_call',
                subject: 'Ligação — Campanha Unilever Week',
                date: '5 dias atrás',
                description:
                    'Apresentação da campanha Unilever Week. Cliente manifestou interesse em ampliar mix de beleza.',
            },
            {
                id: 'at1-3',
                iconName: 'standard:email',
                subject: 'E-mail de upgrade para tier Ouro',
                date: '2 semanas atrás',
                description:
                    'Notificação automática enviada após atingir R$ 7.500 em GMV mensal, confirmando upgrade para Ouro.',
            },
        ],
    },

    /* ------------------------------------------------------------------ */
    /* 2 · Farmácia Popular Saúde — Business Account, RJ, tier Prata       */
    /* ------------------------------------------------------------------ */
    {
        id: '2',
        name: 'Farmácia Popular Saúde',
        type: 'Business',
        cnpj: '23.456.789/0001-00',
        cpf: null,
        personFirstName: null,
        personLastName: null,
        birthDate: null,
        segment: 'Farmácia e Drogaria',
        industry: 'Saúde e Beleza',
        city: 'Rio de Janeiro',
        state: 'RJ',
        address: 'Av. das Américas, 800, Lj. 12 — Barra da Tijuca',
        phone: '(21) 3900-4500',
        email: 'compras@farmaciasp.com.br',
        website: 'farmaciasp.com.br',
        ownerName: 'Carla Mendes',
        status: 'Ativo',
        loyaltyTier: 'Prata',
        activationDate: '10/05/2025',
        gmvLast30: 12300,
        ordersLast30: 35,
        csat: 4.7,
        creditLimit: 20000,
        creditUsed: 7800,
        description:
            'Drogaria independente com forte penetração em higiene pessoal e beleza. Top comprador de Dove, TRESemmé, Rexona e produtos de limpeza Omo e Comfort. Alta recorrência de pedidos e excelente CSAT.',
        contacts: [
            {
                id: 'ct2-1',
                name: 'Roberto Ferreira',
                title: 'Responsável de Compras',
                email: 'roberto@farmaciasp.com.br',
                phone: '(21) 99876-5432',
                isPrimary: true,
            },
        ],
        cases: [
            {
                id: 'ca2-1',
                caseNumber: 'CA-2026-3801',
                subject: 'Solicitação de ampliação de limite de crédito',
                status: 'Closed',
                priority: 'Low',
                origin: 'App',
                ownerName: 'Carla Mendes',
                dateOpened: '01/06/2026 09:00',
                slaStatus: 'met',
                slaText: 'SLA cumprido · Fechado',
            },
        ],
        activity: [
            {
                id: 'at2-1',
                iconName: 'standard:event',
                subject: 'Pedido #CA-2026-4802 realizado',
                date: '1 dia atrás',
                description: 'Pedido de R$ 4.150 com 28 itens: TRESemmé, Dove e Rexona.',
            },
            {
                id: 'at2-2',
                iconName: 'standard:email',
                subject: 'Oferta especial — Beleza Week',
                date: '1 semana atrás',
                description: 'E-mail enviado com 12% de desconto em produtos Dove e TRESemmé.',
            },
            {
                id: 'at2-3',
                iconName: 'standard:task',
                subject: 'Limite de crédito ampliado para R$ 20.000',
                date: '2 semanas atrás',
                description:
                    'Análise de crédito aprovada. Limite atualizado de R$ 12.000 para R$ 20.000.',
            },
        ],
    },

    /* ------------------------------------------------------------------ */
    /* 3 · Gilberto Meireles — PersonAccount (ME), PE, tier Bronze          */
    /* ------------------------------------------------------------------ */
    {
        id: '3',
        name: 'Gilberto Meireles',
        type: 'PersonAccount',
        cnpj: null,
        cpf: '321.654.987-00',
        personFirstName: 'Gilberto',
        personLastName: 'Meireles',
        birthDate: '14/08/1978',
        segment: 'Mercearia de Bairro',
        industry: 'Alimentício',
        city: 'Recife',
        state: 'PE',
        address: 'Rua do Futuro, 210, Boa Viagem',
        phone: '(81) 98500-1234',
        email: 'gilberto.meireles@gmail.com',
        website: null,
        ownerName: 'Paulo Carvalho',
        status: 'Em Ativação',
        loyaltyTier: 'Bronze',
        activationDate: null,
        gmvLast30: 3200,
        ordersLast30: 8,
        csat: 3.8,
        creditLimit: 3000,
        creditUsed: 1200,
        description:
            'Mercearia de bairro em Boa Viagem, Recife, administrada pelo próprio dono. Em processo de ativação completa — documentação fiscal ainda em análise. Dependência de Omo, Comfort, Knorr e Maizena para reposição semanal.',
        contacts: [],
        cases: [
            {
                id: 'ca3-1',
                caseNumber: 'CA-2026-3102',
                subject: 'Documentação pendente para liberação de crédito',
                status: 'Working',
                priority: 'High',
                origin: 'Telefone',
                ownerName: 'Paulo Carvalho',
                dateOpened: '10/06/2026 14:20',
                slaStatus: 'overdue',
                slaText: 'SLA vencido · 1d 3h',
            },
            {
                id: 'ca3-2',
                caseNumber: 'CA-2026-3244',
                subject: 'Entrega do pedido #CA-2026-3244 não realizada',
                status: 'Escalated',
                priority: 'High',
                origin: 'App',
                ownerName: 'Paulo Carvalho',
                dateOpened: '17/06/2026 11:00',
                slaStatus: 'overdue',
                slaText: 'SLA vencido · 4h 12m',
            },
        ],
        activity: [
            {
                id: 'at3-1',
                iconName: 'standard:log_a_call',
                subject: 'Ligação de onboarding',
                date: '3 dias atrás',
                description:
                    'Chamada de boas-vindas e orientação sobre uso do app. Cliente relatou dificuldade no upload de documentos pelo smartphone.',
            },
            {
                id: 'at3-2',
                iconName: 'standard:task',
                subject: 'Alerta de SLA — documentação pendente',
                date: '5 dias atrás',
                description:
                    'Sistema gerou alerta de SLA para CA-2026-3102. CNPJ e comprovante de endereço ainda não enviados.',
            },
            {
                id: 'at3-3',
                iconName: 'standard:email',
                subject: 'Convite de ativação Compra Agora',
                date: '2 semanas atrás',
                description:
                    'E-mail de onboarding enviado com link de cadastro e tutorial em vídeo para uso da plataforma.',
            },
        ],
    },

    /* ------------------------------------------------------------------ */
    /* 4 · Supermercado BomVizinho — Business Account, MG, tier Diamante   */
    /* ------------------------------------------------------------------ */
    {
        id: '4',
        name: 'Supermercado BomVizinho',
        type: 'Business',
        cnpj: '34.567.890/0001-11',
        cpf: null,
        personFirstName: null,
        personLastName: null,
        birthDate: null,
        segment: 'Supermercado de Vizinhança',
        industry: 'Varejo Alimentar',
        city: 'Belo Horizonte',
        state: 'MG',
        address: 'Rua Sergipe, 1280 — Funcionários',
        phone: '(31) 3300-8800',
        email: 'compras@superbomvizinho.com.br',
        website: 'superbomvizinho.com.br',
        ownerName: 'Marcos Oliveira',
        status: 'VIP',
        loyaltyTier: 'Diamante',
        activationDate: '15/01/2025',
        gmvLast30: 28700,
        ordersLast30: 64,
        csat: 4.5,
        creditLimit: 50000,
        creditUsed: 18200,
        description:
            'Supermercado de vizinhança consolidado em Belo Horizonte. Um dos maiores compradores da plataforma na região — mix completo de Alimentos (Hellmann\'s, Knorr, Kibon), Limpeza (Omo, Cif) e Higiene (Dove, AXE, TRESemmé). Acesso antecipado a lançamentos e gerente dedicado.',
        contacts: [
            {
                id: 'ct4-1',
                name: 'Priscila Ramos',
                title: 'Gerente de Compras',
                email: 'priscila@superbomvizinho.com.br',
                phone: '(31) 99100-4321',
                isPrimary: true,
            },
            {
                id: 'ct4-2',
                name: 'Felipe Souza',
                title: 'Sócio-Proprietário',
                email: 'felipe@superbomvizinho.com.br',
                phone: '(31) 98200-0001',
                isPrimary: false,
            },
        ],
        cases: [
            {
                id: 'ca4-1',
                caseNumber: 'CA-2026-5001',
                subject: 'Solicitação de gerente de conta dedicado',
                status: 'New',
                priority: 'Medium',
                origin: 'App',
                ownerName: 'Marcos Oliveira',
                dateOpened: '21/06/2026 08:45',
                slaStatus: 'ontrack',
                slaText: 'SLA no prazo · 1d 20h restantes',
            },
        ],
        activity: [
            {
                id: 'at4-1',
                iconName: 'standard:event',
                subject: 'Pedido recorde — R$ 8.920',
                date: '3 dias atrás',
                description:
                    'Pedido de R$ 8.920 com 52 itens. Foco em reposição de Alimentos e Higiene para o fim de semana.',
            },
            {
                id: 'at4-2',
                iconName: 'standard:log_a_call',
                subject: 'Revisão trimestral Q2',
                date: '1 semana atrás',
                description:
                    'Performance Q2: GMV +34% vs. Q1. Discutidas oportunidades em bebidas e alimentos premium.',
            },
            {
                id: 'at4-3',
                iconName: 'standard:email',
                subject: 'Upgrade para Diamante confirmado',
                date: '3 semanas atrás',
                description:
                    'Benefícios ativados: desconto 5% adicional, frete grátis e acesso antecipado a promoções.',
            },
        ],
    },

    /* ------------------------------------------------------------------ */
    /* 5 · Sandra Aparecida Moreira — PersonAccount, SP, tier Prata        */
    /* ------------------------------------------------------------------ */
    {
        id: '5',
        name: 'Sandra Aparecida Moreira',
        type: 'PersonAccount',
        cnpj: null,
        cpf: '456.789.012-33',
        personFirstName: 'Sandra',
        personLastName: 'Aparecida Moreira',
        birthDate: '22/03/1985',
        segment: 'Perfumaria e Higiene',
        industry: 'Saúde e Beleza',
        city: 'Campinas',
        state: 'SP',
        address: 'Av. José de Souza Campos, 900 — Nova Campinas',
        phone: '(19) 99234-5678',
        email: 'sandrabeautyshop@gmail.com',
        website: null,
        ownerName: 'Ana Lima',
        status: 'Ativo',
        loyaltyTier: 'Prata',
        activationDate: '20/04/2025',
        gmvLast30: 5600,
        ordersLast30: 15,
        csat: 4.9,
        creditLimit: 8000,
        creditUsed: 2100,
        description:
            'Perfumaria e loja de higiene pessoal em Campinas gerida pela própria dona. Especialização em produtos femininos: Dove, TRESemmé, Seda e Rexona. Alta satisfação e crescimento consistente desde a ativação. CSAT mais alto da carteira.',
        contacts: [],
        cases: [
            {
                id: 'ca5-1',
                caseNumber: 'CA-2026-4198',
                subject: 'Dove Shampoo 2em1 400 ml entregue danificado',
                status: 'Closed',
                priority: 'Low',
                origin: 'Chat',
                ownerName: 'Ana Lima',
                dateOpened: '05/06/2026 16:00',
                slaStatus: 'met',
                slaText: 'SLA cumprido · Fechado',
            },
        ],
        activity: [
            {
                id: 'at5-1',
                iconName: 'standard:event',
                subject: 'Pedido #CA-2026-4901 realizado',
                date: '1 dia atrás',
                description:
                    'Pedido de R$ 1.840 com TRESemmé Blindagem, Dove Body e Seda Cachos. Entrega expressa selecionada.',
            },
            {
                id: 'at5-2',
                iconName: 'standard:email',
                subject: 'Avaliação 5 estrelas recebida',
                date: '4 dias atrás',
                description:
                    '"Produto chegou rapidinho e embalagem perfeita. Adorei a promoção de frete!" — 5/5.',
            },
            {
                id: 'at5-3',
                iconName: 'standard:task',
                subject: 'Ressarcimento processado — produto danificado',
                date: '2 semanas atrás',
                description:
                    'Crédito de R$ 24,90 (Dove Shampoo 2em1 400 ml) processado. Caso CA-2026-4198 encerrado.',
            },
        ],
    },
];

// ---------------------------------------------------------------------------
// Related lists (Relacionado tab) + Chatter feed — keyed by account id.
//
// Kept separate from the records above and merged in below so the large
// account literals stay readable. Each entry adds the four related objects
// surfaced on the record page: opportunities, files, partners and posts.
// `stage` values match data/opportunities SALES_STAGES; accountDetail maps
// them to PT labels + badge styling.
// ---------------------------------------------------------------------------

const RELATED_BY_ID = {
    '1': {
        opportunities: [
            { id: 'op1-1', name: 'Plano trimestral — Linha Limpeza (Omo & Comfort)', stage: 'Negotiation', amount: 18000, closeDate: '30/07/2026' },
            { id: 'op1-2', name: 'Expansão de mix — Bebidas para a cafeteria', stage: 'Proposal', amount: 9500, closeDate: '22/08/2026' },
        ],
        files: [
            { id: 'fi1-1', name: 'Contrato_Fornecimento_2026.pdf', fileType: 'PDF', size: '1,2 MB', date: '02/03/2025' },
            { id: 'fi1-2', name: 'Tabela_Precos_Unilever.xlsx', fileType: 'Planilha', size: '340 KB', date: '15/06/2026' },
        ],
        partners: [
            { id: 'pa1-1', name: 'Distribuidora Sul Alimentos', role: 'Distribuidor', type: 'Atacado' },
            { id: 'pa1-2', name: 'TransLog Express', role: 'Transportadora', type: 'Logística' },
        ],
        posts: [
            { id: 'po1-1', author: 'Ana Lima', date: '2 dias atrás', body: 'Cliente confirmou interesse em ampliar o mix de beleza na próxima campanha. Vou preparar uma proposta.' },
            { id: 'po1-2', author: 'Compra Agora', date: '2 semanas atrás', body: 'Conta promovida ao tier Ouro após atingir R$ 7.500 em GMV mensal.' },
        ],
    },
    '2': {
        opportunities: [
            { id: 'op2-1', name: 'Renovação anual — Higiene & Beleza', stage: 'Proposal', amount: 24000, closeDate: '10/09/2026' },
        ],
        files: [
            { id: 'fi2-1', name: 'Analise_Credito_Aprovada.pdf', fileType: 'PDF', size: '820 KB', date: '12/06/2026' },
            { id: 'fi2-2', name: 'Catalogo_Beleza_2026.pdf', fileType: 'PDF', size: '4,1 MB', date: '01/06/2026' },
        ],
        partners: [
            { id: 'pa2-1', name: 'Drogarias Associadas RJ', role: 'Rede parceira', type: 'Varejo' },
        ],
        posts: [
            { id: 'po2-1', author: 'Carla Mendes', date: '1 dia atrás', body: 'Excelente recorrência de pedidos este mês. CSAT segue em 4,7 — uma das melhores da carteira.' },
            { id: 'po2-2', author: 'Carla Mendes', date: '2 semanas atrás', body: 'Limite de crédito ampliado para R$ 20.000 após análise aprovada.' },
        ],
    },
    '3': {
        opportunities: [
            { id: 'op3-1', name: 'Ativação completa + primeiro pedido recorrente', stage: 'Qualification', amount: 6000, closeDate: '15/08/2026' },
        ],
        files: [
            { id: 'fi3-1', name: 'Comprovante_Endereco.pdf', fileType: 'PDF', size: '410 KB', date: '09/06/2026' },
            { id: 'fi3-2', name: 'Foto_Fachada_Mercearia.png', fileType: 'Imagem', size: '2,3 MB', date: '09/06/2026' },
        ],
        partners: [
            { id: 'pa3-1', name: 'Atacado Nordeste Distribuição', role: 'Distribuidor', type: 'Atacado' },
        ],
        posts: [
            { id: 'po3-1', author: 'Paulo Carvalho', date: '3 dias atrás', body: 'Cliente com dificuldade no upload de documentos pelo celular. Vou agendar um suporte guiado.' },
            { id: 'po3-2', author: 'Compra Agora', date: '5 dias atrás', body: 'Alerta de SLA: documentação fiscal pendente para liberação de crédito.' },
        ],
    },
    '4': {
        opportunities: [
            { id: 'op4-1', name: 'Contrato anual de fornecimento premium', stage: 'Closed Won', amount: 120000, closeDate: '15/01/2026' },
            { id: 'op4-2', name: 'Linha de bebidas & alimentos premium Q3', stage: 'Negotiation', amount: 32000, closeDate: '05/09/2026' },
        ],
        files: [
            { id: 'fi4-1', name: 'Contrato_Anual_Premium.pdf', fileType: 'PDF', size: '2,0 MB', date: '15/01/2025' },
            { id: 'fi4-2', name: 'Revisao_Trimestral_Q2.xlsx', fileType: 'Planilha', size: '560 KB', date: '14/06/2026' },
        ],
        partners: [
            { id: 'pa4-1', name: 'Central de Distribuição BH', role: 'Distribuidor', type: 'Atacado' },
            { id: 'pa4-2', name: 'Rota Fria Logística', role: 'Transportadora', type: 'Logística refrigerada' },
        ],
        posts: [
            { id: 'po4-1', author: 'Marcos Oliveira', date: '3 dias atrás', body: 'Pedido recorde de R$ 8.920 nesta semana. Vamos discutir oportunidades em bebidas premium na revisão.' },
            { id: 'po4-2', author: 'Marcos Oliveira', date: '3 semanas atrás', body: 'Upgrade para Diamante confirmado — frete grátis e acesso antecipado já ativados.' },
        ],
    },
    '5': {
        opportunities: [
            { id: 'op5-1', name: 'Kit perfumaria sazonal — Dia das Mães', stage: 'Negotiation', amount: 9000, closeDate: '25/07/2026' },
        ],
        files: [
            { id: 'fi5-1', name: 'Comprovante_Ressarcimento.pdf', fileType: 'PDF', size: '220 KB', date: '06/06/2026' },
        ],
        partners: [
            { id: 'pa5-1', name: 'Beauty Distribuidora Campinas', role: 'Distribuidor', type: 'Cosméticos' },
        ],
        posts: [
            { id: 'po5-1', author: 'Ana Lima', date: '1 dia atrás', body: 'Avaliação 5 estrelas recebida! Cliente elogiou a rapidez da entrega expressa.' },
            { id: 'po5-2', author: 'Ana Lima', date: '2 semanas atrás', body: 'Ressarcimento de R$ 24,90 processado e caso encerrado. Cliente satisfeita.' },
        ],
    },
};

// Merge the related lists onto each account record.
ACCOUNTS.forEach((account) => {
    Object.assign(account, RELATED_BY_ID[account.id] || {});
});

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export function getAllAccounts() {
    return ACCOUNTS;
}

export function getAccountById(id) {
    return ACCOUNTS.find((a) => a.id === id) ?? null;
}
