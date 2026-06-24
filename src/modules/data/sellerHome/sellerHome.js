/**
 * Seller Home dashboard data.
 *
 * Aggregates Sales Cloud KPIs for the logged-in rep, reusing the automotive
 * opportunities and contacts so the dashboard tells the same story as the rest
 * of the app. Account/lead counts, activity breakdowns, goals, events and tasks
 * are lightweight prototype mocks.
 *
 * Consumed by:
 *   - page/sellerHome (the dashboard view)
 */
import {
    getAllOpportunities,
    getPipelineKpis,
    formatCurrencyCompact,
} from 'data/opportunities';
import { getAllContacts } from 'data/contacts';

export const SELLER_NAME = 'Matheus';

/** Prototype lead count (no leads data module yet). */
const LEADS_COUNT = 14;

/** Time-of-day greeting in pt-BR. */
export function getGreeting(date = new Date()) {
    const hour = date.getHours();
    if (hour < 12) return 'Bom dia';
    if (hour < 18) return 'Boa tarde';
    return 'Boa noite';
}

/** Shape a single legend row. `status` drives the dot colour in the view. */
function legendRow(status, value, label) {
    return { key: `${status}-${label}`, status, text: `${value} ${label}` };
}

/** "Close Deals" — open pipeline with an Open / Won / Lost breakdown. */
function closeDealsCard() {
    const opps = getAllOpportunities();
    const kpis = getPipelineKpis();
    const won = opps.filter((o) => o.isWon).reduce((sum, o) => sum + o.amount, 0);
    const lost = opps.filter((o) => o.isLost).reduce((sum, o) => sum + o.amount, 0);
    return {
        id: 'close-deals',
        title: 'Fechar negócios',
        description: 'Oportunidades minhas com fechamento neste trimestre',
        icon: 'standard:opportunity',
        ringClass: 'c-ring c-ring_neutral',
        ringPrimary: kpis.totalPipelineLabel,
        ringLabel: 'Pipeline total',
        legend: [
            legendRow('success', kpis.totalPipelineLabel, 'Aberto'),
            legendRow('info', formatCurrencyCompact(won), 'Ganho'),
            legendRow('error', formatCurrencyCompact(lost), 'Perdido'),
        ],
        button: { label: 'Ver oportunidades', path: '/opportunities' },
    };
}

/** Count card (Accounts / Contacts / Leads) with an activity breakdown. */
function metricCard({ id, title, description, icon, count, unit, button }) {
    return {
        id,
        title,
        description,
        icon,
        ringClass: 'c-ring c-ring_error',
        ringPrimary: String(count),
        ringLabel: unit,
        legend: [
            legendRow('success', 0, 'Atividade futura'),
            legendRow('info', 0, 'Atividade passada'),
            legendRow('error', count, 'Sem atividade'),
        ],
        button,
    };
}

/** The four hero KPI cards across the top of the dashboard. */
export function getKpiCards() {
    const opps = getAllOpportunities();
    const accounts = new Set(opps.map((o) => o.accountName)).size;
    const contacts = getAllContacts().length;
    return [
        closeDealsCard(),
        metricCard({
            id: 'accounts',
            title: 'Planejar minhas contas',
            description: 'Contas das quais sou proprietário',
            icon: 'standard:account',
            count: accounts,
            unit: 'Contas',
            button: { label: 'Ver contas', path: '/opportunities' },
        }),
        metricCard({
            id: 'contacts',
            title: 'Cultivar relacionamentos',
            description: 'Contatos meus criados nos últimos 90 dias',
            icon: 'standard:contact',
            count: contacts,
            unit: 'Contatos',
            button: { label: 'Ver contatos', path: '/contacts' },
        }),
        metricCard({
            id: 'leads',
            title: 'Construir pipeline',
            description: 'Leads meus criados nos últimos 30 dias',
            icon: 'standard:lead',
            count: LEADS_COUNT,
            unit: 'Leads',
            button: { label: 'Ver leads', path: '/opportunities' },
        }),
    ];
}

/** Today's events — empty in the prototype to show the empty state. */
export function getTodaysEvents() {
    return [];
}

/** Today's tasks — empty in the prototype to show the empty state. */
export function getTodaysTasks() {
    return [];
}

/** Recently viewed records, mixing opportunities and contacts. */
export function getRecentRecords() {
    const opps = getAllOpportunities()
        .slice(0, 2)
        .map((o) => ({
            id: `opp-${o.id}`,
            name: o.name,
            icon: 'standard:opportunity',
            path: `/opportunities/${o.id}`,
        }));
    const contacts = getAllContacts()
        .slice(0, 2)
        .map((c) => ({
            id: `con-${c.id}`,
            name: c.name,
            icon: 'standard:contact',
            path: `/contacts/${c.id}`,
        }));
    return [...opps, ...contacts];
}
