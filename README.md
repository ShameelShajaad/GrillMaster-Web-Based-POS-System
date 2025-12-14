# GrillMaster POS 🍔🍟🥤

A modern **Web-Based Point of Sale (POS) system** built with **HTML, CSS, TailwindCSS, and JavaScript**.  
GrillMaster POS is designed for restaurants and fast-food outlets to manage menu items, take new orders, and track order history — all in a clean, responsive interface.

---

## 🌐 Live Demo

- **GitHub Repository:** [GrillMaster-Web-Based-POS-System](https://github.com/ShameelShajaad/GrillMaster-Web-Based-POS-System)  
- **Deployed Page:** [GrillMaster POS Live](https://shameelshajaad.github.io/GrillMaster-Web-Based-POS-System/)

---

## 🚀 Features

- **Home Page**  
  Welcome screen with quick access to start a new order or manage menu items.

- **Place Order**  
  - Browse menu items by category (burgers, fries, drinks).  
  - Search functionality for quick item lookup.  
  - Add items to a dynamic cart with quantity controls.  
  - Customer details popup before completing an order.  
  - Save completed orders to local storage.  

- **Manage Menu**  
  - Add new items with name, price, and category.  
  - Edit existing items with validation.  
  - Delete items with confirmation.  
  - Search and filter menu items.  
  - CRUD operations stored in local storage.  

- **Order History**  
  - View all completed orders with totals.  
  - Search orders by customer name.  
  - Popup to view detailed order information.  
  - Summary cards for **Total Sales** and **Total Orders**.  

- **Persistent Data**  
  - Menu items and orders are stored in `localStorage`.  
  - Default menu seeded on first load via `data.js`.  

---

## 🛠️ Tech Stack

- **Frontend:** HTML5, CSS3, TailwindCSS  
- **JavaScript:** Vanilla JS for dynamic functionality  
- **Storage:** Browser `localStorage` for persistence  
- **Libraries:**  
  - [TailwindCSS](https://tailwindcss.com/) (via CDN)  
  - [html2pdf.js](https://ekoopmans.github.io/html2pdf.js/) (for potential PDF receipts)  

---

## 📂 Project Structure

GrillMaster-POS/
│
├── index.html            # Home page
├── placeorder.html       # Place new orders
├── manageorder.html      # Manage menu items
├── orders.html           # View order history
│
├── assets/
│   ├── css/style.css     # Custom styles
│   ├── js/
│   │   ├── app.js        # Navbar toggle & shared UI logic
│   │   ├── data.js       # Default menu seeding
│   │   ├── manageorder.js# CRUD operations for menu
│   │   ├── orders.js     # Order history logic
│   │   └── placeorder.js # Cart & order completion
│   ├── images/           # Menu item images
│   └── svg/              # Icons
│
└── README.md             # Project documentation



---

## ⚙️ Setup & Usage

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ShameelShajaad/GrillMaster-Web-Based-POS-System.git
   ```
2. **Open in browser**
- Simply open in your browser.
- No server setup required — it runs entirely client-side.

3. **Explore the app**
- Start a new order from the home page.
- Manage menu items via the Manage Menu page.
- View completed orders in Order History.
