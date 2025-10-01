# 🛍️ ShopHub - Full-Featured E-Commerce Website

A modern, full-featured e-commerce web application built with React.js, Redux Toolkit, Firebase, and Tailwind CSS.

## ✨ Features

### Core Features
- **Product Listings** - Browse products with filtering and sorting capabilities
- **Product Details** - Detailed product pages with images, descriptions, and pricing
- **Shopping Cart** - Add/remove items, adjust quantities, and view cart summary
- **User Authentication** - Register, login, and logout functionality with Firebase Auth
- **Checkout Process** - Complete checkout flow with shipping and payment information
- **Order History** - View past orders and order details
- **Search Functionality** - Search products by name or description
- **Category Filtering** - Filter products by categories
- **Responsive Design** - Mobile-first, fully responsive UI

### Admin Features
- **Product Management** - Add, edit, and delete products
- **Admin Dashboard** - Manage inventory and product catalog
- **Role-Based Access** - Admin-only routes and features

### Technical Features
- **State Management** - Redux Toolkit for global state management
- **Routing** - React Router for navigation
- **Real-time Updates** - Firebase Firestore for data persistence
- **Toast Notifications** - User-friendly notifications with react-hot-toast
- **Modern UI** - Tailwind CSS for styling with custom components
- **Icons** - Heroicons for beautiful UI icons

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Firebase account (optional, mock data available)

### Installation

1. **Clone the repository**
   ```bash
   cd ecommerce-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Firebase (Optional)**
   
   If you want to use Firebase for authentication and data storage:
   
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication (Email/Password)
   - Create a Firestore database
   - Copy your Firebase config
   - Update `src/services/firebase.js` with your Firebase credentials:
   
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

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 📁 Project Structure

```
ecommerce-app/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Navbar.jsx
│   │   ├── ProductCard.jsx
│   │   └── CartItem.jsx
│   ├── pages/              # Page components
│   │   ├── Home.jsx
│   │   ├── Products.jsx
│   │   ├── ProductDetail.jsx
│   │   ├── Cart.jsx
│   │   ├── Checkout.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Orders.jsx
│   │   └── Admin.jsx
│   ├── redux/              # Redux store and slices
│   │   ├── store.js
│   │   └── slices/
│   │       ├── cartSlice.js
│   │       ├── authSlice.js
│   │       └── productsSlice.js
│   ├── services/           # API and Firebase services
│   │   ├── firebase.js
│   │   ├── authService.js
│   │   ├── productsService.js
│   │   └── ordersService.js
│   ├── App.jsx            # Main app component with routing
│   ├── main.jsx           # Entry point
│   └── index.css          # Global styles
├── public/                # Static assets
├── tailwind.config.js     # Tailwind configuration
├── postcss.config.js      # PostCSS configuration
└── package.json           # Dependencies and scripts
```

## 🛠️ Technologies Used

### Frontend
- **React.js** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Redux Toolkit** - State management
- **Tailwind CSS** - Utility-first CSS framework
- **Heroicons** - Icon library
- **React Hot Toast** - Toast notifications

### Backend & Database
- **Firebase Authentication** - User authentication
- **Firebase Firestore** - NoSQL database
- **Firebase Storage** - File storage (optional)

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Features in Detail

### Shopping Cart
- Add products to cart
- Update quantities
- Remove items
- Calculate totals with tax and shipping
- Free shipping on orders over $50

### User Authentication
- Email/password registration
- Login/logout functionality
- Protected routes
- User profile management
- Order history tracking

### Product Management (Admin)
- CRUD operations for products
- Image URL management
- Category assignment
- Stock management
- Pricing and discount management

### Checkout Process
- Shipping information form
- Payment information (demo mode)
- Order summary
- Order confirmation

## 🔐 Demo Credentials

Since Firebase is optional, the app works with mock data by default. To test admin features:

1. Register a new account
2. Manually update the user role in Firestore to 'admin'
3. Access the admin panel at `/admin`

## 🚧 Future Enhancements

- [ ] Payment gateway integration (Stripe/Razorpay)
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Advanced search with filters
- [ ] Email notifications
- [ ] Order tracking
- [ ] Multiple payment methods
- [ ] Coupon/discount codes
- [ ] Product recommendations
- [ ] Social media authentication

## 📱 Responsive Design

The application is fully responsive and works seamlessly on:
- Desktop (1024px and above)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Built with ❤️ using React.js and modern web technologies.

## 🙏 Acknowledgments

- Unsplash for product images
- Heroicons for icons
- Tailwind CSS for styling utilities
- Firebase for backend services
