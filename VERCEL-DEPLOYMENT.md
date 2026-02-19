# 🚀 Vercel Deployment Guide - IndustryConnect AI

## Quick Deploy Steps

### 1. Install Vercel CLI
```bash
npm install -g vercel
```

### 2. Navigate to Server Directory
```bash
cd "d:/Troon Projects/ChatGpt sdk/industryconnect-ai/server"
```

### 3. Deploy to Vercel
```bash
vercel
```

**Follow the prompts:**
- Set up and deploy? → **Yes**
- Which scope? → Select your Vercel account
- Link to existing project? → **No** (first time)
- Project name? → **industryconnect-ai**
- Directory? → **./** (current directory)
- Override settings? → **No**

### 4. Deploy to Production
```bash
vercel --prod
```

---

## 📋 Your Production URLs

After deployment, you'll get:

**Main URL:**
```
https://industryconnect-ai.vercel.app
```

**MCP Endpoint (for OpenAI submission):**
```
https://industryconnect-ai.vercel.app/mcp
```

---

## ✅ Test Your Deployment

### Test 1: Health Check
```bash
curl https://industryconnect-ai.vercel.app/
```
**Expected:** `IndustryConnect AI MCP Server`

### Test 2: MCP Endpoint
Open in browser or use curl:
```bash
curl https://industryconnect-ai.vercel.app/mcp
```
**Expected:** MCP server response (SSE stream)

### Test 3: Widget HTML
```bash
curl https://industryconnect-ai.vercel.app/public/main-widget.html
```
**Expected:** HTML content of your widget

---

## 🔧 Troubleshooting

### Issue: "Command not found: vercel"
**Solution:**
```bash
npm install -g vercel
```

### Issue: Build fails
**Solution:**
1. Check `vercel.json` is in the `server` folder
2. Verify all dependencies are in `package.json`
3. Check server.js has no syntax errors

### Issue: MCP endpoint not responding
**Solution:**
1. Check Vercel logs: `vercel logs`
2. Verify CSP headers are set correctly
3. Test locally first: `npm start`

---

## 📝 Environment Variables (if needed)

If you need to add environment variables:

```bash
vercel env add NODE_ENV
# Enter: production
```

---

## 🔄 Redeploy After Changes

```bash
cd server
vercel --prod
```

---

## 📊 Monitor Your Deployment

- **Dashboard:** https://vercel.com/dashboard
- **Logs:** `vercel logs`
- **Analytics:** Available in Vercel dashboard

---

## ⚡ Quick Commands Reference

```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod

# View logs
vercel logs

# List deployments
vercel ls

# Remove deployment
vercel rm [deployment-url]
```

---

## 🎯 Next Steps After Deployment

1. ✅ Test MCP endpoint in browser
2. ✅ Test in ChatGPT Developer Mode
3. ✅ Update PRIVACY-POLICY.md with your contact info
4. ✅ Prepare screenshots for OpenAI submission
5. ✅ Submit to OpenAI Platform

---

## 📸 Screenshots Needed for OpenAI

Take screenshots of:
1. Main widget with both tabs visible
2. Pizza Paradise tab with menu
3. Fashion Factory tab with catalog
4. Add text overlay: "DEMO APP - No Real Transactions"

Save as:
- `screenshot-main.png`
- `screenshot-pizza.png`
- `screenshot-fashion.png`

---

## 🚨 Important Notes

- **Public Domain Required:** OpenAI requires a public domain (not localhost)
- **CSP Headers:** Already configured in server.js
- **HTTPS:** Vercel provides this automatically
- **No EU Data Residency:** Use global data residency for submission

---

## ✅ Deployment Checklist

Before submitting to OpenAI:

- [ ] Deployed to Vercel successfully
- [ ] Production URL works: `https://your-app.vercel.app`
- [ ] MCP endpoint responds: `https://your-app.vercel.app/mcp`
- [ ] Tested in ChatGPT Developer Mode
- [ ] All 6 tools working (3 Pizza + 3 Fashion)
- [ ] Widget UI displays correctly
- [ ] Privacy policy updated with contact info
- [ ] Screenshots prepared
- [ ] Organization verified on OpenAI Platform
- [ ] Have Owner role in organization

Good luck! 🚀
