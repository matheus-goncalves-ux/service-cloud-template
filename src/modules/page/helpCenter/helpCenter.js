import { LightningElement } from 'lwc';
import { navigate } from '../../../router';
import {
    PORTAL_BRANDS,
    DEFAULT_BRAND_ID,
    getBrandById,
    PORTAL_USER,
    TOPICS,
    getTopicById,
    getAllArticles,
    getFeaturedArticles,
    getPopularArticles,
} from 'data/knowledge';
import { getAllCases } from 'data/cases';

const BRAND_STORAGE_KEY = 'portal-brand';

export default class HelpCenter extends LightningElement {
    brandId = DEFAULT_BRAND_ID;
    brands = PORTAL_BRANDS;
    user = PORTAL_USER;
    topics = TOPICS;
    query = '';
    activeTopicId = null;

    connectedCallback() {
        try {
            const stored = localStorage.getItem(BRAND_STORAGE_KEY);
            if (stored && getBrandById(stored)) this.brandId = stored;
        } catch {
            /* storage unavailable; use default */
        }
    }

    // --- Brand / theme ------------------------------------------------

    get brand() {
        return getBrandById(this.brandId);
    }

    get portalClass() {
        return `c-portal ${this.brand.themeClass}`;
    }

    // --- Filtering (search + topic) -----------------------------------

    get hasFilter() {
        return Boolean(this.query) || Boolean(this.activeTopicId);
    }

    get results() {
        const term = this.query.trim().toLowerCase();
        return getAllArticles()
            .filter((a) => !this.activeTopicId || a.topicId === this.activeTopicId)
            .filter((a) => {
                if (!term) return true;
                return (
                    a.title.toLowerCase().includes(term) ||
                    a.summary.toLowerCase().includes(term) ||
                    a.tags.join(' ').toLowerCase().includes(term)
                );
            })
            .map((a) => this._decorateArticle(a));
    }

    get resultsHeading() {
        if (this.activeTopicId) {
            const topic = getTopicById(this.activeTopicId);
            return topic ? topic.label : 'Resultados';
        }
        return `Resultados para "${this.query}"`;
    }

    get resultsCount() {
        const n = this.results.length;
        return `${n} artigo${n === 1 ? '' : 's'}`;
    }

    // --- Landing sections ---------------------------------------------

    get featuredArticles() {
        return getFeaturedArticles(3).map((a) => this._decorateArticle(a));
    }

    get popularArticles() {
        return getPopularArticles(5).map((a) => this._decorateArticle(a));
    }

    get myCases() {
        return getAllCases()
            .slice(0, 3)
            .map((c) => ({
                id: c.id,
                caseNumber: c.caseNumber,
                subject: c.subject,
                status: c.status,
                dateRelative: c.dateOpenedRelative,
                badgeClass: this._caseBadgeClass(c.status),
            }));
    }

    _decorateArticle(a) {
        return {
            id: a.id,
            title: a.title,
            summary: a.summary,
            type: a.type,
            topicLabel: a.topicLabel,
            readTime: a.readTime,
            meta: `${a.type} • ${a.readTime} • ${a.helpfulPercent}% útil`,
        };
    }

    _caseBadgeClass(status) {
        const base = 'slds-badge';
        if (status === 'Escalated' || status === 'New') return `${base} slds-theme_warning`;
        if (status === 'Closed') return `${base} slds-badge_inverse`;
        return base;
    }

    // --- Handlers -----------------------------------------------------

    handleSearch(event) {
        this.query = event.detail?.term ?? '';
        this.activeTopicId = null;
    }

    handleTopicOpen(event) {
        const id = event.currentTarget.dataset.id;
        if (id) {
            this.activeTopicId = id;
            this.query = '';
        }
    }

    handleClearFilter() {
        this.query = '';
        this.activeTopicId = null;
    }

    handleArticleOpen(event) {
        const id = event.currentTarget.dataset.id;
        if (id) navigate(`/article/${id}`);
    }

    handleCaseOpen() {
        // Portal cases are read-only stubs in this demo; no detail route in the
        // experience app. Kept as a no-op affordance.
    }

    handleBrandChange(event) {
        const id = event.detail?.brandId;
        if (!id || !getBrandById(id)) return;
        this.brandId = id;
        try {
            localStorage.setItem(BRAND_STORAGE_KEY, id);
        } catch {
            /* storage unavailable; non-fatal */
        }
    }

    handleHome() {
        this.handleClearFilter();
        navigate('/');
    }

    handleExit() {
        this.dispatchEvent(
            new CustomEvent('builderexit', { bubbles: true, composed: true })
        );
    }
}
