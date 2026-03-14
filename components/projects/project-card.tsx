'use client'

import Link from 'next/link'
import { formatCost, formatDuration, formatRelativeDate } from '@/lib/decode'
import { CATEGORY_COLORS, categorizeTool } from '@/lib/tool-categories'
import type { ProjectSummary } from '@/types/claude'

interface Props {
  project: ProjectSummary
}

export function ProjectCard({ project }: Props) {
  const topTools = Object.entries(project.tool_counts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
  const maxToolCount = topTools[0]?.[1] ?? 1

  const topLangs = Object.entries(project.languages)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="block border border-border rounded-lg bg-card p-4 hover:border-[#d97706]/40 transition-colors group"
    >
      <div className="flex items-start justify-between gap-2 mb-1">
        <h3 className="text-sm font-bold text-foreground group-hover:text-[#d97706] transition-colors truncate">
          {project.display_name}
        </h3>
        <span className="text-[12px] text-muted-foreground/60 whitespace-nowrap flex-shrink-0">
          {formatRelativeDate(project.last_active)}
        </span>
      </div>

      <p className="text-[12px] text-muted-foreground/50 font-mono truncate mb-2">
        {project.project_path}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-3 text-[12px]">
        {topLangs.map(([lang]) => (
          <span key={lang} className="px-1.5 py-0.5 rounded bg-[#141620] text-muted-foreground border border-border/50">
            {lang}
          </span>
        ))}
        {project.uses_mcp && (
          <span className="px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[12px]">
            🔌 mcp
          </span>
        )}
        {project.uses_task_agent && (
          <span className="px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20 text-[12px]">
            🤖 agent
          </span>
        )}
      </div>

      <div className="flex flex-wrap gap-3 text-[12px] text-muted-foreground mb-3">
        <span>{project.session_count} sessions</span>
        <span>·</span>
        <span>{project.total_messages.toLocaleString()} msgs</span>
        <span>·</span>
        <span>{formatDuration(project.total_duration_minutes)}</span>
        {(project.total_lines_added ?? 0) > 0 && (
          <>
            <span>·</span>
            <span className="text-green-400">+{project.total_lines_added.toLocaleString()}</span>
            <span className="text-red-400">-{project.total_lines_removed.toLocaleString()}</span>
          </>
        )}
      </div>

      {/* Mini tool bar */}
      {topTools.length > 0 && (
        <div className="space-y-0.5">
          {topTools.map(([tool, count]) => {
            const cat = categorizeTool(tool)
            const color = CATEGORY_COLORS[cat]
            const width = Math.max(8, Math.round((count / maxToolCount) * 100))
            return (
              <div key={tool} className="flex items-center gap-1.5 text-[11px]">
                <span className="text-muted-foreground/50 w-16 truncate">{tool}</span>
                <div className="flex-1 h-1 bg-[#141620] rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${width}%`, backgroundColor: color + '80' }} />
                </div>
                <span className="text-muted-foreground/40 w-8 text-right">{count}</span>
              </div>
            )
          })}
        </div>
      )}

      {/* Branches */}
      {project.branches.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2 pt-2 border-t border-border/30">
          {project.branches.slice(0, 4).map(b => (
            <span key={b} className="text-[11px] px-1 py-0.5 rounded bg-[#141620] text-muted-foreground/50 border border-border/30">
              {b}
            </span>
          ))}
        </div>
      )}

      <div className="mt-3 pt-2 border-t border-border/30 flex items-center justify-between">
        <span className="text-[12px] text-muted-foreground/50">est. cost</span>
        <span className="text-[12px] font-bold text-[#d97706]">{formatCost(project.estimated_cost)}</span>
      </div>
    </Link>
  )
}
