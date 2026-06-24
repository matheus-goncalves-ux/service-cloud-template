/**
 * Compra Agora B2B — dados mock de Contatos.
 *
 * Representa varejistas de vizinhança (mercearias, padarias, farmácias,
 * perfumarias, minimercados) e parceiros de indústria conectados à
 * plataforma Compra Agora da Unilever Brasil.
 *
 * Campos por tela:
 *   - list view:    accountName, title, lastActivity
 *   - record page:  opportunities, cases, campaigns, notes
 *
 * Consumido por:
 *   - page/contacts       (list view)
 *   - page/contactDetail  (record view)
 */

const CONTACTS = [
    {
        id: '1',
        firstName: 'Carlos',
        lastName: 'Mendonça',
        name: 'Carlos Mendonça',
        title: 'Proprietário',
        accountName: 'Mercadinho Bom Preço',
        company: 'Mercadinho Bom Preço',
        email: 'carlos@mercadinhobomp.com.br',
        phone: '(11) 3344-5566',
        mobile: '(11) 98877-6655',
        department: 'Compras',
        mailingStreet: 'Rua das Flores, 142',
        mailingCity: 'São Paulo',
        mailingState: 'SP',
        mailingZip: '02010-000',
        lastActivity: '23/06/2026',
        description: 'Proprietário do Mercadinho Bom Preço, varejista de vizinhança na Zona Norte de São Paulo. Cliente ativo da plataforma desde 2024.',
        opportunities: [],
        cases: [
            {
                id: 'c1-1',
                caseNumber: '00008821',
                subject: 'Entrega com atraso — pedido #PD-44201',
                status: 'Em andamento'
            }
        ],
        campaigns: [],
        notes: []
    },
    {
        id: '2',
        firstName: 'Ana',
        lastName: 'Lima',
        name: 'Ana Lima',
        title: 'Gerente de Compras',
        accountName: 'Supermercado Vizinhança',
        company: 'Supermercado Vizinhança',
        email: 'ana.lima@supervizinhanca.com.br',
        phone: '(21) 2233-4455',
        mobile: '(21) 99988-7766',
        department: 'Compras',
        mailingStreet: 'Av. das Américas, 2001',
        mailingCity: 'Rio de Janeiro',
        mailingState: 'RJ',
        mailingZip: '22640-102',
        lastActivity: '21/06/2026',
        description: 'Responsável pelas compras e reposição de estoque do Supermercado Vizinhança, rede com 3 lojas no Rio de Janeiro.',
        opportunities: [
            {
                id: 'o2-1',
                name: 'Ampliação de Sortimento — Linha Higiene',
                stage: 'Negotiation',
                amount: 48000,
                closeDate: '30/07/2026'
            }
        ],
        cases: [],
        campaigns: [
            { id: 'cp2-1', name: 'Oferta Verão Unilever 2026', status: 'Enviada', responded: 'Sim', date: '02/05/2026' }
        ],
        notes: []
    },
    {
        id: '3',
        firstName: 'Roberto',
        lastName: 'Farias',
        name: 'Roberto Farias',
        title: 'Proprietário',
        accountName: 'Padaria & Mercearia Central',
        company: 'Padaria & Mercearia Central',
        email: 'roberto@padariacentral.com.br',
        phone: '(31) 3322-1100',
        mobile: '(31) 98811-2233',
        department: 'Operações',
        mailingStreet: 'Rua Goiás, 540',
        mailingCity: 'Belo Horizonte',
        mailingState: 'MG',
        mailingZip: '30140-120',
        lastActivity: '18/06/2026',
        description: 'Proprietário de padaria e mercearia no Centro de BH. Realiza pedidos semanais pela plataforma, principalmente em limpeza e alimentos.',
        opportunities: [
            {
                id: 'o3-1',
                name: 'Reposição Sazonal — Limpeza e Higiene',
                stage: 'Proposal',
                amount: 12500,
                closeDate: '15/07/2026'
            }
        ],
        cases: [],
        campaigns: [],
        notes: [
            { id: 'n3-1', title: 'Visita ao ponto de venda', preview: 'Verificado espaço de gôndola e mix de produtos Unilever expostos.', date: '17/06/2026' }
        ]
    },
    {
        id: '4',
        firstName: 'Fernanda',
        lastName: 'Costa',
        name: 'Fernanda Costa',
        title: 'Diretora Comercial',
        accountName: 'Farmácias São Lucas',
        company: 'Farmácias São Lucas',
        email: 'fernanda.costa@farmsaolucas.com.br',
        phone: '(41) 3344-6677',
        mobile: '(41) 99944-3322',
        department: 'Comercial',
        mailingStreet: 'Rua XV de Novembro, 800',
        mailingCity: 'Curitiba',
        mailingState: 'PR',
        mailingZip: '80020-310',
        lastActivity: '12/06/2026',
        description: 'Diretora Comercial da rede Farmácias São Lucas, responsável pelas negociações com fornecedores e plataformas B2B.',
        opportunities: [],
        cases: [],
        campaigns: [
            { id: 'cp4-1', name: 'Festival de Higiene e Beleza', status: 'Recebida', responded: 'Não', date: '10/04/2026' }
        ],
        notes: []
    },
    {
        id: '5',
        firstName: 'Marcos',
        lastName: 'Oliveira',
        name: 'Marcos Oliveira',
        title: 'Gerente Comercial',
        accountName: 'Distribuidora Beija-Flor',
        company: 'Distribuidora Beija-Flor',
        email: 'm.oliveira@distribuidorabf.com.br',
        phone: '(71) 3311-5599',
        mobile: '(71) 98899-4411',
        department: 'Comercial',
        mailingStreet: 'Av. Paralela, 1500',
        mailingCity: 'Salvador',
        mailingState: 'BA',
        mailingZip: '41730-010',
        lastActivity: '09/06/2026',
        description: 'Gerente Comercial da Distribuidora Beija-Flor, intermediário que abastece pequenos varejistas no interior da Bahia via Compra Agora.',
        opportunities: [
            {
                id: 'o5-1',
                name: 'Expansão de Crédito B2B — Distribuidora',
                stage: 'Qualification',
                amount: 95000,
                closeDate: '22/08/2026'
            }
        ],
        cases: [
            {
                id: 'c5-1',
                caseNumber: '00008835',
                subject: 'Dúvida sobre prazo de pagamento — boleto',
                status: 'Em andamento'
            }
        ],
        campaigns: [],
        notes: []
    },
    {
        id: '6',
        firstName: 'Juliana',
        lastName: 'Santos',
        name: 'Juliana Santos',
        title: 'Proprietária',
        accountName: 'Empório da Vila',
        company: 'Empório da Vila',
        email: 'juliana@emporiovilapoa.com.br',
        phone: '(51) 3301-4422',
        mobile: '(51) 99977-8833',
        department: 'Compras',
        mailingStreet: 'Rua Gonçalo de Carvalho, 210',
        mailingCity: 'Porto Alegre',
        mailingState: 'RS',
        mailingZip: '90035-170',
        lastActivity: '05/06/2026',
        description: 'Proprietária do Empório da Vila, especializado em produtos de mercearia fina e limpeza premium. Ativa no programa de fidelidade.',
        opportunities: [
            {
                id: 'o6-1',
                name: 'Adesão ao Programa de Fidelidade Gold',
                stage: 'Proposal',
                amount: 18000,
                closeDate: '10/08/2026'
            }
        ],
        cases: [],
        campaigns: [],
        notes: []
    },
    {
        id: '7',
        firstName: 'Paulo',
        lastName: 'Almeida',
        name: 'Paulo Almeida',
        title: 'Diretor de Vendas',
        accountName: 'Hypermarcas Brasil',
        company: 'Hypermarcas Brasil',
        email: 'paulo.almeida@hypermarcas.com.br',
        phone: '(11) 4002-8922',
        mobile: '(11) 99911-2244',
        department: 'Vendas',
        mailingStreet: 'Av. Brigadeiro Faria Lima, 3900',
        mailingCity: 'São Paulo',
        mailingState: 'SP',
        mailingZip: '04538-132',
        lastActivity: '02/06/2026',
        description: 'Diretor de Vendas da Hypermarcas, indústria parceira no marketplace Compra Agora. Responsável pela gestão do canal digital B2B.',
        opportunities: [],
        cases: [],
        campaigns: [],
        notes: []
    },
    {
        id: '8',
        firstName: 'Tatiane',
        lastName: 'Rocha',
        name: 'Tatiane Rocha',
        title: 'Gerente de Trade Marketing',
        accountName: 'P&G Brasil',
        company: 'P&G Brasil',
        email: 't.rocha@pg.com',
        phone: '(11) 3138-9000',
        mobile: '(11) 98822-4455',
        department: 'Trade Marketing',
        mailingStreet: 'Av. das Nações Unidas, 12995',
        mailingCity: 'São Paulo',
        mailingState: 'SP',
        mailingZip: '04578-000',
        lastActivity: '28/05/2026',
        description: 'Gerente de Trade Marketing da P&G Brasil, parceira estratégica da plataforma Compra Agora nas categorias de higiene e limpeza.',
        opportunities: [
            {
                id: 'o8-1',
                name: 'Campanha Conjunta P&G — Categorias Higiene',
                stage: 'Negotiation',
                amount: 220000,
                closeDate: '05/08/2026'
            }
        ],
        cases: [],
        campaigns: [
            { id: 'cp8-1', name: 'Oferta Verão Unilever 2026', status: 'Enviada', responded: 'Sim', date: '02/05/2026' }
        ],
        notes: []
    },
    {
        id: '9',
        firstName: 'Diego',
        lastName: 'Carvalho',
        name: 'Diego Carvalho',
        title: 'Proprietário',
        accountName: 'Quitanda do Diego',
        company: 'Quitanda do Diego',
        email: 'diego@quitandadodiego.com.br',
        phone: '(85) 3322-7788',
        mobile: '(85) 98844-5566',
        department: 'Operações',
        mailingStreet: 'Rua Castro e Silva, 45',
        mailingCity: 'Fortaleza',
        mailingState: 'CE',
        mailingZip: '60030-200',
        lastActivity: '26/05/2026',
        description: 'Proprietário da Quitanda do Diego, pequeno varejo de vizinhança em Fortaleza. Cadastrado no programa de benefícios desde março de 2025.',
        opportunities: [],
        cases: [],
        campaigns: [],
        notes: []
    },
    {
        id: '10',
        firstName: 'Isabela',
        lastName: 'Martins',
        name: 'Isabela Martins',
        title: 'Diretora de Compras',
        accountName: 'Rede Pão Quente',
        company: 'Rede Pão Quente',
        email: 'isabela@redepaoquente.com.br',
        phone: '(81) 3211-8800',
        mobile: '(81) 99966-3311',
        department: 'Compras',
        mailingStreet: 'Av. Boa Viagem, 3300',
        mailingCity: 'Recife',
        mailingState: 'PE',
        mailingZip: '51020-001',
        lastActivity: '20/05/2026',
        description: 'Diretora de Compras da Rede Pão Quente, cadeia com 8 padarias e mercearias em Recife. Negocia diretamente com o time B2B do Compra Agora.',
        opportunities: [
            {
                id: 'o10-1',
                name: 'Contrato Anual de Reposição — Limpeza',
                stage: 'Qualification',
                amount: 67000,
                closeDate: '18/09/2026'
            }
        ],
        cases: [],
        campaigns: [],
        notes: []
    },
    {
        id: '11',
        firstName: 'Lucas',
        lastName: 'Ferreira',
        name: 'Lucas Ferreira',
        title: 'Proprietário',
        accountName: 'Minimercado Família',
        company: 'Minimercado Família',
        email: 'lucas@minimercadofamilia.com.br',
        phone: '(92) 3301-5544',
        mobile: '(92) 98811-9922',
        department: 'Operações',
        mailingStreet: 'Rua Recife, 210',
        mailingCity: 'Manaus',
        mailingState: 'AM',
        mailingZip: '69058-090',
        lastActivity: '15/05/2026',
        description: 'Proprietário do Minimercado Família, varejista de vizinhança em Manaus. Utiliza crédito da plataforma e está inscrito no programa de benefícios.',
        opportunities: [],
        cases: [],
        campaigns: [],
        notes: []
    },
    {
        id: '12',
        firstName: 'Camila',
        lastName: 'Ribeiro',
        name: 'Camila Ribeiro',
        title: 'Gerente de Contas',
        accountName: 'Perfumaria Bella',
        company: 'Perfumaria Bella',
        email: 'camila@perfumariabella.com.br',
        phone: '(19) 3344-2211',
        mobile: '(19) 99988-1100',
        department: 'Comercial',
        mailingStreet: 'Rua Barão de Jaguara, 901',
        mailingCity: 'Campinas',
        mailingState: 'SP',
        mailingZip: '13015-001',
        lastActivity: '10/05/2026',
        description: 'Gerente de Contas da Perfumaria Bella, responsável pelas compras B2B nas categorias de beleza, higiene e cuidados pessoais.',
        opportunities: [
            {
                id: 'o12-1',
                name: 'Mix Dove e Seda — Temporada Inverno',
                stage: 'Closed Won',
                amount: 34500,
                closeDate: '01/05/2026'
            }
        ],
        cases: [],
        campaigns: [],
        notes: [
            { id: 'n12-1', title: 'Reunião de alinhamento Q3', preview: 'Definido mix prioritário para inverno e condições comerciais especiais.', date: '09/05/2026' }
        ]
    }
];

export function getAllContacts() {
    return [...CONTACTS];
}

export function getContactById(id) {
    return CONTACTS.find((c) => c.id === id) || null;
}
