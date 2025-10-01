# Deployment Guide - ShopHub E-Commerce

This guide covers deploying your e-commerce application to various hosting platforms.

## 🚀 Deployment Options

### 1. Vercel (Recommended)

Vercel offers the easiest deployment for React applications with automatic builds and deployments.

#### Steps:
1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Production Deployment**
   ```bash
   vercel --prod
   ```

#### Via Vercel Dashboard:
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your Git repository
4. Configure:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Add environment variables (if using Firebase)
6. Click "Deploy"

---

### 2. Netlify

Netlify is another excellent option with continuous deployment from Git.

#### Steps:
1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login**
   ```bash
   netlify login
   ```

3. **Initialize**
   ```bash
   netlify init
   ```

4. **Deploy**
   ```bash
   netlify deploy --prod
   ```

#### Via Netlify Dashboard:
1. Go to [netlify.com](https://netlify.com)
2. Click "Add new site" > "Import an existing project"
3. Connect to your Git provider
4. Configure:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Add environment variables
6. Click "Deploy site"

#### Create `netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

### 3. Firebase Hosting

Perfect if you're already using Firebase for backend services.

#### Steps:
1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login**
   ```bash
   firebase login
   ```

3. **Initialize Firebase Hosting**
   ```bash
   firebase init hosting
   ```
   - Select your Firebase project
   - Set public directory to: `dist`
   - Configure as single-page app: `Yes`
   - Don't overwrite index.html

4. **Build the project**
   ```bash
   npm run build
   ```

5. **Deploy**
   ```bash
   firebase deploy --only hosting
   ```

#### Create `firebase.json`:
```json
{
  "hosting": {
    "public": "dist",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

---

### 4. GitHub Pages

Free hosting for static sites directly from your GitHub repository.

#### Steps:
1. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update package.json**
   Add homepage and deploy scripts:
   ```json
   {
     "homepage": "https://yourusername.github.io/your-repo-name",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Update vite.config.js**
   ```javascript
   export default defineConfig({
     base: '/your-repo-name/',
     plugins: [react()],
   })
   ```

4. **Deploy**
   ```bash
   npm run deploy
   ```

---

## 🔧 Pre-Deployment Checklist

### 1. Environment Variables
Ensure all sensitive data is in environment variables:
- Firebase configuration
- API keys
- Any third-party service credentials

### 2. Build Optimization
```bash
# Test production build locally
npm run build
npm run preview
```

### 3. Update Firebase Configuration
For production, update Firestore security rules:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth.uid == userId;
    }
    
    // Products collection
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth != null && 
                     get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Orders collection
    match /orders/{orderId} {
      allow read: if request.auth != null && 
                     resource.data.userId == request.auth.uid;
      allow create: if request.auth != null;
      allow update: if request.auth != null && 
                       get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
```

### 4. Performance Optimization
- Enable compression
- Optimize images
- Lazy load components
- Code splitting

### 5. SEO Optimization
Add meta tags in `index.html`:
```html
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="ShopHub - Your one-stop e-commerce destination" />
  <meta name="keywords" content="ecommerce, shopping, online store" />
  <meta property="og:title" content="ShopHub E-Commerce" />
  <meta property="og:description" content="Quality products at unbeatable prices" />
  <title>ShopHub - E-Commerce Store</title>
</head>
```

---

## 🔐 Environment Variables Setup

### For Vercel/Netlify:
Add these in the dashboard under "Environment Variables":
```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### Local Development:
Create `.env` file:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

---

## 📊 Post-Deployment

### 1. Test All Features
- [ ] User registration and login
- [ ] Product browsing and search
- [ ] Add to cart functionality
- [ ] Checkout process
- [ ] Order history
- [ ] Admin panel (if applicable)

### 2. Monitor Performance
- Use Google Lighthouse for performance audits
- Check Core Web Vitals
- Monitor Firebase usage

### 3. Set Up Analytics
Add Google Analytics or Firebase Analytics to track:
- Page views
- User behavior
- Conversion rates
- Cart abandonment

### 4. Configure Custom Domain (Optional)
Most platforms support custom domains:
- Purchase domain from registrar
- Add DNS records
- Configure SSL certificate (usually automatic)

---

## 🐛 Common Deployment Issues

### Issue: 404 on page refresh
**Solution:** Configure routing for SPA
- Vercel: Automatic
- Netlify: Add `_redirects` file or `netlify.toml`
- Firebase: Configure rewrites in `firebase.json`

### Issue: Environment variables not working
**Solution:** 
- Ensure variables start with `VITE_`
- Restart dev server after adding variables
- Check platform-specific environment variable settings

### Issue: Build fails
**Solution:**
```bash
# Clear cache and rebuild
rm -rf node_modules dist
npm install
npm run build
```

### Issue: Firebase connection errors
**Solution:**
- Verify Firebase configuration
- Check Firebase project settings
- Ensure Firebase services are enabled

---

## 📈 Scaling Considerations

### 1. Database
- Monitor Firestore usage
- Implement pagination for large datasets
- Use indexes for complex queries

### 2. Storage
- Use CDN for images
- Implement image optimization
- Consider cloud storage solutions

### 3. Caching
- Implement service workers
- Use browser caching
- Consider Redis for session management

### 4. Load Balancing
- Use platform's built-in load balancing
- Consider serverless functions for heavy operations

---

## 🎯 Recommended Platform

**For this project, we recommend Vercel because:**
- ✅ Zero configuration deployment
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Excellent performance
- ✅ Free tier available
- ✅ Great developer experience
- ✅ Automatic preview deployments

---

## 📞 Support

For deployment issues:
- Check platform documentation
- Review build logs
- Test locally first with `npm run build && npm run preview`

**Happy Deploying! 🚀**
