'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

interface Props {
  hourCounts: Record<string, number>
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  const hour = parseInt(label)
  const period = hour < 12 ? 'AM' : 'PM'
  const h12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour
  return (
    <div className="bg-[#1a1d26] border border-[#262a36] rounded-lg px-3 py-2 text-[13px]">
      <p className="text-[#94a3b8]">{h12}:00 {period}</p>
      <p className="text-[#fbbf24] font-bold">{payload[0].value} sessions</p>
    </div>
  )
}

export function PeakHoursChart({ hourCounts }: Props) {
  const data = Array.from({ length: 24 }, (_, i) => ({
    hour: String(i),
    count: hourCounts[String(i)] ?? 0,
  }))

  return (
    <div>
      <ResponsiveContainer width="100%" height={160}>
        <BarChart data={data} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e2230" vertical={false} />
          <XAxis
            dataKey="hour"
            tick={{ fontSize: 11, fill: '#7a8494' }}
            tickLine={false}
            axisLine={false}
            tickFormatter={v => {
              const h = parseInt(v)
              if (h === 0) return '12a'
              if (h === 12) return '12p'
              if (h < 12) return `${h}a`
              return `${h - 12}p`
            }}
          />
          <YAxis hide />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(180,83,9,0.08)' }} />
          <Bar dataKey="count" radius={[2, 2, 0, 0]} maxBarSize={14} fill="#b45309" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
