import { LightningElement } from 'lwc';
import { navigate } from '../../../router';
import { getAllContacts } from 'data/contacts';

const CREATED_OPTIONS = [
    { label: 'Este Trimestre', value: 'this-quarter' },
    { label: 'Este Mês', value: 'this-month' },
    { label: 'Este Ano', value: 'this-year' },
    { label: 'Todo o Período', value: 'all-time' }
];

const OWNER_OPTIONS = [
    { label: 'Eu', value: 'me' },
    { label: 'Minha Equipe', value: 'team' },
    { label: 'Todos', value: 'everyone' }
];

const SORT_LABELS = {
    name: 'Nome',
    title: 'Cargo',
    accountName: 'Nome da Conta',
    lastActivity: 'Última Atividade'
};

/**
 * page-contacts — Sales console "My Contacts" list view.
 *
 * Mirrors the standard Salesforce list view: object-home header, a filter
 * bar (Created / Owner), an insight stat-card row, a bulk-action toolbar and
 * a custom SLDS data table with bookmark and quick-action (email / call)
 * columns. Row click opens page-contact-detail.
 */
export default class Contacts extends LightningElement {
    data = [];
    searchTerm = '';
    sortedBy = 'name';
    sortDirection = 'asc';
    createdFilter = 'this-quarter';
    ownerFilter = 'me';
    createdOptions = CREATED_OPTIONS;
    ownerOptions = OWNER_OPTIONS;

    connectedCallback() {
        this.data = getAllContacts();
    }

    // ---------------------------------------------------------------------------
    // Filtering + sorting
    // ---------------------------------------------------------------------------

    get filteredData() {
        if (!this.searchTerm) {
            return this.data;
        }
        const term = this.searchTerm.toLowerCase();
        return this.data.filter(
            (c) =>
                c.name.toLowerCase().includes(term) ||
                (c.accountName || '').toLowerCase().includes(term) ||
                (c.title || '').toLowerCase().includes(term)
        );
    }

    get rows() {
        const dir = this.sortDirection === 'asc' ? 1 : -1;
        const key = this.sortedBy;
        return [...this.filteredData]
            .sort((a, b) => {
                const aVal = (a[key] || '').toString().toLowerCase();
                const bVal = (b[key] || '').toString().toLowerCase();
                if (aVal < bVal) return -1 * dir;
                if (aVal > bVal) return 1 * dir;
                return 0;
            })
            .map((c) => ({
                id: c.id,
                name: c.name,
                title: c.title,
                accountName: c.accountName,
                lastActivity: c.lastActivity,
                emailTitle: `E-mail para ${c.name}`,
                callTitle: `Ligar para ${c.name}`,
                checkboxLabel: `Selecionar ${c.name}`,
                bookmarkLabel: `Favoritar ${c.name}`
            }));
    }

    get totalCount() {
        return this.data.length;
    }

    get filteredCount() {
        return this.filteredData.length;
    }

    // ---------------------------------------------------------------------------
    // Header / toolbar meta text
    // ---------------------------------------------------------------------------

    get metaText() {
        const count = this.filteredCount;
        const noun = count === 1 ? 'item' : 'itens';
        return `${count} ${noun} \u2022 Ordenado por ${SORT_LABELS[this.sortedBy]} \u2022 Filtrado por todos os contatos \u2022 Atualizado há alguns segundos`;
    }

    get tableMeta() {
        const count = this.filteredCount;
        const noun = count === 1 ? 'item' : 'itens';
        return `${count} ${noun} \u2022 Ordenado por ${SORT_LABELS[this.sortedBy]} \u2022 Filtrado por todos os contatos`;
    }

    // ---------------------------------------------------------------------------
    // Insight stat cards
    // ---------------------------------------------------------------------------

    get statCards() {
        const total = this.totalCount;
        const cards = [
            { key: 'total', label: 'Total de Contatos', value: total, selected: true },
            { key: 'no-activity', label: 'Sem Atividade', value: 4, selected: false },
            { key: 'idle', label: 'Inativo', value: 3, selected: false },
            { key: 'no-upcoming', label: 'Sem Próximas', value: 6, selected: false },
            { key: 'overdue', label: 'Atrasado', value: 2, selected: false },
            { key: 'due-today', label: 'Vence Hoje', value: 1, selected: false },
            { key: 'upcoming', label: 'Próximas', value: 5, selected: false }
        ];
        return cards.map((card) => ({
            ...card,
            cardClass: card.selected
                ? 'c-stat-card c-stat-card_selected'
                : 'c-stat-card',
            infoLabel: `Sobre ${card.label}`
        }));
    }

    // ---------------------------------------------------------------------------
    // Sortable column header state
    // ---------------------------------------------------------------------------

    _columnState(field) {
        const active = this.sortedBy === field;
        const ascending = this.sortDirection === 'asc';
        return {
            active,
            ariaSort: active ? (ascending ? 'ascending' : 'descending') : 'none',
            headerClass: active
                ? 'slds-is-sortable slds-is-sorted'
                : 'slds-is-sortable',
            iconName: active && !ascending ? 'utility:arrowup' : 'utility:arrowdown'
        };
    }

    get sortState() {
        return {
            name: this._columnState('name'),
            title: this._columnState('title'),
            account: this._columnState('accountName'),
            activity: this._columnState('lastActivity')
        };
    }

    // ---------------------------------------------------------------------------
    // Event handlers
    // ---------------------------------------------------------------------------

    handleSearch(event) {
        this.searchTerm = event.detail.value;
    }

    handleSort(event) {
        event.preventDefault();
        const field = event.currentTarget.dataset.field;
        if (!field) return;
        if (this.sortedBy === field) {
            this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
            this.sortedBy = field;
            this.sortDirection = 'asc';
        }
    }

    handleCreatedChange(event) {
        this.createdFilter = event.detail.value;
    }

    handleOwnerChange(event) {
        this.ownerFilter = event.detail.value;
    }

    handleRowOpen(event) {
        event.preventDefault();
        const id = event.currentTarget.dataset.id;
        if (id) {
            navigate(`/contacts/${id}`);
        }
    }

    handleNoop(event) {
        event.preventDefault();
    }
}
