import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import Card from '../ui/Card'

export default function RevenueChart({ data = [], period = 'Weekly', title = 'Revenue Trend' }) {
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
            formatter={(value) => `₹${value.toLocaleString()}`}
          />
          <Legend />
          <Bar dataKey="revenue" fill="#ff4d21" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
}
