import { LightningElement, api } from 'lwc';

/**
 * ui-activity-timeline — SLDS Activity Timeline blueprint, redesigned to
 * match the Salesforce Cosmos / Lightning activity timeline visual spec.
 *
 * Renders a list of activities (tasks, events, emails, calls) using the
 * `slds-timeline` blueprint. Each row is expandable: clicking the chevron
 * reveals an inline detail panel with optional location/attendee/etc fields
 * and a description. The left rail shows the standard icon followed by a
 * coloured connecting bar (driven by the SLDS `slds-timeline__item_<type>`
 * modifier — purple for events, green for tasks, etc.).
 *
 * The item header supports a rich "actor" line:
 *   "[actor] [actorAction] [actorTargets...] [actorSuffix]"
 * e.g. "Você criou um evento com Vicente e 2 outros".
 *
 * @api items — array of activity objects. Each item supports:
 *   {
 *     id,
 *     type?: 'task' | 'event' | 'email' | 'call' | 'section',
 *     iconName,                // standard icon — drives the bar colour
 *     subject,
 *     subjectIcon?,            // utility icon next to title (e.g. 'utility:world')
 *     date,
 *     // Actor line (all optional)
 *     actor?,                  // e.g. 'Você'
 *     actorAction?,            // e.g. 'criou um evento com'
 *     actorTargets?: [{ label }],
 *     actorSuffix?,            // e.g. 'e 2 outros'
 *     meta?,                   // fallback plain text actor line
 *     // Expanded detail panel
 *     fields?: [{ label, value, linkable? }],
 *     description?
 *   }
 *   Items with `type: 'section'` are rendered as collapsible section headers
 *   (e.g. "Outubro • 2025"). They support `{ id, type: 'section', label }`.
 *
 * @api title — optional caption rendered above the list.
 * @api showActionLinks — when true, renders the right-aligned action row
 *   "Atualizar • Expandir tudo • Exibir tudo".
 */

const TYPE_BY_ICON = [
    { match: 'event', type: 'event' },
    { match: 'log_a_call', type: 'call' },
    { match: 'call', type: 'call' },
    { match: 'email', type: 'email' },
];

const TYPE_LABEL = {
    task: 'Tarefa',
    event: 'Evento',
    email: 'E-mail',
    call: 'Ligação',
};

export default class ActivityTimeline extends LightningElement {
    @api title;
    @api filterLabel;
    @api showActionLinks = false;

    _items = [];
    _open = {};
    _sections = {}; // sectionId -> collapsed?
    _allExpanded = false;

    @api
    get items() {
        return this._items;
    }
    set items(value) {
        this._items = Array.isArray(value) ? value : [];
    }

    get hasItems() {
        return this._items.length > 0;
    }

    get toggleAllLabel() {
        return this._allExpanded ? 'Recolher tudo' : 'Expandir tudo';
    }

    get displayItems() {
        return this._items.map((it) => {
            if (it.type === 'section') {
                const collapsed = !!this._sections[it.id];
                return {
                    id: it.id,
                    isSection: true,
                    label: it.label,
                    sectionClass: `c-timeline__section${collapsed ? ' c-timeline__section_collapsed' : ''}`,
                    ariaExpanded: collapsed ? 'false' : 'true',
                    toggleTitle: collapsed ? 'Expandir seção' : 'Recolher seção',
                };
            }
            const type = it.type || this._deriveType(it.iconName);
            const isOpen = !!this._open[it.id];
            const fields = Array.isArray(it.fields) ? it.fields.map((f) => ({
                ...f,
                key: f.label,
                fieldValueClass: `c-timeline__field-value${f.linkable ? ' c-timeline__field-value_link' : ''}`,
            })) : [];
            const actorTargets = Array.isArray(it.actorTargets)
                ? it.actorTargets.map((t) => ({ ...t, key: t.label }))
                : [];
            const hasActor = !!(it.actor || it.actorAction || actorTargets.length || it.actorSuffix);
            return {
                ...it,
                isSection: false,
                type,
                typeLabel: TYPE_LABEL[type] || 'Atividade',
                isOpen,
                ariaExpanded: isOpen ? 'true' : 'false',
                ariaHidden: isOpen ? 'false' : 'true',
                hasActor,
                actorTargets,
                hasFields: fields.length > 0,
                fields,
                rootClass: `slds-timeline__item_expandable slds-timeline__item_${type} c-timeline__item${
                    isOpen ? ' slds-is-open' : ''
                }`,
                toggleTitle: isOpen ? 'Recolher' : 'Expandir',
            };
        });
    }

    _deriveType(iconName) {
        const name = (iconName || '').toLowerCase();
        const found = TYPE_BY_ICON.find((m) => name.includes(m.match));
        return found ? found.type : 'task';
    }

    handleToggle(event) {
        const id = event.currentTarget.dataset.id;
        if (id == null) return;
        this._open = { ...this._open, [id]: !this._open[id] };
    }

    handleToggleSection(event) {
        const id = event.currentTarget.dataset.id;
        if (id == null) return;
        this._sections = { ...this._sections, [id]: !this._sections[id] };
    }

    handleRefresh() {
        this.dispatchEvent(new CustomEvent('refresh'));
    }

    handleFilter() {
        this.dispatchEvent(new CustomEvent('filter'));
    }

    handleToggleAll() {
        const next = !this._allExpanded;
        const open = {};
        this._items.forEach((it) => {
            if (it.type !== 'section') open[it.id] = next;
        });
        this._open = open;
        this._allExpanded = next;
    }

    handleShowAll() {
        this.dispatchEvent(new CustomEvent('showall'));
    }

    handleMenu(event) {
        const id = event.currentTarget.dataset.id;
        this.dispatchEvent(new CustomEvent('itemmenu', { detail: { id } }));
    }
}
