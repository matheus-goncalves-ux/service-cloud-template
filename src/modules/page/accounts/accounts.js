import { LightningElement } from 'lwc';
import { navigate } from '../../../router';
import { getAllAccounts, formatCurrencyCompact } from 'data/accounts';

const COLUMNS = [
    {
        label: 'Nome da Conta',
        fieldName: 'name',
        type: 'button',
        initialWidth: 210,
        sortable: true,
        typeAttributes: {
            label: { fieldName: 'name' },
            variant: 'base',
            name: 'view',
        },
    },
    { label: 'Tipo', fieldName: 'typeLabel', sortable: true, initialWidth: 120 },
    { label: 'Segmento', fieldName: 'segment', sortable: true, wrapText: true },
    { label: 'Localização', fieldName: 'location', sortable: true, initialWidth: 140 },
    { label: 'Status', fieldName: 'status', sortable: true, initialWidth: 130 },
    { label: 'Tier', fieldName: 'loyaltyTier', sortable: true, initialWidth: 100 },
    { label: 'GMV 30 dias', fieldName: 'gmvLabel', sortable: true, initialWidth: 130 },
    { label: 'Responsável', fieldName: 'ownerName', sortable: true, initialWidth: 130 },
    {
        type: 'action',
        typeAttributes: {
            rowActions: [
                { label: 'Ver', name: 'view' },
                { label: 'Editar', name: 'edit' },
                { label: 'Novo Caso', name: 'new_case' },
                { label: 'Encerrar Conta', name: 'close' },
            ],
        },
    },
];

/**
 * page-accounts — Compra Agora account list view.
 *
 * Same pattern as page-cases: ui-page-header (object-home) + lightning-datatable.
 */
export default class Accounts extends LightningElement {
    columns = COLUMNS;
    data = [];
    sortedBy = 'name';
    sortedDirection = 'asc';
    searchTerm = '';

    connectedCallback() {
        this.data = getAllAccounts().map((a) => ({
            ...a,
            typeLabel: a.type === 'PersonAccount' ? 'Pessoal' : 'Empresarial',
            location: `${a.city}, ${a.state}`,
            gmvLabel: formatCurrencyCompact(a.gmvLast30),
        }));
    }

    get filteredData() {
        if (!this.searchTerm) return this.data;
        const term = this.searchTerm.toLowerCase();
        return this.data.filter(
            (item) =>
                item.name.toLowerCase().includes(term) ||
                item.segment.toLowerCase().includes(term) ||
                item.status.toLowerCase().includes(term) ||
                item.loyaltyTier.toLowerCase().includes(term) ||
                item.location.toLowerCase().includes(term) ||
                item.ownerName.toLowerCase().includes(term)
        );
    }

    get metaText() {
        const count = this.filteredData.length;
        const sortCol = this.columns.find((c) => c.fieldName === this.sortedBy)?.label;
        let text = `${count} conta${count !== 1 ? 's' : ''}`;
        if (sortCol) text += ` \u2022 Ordenado por ${sortCol}`;
        text += ' \u2022 Atualizado agora';
        return text;
    }

    handleSearch(event) {
        this.searchTerm = event.detail.value;
    }

    handleSort(event) {
        const { fieldName, sortDirection } = event.detail;
        const cloned = [...this.data];
        cloned.sort((a, b) => {
            let aVal = a[fieldName] || '';
            let bVal = b[fieldName] || '';
            if (typeof aVal === 'string') {
                aVal = aVal.toLowerCase();
                bVal = bVal.toLowerCase();
            }
            if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
            if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
            return 0;
        });
        this.data = cloned;
        this.sortedBy = fieldName;
        this.sortedDirection = sortDirection;
    }

    handleRowAction(event) {
        const { action, row } = event.detail;
        if (action.name === 'view') {
            navigate(`/accounts/${row.id}`);
        }
    }
}
