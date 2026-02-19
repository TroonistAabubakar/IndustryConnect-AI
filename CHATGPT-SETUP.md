# ChatGPT MCP Setup Guide

## ⚠️ Critical: Enable Developer Mode in ChatGPT

Your MCP app UI will **NOT display** unless ChatGPT is in the correct mode. Follow these steps:

---

## 🔧 Step 1: Access ChatGPT Settings

1. Go to **ChatGPT** (chat.openai.com)
2. Click your **profile icon** (bottom left)
3. Select **Settings**
4. Go to **Beta Features** or **Developer Settings**

---

## 🎯 Step 2: Enable MCP/Apps Features

Look for one of these options and **enable it**:

- ✅ **"Enable Apps"** or **"Apps (Beta)"**
- ✅ **"Model Context Protocol"** or **"MCP"**
- ✅ **"Developer Mode"** or **"Advanced Features"**

**Important:** Without this enabled, ChatGPT will only show text responses, not your interactive UI!

---

## 🔗 Step 3: Connect Your MCP Server

### Option A: Using DevTunnel (Current Setup)

1. In ChatGPT settings, find **"Apps"** or **"MCP Servers"**
2. Click **"Add Server"** or **"Connect MCP Server"**
3. Enter your server details:
   - **Name:** IndustryConnect AI
   - **URL:** `https://t53ffb5r-3001.inc1.devtunnels.ms/mcp`
   - **Type:** MCP Server

4. Click **"Connect"** or **"Save"**

### Option B: Using Localhost (Development)

If testing locally:
1. Make sure your server is running: `npm start` in the `server` folder
2. Use: `http://localhost:3001/mcp`

---

## 🧪 Step 4: Test the Connection

In ChatGPT, try these prompts:

### Pizza App
```
Show me the pizza app
I want to order pizza
Get me a pizza menu
```

### Fashion App
```
Show me the fashion app
I need new clothes
Browse fashion items
```

---

## ✅ Expected Behavior

When working correctly, you should see:

1. **Interactive Widget UI** appears in ChatGPT
2. **Two tabs**: 🍕 Pizza Paradise | 👔 Fashion Factory
3. **Clickable cards** with Order/Buy buttons
4. **NOT just text responses**

---

## ❌ Troubleshooting

### Problem: Only Text Responses (No UI)

**Cause:** ChatGPT is not in the right mode or MCP not connected

**Solution:**
1. ✅ Enable "Apps" or "MCP" in ChatGPT settings
2. ✅ Reconnect your MCP server
3. ✅ Restart ChatGPT (refresh the page)
4. ✅ Try prompt: "Show me the IndustryConnect AI app"

### Problem: "Unable to access UI"

**Cause:** Server not responding or wrong URL

**Solution:**
1. ✅ Check server is running: `npm start`
2. ✅ Verify DevTunnel is active
3. ✅ Test URL in browser: `https://t53ffb5r-3001.inc1.devtunnels.ms/mcp`
4. ✅ Check server logs for errors

### Problem: UI Shows but Looks Broken

**Cause:** CSS or HTML issues

**Solution:**
1. ✅ Clear browser cache
2. ✅ Restart MCP server
3. ✅ Check browser console for errors

---

## 🚀 Quick Start Commands

```bash
# Start the server
cd server
npm start

# Should see:
# 🚀 IndustryConnect AI MCP Server running on http://localhost:3001/mcp
# 🎯 Available Tools (6 total):
#    Pizza: show_pizza_app, get_pizza_menu, order_pizza
#    Fashion: show_fashion_app, get_fashion_catalog, purchase_fashion_item
```

---

## 📝 Important Notes

1. **MCP Apps are a Beta Feature** - You must explicitly enable them in ChatGPT settings
2. **Developer Mode Required** - Regular ChatGPT mode won't show custom UIs
3. **Connection Must Be Active** - Server must be running when you use ChatGPT
4. **First Time Setup** - May need to disconnect and reconnect the MCP server

---

## 🔍 Verification Checklist

Before testing in ChatGPT:

- [ ] Server running on port 3001
- [ ] DevTunnel active (if using remote access)
- [ ] ChatGPT "Apps" or "MCP" feature enabled
- [ ] MCP server connected in ChatGPT settings
- [ ] ChatGPT page refreshed after connecting

---

## 💡 Pro Tips

1. **Use Explicit Prompts:** Say "Show me the pizza app" instead of just "pizza"
2. **Refresh Connection:** If UI stops showing, disconnect and reconnect in settings
3. **Check Console:** Open browser DevTools to see any JavaScript errors
4. **Test Locally First:** Verify `http://localhost:3001/mcp` works before using DevTunnel

---

## 📞 Still Not Working?

If you've followed all steps and the UI still doesn't appear:

1. **Verify ChatGPT Plan:** Some features require ChatGPT Plus or Team
2. **Check OpenAI Status:** Visit status.openai.com
3. **Try Different Browser:** Test in Chrome/Edge incognito mode
4. **Review Server Logs:** Look for errors when ChatGPT calls tools

---

## 🎯 Success Indicators

You'll know it's working when:

✅ ChatGPT shows a **visual widget** (not just text)
✅ You can **click buttons** in the widget
✅ **Tabs switch** between Pizza and Fashion
✅ **Data updates** when you interact with the UI

Good luck! 🚀
