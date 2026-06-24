import { LightningElement } from 'lwc';
import { navigate } from '../../../router';
import {
    SELLER_NAME,
    getGreeting,
    getKpiCards,
    getTodaysEvents,
    getTodaysTasks,
    getRecentRecords,
} from 'data/sellerHome';

/**
 * page-seller-home — Sales Cloud "Seller Home" dashboard.
 *
 * A landing page for sales reps: a greeting, four hero KPI cards (Close Deals,
 * Plan My Accounts, Grow Relationships, Build Pipeline) each with a metric ring
 * and a colour-coded activity legend, plus a second row of three cards —
 * today's events and tasks (illustrated empty states) and recently viewed
 * records.
 */
export default class SellerHome extends LightningElement {
    /** Time-aware greeting line, e.g. "Bom dia, Matheus. Vamos vender!". */
    get greeting() {
        return `${getGreeting()}, ${SELLER_NAME}. Vamos vender!`;
    }

    /** KPI cards with per-legend dot/badge classes derived from each status. */
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

    events = getTodaysEvents();
    tasks = getTodaysTasks();
    recentRecords = getRecentRecords();

    get hasEvents() {
        return this.events.length > 0;
    }

    get hasTasks() {
        return this.tasks.length > 0;
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
