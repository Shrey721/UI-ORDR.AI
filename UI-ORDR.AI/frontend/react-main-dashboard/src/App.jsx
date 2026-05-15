import React, { useState } from 'react'
import Sidebar from './components/layout/Sidebar'
import Topbar from './components/layout/Topbar'
import CommandCenter from './pages/CommandCenter'
import CustomerInsights from './pages/CustomerInsights'
import Financials from './pages/Financials'
import FoodInsights from './pages/FoodInsights'
import MenuManagement from './pages/MenuManagement'
import LogisticInsights from './pages/LogisticInsights'
import OutletSettings from './pages/OutletSettings'

export default function App() {
  const [currentPage, setCurrentPage] = useState('command-center')
  const [searchQuery, setSearchQuery] = useState('')
  const [acceptingOrders, setAcceptingOrders] = useState(true)

  const renderPage = () => {
    switch (currentPage) {
      case 'command-center':
        return <CommandCenter searchQuery={searchQuery} />
      case 'customer-insights':
        return <CustomerInsights searchQuery={searchQuery} />
      case 'financials':
        return <Financials searchQuery={searchQuery} />
      case 'logistic-insights':
        return <LogisticInsights searchQuery={searchQuery} />
      case 'food-insights':
        return <FoodInsights searchQuery={searchQuery} />
      case 'menu-management':
        return <MenuManagement searchQuery={searchQuery} />
      case 'outlet-settings':
        return <OutletSettings searchQuery={searchQuery} />
      default:
        return <CommandCenter searchQuery={searchQuery} />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
      <Topbar
        onSearch={setSearchQuery}
        acceptingOrders={acceptingOrders}
        onToggleAcceptingOrders={() => setAcceptingOrders((current) => !current)}
      />
      {renderPage()}
    </div>
  )
}
