# 🛍️ RevoShop - Modern E-Commerce Platform

## 📋 Overview

RevoShop is a modern, full-featured e-commerce platform built with Next.js 15, showcasing best practices in server-side rendering (SSR), static site generation (SSG), and dynamic routing. This project demonstrates a production-ready online shopping experience with real-time product filtering, dynamic product pages, and a seamless shopping cart system.

**Live Demo**: [Visit Live Site Here!](https://revoshop-mrafiasyifaa.vercel.app/)  
**Repository**: [Source Code Here!  ](https://github.com/Revou-FSSE-Oct25/milestone-3-mrafiasyifaa)

---

## ✨ Features Implemented

### 🏠 Core Functionality
- ✅ **Product Listing Page** - Browse products with responsive grid layout
- ✅ **Dynamic Product Details** - Server-side rendered product pages with full details
- ✅ **Category Filtering** - Filter products by categories (Clothes, Electronics, Furniture, etc.)
- ✅ **Price Range Filter** - Filter products by price ranges
- ✅ **Responsive Design** - Mobile-first design that works on all devices

### 🎨 UI/UX Features
- ✅ **Promotional Banners** - Eye-catching banners with special offers
- ✅ **Product Image Gallery** - Multiple images per product with navigation
- ✅ **Loading States** - Smooth loading indicators for better UX
- ✅ **Mobile Navigation** - Hamburger menu with sidebar for mobile devices
- ✅ **Sticky Navigation** - Always-accessible header and cart

### 🚀 Technical Features
- ✅ **Server-Side Rendering (SSR)** - Dynamic product pages for SEO optimization
- ✅ **Client-Side Rendering (CSR)** - Interactive filtering and search
- ✅ **Dynamic Routing** - SEO-friendly URLs with product slugs
- ✅ **API Integration** - Fetch data from external REST API
- ✅ **State Management** - React hooks (useState, useEffect, useContext)
- ✅ **TypeScript** - Type-safe development experience

---

## 🛠️ Technologies Used

### Frontend Framework
- **Next.js 15.1.6** - React framework with SSR/SSG capabilities
- **React 19** - Latest React with improved performance
- **TypeScript** - Type-safe JavaScript

### Styling
- **Tailwind CSS 3.4.1** - Utility-first CSS framework
- **Custom CSS Variables** - Consistent design tokens
- **Responsive Design** - Mobile-first approach

### APIs & Data
- **Platzi Fake Store API** - Product and category data
- **REST API Integration** - Fetch API for data retrieval

### Development Tools
- **ESLint** - Code linting and quality
- **PostCSS** - CSS processing
- **Lucide React** - Modern icon library

### Fonts
- **Geist Font** - Modern, clean typography
- **Poppins** - Additional font family for headings

---

## 📸 Screenshots

**Documentation**: [Here!](https://imgur.com/a/revoshop-personal-use-oJAq0p4)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/revoshop.git
   cd revoshop
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables** (if needed)
   ```bash
   # Create .env.local file
   NEXT_PUBLIC_API_URL=https://api.escuelajs.co/api/v1
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
revoshop/
├── src/
│   ├── app/
│   │   ├── about/              # Static About page (SSG)
│   │   ├── cart/               # Shopping cart page
│   │   ├── product/
│   │   │   └── [slug]/[id]/    # Dynamic product pages (SSR)
│   │   ├── shop/               # Shop with filtering
│   │   ├── layout.tsx          # Root layout with navigation
│   │   └── page.tsx            # Home page
│   ├── components/
│   │   ├── shop/               # Shop-specific components
│   │   ├── ui/                 # Reusable UI components
│   │   ├── AddToCart.tsx       # Cart functionality
│   │   ├── Header.tsx          # Navigation header
│   │   ├── ProductCard.tsx     # Product card component
│   │   └── ...
│   ├── constants/              # App constants
│   └── lib/                    # Utility functions
├── public/                     # Static assets
└── tailwind.config.ts          # Tailwind configuration
```

## 🔄 API Endpoints Used

| Endpoint | Purpose | Method |
|----------|---------|--------|
| `/products` | Fetch all products | GET |
| `/products/{id}` | Fetch single product | GET |
| `/categories` | Fetch all categories | GET |
| `/categories/{id}/products` | Fetch products by category | GET |

---
### Current Limitations
- ⚠️ Error handling could be more robust in some components
- ⚠️ No pagination for large product lists
- ⚠️ Cart data is not persisted across sessions (localStorage needed)
---

## 👨‍💻 Author

**Your Name**  
- GitHub: [@mrafiasyifaa](https://github.com/yourusername)
- Email: mrafiasyifaa@gmail.com

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [Platzi Fake Store API](https://fakeapi.platzi.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)

---

## 📞 Support

If you have any questions or need help, feel free to:
- Open an issue on GitHub
- Contact me via email
- Check the [Next.js documentation](https://nextjs.org/docs)

---

**Made with ❤️ using Next.js and TypeScript**