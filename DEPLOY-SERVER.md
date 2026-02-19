# 🚀 Deploy MCP Server to Vercel

## The Problem
You deployed the Next.js frontend, but the MCP backend server (in `/server` folder) is separate and needs its own deployment.

---

## ✅ Solution: Deploy Server Folder

### Step 1: Navigate to Server Directory
```bash
cd "d:/Troon Projects/ChatGpt sdk/industryconnect-ai/server"
```

### Step 2: Deploy Server to Vercel
```bash
vercel --prod
```

**Follow the prompts:**
- Set up and deploy? → **Yes**
- Which scope? → Select your Vercel account
- Link to existing project? → **No** (create new project for server)
- Project name? → **industryconnect-ai-server** (different from frontend)
- Directory? → **./**
- Override settings? → **No**

### Step 3: Get Your Server URL
After deployment, you'll get a URL like:
```
https://industryconnect-app.vercel.app
```

Your MCP endpoint will be:
```
https://industryconnect-app.vercel.app/mcp
```

---

## 🔧 Alternative: Use Same Domain

If you want everything under one domain (`industryconnect-ai.vercel.app`), you need to:

### Option A: Deploy Only the Server (Recommended for MCP)

Since OpenAI only needs the MCP endpoint, you can:

1. **Delete the current Vercel deployment** (the Next.js one)
2. **Deploy only the server folder** with the name `industryconnect-ai`
3. The MCP endpoint will be at `https://industryconnect-ai.vercel.app/mcp`

**Commands:**
```bash
# Remove current deployment (if needed)
vercel rm industryconnect-ai --yes

# Deploy server with the main project name
cd "d:/Troon Projects/ChatGpt sdk/industryconnect-ai/server"
vercel --prod --name industryconnect-ai
```

### Option B: Keep Both Separate (Easier)

- **Frontend:** `https://industryconnect-ai.vercel.app` (Next.js UI)
- **Backend:** `https://industryconnect-app.vercel.app` (MCP Server)

For OpenAI submission, use: `https://industryconnect-app.vercel.app/mcp`

---

## ✅ Test After Deployment

```bash
# Test health check
curl https://industryconnect-app.vercel.app/

# Test MCP endpoint
curl https://industryconnect-app.vercel.app/mcp

# Should return: SSE stream or MCP server response
```

---

## 📝 Update Documentation

After deploying, update your OpenAI submission with the correct URL:

**MCP Server URL for OpenAI:**
```
https://industryconnect-app.vercel.app/mcp
```

OR (if you use Option A):
```
https://industryconnect-ai.vercel.app/mcp
```

---

## 🎯 Recommended Approach

**For OpenAI submission, I recommend Option A:**
1. Deploy **only the server folder** to `industryconnect-ai.vercel.app`
2. This gives you a clean MCP endpoint: `https://industryconnect-ai.vercel.app/mcp`
3. You don't need the Next.js frontend for ChatGPT - the MCP server serves the widget HTML

**Why?**
- OpenAI only needs the MCP endpoint
- The server already serves the widget HTML files
- Simpler setup with one deployment
- Cleaner URL for submission

---

## 🚀 Quick Deploy (Recommended)

```bash
# Navigate to server folder
cd "d:/Troon Projects/ChatGpt sdk/industryconnect-ai/server"

# Deploy to production
vercel --prod

# When prompted for project name, use: industryconnect-ai
```

This will give you:
- **Main URL:** `https://industryconnect-ai.vercel.app`
- **MCP Endpoint:** `https://industryconnect-ai.vercel.app/mcp`
- **Widget:** Served automatically by the server

Perfect for OpenAI submission! 🎉
