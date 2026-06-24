import { LightningElement } from 'lwc';
import { navigate } from '../../../router';
import { formatCurrencyBRL, PERSONAL_ACCOUNTS_ALL } from 'data/personalAccounts';

const COLUMNS = [
    {
        label: 'Nome',
        fieldName: 'name',
        type: 'button',
        initialWidth: 200,
        sortable: true,
        typeAttributes: {
            label: { fieldName: 'name' },
            variant: 'base',
            name: 'view',
        },
    },
    { label: 'CPF',       fieldName: 'cpf',              sortable: true, initialWidth: 140 },
    { label: 'Cidade',    fieldName: 'location',         sortable: true, initialWidth: 160 },
    { label: 'Status',    fieldName: 'status',           sortable: true, initialWidth: 110 },
    { label: 'Tier',      fieldName: 'loyaltyTier',      sortable: true, initialWidth: 100 },
    { label: 'LTV',       fieldName: 'ltvLabel',         sortable: true, initialWidth: 120 },
    { label: 'Canal',     fieldName: 'preferredChannel', sortable: true, initialWidth: 130 },
    {
        type: 'action',
        typeAttributes: {
            rowActions: [
                { label: 'Ver',       name: 'view' },
                { label: 'Editar',    name: 'edit' },
                { label: 'Novo Caso', name: 'new_case' },
            ],
        },
    },
];

export default class PersonalAccounts extends LightningElement {
    columns = COLUMNS;
    data = [];
    sortedBy = 'name';
    sortedDirection = 'asc';
    searchTerm = '';

    connectedCallback() {
        this.data = (PERSONAL_ACCOUNTS_ALL || []).map((a) => ({
            ...a,
            location: `${a.city}, ${a.state}`,
            ltvLabel: formatCurrencyBRL(a.lifetimeValue),
        }));
    }

    get filteredData() {
        if (!this.searchTerm) return this.data;
        const term = this.searchTerm.toLowerCase();
        return this.data.filter(
            (item) =>
                item.name.toLowerCase().includes(term) ||
                item.status.toLowerCase().includes(term) ||
                item.loyaltyTier.toLowerCase().includes(term) ||
                item.location.toLowerCase().includes(term) ||
                (item.preferredChannel || '').toLowerCase().includes(term)
        );
    }

    get metaText() {
        const count = this.filteredData.length;
        const sortCol = this.columns.find((c) => c.fieldName === this.sortedBy)?.label;
        let text = `${count} conta${count !== 1 ? 's' : ''} pessoal${count !== 1 ? 'is' : ''}`;
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
            navigate(`/personal-accounts/${row.id}`);
        }
    }
}
