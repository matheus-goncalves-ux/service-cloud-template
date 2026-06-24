/**
 * Service Home dashboard data.
 *
 * Aggregates Service Cloud KPIs for the logged-in agent, reusing the
 * automotive cases so the dashboard tells the same story as the Cases list
 * and detail pages.  CSAT, FCR and resolution-time averages are lightweight
 * prototype values — in a real org these would come from a Reports API.
 *
 * Consumed by:
 *   - page/serviceHome (the Service Console home dashboard view)
 */
import { getAllCases } from 'data/cases';

export const AGENT_NAME = 'Camila';

/** Time-of-day greeting in pt-BR. */
export function getGreeting(date = new Date()) {
    const hour = date.getHours();
    if (hour < 12) return 'Bom dia';
    if (hour < 18) return 'Boa tarde';
    return 'Boa noite';
}

/** Shape a single legend row. `status` drives the dot/badge colour in the view. */
function legendRow(status, value, label) {
    return { key: `${status}-${label}`, status, text: `${value} ${label}` };
}

// ---------------------------------------------------------------------------
// Row 1 — four hero KPI cards
// ---------------------------------------------------------------------------

/** "Backlog" — open cases in the queue, broken down by priority. */
function backlogCard() {
    const cases = getAllCases();
    const open = cases.filter((c) => c.status !== 'Closed');
    const high = open.filter((c) => c.priority === 'High').length;
    const medium = open.filter((c) => c.priority === 'Medium').length;
    const low = open.filter((c) => c.priority === 'Low').length;
    return {
        id: 'backlog',
        title: 'Backlog',
        description: 'Casos abertos atribuídos à fila',
        icon: 'standard:work_queue',
        ringClass: 'c-ring c-ring_neutral',
        ringPrimary: String(open.length),
        ringLabel: 'Casos',
        legend: [
            legendRow('error', high, 'Alta prioridade'),
            legendRow('info', medium, 'Média prioridade'),
            legendRow('success', low, 'Baixa prioridade'),
        ],
        button: { label: 'Ver casos', path: '/cases' },
    };
}

/** "SLA" — compliance breakdown across open cases. */
function slaCard() {
    const cases = getAllCases();
    const open = cases.filter((c) => c.status !== 'Closed');
    const overdue = open.filter((c) => c.slaStatus === 'overdue').length;
    const atRisk = open.filter((c) => c.slaStatus === 'atrisk').length;
    const onTrack = open.filter((c) => c.slaStatus === 'ontrack').length;
    // Compliance % = cases not overdue / total open (prototype)
    const pct = open.length > 0 ? Math.round(((open.length - overdue) / open.length) * 100) : 100;
    return {
        id: 'sla',
        title: 'SLA',
        description: 'Percentual de casos dentro do prazo',
        icon: 'standard:entitlement',
        ringClass: pct >= 90 ? 'c-ring c-ring_success' : 'c-ring c-ring_error',
        ringPrimary: `${pct}%`,
        ringLabel: 'Conformidade',
        legend: [
            legendRow('success', onTrack, 'No prazo'),
            legendRow('info', atRisk, 'Em risco'),
            legendRow('error', overdue, 'Vencido'),
        ],
        button: { label: 'Ver SLAs', path: '/cases' },
    };
}

/** "Tempo médio de resolução" — prototype daily / weekly averages (hours). */
function resolutionTimeCard() {
    // Prototype values: a real impl would compute from dateOpened/dateClosed
    const todayAvg = 3.2;
    const weekAvg = 4.8;
    const monthAvg = 5.6;
    return {
        id: 'resolution',
        title: 'Tempo médio de resolução',
        description: 'Média de horas até fechamento do caso',
        icon: 'standard:entity_milestone_time',
        ringClass: 'c-ring c-ring_info',
        ringPrimary: `${todayAvg}h`,
        ringLabel: 'Hoje',
        legend: [
            legendRow('success', `${todayAvg}h`, 'Hoje'),
            legendRow('info', `${weekAvg}h`, 'Esta semana'),
            legendRow('error', `${monthAvg}h`, 'Mês passado'),
        ],
        button: { label: 'Ver relatório', path: '/cases' },
    };
}

/** "CSAT" — customer satisfaction score (prototype). */
function csatCard() {
    // Prototype: score out of 5, breakdown promoters/neutral/detractors
    const score = 4.3;
    const promoters = 68; // %
    const neutral = 22;
    const detractors = 10;
    return {
        id: 'csat',
        title: 'CSAT',
        description: 'Satisfação do cliente nas respostas dos últimos 30 dias',
        icon: 'standard:customer_360',
        ringClass: 'c-ring c-ring_success',
        ringPrimary: `${score}`,
        ringLabel: '/ 5.0',
        legend: [
            legendRow('success', `${promoters}%`, 'Promotores'),
            legendRow('info', `${neutral}%`, 'Neutros'),
            legendRow('error', `${detractors}%`, 'Detratores'),
        ],
        button: { label: 'Ver pesquisas', path: '/cases' },
    };
}

/** The four hero KPI cards for the Service Home. */
export function getKpiCards() {
    return [backlogCard(), slaCard(), resolutionTimeCard(), csatCard()];
}

// ---------------------------------------------------------------------------
// Row 2 — secondary cards
// ---------------------------------------------------------------------------

/** "FCR" — First Contact Resolution breakdown (prototype). */
export function getFcrData() {
    const pct = 73;
    const resolved = 73;
    const reopened = 12;
    const inProgress = 15;
    return {
        pct,
        legend: [
            legendRow('success', `${resolved}%`, 'Resolvidos no 1º contato'),
            legendRow('error', `${reopened}%`, 'Reabertos'),
            legendRow('info', `${inProgress}%`, 'Em andamento'),
        ],
    };
}

/** Cases with overdue SLA — used to drive the empty/filled state. */
export function getOverdueCases() {
    return getAllCases().filter((c) => c.slaStatus === 'overdue');
}

/** Recently touched cases (up to 4). */
export function getRecentCases() {
    return getAllCases()
        .slice(0, 4)
        .map((c) => ({
            id: c.id,
            name: `${c.caseNumber} — ${c.subject}`,
            icon: 'standard:case',
            path: `/cases/${c.id}`,
            status: c.status,
            priority: c.priority,
        }));
}
