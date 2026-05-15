import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import Card from '../ui/Card'

export default function GrowthChart({ data = [], title = 'Growth Chart', series = [] }) {
  // Default series config if not provided
  const defaultSeries = [
    { dataKey: 'new', name: 'New', fill: '#ff8c42', stackId: 'a' },
    { dataKey: 'returning', name: 'Returning', fill: '#ff4d21', stackId: 'a' },
  ]

  const finalSeries = series.length > 0 ? series : defaultSeries

  return (
    <Card title={title}>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="day" stroke="#5d3f38" />
          <YAxis stroke="#5d3f38" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fdf6f2',
              border: '1px solid #e0d5ce',
              borderRadius: '8px',
            }}
          />
          <Legend />
          {finalSeries.map((series) => (
            <Bar
              key={series.dataKey}
              dataKey={series.dataKey}
              name={series.name}
              fill={series.fill}
              stackId={series.stackId}
              radius={[8, 8, 0, 0]}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
}
