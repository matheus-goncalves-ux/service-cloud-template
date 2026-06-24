/**
 * Mock data for a Marketing Cloud ("Next") Journey Builder — Automotive industry.
 * Used by page/journeyBuilder (flagship full-screen builder experience).
 *
 * The journey models an EV test-drive launch campaign for the Volkswagen ID.4,
 * sourced from a Data Cloud segment, with a decision split on email engagement.
 */

// Status values shown on the journey status badge.
export const JOURNEY_STATUS = {
  DRAFT: 'Rascunho',
  ACTIVE: 'Ativa',
  PAUSED: 'Pausada',
};

/**
 * Palette groups shown in the left rail (activities that can be dropped on the
 * canvas). Visual only — the canvas itself is the interactive surface.
 */
export const PALETTE_GROUPS = [
  {
    id: 'audience',
    label: 'Público & Entrada',
    items: [
      { type: 'segment', label: 'Segmento Data Cloud', iconName: 'standard:segments' },
      { type: 'event', label: 'Evento de Entrada', iconName: 'standard:tour' },
    ],
  },
  {
    id: 'messaging',
    label: 'Mensagens',
    items: [
      { type: 'email', label: 'E-mail', iconName: 'standard:email' },
      { type: 'sms', label: 'SMS', iconName: 'standard:sms' },
    ],
  },
  {
    id: 'flow',
    label: 'Fluxo & Decisão',
    items: [
      { type: 'wait', label: 'Espera', iconName: 'utility:clock' },
      { type: 'decision', label: 'Decisão Sim/Não', iconName: 'standard:decision' },
      { type: 'goal', label: 'Meta', iconName: 'utility:target' },
      { type: 'exit', label: 'Saída', iconName: 'utility:logout' },
    ],
  },
];

// --- Journey nodes -------------------------------------------------------

const entry = {
  id: 'entry',
  typeLabel: 'Entrada • Público',
  title: 'Segmento Data Cloud',
  subtitle: 'Interessados em Elétricos — SP/RJ',
  iconName: 'standard:segments',
  badge: '12.480',
  description:
    'Contatos qualificados pelo Data Cloud com base em navegação no site, test drives anteriores e alta propensão a veículos elétricos.',
  stats: [
    { label: 'Tamanho do público', value: '12.480' },
    { label: 'Atualização', value: 'Diária' },
  ],
  details: [
    { label: 'Fonte', value: 'Data Cloud — Unified Profile' },
    { label: 'Critérios', value: 'Propensão EV alta + região SP/RJ' },
    { label: 'Reentrada', value: 'Não permitida' },
  ],
};

const email1 = {
  id: 'email1',
  typeLabel: 'Mensagem • E-mail',
  title: 'Convite: Test Drive ID.4',
  subtitle: 'Assunto: Seu test drive do novo ID.4 elétrico',
  iconName: 'standard:email',
  description:
    'E-mail de convite com CTA para agendamento de test drive na concessionária Volkswagen mais próxima.',
  stats: [
    { label: 'Taxa de abertura', value: '48%' },
    { label: 'Cliques', value: '12%' },
  ],
  details: [
    { label: 'Remetente', value: 'Volkswagen Brasil <id4@vw.com.br>' },
    { label: 'Template', value: 'EV_TestDrive_Convite' },
    { label: 'CTA', value: 'Agendar test drive' },
  ],
};

const wait1 = {
  id: 'wait1',
  typeLabel: 'Fluxo • Espera',
  title: 'Aguardar 3 dias',
  subtitle: 'Antes de avaliar o engajamento',
  iconName: 'utility:clock',
  description:
    'Tempo de espera para dar oportunidade ao contato de abrir e interagir com o e-mail de convite.',
  stats: [{ label: 'Aguardando agora', value: '1.204' }],
  details: [
    { label: 'Duração', value: '3 dias' },
    { label: 'Tipo', value: 'Espera por duração' },
  ],
};

const decision1 = {
  id: 'decision1',
  typeLabel: 'Fluxo • Decisão',
  title: 'Abriu o e-mail?',
  subtitle: 'Divisão Sim / Não',
  iconName: 'standard:decision',
  description:
    'Divide a jornada com base no engajamento com o e-mail de convite, em tempo real.',
  stats: [
    { label: 'Sim — abriram', value: '5.990' },
    { label: 'Não abriram', value: '6.490' },
  ],
  details: [
    { label: 'Critério', value: 'E-mail aberto = Verdadeiro' },
    { label: 'Avaliação', value: 'Em tempo real' },
  ],
};

const smsYes = {
  id: 'smsYes',
  typeLabel: 'Mensagem • SMS',
  title: 'SMS: Agende agora',
  subtitle: 'Link direto para a agenda',
  iconName: 'standard:sms',
  description:
    'Mensagem curta com link para o contato escolher data e horário do test drive.',
  stats: [
    { label: 'Entrega', value: '99%' },
    { label: 'Cliques', value: '21%' },
  ],
  details: [
    { label: 'Remetente', value: 'VW ID.4' },
    { label: 'Texto', value: 'Seu test drive do ID.4 te espera. Agende: vw.to/id4' },
  ],
};

const goalYes = {
  id: 'goalYes',
  typeLabel: 'Fluxo • Meta',
  title: 'Test Drive Agendado',
  subtitle: 'Conversão da jornada',
  iconName: 'utility:target',
  description:
    'Meta atingida quando o contato agenda um test drive no sistema da concessionária.',
  stats: [
    { label: 'Atingiram a meta', value: '342' },
    { label: 'Conversão', value: '68%' },
  ],
  details: [
    { label: 'Evento de conversão', value: 'TestDrive_Agendado' },
    { label: 'Origem', value: 'Salesforce Scheduler' },
  ],
};

const emailNo = {
  id: 'emailNo',
  typeLabel: 'Mensagem • E-mail',
  title: 'Lembrete + Bônus',
  subtitle: 'Assunto: Ainda dá tempo — bônus exclusivo',
  iconName: 'standard:email',
  description:
    'Segundo e-mail para quem não abriu o convite, com oferta de bônus em acessórios.',
  stats: [
    { label: 'Taxa de abertura', value: '31%' },
    { label: 'Cliques', value: '7%' },
  ],
  details: [
    { label: 'Template', value: 'EV_TestDrive_Lembrete' },
    { label: 'Oferta', value: 'R$ 2.000 em acessórios' },
  ],
};

const exitNo = {
  id: 'exitNo',
  typeLabel: 'Fluxo • Saída',
  title: 'Sair da jornada',
  subtitle: 'Sem conversão neste ciclo',
  iconName: 'utility:logout',
  description:
    'Contatos que não engajaram saem da jornada e voltam ao pool de nutrição geral.',
  stats: [{ label: 'Saíram', value: '4.880' }],
  details: [
    { label: 'Ação de saída', value: 'Mover para "Nutrição Geral"' },
    { label: 'Reentrada', value: 'Permitida após 30 dias' },
  ],
};

/**
 * Canvas layout. Linear segments plus one decision segment that fans out into
 * two branches. Each segment references a full node object.
 */
export const FLOW = [
  { kind: 'node', node: entry },
  { kind: 'node', node: email1 },
  { kind: 'node', node: wait1 },
  {
    kind: 'decision',
    node: decision1,
    branches: [
      { id: 'yes', label: 'Sim — abriu o e-mail', tone: 'positive', nodes: [smsYes, goalYes] },
      { id: 'no', label: 'Não abriu', tone: 'neutral', nodes: [emailNo, exitNo] },
    ],
  },
];

/** Flat list of every node for id-based lookup (right properties panel). */
export const ALL_NODES = [entry, email1, wait1, decision1, smsYes, goalYes, emailNo, exitNo];

export function getNodeById(id) {
  return ALL_NODES.find((n) => n.id === id) ?? null;
}

/** Journey-level metadata for the header and the default right-panel overview. */
export const JOURNEY = {
  id: 'jrny-id4-testdrive',
  name: 'Test Drive ID.4 — Lançamento EV',
  status: JOURNEY_STATUS.DRAFT,
  channel: 'Multicanal (E-mail + SMS)',
  segment: { name: 'Interessados em Elétricos — SP/RJ', size: '12.480', source: 'Data Cloud' },
  goalLabel: 'Test drives agendados',
  goalValue: '342',
  goalTarget: '500',
  goalPercent: 68,
  lastModified: 'Editado há 12 min por Camila Souza',
  stats: [
    { id: 's1', label: 'Na jornada', value: '8.214' },
    { id: 's2', label: 'Concluíram', value: '3.190' },
    { id: 's3', label: 'Meta atingida', value: '342' },
  ],
  einstein: {
    title: 'Einstein recomenda',
    body: 'Enviar o convite entre 18h e 20h pode aumentar a taxa de abertura em ~14% para este segmento.',
  },
};

export function getJourney() {
  return JOURNEY;
}
