import React, { useMemo, useState } from 'react'
import PageLayout from '../components/layout/PageLayout'
import Icon from '../components/Icon'
import StatusBadge from '../components/ui/StatusBadge'
import { customerInsightsData } from '../data/mainDashboardData'

export default function CustomerInsights({ searchQuery = '' }) {
  const [timePeriod, setTimePeriod] = useState('Week')
  const [growthView, setGrowthView] = useState('Daily')
  const [filterOpen, setFilterOpen] = useState(false)
  const [filterMode, setFilterMode] = useState('Total Spend')
  const [selectedCustomer, setSelectedCustomer] = useState(customerInsightsData.customers[0])

  const filteredCustomers = useMemo(() => {
    const lowered = searchQuery.toLowerCase().trim()
    let rows = lowered
      ? customerInsightsData.customers.filter((customer) => {
          return (
            customer.name.toLowerCase().includes(lowered) ||
            String(customer.orders).includes(lowered) ||
            customer.spent.toLowerCase().includes(lowered)
          )
        })
      : customerInsightsData.customers

    if (filterMode === 'Avg Value') {
      return [...rows].sort((a, b) => Number(b.avgValue.replace(/[^0-9.]/g, '')) - Number(a.avgValue.replace(/[^0-9.]/g, '')))
    }

    if (filterMode === 'Active') {
      return rows.filter((customer) => customer.status === 'Active')
    }

    if (filterMode === 'New') {
      return rows.filter((customer) => customer.status === 'New')
    }

    return [...rows].sort((a, b) => Number(b.spent.replace(/[^0-9.]/g, '')) - Number(a.spent.replace(/[^0-9.]/g, '')))
  }, [searchQuery, filterMode])

  const currentCustomer = selectedCustomer || customerInsightsData.customers[0]

  // Get KPI metrics for current period
  const displayMetrics = customerInsightsData.kpiMetricsByPeriod[timePeriod] || customerInsightsData.kpiMetrics

  // Get growth data for current view
  const growthData = growthView === 'Daily' ? customerInsightsData.customerGrowthDaily : customerInsightsData.customerGrowthWeekly

  const exportCsv = () => {
    const headers = ['Customer', 'Orders', 'Total Spend', 'Avg Value', 'Status']
    const rows = filteredCustomers.map((customer) => [customer.name, customer.orders, customer.spent, customer.avgValue, customer.status])
    const csv = [headers, ...rows].map((row) => row.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'customer-insights.csv'
    link.click()
    URL.revokeObjectURL(link.href)
  }

  const timePeriods = ['Week', 'Month', 'Quarter', 'Year']

  const renderBars = () =>
    growthData.map((point, index) => {
      const newHeight = growthView === 'Daily' ? 20 + point.new * 4 : 15 + point.new * 0.6
      const returningHeight = growthView === 'Daily' ? 36 + point.returning * 1.4 : 30 + point.returning * 0.25
      const isCurrent = growthView === 'Daily' ? index === 6 : index === 3

      return (
        <div key={point.day} className="flex-1 flex flex-col items-center justify-end gap-2 h-full">
          <div className="w-full flex items-end justify-center gap-1 h-full">
            <div className="w-4 rounded-t-2xl bg-[#F8D5CA]" style={{ height: `${newHeight}px` }} />
            <div className={`w-4 rounded-t-2xl ${isCurrent ? 'bg-primary' : 'bg-[#F4C7B7]'}`} style={{ height: `${returningHeight}px` }} />
          </div>
          <span className="text-[9px] font-bold text-on-surface-variant uppercase tracking-wider">{point.day}</span>
        </div>
      )
    })

  return (
    <PageLayout title="Customer Intelligence" subtitle="Deep dive into your customer behavioral patterns.">
      <div className="flex items-center justify-end mb-8">
        <div className="bg-white/80 border border-white rounded-full p-1.5 flex gap-1 shadow-sm">
          {timePeriods.map((period) => (
            <button
              key={period}
              onClick={() => setTimePeriod(period)}
              className={`px-5 py-1.5 rounded-full text-xs font-bold transition-colors ${
                timePeriod === period ? 'bg-primary text-white shadow-md' : 'text-on-surface-variant hover:bg-white'
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
        {displayMetrics.map((metric) => (
          <div key={metric.id} className="bg-white p-6 rounded-2xl flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-white/60">
            <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">{metric.label}</span>
            <div className="mt-4">
              <p className="text-2xl font-extrabold font-headline">{metric.value}</p>
              <div className={`flex items-center gap-1 mt-1.5 ${metric.trendUp ? 'text-primary' : 'text-error'}`}>
                <Icon name={metric.trendUp ? 'trending_up' : 'trending_down'} size={14} />
                <span className="text-[11px] font-bold">{metric.trendUp ? '+' : ''}{metric.trend}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-8 mb-8 mt-12">
        <div className="col-span-12 lg:col-span-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.02)] border border-white/60 relative z-10">
              <div className="flex justify-between items-start mb-8">
                <h3 className="font-extrabold font-headline text-lg">Customer Growth</h3>
                <div className="bg-surface-container rounded-full p-1 flex">
                  {['Daily', 'Weekly'].map((view) => (
                    <button
                      key={view}
                      onClick={() => setGrowthView(view)}
                      className={`px-3 py-1 text-[10px] font-bold rounded-full ${growthView === view ? 'bg-white shadow-sm' : 'text-on-surface-variant'}`}
                    >
                      {view}
                    </button>
                  ))}
                </div>
              </div>
              <div className="h-48 flex items-end justify-between gap-2 mt-4 px-2">
                {renderBars()}
              </div>
              <div className="flex justify-center gap-6 mt-8">
                <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 bg-[#F8D5CA] rounded-full" /><span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">New</span></div>
                <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 bg-primary rounded-full" /><span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Returning</span></div>
              </div>
            </div>

            <div className="p-8 rounded-3xl shadow-[0_20px_50px_rgba(255,78,29,0.25)] text-white relative overflow-hidden flex flex-col justify-between bg-primary">
              <div className="absolute top-[-20px] right-[-20px] w-48 h-48 bg-white/20 rounded-full blur-3xl" />
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <Icon name="auto_awesome" size={24} />
                  <h3 className="font-extrabold font-headline text-xl">AI Insights</h3>
                </div>
                <ul className="space-y-6">
                  {customerInsightsData.aiInsights.map((insight) => (
                    <li key={insight} className="flex gap-4 text-sm leading-relaxed">
                      <Icon name="verified" size={18} className="text-white/80 flex-shrink-0 mt-0.5" />
                      <p>{insight}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <button className="mt-8 bg-white text-primary py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-opacity-90 transition-all shadow-lg">
                View Recommendations
              </button>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.02)] border border-white/60 overflow-hidden">
            <div className="p-8 flex items-center justify-between border-b border-surface-container">
              <h3 className="font-extrabold font-headline text-lg">Detailed Breakdown</h3>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <button
                    onClick={() => setFilterOpen((open) => !open)}
                    className="bg-surface-container px-5 py-2.5 rounded-full flex items-center gap-2 hover:bg-surface-container-high transition-colors"
                  >
                    <Icon name="tune" size={18} />
                    <span className="text-xs font-bold uppercase tracking-wider">Filter</span>
                    <Icon name="expand_more" size={16} />
                  </button>
                  {filterOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-surface-container z-50 overflow-hidden">
                      <div className="py-2">
                        {['Total Spend', 'Avg Value', 'Active', 'New'].map((option) => (
                          <button
                            key={option}
                            onClick={() => {
                              setFilterMode(option)
                              setFilterOpen(false)
                            }}
                            className={`w-full text-left px-5 py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-surface-container transition-colors ${filterMode === option ? 'text-primary' : 'text-on-surface-variant'}`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <button onClick={exportCsv} className="bg-surface-container px-5 py-2.5 rounded-full flex items-center gap-2 hover:bg-surface-container-high transition-colors">
                  <Icon name="download" size={18} />
                  <span className="text-xs font-bold uppercase tracking-wider">Export</span>
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-surface-container/30 text-[10px] font-extrabold uppercase tracking-widest text-on-surface-variant">
                  <tr>
                    <th className="px-8 py-5">Customer</th>
                    <th className="px-8 py-5">Orders</th>
                    <th className="px-8 py-5">Total Spend (₹)</th>
                    <th className="px-8 py-5">Avg Value</th>
                    <th className="px-8 py-5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-container">
                  {filteredCustomers.map((customer) => (
                    <tr
                      key={customer.id}
                      onClick={() => setSelectedCustomer(customer)}
                      className={`hover:bg-surface-container/20 transition-colors cursor-pointer ${selectedCustomer?.id === customer.id ? 'bg-surface-container/20' : ''}`}
                    >
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-extrabold ${customer.initials === 'AS' ? 'bg-primary/10 text-primary' : customer.initials === 'PI' ? 'bg-secondary-container text-on-surface-variant' : customer.initials === 'VS' ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'}`}>
                            {customer.initials}
                          </div>
                          <span className="text-sm font-bold text-on-surface">{customer.name}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-sm font-medium">{customer.orders}</td>
                      <td className="px-8 py-6 text-sm font-bold text-primary">{customer.spent}</td>
                      <td className="px-8 py-6 text-sm font-medium text-on-surface-variant">{customer.avgValue}</td>
                      <td className="px-8 py-6"><StatusBadge status={customer.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4 space-y-8">
          <div className="bg-white p-8 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-white sticky top-24">
            <div className="flex flex-col items-center text-center pb-8 border-b border-surface-container">
              <div className="relative mb-6">
                <div className="w-28 h-28 rounded-3xl bg-primary/5 flex items-center justify-center text-4xl font-extrabold text-primary ring-4 ring-white shadow-xl">
                  {currentCustomer.initials}
                </div>
              </div>
              <h4 className="text-2xl font-extrabold font-headline text-on-surface">{currentCustomer.name}</h4>
              <div className="mt-4 flex flex-wrap justify-center gap-2" />
            </div>
            <div className="py-8 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-surface-container/30 p-4 rounded-2xl">
                  <p className="text-[10px] font-extrabold text-on-surface-variant uppercase tracking-widest">Life Orders</p>
                  <p className="text-2xl font-extrabold font-headline mt-1">{currentCustomer.lifeOrders}</p>
                </div>
                <div className="bg-primary/5 p-4 rounded-2xl">
                  <p className="text-[10px] font-extrabold text-primary uppercase tracking-widest">Life Spend</p>
                  <p className="text-2xl font-extrabold font-headline text-primary mt-1 whitespace-nowrap">{currentCustomer.lifeSpend}</p>
                </div>
              </div>
              <div>
                <p className="text-[10px] font-extrabold text-on-surface-variant uppercase tracking-widest mb-2">Last Engagement</p>
                <div className="flex items-center gap-3 p-3 bg-surface-container/20 rounded-xl border border-surface-container">
                  <Icon name="schedule" size={18} className="text-primary" />
                  <span className="text-sm font-bold text-on-surface">{currentCustomer.lastEngagement}</span>
                </div>
              </div>
            </div>
            <div className="bg-secondary-container/50 p-6 rounded-3xl border border-white/60 relative">
              <div className="absolute top-4 right-4"><Icon name="lightbulb" size={32} className="text-primary/30" /></div>
              <div className="flex items-center gap-2 mb-4 text-primary">
                <Icon name="psychology" size={18} />
                <span className="text-[10px] font-extrabold uppercase tracking-widest">AI Insights</span>
              </div>
              <p className="text-xs text-on-surface font-medium leading-relaxed">
                {customerInsightsData.aiInsights[0]}
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
