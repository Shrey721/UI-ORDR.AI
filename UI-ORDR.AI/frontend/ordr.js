(function () {
  const data = {
    navigationItems: [
      { id: 'command-center', label: 'Command Center', icon: 'dashboard' },
      { id: 'menu-management', label: 'Menu Management', icon: 'menu_book' },
      { id: 'customer-insights', label: 'Customer Insights', icon: 'people' },
      { id: 'food-insights', label: 'Food Insights', icon: 'restaurant' },
      { id: 'financials', label: 'Financials', icon: 'account_balance' },
      { id: 'logistic-insights', label: 'Logistic Insights', icon: 'local_shipping' },
      { id: 'outlet-settings', label: 'Outlet Settings', icon: 'settings' }
    ],
    commandCenterData: {
      activeOrders: 4,
      activeOrdersChange: 4,
      changeTimeframe: '15 mins',
      restaurantAcceptingOrders: true,
      orders: [
        { id: 'ORD-001', customer: { name: 'Rajesh Kumar', initials: 'RK' }, items: 'Butter Chicken, Naan, Lassi', value: '₹450', status: 'Pending', time: '12:15 PM', delayed: true },
        { id: 'ORD-002', customer: { name: 'Priya Singh', initials: 'PS' }, items: 'Masala Dosa, Coffee', value: '₹320', status: 'Preparing', time: '12:22 PM', delayed: false },
        { id: 'ORD-003', customer: { name: 'Arun Verma', initials: 'AV' }, items: 'Paneer Tikka, Rice, Raita', value: '₹580', status: 'Preparing', time: '12:28 PM', delayed: false },
        { id: 'ORD-004', customer: { name: 'Divya Sharma', initials: 'DS' }, items: 'Chole Bhature, Pickle', value: '₹280', status: 'Pending', time: '12:31 PM', delayed: false }
      ],
      systemHealth: { responseTime: '234ms', status: 'Good' }
    },
    customerInsightsData: {
      kpiMetricsByPeriod: {
        Week: [
          { id: 1, label: 'Total Unique', value: '12,482', trend: 12.4, trendUp: true },
          { id: 2, label: 'Net New', value: '843', trend: 5.2, trendUp: true },
          { id: 3, label: 'Returning %', value: '64.2%', trend: -2.1, trendUp: false },
          { id: 4, label: 'Regulars', value: '3,120', trend: 8.9, trendUp: true },
          { id: 5, label: 'Avg Items', value: '4.2', trend: 0.0, trendUp: false },
          { id: 6, label: 'Avg Order ₹', value: '1,840', trend: 15.2, trendUp: true }
        ],
... (file truncated for brevity) ...
  window.addEventListener('hashchange', syncPageFromHash);

  syncPageFromHash();
})();
