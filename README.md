# IndustryConnect AI

A production-ready, static Next.js multi-industry mini-app built following OpenAI Apps SDK UX principles.

## 🎯 Overview

IndustryConnect AI is an intelligent gateway that dynamically routes users to three distinct industry experiences based on search intent:

1. **Pizza Restaurant** - Order delicious pizzas online
2. **Troon Technologies** - Blockchain & IT solutions company
3. **Fashion Factory** - Premium clothing and apparel

## 🏗️ Architecture

- **Framework**: Next.js 14 (App Router) with static export
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **TypeScript**: Full type safety
- **Deployment**: Vercel-ready (static export)

## 📦 Installation

```bash
cd industryconnect-ai
npm install
```

## 🚀 Development

```bash
npm run dev
```

Visit `http://localhost:3000`

## 🏭 Production Build

```bash
npm run build
```

This generates a static export in the `out/` directory, ready for deployment to Vercel, Netlify, or any static hosting.

## 🔍 How It Works

### Intent Detection

The app uses keyword matching to detect user intent from:
- URL query parameters: `?query=pizza`
- Search bar input

### Industry Routing

**Pizza Keywords**: pizza, restaurant, food, order food, delivery, italian, margherita, pepperoni, cheese, dine, eat, hungry, meal, lunch, dinner

**IT Keywords**: it company, troon technologies, blockchain, software, developer, tech, technology, web development, app development, coding, programming, digital, solutions, consulting

**Fashion Keywords**: fashion, clothes, clothing, shirt, pants, apparel, wear, dress, style, outfit, wardrobe, garment, textile, fabric, denim

## 🎨 Features

### Pizza Restaurant View
- Menu display with 4 pizza options
- "Place Order" functionality
- Success confirmation UI state
- No backend required (mocked interactions)

### IT Company View
- Professional landing page for Troon Technologies
- Service showcase (Blockchain, AI/ML, Web/Mobile)
- Contact form with validation
- Success message on submission

### Fashion Factory View
- Product grid with 6 clothing items
- Category tags (Shirts, Pants)
- "Buy Now" functionality
- Purchase confirmation UI

## 📱 Responsive Design

All views are fully responsive with:
- Mobile-first approach
- Tailwind breakpoints
- Touch-friendly interactions
- Optimized layouts for all screen sizes

## 🎯 OpenAI Apps SDK Alignment

Built following official UX principles:

1. **Extract, don't port** - Focused on core actions, not full website replication
2. **Conversational entry** - Supports open-ended prompts and direct commands
3. **ChatGPT environment** - Minimal UI that advances tasks
4. **Optimize for conversation** - Clear actions, concise responses
5. **Ecosystem moment** - Natural language routing instead of navigation

## 🌐 Deployment to Vercel

### Option 1: Vercel CLI

```bash
npm install -g vercel
vercel
```

### Option 2: Vercel Dashboard

1. Push code to GitHub
2. Import repository in Vercel
3. Deploy automatically

### Configuration

The `next.config.js` is pre-configured for static export:

```javascript
{
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true
}
```

## 📊 SEO

Includes comprehensive meta tags:
- Title: IndustryConnect AI - Demo/Educational App

An educational demonstration application showcasing MCP (Model Context Protocol) integration with ChatGPT. Features interactive UIs for two fictional businesses: Pizza Paradise and Fashion Factory.

**⚠️ IMPORTANT:** This is a demo/educational app. No real transactions occur. All businesses are fictional for demonstration purposes only.

## 🧪 Testing

Test the app with these URL patterns:

```
http://localhost:3000/?query=pizza
http://localhost:3000/?query=best%20IT%20company
http://localhost:3000/?query=fashion%20clothes
```

## 🔧 Tech Stack Details

- **Next.js 14**: Latest App Router with React Server Components
- **TypeScript**: Full type safety across components
- **Tailwind CSS**: Utility-first styling with custom theme
- **Lucide React**: Modern icon library
- **Client-side only**: No server dependencies, fully static

## 📝 Project Structure

```
industryconnect-ai/
├── app/
│   ├── layout.tsx          # Root layout with SEO
│   ├── page.tsx            # Main page with routing logic
│   └── globals.css         # Global Tailwind styles
├── components/
│   ├── SearchBar.tsx       # Search input component
│   ├── PizzaView.tsx       # Pizza restaurant view
│   ├── ITCompanyView.tsx   # IT company view
│   └── ClothingView.tsx    # Fashion factory view
├── public/                 # Static assets
├── next.config.js          # Next.js configuration
├── tailwind.config.js      # Tailwind configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies

```

## 🎯 Use Cases

Perfect for:
- Multi-industry platforms
- AI-powered routing demos
- Conversational commerce prototypes
- ChatGPT app integrations
- Static landing pages with dynamic routing

## 📄 License

MIT

## 🤝 Contributing

Contributions welcome! This is a demonstration project showcasing modern Next.js patterns and OpenAI Apps SDK principles.

---

**Built with ❤️ following OpenAI Apps SDK best practices**
