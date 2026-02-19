# 🚀 Vercel Deployment - Step by Step

## Problem
Vercel was deploying from root directory instead of server folder, causing build failures.

## ✅ Solution Applied

### 1. Created Root `vercel.json`
Points Vercel to the server folder and configures routes.

### 2. Fixed `server/index.js`
Updated file path reading to work with Vercel's file structure.

---

## 📋 Deploy Now

### Step 1: Commit Changes
```bash
cd "d:/Troon Projects/ChatGpt sdk/industryconnect-ai"

# Add all changes
git add .
git commit -m "Fix Vercel deployment configuration"
git push
```

### Step 2: Redeploy on Vercel
Go to Vercel dashboard and click **"Redeploy"** or it will auto-deploy from GitHub push.

### Step 3: Test Deployment
```bash
# Test health check
curl https://industryconnect-app.vercel.app/

# Test MCP endpoint
curl https://industryconnect-app.vercel.app/mcp
```

---

## 🎯 What Was Fixed

**Before:**
- Vercel looked in root directory
- Couldn't find `index.js`
- Build failed

**After:**
- Root `vercel.json` points to `server/index.js`
- File paths use `__dirname` for correct resolution
- Routes configured: `/mcp` → `server/index.js`

---

## 📁 File Structure

```
industryconnect-ai/
├── vercel.json          ← NEW: Root config
├── server/
│   ├── index.js         ← UPDATED: Fixed file paths
│   ├── vercel.json      ← Keep for reference
│   ├── package.json
│   └── public/
│       └── main-widget.html
```

---

## ✅ After Deployment

### Connect to ChatGPT:
1. Settings → Apps → Add Server
2. **URL:** `https://industryconnect-app.vercel.app/mcp`
3. Test: "Show me the pizza app"

### Expected Result:
✅ Interactive widget appears with Pizza & Fashion tabs!

---

## 🔍 Troubleshooting

### If deployment still fails:

**Check Vercel Dashboard:**
1. Go to Project Settings
2. Verify **Root Directory** is set to `.` (root)
3. Check **Build & Development Settings**:
   - Build Command: `cd server && npm install`
   - Output Directory: Leave empty
   - Install Command: Auto

### If you see "Cannot find module":
```bash
# Make sure all files are committed
git status
git add server/index.js vercel.json
git commit -m "Add missing files"
git push
```

---

## 🎉 Success Indicators

✅ Build completes without errors
✅ `https://industryconnect-app.vercel.app/` returns "IndustryConnect AI MCP Server"
✅ `https://industryconnect-app.vercel.app/mcp` returns SSE stream
✅ ChatGPT can connect and show widget UI

Good luck! 🚀
