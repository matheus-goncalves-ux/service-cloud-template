import { LightningElement } from 'lwc';
import { getCurrentRoute, navigate } from '../../../router';
import {
    PORTAL_BRANDS,
    DEFAULT_BRAND_ID,
    getBrandById,
    PORTAL_USER,
    getArticleById,
    getRelatedArticles,
} from 'data/knowledge';

const BRAND_STORAGE_KEY = 'portal-brand';

export default class ArticleDetail extends LightningElement {
    brandId = DEFAULT_BRAND_ID;
    brands = PORTAL_BRANDS;
    user = PORTAL_USER;
    article = null;
    feedback = null; // 'yes' | 'no' | null

    connectedCallback() {
        try {
            const stored = localStorage.getItem(BRAND_STORAGE_KEY);
            if (stored && getBrandById(stored)) this.brandId = stored;
        } catch {
            /* storage unavailable; use default */
        }
        const id = getCurrentRoute()?.params?.id;
        if (id) this.article = getArticleById(id);
    }

    // --- Brand / theme ------------------------------------------------

    get brand() {
        return getBrandById(this.brandId);
    }

    get portalClass() {
        return `c-portal ${this.brand.themeClass}`;
    }

    // --- Article ------------------------------------------------------

    get hasArticle() {
        return this.article !== null;
    }

    get articleMeta() {
        if (!this.article) return '';
        const a = this.article;
        return `${a.type} • ${a.readTime} de leitura • ${a.updated}`;
    }

    get statsText() {
        if (!this.article) return '';
        const a = this.article;
        return `${a.views.toLocaleString('pt-BR')} visualizações • ${a.helpfulPercent}% acharam útil`;
    }

    /** Decorate body blocks with render flags (LWC templates can't do equality). */
    get bodyBlocks() {
        if (!this.article) return [];
        return this.article.body.map((block, index) => ({
            key: `${block.type}-${index}`,
            ...block,
            isHeading: block.type === 'heading',
            isParagraph: block.type === 'paragraph',
            isList: block.type === 'list',
            isCallout: block.type === 'callout',
            listTag: block.ordered ? 'ol' : 'ul',
            isOrdered: Boolean(block.ordered),
            items: (block.items ?? []).map((text, i) => ({ key: `i-${i}`, text })),
        }));
    }

    get tags() {
        return this.article?.tags ?? [];
    }

    get relatedArticles() {
        if (!this.article) return [];
        return getRelatedArticles(this.article.id, 3).map((a) => ({
            id: a.id,
            title: a.title,
            type: a.type,
            readTime: a.readTime,
            meta: `${a.type} • ${a.readTime}`,
        }));
    }

    get breadcrumbTopic() {
        return this.article?.topicLabel ?? 'Artigos';
    }

    // --- Feedback -----------------------------------------------------

    get feedbackGiven() {
        return this.feedback !== null;
    }

    get feedbackMessage() {
        if (this.feedback === 'yes') return 'Obrigado pelo feedback!';
        if (this.feedback === 'no') return 'Obrigado. Vamos melhorar este artigo.';
        return '';
    }

    get helpfulYesVariant() {
        return this.feedback === 'yes' ? 'brand' : 'neutral';
    }

    get helpfulNoVariant() {
        return this.feedback === 'no' ? 'brand' : 'neutral';
    }

    // --- Handlers -----------------------------------------------------

    handleHelpfulYes() {
        this.feedback = 'yes';
    }

    handleHelpfulNo() {
        this.feedback = 'no';
    }

    handleRelatedOpen(event) {
        const id = event.currentTarget.dataset.id;
        if (id) {
            this.article = getArticleById(id);
            this.feedback = null;
            navigate(`/article/${id}`);
        }
    }

    handleSearch(event) {
        const term = event.detail?.term ?? '';
        navigate(`/?q=${encodeURIComponent(term)}`);
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
        navigate('/');
    }

    handleBackToHelp(event) {
        event?.preventDefault?.();
        navigate('/');
    }

    handleExit() {
        this.dispatchEvent(
            new CustomEvent('builderexit', { bubbles: true, composed: true })
        );
    }
}
