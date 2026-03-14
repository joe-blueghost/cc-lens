'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { formatTokens, formatRelativeDate, projectDisplayName } from '@/lib/decode'
import type { SessionWithFacet } from '@/types/claude'

type FilterType = 'active' | 'recent' | 'inactive' | 'all'

interface Props {
  sessions: SessionWithFacet[]
}

function shortId(id: string): string {
  return id.slice(0, 8) + '...'
}

function shortModel(): string {
  return 'claude-sonnet-4-...'
}

export function OverviewConversationTable({ sessions }: Props) {
  const [filter, setFilter] = useState<FilterType>('recent')

  const filtered = useMemo(() => {
    const now = Date.now()
    const oneDay = 24 * 60 * 60 * 1000
    const oneWeek = 7 * oneDay

    let result: SessionWithFacet[]
    switch (filter) {
      case 'active':
        result = sessions.filter((s) => {
          const t = new Date(s.start_time).getTime()
          return now - t < oneDay
        })
        break
      case 'recent':
        result = sessions.filter((s) => {
          const t = new Date(s.start_time).getTime()
          return now - t < oneWeek
        })
        break
      case 'inactive':
        result = sessions.filter((s) => {
          const t = new Date(s.start_time).getTime()
          return now - t >= oneWeek
        })
        break
      default:
        result = sessions
    }
    return result.sort(
      (a, b) => new Date(b.start_time).getTime() - new Date(a.start_time).getTime()
    )
  }, [sessions, filter])

  const displaySessions = filtered.slice(0, 10)

  const FilterButton = ({ value, label }: { value: FilterType; label: string }) => (
    <button
      onClick={() => setFilter(value)}
      className={[
        'px-3 py-1.5 text-[13px] font-mono rounded border transition-colors',
        filter === value
          ? 'bg-[#d97706] text-[#0f1117] border-[#d97706] font-bold'
          : 'bg-transparent text-[#7a8494] border-[#262a36] hover:text-[#e8eaed] hover:border-[#363b4a]',
      ].join(' ')}
    >
      {label}
    </button>
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <FilterButton value="active" label="active" />
        <FilterButton value="recent" label="recent" />
        <FilterButton value="inactive" label="inactive" />
        <FilterButton value="all" label="all" />
      </div>

      <div className="border border-[#262a36] rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-[#262a36] bg-[#141620]">
                <th className="px-3 py-2.5 text-left text-[12px] font-bold uppercase tracking-wider text-[#7a8494]">
                  conversation id
                </th>
                <th className="px-3 py-2.5 text-left text-[12px] font-bold uppercase tracking-wider text-[#7a8494]">
                  project
                </th>
                <th className="px-3 py-2.5 text-left text-[12px] font-bold uppercase tracking-wider text-[#7a8494]">
                  model
                </th>
                <th className="px-3 py-2.5 text-right text-[12px] font-bold uppercase tracking-wider text-[#7a8494]">
                  messages
                </th>
                <th className="px-3 py-2.5 text-right text-[12px] font-bold uppercase tracking-wider text-[#7a8494]">
                  tokens
                </th>
                <th className="px-3 py-2.5 text-left text-[12px] font-bold uppercase tracking-wider text-[#7a8494]">
                  last activity
                </th>
                <th className="px-3 py-2.5 text-left text-[12px] font-bold uppercase tracking-wider text-[#7a8494]">
                  conversation state
                </th>
                <th className="px-3 py-2.5 text-left text-[12px] font-bold uppercase tracking-wider text-[#7a8494]">
                  status
                </th>
              </tr>
            </thead>
            <tbody>
              {displaySessions.map((s, i) => {
                const totalMsgs = (s.user_message_count ?? 0) + (s.assistant_message_count ?? 0)
                const totalTokens = (s.input_tokens ?? 0) + (s.output_tokens ?? 0)
                const projectName = projectDisplayName(s.project_path ?? '')
                const isRecent = Date.now() - new Date(s.start_time).getTime() < 24 * 60 * 60 * 1000
                const status = isRecent ? 'active' : 'inactive'

                return (
                  <tr
                    key={s.session_id}
                    className={`border-b border-[#1e2230]/60 hover:bg-[#1a1d26] transition-colors ${
                      i % 2 === 0 ? '' : 'bg-[#12141b]'
                    }`}
                  >
                    <td className="px-3 py-2 font-mono text-[#94a3b8] whitespace-nowrap">
                      <span className="inline-flex items-center gap-1.5">
                        <span
                          className="inline-block w-2 h-2 rounded-sm shrink-0 bg-[#d97706]/50"
                          title={s.session_id}
                        />
                        <Link
                          href={`/sessions/${s.session_id}`}
                          className="hover:text-[#34d399] transition-colors"
                        >
                          {shortId(s.session_id)}
                        </Link>
                      </span>
                    </td>
                    <td className="px-3 py-2">
                      <Link
                        href={`/sessions/${s.session_id}`}
                        className="text-[#e8eaed] hover:text-[#fbbf24] transition-colors font-medium"
                      >
                        {projectName}
                      </Link>
                    </td>
                    <td className="px-3 py-2 text-[#94a3b8] font-mono">{shortModel()}</td>
                    <td className="px-3 py-2 text-right text-[#94a3b8]">
                      {totalMsgs.toLocaleString()}
                    </td>
                    <td className="px-3 py-2 text-right font-mono text-[#d97706]">
                      {formatTokens(totalTokens)}
                    </td>
                    <td className="px-3 py-2 text-[#94a3b8]">
                      {formatRelativeDate(s.start_time) === 'just now' ? 'now' : formatRelativeDate(s.start_time)}
                    </td>
                    <td className="px-3 py-2 text-[#94a3b8]">Completed</td>
                    <td className="px-3 py-2">
                      <span
                        className={
                          status === 'active'
                            ? 'text-[#34d399] font-medium'
                            : 'text-[#5a6474]'
                        }
                      >
                        {status}
                      </span>
                    </td>
                  </tr>
                )
              })}
              {displaySessions.length === 0 && (
                <tr>
                  <td
                    colSpan={8}
                    className="px-3 py-8 text-center text-[#5a6474] text-[13px]"
                  >
                    No conversations match filter
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
