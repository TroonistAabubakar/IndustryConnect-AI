# 🔧 Vercel Deployment Fix

## Problem
Your server was crashing with `500: INTERNAL_SERVER_ERROR` because:
- Vercel uses **serverless functions**, not traditional Node.js servers
- `createServer()` and `listen()` don't work on Vercel
- Need to export a handler function instead

## ✅ Solution Applied

### 1. Created `index.js` (Vercel Serverless Function)
- Removed `createServer()` and `listen()`
- Exported `handler` function for Vercel
- Same MCP logic, different structure

### 2. Updated `vercel.json`
- Changed from `builds` to `functions`
- Uses `rewrites` instead of `routes`
- Points all requests to `index.js`

---

## 🚀 Deploy Now

### Step 1: Navigate to Server Folder
```bash
cd "d:/Troon Projects/ChatGpt sdk/industryconnect-ai/server"
```

### Step 2: Deploy to Vercel
```bash
vercel --prod
```

### Step 3: Test Deployment
```bash
# Test health check
curl https://industryconnectapp-ai.vercel.app/

# Test MCP endpoint
curl https://industryconnectapp-ai.vercel.app/mcp
```

---

## 📋 What Changed

### Before (Doesn't Work on Vercel):
```javascript
const httpServer = createServer(async (req, res) => {
  // handler logic
});

httpServer.listen(port, () => {
  console.log('Server running...');
});
```

### After (Works on Vercel):
```javascript
export default async function handler(req, res) {
  // same handler logic
}
```

---

## 🎯 Your URLs

**Backend:**
```
https://industryconnectapp-ai.vercel.app
```

**MCP Endpoint:**
```
https://industryconnectapp-ai.vercel.app/mcp
```

---

## ✅ Files Modified

1. **`server/index.js`** - New Vercel-compatible handler (CREATED)
2. **`server/vercel.json`** - Updated for serverless functions (MODIFIED)
3. **`server/server.js`** - Keep for local development (UNCHANGED)

---

## 🧪 After Deployment

### Test in ChatGPT:
1. Settings → Apps → Add Server
2. **URL:** `https://industryconnectapp-ai.vercel.app/mcp`
3. Test prompts:
   - "Show me the pizza app"
   - "I want to order pizza"
   - "Show me the fashion app"

**Expected:** Interactive widget appears! 🎉

---

## 🔍 Why It Failed Before

Vercel serverless functions:
- ❌ Can't use `createServer()`
- ❌ Can't use `listen()`
- ❌ Can't run long-lived processes
- ✅ Must export handler function
- ✅ Stateless (no persistent connections)
- ✅ Auto-scales on demand

---

## 📝 Local Development

For local testing, still use `server.js`:
```bash
npm start
```

For Vercel deployment, it uses `index.js` automatically.

---

## 🚀 Ready to Deploy!

Run this command:
```bash
cd "d:/Troon Projects/ChatGpt sdk/industryconnect-ai/server"
vercel --prod
```

This should fix the 500 error! 🎉
