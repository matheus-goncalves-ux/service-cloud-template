import { LightningElement } from 'lwc';
import { navigate } from '../../../router';
import {
    AGENT_NAME,
    getGreeting,
    getKpiCards,
    getFcrData,
    getOverdueCases,
    getRecentCases,
} from 'data/serviceHome';

/**
 * page-service-home — Service Cloud "Agent Home" dashboard.
 *
 * A landing page for service agents: a greeting, four hero KPI cards (Backlog,
 * SLA, Tempo médio de resolução, CSAT) each with a metric ring and a
 * colour-coded legend, plus a second row with FCR summary, overdue-SLA cases
 * (illustrated empty state when none) and recently accessed cases.
 */
export default class ServiceHome extends LightningElement {
    /** Time-aware greeting, e.g. "Bom dia, Camila. Vamos atender!". */
    get greeting() {
        return `${getGreeting()}, ${AGENT_NAME}. Vamos atender!`;
    }

    /** KPI cards with per-legend dot/badge classes. */
    get cards() {
        return getKpiCards().map((card) => ({
            ...card,
            legend: card.legend.map((row) => ({
                ...row,
                dotClass: `c-dot c-dot_${row.status}`,
                badgeClass: `c-badge c-badge_${row.status}`,
            })),
        }));
    }

    /** FCR card data with badgeClass on each legend row. */
    get fcr() {
        const data = getFcrData();
        return {
            ...data,
            legend: data.legend.map((row) => ({
                ...row,
                dotClass: `c-dot c-dot_${row.status}`,
                badgeClass: `c-badge c-badge_${row.status}`,
            })),
        };
    }

    overdueCases = getOverdueCases();
    recentCases = getRecentCases();

    get hasOverdueCases() {
        return this.overdueCases.length > 0;
    }

    /** Navigate from any element carrying a data-path attribute. */
    handleNavigate(event) {
        event.preventDefault();
        const path = event.currentTarget.dataset.path;
        if (path) {
            navigate(path);
        }
    }
}
