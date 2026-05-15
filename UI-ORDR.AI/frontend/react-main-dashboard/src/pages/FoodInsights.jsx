import React, { useMemo, useState } from 'react'
import PageLayout from '../components/layout/PageLayout'
import Icon from '../components/Icon'
import { foodInsightsData } from '../data/mainDashboardData'

export default function FoodInsights({ searchQuery = '' }) {
  const [timePeriod, setTimePeriod] = useState('Week')
  const [filterOpen, setFilterOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [customRangeOpen, setCustomRangeOpen] = useState(false)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const filteredMenuItems = useMemo(() => {
    let items = foodInsightsData.menuPerformance
    const lowered = searchQuery.toLowerCase().trim()

    if (selectedCategory !== 'All') {
      items = items.filter((item) => item.category === selectedCategory)
    }

    if (lowered) {
      items = items.filter((item) => item.name.toLowerCase().includes(lowered) || item.category.toLowerCase().includes(lowered))
    }

    return items
  }, [searchQuery, selectedCategory])

  const categories = ['All', 'Appetizers', 'Main Course', 'Breakfast', 'Beverage']
  const topPerformers = foodInsightsData.topItems
  const chartSeries = foodInsightsData.itemGrowth

  // Get KPI metrics based on selected period
  const displayMetrics = useMemo(() => {
    if (timePeriod === 'Custom Range') {
      return foodInsightsData.kpiMetrics
    }
    return foodInsightsData.kpiMetricsByPeriod[timePeriod] || foodInsightsData.kpiMetrics
  }, [timePeriod])

  const customRangeLabel = startDate && endDate
    ? `${new Date(startDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })} - ${new Date(endDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}`
    : 'Custom Range'

  const handlePeriodChange = (period) => {
    if (period === 'Custom Range') {
      setTimePeriod('Custom Range')
      setCustomRangeOpen(true)
      return
    }

    setTimePeriod(period)
    setCustomRangeOpen(false)
  }

  const applyCustomRange = () => {
    if (!startDate || !endDate) return
    if (startDate > endDate) return
    setTimePeriod('Custom Range')
    setCustomRangeOpen(false)
  }

  const clearCustomRange = () => {
    setStartDate('')
    setEndDate('')
    setCustomRangeOpen(false)
    setTimePeriod('Week')
  }

  const exportReport = () => {
    const csv = ['Item,Category,Orders,Revenue,Rating,Status', ...filteredMenuItems.map((item) => [item.name, item.category, item.orders, item.revenue, item.rating, item.status].join(','))].join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'food-insights.csv'
    link.click()
    URL.revokeObjectURL(link.href)
  }

  return (
    <PageLayout title="Food Insights" subtitle="Detailed performance metrics for your kitchen ecosystem.">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div />
        <div className="relative w-fit ml-auto">
          <div className="flex items-center gap-3 bg-surface-container-low border border-surface-variant/50 p-1.5 rounded-xl">
            {['Week', 'Month', 'Quarter', 'Custom Range'].map((period) => {
              const active = period === 'Custom Range' ? timePeriod === 'Custom Range' : timePeriod === period
              return (
                <button
                  key={period}
                  onClick={() => handlePeriodChange(period)}
                  className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${active ? 'bg-surface-container-highest text-on-surface shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}
                >
                  {period === 'Custom Range' && timePeriod === 'Custom Range' ? customRangeLabel : period}
                </button>
              )
            })}
            <button onClick={exportReport} className="ml-2 bg-primary text-on-primary px-5 py-2 rounded-lg font-bold text-sm flex items-center gap-2 active:scale-95 transition-all shadow-lg shadow-primary/20">
              <Icon name="file_download" size={16} />
              Export Report
            </button>
          </div>

          {customRangeOpen && (
            <div className="absolute right-0 top-[calc(100%+10px)] z-20 w-[320px] bg-white border border-surface-variant/60 rounded-xl card-shadow p-4">
              <p className="text-xs font-extrabold uppercase tracking-widest text-on-surface-variant mb-3">Select Custom Range</p>
              <div className="grid grid-cols-2 gap-3">
                <label className="text-xs font-bold text-on-surface-variant">
                  Start Date
                  <input
                    type="date"
                    value={startDate}
                    onChange={(event) => setStartDate(event.target.value)}
                    className="mt-1 w-full rounded-lg border border-outline-variant/50 bg-white px-2 py-2 text-xs font-semibold text-on-surface focus:border-primary focus:outline-none"
                  />
                </label>
                <label className="text-xs font-bold text-on-surface-variant">
                  End Date
                  <input
                    type="date"
                    value={endDate}
                    onChange={(event) => setEndDate(event.target.value)}
                    className="mt-1 w-full rounded-lg border border-outline-variant/50 bg-white px-2 py-2 text-xs font-semibold text-on-surface focus:border-primary focus:outline-none"
                  />
                </label>
              </div>
              {startDate && endDate && startDate > endDate && (
                <p className="mt-2 text-xs font-bold text-error">End date must be on or after start date.</p>
              )}
              <div className="mt-4 flex justify-end gap-2">
                <button onClick={clearCustomRange} className="px-3 py-2 rounded-lg text-xs font-bold bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high">
                  Clear
                </button>
                <button
                  onClick={applyCustomRange}
                  disabled={!startDate || !endDate || startDate > endDate}
                  className="px-3 py-2 rounded-lg text-xs font-bold bg-primary text-on-primary disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Apply
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {displayMetrics.map((metric, index) => {
          const highlighted = index === 2
          return (
            <div key={metric.id} className={`${highlighted ? 'bg-primary text-white' : 'bg-white border border-surface-variant/50'} card-shadow rounded-xl p-6 relative overflow-hidden group`}>
              <p className={`text-xs font-bold uppercase tracking-wider mb-2 ${highlighted ? 'text-on-primary/60' : 'text-on-surface-variant/60'}`}>{metric.label}</p>
              <h3 className={`${highlighted ? 'text-2xl text-white' : 'text-3xl text-on-surface'} font-black`}>{metric.value}</h3>
              {!highlighted && (
                <div className={`mt-2 flex items-center gap-1 font-bold text-xs ${metric.trendUp ? 'text-secondary' : 'text-primary'}`}>
                  <Icon name={metric.trendUp ? 'trending_up' : 'trending_down'} size={12} />
                  <span>{metric.trend > 0 ? '+' : ''}{metric.trend}%</span>
                </div>
              )}
              {highlighted && <p className="text-on-primary/80 text-xs mt-1 font-medium">{foodInsightsData.topItems[0].orders} units sold</p>}
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-12 gap-8 mt-8">
        <div className="col-span-12 lg:col-span-4 bg-white border border-surface-variant/50 card-shadow rounded-xl p-8">
          <div className="flex items-center justify-between mb-8">
            <h4 className="text-xl font-black text-on-surface">Top Performers</h4>
            <span className="material-symbols-outlined text-on-surface-variant/40">more_horiz</span>
          </div>
          <div className="space-y-6">
            {topPerformers.map((item) => (
              <div key={item.rank} className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-velocity-tint border border-surface-variant/50 rounded-xl flex items-center justify-center font-black text-primary">{String(item.rank).padStart(2, '0')}</div>
                <div className="flex-1">
                  <p className="font-bold text-on-surface">{item.name}</p>
                  <p className="text-xs text-on-surface-variant font-medium">{item.orders} Orders</p>
                </div>
                <div className="text-right">
                  <p className={item.delta < 0 ? 'text-primary font-black' : 'text-secondary font-black'}>{item.delta > 0 ? '+' : ''}{item.delta}%</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-3 rounded-xl bg-velocity-tint border border-surface-variant/50 hover:border-primary/20 hover:bg-white text-on-surface-variant text-sm font-bold transition-all">
            View Full Menu Performance
          </button>
        </div>

        <div className="col-span-12 lg:col-span-8 bg-white border border-surface-variant/50 card-shadow rounded-xl p-8 flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h4 className="text-xl font-black text-on-surface">Item Order Growth</h4>
              <p className="text-sm text-on-surface-variant font-medium">New vs. Returning Menu Trends</p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-primary-fixed" /><span className="text-xs font-bold text-on-surface-variant">New Items</span></div>
              <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-primary" /><span className="text-xs font-bold text-on-surface-variant">Best Sellers</span></div>
            </div>
          </div>
          <div className="flex-1 flex items-end justify-between gap-4 pb-4">
            {chartSeries.map((point) => (
              <div key={point.day} className="flex flex-col items-center gap-2 flex-1 group">
                <div className="w-full space-y-1">
                  <div className="w-full bg-primary-fixed bar-rounded-t transition-all" style={{ height: `${point.newItems}px` }} />
                  <div className="w-full bg-primary bar-rounded-t transition-all" style={{ height: `${point.bestSellers}px` }} />
                </div>
                <span className="text-[10px] font-bold text-on-surface-variant uppercase">{point.day}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-background border border-outline-variant/50 rounded-2xl p-5 flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-primary/20 text-primary flex-shrink-0">
              <Icon name="auto_awesome" size={18} />
            </div>
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-widest text-primary mb-1">Ordr.AI Automated Insight</p>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                {foodInsightsData.aiInsights[0]}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="bg-white rounded-xl shadow-[0px_4px_24px_rgba(254,60,6,0.04)] border border-surface-variant/50 p-6">
          <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/60 mb-2">Most Expensive Ordered</p>
          <h3 className="text-2xl font-black text-on-surface">Wagyu Steak Platter</h3>
          <p className="mt-2 text-sm font-bold text-primary">₹4,850 <span className="text-on-surface-variant font-medium">• 18 orders this week</span></p>
        </div>
        <div className="bg-white rounded-xl shadow-[0px_4px_24px_rgba(254,60,6,0.04)] border border-surface-variant/50 p-6">
          <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/60 mb-2">Least Expensive Ordered</p>
          <h3 className="text-2xl font-black text-on-surface">Masala Chai</h3>
          <p className="mt-2 text-sm font-bold text-primary">₹45 <span className="text-on-surface-variant font-medium">• 842 orders this week</span></p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-[0px_4px_24px_rgba(254,60,6,0.04)] border border-surface-variant/50 overflow-hidden mt-8">
        <div className="px-8 py-6 border-b border-surface-variant/50 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-black text-on-surface">Menu Performance Breakdown</h3>
          </div>
          <button onClick={() => setFilterOpen((open) => !open)} className="bg-velocity-tint px-4 py-2 rounded-full flex items-center gap-2 hover:bg-surface-container-highest transition-colors">
            <Icon name="tune" size={16} />
            <span className="text-xs font-bold uppercase tracking-wider">Filter</span>
          </button>
        </div>

        {filterOpen && (
          <div className="px-8 pt-4 pb-0">
            <div className="inline-flex gap-2 flex-wrap bg-surface-container-low rounded-full p-1 border border-surface-variant/50">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${selectedCategory === category ? 'bg-white text-primary shadow-sm' : 'text-on-surface-variant hover:bg-white/70'}`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="overflow-x-auto p-4">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/70">
                <th className="px-4 py-4">Item Name</th>
                <th className="px-4 py-4">Category</th>
                <th className="px-4 py-4">Orders</th>
                <th className="px-4 py-4">Revenue (₹)</th>
                <th className="px-4 py-4">Avg. Rating</th>
                <th className="px-4 py-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredMenuItems.map((item) => (
                <tr key={item.id} className="border-t border-surface-container hover:bg-background/50 transition-colors">
                  <td className="px-4 py-4 font-medium text-on-surface">{item.name}</td>
                  <td className="px-4 py-4 text-sm text-on-surface-variant">{item.category}</td>
                  <td className="px-4 py-4 text-sm text-on-surface-variant">{item.orders.toLocaleString()}</td>
                  <td className="px-4 py-4 text-sm font-bold text-on-surface">{item.revenue}</td>
                  <td className="px-4 py-4 text-sm text-primary font-bold">★ {item.rating}</td>
                  <td className="px-4 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest ${item.status === 'Standard' ? 'bg-secondary-container text-secondary' : item.status === 'Breakfast' ? 'bg-primary-fixed text-primary' : 'bg-[#eef1ff] text-[#48539e]'}`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-8 py-4 text-center border-t border-surface-variant/50">
          <button className="text-primary font-bold text-sm hover:underline">
            View All Menu Items →
          </button>
        </div>
      </div>
    </PageLayout>
  )
}
