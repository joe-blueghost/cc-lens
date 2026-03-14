export type ToolCategory =
  | 'file-io'
  | 'shell'
  | 'agent'
  | 'web'
  | 'planning'
  | 'todo'
  | 'skill'
  | 'mcp'
  | 'other'

export const TOOL_CATEGORIES: Record<string, ToolCategory> = {
  Read:           'file-io',
  Write:          'file-io',
  Edit:           'file-io',
  Glob:           'file-io',
  Grep:           'file-io',
  NotebookEdit:   'file-io',

  Bash:           'shell',

  Task:           'agent',
  TaskCreate:     'agent',
  TaskUpdate:     'agent',
  TaskList:       'agent',
  TaskOutput:     'agent',
  TaskStop:       'agent',
  TaskGet:        'agent',

  WebSearch:      'web',
  WebFetch:       'web',

  EnterPlanMode:  'planning',
  ExitPlanMode:   'planning',
  AskUserQuestion:'planning',

  TodoWrite:      'todo',

  Skill:          'skill',
  ToolSearch:     'skill',
  ListMcpResourcesTool: 'skill',
  ReadMcpResourceTool:  'skill',
}

export const CATEGORY_COLORS: Record<ToolCategory, string> = {
  'file-io':  '#60a5fa',   // blue
  'shell':    '#d97706',   // orange
  'agent':    '#a78bfa',   // purple
  'web':      '#22c55e',   // green
  'planning': '#fbbf24',   // amber
  'todo':     '#fb923c',   // orange-light
  'skill':    '#38bdf8',   // sky
  'mcp':      '#34d399',   // emerald
  'other':    '#6b7280',   // gray
}

export const CATEGORY_LABELS: Record<ToolCategory, string> = {
  'file-io':  'File I/O',
  'shell':    'Shell',
  'agent':    'Agents',
  'web':      'Web',
  'planning': 'Planning',
  'todo':     'Todo',
  'skill':    'Skills',
  'mcp':      'MCP',
  'other':    'Other',
}

export function categorizeTool(name: string): ToolCategory {
  if (name.startsWith('mcp__')) return 'mcp'
  return TOOL_CATEGORIES[name] ?? 'other'
}

export function isMcpTool(name: string): boolean {
  return name.startsWith('mcp__')
}

export function parseMcpTool(name: string): { server: string; tool: string } | null {
  if (!name.startsWith('mcp__')) return null
  const parts = name.split('__')
  if (parts.length < 3) return null
  return {
    server: parts[1],
    tool:   parts.slice(2).join('__'),
  }
}

export function toolDisplayName(name: string): string {
  const mcp = parseMcpTool(name)
  if (mcp) return `${mcp.server} · ${mcp.tool}`
  return name
}

export const TOOL_ICONS: Record<ToolCategory, string> = {
  'file-io':  '📄',
  'shell':    '⚡',
  'agent':    '🤖',
  'web':      '🌐',
  'planning': '📋',
  'todo':     '✅',
  'skill':    '🎯',
  'mcp':      '🔌',
  'other':    '🔧',
}
