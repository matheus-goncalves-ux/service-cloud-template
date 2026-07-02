# Figma MCP setup (optional)

Configure Figma's Dev Mode MCP server so the agent can read Figma frames you paste into Copilot Chat. **Useful for designers** (or anyone working closely with one). Skip this entirely if you don't use Figma — the rest of the starter kit works without it.

## Prerequisites

- A Figma account on the **Figma OSF** (Salesforce-internal) tenant.
- **Figma desktop app** installed (the MCP server runs there, not in the web app).
- A paid Figma plan that includes **Dev Mode** (Professional / Organization / Enterprise). The MCP feature lives behind Dev Mode.

## Steps

### 1. Install Figma desktop and sign in

Download from <https://www.figma.com/downloads/> and sign in with your Figma OSF account.

### 2. Enable the Dev Mode MCP server in Figma

Open Figma desktop → menu **Figma → Preferences → Enable Dev Mode MCP Server**. A small panel will appear showing `Server status: Enabled` and `Image source: Local server`.

Reference: <https://github.com/figma/mcp-server-guide>.

### 3. Tell VS Code about the Figma MCP server

VS Code reads MCP servers from `mcp.json` (workspace) or your user-level MCP config. This starter kit already ships an `mcp.json` for the Salesforce DX server — extend it with Figma:

Open the workspace `mcp.json` and add a `figma` entry under `mcpServers`. The Figma desktop app exposes the server at `http://127.0.0.1:3845/mcp` by default. Use the SSE/HTTP transport supported by your VS Code Copilot version (the exact JSON schema is documented in <https://github.com/figma/mcp-server-guide>; copy the snippet from there to avoid drift if the schema changes).

### 4. Validate from VS Code

1. **Cmd+Shift+P** → `MCP: List Servers`.
2. You should see **Figma** in the list with a green dot.
3. Select **Figma → Start** (or **Run**) if it's not already running.

### 5. Smoke test in Copilot Chat

In Copilot Chat (agent mode), paste a Figma frame URL like:

```
https://www.figma.com/design/<fileKey>/<fileName>?node-id=1-2
```

Ask: *"Describe the layout of this Figma node."* If the agent returns a structured description (not "I can't access that URL"), the MCP is working.

## Troubleshooting

- **`MCP: List Servers` doesn't show Figma** → restart VS Code; the `mcp.json` is only re-read on window load.
- **Server shows red dot / "failed to start"** → confirm Figma desktop is open and Dev Mode MCP is still toggled on (the toggle resets on some Figma updates).
- **Agent says "I can't fetch that URL"** → the Figma file/node must be in a workspace your signed-in Figma account can access. Open the URL in Figma desktop first to confirm access.
- **Wrong account** → in the agent, ask: *"Who am I signed in as on Figma?"* The MCP exposes a `whoami` tool that returns your account info; switch accounts in Figma desktop if it's wrong.

## Skip / remove later

To disable: toggle off **Dev Mode MCP Server** in Figma Preferences, and either remove the `figma` entry from `mcp.json` or leave it (the agent silently ignores offline MCPs).
