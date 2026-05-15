import React, { useMemo, useState } from 'react'
import PageLayout from '../components/layout/PageLayout'
import StatusBadge from '../components/ui/StatusBadge'
import ToggleSwitch from '../components/ui/ToggleSwitch'
import Tabs from '../components/ui/Tabs'
import Icon from '../components/Icon'
import { commandCenterData } from '../data/mainDashboardData'

export default function CommandCenter({ searchQuery = '' }) {
  const [acceptingOrders, setAcceptingOrders] = useState(commandCenterData.restaurantAcceptingOrders)
  const [activeSeries, setActiveSeries] = useState('Revenue Trend')
  const [activePeriod, setActivePeriod] = useState('Daily')
  const [exceptionsFilterOpen, setExceptionsFilterOpen] = useState(false)
  const [exceptionsFilter, setExceptionsFilter] = useState('All')

  const filteredOrders = useMemo(() => {
    const lowered = searchQuery.toLowerCase().trim()
    const filteredBySearch = lowered
      ? commandCenterData.orders.filter((order) => {
          return (
            order.id.toLowerCase().includes(lowered) ||
            order.customer.name.toLowerCase().includes(lowered) ||
            order.items.toLowerCase().includes(lowered)
          )
        })
      : commandCenterData.orders

    if (exceptionsFilter === 'All') return filteredBySearch

    return filteredBySearch.filter((order) => {
      if (exceptionsFilter === 'Delayed') {
        return order.delayed
      }

      return order.status === exceptionsFilter
    })
  }, [searchQuery, exceptionsFilter])

  const seriesTabs = ['Revenue Trend', 'Order Volume', 'Avg. Ticket']
  const periodTabs = ['Hourly', 'Daily', 'Weekly']

  // Generate chart data based on selected series and period
  const chartData = useMemo(() => {
    const baseRevenueByDay = [
      { day: 'Mon', value: 5000 },
      { day: 'Tue', value: 6200 },
      { day: 'Wed', value: 4800 },
      { day: 'Thu', value: 7100 },
      { day: 'Fri', value: 8500 },
      { day: 'Sat', value: 9200 },
      { day: 'Sun', value: 7800 },
    ]

    const baseOrdersByHour = [
      { day: '12PM', value: 8 },
      { day: '1PM', value: 12 },
      { day: '2PM', value: 9 },
      { day: '3PM', value: 15 },
      { day: '4PM', value: 11 },
      { day: '5PM', value: 13 },
      { day: '6PM', value: 18 },
    ]

    const baseOrdersByWeek = [
      { day: 'Wk 1', value: 450 },
      { day: 'Wk 2', value: 520 },
      { day: 'Wk 3', value: 480 },
      { day: 'Wk 4', value: 650 },
    ]

    // Select period data
    let periodData = baseRevenueByDay
    if (activePeriod === 'Hourly') {
      periodData = baseOrdersByHour
    } else if (activePeriod === 'Weekly') {
      periodData = baseOrdersByWeek
    }

    // Apply series multiplier
    let multiplier = 1
    if (activeSeries === 'Order Volume') {
      // Scale for order volumes (smaller numbers)
      multiplier = 0.3
    } else if (activeSeries === 'Avg. Ticket') {
      // Scale for average ticket amounts (also smaller)
      multiplier = 0.5
    }

    return periodData.map((item) => ({
      day: item.day,
      revenue: Math.round(item.value * multiplier),
    }))
  }, [activeSeries, activePeriod])

  return (
    <PageLayout title="Command Center" subtitle="Global Outlet Overview">
      <div className="flex items-center justify-between gap-4 mb-8 flex-wrap">
        <div className="flex items-center gap-3 ml-auto mr-2 bg-[#E2F6EA] px-4 py-2 rounded-full border border-[#D1EAD8] shadow-sm">
          <ToggleSwitch checked={acceptingOrders} onChange={setAcceptingOrders} label="Restaurant Accepting Orders" />
        </div>
        <a href="https://ordrai.in" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-primary font-bold hover:underline ml-auto lg:ml-0">
          <Icon name="support_agent" size={18} />
          Raise a Complaint
        </a>
      </div>

      <div className="grid grid-cols-12 gap-6 mb-8">
        <section className="col-span-12 lg:col-span-8 bg-gradient-to-br from-primary to-[#D63000] p-8 rounded-[40px] flex flex-col justify-center h-64 text-on-primary shadow-2xl shadow-primary/20 overflow-hidden relative">
          <div className="absolute -right-12 -top-12 h-64 w-64 bg-white/10 rounded-full blur-3xl" />
          <div className="z-10">
            <div className="font-label text-[11px] tracking-[0.24em] uppercase opacity-80 font-bold">Real-time Operations</div>
            <div className="mt-4 flex items-baseline gap-6">
              <div className="font-headline text-8xl font-extrabold tracking-tighter leading-none">{commandCenterData.activeOrders}</div>
              <div className="flex flex-col">
                <div className="text-3xl font-extrabold">Active Orders</div>
                <div className="text-sm opacity-90 flex items-center gap-1 font-medium mt-1">
                  <Icon name="trending_up" size={16} />
                  +{commandCenterData.activeOrdersChange} in the last {commandCenterData.changeTimeframe}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="col-span-12 lg:col-span-4 bg-surface-container-lowest p-6 rounded-[32px] shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-headline font-bold text-sm text-on-surface-variant uppercase tracking-wider">Performance</h3>
            <div className="relative">
              <select
                value={activePeriod}
                onChange={(e) => setActivePeriod(e.target.value)}
                className="appearance-none bg-[#F9E4DF] text-on-surface pl-4 pr-10 py-1.5 rounded-full text-xs font-bold border border-outline-variant/30 focus:ring-2 focus:ring-primary/20 outline-none cursor-pointer"
              >
                <option value="Hourly">Hourly</option>
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Month">Month</option>
                <option value="Yearly">Yearly</option>
              </select>
              <Icon name="filter_list" size={18} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-2xl">
              <div>
                <p className="text-[10px] font-bold text-on-surface-variant uppercase">Total Orders</p>
                <p className="text-2xl font-headline font-extrabold">42</p>
              </div>
              <Icon name="receipt_long" size={32} className="text-primary/40" />
            </div>
            <div className="flex items-center justify-between p-4 bg-primary-container/30 rounded-2xl">
              <div>
                <p className="text-[10px] font-bold text-on-surface-variant uppercase">Revenue</p>
                <p className="text-2xl font-headline font-extrabold text-primary">₹8,500</p>
              </div>
              <Icon name="payments" size={32} className="text-primary/40" />
            </div>
          </div>
        </section>
      </div>

      <section className="bg-surface-container-lowest rounded-[40px] shadow-sm overflow-hidden mb-8">
        <div className="px-8 py-7 flex justify-between items-center bg-white">
          <div>
            <h2 className="font-headline text-xl font-extrabold">Order Flow Management (Exceptions)</h2>
            <p className="text-sm text-on-surface-variant font-medium">Monitoring delayed orders requiring immediate attention</p>
          </div>
          <div className="relative">
            <button
              type="button"
              onClick={() => setExceptionsFilterOpen((open) => !open)}
              className="bg-error-container/20 text-error px-5 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 hover:bg-error-container/40 transition-colors border border-error/20"
              aria-expanded={exceptionsFilterOpen}
              aria-haspopup="menu"
            >
              <Icon name="warning" size={18} />
              Exceptions | Filter
            </button>

            {exceptionsFilterOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-surface-container-lowest rounded-2xl shadow-lg border border-outline-variant/20 overflow-hidden z-20">
                {['All', 'Pending', 'Preparing', 'Delayed'].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => {
                      setExceptionsFilter(option)
                      setExceptionsFilterOpen(false)
                    }}
                    className={`w-full text-left px-4 py-3 text-sm font-medium transition-colors ${
                      exceptionsFilter === option ? 'bg-primary-container text-primary' : 'text-on-surface hover:bg-surface-container'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-surface-container-low/50">
              <tr>
                <th className="px-8 py-5 font-label text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Order ID</th>
                <th className="px-8 py-5 font-label text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Customer</th>
                <th className="px-8 py-5 font-label text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Items</th>
                <th className="px-8 py-5 font-label text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Value</th>
                <th className="px-8 py-5 font-label text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Status</th>
                <th className="px-8 py-5 font-label text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">TIME</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="bg-error-container/5 hover:bg-error-container/10 transition-colors">
                  <td className="px-8 py-6"><span className="font-bold text-sm text-on-surface">#{order.id}</span></td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs ${order.customer.initials === 'MK' ? 'bg-tertiary-container text-tertiary' : 'bg-primary-container text-primary'}`}>
                        {order.customer.initials}
                      </div>
                      <div className="text-sm font-extrabold text-on-surface">{order.customer.name}</div>
                    </div>
                  </td>
                  <td className="px-8 py-6"><span className="text-sm text-on-surface-variant font-medium">{order.items}</span></td>
                  <td className="px-8 py-6"><span className="text-sm font-extrabold text-on-surface">{order.value}</span></td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col gap-1">
                      <StatusBadge status={order.status} />
                      <span className="text-[9px] text-error font-extrabold uppercase tracking-tighter">Overdue {order.status === 'Pending' ? '24m' : '21m'}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-error">{order.time}</span>
                      <span className="text-[10px] font-extrabold text-error/60">DELAYED</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-8 py-5 bg-white border-t border-outline-variant/10 flex justify-center">
          <button className="text-primary font-extrabold text-sm flex items-center gap-2 hover:bg-primary-container px-8 py-3 rounded-full transition-all">
            View All Orders
            <Icon name="arrow_forward" size={16} />
          </button>
        </div>
      </section>

      <section className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-9 bg-surface-container-lowest p-8 rounded-[40px] shadow-sm flex flex-col">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
            <div>
              <h3 className="font-headline font-extrabold text-xl">Revenue Trend</h3>
              <p className="text-sm text-on-surface-variant font-medium">Financial performance analytics</p>
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="flex bg-surface-container-low rounded-full p-1 gap-1 shadow-inner">
                {seriesTabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveSeries(tab)}
                    className={`px-4 py-1.5 rounded-full text-[11px] font-bold transition-all ${
                      activeSeries === tab ? 'bg-white shadow-sm text-primary' : 'text-on-surface-variant hover:bg-white/50'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="flex bg-surface-container-low rounded-full p-1 gap-1 shadow-inner">
                {periodTabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActivePeriod(tab)}
                    className={`px-4 py-1.5 rounded-full text-[11px] font-bold transition-all ${
                      activePeriod === tab ? 'bg-white shadow-sm text-primary' : 'text-on-surface-variant hover:bg-white/50'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex h-56 mt-auto">
            <div className="flex flex-col justify-between text-[10px] font-bold text-on-surface-variant/50 pr-4 pb-8">
              <span>₹10,000</span>
              <span>₹7,500</span>
              <span>₹5,000</span>
              <span>₹2,500</span>
              <span>0</span>
            </div>
            <div className="flex-1 flex flex-col">
              <div className="flex-1 flex items-end gap-5 px-2 pb-8">
                {chartData.map((point) => {
                  const isActive = point.day === 'Thu'
                  let maxValue = 10000
                  if (activePeriod === 'Hourly') maxValue = 20
                  if (activePeriod === 'Weekly') maxValue = 650
                  if (activeSeries === 'Order Volume') maxValue = activePeriod === 'Hourly' ? 18 : activePeriod === 'Weekly' ? 200 : 30
                  if (activeSeries === 'Avg. Ticket') maxValue = activePeriod === 'Hourly' ? 8 : activePeriod === 'Weekly' ? 350 : 4500

                  const height = `${Math.max(20, (point.revenue / maxValue) * 100)}%`

                  return (
                    <div key={point.day} className="flex-1 flex flex-col items-center justify-end h-full gap-3">
                      <div
                        className={`w-full max-w-[72px] rounded-t-[28px] ${isActive ? 'bg-primary' : 'bg-[#F6D0C7]'}`}
                        style={{ height }}
                      />
                      <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">{point.day}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-3 bg-surface-container-lowest p-8 rounded-[40px] shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-20">
            <h3 className="font-headline font-extrabold text-xl uppercase tracking-tight">System Health</h3>
            <span className="px-3 py-1 rounded-full bg-primary-container text-primary text-[10px] font-extrabold uppercase tracking-wider inline-flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-primary" />
              OK
            </span>
          </div>

          <div className="mt-auto">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] uppercase tracking-wider text-on-surface font-bold">Response Time</span>
              <span className="text-[11px] font-bold text-on-surface">{commandCenterData.systemHealth.responseTime}</span>
            </div>
            <div className="h-2 rounded-full bg-primary-container overflow-hidden mb-10">
              <div className="h-full w-1/2 bg-primary rounded-full" />
            </div>

            <blockquote className="border-l-2 border-primary-container pl-4 italic text-sm text-on-surface-variant leading-7">
              “AI Agents operating within optimal parameters.”
            </blockquote>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
