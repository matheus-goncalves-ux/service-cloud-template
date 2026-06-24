import { LightningElement, api } from 'lwc';

/**
 * Branded portal footer for the Experience Cloud help center.
 * Display-only; the page passes the active brand for the wordmark + name.
 */
export default class PortalFooter extends LightningElement {
    @api brand; // { name, portalName, wordmark }

    get portalName() {
        return this.brand?.portalName ?? 'Dealer Hub';
    }

    get wordmark() {
        return this.brand?.wordmark ?? '';
    }

    get year() {
        return new Date().getFullYear();
    }

    get links() {
        return [
            { id: 'support', label: 'Suporte ao dealer' },
            { id: 'training', label: 'Treinamentos' },
            { id: 'contact', label: 'Fale conosco' },
            { id: 'privacy', label: 'Privacidade (LGPD)' },
        ];
    }
}
