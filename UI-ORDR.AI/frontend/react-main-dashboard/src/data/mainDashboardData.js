// Mock data for Main Dashboard pages

export const orderStatuses = [
  { id: 1, name: 'Pending', color: 'bg-yellow-100', textColor: 'text-yellow-900', badgeColor: 'bg-yellow-200' },
  { id: 2, name: 'Preparing', color: 'bg-blue-100', textColor: 'text-blue-900', badgeColor: 'bg-blue-200' },
  { id: 3, name: 'Ready', color: 'bg-green-100', textColor: 'text-green-900', badgeColor: 'bg-green-200' },
  { id: 4, name: 'Completed', color: 'bg-green-100', textColor: 'text-green-900', badgeColor: 'bg-green-200' },
  { id: 5, name: 'Cancelled', color: 'bg-red-100', textColor: 'text-red-900', badgeColor: 'bg-red-200' },
];

// Command Center Data
export const commandCenterData = {
  activeOrders: 4,
  activeOrdersChange: 4,
  changeTimeframe: '15 mins',
  
  kpiMetrics: [
    { id: 1, label: 'Total Orders', value: 42, icon: 'shopping_bag', trend: 12, trendUp: true },
    { id: 2, label: 'Revenue', value: '₹8,500', icon: 'currency_rupee', trend: 8, trendUp: true },
  ],
  
  revenueByDay: [
    { day: 'Mon', revenue: 5000 },
    { day: 'Tue', revenue: 6200 },
    { day: 'Wed', revenue: 4800 },
    { day: 'Thu', revenue: 7100 },
    { day: 'Fri', revenue: 8500 },
    { day: 'Sat', revenue: 9200 },
    { day: 'Sun', revenue: 7800 },
  ],
  
  ordersByHour: [
    { hour: '12:00 PM', orders: 8 },
    { hour: '1:00 PM', orders: 12 },
    { hour: '2:00 PM', orders: 9 },
    { hour: '3:00 PM', orders: 15 },
    { hour: '4:00 PM', orders: 11 },
    { hour: '5:00 PM', orders: 13 },
    { hour: '6:00 PM', orders: 18 },
  ],
  
  orders: [
    {
      id: 'ORD-001',
      customer: { name: 'Rajesh Kumar', avatar: 'RK', initials: 'RK' },
      items: 'Butter Chicken, Naan, Lassi',
      value: '₹450',
      status: 'Pending',
      time: '12:15 PM',
      delayed: true,
    },
    {
      id: 'ORD-002',
      customer: { name: 'Priya Singh', avatar: 'PS', initials: 'PS' },
      items: 'Masala Dosa, Coffee',
      value: '₹320',
      status: 'Preparing',
      time: '12:22 PM',
      delayed: false,
    },
    {
      id: 'ORD-003',
      customer: { name: 'Arun Verma', avatar: 'AV', initials: 'AV' },
      items: 'Paneer Tikka, Rice, Raita',
      value: '₹580',
      status: 'Preparing',
      time: '12:28 PM',
      delayed: false,
    },
    {
      id: 'ORD-004',
      customer: { name: 'Divya Sharma', avatar: 'DS', initials: 'DS' },
      items: 'Chole Bhature, Pickle',
      value: '₹280',
      status: 'Pending',
      time: '12:31 PM',
      delayed: false,
    },
  ],
  
  systemHealth: {
    responseTime: '234ms',
    status: 'Good',
    statusColor: 'green',
  },
  
  restaurantAcceptingOrders: true,
};

// Customer Insights Data
export const customerInsightsData = {
  // KPI metrics by period
  kpiMetricsByPeriod: {
    Week: [
      { id: 1, label: 'Total Unique', value: '12,482', trend: 12.4, trendUp: true },
      { id: 2, label: 'Net New', value: '843', trend: 5.2, trendUp: true },
      { id: 3, label: 'Returning %', value: '64.2%', trend: -2.1, trendUp: false },
      { id: 4, label: 'Regulars', value: '3,120', trend: 8.9, trendUp: true },
      { id: 5, label: 'Avg Items', value: '4.2', trend: 0.0, trendUp: false },
      { id: 6, label: 'Avg Order ₹', value: '1,840', trend: 15.2, trendUp: true },
    ],
    Month: [
      { id: 1, label: 'Total Unique', value: '48,920', trend: 22.1, trendUp: true },
      { id: 2, label: 'Net New', value: '3,240', trend: 18.5, trendUp: true },
      { id: 3, label: 'Returning %', value: '71.8%', trend: 7.6, trendUp: true },
      { id: 4, label: 'Regulars', value: '12,480', trend: 15.3, trendUp: true },
      { id: 5, label: 'Avg Items', value: '4.6', trend: 9.5, trendUp: true },
      { id: 6, label: 'Avg Order ₹', value: '2,150', trend: 16.9, trendUp: true },
    ],
    Quarter: [
      { id: 1, label: 'Total Unique', value: '142,500', trend: 35.8, trendUp: true },
      { id: 2, label: 'Net New', value: '9,820', trend: 28.3, trendUp: true },
      { id: 3, label: 'Returning %', value: '76.4%', trend: 12.2, trendUp: true },
      { id: 4, label: 'Regulars', value: '38,920', trend: 24.7, trendUp: true },
      { id: 5, label: 'Avg Items', value: '4.9', trend: 16.7, trendUp: true },
      { id: 6, label: 'Avg Order ₹', value: '2,480', trend: 22.3, trendUp: true },
    ],
    Year: [
      { id: 1, label: 'Total Unique', value: '520,340', trend: 48.2, trendUp: true },
      { id: 2, label: 'Net New', value: '38,560', trend: 42.1, trendUp: true },
      { id: 3, label: 'Returning %', value: '81.2%', trend: 17.0, trendUp: true },
      { id: 4, label: 'Regulars', value: '143,240', trend: 37.5, trendUp: true },
      { id: 5, label: 'Avg Items', value: '5.2', trend: 23.8, trendUp: true },
      { id: 6, label: 'Avg Order ₹', value: '2,840', trend: 31.2, trendUp: true },
    ],
  },

  kpiMetrics: [
    { id: 1, label: 'Total Unique', value: '12,482', trend: 12.4, trendUp: true },
    { id: 2, label: 'Net New', value: '843', trend: 5.2, trendUp: true },
    { id: 3, label: 'Returning %', value: '64.2%', trend: -2.1, trendUp: false },
    { id: 4, label: 'Regulars', value: '3,120', trend: 8.9, trendUp: true },
    { id: 5, label: 'Avg Items', value: '4.2', trend: 0.0, trendUp: false },
    { id: 6, label: 'Avg Order ₹', value: '1,840', trend: 15.2, trendUp: true },
  ],
  
  // Daily customer growth (7 days)
  customerGrowthDaily: [
    { day: 'Mon', new: 18, returning: 52 },
    { day: 'Tue', new: 22, returning: 54 },
    { day: 'Wed', new: 28, returning: 63 },
    { day: 'Thu', new: 26, returning: 57 },
    { day: 'Fri', new: 35, returning: 73 },
    { day: 'Sat', new: 31, returning: 68 },
    { day: 'Sun', new: 40, returning: 79 },
  ],

  // Weekly customer growth (4 weeks)
  customerGrowthWeekly: [
    { day: 'Wk 1', new: 145, returning: 420 },
    { day: 'Wk 2', new: 168, returning: 458 },
    { day: 'Wk 3', new: 152, returning: 445 },
    { day: 'Wk 4', new: 187, returning: 502 },
  ],

  customerGrowth: [
    { day: 'Mon', new: 18, returning: 52 },
    { day: 'Tue', new: 22, returning: 54 },
    { day: 'Wed', new: 28, returning: 63 },
    { day: 'Thu', new: 26, returning: 57 },
    { day: 'Fri', new: 35, returning: 73 },
    { day: 'Sat', new: 31, returning: 68 },
    { day: 'Sun', new: 40, returning: 79 },
  ],
  
  customerSegments: [
    { segment: 'High Value', count: 120, percentage: '9.7%', avgValue: '₹850' },
    { segment: 'Frequent', count: 280, percentage: '22.6%', avgValue: '₹520' },
    { segment: 'Regular', count: 510, percentage: '41.1%', avgValue: '₹350' },
    { segment: 'Occasional', count: 330, percentage: '26.6%', avgValue: '₹280' },
  ],
  
  customers: [
    { id: 1, initials: 'AS', name: 'Aarav Sharma', orders: 42, spent: '₹84,200', avgValue: '₹2,004', status: 'Active', lastEngagement: 'Today, 1:45 PM', lifeOrders: 42, lifeSpend: '₹899' },
    { id: 2, initials: 'PI', name: 'Priya Iyer', orders: 18, spent: '₹24,500', avgValue: '₹1,361', status: 'Active', lastEngagement: 'Yesterday, 6:10 PM', lifeOrders: 18, lifeSpend: '₹499' },
    { id: 3, initials: 'VS', name: 'Vikram Singh', orders: 2, spent: '₹3,400', avgValue: '₹1,700', status: 'New', lastEngagement: 'Today, 9:20 AM', lifeOrders: 2, lifeSpend: '₹159' },
    { id: 4, initials: 'AR', name: 'Ananya Rao', orders: 12, spent: '₹15,200', avgValue: '₹1,266', status: 'New', lastEngagement: 'Today, 11:35 AM', lifeOrders: 12, lifeSpend: '₹299' },
  ],
  
  aiInsights: [
    'Aarav usually orders for 3 people on Sunday afternoons. Suggest the "Family Weekend Bundle" to increase basket size by ~12%.',
  ],
};

// Financials Data
export const financialsData = {
  // Earnings by period
  earningsByPeriod: {
    Week: [
      { id: 1, label: 'Current Earnings', value: '₹12,450.80', icon: 'account_balance_wallet', trend: 12, trendUp: true, note: 'vs last week' },
      { id: 2, label: "Today's Revenue", value: '₹1,204.00', icon: 'payments', trend: 0, trendUp: true, note: 'Live updating' },
      { id: 3, label: 'Average Order Value', value: '₹420.50', icon: 'shopping_bag', trend: 5, trendUp: false, note: 'vs last week' },
    ],
    Month: [
      { id: 1, label: 'Current Earnings', value: '₹52,340.50', icon: 'account_balance_wallet', trend: 18, trendUp: true, note: 'vs last month' },
      { id: 2, label: "Today's Revenue", value: '₹1,840.00', icon: 'payments', trend: 0, trendUp: true, note: 'Live updating' },
      { id: 3, label: 'Average Order Value', value: '₹485.20', icon: 'shopping_bag', trend: 15, trendUp: true, note: 'vs last month' },
    ],
    Quarter: [
      { id: 1, label: 'Current Earnings', value: '₹158,920.75', icon: 'account_balance_wallet', trend: 28, trendUp: true, note: 'vs last quarter' },
      { id: 2, label: "Today's Revenue", value: '₹2,150.00', icon: 'payments', trend: 0, trendUp: true, note: 'Live updating' },
      { id: 3, label: 'Average Order Value', value: '₹520.80', icon: 'shopping_bag', trend: 22, trendUp: true, note: 'vs last quarter' },
    ],
    Year: [
      { id: 1, label: 'Current Earnings', value: '₹642,850.25', icon: 'account_balance_wallet', trend: 42, trendUp: true, note: 'vs last year' },
      { id: 2, label: "Today's Revenue", value: '₹2,420.00', icon: 'payments', trend: 0, trendUp: true, note: 'Live updating' },
      { id: 3, label: 'Average Order Value', value: '₹568.40', icon: 'shopping_bag', trend: 35, trendUp: true, note: 'vs last year' },
    ],
  },

  earnings: [
    { id: 1, label: 'Current Earnings', value: '₹12,450.80', icon: 'account_balance_wallet', trend: 12, trendUp: true, note: 'vs last month' },
    { id: 2, label: "Today's Revenue", value: '₹1,204.00', icon: 'payments', trend: 0, trendUp: true, note: 'Live updating' },
    { id: 3, label: 'Average Order Value', value: '₹420.50', icon: 'shopping_bag', trend: 5, trendUp: false, note: 'vs last week' },
  ],
  
  transactionsByDay: [
    { day: 'Mon', transactions: 18 },
    { day: 'Tue', transactions: 22 },
    { day: 'Wed', transactions: 21 },
    { day: 'Thu', transactions: 34 },
    { day: 'Fri', transactions: 28 },
    { day: 'Sat', transactions: 44 },
    { day: 'Sun', transactions: 40 },
  ],
  
  transactions: [
    { id: 'TXN-42', order: 'ORD-92834', date: 'Oct 20, 2023', txnId: 'TXN-42', amount: '₹1,450.00', status: 'Completed' },
    { id: 'TXN-38', order: 'ORD-92831', date: 'Oct 19, 2023', txnId: 'TXN-38', amount: '₹1,120.50', status: 'Completed' },
    { id: 'TXN-51', order: 'ORD-92798', date: 'Oct 18, 2023', txnId: 'TXN-51', amount: '₹2,040.20', status: 'Completed' },
  ],

  // Transactions by period
  transactionsByPeriod: {
    Week: [
      { id: 'TXN-42', order: 'ORD-92834', date: 'Oct 20, 2023', txnId: 'TXN-42', amount: '₹1,450.00', status: 'Completed' },
      { id: 'TXN-38', order: 'ORD-92831', date: 'Oct 19, 2023', txnId: 'TXN-38', amount: '₹1,120.50', status: 'Completed' },
      { id: 'TXN-51', order: 'ORD-92798', date: 'Oct 18, 2023', txnId: 'TXN-51', amount: '₹2,040.20', status: 'Completed' },
    ],
    Month: [
      { id: 'TXN-42', order: 'ORD-92834', date: 'Oct 20, 2023', txnId: 'TXN-42', amount: '₹1,450.00', status: 'Completed' },
      { id: 'TXN-38', order: 'ORD-92831', date: 'Oct 19, 2023', txnId: 'TXN-38', amount: '₹1,120.50', status: 'Completed' },
      { id: 'TXN-51', order: 'ORD-92798', date: 'Oct 18, 2023', txnId: 'TXN-51', amount: '₹2,040.20', status: 'Completed' },
      { id: 'TXN-35', order: 'ORD-92780', date: 'Oct 15, 2023', txnId: 'TXN-35', amount: '₹1,890.75', status: 'Completed' },
      { id: 'TXN-28', order: 'ORD-92750', date: 'Oct 10, 2023', txnId: 'TXN-28', amount: '₹2,310.40', status: 'Completed' },
    ],
    Quarter: [
      { id: 'TXN-42', order: 'ORD-92834', date: 'Oct 20, 2023', txnId: 'TXN-42', amount: '₹1,450.00', status: 'Completed' },
      { id: 'TXN-38', order: 'ORD-92831', date: 'Oct 19, 2023', txnId: 'TXN-38', amount: '₹1,120.50', status: 'Completed' },
      { id: 'TXN-51', order: 'ORD-92798', date: 'Oct 18, 2023', txnId: 'TXN-51', amount: '₹2,040.20', status: 'Completed' },
      { id: 'TXN-35', order: 'ORD-92780', date: 'Oct 15, 2023', txnId: 'TXN-35', amount: '₹1,890.75', status: 'Completed' },
      { id: 'TXN-28', order: 'ORD-92750', date: 'Oct 10, 2023', txnId: 'TXN-28', amount: '₹2,310.40', status: 'Completed' },
      { id: 'TXN-15', order: 'ORD-92720', date: 'Sep 28, 2023', txnId: 'TXN-15', amount: '₹1,680.90', status: 'Completed' },
      { id: 'TXN-08', order: 'ORD-92690', date: 'Sep 15, 2023', txnId: 'TXN-08', amount: '₹2,150.30', status: 'Completed' },
      { id: 'TXN-01', order: 'ORD-92660', date: 'Sep 01, 2023', txnId: 'TXN-01', amount: '₹1,920.60', status: 'Completed' },
    ],
    Year: [
      { id: 'TXN-42', order: 'ORD-92834', date: 'Oct 20, 2023', txnId: 'TXN-42', amount: '₹1,450.00', status: 'Completed' },
      { id: 'TXN-38', order: 'ORD-92831', date: 'Oct 19, 2023', txnId: 'TXN-38', amount: '₹1,120.50', status: 'Completed' },
      { id: 'TXN-51', order: 'ORD-92798', date: 'Oct 18, 2023', txnId: 'TXN-51', amount: '₹2,040.20', status: 'Completed' },
      { id: 'TXN-35', order: 'ORD-92780', date: 'Oct 15, 2023', txnId: 'TXN-35', amount: '₹1,890.75', status: 'Completed' },
      { id: 'TXN-28', order: 'ORD-92750', date: 'Oct 10, 2023', txnId: 'TXN-28', amount: '₹2,310.40', status: 'Completed' },
      { id: 'TXN-15', order: 'ORD-92720', date: 'Sep 28, 2023', txnId: 'TXN-15', amount: '₹1,680.90', status: 'Completed' },
      { id: 'TXN-08', order: 'ORD-92690', date: 'Sep 15, 2023', txnId: 'TXN-08', amount: '₹2,150.30', status: 'Completed' },
      { id: 'TXN-01', order: 'ORD-92660', date: 'Sep 01, 2023', txnId: 'TXN-01', amount: '₹1,920.60', status: 'Completed' },
      { id: 'TXN-99', order: 'ORD-92600', date: 'Aug 10, 2023', txnId: 'TXN-99', amount: '₹2,480.50', status: 'Completed' },
      { id: 'TXN-88', order: 'ORD-92550', date: 'Jul 22, 2023', txnId: 'TXN-88', amount: '₹1,750.20', status: 'Completed' },
    ],
  },
  
  paymentBreakdown: [
    { method: 'UPI', percentage: 45, amount: '₹18,500' },
    { method: 'Credit/Debit Card', percentage: 32, amount: '₹13,100' },
    { method: 'Wallet', percentage: 18, amount: '₹7,400' },
    { method: 'Cash', percentage: 5, amount: '₹2,050' },
  ],
};

// Food Insights Data
export const foodInsightsData = {
  // KPI metrics by period
  kpiMetricsByPeriod: {
    Week: [
      { id: 1, label: 'Total Orders', value: '1,284', trend: 12.4, trendUp: true },
      { id: 2, label: 'Gross Revenue', value: '₹425k', trend: 8.1, trendUp: true },
      { id: 3, label: 'Most Ordered', value: 'Paneer Tikka', trend: 0, trendUp: true },
      { id: 4, label: 'Avg. Prep Time', value: '14.2m', trend: -2.1, trendUp: false },
      { id: 5, label: 'Top Value Order', value: '₹12,450', trend: 0, trendUp: true },
    ],
    Month: [
      { id: 1, label: 'Total Orders', value: '5,480', trend: 18.2, trendUp: true },
      { id: 2, label: 'Gross Revenue', value: '₹1,842k', trend: 15.3, trendUp: true },
      { id: 3, label: 'Most Ordered', value: 'Paneer Tikka', trend: 0, trendUp: true },
      { id: 4, label: 'Avg. Prep Time', value: '13.8m', trend: -4.2, trendUp: false },
      { id: 5, label: 'Top Value Order', value: '₹15,200', trend: 0, trendUp: true },
    ],
    Quarter: [
      { id: 1, label: 'Total Orders', value: '16,240', trend: 28.5, trendUp: true },
      { id: 2, label: 'Gross Revenue', value: '₹5,628k', trend: 22.7, trendUp: true },
      { id: 3, label: 'Most Ordered', value: 'Paneer Tikka', trend: 0, trendUp: true },
      { id: 4, label: 'Avg. Prep Time', value: '13.5m', trend: -6.1, trendUp: false },
      { id: 5, label: 'Top Value Order', value: '₹18,900', trend: 0, trendUp: true },
    ],
  },

  kpiMetrics: [
    { id: 1, label: 'Total Orders', value: '1,284', trend: 12.4, trendUp: true },
    { id: 2, label: 'Gross Revenue', value: '₹425k', trend: 8.1, trendUp: true },
    { id: 3, label: 'Most Ordered', value: 'Paneer Tikka', trend: 0, trendUp: true },
    { id: 4, label: 'Avg. Prep Time', value: '14.2m', trend: -2.1, trendUp: false },
    { id: 5, label: 'Top Value Order', value: '₹12,450', trend: 0, trendUp: true },
  ],
  
  topItems: [
    { rank: 1, name: 'Spicy Paneer Tikka', orders: 342, delta: 14, rating: 4.8 },
    { rank: 2, name: 'Truffle Mushroom Pasta', orders: 298, delta: 9, rating: 4.7 },
    { rank: 3, name: 'Classic Butter Chicken', orders: 275, delta: -2, rating: 4.5 },
    { rank: 4, name: 'Garlic Naan Basket', orders: 241, delta: 22, rating: 4.6 },
    { rank: 5, name: 'Signature Cold Brew', orders: 198, delta: 5, rating: 4.4 },
  ],
  
  itemGrowth: [
    { day: 'Mon', newItems: 12, bestSellers: 24 },
    { day: 'Tue', newItems: 16, bestSellers: 28 },
    { day: 'Wed', newItems: 24, bestSellers: 48 },
    { day: 'Thu', newItems: 32, bestSellers: 64 },
    { day: 'Fri', newItems: 22, bestSellers: 36 },
    { day: 'Sat', newItems: 28, bestSellers: 56 },
    { day: 'Sun', newItems: 26, bestSellers: 52 },
  ],
  
  menuPerformance: [
    { id: 1, name: 'Paneer Tikka', category: 'Appetizers', orders: 1420, revenue: '₹284,000', rating: 4.8, status: 'Standard' },
    { id: 2, name: 'Avocado Toast', category: 'Beverage', orders: 842, revenue: '₹168,400', rating: 4.2, status: 'Breakfast' },
    { id: 3, name: 'Quinoa Salad', category: 'Main Course', orders: 142, revenue: '₹42,600', rating: 3.1, status: 'Snacks' },
  ],
  
  aiInsights: [
    'Paneer Tikka orders increased by 12% on weekends when paired with Garlic Naan. Consider a combo deal to boost average ticket size by ~15%.',
  ],
};

// Menu Management Data
export const menuManagementData = {
  menuItems: [
    {
      id: 1,
      name: 'Butter Chicken',
      category: 'Main Course',
      price: 250,
      status: true,
      tags: ['Non-Veg', 'Spicy'],
      available: true,
      timeBasedAvailability: ['Standard', 'Lunch', 'Dinner'],
      seasonalAvailable: false,
      seasonalDates: { start: '', end: '' },
    },
    {
      id: 2,
      name: 'Masala Dosa',
      category: 'Breakfast',
      price: 120,
      status: true,
      tags: ['Veg', 'Breakfast'],
      available: true,
      timeBasedAvailability: ['Breakfast'],
      seasonalAvailable: false,
      seasonalDates: { start: '', end: '' },
    },
    {
      id: 3,
      name: 'Paneer Tikka',
      category: 'Appetizers',
      price: 200,
      status: true,
      tags: ['Veg', 'Appetizer'],
      available: true,
      timeBasedAvailability: ['Standard', 'Lunch', 'Dinner'],
      seasonalAvailable: false,
      seasonalDates: { start: '', end: '' },
    },
    {
      id: 4,
      name: 'Naan',
      category: 'Bread',
      price: 40,
      status: true,
      tags: ['Veg', 'Bread'],
      available: true,
      timeBasedAvailability: ['Lunch', 'Dinner'],
      seasonalAvailable: false,
      seasonalDates: { start: '', end: '' },
    },
    {
      id: 5,
      name: 'Chole Bhature',
      category: 'Main Course',
      price: 150,
      status: true,
      tags: ['Veg', 'Lunch Special'],
      available: true,
      timeBasedAvailability: ['Standard', 'Lunch'],
      seasonalAvailable: false,
      seasonalDates: { start: '', end: '' },
    },
  ],
  
  categories: ['Main Course', 'Appetizers', 'Bread', 'Breakfast', 'Desserts', 'Beverages'],
  
  timeSlots: [
    { id: 'breakfast', label: 'Breakfast', time: '7:00 AM - 11:00 AM' },
    { id: 'lunch', label: 'Lunch', time: '11:00 AM - 4:00 PM' },
    { id: 'snacks', label: 'Snacks', time: '4:00 PM - 6:00 PM' },
    { id: 'dinner', label: 'Dinner', time: '6:00 PM - 11:00 PM' },
    { id: 'standard', label: 'Standard', time: 'All day' },
  ],
};

// Outlet Settings Data
export const outletSettingsData = {
  profileHealth: 85,
  whatsappConnected: true,
  systemStatus: 'Operational',
  acceptingOrders: true,
  
  statusCards: [
    { id: 1, label: 'Profile Health', value: 85, icon: 'health_and_safety', type: 'progress' },
    { id: 2, label: 'WhatsApp', value: 'Connected', icon: 'check_circle', type: 'status', connected: true },
    { id: 3, label: 'System Status', value: 'Operational', icon: 'info', type: 'badge' },
    { id: 4, label: 'Restaurant Status', value: 'Accepting Orders', icon: 'storefront', type: 'toggle' },
  ],
  
  tabs: [
    { id: 'restaurant-info', label: 'Restaurant Info' },
    { id: 'delivery-setup', label: 'Delivery Setup' },
    { id: 'operating-hours', label: 'Operating Hours' },
    { id: 'messaging', label: 'Messaging' },
    { id: 'system-health', label: 'System Health' },
  ],
  
  restaurantInfo: {
    name: 'Taste of India',
    type: 'Restaurant',
    cuisines: ['North Indian', 'South Indian', 'Continental'],
  },
  
  contact: {
    phone: '+91 98765 43210',
    email: 'info@tasteofindia.com',
    escalationEmail: 'escalation@tasteofindia.com',
    whatsapp: '+91 98765 43210',
  },
  
  location: {
    address: '123 Main Street, Food Complex\nNew Delhi, Delhi 110001\nIndia',
    latitude: 28.6139,
    longitude: 77.2090,
  },
  
  operational: {
    prepTime: 20,
    deliveryRadius: 5,
    fssaiLicense: 'FSSAI/2025/123456',
    gstNumber: '27ABCDE1234F2Z0',
  },
  
  operatingHours: [
    { day: 'Monday', open: '10:00 AM', close: '11:00 PM', closed: false },
    { day: 'Tuesday', open: '10:00 AM', close: '11:00 PM', closed: false },
    { day: 'Wednesday', open: '10:00 AM', close: '11:00 PM', closed: false },
    { day: 'Thursday', open: '10:00 AM', close: '11:00 PM', closed: false },
    { day: 'Friday', open: '10:00 AM', close: '11:30 PM', closed: false },
    { day: 'Saturday', open: '10:00 AM', close: '11:30 PM', closed: false },
    { day: 'Sunday', open: '12:00 PM', close: '11:00 PM', closed: false },
  ],
};

// Navigation configuration
export const navigationItems = [
  { id: 'command-center', label: 'Command Center', icon: 'dashboard' },
  { id: 'menu-management', label: 'Menu Management', icon: 'menu_book' },
  { id: 'customer-insights', label: 'Customer Insights', icon: 'people' },
  { id: 'food-insights', label: 'Food Insights', icon: 'restaurant' },
  { id: 'financials', label: 'Financials', icon: 'account_balance' },
  { id: 'logistic-insights', label: 'Logistic Insights', icon: 'local_shipping' },
  { id: 'outlet-settings', label: 'Outlet Settings', icon: 'settings' },
];
