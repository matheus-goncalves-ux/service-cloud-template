import { LightningElement } from 'lwc';
import { navigate } from '../../../router';
import { getAllOpportunities, BOARD_STAGES, formatCurrency } from 'data/opportunities';

/**
 * Standard Opportunities list-view columns. Mirrors the default Salesforce
 * Opportunities list view (Opportunity Name, Account, Amount, Stage, …).
 */
const COLUMNS = [
    {
        label: 'Oportunidade',
        fieldName: 'name',
        type: 'button',
        sortable: true,
        wrapText: true,
        typeAttributes: { label: { fieldName: 'name' }, variant: 'base', name: 'view' },
    },
    { label: 'Conta', fieldName: 'accountName', sortable: true },
    {
        label: 'Valor',
        fieldName: 'amount',
        type: 'currency',
        sortable: true,
        initialWidth: 150,
        typeAttributes: { currencyCode: 'BRL' },
        cellAttributes: { alignment: 'right' },
    },
    { label: 'Estágio', fieldName: 'stage', sortable: true, initialWidth: 150 },
    {
        label: 'Probabilidade (%)',
        fieldName: 'probability',
        type: 'number',
        sortable: true,
        initialWidth: 160,
        cellAttributes: { alignment: 'right' },
    },
    { label: 'Data de fechamento', fieldName: 'closeDate', sortable: true, initialWidth: 160 },
    { label: 'Categoria de previsão', fieldName: 'forecastCategory', sortable: true, initialWidth: 180 },
    { label: 'Proprietário', fieldName: 'ownerName', sortable: true },
    {
        type: 'action',
        typeAttributes: {
            rowActions: [
                { label: 'Abrir', name: 'view' },
                { label: 'Editar', name: 'edit' },
                { label: 'Alterar proprietário', name: 'change_owner' },
            ],
        },
    },
];

/**
 * page-pipeline — standard Sales Cloud Opportunities list view.
 * Object-home page header with list-view controls plus a sortable datatable.
 * The Opportunity Name link and the row "Abrir" action open the record.
 */
export default class Pipeline extends LightningElement {
    columns = COLUMNS;
    data = [];
    sortedBy = 'name';
    sortedDirection = 'asc';
    searchTerm = '';
    /** Table is the default/priority view; 'kanban' is the alternate board. */
    view = 'table';

    connectedCallback() {
        this.data = getAllOpportunities();
    }

    get filteredData() {
        if (!this.searchTerm) {
            return this.data;
        }
        const term = this.searchTerm;
        return this.data.filter(
            (o) =>
                o.name.toLowerCase().includes(term) ||
                o.accountName.toLowerCase().includes(term) ||
                o.stage.toLowerCase().includes(term) ||
                o.ownerName.toLowerCase().includes(term)
        );
    }

    get metaText() {
        const count = this.filteredData.length;
        const sortField = this.columns.find((c) => c.fieldName === this.sortedBy)?.label;
        let text = `${count} ${count === 1 ? 'item' : 'itens'}`;
        if (sortField) {
            text += ` \u2022 Ordenado por ${sortField}`;
        }
        text += ' \u2022 Atualizado agora';
        return text;
    }

    // --- View toggle (table is the default/priority view) ---
    get isTable() {
        return this.view === 'table';
    }

    get isKanban() {
        return this.view === 'kanban';
    }

    get tableButtonVariant() {
        return this.view === 'table' ? 'brand' : 'neutral';
    }

    get kanbanButtonVariant() {
        return this.view === 'kanban' ? 'brand' : 'neutral';
    }

    /**
     * Kanban columns built from the (search-filtered) rows — one per board
     * stage, each carrying its deal cards, count and summed amount. Mirrors the
     * standard Salesforce Opportunity Kanban grouped by Stage.
     */
    get boardColumns() {
        const rows = this.filteredData;
        return BOARD_STAGES.map((stageName) => {
            const deals = rows.filter((o) => o.stage === stageName);
            const total = deals.reduce((sum, d) => sum + d.amount, 0);
            return {
                name: stageName,
                count: deals.length,
                deals,
                isEmpty: deals.length === 0,
                totalLabel: formatCurrency(total),
            };
        });
    }

    handleSearch(event) {
        this.searchTerm = (event.detail.value || '').trim().toLowerCase();
    }

    handleSort(event) {
        const { fieldName, sortDirection } = event.detail;
        const cloned = [...this.data];
        cloned.sort((a, b) => {
            let av = a[fieldName] ?? '';
            let bv = b[fieldName] ?? '';
            if (typeof av === 'string') av = av.toLowerCase();
            if (typeof bv === 'string') bv = bv.toLowerCase();
            if (av < bv) return sortDirection === 'asc' ? -1 : 1;
            if (av > bv) return sortDirection === 'asc' ? 1 : -1;
            return 0;
        });
        this.data = cloned;
        this.sortedBy = fieldName;
        this.sortedDirection = sortDirection;
    }

    handleRowAction(event) {
        const { action, row } = event.detail;
        if (action.name === 'view') {
            navigate(`/opportunities/${row.id}`);
        }
    }

    handleViewChange(event) {
        const view = event.currentTarget.dataset.view;
        if (view) {
            this.view = view;
        }
    }

    handleCardOpen(event) {
        event.preventDefault();
        const id = event.currentTarget.dataset.id;
        if (id) {
            navigate(`/opportunities/${id}`);
        }
    }

    handleCardAction(event) {
        const id = event.currentTarget.dataset.id;
        if (event.detail.value === 'view' && id) {
            navigate(`/opportunities/${id}`);
        }
    }
}
