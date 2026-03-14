'use client'

import { useMemo } from 'react'
import { parseISO, format, startOfWeek, addDays, differenceInCalendarWeeks, eachWeekOfInterval } from 'date-fns'
import type { DailyActivity } from '@/types/claude'

interface Props {
  data: DailyActivity[]
}

const SHADES = ['#1e2128', '#1e3a2f', '#16a34a', '#22c55e', '#86efac']

function getShade(count: number, max: number): string {
  if (count === 0) return SHADES[0]
  const ratio = count / max
  if (ratio < 0.2) return SHADES[1]
  if (ratio < 0.4) return SHADES[2]
  if (ratio < 0.7) return SHADES[3]
  return SHADES[4]
}

const DAYS = ['', 'Mon', '', 'Wed', '', 'Fri', '']

export function ActivityHeatmap({ data }: Props) {
  const { weeks, maxCount, countMap } = useMemo(() => {
    const countMap = new Map<string, number>()
    let maxCount = 0
    for (const d of data) {
      countMap.set(d.date, d.messageCount)
      if (d.messageCount > maxCount) maxCount = d.messageCount
    }

    const today = new Date()
    const startDate = startOfWeek(addDays(today, -52 * 7), { weekStartsOn: 0 })
    const endDate = today

    const weekStarts = eachWeekOfInterval({ start: startDate, end: endDate }, { weekStartsOn: 0 })
    const weeks = weekStarts.map(weekStart =>
      Array.from({ length: 7 }, (_, i) => {
        const d = addDays(weekStart, i)
        const dateStr = format(d, 'yyyy-MM-dd')
        return { date: d, dateStr, count: countMap.get(dateStr) ?? 0 }
      })
    )

    return { weeks, maxCount, countMap }
  }, [data])

  return (
    <div className="overflow-x-auto">
      <div className="flex gap-0.5 min-w-max">
        {/* Day labels */}
        <div className="flex flex-col gap-0.5 mr-1">
          {DAYS.map((label, i) => (
            <div key={i} className="h-3 text-[8px] text-muted-foreground/50 flex items-center w-6">
              {label}
            </div>
          ))}
        </div>

        {/* Week columns */}
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-0.5">
            {/* Month label on 1st of month */}
            {week[0].date.getDate() <= 7 && (
              <div className="h-3 text-[8px] text-muted-foreground/40 whitespace-nowrap">
                {format(week[0].date, 'MMM')}
              </div>
            )}
            {week[0].date.getDate() > 7 && (
              <div className="h-3" />
            )}
            {week.map((day, di) => (
              <div
                key={di}
                className="w-3 h-3 rounded-sm cursor-default"
                style={{ backgroundColor: getShade(day.count, maxCount || 1) }}
                title={`${day.dateStr}: ${day.count} messages`}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-1 mt-2">
        <span className="text-[13px] text-muted-foreground/40">less</span>
        {SHADES.map((s, i) => (
          <div key={i} className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: s }} />
        ))}
        <span className="text-[13px] text-muted-foreground/40">more</span>
      </div>
    </div>
  )
}
