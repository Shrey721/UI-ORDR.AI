import React, { useMemo, useState } from 'react'
import PageLayout from '../components/layout/PageLayout'
import Icon from '../components/Icon'
import { menuManagementData } from '../data/mainDashboardData'

export default function MenuManagement({ searchQuery = '' }) {
  const [menuItems, setMenuItems] = useState(menuManagementData.menuItems)
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [availabilityFilter, setAvailabilityFilter] = useState('All')
  const [timeFilter, setTimeFilter] = useState('All')
  const [activeItemId, setActiveItemId] = useState(menuManagementData.menuItems[0]?.id ?? null)

  const filteredItems = useMemo(() => {
    const lowered = searchQuery.toLowerCase().trim()

    return menuItems.filter((item) => {
      if (categoryFilter !== 'All' && item.category !== categoryFilter) return false
      if (availabilityFilter === 'Available' && !item.status) return false
      if (availabilityFilter === 'Unavailable' && item.status) return false
      if (timeFilter !== 'All' && !item.timeBasedAvailability.includes(timeFilter)) return false

      if (!lowered) return true
      return (
        item.name.toLowerCase().includes(lowered) ||
        item.category.toLowerCase().includes(lowered)
      )
    })
  }, [menuItems, categoryFilter, availabilityFilter, timeFilter, searchQuery])

  const activeItem = menuItems.find((item) => item.id === activeItemId) ?? menuItems[0]

  const updateItem = (field, value) => {
    setMenuItems((items) =>
      items.map((item) => (item.id === activeItem.id ? { ...item, [field]: value } : item))
    )
  }

  const updateSeasonalDate = (field, value) => {
    setMenuItems((items) =>
      items.map((item) =>
        item.id === activeItem.id
          ? {
              ...item,
              seasonalDates: {
                ...item.seasonalDates,
                [field]: value,
              },
            }
          : item
      )
    )
  }

  const toggleTimeSlot = (slot) => {
    const selected = activeItem.timeBasedAvailability
    const exists = selected.includes(slot)
    const updated = exists ? selected.filter((value) => value !== slot) : [...selected, slot]
    updateItem('timeBasedAvailability', updated)
  }

  const toggleAvailability = (itemId) => {
    setMenuItems((items) => items.map((item) => (item.id === itemId ? { ...item, status: !item.status } : item)))
  }

  const addNewItem = () => {
    const newItem = {
      id: Date.now(),
      name: 'New Item',
      category: 'Main Course',
      price: 100,
      status: true,
      tags: ['Standard'],
      available: true,
      timeBasedAvailability: ['Lunch'],
      seasonalAvailable: false,
      seasonalDates: { start: '', end: '' },
    }
    setMenuItems((items) => [newItem, ...items])
    setActiveItemId(newItem.id)
  }

  const saveChanges = () => {
    setMenuItems((items) => [...items])
  }

  return (
    <PageLayout
      title="Menu Management"
      subtitle="Manage your dishes, availability, and seasonal items"
      action={
        <div className="flex gap-3">
          <button className="px-5 py-2.5 bg-white border border-primary/30 text-primary font-bold text-sm rounded-xl hover:bg-primary-container/40 transition-colors">
            Upload Menu
          </button>
          <button onClick={addNewItem} className="px-5 py-2.5 bg-primary text-white font-bold text-sm rounded-xl inline-flex items-center gap-2 shadow-[0_10px_24px_rgba(254,60,6,0.25)] hover:brightness-95 transition-all">
            <Icon name="add" size={16} />
            Add New Item
          </button>
        </div>
      }
    >
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-0 border border-outline-variant/30 bg-white overflow-hidden rounded-xl min-h-[680px]">
        <div className="xl:col-span-8 p-7 border-r border-outline-variant/30 bg-surface-container-lowest">
          <div className="bg-surface rounded-xl border border-outline-variant/30 p-6 mb-6">
            <div className="flex items-start gap-4 mb-5">
              <div className="w-11 h-11 rounded-lg bg-[#DFF4E3] text-[#2C9C4B] flex items-center justify-center">
                <Icon name="diagnosis" size={22} />
              </div>
              <div>
                <p className="text-2xl font-bold text-on-surface">Menu Source</p>
                <p className="text-sm text-on-surface-variant">Auto-sync your physical menu using AI</p>
              </div>
            </div>
            <div className="rounded-xl border border-dashed border-primary/25 bg-[#FFF8F6] px-6 py-12 text-center">
              <Icon name="cloud_upload" size={26} className="text-outline mx-auto mb-2" />
              <p className="text-2xl font-semibold text-on-surface mb-1">Drag and drop your menu PDF or CSV</p>
              <p className="text-sm text-on-surface-variant">Menu items will be auto-extracted and categorized instantly.</p>
            </div>
          </div>

          <div className="bg-surface rounded-xl border border-outline-variant/30 overflow-hidden">
            <div className="px-6 pt-5 pb-3 border-b border-outline-variant/20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                <div className="flex items-center gap-2 border-b border-outline-variant/30 pb-2">
                  <Icon name="search" size={16} className="text-on-surface-variant" />
                  <input
                    type="text"
                    value={searchQuery}
                    readOnly
                    placeholder="Search menu items..."
                    className="w-full bg-transparent text-sm text-on-surface placeholder:text-on-surface-variant/70 focus:outline-none"
                  />
                </div>
                <select value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)} className="bg-transparent border-b border-outline-variant/30 pb-2 text-sm text-on-surface focus:outline-none">
                  <option value="All">Category: All</option>
                  {menuManagementData.categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div className="flex gap-4 flex-wrap">
                <select value={availabilityFilter} onChange={(event) => setAvailabilityFilter(event.target.value)} className="bg-transparent border-b border-outline-variant/30 pb-1 text-sm text-on-surface focus:outline-none">
                  <option value="All">Availability: All</option>
                  <option value="Available">Available</option>
                  <option value="Unavailable">Unavailable</option>
                </select>
                <select value={timeFilter} onChange={(event) => setTimeFilter(event.target.value)} className="bg-transparent border-b border-outline-variant/30 pb-1 text-sm text-on-surface focus:outline-none">
                  <option value="All">Time-Based: All</option>
                  {menuManagementData.timeSlots.map((slot) => (
                    <option key={slot.id} value={slot.label}>{slot.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-[#FFF4F0]">
                  <tr className="text-[11px] uppercase tracking-widest text-on-surface-variant/70">
                    <th className="px-6 py-3 font-extrabold">Item Name</th>
                    <th className="px-6 py-3 font-extrabold">Category</th>
                    <th className="px-6 py-3 font-extrabold">Price (₹)</th>
                    <th className="px-6 py-3 font-extrabold">Status</th>
                    <th className="px-6 py-3 font-extrabold">Tags</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((item) => (
                    <tr
                      key={item.id}
                      onClick={() => setActiveItemId(item.id)}
                      className={`border-t border-outline-variant/20 cursor-pointer ${activeItemId === item.id ? 'bg-primary-container/20' : 'hover:bg-[#FFF8F6]'}`}
                    >
                      <td className="px-6 py-4 font-bold text-on-surface">{item.name}</td>
                      <td className="px-6 py-4 text-on-surface-variant">{item.category}</td>
                      <td className="px-6 py-4 font-bold text-on-surface">{item.price.toFixed(2)}</td>
                      <td className="px-6 py-4">
                        <button
                          onClick={(event) => {
                            event.stopPropagation()
                            toggleAvailability(item.id)
                          }}
                          className={`w-10 h-6 rounded-full p-0.5 transition-all ${item.status ? 'bg-[#D3F2D9]' : 'bg-[#EFE5E2]'}`}
                          aria-label="Toggle item availability"
                        >
                          <span className={`block h-5 w-5 rounded-full transition-all ${item.status ? 'translate-x-4 bg-[#00BB44]' : 'translate-x-0 bg-[#8B7E7A]'}`} />
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-2">
                          {item.tags.map((tag) => (
                            <span key={`${item.id}-${tag}`} className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${tag === 'Breakfast' ? 'bg-[#FCE9D1] text-[#9C5A00]' : tag === 'Lunch Special' ? 'bg-[#E7EAFD] text-[#364CB8]' : 'bg-[#F4E9E6] text-[#84736E]'}`}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="xl:col-span-4 bg-white">
          {activeItem && (
            <div className="h-full flex flex-col">
              <div className="px-6 py-6 border-b border-outline-variant/30">
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-black text-on-surface">Edit Item</h2>
                  <button className="text-outline hover:text-on-surface transition-colors">
                    <Icon name="close" size={20} />
                  </button>
                </div>
              </div>

              <div className="px-6 py-5 space-y-6 flex-1 overflow-y-auto">
                <div>
                  <p className="text-[11px] uppercase tracking-widest text-on-surface-variant/60 font-bold mb-2">Item Name</p>
                  <input
                    value={activeItem.name}
                    onChange={(event) => updateItem('name', event.target.value)}
                    className="w-full border-0 border-b border-outline-variant/40 px-0 py-2 text-3xl font-bold text-on-surface bg-transparent focus:outline-none focus:border-primary"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[11px] uppercase tracking-widest text-on-surface-variant/60 font-bold mb-2">Price (₹)</p>
                    <input
                      type="number"
                      value={activeItem.price}
                      onChange={(event) => updateItem('price', Number(event.target.value || 0))}
                      className="w-full border-0 border-b border-outline-variant/40 px-0 py-2 text-3xl font-bold text-on-surface bg-transparent focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-widest text-on-surface-variant/60 font-bold mb-2">Category</p>
                    <select
                      value={activeItem.category}
                      onChange={(event) => updateItem('category', event.target.value)}
                      className="w-full border-0 border-b border-outline-variant/40 px-0 py-2 text-3xl font-bold text-on-surface bg-transparent focus:outline-none focus:border-primary"
                    >
                      {menuManagementData.categories.map((category) => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <p className="text-[11px] uppercase tracking-widest text-on-surface-variant/60 font-bold mb-3">Time-Based Availability</p>
                  <div className="flex flex-wrap gap-2">
                    {menuManagementData.timeSlots.map((slot) => {
                      const selected = activeItem.timeBasedAvailability.includes(slot.label)
                      return (
                        <button
                          key={slot.id}
                          onClick={() => toggleTimeSlot(slot.label)}
                          className={`px-4 py-2 text-sm font-bold rounded-full transition-colors ${selected ? 'bg-primary text-white' : 'bg-[#F0EAE8] text-on-surface-variant hover:bg-[#E5D9D5]'}`}
                        >
                          {slot.label}
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-[11px] uppercase tracking-widest text-on-surface-variant/60 font-bold">Seasonal Availability</p>
                    <button
                      onClick={() => updateItem('seasonalAvailable', !activeItem.seasonalAvailable)}
                      className={`w-10 h-6 rounded-full p-0.5 transition-all ${activeItem.seasonalAvailable ? 'bg-[#D3F2D9]' : 'bg-[#EFE5E2]'}`}
                      aria-label="Toggle seasonal availability"
                    >
                      <span className={`block h-5 w-5 rounded-full transition-all ${activeItem.seasonalAvailable ? 'translate-x-4 bg-[#00BB44]' : 'translate-x-0 bg-[#8B7E7A]'}`} />
                    </button>
                  </div>

                  <div className="bg-[#FFF8F6] border border-outline-variant/30 rounded-lg p-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-on-surface-variant/60 font-bold mb-1">Start Date</p>
                        <input
                          type="date"
                          value={activeItem.seasonalDates.start}
                          onChange={(event) => updateSeasonalDate('start', event.target.value)}
                          disabled={!activeItem.seasonalAvailable}
                          className="w-full border-0 border-b border-outline-variant/40 px-0 py-1.5 text-base font-bold text-on-surface bg-transparent focus:outline-none disabled:opacity-50"
                        />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-on-surface-variant/60 font-bold mb-1">End Date</p>
                        <input
                          type="date"
                          value={activeItem.seasonalDates.end}
                          onChange={(event) => updateSeasonalDate('end', event.target.value)}
                          disabled={!activeItem.seasonalAvailable}
                          className="w-full border-0 border-b border-outline-variant/40 px-0 py-1.5 text-base font-bold text-on-surface bg-transparent focus:outline-none disabled:opacity-50"
                        />
                      </div>
                    </div>
                    <p className="mt-3 text-xs leading-relaxed text-on-surface-variant">
                      This item will automatically appear in your menu during the selected date range and be hidden outside it.
                    </p>
                  </div>
                </div>
              </div>

              <div className="px-6 py-5 border-t border-outline-variant/30 flex gap-3">
                <button className="flex-1 py-3 rounded-xl border border-primary/30 text-primary font-bold hover:bg-primary-container/30 transition-colors">Cancel</button>
                <button onClick={saveChanges} className="flex-1 py-3 rounded-xl bg-primary text-white font-bold shadow-[0_10px_24px_rgba(254,60,6,0.25)] hover:brightness-95 transition-all">Save Changes</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  )
}
