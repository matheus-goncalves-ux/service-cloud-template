import { LightningElement } from 'lwc';
import { navigate } from '../../../router';
import { getAllCases } from 'data/cases';

const COLUMNS = [
    {
        label: 'Nº do caso',
        fieldName: 'caseNumber',
        type: 'button',
        initialWidth: 140,
        sortable: true,
        typeAttributes: {
            label: { fieldName: 'caseNumber' },
            variant: 'base',
            name: 'view'
        }
    },
    { label: 'Assunto', fieldName: 'subject', sortable: true, wrapText: true },
    { label: 'Tipo de caso', fieldName: 'caseType', sortable: true, initialWidth: 130 },
    { label: 'Status', fieldName: 'status', sortable: true, initialWidth: 120 },
    { label: 'Prioridade', fieldName: 'priority', sortable: true, initialWidth: 110 },
    { label: 'Contato', fieldName: 'contactName', sortable: true },
    { label: 'Conta', fieldName: 'accountName', sortable: true },
    { label: 'Data de abertura', fieldName: 'dateOpened', initialWidth: 170 },
    { label: 'Responsável', fieldName: 'ownerName', sortable: true },
    {
        type: 'action',
        typeAttributes: {
            rowActions: [
                { label: 'Visualizar', name: 'view' },
                { label: 'Editar', name: 'edit' },
                { label: 'Alterar responsável', name: 'change_owner' },
                { label: 'Fechar caso', name: 'close' }
            ]
        }
    }
];

export default class Cases extends LightningElement {
    columns = COLUMNS;
    data = [];
    sortedBy = 'caseNumber';
    sortedDirection = 'desc';
    searchTerm = '';

    connectedCallback() {
        this.data = getAllCases();
    }

    get filteredData() {
        if (!this.searchTerm) {
            return this.data;
        }
        const term = this.searchTerm.toLowerCase();
        return this.data.filter(
            (item) =>
                item.caseNumber.toLowerCase().includes(term) ||
                item.subject.toLowerCase().includes(term) ||
                item.status.toLowerCase().includes(term) ||
                item.priority.toLowerCase().includes(term) ||
                (item.caseType || '').toLowerCase().includes(term) ||
                item.contactName.toLowerCase().includes(term) ||
                item.accountName.toLowerCase().includes(term)
        );
    }

    get metaText() {
        const count = this.filteredData.length;
        const sortField = this.columns.find((c) => c.fieldName === this.sortedBy)?.label;
        let text = `${count} item${count !== 1 ? 's' : ''}`;
        if (sortField) {
            text += ` \u2022 Sorted by ${sortField}`;
        }
        text += ' \u2022 Updated a few seconds ago';
        return text;
    }

    handleSearch(event) {
        this.searchTerm = event.detail.value;
    }

    handleSort(event) {
        const { fieldName, sortDirection } = event.detail;
        const clonedData = [...this.data];

        clonedData.sort((a, b) => {
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

        this.data = clonedData;
        this.sortedBy = fieldName;
        this.sortedDirection = sortDirection;
    }

    handleRowAction(event) {
        const action = event.detail.action;
        const row = event.detail.row;

        if (action.name === 'view') {
            navigate(`/cases/${row.id}`);
        } else if (action.name === 'close') {
            this.data = this.data.map((item) =>
                item.id === row.id ? { ...item, status: 'Closed' } : item
            );
        }
    }
}
