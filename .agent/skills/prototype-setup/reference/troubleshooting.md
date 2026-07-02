# Troubleshooting — first-time setup

Common issues that block first-time setup of the starter kit, and how to fix them. Check from top to bottom.

## Copilot Chat doesn't respond / no agent mode

- **Cause:** Copilot extension not installed or not signed in.
- **Fix:** Install the **GitHub Copilot** and **GitHub Copilot Chat** extensions from the VS Code Marketplace. Sign in via **Cmd+Shift+P → GitHub Copilot: Sign In**. Use your Salesforce OSF account.
- **Verify:** The Copilot icon in the status bar (bottom right) shows no warning badge. Run **Cmd+Shift+P → GitHub Copilot: Check Status**.

## "Auto-approve" still asks for confirmation on every command

- **Cause:** `.vscode/settings.json` not loaded (file missing, JSON invalid, or wrong location).
- **Fix:**
  1. Confirm the file exists: `ls -la .vscode/settings.json`.
  2. Open it and check there are no trailing commas or unescaped slashes in the regex keys (JSONC tolerates comments but not malformed JSON).
  3. **Cmd+Shift+P → Developer: Reload Window** so VS Code re-reads workspace settings.
- **Verify:** Ask the agent to run a benign command like `ls -la`. It should run without a confirmation prompt.

## Model picker doesn't show recent Claude versions

- **Cause:** Copilot extension outdated, or the org hasn't enabled that model.
- **Fix:** Update the **GitHub Copilot Chat** extension to the latest version. If a Claude model is still missing, check with your OSF admin — model availability is controlled at the org level.

## `npm install` fails

- **Cause (most common):** Node version too old, or registry auth issue.
- **Fix:**
  1. `node -v` — needs **Node 20+** (the template's `package.json` declares `"engines": { "node": ">=20" }`).
  2. If older: `brew install node` or use `nvm install 20 && nvm use 20`.
  3. Retry: `rm -rf node_modules package-lock.json && npm install`.
- **Other:** If the install hangs on a specific package, run with verbose output: `npm install --verbose` and share the failing package name with the user.

## `npm run dev` — port 3000 already in use

- **Cause:** Another process is holding port 3000.
- **Fix:**
  ```bash
  lsof -i :3000        # see what's using it
  kill -9 <PID>        # free the port
  ```
  Then re-run `npm run dev`.

## Browser shows blank page / "Cannot GET /"

- **Cause:** Dev server didn't finish starting, or icon prebuild failed silently.
- **Fix:**
  1. Check the terminal where `npm run dev` is running — look for `[vite] ✓ ready` and any red error.
  2. If you see icon prebuild errors, run `npm run prebuild` (or the script under `scripts/prebuild-icons.mjs`) and then `npm run dev` again.
  3. Hard refresh the browser (Cmd+Shift+R) to bypass cache.

## Figma MCP shows red dot / "failed to start"

- **Cause:** Figma desktop app not running, or Dev Mode MCP toggle is off.
- **Fix:**
  1. Open Figma desktop (not the browser version).
  2. **Figma → Preferences → Enable Dev Mode MCP Server** — must show `Server status: Enabled`.
  3. In VS Code: **Cmd+Shift+P → MCP: List Servers → Figma → Start** (or **Restart**).
- See [`figma-mcp-setup.md`](./figma-mcp-setup.md) for the full setup flow.

## Brand color isn't applied after editing `global.css`

- **Cause:** Wrong selector or token name typo.
- **Fix:**
  1. Confirm the block is in `:root { ... }` (not nested inside another selector).
  2. Confirm token names start with `--slds-g-color-accent-` (six total, see [`branding-apply.md`](./branding-apply.md)).
  3. Open DevTools → Inspect a `<lightning-button variant="brand">` → check Computed → `background-color` should resolve to your hex.
- If the SLDS theme is overriding, see [`branding-apply.md`](./branding-apply.md) for the exact pattern this repo already uses (`.c-portal_*` blocks).

## Header logo didn't change

- **Cause:** Edited only `index.html` (favicon) but not `globalHeader.html`.
- **Fix:** See step 3 in [`branding-apply.md`](./branding-apply.md) — the header still renders a `<lightning-icon>` until you replace it with the `<img>`.

## Still stuck

Open `.agent/skills/prototype-setup/SKILL.md` and re-read the relevant phase. If a step is unclear, ask the user to share the error message verbatim — don't guess.
