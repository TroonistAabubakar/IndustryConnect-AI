# 🧪 Testing Your MCP Server

## Your Deployment URLs

**Backend (MCP Server):**
```
https://industryconnectapp-ai.vercel.app
```

**MCP Endpoint (for ChatGPT):**
```
https://industryconnectapp-ai.vercel.app/mcp
```

**Frontend (Next.js - Optional):**
```
https://industryconnect-ai.vercel.app
```

---

## ✅ Step 1: Test Backend Deployment

### Test Health Check
```bash
curl https://industryconnectapp-ai.vercel.app/
```

**Expected Response:**
```
IndustryConnect AI MCP Server
```

### Test MCP Endpoint
```bash
curl https://industryconnectapp-ai.vercel.app/mcp
```

**Expected:** SSE stream or MCP server response (not 404)

---

## 🎯 Step 2: Test in ChatGPT Developer Mode

### A. Enable Developer Mode in ChatGPT

1. Go to **ChatGPT** (chat.openai.com)
2. Click **Settings** (profile icon → Settings)
3. Go to **Beta Features** or **Developer Settings**
4. Enable **"Apps"** or **"MCP"** or **"Developer Mode"**

### B. Connect Your MCP Server

1. In ChatGPT Settings, find **"Apps"** or **"MCP Servers"**
2. Click **"Add Server"** or **"Connect MCP Server"**
3. Enter:
   - **Name:** IndustryConnect AI
   - **URL:** `https://industryconnectapp-ai.vercel.app/mcp`
   - **Type:** MCP Server
4. Click **"Connect"** or **"Save"**
5. **Refresh ChatGPT** page

### C. Test with Prompts

Try these in ChatGPT:

**Pizza App:**
```
Show me the pizza app
I want to order pizza
Get me the pizza menu
```

**Fashion App:**
```
Show me the fashion app
I need new clothes
Browse fashion items
```

**Expected Result:**
- ✅ Interactive widget appears in ChatGPT
- ✅ Two tabs: 🍕 Pizza Paradise | 👔 Fashion Factory
- ✅ Clickable cards with Order/Buy buttons
- ✅ NOT just text responses

---

## 🔍 Step 3: Verify Widget UI

When the widget appears, check:

- [ ] Header shows "IndustryConnect AI - Demo App"
- [ ] Two tabs are visible and clickable
- [ ] Pizza tab shows 4 pizza items with prices
- [ ] Fashion tab shows 6 clothing items with prices
- [ ] Order/Buy buttons are clickable
- [ ] UI fits within ChatGPT iframe (no horizontal scroll)
- [ ] Responsive design works at different widths

---

## 🐛 Troubleshooting

### Issue: 404 on /mcp endpoint

**Cause:** Server not deployed or wrong URL

**Solution:**
```bash
# Check deployment status
cd "d:/Troon Projects/ChatGpt sdk/industryconnect-ai/server"
vercel ls

# Redeploy if needed
vercel --prod
```

### Issue: ChatGPT shows text instead of UI

**Cause:** Developer Mode not enabled or MCP not connected

**Solution:**
1. Enable "Apps" in ChatGPT settings
2. Connect MCP server with correct URL
3. Refresh ChatGPT page
4. Try explicit prompt: "Show me the IndustryConnect AI app"

### Issue: Widget shows but looks broken

**Cause:** CSS or HTML issues

**Solution:**
1. Check browser console for errors (F12)
2. Verify widget HTML is served correctly:
   ```bash
   curl https://industryconnectapp-ai.vercel.app/public/main-widget.html
   ```
3. Check server logs in Vercel dashboard

### Issue: CORS errors

**Cause:** CSP headers not configured

**Solution:**
- CSP headers are already configured in `server.js`
- Check Vercel logs for errors
- Verify server is running correctly

---

## 📊 Vercel Dashboard

Monitor your deployment:

1. Go to https://vercel.com/dashboard
2. Find **IndustryConnectApp-AI** project
3. Check:
   - Deployment status (should be "Ready")
   - Function logs (for errors)
   - Analytics (for requests)

---

## ✅ Pre-Submission Checklist

Before submitting to OpenAI:

- [ ] Backend deployed: `https://industryconnectapp-ai.vercel.app`
- [ ] Health check works: Returns "IndustryConnect AI MCP Server"
- [ ] MCP endpoint accessible: `/mcp` returns SSE stream
- [ ] Tested in ChatGPT Developer Mode
- [ ] Widget UI displays correctly
- [ ] All 6 tools working (3 Pizza + 3 Fashion)
- [ ] Both tabs functional
- [ ] No console errors
- [ ] Responsive design works (300px-800px)
- [ ] Privacy policy updated with contact info
- [ ] Screenshots prepared

---

## 🚀 Ready for OpenAI Submission

Once all tests pass, use this URL for submission:

**MCP Server URL:**
```
https://industryconnectapp-ai.vercel.app/mcp
```

**App Name:** IndustryConnect AI

**Category:** Developer Tools / Education

**Description:** Educational demo showcasing MCP integration with interactive pizza ordering and fashion shopping UIs. No real transactions - for learning purposes.

---

## 🎯 Test Commands Summary

```bash
# Test health check
curl https://industryconnectapp-ai.vercel.app/

# Test MCP endpoint
curl https://industryconnectapp-ai.vercel.app/mcp

# Test widget HTML
curl https://industryconnectapp-ai.vercel.app/public/main-widget.html

# Check deployment
cd server
vercel ls

# View logs
vercel logs
```

Good luck! 🎉
