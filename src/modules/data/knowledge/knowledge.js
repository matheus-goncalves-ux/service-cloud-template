/**
 * Mock data for the Experience Cloud "Ford Dealer Hub" — Help Center + Articles.
 * Automotive theme, continuous with the Service Cloud Cases data (article titles
 * mirror the knowledgeArticles referenced by page/caseDetail).
 *
 * Used by page/helpCenter and page/articleDetail.
 */

// --- Brands (Experience Cloud branding story / brand switcher) -----------

/**
 * Each brand maps to a theme class defined in the portal page CSS, which
 * remaps the custom --c-portal-* hooks. `primaryHint` is informational only
 * (the real value lives in CSS, scoped to the theme class).
 */
export const PORTAL_BRANDS = [
  {
    id: 'ford',
    name: 'Ford',
    portalName: 'Ford Dealer Hub',
    wordmark: 'Ford',
    themeClass: 'c-portal_ford',
    primaryHint: '#00095b',
  },
  {
    id: 'toyota',
    name: 'Toyota',
    portalName: 'Toyota Partner Portal',
    wordmark: 'TOYOTA',
    themeClass: 'c-portal_toyota',
    primaryHint: '#eb0a1e',
  },
  {
    id: 'vw',
    name: 'Volkswagen',
    portalName: 'Volkswagen Dealer Hub',
    wordmark: 'Volkswagen',
    themeClass: 'c-portal_vw',
    primaryHint: '#001e50',
  },
];

export const DEFAULT_BRAND_ID = 'ford';

export function getBrandById(id) {
  return PORTAL_BRANDS.find((b) => b.id === id) ?? PORTAL_BRANDS[0];
}

// --- Logged-in dealer user ----------------------------------------------

export const PORTAL_USER = {
  name: 'João Almeida',
  firstName: 'João',
  role: 'Gerente de Pós-venda',
  company: 'AutoShow Rio',
  initials: 'JA',
};

// --- Featured topics (tiles on the help center) -------------------------

export const TOPICS = [
  {
    id: 'ota',
    label: 'Atualizações OTA & Software',
    iconName: 'standard:knowledge',
    count: 12,
    description: 'Procedimentos de atualização, rollback e diagnóstico do MIB3.',
  },
  {
    id: 'warranty',
    label: 'Garantia & Reparos',
    iconName: 'standard:case',
    count: 28,
    description: 'Abertura de garantia, TSBs e processos de reparo.',
  },
  {
    id: 'adas',
    label: 'Diagnóstico ADAS',
    iconName: 'standard:topic',
    count: 9,
    description: 'Calibração de câmeras, radares e sensores pós-colisão.',
  },
  {
    id: 'ev',
    label: 'Elétricos & Recarga',
    iconName: 'standard:announcement',
    count: 15,
    description: 'Infraestrutura de recarga, OCPP e manutenção de EVs.',
  },
  {
    id: 'parts',
    label: 'Peças & Acessórios',
    iconName: 'standard:article',
    count: 21,
    description: 'Catálogo, pedidos, trocas e crédito de peças.',
  },
  {
    id: 'training',
    label: 'Treinamento Técnico',
    iconName: 'standard:topic',
    count: 7,
    description: 'Calendário e módulos de capacitação para a rede.',
  },
];

export function getTopicById(id) {
  return TOPICS.find((t) => t.id === id) ?? null;
}

// --- Knowledge articles (full body) -------------------------------------

const ARTICLES = [
  {
    id: 'ota-rollback',
    title: 'Procedimento de rollback OTA do MIB3',
    topicId: 'ota',
    topicLabel: 'Atualizações OTA & Software',
    type: 'How To',
    readTime: '5 min',
    updated: 'Atualizado em 12/06/2026',
    views: 1840,
    helpfulPercent: 92,
    summary:
      'Passo a passo para reverter com segurança uma atualização OTA do sistema de infotainment MIB3 quando o veículo apresenta instabilidade.',
    body: [
      { type: 'paragraph', text: 'Use este procedimento quando uma unidade apresentar travamentos ou reinicializações após uma atualização OTA recente do MIB3. O rollback restaura a última versão estável de software validada de fábrica.' },
      { type: 'heading', text: 'Pré-requisitos' },
      { type: 'list', items: ['Veículo conectado à energia (bateria acima de 60%)', 'Equipamento de diagnóstico VAS 6154 atualizado', 'Número do chassi (VIN) e versão de software atual'] },
      { type: 'heading', text: 'Passos' },
      { type: 'list', ordered: true, items: ['Conecte o VAS 6154 e acesse o módulo de Conectividade.', 'Registre a versão atual em "Identificação do sistema".', 'Selecione "Gerenciar pacotes OTA" → "Reverter para versão anterior".', 'Confirme o VIN e aguarde a validação do pacote assinado.', 'Não desligue a ignição durante a regravação (~12 min).', 'Ao concluir, valide o boot e a tela de navegação.'] },
      { type: 'callout', text: 'Importante: o rollback exige consentimento registrado do proprietário para unidades já emplacadas (LGPD). Registre o aceite antes de iniciar.' },
      { type: 'paragraph', text: 'Se o travamento persistir após o rollback, abra um caso técnico anexando os logs de diagnóstico (veja o artigo relacionado de coleta de logs).' },
    ],
    tags: ['OTA', 'MIB3', 'Infotainment', 'Rollback'],
  },
  {
    id: 'vas-logs',
    title: 'Coleta de logs de diagnóstico com VAS 6154',
    topicId: 'ota',
    topicLabel: 'Atualizações OTA & Software',
    type: 'How To',
    readTime: '4 min',
    updated: 'Atualizado em 10/06/2026',
    views: 1120,
    helpfulPercent: 88,
    summary:
      'Como extrair os códigos de diagnóstico (DTC) e os logs do MIB3 para anexar a um caso técnico de software.',
    body: [
      { type: 'paragraph', text: 'Logs completos aceleram a análise da engenharia de software e são obrigatórios ao escalar um caso de conectividade veicular.' },
      { type: 'heading', text: 'Como extrair' },
      { type: 'list', ordered: true, items: ['Conecte o VAS 6154 à porta OBD do veículo.', 'Acesse "Diagnóstico guiado" → "Exportar memória de falhas".', 'Inclua o snapshot de DTCs e o log de sistema (.zip).', 'Nomeie o arquivo com o VIN e a data.'] },
      { type: 'callout', text: 'Dica: anexe também a versão de software atual e a data da última atualização OTA — isso evita idas e voltas com a engenharia.' },
    ],
    tags: ['Diagnóstico', 'DTC', 'VAS 6154'],
  },
  {
    id: 'tsb-brake',
    title: 'TSB-2026-BR-0042: ajuste da mola do calibre traseiro',
    topicId: 'warranty',
    topicLabel: 'Garantia & Reparos',
    type: 'Technical Bulletin',
    readTime: '6 min',
    updated: 'Atualizado em 09/06/2026',
    views: 2310,
    helpfulPercent: 95,
    summary:
      'Boletim técnico para eliminar ruído metálico intermitente no freio traseiro em velocidades baixas.',
    body: [
      { type: 'paragraph', text: 'Aplica-se a unidades que apresentam ruído metálico no freio traseiro abaixo de 30 km/h, especialmente em piso molhado, sem desgaste anormal de pastilhas.' },
      { type: 'heading', text: 'Diagnóstico' },
      { type: 'list', items: ['Confirme o ruído em test drive controlado.', 'Inspecione a mola de retenção do calibre traseiro.', 'Verifique folga/assentamento da pastilha no suporte.'] },
      { type: 'heading', text: 'Correção' },
      { type: 'list', ordered: true, items: ['Substitua a mola de retenção pela peça revisada (ref. 47775-0R010).', 'Aplique graxa de alta temperatura nos pontos de contato.', 'Reassente as pastilhas e valide em test drive.'] },
      { type: 'callout', text: 'Cobertura: serviço elegível em garantia quando dentro do período e quilometragem especificados.' },
    ],
    tags: ['Freios', 'NVH', 'TSB', 'Garantia'],
  },
  {
    id: 'oil-consumption',
    title: 'Diagnóstico de consumo excessivo de óleo — motores turbo',
    topicId: 'warranty',
    topicLabel: 'Garantia & Reparos',
    type: 'Technical Bulletin',
    readTime: '7 min',
    updated: 'Atualizado em 07/06/2026',
    views: 1675,
    helpfulPercent: 90,
    summary:
      'Critérios de medição e abertura de garantia para consumo de óleo acima do especificado em motores 1.0 turbo.',
    body: [
      { type: 'paragraph', text: 'O consumo de óleo dentro de especificação é de até 0,25 L/1.000 km. Valores consistentemente acima exigem teste padronizado antes de abrir reclamação de garantia.' },
      { type: 'heading', text: 'Teste de consumo padronizado' },
      { type: 'list', ordered: true, items: ['Troque o óleo e registre o nível de referência.', 'Rode o protocolo de 1.000 km em condições normais.', 'Meça o consumo e compare com a especificação.', 'Documente o código de rastreio do motor.'] },
      { type: 'callout', text: 'Para frotas, consolide as medições por unidade em planilha única antes de escalar para Garantia & Jurídico.' },
    ],
    tags: ['Motor', 'Garantia', 'Frota', 'Óleo'],
  },
  {
    id: 'adas-calibration',
    title: 'Calibração de câmera frontal ADAS pós-colisão',
    topicId: 'adas',
    topicLabel: 'Diagnóstico ADAS',
    type: 'How To',
    readTime: '8 min',
    updated: 'Atualizado em 05/06/2026',
    views: 2040,
    helpfulPercent: 93,
    summary:
      'Procedimento de recalibração da câmera frontal e do radar após reparo de colisão, evitando retornos.',
    body: [
      { type: 'paragraph', text: 'A recalibração é obrigatória após substituição do para-brisa, reparo frontal ou alinhamento que afete o ângulo da câmera.' },
      { type: 'heading', text: 'Ambiente e alvos' },
      { type: 'list', items: ['Piso nivelado e iluminação uniforme.', 'Alvos de calibração corretos para o modelo/ano.', 'Pneus calibrados e tanque em nível padrão.'] },
      { type: 'heading', text: 'Calibração estática' },
      { type: 'list', ordered: true, items: ['Posicione os alvos conforme a distância especificada.', 'Inicie a calibração guiada no scanner.', 'Valide o status "Calibração concluída" sem DTCs.', 'Faça test drive de validação dinâmica.'] },
      { type: 'callout', text: 'Causa #1 de retorno: alvo incorreto para o ano-modelo. Confirme a referência do alvo antes de iniciar.' },
    ],
    tags: ['ADAS', 'Câmera', 'Radar', 'Calibração'],
  },
  {
    id: 'ocpp-tls',
    title: 'Renovação de certificado TLS no backend OCPP',
    topicId: 'ev',
    topicLabel: 'Elétricos & Recarga',
    type: 'How To',
    readTime: '5 min',
    updated: 'Atualizado em 04/06/2026',
    views: 980,
    helpfulPercent: 87,
    summary:
      'Como renovar o certificado TLS do backend OCPP para restaurar estações de recarga DC que ficaram offline.',
    body: [
      { type: 'paragraph', text: 'Estações que exibem "Backend Connection Lost" geralmente perderam o handshake TLS com o backend — quase sempre por certificado expirado.' },
      { type: 'heading', text: 'Verificação rápida' },
      { type: 'list', items: ['Cheque a validade do certificado do backend.', 'Confirme o heartbeat OCPP no painel de gestão.', 'Valide sincronização de horário (NTP) do controlador.'] },
      { type: 'heading', text: 'Renovação' },
      { type: 'list', ordered: true, items: ['Gere/instale o novo certificado no backend.', 'Reinicie o serviço OCPP e observe o reconnect.', 'Confirme as estações retornando a "Available".'] },
      { type: 'callout', text: 'Para eventos com público, valide a recarga DC com uma sessão de teste antes da abertura.' },
    ],
    tags: ['EV', 'OCPP', 'TLS', 'Recarga'],
  },
  {
    id: 'parts-return',
    title: 'Processo de troca e crédito de peças incorretas',
    topicId: 'parts',
    topicLabel: 'Peças & Acessórios',
    type: 'How To',
    readTime: '4 min',
    updated: 'Atualizado em 02/06/2026',
    views: 1430,
    helpfulPercent: 91,
    summary:
      'Como solicitar troca e crédito quando um pedido chega com a referência de peça incorreta.',
    body: [
      { type: 'paragraph', text: 'Use este fluxo para devolver itens enviados com referência divergente e receber a peça correta com crédito do item devolvido.' },
      { type: 'heading', text: 'Passos' },
      { type: 'list', ordered: true, items: ['Confirme a referência correta no catálogo eletrônico.', 'Abra a solicitação de troca informando o número do pedido.', 'Emita a NF de devolução e agende a coleta.', 'Acompanhe o crédito e o despacho da peça correta.'] },
      { type: 'callout', text: 'Confira sempre a referência por ano-modelo e tração (ex.: 4WD vs FWD) para evitar nova divergência.' },
    ],
    tags: ['Peças', 'Devolução', 'Crédito'],
  },
];

export function getAllArticles() {
  return [...ARTICLES];
}

export function getArticleById(id) {
  return ARTICLES.find((a) => a.id === id) ?? null;
}

/** Highest-rated articles for the "Em destaque" section. */
export function getFeaturedArticles(limit = 3) {
  return [...ARTICLES].sort((a, b) => b.helpfulPercent - a.helpfulPercent).slice(0, limit);
}

/** Most-viewed articles for the "Mais acessados" list. */
export function getPopularArticles(limit = 5) {
  return [...ARTICLES].sort((a, b) => b.views - a.views).slice(0, limit);
}

/** Other articles in the same topic (fallback to most viewed). */
export function getRelatedArticles(id, limit = 3) {
  const current = getArticleById(id);
  if (!current) return getPopularArticles(limit);
  const sameTopic = ARTICLES.filter((a) => a.id !== id && a.topicId === current.topicId);
  const pool = sameTopic.length ? sameTopic : ARTICLES.filter((a) => a.id !== id);
  return pool.slice(0, limit);
}
