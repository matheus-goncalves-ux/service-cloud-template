/**
 * Mock data — Person Accounts B2C (Compra Agora consumidor final).
 *
 * Schema de cada registro:
 *   id, personFirstName, personLastName, name
 *   cpf, birthDate, gender
 *   email, mobile
 *   address, city, state, zip
 *   status            — Ativo | Inativo | Prospecto | VIP
 *   loyaltyTier       — Bronze | Prata | Ouro | Diamante
 *   firstContactDate  — data de primeiro contato (PT-BR)
 *   lifetimeValue     — valor em centavos (inteiro)
 *   preferredChannel  — Canal preferido de contato
 *   marketingOptIn    — boolean
 *   language          — Português | Inglês | Espanhol
 *   segment           — Consumidor Final
 *   opportunities[], cases[], activity[], posts[]
 */

/** Format BRL cents → compact string (R$ 1.200,00 / R$ 1,2 mil / R$ 1,2 M) */
export function formatCurrencyBRL(cents) {
    const value = cents / 100;
    if (value >= 1_000_000) return `R$ ${(value / 1_000_000).toFixed(1).replace('.', ',')} M`;
    if (value >= 1_000) return `R$ ${(value / 1_000).toFixed(1).replace('.', ',')} mil`;
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export function getPersonalAccountById(id) {
    return PERSONAL_ACCOUNTS.find((a) => a.id === id) ?? null;
}

export { PERSONAL_ACCOUNTS as PERSONAL_ACCOUNTS_ALL };

const PERSONAL_ACCOUNTS = [
    {
        id: 'pa-1',
        personFirstName: 'Fernanda',
        personLastName: 'Alves',
        name: 'Fernanda Alves',
        cpf: '432.109.876-00',
        birthDate: '14/03/1990',
        gender: 'Feminino',
        email: 'fernanda.alves@email.com.br',
        mobile: '(11) 99812-3456',
        address: 'Rua das Bromélias, 220, Apto 54',
        city: 'São Paulo',
        state: 'SP',
        zip: '04567-030',
        status: 'VIP',
        loyaltyTier: 'Ouro',
        firstContactDate: '05/01/2023',
        lifetimeValue: 1_890_000,
        preferredChannel: 'WhatsApp',
        marketingOptIn: true,
        language: 'Português',
        segment: 'Consumidor Final',
        opportunities: [
            {
                id: 'opa-1-1',
                name: 'Assinatura Premium Anual',
                stage: 'Proposal',
                amount: 59900,
                closeDate: '30/07/2026',
            },
        ],
        cases: [
            {
                id: 'ca-1-1',
                caseNumber: '00045321',
                subject: 'Produto com embalagem danificada',
                status: 'Aberto',
                slaStatus: 'ok',
            },
        ],
        activity: [
            {
                id: 'ac-1-1',
                type: 'email',
                iconName: 'standard:email',
                typeLabel: 'E-mail',
                title: 'Boas-vindas ao tier Ouro',
                description: 'E-mail automático enviado na virada de tier.',
                date: '15/06/2026',
                expanded: false,
            },
        ],
        posts: [
            {
                id: 'po-1-1',
                author: 'Ana Costa',
                date: '18/06/2026',
                body: 'Cliente escalou para Ouro este mês — verificar benefícios aplicados.',
            },
        ],
    },
    {
        id: 'pa-2',
        personFirstName: 'Ricardo',
        personLastName: 'Nunes',
        name: 'Ricardo Nunes',
        cpf: '123.456.789-10',
        birthDate: '22/08/1985',
        gender: 'Masculino',
        email: 'r.nunes@gmail.com',
        mobile: '(21) 98733-0011',
        address: 'Av. Atlântica, 890, Bl. B',
        city: 'Rio de Janeiro',
        state: 'RJ',
        zip: '22010-000',
        status: 'Ativo',
        loyaltyTier: 'Prata',
        firstContactDate: '18/04/2023',
        lifetimeValue: 640_000,
        preferredChannel: 'E-mail',
        marketingOptIn: true,
        language: 'Português',
        segment: 'Consumidor Final',
        opportunities: [],
        cases: [
            {
                id: 'ca-2-1',
                caseNumber: '00049001',
                subject: 'Cupom de desconto não aplicado',
                status: 'Em andamento',
                slaStatus: 'ok',
            },
        ],
        activity: [
            {
                id: 'ac-2-1',
                type: 'call',
                iconName: 'standard:log_a_call',
                typeLabel: 'Ligação',
                title: 'Suporte — cupom expirado',
                description: 'Cliente relata que cupom PROMO10 não funcionou no app.',
                date: '20/06/2026',
                expanded: false,
            },
        ],
        posts: [],
    },
    {
        id: 'pa-3',
        personFirstName: 'Camila',
        personLastName: 'Borges',
        name: 'Camila Borges',
        cpf: '987.654.321-09',
        birthDate: '07/11/1998',
        gender: 'Feminino',
        email: 'camila.borges@outlook.com',
        mobile: '(31) 99001-7788',
        address: 'Rua Goiás, 112, Casa 3',
        city: 'Belo Horizonte',
        state: 'MG',
        zip: '30140-030',
        status: 'Ativo',
        loyaltyTier: 'Bronze',
        firstContactDate: '10/09/2024',
        lifetimeValue: 180_000,
        preferredChannel: 'Push (App)',
        marketingOptIn: false,
        language: 'Português',
        segment: 'Consumidor Final',
        opportunities: [],
        cases: [],
        activity: [],
        posts: [],
    },
    {
        id: 'pa-4',
        personFirstName: 'André',
        personLastName: 'Martins',
        name: 'André Martins',
        cpf: '321.654.987-55',
        birthDate: '30/05/1979',
        gender: 'Masculino',
        email: 'andre.martins@empresa.com',
        mobile: '(41) 98800-4422',
        address: 'Rua XV de Novembro, 400',
        city: 'Curitiba',
        state: 'PR',
        zip: '80020-310',
        status: 'Prospecto',
        loyaltyTier: 'Bronze',
        firstContactDate: '02/06/2026',
        lifetimeValue: 0,
        preferredChannel: 'Telefone',
        marketingOptIn: true,
        language: 'Português',
        segment: 'Consumidor Final',
        opportunities: [
            {
                id: 'opa-4-1',
                name: 'Kit Limpeza Doméstica — Oferta Boas-Vindas',
                stage: 'Prospecting',
                amount: 18900,
                closeDate: '15/07/2026',
            },
        ],
        cases: [],
        activity: [
            {
                id: 'ac-4-1',
                type: 'task',
                iconName: 'standard:task',
                typeLabel: 'Tarefa',
                title: 'Enviar catálogo digital',
                description: 'Enviar PDF com portfólio de produtos ao cliente prospectado.',
                date: '03/06/2026',
                expanded: false,
            },
        ],
        posts: [],
    },
    {
        id: 'pa-5',
        personFirstName: 'Juliana',
        personLastName: 'Ferreira',
        name: 'Juliana Ferreira',
        cpf: '654.321.098-77',
        birthDate: '14/02/1995',
        gender: 'Feminino',
        email: 'ju.ferreira@hotmail.com',
        mobile: '(51) 99555-6677',
        address: 'Av. Farrapos, 200, Apto 301',
        city: 'Porto Alegre',
        state: 'RS',
        zip: '90220-006',
        status: 'Inativo',
        loyaltyTier: 'Bronze',
        firstContactDate: '20/11/2022',
        lifetimeValue: 95_000,
        preferredChannel: 'E-mail',
        marketingOptIn: false,
        language: 'Português',
        segment: 'Consumidor Final',
        opportunities: [],
        cases: [
            {
                id: 'ca-5-1',
                caseNumber: '00031009',
                subject: 'Cancelamento de assinatura',
                status: 'Fechado',
                slaStatus: 'ok',
            },
        ],
        activity: [
            {
                id: 'ac-5-1',
                type: 'email',
                iconName: 'standard:email',
                typeLabel: 'E-mail',
                title: 'Tentativa de reengajamento',
                description: 'E-mail com oferta especial para reativação da conta.',
                date: '10/05/2026',
                expanded: false,
            },
        ],
        posts: [],
    },
    {
        id: 'pa-6',
        personFirstName: 'Marcos',
        personLastName: 'Souza',
        name: 'Marcos Souza',
        cpf: '111.222.333-44',
        birthDate: '09/09/1988',
        gender: 'Masculino',
        email: 'marcos.souza@yahoo.com.br',
        mobile: '(85) 98844-5566',
        address: 'Rua Dom Pedro I, 750',
        city: 'Fortaleza',
        state: 'CE',
        zip: '60035-110',
        status: 'Ativo',
        loyaltyTier: 'Diamante',
        firstContactDate: '12/06/2021',
        lifetimeValue: 4_230_000,
        preferredChannel: 'WhatsApp',
        marketingOptIn: true,
        language: 'Português',
        segment: 'Consumidor Final',
        opportunities: [
            {
                id: 'opa-6-1',
                name: 'Plano Família Premium',
                stage: 'Negotiation',
                amount: 119900,
                closeDate: '31/07/2026',
            },
            {
                id: 'opa-6-2',
                name: 'Bundle Cuidados Pessoais',
                stage: 'Closed Won',
                amount: 34900,
                closeDate: '01/06/2026',
            },
        ],
        cases: [],
        activity: [
            {
                id: 'ac-6-1',
                type: 'event',
                iconName: 'standard:event',
                typeLabel: 'Evento',
                title: 'Reunião de revisão de benefícios Diamante',
                description: 'Reunião trimestral para alinhamento de benefícios exclusivos.',
                date: '22/06/2026',
                expanded: false,
            },
        ],
        posts: [
            {
                id: 'po-6-1',
                author: 'Beatriz Lima',
                date: '23/06/2026',
                body: 'Confirmar envio do kit exclusivo Diamante para o endereço atualizado.',
            },
        ],
    },
];
