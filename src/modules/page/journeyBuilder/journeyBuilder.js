import { LightningElement } from 'lwc';
import {
    JOURNEY,
    FLOW,
    PALETTE_GROUPS,
    getNodeById,
    JOURNEY_STATUS,
} from 'data/journeys';

const LEFT_PANEL_TITLE = 'Atividades';

export default class JourneyBuilder extends LightningElement {
    journey = JOURNEY;
    status = JOURNEY.status;
    selectedNodeId = 'entry';
    showLeftPanel = true;

    leftPanelTitle = LEFT_PANEL_TITLE;

    // --- Left rail (palette) ------------------------------------------

    get paletteGroups() {
        return PALETTE_GROUPS.map((group) => ({
            ...group,
            items: group.items.map((item) => ({
                ...item,
                isStandardIcon: item.iconName.startsWith('standard:'),
            })),
        }));
    }

    get leftRailClass() {
        const base =
            'slds-panel slds-panel_docked slds-panel_docked-left slds-is-open c-rail c-rail_left slds-scrollable';
        return this.showLeftPanel ? base : `${base} slds-hide`;
    }

    // --- Canvas (flow) ------------------------------------------------

    get flowSegments() {
        return FLOW.map((seg, index) => {
            const showTopConnector = index > 0;
            if (seg.kind === 'decision') {
                return {
                    key: seg.node.id,
                    isDecision: true,
                    showTopConnector,
                    node: this._decorate(seg.node),
                    branches: seg.branches.map((branch) => ({
                        id: branch.id,
                        label: branch.label,
                        labelClass:
                            branch.tone === 'positive'
                                ? 'c-branch__label c-branch__label_yes'
                                : 'c-branch__label c-branch__label_no',
                        nodes: branch.nodes.map((node) => this._decorate(node)),
                    })),
                };
            }
            return {
                key: seg.node.id,
                isNode: true,
                showTopConnector,
                node: this._decorate(seg.node),
            };
        });
    }

    _decorate(node) {
        const isSelected = node.id === this.selectedNodeId;
        const isStandardIcon = node.iconName.startsWith('standard:');
        return {
            ...node,
            isSelected,
            isStandardIcon,
            isMonoIcon: !isStandardIcon,
            nodeClass: isSelected ? 'c-node c-node_selected' : 'c-node',
            ariaPressed: String(isSelected),
        };
    }

    // --- Right rail (properties / overview) ---------------------------

    get selectedNode() {
        if (!this.selectedNodeId) return null;
        const node = getNodeById(this.selectedNodeId);
        return node ? this._decorate(node) : null;
    }

    get hasSelection() {
        return Boolean(this.selectedNode);
    }

    get rightPanelTitle() {
        return this.hasSelection ? 'Propriedades' : 'Visão geral da jornada';
    }

    // --- Header / status ----------------------------------------------

    get isActive() {
        return this.status === JOURNEY_STATUS.ACTIVE;
    }

    get statusBadgeClass() {
        const base = 'c-status-badge';
        return this.isActive ? `${base} c-status-badge_active` : `${base} c-status-badge_draft`;
    }

    get activateLabel() {
        return this.isActive ? 'Ativa' : 'Ativar';
    }

    get activateDisabled() {
        return this.isActive;
    }

    // --- Handlers -----------------------------------------------------

    handleSelectNode(event) {
        const id = event.currentTarget.dataset.id;
        if (id) this.selectedNodeId = id;
    }

    handleClearSelection() {
        this.selectedNodeId = null;
    }

    handleBack() {
        this.dispatchEvent(
            new CustomEvent('builderexit', { bubbles: true, composed: true })
        );
    }

    toggleLeftPanel() {
        this.showLeftPanel = !this.showLeftPanel;
    }

    closeLeftPanel() {
        this.showLeftPanel = false;
    }

    handleSave() {
        // Mock save — keeps the journey in its current status.
    }

    handleActivate() {
        this.status = JOURNEY_STATUS.ACTIVE;
    }

    handleSettings() {
        // Reserved for journey settings modal.
    }
}
