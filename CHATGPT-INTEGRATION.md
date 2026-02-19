# ChatGPT Integration Guide

Complete guide to test and deploy IndustryConnect AI as a ChatGPT app using ngrok.

---

## 🎯 Overview

Your app now has:
- ✅ **MCP Server** - Express backend with 6 ChatGPT tools
- ✅ **OpenAPI Spec** - API documentation for ChatGPT
- ✅ **AI Plugin Manifest** - ChatGPT app configuration
- ✅ **window.openai Integration** - React components receive ChatGPT data
- ✅ **CORS & CSP Headers** - Iframe embedding support

---

## 📦 Step 1: Build Next.js App

```bash
# Build the static Next.js frontend
npm run build
```

This creates the `out/` directory that the MCP server will serve.

---

## 🚀 Step 2: Start MCP Server

```bash
# Install server dependencies
cd server
npm install

# Start the MCP server
npm start
```

Server runs on `http://localhost:3001`

**Test endpoints:**
- Health: http://localhost:3001/api/health
- OpenAPI: http://localhost:3001/openapi.yaml
- Manifest: http://localhost:3001/.well-known/ai-plugin.json

---

## 🌐 Step 3: Expose with Ngrok

### Install Ngrok

**Windows:**
```bash
# Download from https://ngrok.com/download
# Or use Chocolatey:
choco install ngrok
```

**Mac/Linux:**
```bash
brew install ngrok
```

### Create Ngrok Account
1. Sign up at https://ngrok.com
2. Get your auth token from dashboard
3. Configure ngrok:
```bash
ngrok config add-authtoken YOUR_AUTH_TOKEN
```

### Start Ngrok Tunnel

```bash
ngrok http 3001
```

You'll see output like:
```
Forwarding   https://abc123.ngrok.io -> http://localhost:3001
```

**Copy the HTTPS URL** (e.g., `https://abc123.ngrok.io`)

---

## 🔧 Step 4: Update Configuration

### Update AI Plugin Manifest

Edit `server/.well-known/ai-plugin.json`:

```json
{
  "api": {
    "type": "openapi",
    "url": "https://abc123.ngrok.io/openapi.yaml"
  },
  "logo_url": "https://abc123.ngrok.io/logo.png",
  "legal_info_url": "https://abc123.ngrok.io/legal",
  "ui": {
    "type": "webview",
    "url": "https://abc123.ngrok.io"
  }
}
```

### Update OpenAPI Spec

Edit `server/openapi.yaml`:

```yaml
servers:
  - url: https://abc123.ngrok.io
    description: Ngrok tunnel for ChatGPT testing
```

**Restart the server** after making changes.

---

## 🤖 Step 5: Test in ChatGPT

### Option A: Plugin Developer Mode (Deprecated)

ChatGPT's plugin developer mode is being phased out. Use Option B instead.

### Option B: Submit to OpenAI (Recommended)

1. Go to https://platform.openai.com/docs/plugins/introduction
2. Follow the submission process
3. Provide your ngrok URL as the plugin URL
4. Wait for approval

### Option C: Local Testing with MCP Inspector

For development testing without ChatGPT:

```bash
# Install MCP Inspector
npm install -g @modelcontextprotocol/inspector

# Test your MCP server
mcp-inspector http://localhost:3001
```

---

## 🧪 Step 6: Test the Tools

Once connected to ChatGPT, try these prompts:

### Pizza Restaurant
```
"Show me the pizza menu"
"I want to order a Margherita pizza"
"Order 2 pepperoni pizzas"
```

### Troon Technologies
```
"What services does Troon Technologies offer?"
"Tell me about Troon's blockchain solutions"
"I want to contact Troon Technologies about a web development project"
```

### Fashion Factory
```
"Show me the clothing catalog"
"I'm looking for shirts"
"I want to buy the Premium Cotton Shirt in size L"
```

---

## 📊 How It Works

### 1. User asks ChatGPT
```
User: "Show me pizza options"
```

### 2. ChatGPT calls your MCP tool
```
POST https://abc123.ngrok.io/api/pizza/menu
```

### 3. Your server responds
```json
{
  "success": true,
  "restaurant": "Pizza Paradise",
  "menu": [...],
  "ui_component": "pizza_view"
}
```

### 4. ChatGPT renders your UI
- Loads your React app in an iframe
- Passes data via `window.openai.onToolResponse()`
- Your `PizzaView` component displays the menu

---

## 🔍 Debugging

### Check Server Logs
```bash
# Server console shows all API calls
🚀 IndustryConnect AI MCP Server running on http://localhost:3001
POST /api/pizza/menu 200 45ms
```

### Check Browser Console
```javascript
// Open DevTools in ChatGPT iframe
// Look for:
Received tool response from ChatGPT: {menu: [...]}
```

### Verify Ngrok
```bash
# Ngrok dashboard shows all requests
http://localhost:4040
```

### Test Endpoints Manually
```bash
# Test pizza menu
curl -X POST http://localhost:3001/api/pizza/menu

# Test with ngrok URL
curl -X POST https://abc123.ngrok.io/api/pizza/menu
```

---

## 🚨 Common Issues

### Issue: "Plugin not found"
**Solution:** Verify your ngrok URL is correct in the manifest

### Issue: "CORS error"
**Solution:** Server already has CORS enabled. Check ngrok URL uses HTTPS

### Issue: "UI not loading"
**Solution:** 
1. Ensure `npm run build` was run
2. Check `out/` directory exists
3. Verify CSP headers in server.js

### Issue: "Tool not responding"
**Solution:**
1. Check server is running on port 3001
2. Verify ngrok tunnel is active
3. Test endpoint directly with curl

---

## 📱 Production Deployment

### For Production (Not Ngrok)

1. **Deploy to a hosting service:**
   - Vercel (recommended)
   - Railway
   - Render
   - Heroku

2. **Update URLs:**
   - Replace ngrok URL with production domain
   - Update `ai-plugin.json`
   - Update `openapi.yaml`

3. **Environment Variables:**
```bash
PORT=3001
NODE_ENV=production
```

4. **Build command:**
```bash
npm run build && cd server && npm install
```

5. **Start command:**
```bash
cd server && npm start
```

---

## 🎯 Available MCP Tools

| Tool | Endpoint | Description |
|------|----------|-------------|
| `getPizzaMenu` | POST /api/pizza/menu | Get pizza restaurant menu |
| `orderPizza` | POST /api/pizza/order | Place a pizza order |
| `getTroonServices` | POST /api/troon/services | Get IT services list |
| `contactTroon` | POST /api/troon/contact | Submit contact form |
| `getFashionCatalog` | POST /api/fashion/catalog | Browse clothing items |
| `purchaseFashionItem` | POST /api/fashion/purchase | Buy clothing |

---

## 📝 Next Steps

1. ✅ Build Next.js app (`npm run build`)
2. ✅ Start MCP server (`cd server && npm start`)
3. ✅ Start ngrok (`ngrok http 3001`)
4. ✅ Update manifest and OpenAPI with ngrok URL
5. ✅ Test in ChatGPT or submit to OpenAI
6. 🚀 Deploy to production when ready

---

## 🔗 Useful Links

- **Ngrok Dashboard:** http://localhost:4040
- **OpenAI Platform:** https://platform.openai.com
- **MCP Documentation:** https://modelcontextprotocol.io
- **ChatGPT Apps SDK:** https://developers.openai.com/apps-sdk

---

**Built with ❤️ for ChatGPT integration**
