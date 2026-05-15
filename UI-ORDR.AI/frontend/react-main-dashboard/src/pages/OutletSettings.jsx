import React, { useState } from 'react'
import PageLayout from '../components/layout/PageLayout'
import Icon from '../components/Icon'
import { outletSettingsData } from '../data/mainDashboardData'

export default function OutletSettings() {
  const [activeTab, setActiveTab] = useState('restaurant-info')
  const [formData, setFormData] = useState({
    restaurantName: 'Royal Spice Kitchen',
    restaurantType: 'Premium Bistro',
    cuisines: ['North Indian', 'Mughlai', 'Kebabs'],
    phone: '+91 80 4965 1234',
    email: 'contact@royalspiceblr.com',
    escalationPhone: '+91 98860 12345',
    whatsappPhone: '+91 80 4965 1234',
    address: '772, 100 Feet Rd, HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka 560038, India',
    prepTime: 30,
    deliveryRadius: 6,
    fssaiLicense: '',
    gstNumber: '29AAAAA0000A1Z5',
    acceptingOrders: true,
  })

  const [newCuisine, setNewCuisine] = useState('')
  const [saved, setSaved] = useState(false)

  const tabs = outletSettingsData.tabs

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const addCuisine = () => {
    const normalized = newCuisine.trim()
    if (!normalized) return
    if (formData.cuisines.includes(normalized)) return
    setFormData((prev) => ({ ...prev, cuisines: [...prev.cuisines, normalized] }))
    setNewCuisine('')
  }

  const removeCuisine = (name) => {
    setFormData((prev) => ({ ...prev, cuisines: prev.cuisines.filter((item) => item !== name) }))
  }

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2200)
  }

  return (
    <PageLayout
      title="Outlet Profile & Settings"
      subtitle="Manage restaurant details, operations, messaging, and health"
      action={
        <div className="flex items-center gap-3">
          {saved && (
            <span className="text-xs font-bold text-secondary bg-secondary-container px-3 py-2 rounded-lg">
              Saved
            </span>
          )}
          <button
            onClick={handleSave}
            className="px-7 py-3 bg-primary text-white rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:brightness-95 transition-all flex items-center gap-2"
          >
            <Icon name="save" size={18} />
            Save Changes
          </button>
        </div>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        <div className="bg-white rounded-xl border border-outline-variant/40 p-5 flex items-center gap-4">
          <div className="relative w-14 h-14 shrink-0">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="44" fill="none" stroke="#f0f0f0" strokeWidth="8" />
              <circle
                cx="50"
                cy="50"
                r="44"
                fill="none"
                stroke="#FE3C06"
                strokeWidth="8"
                strokeDasharray="276"
                strokeDashoffset="55"
                strokeLinecap="round"
              />
            </svg>
            <span className="absolute inset-0 text-[11px] font-extrabold flex items-center justify-center">80%</span>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-on-surface-variant/70 font-extrabold">Profile Health</p>
            <p className="text-lg font-black text-on-surface leading-tight">Pending GST</p>
            <p className="text-[11px] font-bold text-primary">Add FSSAI Details</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-outline-variant/40 p-5 flex items-center gap-4">
          <div className="w-11 h-11 rounded-full bg-primary-container flex items-center justify-center text-primary">
            <Icon name="chat" size={20} />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-on-surface-variant/70 font-extrabold">WhatsApp API</p>
            <div className="flex items-center gap-2">
              <p className="text-xl font-black">Connected</p>
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            </div>
            <p className="text-[11px] text-on-surface-variant">Active since 12d</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-outline-variant/40 p-5 flex items-center gap-4">
          <div className="w-11 h-11 rounded-full bg-[#eaf2ff] flex items-center justify-center text-[#4b6cb7]">
            <Icon name="sensors" size={20} />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-on-surface-variant/70 font-extrabold">System Status</p>
            <span className="inline-flex mt-1 text-[10px] px-2 py-0.5 rounded-full bg-[#eaf2ff] text-[#4b6cb7] font-extrabold">ONLINE</span>
            <p className="text-[11px] text-on-surface-variant mt-1">v2.4.1 (Bangalore-1)</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-outline-variant/40 p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <p className="text-[10px] uppercase tracking-widest text-on-surface-variant/70 font-extrabold">Restaurant Status</p>
            <button
              onClick={() => handleChange('acceptingOrders', !formData.acceptingOrders)}
              className={`w-11 h-6 rounded-full p-0.5 transition-all ${formData.acceptingOrders ? 'bg-primary' : 'bg-outline-variant'}`}
              aria-label="Toggle restaurant status"
            >
              <span className={`h-5 w-5 block rounded-full bg-white transition-all ${formData.acceptingOrders ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
          </div>
          <div className="mt-4">
            <p className="text-lg font-black text-primary">{formData.acceptingOrders ? 'Live & Open' : 'Temporarily Closed'}</p>
            <p className="text-[11px] text-on-surface-variant">Closes at 11:30 PM IST</p>
          </div>
        </div>
      </div>

      <div className="flex gap-8 mb-8 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-3 text-sm font-bold whitespace-nowrap border-b-2 transition-colors ${activeTab === tab.id ? 'text-primary border-primary' : 'text-on-surface-variant border-transparent hover:text-on-surface'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'restaurant-info' && (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 space-y-6">
            <section className="bg-white rounded-xl border border-outline-variant/40 p-7">
              <h3 className="text-xl font-black mb-6 flex items-center gap-2">
                <Icon name="storefront" size={20} className="text-primary" />
                Business Identity
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[11px] uppercase tracking-widest text-on-surface-variant/70 font-extrabold mb-2">Restaurant Name</label>
                  <input
                    value={formData.restaurantName}
                    onChange={(event) => handleChange('restaurantName', event.target.value)}
                    className="w-full bg-surface-container-low border-0 rounded-lg px-4 py-3 text-sm font-semibold text-on-surface focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-widest text-on-surface-variant/70 font-extrabold mb-2">Establishment Type</label>
                  <select
                    value={formData.restaurantType}
                    onChange={(event) => handleChange('restaurantType', event.target.value)}
                    className="w-full bg-surface-container-low border-0 rounded-lg px-4 py-3 text-sm font-semibold text-on-surface focus:ring-2 focus:ring-primary/20"
                  >
                    <option>Premium Bistro</option>
                    <option>Fine Dining</option>
                    <option>Cloud Kitchen</option>
                    <option>Cafe</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-[11px] uppercase tracking-widest text-on-surface-variant/70 font-extrabold mb-2">Cuisine Tags</label>
                  <div className="flex flex-wrap gap-2">
                    {formData.cuisines.map((cuisine) => (
                      <span key={cuisine} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center gap-1">
                        {cuisine}
                        <button onClick={() => removeCuisine(cuisine)} aria-label={`Remove ${cuisine}`}>
                          <Icon name="close" size={14} />
                        </button>
                      </span>
                    ))}
                    <div className="flex items-center gap-2">
                      <input
                        value={newCuisine}
                        onChange={(event) => setNewCuisine(event.target.value)}
                        onKeyDown={(event) => event.key === 'Enter' && addCuisine()}
                        placeholder="Add New"
                        className="w-28 bg-surface-container-low border-0 rounded-lg px-3 py-1.5 text-xs font-semibold focus:ring-2 focus:ring-primary/20"
                      />
                      <button
                        onClick={addCuisine}
                        className="px-3 py-1.5 border border-outline-variant rounded-lg text-xs font-bold text-on-surface-variant hover:border-primary hover:text-primary"
                      >
                        + Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-xl border border-outline-variant/40 p-7">
              <h3 className="text-xl font-black mb-6 flex items-center gap-2">
                <Icon name="contact_support" size={20} className="text-primary" />
                Contact & Communication
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[11px] uppercase tracking-widest text-on-surface-variant/70 font-extrabold mb-2">Business Phone</label>
                  <input
                    value={formData.phone}
                    onChange={(event) => handleChange('phone', event.target.value)}
                    className="w-full bg-surface-container-low border-0 rounded-lg px-4 py-3 text-sm font-semibold focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-widest text-on-surface-variant/70 font-extrabold mb-2">Business Email</label>
                  <input
                    value={formData.email}
                    onChange={(event) => handleChange('email', event.target.value)}
                    className="w-full bg-surface-container-low border-0 rounded-lg px-4 py-3 text-sm font-semibold focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-widest text-on-surface-variant/70 font-extrabold mb-2">Escalation Number</label>
                  <input
                    value={formData.escalationPhone}
                    onChange={(event) => handleChange('escalationPhone', event.target.value)}
                    className="w-full bg-surface-container-low border-0 rounded-lg px-4 py-3 text-sm font-semibold focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-widest text-on-surface-variant/70 font-extrabold mb-2">WhatsApp Business Number</label>
                  <div className="flex gap-2">
                    <input
                      disabled
                      value={formData.whatsappPhone}
                      className="flex-1 bg-surface-container-low border-0 rounded-lg px-4 py-3 text-sm font-semibold opacity-70"
                    />
                    <button className="px-4 py-3 rounded-lg text-xs font-bold bg-surface-container-low text-primary hover:bg-primary/10">
                      Reconnect
                    </button>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-xl border border-outline-variant/40 p-7">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-black flex items-center gap-2">
                  <Icon name="location_on" size={20} className="text-primary" />
                  Location Details
                </h3>
                <button className="text-xs font-bold text-primary flex items-center gap-1 hover:underline">
                  <Icon name="edit_location" size={16} />
                  Update Pin
                </button>
              </div>
              <label className="block text-[11px] uppercase tracking-widest text-on-surface-variant/70 font-extrabold mb-2">Full Address</label>
              <textarea
                rows={2}
                value={formData.address}
                onChange={(event) => handleChange('address', event.target.value)}
                className="w-full bg-surface-container-low border-0 rounded-lg px-4 py-3 text-sm font-semibold resize-none focus:ring-2 focus:ring-primary/20"
              />
              <div className="mt-6 h-48 rounded-xl overflow-hidden bg-gradient-to-br from-[#0f4d48] via-[#0a6f6b] to-[#0f4d48] relative">
                <div className="absolute inset-0 opacity-25" style={{ backgroundImage: 'radial-gradient(circle at 20% 30%, #ffffff 2px, transparent 2px), radial-gradient(circle at 70% 60%, #ffffff 2px, transparent 2px)', backgroundSize: '80px 80px' }} />
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-[#1db9aa] text-white flex items-center justify-center shadow-lg">
                  <Icon name="location_on" size={30} />
                </div>
              </div>
            </section>
          </div>

          <div className="space-y-6">
            <section className="bg-white rounded-xl border border-outline-variant/40 p-7">
              <h3 className="text-xl font-black mb-6">Operational Prep & Delivery</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-[11px] uppercase tracking-widest text-on-surface-variant/70 font-extrabold mb-2">Default Prep Time (Mins)</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min="5"
                      max="60"
                      value={formData.prepTime}
                      onChange={(event) => handleChange('prepTime', Number(event.target.value))}
                      className="w-full accent-primary"
                    />
                    <span className="text-sm font-black text-primary w-10">{formData.prepTime}m</span>
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-widest text-on-surface-variant/70 font-extrabold mb-2">Delivery Radius (KM)</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min="1"
                      max="15"
                      value={formData.deliveryRadius}
                      onChange={(event) => handleChange('deliveryRadius', Number(event.target.value))}
                      className="w-full accent-primary"
                    />
                    <span className="text-sm font-black text-primary w-10">{formData.deliveryRadius}km</span>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-xl border border-outline-variant/40 p-7">
              <h3 className="text-xl font-black mb-6 flex items-center gap-2">
                <Icon name="verified_user" size={20} className="text-primary" />
                Compliance
              </h3>
              <div className="space-y-5">
                <div>
                  <label className="block text-[11px] uppercase tracking-widest text-on-surface-variant/70 font-extrabold mb-2">FSSAI License Number</label>
                  <div className="relative">
                    <input
                      placeholder="Required"
                      value={formData.fssaiLicense}
                      onChange={(event) => handleChange('fssaiLicense', event.target.value)}
                      className="w-full bg-surface-container-low border-0 rounded-lg px-4 py-3 pr-10 text-sm font-semibold placeholder:text-red-500/70 focus:ring-2 focus:ring-primary/20"
                    />
                    <Icon name="info" size={16} className="text-red-600 absolute right-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-widest text-on-surface-variant/70 font-extrabold mb-2">GSTIN / PAN Number</label>
                  <input
                    value={formData.gstNumber}
                    onChange={(event) => handleChange('gstNumber', event.target.value.toUpperCase())}
                    className="w-full bg-surface-container-low border-0 rounded-lg px-4 py-3 text-sm font-semibold uppercase focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div className="p-4 bg-red-50 rounded-lg flex gap-2">
                  <Icon name="warning" size={18} className="text-red-700 flex-shrink-0 mt-0.5" />
                  <p className="text-[11px] text-red-700 font-medium leading-relaxed">
                    FSSAI and GST details are mandatory for payout processing to Indian bank accounts.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      )}

      {activeTab === 'delivery-setup' && (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <section className="xl:col-span-2 bg-white rounded-xl border border-outline-variant/40 p-7">
            <h3 className="text-xl font-black mb-6">Delivery Setup</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[11px] uppercase tracking-widest text-on-surface-variant/70 font-extrabold mb-2">Default Prep Time (Mins)</label>
                <div className="flex items-center gap-3">
                  <input type="range" min="5" max="60" value={formData.prepTime} onChange={(event) => handleChange('prepTime', Number(event.target.value))} className="w-full accent-primary" />
                  <span className="text-sm font-black text-primary w-10">{formData.prepTime}m</span>
                </div>
              </div>
              <div>
                <label className="block text-[11px] uppercase tracking-widest text-on-surface-variant/70 font-extrabold mb-2">Delivery Radius (KM)</label>
                <div className="flex items-center gap-3">
                  <input type="range" min="1" max="15" value={formData.deliveryRadius} onChange={(event) => handleChange('deliveryRadius', Number(event.target.value))} className="w-full accent-primary" />
                  <span className="text-sm font-black text-primary w-12">{formData.deliveryRadius}km</span>
                </div>
              </div>
              <div>
                <label className="block text-[11px] uppercase tracking-widest text-on-surface-variant/70 font-extrabold mb-2">Order Cutoff Time</label>
                <input className="w-full bg-surface-container-low rounded-lg border-0 px-4 py-3 text-sm font-semibold" defaultValue="11:00 PM" />
              </div>
              <div>
                <label className="block text-[11px] uppercase tracking-widest text-on-surface-variant/70 font-extrabold mb-2">Packaging Time Buffer</label>
                <input className="w-full bg-surface-container-low rounded-lg border-0 px-4 py-3 text-sm font-semibold" defaultValue="8 mins" />
              </div>
            </div>
          </section>
          <section className="bg-white rounded-xl border border-outline-variant/40 p-7">
            <h3 className="text-xl font-black mb-4">Dispatch Policy</h3>
            <div className="space-y-3 text-sm text-on-surface-variant">
              <p>Auto-assign delivery partner: Enabled</p>
              <p>Prioritize nearby riders: Enabled</p>
              <p>Escalate after 7 minutes delay</p>
            </div>
          </section>
        </div>
      )}

      {activeTab === 'operating-hours' && (
        <section className="bg-white rounded-xl border border-outline-variant/40 p-7">
          <h3 className="text-xl font-black mb-6">Operating Hours</h3>
          <div className="space-y-3">
            {outletSettingsData.operatingHours.map((day) => (
              <div key={day.day} className="grid grid-cols-1 md:grid-cols-4 gap-3 items-center bg-surface-container-low rounded-lg px-4 py-3">
                <p className="font-bold text-on-surface">{day.day}</p>
                <input className="bg-white rounded-lg px-3 py-2 text-sm border-0" defaultValue={day.open} />
                <input className="bg-white rounded-lg px-3 py-2 text-sm border-0" defaultValue={day.close} />
                <button className={`justify-self-start px-3 py-1 rounded-full text-xs font-bold ${day.closed ? 'bg-[#f4e9e6] text-on-surface-variant' : 'bg-[#d3f2d9] text-[#0a8a3a]'}`}>
                  {day.closed ? 'Closed' : 'Open'}
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {activeTab === 'messaging' && (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <section className="xl:col-span-2 bg-white rounded-xl border border-outline-variant/40 p-7">
            <h3 className="text-xl font-black mb-6">Messaging</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-[11px] uppercase tracking-widest text-on-surface-variant/70 font-extrabold mb-2">WhatsApp Business Number</label>
                <input value={formData.whatsappPhone} onChange={(event) => handleChange('whatsappPhone', event.target.value)} className="w-full bg-surface-container-low border-0 rounded-lg px-4 py-3 text-sm font-semibold" />
              </div>
              <div>
                <label className="block text-[11px] uppercase tracking-widest text-on-surface-variant/70 font-extrabold mb-2">Escalation Number</label>
                <input value={formData.escalationPhone} onChange={(event) => handleChange('escalationPhone', event.target.value)} className="w-full bg-surface-container-low border-0 rounded-lg px-4 py-3 text-sm font-semibold" />
              </div>
            </div>
          </section>
          <section className="bg-white rounded-xl border border-outline-variant/40 p-7">
            <h3 className="text-xl font-black mb-4">Connection Health</h3>
            <div className="space-y-3 text-sm text-on-surface-variant">
              <p>Webhook: Active</p>
              <p>Provider: MSG91</p>
              <p>Last sync: 2 mins ago</p>
            </div>
          </section>
        </div>
      )}

      {activeTab === 'system-health' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <section className="bg-white rounded-xl border border-outline-variant/40 p-7">
            <h3 className="text-xl font-black mb-6">Live Service Status</h3>
            <div className="space-y-3">
              {[
                ['Order API', 'Operational'],
                ['Database', 'Connected'],
                ['Payment Gateway', 'Operational'],
                ['Notification Service', 'Operational'],
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between bg-surface-container-low rounded-lg px-4 py-3">
                  <span className="font-semibold text-on-surface">{label}</span>
                  <span className="text-xs font-bold px-2 py-1 rounded-full bg-[#d3f2d9] text-[#0a8a3a]">{value}</span>
                </div>
              ))}
            </div>
          </section>
          <section className="bg-white rounded-xl border border-outline-variant/40 p-7">
            <h3 className="text-xl font-black mb-6">System Alerts</h3>
            <div className="p-4 bg-red-50 rounded-lg flex gap-2 mb-3">
              <Icon name="warning" size={18} className="text-red-700 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-red-700 font-medium">FSSAI details missing. Payouts may be delayed.</p>
            </div>
            <div className="p-4 bg-[#fff8e8] rounded-lg flex gap-2">
              <Icon name="info" size={18} className="text-[#8d5a00] flex-shrink-0 mt-0.5" />
              <p className="text-xs text-[#8d5a00] font-medium">Delivery radius exceeds area coverage during peak hours.</p>
            </div>
          </section>
        </div>
      )}
    </PageLayout>
  )
}
