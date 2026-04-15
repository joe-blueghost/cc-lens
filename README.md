![demo](./public/image.png)

# Claude Code Lens (cc-lens)

A real-time monitoring dashboard for **Claude Code** analytics. Reads directly from `~/.claude/`, no cloud, no telemetry, just your local data.

## Quick Start

![cc-board CLI](./public/cc-lens.png)

Run with a single command — no install needed:

```bash
npx cc-lens
```

That's it. The CLI finds a free port, starts the server, and opens the dashboard in your browser automatically.

## Features

- **Overview**: Token usage over time, project activity distribution, peak hours heatmap, model breakdown donut, recent conversations
- **Projects**: Card grid with sessions, cost per session, most-used tools, languages, git branches; per-project detail page with cost chart
- **Sessions**: Sortable table with search and filters (compacted ⚡, agent 🤖, MCP 🔌, web 🔍, thinking 🧠); full session replay with per-turn token display, compaction events, token timeline chart
- **Costs**: Stacked area chart by model, cost by project bar chart, per-model breakdown table, cache efficiency panel, static pricing reference
- **Tools**: Tool ranking by category (file-io, shell, agent, web, planning, todo, skill, mcp), MCP server details, feature adoption table, CC version history, git branch chart
- **Activity**: GitHub-style heatmap, streaks, day-of-week patterns, 24h peak hours bar
- **History**: Searchable, paginated view of `~/.claude/history.jsonl` command history with timestamps and project context
- **Memory**: Browse and edit Claude Code memory files across all projects, filterable by type (user, feedback, project, reference, index), stale detection
- **Todos**: View todo lists from `~/.claude/todos/` with status filters (pending, in_progress, completed) and priority badges
- **Plans**: Read saved plan files from `~/.claude/plans/` with inline markdown rendering
- **Settings**: Inspect `~/.claude/settings.json` including installed skills and plugins
- **Export**: Download `.ccboard.json` or `.zip` with full JSONL; import with additive merge preview
- **Global Search** (`⌘K` / `Ctrl+K` or `/`): Command palette to search across pages, sessions, projects, plans, and memory entries instantly
- **Keyboard Navigation**: `j`/`k` to move through the sessions list, `Enter` to open, `Esc` to clear; `g`+letter shortcuts to jump to any page (`g s` → sessions, `g p` → projects, `g c` → costs, etc.)

## Multiple Profiles

If you manage separate personal and work Claude Code configurations, use the `CLAUDE_CONFIG_DIR` environment variable to point cc-lens at any directory:

```bash
# Personal (default — reads ~/.claude/)
npx cc-lens

# Work profile
CLAUDE_CONFIG_DIR=~/.claude-work npx cc-lens
```

On Windows (PowerShell):

```powershell
$env:CLAUDE_CONFIG_DIR="C:\Users\you\.claude-work"; npx cc-lens
```

The active config directory is shown in the CLI banner on every launch so you always know which profile is being read.

## Manual Setup

If you prefer to run it locally from source:

### Prerequisites

- Node.js 18+
- Claude Code with local data in `~/.claude/`

### Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (or the port shown in the terminal).

### Build

```bash
npm run build
npm start
```

## Data Source

- `~/.claude/projects/<slug>/*.jsonl`: Session JSONL (primary)
- `~/.claude/stats-cache.json`: Aggregated stats
- `~/.claude/usage-data/session-meta/`: Session metadata (fallback)
- `~/.claude/history.jsonl`: Command history
- `~/.claude/todos/`: Todo files
- `~/.claude/plans/`: Plan files
- `~/.claude/memory/`: Memory files (per-project)
- `~/.claude/settings.json`: Settings, skills, plugins

Data refreshes every 5 seconds while the dashboard is open.

## Star History

<a href="https://www.star-history.com/?repos=Arindam200%2Fcc-lens&type=date&legend=top-left">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/chart?repos=Arindam200/cc-lens&type=date&theme=dark&legend=top-left" />
   <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/chart?repos=Arindam200/cc-lens&type=date&legend=top-left" />
   <img alt="Star History Chart" src="https://api.star-history.com/chart?repos=Arindam200/cc-lens&type=date&legend=top-left" />
 </picture>
</a>