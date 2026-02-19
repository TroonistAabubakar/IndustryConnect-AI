# 🚀 IndustryConnect AI - Deployment Guide

## Current Deployment

**Live URL:** https://industryconnectai.vercel.app  
**MCP Endpoint:** https://industryconnectai.vercel.app/mcp

---

## 📋 Project Structure

```
industryconnect-ai/
├── app/
│   ├── mcp/
│   │   └── route.ts        ← MCP API endpoint
│   ├── page.tsx            ← Homepage
│   └── layout.tsx
├── server/                 ← Local development only
├── package.json
└── vercel.json             ← Empty (Next.js auto-config)
```

---

## 🔧 How It Works

### Next.js App Router
- **Framework:** Next.js 14 with App Router
- **MCP Route:** `app/mcp/route.ts` handles all MCP requests
- **Vercel:** Auto-detects Next.js and deploys correctly

### MCP Endpoint
- **GET /mcp** - Health check & MCP protocol
- **POST /mcp** - Tool calls (pizza & fashion)
- **OPTIONS /mcp** - CORS preflight

---

## 🚀 Deploy to Vercel

### Step 1: Install Dependencies
```bash
cd "d:/Troon Projects/ChatGpt sdk/industryconnect-ai"
npm install
```

### Step 2: Commit Changes
```bash
git add .
git commit -m "Add Next.js MCP API route"
git push
```

### Step 3: Vercel Auto-Deploys
Push to GitHub triggers automatic deployment.

---

## 🧪 Test Deployment

```bash
# Health check
curl https://industryconnectai.vercel.app/mcp

# Should return MCP protocol response
```

---

## 🎯 Connect to ChatGPT

1. **Settings** → **Apps** → **Add Server**
2. **URL:** `https://industryconnectai.vercel.app/mcp`
3. **Test:** "Show me the pizza app"

**Expected:** Interactive widget with Pizza & Fashion tabs! 🎉

---

## 📦 Available Tools

### Pizza Paradise (3 tools)
- `show_pizza_app` - Display pizza ordering UI
- `get_pizza_menu` - Browse pizza menu
- `order_pizza` - Place pizza order

### Fashion Factory (3 tools)
- `show_fashion_app` - Display fashion shopping UI
- `get_fashion_catalog` - Browse clothing items
- `purchase_fashion_item` - Buy fashion items

---

## 🔍 Troubleshooting

### Issue: /mcp returns 404
**Solution:** Make sure `app/mcp/route.ts` exists and is committed.

### Issue: TypeScript errors
**Solution:** Run `npm install` to install MCP SDK dependencies.

### Issue: Build fails
**Solution:** Check Vercel logs for specific errors.

---

## 📝 Local Development

```bash
# Run locally
npm run dev

# Test MCP endpoint
curl http://localhost:3000/mcp
```

---

## ✅ Deployment Checklist

- [x] Next.js MCP API route created (`app/mcp/route.ts`)
- [x] Dependencies added (`@modelcontextprotocol/sdk`, `zod`)
- [x] Old `api/` folder removed
- [x] `vercel.json` simplified (empty)
- [x] Extra documentation cleaned up
- [ ] Dependencies installed (`npm install`)
- [ ] Changes committed and pushed
- [ ] Vercel deployment successful
- [ ] `/mcp` endpoint tested
- [ ] ChatGPT connection tested

Good luck! 🚀
