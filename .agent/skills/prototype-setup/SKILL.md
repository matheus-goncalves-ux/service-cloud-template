---
name: prototype-setup
version: "1.0.0"
description: "First-time setup of the service-cloud-template (Salesforce prototype starter kit) after the user has cloned it and opened the workspace in VS Code. Configures Copilot auto-approve, switches to a recent Claude model, optionally sets up Figma MCP, runs a smoke test, and optionally applies a custom brand (logo + color). Use when the user has just opened the starter kit and asks how to start, set it up from scratch, configure their prototype environment, or onboard. Trigger phrases (EN + PT-BR): 'set up from scratch', 'first time setup', 'just got this starter kit', 'walk me through everything', 'how do I start', 'onboarding', 'configurar starter kit', 'configurar pela primeira vez', 'acabei de clonar', 'começar um protótipo novo'."
---

# Prototype setup

First-time setup of the **service-cloud-template** (the Salesforce prototype starter kit this project is based on) after the user has cloned the repo and opened it in VS Code. Walk the user through six phases, asking before optional ones.

## Scope

This skill assumes the user **already has the workspace open**. Cloning the repo, installing VS Code, and signing in to Copilot are covered in the [`README.md`](../../../README.md) under **Quick start (first time)**. If the workspace is not open, point the user there first and stop.

## Tone

**Important:** The user may not be technical. Always use the correct technical term but immediately follow it with a plain-language explanation in parentheses — e.g. "merge the JSON (combine the new settings with what's already in the file, so we don't overwrite anything)". Do this every time, not just the first mention. Confirm at each checkpoint before moving on.

## Phases

Run phases **0 → 5** in order. Phases **3 (Figma MCP)** and **5 (Branding)** are opt-in — ask the user before doing them.

### Phase 0 — Environment check

Verify the user is in the right place before changing anything.

```bash
node -v
git --version
ls package.json AGENTS.md src
```

- **Node 20+** required (Node 20 LTS recommended — the template's `package.json` declares `"engines": { "node": ">=20" }`). If older, follow [`reference/troubleshooting.md`](./reference/troubleshooting.md) → "npm install fails".
- If `ls` doesn't find all three, the user opened the wrong folder. Tell them and stop.

**Checkpoint:** All three commands succeed.

### Phase 1 — Copilot auto-approve

Pre-approve the day-to-day commands so the agent stops asking on every step. A small denylist still forces confirmation on destructive ops (`rm -rf`, `git push`, `npm publish`, `npm run deploy`).

1. Check if `.vscode/settings.json` exists:
   ```bash
   ls .vscode/settings.json 2>/dev/null
   ```
2. If **missing** → create the folder and copy the reference verbatim:
   ```bash
   mkdir -p .vscode
   cp .agent/skills/prototype-setup/reference/auto-approve-settings.jsonc .vscode/settings.json
   ```
3. If **exists** → **merge** (combine without overwriting). Read both files, add the three top-level keys (`chat.tools.terminal.autoApprove`, `chat.agent.maxRequests`, `github.copilot.chat.agent.runTasks`) from the reference into the existing JSON, preserving any other keys the user already has. If a key is already present, ask the user before overwriting.
4. Reload VS Code: **Cmd+Shift+P → Developer: Reload Window**. This is required — VS Code only re-reads workspace settings on window load.

**Checkpoint:** Ask the agent (yourself) to run `ls -la` in the terminal. If no confirmation prompt appears, auto-approve is live.

### Phase 2 — Use a recent Claude model

The skills in this repo are tuned for Claude. Switch the Copilot model:

1. **Cmd+Shift+P → GitHub Copilot: Change Model**.
2. Pick the most recent **Claude** option in the list (e.g. Claude Sonnet 4.5 or newer).

If Claude doesn't appear, see [`reference/troubleshooting.md`](./reference/troubleshooting.md) → "Model picker doesn't show recent Claude versions".

**Checkpoint:** Confirm with the user that the model picker now shows Claude.

### Phase 3 — Figma MCP (ask first)

Ask the user verbatim:

> *"Figma MCP lets you paste a Figma frame URL into chat and I'll read the design directly. It's most useful if you're a designer, or if you work closely with one and want to translate Figma screens into code. Want to set it up now? (yes / skip)"*

- **skip** → go to Phase 4.
- **yes** → load [`reference/figma-mcp-setup.md`](./reference/figma-mcp-setup.md) and follow it end-to-end. Return here when the user confirms the MCP shows "Enabled".

**Checkpoint:** Either the user skipped, or `MCP: List Servers` shows **Figma** with a green dot.

### Phase 4 — Smoke test

Confirm the starter kit runs locally.

```bash
npm install
npm run dev
```

Then open <http://localhost:3000> in the browser. The home page should render. If the page is blank or the terminal shows red errors, see [`reference/troubleshooting.md`](./reference/troubleshooting.md) → "Browser shows blank page" or "port 3000 already in use".

**Checkpoint:** Page loads, no errors in the browser console (Cmd+Option+J).

### Phase 5 — Branding (ask first)

Ask the user verbatim:

> *"Want to apply your brand now? I just need your logo as an SVG file and one hex color (e.g. `#0070d2`). I'll set the favicon, the header logo, and the primary color across the app. Or skip — you can do this later anytime."*

- **skip** → setup is done. Go to "Wrap up".
- **yes** → ask for the two inputs:
  1. Path to the `logo.svg` (or have the user drag it into the workspace, then ask for the path).
  2. Hex color like `#RRGGBB`.

   Then load [`reference/branding-apply.md`](./reference/branding-apply.md) and apply all three touchpoints. **Do not** invent a logo or pick a color for the user — if either is missing, stop and ask.

**Checkpoint:** After hot reload, the user confirms the favicon, header logo, and at least one brand-color button (e.g. on `/cases/1`) all reflect the new brand.

## Wrap up

Tell the user:

- Setup is done. The starter kit is configured for their environment.
- For day-to-day work, the agent will pull from skills under `.agent/skills/` automatically.
- Two skills they'll likely hit next:
  - **`repo-setup`** — when they want to save their work to a new GitHub repo (see [`.agent/skills/repo-setup/SKILL.md`](../repo-setup/SKILL.md)).
  - **`first-time-deploy`** — when they want to share a live link with a PM or stakeholder (see [`.agent/skills/first-time-deploy/SKILL.md`](../first-time-deploy/SKILL.md)).
- For UI work, the agent will read [`.agent/skills/afv-library/applying-slds/SKILL.md`](../afv-library/applying-slds/SKILL.md) first.

## When to re-run this skill

- The user opens the starter kit on a **new machine** (re-run Phases 0–4; skip branding if already committed).
- A **teammate joins** and clones the repo (same as above).
- The user wants to **change brand** later (jump straight to Phase 5).
