import React, { useMemo, useState } from 'react'
import PageLayout from '../components/layout/PageLayout'
import Icon from '../components/Icon'
import { financialsData } from '../data/mainDashboardData'

export default function Financials({ searchQuery = '' }) {
  const [timePeriod, setTimePeriod] = useState('Week')
  const [chartView, setChartView] = useState('Weekly')
  const [tablePeriod, setTablePeriod] = useState('Week')
  const [customDateOpen, setCustomDateOpen] = useState(false)
  const [tableFilterOpen, setTableFilterOpen] = useState(false)
  const [tableFilter, setTableFilter] = useState('All')
  const [customRange, setCustomRange] = useState({ start: '', end: '' })

  const filteredTransactions = useMemo(() => {
    // Get transactions for the selected period
    const periodTransactions = financialsData.transactionsByPeriod[tablePeriod] || financialsData.transactions
    
    const lowered = searchQuery.toLowerCase().trim()
    let rows = lowered
      ? periodTransactions.filter((txn) => {
          return (
            txn.order.toLowerCase().includes(lowered) ||
            txn.txnId.toLowerCase().includes(lowered) ||
            txn.date.toLowerCase().includes(lowered) ||
            txn.amount.toLowerCase().includes(lowered)
          )
        })
      : periodTransactions

    if (tableFilter === 'Custom Date' && customRange.start && customRange.end) {
      const startDate = new Date(customRange.start)
      const endDate = new Date(customRange.end)
      rows = rows.filter((txn) => {
        const txnDate = new Date(txn.date)
        return txnDate >= startDate && txnDate <= endDate
      })
    }

    if (tableFilter === 'Completed') {
      rows = rows.filter((txn) => txn.status === 'Completed')
    }

    return rows
  }, [searchQuery, tableFilter, customRange, tablePeriod])

  const timePeriods = ['Week', 'Month', 'Quarter', 'Year']
  const tablePeriods = ['Week', 'Month', 'Quarter', 'Year']
  const chartViews = ['Daily', 'Weekly', 'Monthly']

  // Get earnings for current period
  const displayEarnings = useMemo(() => {
    return financialsData.earningsByPeriod[timePeriod] || financialsData.earnings
  }, [timePeriod])

  const chartSeries = useMemo(() => {
    // produce simple variants of the base daily data for each view
    const base = financialsData.transactionsByDay || []
    if (chartView === 'Daily') return base

    if (chartView === 'Weekly') {
      // boost values slightly to simulate weekly aggregation
      return base.map((p) => ({ ...p, transactions: Math.max(8, Math.round(p.transactions * 1.6)) }))
    }

    // Monthly - larger aggregated numbers
    return base.map((p) => ({ ...p, transactions: Math.max(12, Math.round(p.transactions * 2.8)) }))
  }, [chartView])

  const applyCustomDate = () => {
    setTimePeriod('Custom Date')
    setTablePeriod('Custom Date')
    setTableFilter('Custom Date')
    setCustomDateOpen(false)
    setTableFilterOpen(false)
  }

  return (
    <PageLayout title="Financials & Payouts" subtitle="Track earnings, settlements, and manage your restaurant's cash flow in real-time.">
      <div className="flex justify-end mb-8">
        <button className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-xl font-semibold shadow-lg shadow-primary/20 hover:opacity-90 transition-all active:scale-[0.98]">
          <Icon name="download" size={18} />
          Download Report
        </button>
      </div>

      <div className="relative flex items-center gap-1 mb-8 bg-white p-1 rounded-full border border-primary/5 w-fit shadow-sm">
        {timePeriods.map((period) => (
          <button
            key={period}
            onClick={() => setTimePeriod(period)}
            className={`px-6 py-2 text-xs font-bold rounded-full transition-all ${timePeriod === period ? 'bg-primary text-white' : 'text-on-surface-variant hover:bg-slate-100'}`}
          >
            {period}
          </button>
        ))}
        <div className="h-4 w-px bg-outline-variant/20 mx-1" />
        <button
          type="button"
          onClick={() => setCustomDateOpen((open) => !open)}
          className="flex items-center gap-2 px-6 py-2 text-xs font-semibold text-on-surface-variant hover:bg-slate-100 rounded-full transition-all"
        >
          <Icon name="calendar_today" size={14} />
          Custom Date
        </button>

        {customDateOpen && (
          <div className="absolute top-full left-0 mt-3 w-80 bg-white rounded-2xl shadow-xl border border-primary/5 p-4 z-20">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-headline font-bold text-sm text-on-surface">Custom Date Range</h4>
              <button type="button" onClick={() => setCustomDateOpen(false)} className="text-on-surface-variant hover:text-on-surface">
                <Icon name="close" size={18} />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                Start
                <input
                  type="date"
                  value={customRange.start}
                  onChange={(e) => setCustomRange((prev) => ({ ...prev, start: e.target.value }))}
                  className="mt-2 w-full px-3 py-2 rounded-xl bg-surface-container-highest border border-outline-variant/30"
                />
              </label>
              <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                End
                <input
                  type="date"
                  value={customRange.end}
                  onChange={(e) => setCustomRange((prev) => ({ ...prev, end: e.target.value }))}
                  className="mt-2 w-full px-3 py-2 rounded-xl bg-surface-container-highest border border-outline-variant/30"
                />
              </label>
            </div>
            <div className="flex justify-end gap-2">
              <button type="button" onClick={() => setCustomDateOpen(false)} className="px-4 py-2 rounded-xl text-sm font-semibold text-on-surface-variant hover:bg-surface-container">
                Cancel
              </button>
              <button type="button" onClick={applyCustomDate} className="px-4 py-2 rounded-xl text-sm font-semibold bg-primary text-white hover:opacity-90">
                Apply
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10 lg:grid-cols-3">
        {displayEarnings.map((earning) => (
          <div key={earning.id} className="bg-white p-6 rounded-2xl shadow-[0px_4px_24px_rgba(254,60,6,0.04)] border border-primary/5">
            <div className="flex justify-between items-start mb-4">
              <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">{earning.label}</span>
              <span className="material-symbols-outlined text-primary p-2 bg-primary/10 rounded-lg">{earning.icon}</span>
            </div>
            <h3 className="text-2xl font-bold font-headline">{earning.value}</h3>
            <div className="flex items-center gap-1 text-xs text-primary mt-2 font-medium">
              <Icon name={earning.note === 'Live updating' ? 'schedule' : 'trending_up'} size={14} />
              <span>{earning.note || `${earning.trend}%`}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-[0px_4px_24px_rgba(254,60,6,0.04)] border border-primary/5">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-bold font-headline">Transaction Overview</h3>
            <div className="flex bg-background p-1 rounded-lg">
              {chartViews.map((view) => (
                <button
                  key={view}
                  onClick={() => setChartView(view)}
                  className={`px-4 py-1 text-xs font-semibold rounded-md transition-all ${chartView === view ? 'bg-white text-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'}`}
                >
                  {view}
                </button>
              ))}
            </div>
          </div>

          <div className="relative h-64 w-full">
            <div className="absolute inset-0 flex items-end justify-between gap-2">
              {chartSeries.map((point, idx) => {
                const height = `${Math.max(24, point.transactions * 2.2)}px`
                const isActive = point.day === 'Sun'
                const palette = ['bg-primary/5', 'bg-primary/5', 'bg-primary/10', 'bg-primary/20', 'bg-primary/40', 'bg-primary/60', 'bg-primary']

                return (
                  <div key={point.day} className="w-full flex flex-col items-stretch justify-end">
                    <div className={`${palette[idx % palette.length]} rounded-t-lg`} style={{ height }} />
                    <span className={`mt-4 text-[10px] font-bold uppercase tracking-widest text-center ${isActive ? 'text-primary' : 'text-on-surface-variant'}`}>{point.day}</span>
                  </div>
                )
              })}
            </div>
          </div>
          <div className="flex justify-between mt-4 text-[10px] text-on-surface-variant font-bold uppercase tracking-widest">
            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
          </div>
        </div>

        <div className="bg-primary text-white p-8 rounded-2xl relative overflow-hidden flex flex-col justify-between shadow-xl shadow-primary/20">
          <div className="relative z-10">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mb-6">
              <Icon name="lightbulb" size={20} className="text-white" />
            </div>
            <h3 className="text-xl font-bold font-headline mb-3 leading-tight">New Financial Insights</h3>
            <p className="text-white/80 text-sm leading-relaxed">
              Your revenue has increased by 14% this week. Sunday brunch is your most profitable time slot. Consider adding a 'Chef's Special' to boost it further.
            </p>
          </div>
          <a className="relative z-10 mt-6 inline-flex items-center gap-2 text-sm font-bold group" href="#">
            View detailed breakdown
            <Icon name="arrow_forward" size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -left-10 top-20 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-[0px_4px_24px_rgba(254,60,6,0.04)] border border-primary/5 overflow-hidden">
        <div className="px-8 py-6 border-b border-primary/5 flex justify-between items-center">
          <h3 className="text-lg font-bold font-headline">Transaction Overview</h3>
          <div className="flex items-center gap-6">
            <div className="relative hidden md:flex items-center gap-1 bg-white p-1 rounded-full border border-primary/5">
              {tablePeriods.map((period) => (
                <button
                  key={period}
                  onClick={() => {
                    setTablePeriod(period)
                    setTableFilter('All')
                  }}
                  className={`px-4 py-1.5 text-[10px] font-bold rounded-full transition-all ${tablePeriod === period ? 'bg-primary text-white shadow-sm' : 'text-on-surface-variant hover:bg-slate-100'}`}
                >
                  {period}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setTableFilterOpen((open) => !open)}
                className="px-4 py-1.5 text-[10px] font-bold text-on-surface-variant hover:bg-slate-100 rounded-full transition-all flex items-center gap-1"
              >
                <Icon name="calendar_month" size={12} />
                Custom
              </button>

              {tableFilterOpen && (
                <div className="absolute top-full right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-primary/5 overflow-hidden z-20">
                  {['All', 'Completed', 'Custom Date'].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => {
                        setTableFilter(option)
                        setTablePeriod(option === 'Custom Date' ? 'Week' : tablePeriod)
                        setTableFilterOpen(false)
                        if (option === 'Custom Date') {
                          setCustomDateOpen(true)
                        }
                      }}
                      className={`w-full text-left px-4 py-3 text-sm font-medium transition-colors ${tableFilter === option ? 'bg-primary-container text-primary' : 'text-on-surface hover:bg-surface-container'}`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button className="text-primary text-sm font-bold flex items-center gap-1 hover:underline">View All Transactions</button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-background/50">
              <tr>
                <th className="px-8 py-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Order</th>
                <th className="px-4 py-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Date</th>
                <th className="px-4 py-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Transaction ID</th>
                <th className="px-4 py-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Amount</th>
                <th className="px-4 py-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Status</th>
                <th className="px-8 py-4 text-right" />
              </tr>
            </thead>
            <tbody className="divide-y divide-primary/5">
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-background/40 transition-colors group">
                  <td className="px-8 py-4">
                    <span className="text-sm font-medium text-on-surface">#{transaction.order}</span>
                  </td>
                  <td className="px-4 py-4 text-sm text-on-surface-variant">{transaction.date}</td>
                  <td className="px-4 py-4 text-sm text-on-surface-variant">#{transaction.txnId}</td>
                  <td className="px-4 py-4 font-semibold text-on-surface">{transaction.amount}</td>
                  <td className="px-4 py-4">
                    <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider">Completed</span>
                  </td>
                  <td className="px-8 py-4 text-right">
                    <button className="p-2 text-on-surface-variant hover:text-primary transition-colors">
                      <Icon name="download" size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PageLayout>
  )
}
