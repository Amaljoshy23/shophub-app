# ShopHub E-Commerce - Complete Setup Guide

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [Installation Steps](#installation-steps)
3. [Firebase Setup](#firebase-setup)
4. [Running the Application](#running-the-application)
5. [Testing the Application](#testing-the-application)
6. [Troubleshooting](#troubleshooting)

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- A modern web browser (Chrome, Firefox, Safari, or Edge)
- **Git** (optional, for version control)

## Installation Steps

### Step 1: Navigate to Project Directory
```bash
cd ecommerce-app
```

### Step 2: Install Dependencies
```bash
npm install
```

This will install all required packages including:
- React and React DOM
- React Router DOM
- Redux Toolkit and React Redux
- Firebase
- Tailwind CSS
- Heroicons
- React Hot Toast

### Step 3: Verify Installation
Check if all dependencies are installed correctly:
```bash
npm list
```

## Firebase Setup (Optional)

The application works with mock data by default, but for full functionality, you can set up Firebase:

### Step 1: Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter project name (e.g., "shophub-ecommerce")
4. Follow the setup wizard

### Step 2: Enable Authentication
1. In Firebase Console, go to **Authentication**
2. Click "Get started"
3. Enable **Email/Password** sign-in method
4. Click "Save"

### Step 3: Create Firestore Database
1. Go to **Firestore Database**
2. Click "Create database"
3. Choose "Start in test mode" (for development)
4. Select a location
5. Click "Enable"

### Step 4: Get Firebase Configuration
1. Go to **Project Settings** (gear icon)
2. Scroll down to "Your apps"
3. Click the web icon (</>)
4. Register your app
5. Copy the Firebase configuration object

### Step 5: Update Firebase Config
Open `src/services/firebase.js` and replace the configuration:

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

### Step 6: Set Up Firestore Collections (Optional)
Create the following collections in Firestore:
- **users** - For user profiles
- **products** - For product catalog
- **orders** - For order history

## Running the Application

### Development Mode
Start the development server:
```bash
npm run dev
```

The application will be available at: `http://localhost:5173`

### Production Build
Create an optimized production build:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Testing the Application

### 1. Browse Products
- Navigate to the home page
- Click "Shop Now" or "Products" in the navigation
- Browse the product catalog with mock data

### 2. Add to Cart
- Click on any product card
- View product details
- Click "Add to Cart"
- View cart by clicking the cart icon in the navbar

### 3. User Registration (Without Firebase)
- Click "Login" in the navbar
- Click "Sign up" link
- Fill in the registration form
- Note: Without Firebase, authentication will fail gracefully

### 4. User Registration (With Firebase)
- Click "Login" in the navbar
- Click "Sign up" link
- Fill in the registration form
- Submit to create an account
- You'll be automatically logged in

### 5. Shopping Cart
- Add multiple products to cart
- Adjust quantities using +/- buttons
- Remove items
- View cart summary with totals

### 6. Checkout Process
- Click "Proceed to Checkout" from cart
- Fill in shipping information
- Fill in payment information (demo mode)
- Click "Place Order"

### 7. Admin Features (With Firebase)
To access admin features:
1. Register a new account
2. Go to Firebase Console > Firestore
3. Find your user document in the `users` collection
4. Edit the document and set `role: "admin"`
5. Refresh the application
6. Navigate to `/admin` to access the admin panel

## Troubleshooting

### Issue: Dependencies not installing
**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Issue: Port 5173 already in use
**Solution:**
```bash
# Kill the process using port 5173
# On Windows:
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# On Mac/Linux:
lsof -ti:5173 | xargs kill -9
```

### Issue: Tailwind styles not loading
**Solution:**
1. Ensure `tailwind.config.js` exists
2. Ensure `postcss.config.js` exists
3. Restart the dev server

### Issue: Firebase errors
**Solution:**
1. Verify Firebase configuration in `src/services/firebase.js`
2. Check Firebase Console for enabled services
3. Ensure Firestore rules allow read/write (for development)

### Issue: Build errors
**Solution:**
```bash
# Clear build cache
rm -rf dist

# Rebuild
npm run build
```

## Features Overview

### Implemented Features ✅
- Product catalog with filtering and sorting
- Shopping cart with quantity management
- User authentication (Firebase)
- Checkout process
- Order history
- Admin panel for product management
- Responsive design
- Search functionality
- Category filtering
- Toast notifications

### Mock Data Features
The application includes mock product data so you can test without Firebase:
- 8 sample products across different categories
- Product images from Unsplash
- Realistic pricing and descriptions

## Project Structure

```
ecommerce-app/
├── src/
│   ├── components/      # Reusable components
│   ├── pages/          # Page components
│   ├── redux/          # State management
│   ├── services/       # API services
│   ├── App.jsx         # Main app
│   └── main.jsx        # Entry point
├── public/             # Static assets
└── package.json        # Dependencies
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Next Steps

1. **Customize the design** - Modify Tailwind classes in components
2. **Add more products** - Update mock data or add to Firebase
3. **Implement payment** - Integrate Stripe or Razorpay
4. **Add reviews** - Implement product review system
5. **Email notifications** - Set up email service
6. **Deploy** - Deploy to Vercel, Netlify, or Firebase Hosting

## Support

For issues or questions:
- Check the main README.md
- Review Firebase documentation
- Check React and Redux Toolkit docs

## License

MIT License - feel free to use this project for learning or commercial purposes.

---

**Happy Coding! 🚀**
