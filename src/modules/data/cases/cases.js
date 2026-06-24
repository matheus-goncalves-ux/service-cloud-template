/**
 * Mock data for Service Cloud Cases — Compra Agora B2B Marketplace.
 * Supports varejistas de vizinhança (small retailers) that buy Unilever
 * products via the Compra Agora platform.
 * Used by page/cases (list view) and page/caseDetail (console record view).
 */

// Ordered status progression used by the Path component on the detail page.
// Each case type has its own path in Portuguese.
export const CASE_STAGES = ['New', 'Working', 'Escalated', 'Closed'];

export const CASE_STAGES_BY_TYPE = {
    Queixas:     ['Novo', 'Em análise', 'Em resolução', 'Resolvido'],
    Informações: ['Novo', 'Em atendimento', 'Respondido', 'Encerrado'],
    Requisições: ['Novo', 'Em análise', 'Aprovado', 'Concluído'],
};

const CASES = [
    /* ------------------------------------------------------------------ */
    /* 1 · Padaria Central Ltda — Item faltante no pedido                  */
    /* ------------------------------------------------------------------ */
    {
        id: '1',
        caseNumber: 'CA-2026-4521',
        caseType: 'Queixas',
        subject: 'Pedido com item faltante — Omo Multiação 3 kg',
        status: 'Working',
        priority: 'High',
        contactName: 'João Costa',
        contactTitle: 'Proprietário',
        contactEmail: 'joao@padariacentral.com.br',
        contactPhone: '(11) 98765-4321',
        accountName: 'Padaria Central Ltda',
        origin: 'App',
        type: 'Problema',
        reason: 'Item faltante na entrega',
        ownerName: 'Ana Lima',
        dateOpened: '20/06/2026 10:14',
        dateOpenedRelative: '2 dias atrás',
        dateModified: '21/06/2026 14:30',
        isEscalated: false,
        slaStatus: 'overdue',
        slaText: 'SLA vencido · 1h 12m',
        description:
            'Pedido #CA-2026-4521 (R$ 2.380, 14 itens) entregue em 19/06 com a caixa de Omo Multiação 3 kg ausente. O cliente confirmou o recebimento do restante dos itens e enviou foto da nota fiscal vs. caixas recebidas. Produto com alto giro na loja — reposição urgente solicitada para não impactar vendas do fim de semana.',
        activity: [
            { id: 'a1', type: 'email', iconName: 'standard:email', subject: 'Caso aberto automaticamente via App', date: '2 dias atrás', description: 'Sistema registrou a reclamação de item faltante e enviou protocolo CA-2026-4521 ao cliente.' },
            { id: 'a2', type: 'call', iconName: 'standard:log_a_call', subject: 'Ligação de confirmação com João Costa', date: '2 dias atrás', description: 'Agente confirmou item faltante e coletou foto da entrega. Solicitado reenvio urgente ao armazém.' },
            { id: 'a3', type: 'task', iconName: 'standard:task', subject: 'Reenvio solicitado ao CD de São Paulo', date: '1 dia atrás', description: 'Ordem de reenvio #OP-2026-8821 criada para Omo Multiação 3 kg. Prazo: 22/06 até as 18h.' }
        ],
        comments: [
            { id: 'c1', author: 'Ana Lima', date: '1 dia atrás', body: 'Confirmei divergência com o CD. Produto estava ausente no picking. Reenvio programado para hoje.' },
            { id: 'c2', author: 'Lucas Ferreira', date: '4 horas atrás', body: 'CD confirmou saída do produto. Código de rastreio: BR-LOG-20-8821. Previsão de entrega amanhã até meio-dia.' }
        ],
        emails: [
            { id: 'e1', subject: 'Re: Item faltante — pedido #CA-2026-4521', from: 'João Costa', date: '2 dias atrás', status: 'Lido' },
            { id: 'e2', subject: 'Confirmação de reenvio — Omo Multiação 3 kg', from: 'Ana Lima', date: '1 dia atrás', status: 'Enviado' }
        ],
        relatedCases: [
            { id: '6', caseNumber: 'CA-2026-4389', subject: 'Cupom UNILEVER15 não aplicado no checkout', status: 'New' }
        ],
        knowledgeArticles: [
            { id: 'k1', title: 'Processo de reenvio por item faltante', type: 'Como fazer' },
            { id: 'k2', title: 'SLA de resolução: entrega e logística', type: 'Política' }
        ]
    },

    /* ------------------------------------------------------------------ */
    /* 2 · Farmácia Popular Saúde — Cobrança duplicada                     */
    /* ------------------------------------------------------------------ */
    {
        id: '2',
        caseNumber: 'CA-2026-4802',
        caseType: 'Queixas',
        subject: 'Cobrança duplicada — Rexona Bamboo 150 ml cobrado duas vezes',
        status: 'Working',
        priority: 'Medium',
        contactName: 'Roberto Ferreira',
        contactTitle: 'Responsável de Compras',
        contactEmail: 'roberto@farmaciasp.com.br',
        contactPhone: '(21) 99876-5432',
        accountName: 'Farmácia Popular Saúde',
        origin: 'Chat',
        type: 'Faturamento',
        reason: 'Divergência de cobrança',
        ownerName: 'Carla Mendes',
        dateOpened: '21/06/2026 08:50',
        dateOpenedRelative: '1 dia atrás',
        dateModified: '21/06/2026 15:10',
        isEscalated: false,
        slaStatus: 'ontrack',
        slaText: 'SLA no prazo · 22h restantes',
        description:
            'Pedido #CA-2026-4802 (R$ 4.150, 28 itens) mostra duplicidade no item Rexona Bamboo Feminino 150 ml (cód. REX-BF-150): foram cobradas 2 unidades mas apenas 1 foi entregue. Diferença de R$ 18,90. Cliente solicita estorno via crédito para próximo pedido.',
        activity: [
            { id: 'a1', type: 'call', iconName: 'standard:log_a_call', subject: 'Contato por chat — revisão da NF', date: '1 dia atrás', description: 'Cliente enviou foto da NF e da caixa recebida. Duplicidade confirmada no item Rexona Bamboo 150 ml.' },
            { id: 'a2', type: 'task', iconName: 'standard:task', subject: 'Solicitação de estorno enviada ao financeiro', date: '1 dia atrás', description: 'Nota de crédito NC-2026-4802 criada para R$ 18,90. Prazo de processamento: 2 dias úteis.' }
        ],
        comments: [
            { id: 'c1', author: 'Carla Mendes', date: '1 dia atrás', body: 'Duplicidade confirmada no sistema. NC criada. Roberto foi informado sobre o prazo do crédito.' }
        ],
        emails: [
            { id: 'e1', subject: 'Re: Cobrança duplicada — pedido #CA-2026-4802', from: 'Roberto Ferreira', date: '1 dia atrás', status: 'Lido' },
            { id: 'e2', subject: 'Nota de crédito NC-2026-4802 gerada', from: 'Carla Mendes', date: '1 dia atrás', status: 'Enviado' }
        ],
        relatedCases: [],
        knowledgeArticles: [
            { id: 'k1', title: 'Como processar estorno e notas de crédito', type: 'Como fazer' },
            { id: 'k2', title: 'Política de divergências de faturamento', type: 'Política' }
        ]
    },

    /* ------------------------------------------------------------------ */
    /* 3 · Gilberto Meireles — Documentação bloqueando crédito             */
    /* ------------------------------------------------------------------ */
    {
        id: '3',
        caseNumber: 'CA-2026-3102',
        caseType: 'Informações',
        subject: 'Documentação pendente — CPF em análise bloqueando limite de crédito',
        status: 'Escalated',
        priority: 'High',
        contactName: 'Gilberto Meireles',
        contactTitle: 'Proprietário (ME)',
        contactEmail: 'gilberto.meireles@gmail.com',
        contactPhone: '(81) 98500-1234',
        accountName: 'Gilberto Meireles',
        origin: 'Telefone',
        type: 'Ativação',
        reason: 'Documentação fiscal pendente',
        ownerName: 'Paulo Carvalho',
        dateOpened: '10/06/2026 14:20',
        dateOpenedRelative: '12 dias atrás',
        dateModified: '17/06/2026 09:00',
        isEscalated: true,
        slaStatus: 'overdue',
        slaText: 'SLA vencido · 1d 3h',
        description:
            'Conta de Gilberto Meireles (CPF 321.654.987-00, ME em Recife) em processo de ativação desde 09/06/2026. Análise de crédito bloqueada aguardando: (1) comprovante de endereço atualizado e (2) alvará de funcionamento. Cliente relatou dificuldade no upload pelo app (smartphone Android com armazenamento limitado). Escalonado para equipe de onboarding após 12 dias sem resolução.',
        activity: [
            { id: 'a1', type: 'email', iconName: 'standard:email', subject: 'Convite de ativação enviado', date: '2 semanas atrás', description: 'E-mail de onboarding enviado com link de cadastro e tutorial em vídeo para uso da plataforma.' },
            { id: 'a2', type: 'call', iconName: 'standard:log_a_call', subject: 'Ligação de onboarding — dificuldade no upload', date: '3 dias atrás', description: 'Chamada de boas-vindas e orientação. Cliente relatou problema no upload de documentos pelo smartphone. Orientado a usar o WhatsApp para envio.' },
            { id: 'a3', type: 'task', iconName: 'standard:task', subject: 'Escalonado para equipe de onboarding', date: '5 dias atrás', description: 'Caso encaminhado ao time de ativação de campo (PE) para suporte presencial se necessário.' }
        ],
        comments: [
            { id: 'c1', author: 'Paulo Carvalho', date: '5 dias atrás', body: 'Alerta de SLA gerado. Cliente ainda sem documentos enviados. Iniciando suporte proativo via WhatsApp.' },
            { id: 'c2', author: 'Equipe de Onboarding PE', date: '2 dias atrás', body: 'Contato feito. Cliente vai enviar documentos pelo WhatsApp nesta semana. Visita presencial agendada para 24/06 se necessário.' }
        ],
        emails: [
            { id: 'e1', subject: 'Documentos necessários para ativação — Compra Agora', from: 'Paulo Carvalho', date: '2 semanas atrás', status: 'Enviado' },
            { id: 'e2', subject: 'Re: Ativação pendente — Gilberto Meireles', from: 'Gilberto Meireles', date: '3 dias atrás', status: 'Lido' }
        ],
        relatedCases: [],
        knowledgeArticles: [
            { id: 'k1', title: 'Checklist de documentação para ativação de varejista', type: 'Como fazer' },
            { id: 'k2', title: 'Alternativas de envio de documentos para clientes sem computador', type: 'Como fazer' },
            { id: 'k3', title: 'Política de crédito para novos varejistas', type: 'Política' }
        ]
    },

    /* ------------------------------------------------------------------ */
    /* 4 · Supermercado BomVizinho — Programa Diamante / gerente dedicado  */
    /* ------------------------------------------------------------------ */
    {
        id: '4',
        caseNumber: 'CA-2026-5001',
        caseType: 'Requisições',
        subject: 'Solicitação de gerente de conta dedicado — programa Diamante',
        status: 'New',
        priority: 'Medium',
        contactName: 'Priscila Ramos',
        contactTitle: 'Gerente de Compras',
        contactEmail: 'priscila@superbomvizinho.com.br',
        contactPhone: '(31) 99100-4321',
        accountName: 'Supermercado BomVizinho',
        origin: 'App',
        type: 'Solicitação de serviço',
        reason: 'Benefício de fidelidade',
        ownerName: 'Marcos Oliveira',
        dateOpened: '21/06/2026 08:45',
        dateOpenedRelative: 'Hoje',
        dateModified: '21/06/2026 08:45',
        isEscalated: false,
        slaStatus: 'ontrack',
        slaText: 'SLA no prazo · 1d 20h restantes',
        description:
            'Supermercado BomVizinho atingiu o tier Diamante em maio/2026 com GMV acumulado acima de R$ 100.000 nos últimos 12 meses. A política do programa Diamante prevê gerente de conta dedicado. Priscila solicita formalização do benefício e agendamento de reunião de onboarding com o gerente designado. Conta é o maior varejista ativo na região de Belo Horizonte.',
        activity: [
            { id: 'a1', type: 'email', iconName: 'standard:email', subject: 'Solicitação recebida via App', date: 'Hoje', description: 'Caso criado automaticamente após solicitação de benefício no aplicativo.' }
        ],
        comments: [],
        emails: [
            { id: 'e1', subject: 'Re: Gerente de conta — Programa Diamante', from: 'Priscila Ramos', date: 'Hoje', status: 'Lido' }
        ],
        relatedCases: [],
        knowledgeArticles: [
            { id: 'k1', title: 'Benefícios e critérios do Programa Diamante', type: 'Política' },
            { id: 'k2', title: 'Processo de designação de gerente de conta dedicado', type: 'Como fazer' }
        ]
    },

    /* ------------------------------------------------------------------ */
    /* 5 · Sandra Aparecida Moreira — Produto danificado (Encerrado)       */
    /* ------------------------------------------------------------------ */
    {
        id: '5',
        caseNumber: 'CA-2026-4198',
        caseType: 'Queixas',
        subject: 'Dove Shampoo 2em1 400 ml entregue danificado',
        status: 'Closed',
        priority: 'Low',
        contactName: 'Sandra Aparecida Moreira',
        contactTitle: 'Proprietária',
        contactEmail: 'sandrabeautyshop@gmail.com',
        contactPhone: '(19) 99234-5678',
        accountName: 'Sandra Aparecida Moreira',
        origin: 'Chat',
        type: 'Problema',
        reason: 'Produto danificado na entrega',
        ownerName: 'Ana Lima',
        dateOpened: '05/06/2026 16:00',
        dateOpenedRelative: '2 semanas atrás',
        dateModified: '07/06/2026 10:15',
        isEscalated: false,
        slaStatus: 'met',
        slaText: 'SLA cumprido · Encerrado',
        description:
            'Sandra recebeu o pedido #CA-2026-4198 com a embalagem do Dove Shampoo 2em1 400 ml amassada e o produto vazado. Produto avaliado em R$ 24,90. Cliente enviou foto via chat. Ressarcimento via crédito para próximo pedido processado em 2 dias úteis.',
        activity: [
            { id: 'a1', type: 'call', iconName: 'standard:log_a_call', subject: 'Atendimento via chat — produto danificado', date: '2 semanas atrás', description: 'Sandra enviou foto da embalagem danificada. Ressarcimento por crédito aprovado imediatamente.' },
            { id: 'a2', type: 'task', iconName: 'standard:task', subject: 'Crédito de R$ 24,90 processado', date: '2 semanas atrás', description: 'Crédito aplicado na conta. Caso encerrado com resolução na primeira interação (FCR).' }
        ],
        comments: [
            { id: 'c1', author: 'Ana Lima', date: '2 semanas atrás', body: 'Crédito aplicado e caso encerrado. FCR atingido. CSAT esperado: 5 estrelas.' }
        ],
        emails: [
            { id: 'e1', subject: 'Confirmação de crédito — CA-2026-4198', from: 'Ana Lima', date: '2 semanas atrás', status: 'Enviado' }
        ],
        relatedCases: [],
        knowledgeArticles: [
            { id: 'k1', title: 'Política de ressarcimento por produto danificado', type: 'Política' }
        ]
    },

    /* ------------------------------------------------------------------ */
    /* 6 · Padaria Central Ltda — Cupom não aplicado                       */
    /* ------------------------------------------------------------------ */
    {
        id: '6',
        caseNumber: 'CA-2026-4389',
        caseType: 'Informações',
        subject: 'Cupom promocional UNILEVER15 não aplicado no checkout',
        status: 'New',
        priority: 'Low',
        contactName: 'João Costa',
        contactTitle: 'Proprietário',
        contactEmail: 'joao@padariacentral.com.br',
        contactPhone: '(11) 98765-4321',
        accountName: 'Padaria Central Ltda',
        origin: 'Chat',
        type: 'Problema',
        reason: 'Cupom ou promoção não aplicada',
        ownerName: 'Ana Lima',
        dateOpened: '18/06/2026 15:30',
        dateOpenedRelative: '4 dias atrás',
        dateModified: '18/06/2026 15:30',
        isEscalated: false,
        slaStatus: 'ontrack',
        slaText: 'SLA no prazo · 2 dias restantes',
        description:
            'João relata que o cupom UNILEVER15 (15% de desconto em produtos Unilever acima de R$ 500) não foi deduzido no checkout do pedido #CA-2026-4520 (R$ 890). Cupom estava ativo e dentro da validade (15–22/06/2026). Desconto esperado: R$ 133,50.',
        activity: [
            { id: 'a1', type: 'email', iconName: 'standard:email', subject: 'Caso aberto via chat', date: '4 dias atrás', description: 'João relatou que o cupom UNILEVER15 não foi aplicado. Protocolo aberto e cliente informado.' }
        ],
        comments: [],
        emails: [
            { id: 'e1', subject: 'Re: Cupom UNILEVER15 — pedido #CA-2026-4520', from: 'João Costa', date: '4 dias atrás', status: 'Lido' }
        ],
        relatedCases: [
            { id: '1', caseNumber: 'CA-2026-4521', subject: 'Pedido com item faltante — Omo Multiação 3 kg', status: 'Working' }
        ],
        knowledgeArticles: [
            { id: 'k1', title: 'Como validar e reaplicar cupons promocionais', type: 'Como fazer' },
            { id: 'k2', title: 'Regras de uso de cupons Unilever', type: 'Política' }
        ]
    },

    /* ------------------------------------------------------------------ */
    /* 7 · Farmácia Popular Saúde — Ampliação de limite (Encerrado)        */
    /* ------------------------------------------------------------------ */
    {
        id: '7',
        caseNumber: 'CA-2026-3801',
        caseType: 'Requisições',
        subject: 'Solicitação de ampliação de limite de crédito',
        status: 'Closed',
        priority: 'Low',
        contactName: 'Roberto Ferreira',
        contactTitle: 'Responsável de Compras',
        contactEmail: 'roberto@farmaciasp.com.br',
        contactPhone: '(21) 99876-5432',
        accountName: 'Farmácia Popular Saúde',
        origin: 'App',
        type: 'Solicitação de serviço',
        reason: 'Ampliação de crédito',
        ownerName: 'Carla Mendes',
        dateOpened: '01/06/2026 09:00',
        dateOpenedRelative: '3 semanas atrás',
        dateModified: '03/06/2026 16:40',
        isEscalated: false,
        slaStatus: 'met',
        slaText: 'SLA cumprido · Encerrado',
        description:
            'Farmácia Popular Saúde solicita ampliação do limite de crédito de R$ 12.000 para R$ 20.000. Histórico de pagamentos: 100% dentro do prazo nos últimos 6 meses. GMV mensal crescendo 20% MoM. Tier Prata com CSAT 4.7.',
        activity: [
            { id: 'a1', type: 'email', iconName: 'standard:email', subject: 'Solicitação de ampliação de crédito recebida', date: '3 semanas atrás', description: 'Formulário de solicitação encaminhado ao time de análise de crédito.' },
            { id: 'a2', type: 'task', iconName: 'standard:task', subject: 'Análise de crédito aprovada', date: '3 semanas atrás', description: 'Score de crédito excelente. Limite atualizado de R$ 12.000 para R$ 20.000 com vigência imediata.' }
        ],
        comments: [
            { id: 'c1', author: 'Carla Mendes', date: '3 semanas atrás', body: 'Aprovação expressa pelo histórico exemplar. Limite atualizado. Roberto notificado por e-mail.' }
        ],
        emails: [
            { id: 'e1', subject: 'Novo limite de crédito aprovado — R$ 20.000', from: 'Carla Mendes', date: '3 semanas atrás', status: 'Enviado' }
        ],
        relatedCases: [],
        knowledgeArticles: [
            { id: 'k1', title: 'Critérios para ampliação de limite de crédito', type: 'Política' },
            { id: 'k2', title: 'Como solicitar revisão de crédito pelo app', type: 'Como fazer' }
        ]
    }
];

/**
 * Derive a believable field-history table from a case's own data.
 * Keeps the mock self-consistent without hand-authoring rows per case.
 */
function defaultHistory(c) {
    return [
        {
            id: `${c.id}-h1`,
            date: c.dateModified,
            user: c.ownerName,
            field: 'Status',
            original: 'New',
            newValue: c.status,
        },
        {
            id: `${c.id}-h2`,
            date: c.dateOpened,
            user: c.ownerName,
            field: 'Prioridade',
            original: '—',
            newValue: c.priority,
        },
        {
            id: `${c.id}-h3`,
            date: c.dateOpened,
            user: 'Sistema',
            field: 'Caso criado',
            original: '',
            newValue: `Canal ${c.origin}`,
        },
    ];
}

/** A small, type-aware set of attached files. */
function defaultFiles(c) {
    const files = [
        {
            id: `${c.id}-f1`,
            name: `Protocolo-${c.caseNumber}.pdf`,
            fileType: 'PDF',
            size: '128 KB',
            date: c.dateOpenedRelative,
        },
    ];
    if (c.type === 'Problema') {
        files.push({
            id: `${c.id}-f2`,
            name: `Evidencia-${c.caseNumber}.jpg`,
            fileType: 'Imagem',
            size: '2,4 MB',
            date: c.dateOpenedRelative,
        });
    }
    return files;
}

/** Augment every case with derived related records used by the detail page. */
function decorate(c) {
    return {
        ...c,
        caseHistory: c.caseHistory ?? defaultHistory(c),
        files: c.files ?? defaultFiles(c),
    };
}

export function getAllCases() {
    return CASES.map(decorate);
}

export function getCaseById(id) {
    const found = CASES.find((c) => c.id === id);
    return found ? decorate(found) : null;
}

