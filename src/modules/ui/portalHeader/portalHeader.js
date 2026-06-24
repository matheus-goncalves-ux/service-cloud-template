import { LightningElement, api } from 'lwc';

/**
 * Branded portal header for the Experience Cloud help center.
 * Reusable across help-center and article pages. Owns no state — the page
 * passes the active brand + user and listens to the events below.
 *
 * Events: search { term }, brandchange { brandId }, home, exit
 */
export default class PortalHeader extends LightningElement {
    @api brand; // { id, name, portalName, wordmark }
    @api brands = []; // [{ id, name, ... }]
    @api userName = '';
    @api userInitials = '';

    get portalName() {
        return this.brand?.portalName ?? 'Dealer Hub';
    }

    get wordmark() {
        return this.brand?.wordmark ?? '';
    }

    get brandName() {
        return this.brand?.name ?? 'Marca';
    }

    get brandOptions() {
        return this.brands.map((b) => ({
            id: b.id,
            name: b.name,
            checked: this.brand ? b.id === this.brand.id : false,
        }));
    }

    handleSearch(event) {
        const term = event.detail?.value ?? '';
        this.dispatchEvent(
            new CustomEvent('search', {
                detail: { term },
                bubbles: true,
                composed: true,
            })
        );
    }

    handleBrandSelect(event) {
        const brandId = event.detail?.value;
        if (!brandId) return;
        this.dispatchEvent(
            new CustomEvent('brandchange', {
                detail: { brandId },
                bubbles: true,
                composed: true,
            })
        );
    }

    handleHome(event) {
        event?.preventDefault?.();
        this.dispatchEvent(
            new CustomEvent('home', { bubbles: true, composed: true })
        );
    }

    handleExit() {
        this.dispatchEvent(
            new CustomEvent('exit', { bubbles: true, composed: true })
        );
    }
}
