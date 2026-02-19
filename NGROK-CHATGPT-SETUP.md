# Connect MCP Server to ChatGPT via Ngrok

Complete step-by-step guide to connect your IndustryConnect AI MCP server to ChatGPT.

---

## 🎯 Overview

ChatGPT cannot access `localhost:3001` directly. You need to:
1. Expose your local server with ngrok
2. Update your config files with the ngrok URL
3. Add your plugin to ChatGPT

---

## 📋 Prerequisites

- ✅ Next.js app built (`npm run build` completed)
- ✅ MCP server ready (`server/` folder)
- ✅ Ngrok installed

---

## Step 1: Build Your Next.js App

```bash
# From the root directory (industryconnect-ai/)
npm run build
```

This creates the `out/` folder that your MCP server will serve.

---

## Step 2: Install Ngrok

### Windows (PowerShell)
```powershell
# Download from https://ngrok.com/download
# Or use Chocolatey:
choco install ngrok
```

### Mac/Linux
```bash
brew install ngrok
```

### Verify Installation
```bash
ngrok version
```

---

## Step 3: Create Ngrok Account & Get Auth Token

1. Go to https://dashboard.ngrok.com/signup
2. Sign up for a free account
3. Go to https://dashboard.ngrok.com/get-started/your-authtoken
4. Copy your auth token

### Configure Ngrok
```bash
ngrok config add-authtoken YOUR_AUTH_TOKEN_HERE
```

---

## Step 4: Start Your MCP Server

```bash
# Navigate to server directory
cd server

# Install dependencies (first time only)
npm install

# Start the server
npm start
```

You should see:
```
🚀 IndustryConnect AI MCP Server running on http://localhost:3001
📡 OpenAPI spec: http://localhost:3001/openapi.yaml
🔌 AI Plugin manifest: http://localhost:3001/.well-known/ai-plugin.json
```

**Keep this terminal running!**

---

## Step 5: Start Ngrok Tunnel

Open a **NEW terminal** (keep the server running in the first one):

```bash
ngrok http 3001
```

You'll see output like this:
```
Session Status                online
Account                       your-email@example.com
Version                       3.x.x
Region                        United States (us)
Latency                       -
Web Interface                 http://127.0.0.1:4040
Forwarding                    https://abc123def456.ngrok-free.app -> http://localhost:3001

Connections                   ttl     opn     rt1     rt5     p50     p90
                              0       0       0.00    0.00    0.00    0.00
```

**IMPORTANT:** Copy the HTTPS URL (e.g., `https://abc123def456.ngrok-free.app`)

**Keep this terminal running too!**

---

## Step 6: Update Configuration Files

### 6.1 Update AI Plugin Manifest

Edit `server/.well-known/ai-plugin.json`:

**Replace:**
```json
{
  "api": {
    "type": "openapi",
    "url": "http://localhost:3001/openapi.yaml"
  },
  "logo_url": "http://localhost:3001/logo.png",
  "legal_info_url": "http://localhost:3001/legal",
  "ui": {
    "type": "webview",
    "url": "http://localhost:3001"
  }
}
```

**With (using your ngrok URL):**
```json
{
  "api": {
    "type": "openapi",
    "url": "https://abc123def456.ngrok-free.app/openapi.yaml"
  },
  "logo_url": "https://abc123def456.ngrok-free.app/logo.png",
  "legal_info_url": "https://abc123def456.ngrok-free.app/legal",
  "ui": {
    "type": "webview",
    "url": "https://abc123def456.ngrok-free.app"
  }
}
```

### 6.2 Update OpenAPI Specification

Edit `server/openapi.yaml`:

**Replace:**
```yaml
servers:
  - url: http://localhost:3001
    description: Local development server
  - url: https://your-ngrok-url.ngrok.io
    description: Ngrok tunnel for ChatGPT testing
```

**With (using your ngrok URL):**
```yaml
servers:
  - url: https://abc123def456.ngrok-free.app
    description: Ngrok tunnel for ChatGPT testing
```

### 6.3 Restart MCP Server

After updating the files:
1. Go to the terminal running your server
2. Press `Ctrl+C` to stop it
3. Run `npm start` again

---

## Step 7: Test Your Ngrok URL

Open your browser and test these URLs (replace with your ngrok URL):

1. **Health Check:**
   ```
   https://abc123def456.ngrok-free.app/api/health
   ```
   Should return: `{"status":"healthy","service":"IndustryConnect AI MCP Server","version":"1.0.0"}`

2. **OpenAPI Spec:**
   ```
   https://abc123def456.ngrok-free.app/openapi.yaml
   ```
   Should download or display the YAML file

3. **AI Plugin Manifest:**
   ```
   https://abc123def456.ngrok-free.app/.well-known/ai-plugin.json
   ```
   Should display the JSON manifest

4. **Frontend:**
   ```
   https://abc123def456.ngrok-free.app
   ```
   Should show your IndustryConnect AI app

---

## Step 8: Add Plugin to ChatGPT

### Method 1: ChatGPT Plugin Store (If Available)

**Note:** As of 2024, OpenAI has deprecated the plugin developer mode. You'll need to use the official submission process.

1. Go to https://platform.openai.com/docs/plugins
2. Follow the plugin submission guidelines
3. Submit your ngrok URL as the plugin URL

### Method 2: GPT Builder (Recommended for Testing)

1. Go to ChatGPT: https://chat.openai.com
2. Click on your profile → "My GPTs" → "Create a GPT"
3. In the Configure tab:
   - **Name:** IndustryConnect AI
   - **Description:** Multi-industry platform for pizza, IT services, and fashion
4. Click "Create new action"
5. **Import from URL:**
   ```
   https://abc123def456.ngrok-free.app/openapi.yaml
   ```
6. Click "Import"
7. Save your GPT

### Method 3: Actions in Custom GPT

1. Create a Custom GPT
2. Go to "Configure" → "Actions"
3. Click "Create new action"
4. Paste your OpenAPI spec URL:
   ```
   https://abc123def456.ngrok-free.app/openapi.yaml
   ```
5. ChatGPT will automatically parse and add all 6 tools

---

## Step 9: Test in ChatGPT

Once your GPT/Action is set up, try these prompts:

### Pizza Restaurant
```
Show me the pizza menu
I want to order a Margherita pizza
Order 2 pepperoni pizzas for delivery
```

### Troon Technologies
```
What services does Troon Technologies offer?
Tell me about Troon's blockchain development
I need help with AI/ML development
Contact Troon Technologies about a web project
```

### Fashion Factory
```
Show me the clothing catalog
I'm looking for shirts
Show me pants
I want to buy the Premium Cotton Shirt in size L
```

---

## 🔍 Debugging

### Check Ngrok Dashboard
Open http://localhost:4040 in your browser to see:
- All incoming requests
- Request/response details
- Errors

### Check Server Logs
Your server terminal shows all API calls:
```
POST /api/pizza/menu 200 45ms
POST /api/troon/services 200 32ms
```

### Common Issues

**Issue: "Failed to fetch OpenAPI spec"**
- Solution: Verify your ngrok URL is correct and accessible
- Test: Open `https://your-ngrok-url/openapi.yaml` in browser

**Issue: "CORS error"**
- Solution: Server already has CORS enabled, check ngrok URL uses HTTPS

**Issue: "Plugin not responding"**
- Solution: Make sure both server AND ngrok are running
- Check ngrok dashboard for incoming requests

**Issue: "UI not loading in ChatGPT"**
- Solution: Verify `npm run build` was completed
- Check that `out/` directory exists
- Test the ngrok URL directly in browser

---

## 📱 Important Notes

### Ngrok Free Tier Limitations
- URL changes every time you restart ngrok
- You'll need to update config files each time
- Consider ngrok paid plan for static URLs

### Keep Running
You need **3 terminals running**:
1. MCP server (`npm start` in `server/`)
2. Ngrok tunnel (`ngrok http 3001`)
3. Your command terminal (for testing)

### Ngrok URL Changes
Every time you restart ngrok, you get a new URL. You must:
1. Update `ai-plugin.json`
2. Update `openapi.yaml`
3. Restart the MCP server
4. Update the action in ChatGPT

---

## 🚀 Production Alternative

For production (instead of ngrok):

### Deploy to Vercel/Railway/Render
1. Push code to GitHub
2. Deploy server to hosting platform
3. Get permanent HTTPS URL
4. Update config files once
5. Submit to ChatGPT plugin store

---

## 📊 What Happens When It Works

1. **User asks ChatGPT:** "Show me pizza options"
2. **ChatGPT calls your tool:** `POST https://your-ngrok-url/api/pizza/menu`
3. **Your server responds:** Returns pizza menu data
4. **ChatGPT renders UI:** Shows your PizzaView component
5. **User interacts:** Can order pizza through your interface

---

## ✅ Checklist

- [ ] Next.js app built (`npm run build`)
- [ ] Ngrok installed and authenticated
- [ ] MCP server running (`npm start`)
- [ ] Ngrok tunnel running (`ngrok http 3001`)
- [ ] Ngrok URL copied
- [ ] `ai-plugin.json` updated with ngrok URL
- [ ] `openapi.yaml` updated with ngrok URL
- [ ] MCP server restarted
- [ ] Tested ngrok URLs in browser
- [ ] Created Custom GPT or Action in ChatGPT
- [ ] Imported OpenAPI spec
- [ ] Tested with prompts

---

**Need help? Check the ngrok dashboard at http://localhost:4040**
