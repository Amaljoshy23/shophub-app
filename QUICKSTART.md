# 🚀 Quick Start Guide - ShopHub E-Commerce

Get your e-commerce store running in **5 minutes**!

## ⚡ Super Quick Start (Without Firebase)

The app works with mock data out of the box. Just run:

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev
```

**That's it!** Open `http://localhost:5173` in your browser.

---

## 🎯 What You Can Do Right Now

### 1. Browse Products
- Navigate to the home page
- Click "Shop Now" or "Products" in the navbar
- Browse 8 sample products across different categories

### 2. Add to Cart
- Click on any product
- View product details
- Click "Add to Cart" or "Buy Now"
- View your cart by clicking the cart icon (top right)

### 3. Shopping Cart
- Adjust quantities with +/- buttons
- Remove items
- See real-time price calculations
- View shipping and tax

### 4. Try Checkout
- Click "Proceed to Checkout"
- Fill in shipping information
- Fill in payment info (demo mode - no real payment)
- Place order

---

## 🔥 Quick Firebase Setup (Optional - 10 minutes)

Want full functionality with real authentication and database?

### Step 1: Create Firebase Project (3 minutes)
1. Go to [console.firebase.google.com](https://console.firebase.google.com)
2. Click "Add project"
3. Enter project name: `shophub-ecommerce`
4. Disable Google Analytics (optional)
5. Click "Create project"

### Step 2: Enable Services (2 minutes)
1. **Authentication:**
   - Click "Authentication" → "Get started"
   - Enable "Email/Password"
   - Click "Save"

2. **Firestore:**
   - Click "Firestore Database" → "Create database"
   - Choose "Start in test mode"
   - Select location
   - Click "Enable"

### Step 3: Get Config (2 minutes)
1. Click gear icon → "Project settings"
2. Scroll to "Your apps"
3. Click web icon `</>`
4. Register app name: `shophub`
5. Copy the config object

### Step 4: Update Code (3 minutes)
Open `src/services/firebase.js` and replace:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

**Done!** Restart your dev server and you have full authentication!

---

## 📱 Test the App

### Test User Registration
```
1. Click "Login" in navbar
2. Click "Sign up"
3. Fill in:
   - Name: Test User
   - Email: test@example.com
   - Password: test123
4. Click "Create Account"
```

### Test Shopping Flow
```
1. Browse products
2. Add 3 different products to cart
3. Go to cart
4. Update quantities
5. Proceed to checkout
6. Fill in shipping info
7. Place order
8. View orders page
```

### Test Admin Panel (With Firebase)
```
1. Register an account
2. Go to Firebase Console → Firestore
3. Find your user in 'users' collection
4. Edit document: set role = "admin"
5. Refresh app
6. Navigate to /admin
7. Add/Edit/Delete products
```

---

## 🎨 Customize Your Store

### Change Colors
Edit `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: '#your-color',
    }
  }
}
```

### Change Store Name
1. Update `src/components/Navbar.jsx` - Line 36
2. Update `src/components/Footer.jsx` - Line 10
3. Update `index.html` - `<title>` tag

### Add Your Products
Edit `src/pages/Home.jsx` or `src/pages/Products.jsx`:
```javascript
const mockProducts = [
  {
    id: '1',
    name: 'Your Product',
    description: 'Product description',
    price: 99.99,
    image: 'https://your-image-url.com/image.jpg',
    category: 'Electronics',
    stock: 10,
  },
  // Add more products...
];
```

---

## 🛠️ Common Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint

# Install new package
npm install package-name
```

---

## 📦 Project Structure

```
ecommerce-app/
├── src/
│   ├── components/       # UI components (Navbar, ProductCard, etc.)
│   ├── pages/           # Page components (Home, Products, Cart, etc.)
│   ├── redux/           # State management (cart, auth, products)
│   ├── services/        # Firebase services
│   ├── App.jsx          # Main app with routing
│   └── main.jsx         # Entry point
├── public/              # Static files
└── package.json         # Dependencies
```

---

## 🐛 Troubleshooting

### Port already in use?
```bash
# Kill process on port 5173
# Windows:
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:5173 | xargs kill -9
```

### Dependencies not installing?
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Firebase not working?
- Check if you copied the config correctly
- Ensure Authentication and Firestore are enabled
- Check browser console for errors

### Styles not loading?
```bash
# Restart dev server
# Press Ctrl+C, then:
npm run dev
```

---

## 🎯 Next Steps

1. **Explore the Code**
   - Check out the components in `src/components/`
   - Look at Redux slices in `src/redux/slices/`
   - Review page components in `src/pages/`

2. **Read Documentation**
   - `README.md` - Complete overview
   - `SETUP_GUIDE.md` - Detailed setup instructions
   - `FEATURES.md` - Full features list
   - `DEPLOYMENT.md` - Deployment guide

3. **Customize**
   - Change colors and branding
   - Add your own products
   - Modify layouts and styles

4. **Deploy**
   - Choose a platform (Vercel recommended)
   - Follow `DEPLOYMENT.md`
   - Share your store!

---

## 💡 Pro Tips

1. **Use Redux DevTools** - Install the browser extension to debug state
2. **Check Console** - Keep browser console open to catch errors
3. **Test Responsive** - Use browser dev tools to test mobile views
4. **Mock Data First** - Test everything with mock data before Firebase
5. **Read Error Messages** - They usually tell you exactly what's wrong

---

## 🎉 You're Ready!

Your e-commerce store is now running. Start customizing and building your business!

### Quick Links
- 🏠 Home: `http://localhost:5173`
- 🛍️ Products: `http://localhost:5173/products`
- 🛒 Cart: `http://localhost:5173/cart`
- 👤 Login: `http://localhost:5173/login`
- ⚙️ Admin: `http://localhost:5173/admin`

---

## 📞 Need Help?

- Check `README.md` for detailed information
- Review `SETUP_GUIDE.md` for step-by-step instructions
- Look at `FEATURES.md` to see what's implemented
- Read `DEPLOYMENT.md` when ready to go live

**Happy Selling! 🚀🛍️**
