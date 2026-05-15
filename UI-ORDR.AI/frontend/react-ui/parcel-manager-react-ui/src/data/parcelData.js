export const parcelNavItems = [
  { id: "dashboard", label: "Live Orders", icon: "description" },
  { id: "packing", label: "Kitchen / Packing", icon: "assignment_late" },
  { id: "transit", label: "In Transit", icon: "local_shipping" },
  { id: "inventory", label: "Inventory", icon: "inventory_2" }
];

export const prepTally = [
  { item: "Paneer Tikka", count: 2 },
  { item: "Butter Naan", count: 1 },
  { item: "Dal Makhani", count: 1 },
  { item: "Garlic Naan", count: 2 }
];

export const liveOrders = [
  {
    id: "ORD-1024",
    customer: "Riya Sharma",
    channel: "WhatsApp",
    status: "New",
    eta: "18 min",
    total: "ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¹640",
    items: ["Paneer Tikka", "Butter Naan x2", "Mint Chutney"],
    priority: "High"
  },
  {
    id: "ORD-1025",
    customer: "Aman Verma",
    channel: "Instagram",
    status: "Confirmed",
    eta: "24 min",
    total: "ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¹420",
    items: ["Dal Makhani", "Garlic Naan x2"],
    priority: "Normal"
  },
  {
    id: "ORD-1026",
    customer: "Sara Khan",
    channel: "WhatsApp",
    status: "Payment Pending",
    eta: "32 min",
    total: "ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¹890",
    items: ["Veg Biryani", "Raita", "Gulab Jamun"],
    priority: "Normal"
  }
];

export const packingJobs = [
  { id: "#ORD-9021", delayed: true, elapsed: "24 mins (Time Up)", progress: 100, items: ["2x Paneer Tikka", "1x Butter Naan"], addOns: "Extra Chutney" },
  { id: "#ORD-9024", delayed: false, elapsed: "12 mins", packBy: "09:18", progress: 65, items: ["1x Dal Makhani", "2x Garlic Naan"] },
  { id: "#ORD-9025", delayed: false, elapsed: "8 mins", packBy: "09:22", progress: 45, items: ["3x Vada Pav Combo", "1x Masala Chai"] },
  { id: "#ORD-9026", delayed: true, elapsed: "21 mins (Time Up)", progress: 100, items: ["1x Paneer Butter Masala", "4x Tandoori Roti"] },
  { id: "#ORD-9027", delayed: false, elapsed: "15 mins", packBy: "09:30", progress: 55, items: ["2x Veg Biryani (Large)", "1x Raita", "1x Salan"] },
  { id: "#ORD-9028", delayed: false, elapsed: "5 mins", packBy: "09:35", progress: 35, items: ["1x Chole Bhature", "1x Lassi (Sweet)"] },
  { id: "#ORD-9030", delayed: true, elapsed: "20 mins (Time Up)", progress: 100, items: ["1x Malai Kofta", "2x Garlic Naan"] },
  { id: "#ORD-9029", delayed: false, elapsed: "10 mins", packBy: "09:42", progress: 50, items: ["1x Kadai Paneer", "3x Butter Kulcha"] },
  { id: "#ORD-9031", delayed: false, elapsed: "4 mins", packBy: "09:45", progress: 30, items: ["2x Pav Bhaji", "2x Masala Soda"] }
];

export const transitParcels = [
  { id: "#ORD-9020", dispatchedAt: "08:50", items: ["2x Poha", "2x Jalebi"] },
  { id: "#ORD-9021", dispatchedAt: "08:55", items: ["1x Masala Dosa", "1x Filter Coffee"] },
  { id: "#ORD-9022", dispatchedAt: "09:02", items: ["3x Samosa Pav", "1x Ginger Tea"] },
  { id: "#ORD-9023", dispatchedAt: "09:10", items: ["2x Paneer Paratha", "1x Curd"] },
  { id: "#ORD-9024", dispatchedAt: "09:15", items: ["1x Chole Bhature", "1x Sweet Lassi"] },
  { id: "#ORD-9025", dispatchedAt: "09:22", items: ["2x Vada Pav", "1x Kokum Sherbet"] },
  { id: "#ORD-9026", dispatchedAt: "09:30", items: ["1x Idli Sambhar", "1x Medu Vada"] },
  { id: "#ORD-9027", dispatchedAt: "09:35", items: ["2x Misal Pav", "1x Solkadhi"] },
  { id: "#ORD-9028", dispatchedAt: "09:40", items: ["1x Vegetable Biryani", "1x Raita"] }
];

export const inventoryItems = [
  { id: "item-idli", name: "Idli", category: "Breakfast", available: true },
  { id: "item-poha", name: "Poha", category: "Breakfast", available: true },
  { id: "item-samosa", name: "Samosa", category: "Appetizer", available: false },
  { id: "item-chicken-biryani", name: "Chicken Biryani", category: "Main Course", available: true },
  { id: "item-paneer-tikka", name: "Paneer Tikka", category: "Main Course", available: true },
  { id: "item-butter-naan", name: "Butter Naan", category: "Sides & Breads", available: true },
  { id: "item-dal-makhani", name: "Dal Makhani", category: "Main Course", available: true },
  { id: "item-garlic-naan", name: "Garlic Naan", category: "Sides & Breads", available: true },
  { id: "item-vada-pav", name: "Vada Pav", category: "Breakfast", available: true },
  { id: "item-masala-chai", name: "Masala Chai", category: "Beverages", available: true }
];
