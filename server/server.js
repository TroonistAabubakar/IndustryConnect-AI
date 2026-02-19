import { createServer } from "node:http";
import { readFileSync } from "node:fs";
import { registerAppResource, registerAppTool, RESOURCE_MIME_TYPE } from "@modelcontextprotocol/ext-apps/server";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { z } from "zod";

const mainWidgetHtml = readFileSync("public/main-widget.html", "utf8");

// Pizza data
const pizzas = [
  { id: 1, name: 'Margherita Classic', description: 'Fresh mozzarella, tomato sauce, basil', price: '$12.99', icon: '🍕' },
  { id: 2, name: 'Pepperoni Supreme', description: 'Double pepperoni, extra cheese, Italian herbs', price: '$15.99', icon: '🍕' },
  { id: 3, name: 'Veggie Delight', description: 'Bell peppers, mushrooms, olives, onions', price: '$13.99', icon: '🍕' },
  { id: 4, name: 'BBQ Chicken', description: 'Grilled chicken, BBQ sauce, red onions', price: '$16.99', icon: '🍕' }
];

// Fashion items
const fashionItems = [
  { id: 1, name: 'Premium Cotton Shirt', description: 'Soft, breathable, perfect for any occasion', price: '$49.99', icon: '👔', category: 'Shirts' },
  { id: 2, name: 'Classic Denim Pants', description: 'Durable denim with modern fit', price: '$79.99', icon: '👖', category: 'Pants' },
  { id: 3, name: 'Designer Polo Shirt', description: 'Elegant polo with premium fabric', price: '$59.99', icon: '👔', category: 'Shirts' },
  { id: 4, name: 'Casual Chino Pants', description: 'Comfortable chinos for everyday wear', price: '$69.99', icon: '👖', category: 'Pants' },
  { id: 5, name: 'Formal Dress Shirt', description: 'Crisp white shirt for professional look', price: '$54.99', icon: '👔', category: 'Shirts' },
  { id: 6, name: 'Slim Fit Jeans', description: 'Modern slim fit with stretch comfort', price: '$89.99', icon: '👖', category: 'Pants' }
];

const replyWithPizzas = (message) => ({
  content: message ? [{ type: "text", text: message }] : [],
  structuredContent: { menu: pizzas }
});

const replyWithFashion = (message) => ({
  content: message ? [{ type: "text", text: message }] : [],
  structuredContent: { items: fashionItems }
});

function createIndustryConnectServer() {
  const server = new McpServer({
    name: "industryconnect-ai",
    version: "1.0.0",
  });

  // Main Unified Widget Resource
  registerAppResource(
    server,
    "main-widget",
    "ui://widget/industryconnect.html",
    {},
    async () => ({
      contents: [{
        uri: "ui://widget/industryconnect.html",
        mimeType: RESOURCE_MIME_TYPE,
        text: mainWidgetHtml,
      }],
    })
  );

  // Pizza Paradise Tools
  registerAppTool(
    server,
    "show_pizza_app",
    {
      title: "Show Pizza Paradise App",
      description: "Displays the interactive IndustryConnect AI application with Pizza Paradise tab. Use this when user asks about pizza, food, restaurant, ordering food, or wants to eat.",
      inputSchema: {},
      _meta: {
        ui: { resourceUri: "ui://widget/industryconnect.html" }
      }
    },
    async () => replyWithPizzas("🍕 Pizza Paradise - Delicious pizzas delivered to your door!")
  );

  registerAppTool(
    server,
    "get_pizza_menu",
    {
      title: "Get Pizza Menu",
      description: "Browse the pizza menu from Pizza Paradise",
      inputSchema: {},
      _meta: {
        ui: { resourceUri: "ui://widget/industryconnect.html" }
      }
    },
    async () => replyWithPizzas("🍕 Pizza Paradise Menu - Choose your favorite!")
  );

  registerAppTool(
    server,
    "order_pizza",
    {
      title: "Order Pizza",
      description: "Place a pizza order from Pizza Paradise",
      inputSchema: {
        pizza_name: z.string().min(1),
        quantity: z.number().optional()
      },
      _meta: {
        ui: { resourceUri: "ui://widget/industryconnect.html" }
      }
    },
    async (args) => {
      const name = args?.pizza_name ?? "";
      const qty = args?.quantity ?? 1;
      return replyWithPizzas(`Order placed for ${qty}x ${name}! Estimated delivery: 30 minutes 🍕`);
    }
  );

  // Fashion Factory Tools
  registerAppTool(
    server,
    "show_fashion_app",
    {
      title: "Show Fashion Factory App",
      description: "Displays the interactive IndustryConnect AI application with Fashion Factory tab. Use this when user asks about fashion, clothing, apparel, shirts, pants, or wants to buy clothes.",
      inputSchema: {},
      _meta: {
        ui: { resourceUri: "ui://widget/industryconnect.html" }
      }
    },
    async () => replyWithFashion("👔 Fashion Factory - Premium clothing and apparel for modern lifestyle")
  );

  registerAppTool(
    server,
    "get_fashion_catalog",
    {
      title: "Get Fashion Catalog",
      description: "Browse premium clothing and apparel from Fashion Factory",
      inputSchema: {
        category: z.string().optional()
      },
      _meta: {
        ui: { resourceUri: "ui://widget/industryconnect.html" }
      }
    },
    async (args) => {
      const category = args?.category;
      let items = fashionItems;
      if (category) {
        items = fashionItems.filter(item => item.category.toLowerCase() === category.toLowerCase());
      }
      return {
        content: [{ type: "text", text: `Fashion Factory - Premium clothing collection 👔` }],
        structuredContent: { items }
      };
    }
  );

  registerAppTool(
    server,
    "purchase_fashion_item",
    {
      title: "Purchase Fashion Item",
      description: "Buy clothing items from Fashion Factory",
      inputSchema: {
        item_name: z.string().min(1),
        size: z.string().optional(),
        quantity: z.number().optional()
      },
      _meta: {
        ui: { resourceUri: "ui://widget/industryconnect.html" }
      }
    },
    async (args) => {
      const name = args?.item_name ?? "";
      const size = args?.size ?? "M";
      return replyWithFashion(`Purchase successful! Your ${name} (Size ${size}) will ship in 2-3 days 🎉`);
    }
  );

  return server;
}

const port = Number(process.env.PORT ?? 3001);
const MCP_PATH = "/mcp";

const httpServer = createServer(async (req, res) => {
  if (!req.url) {
    res.writeHead(400).end("Missing URL");
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host ?? "localhost"}`);

  // CORS preflight
  if (req.method === "OPTIONS" && url.pathname === MCP_PATH) {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE",
      "Access-Control-Allow-Headers": "content-type, mcp-session-id",
      "Access-Control-Expose-Headers": "Mcp-Session-Id",
      "Content-Security-Policy": "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://chat.openai.com;",
    });
    res.end();
    return;
  }

  // Health check
  if (req.method === "GET" && url.pathname === "/") {
    res.writeHead(200, { "content-type": "text/plain" }).end("IndustryConnect AI MCP Server");
    return;
  }

  // MCP endpoint
  const MCP_METHODS = new Set(["POST", "GET", "DELETE"]);
  if (url.pathname === MCP_PATH && req.method && MCP_METHODS.has(req.method)) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Expose-Headers", "Mcp-Session-Id");
    res.setHeader("Content-Security-Policy", "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self' https://chat.openai.com;");

    const server = createIndustryConnectServer();
    const transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: undefined,
      enableJsonResponse: true,
    });

    res.on("close", () => {
      transport.close();
      server.close();
    });

    try {
      await server.connect(transport);
      await transport.handleRequest(req, res);
    } catch (error) {
      console.error("Error handling MCP request:", error);
      if (!res.headersSent) {
        res.writeHead(500).end("Internal server error");
      }
    }
    return;
  }

  res.writeHead(404).end("Not Found");
});

httpServer.listen(port, () => {
  console.log(`🚀 IndustryConnect AI MCP Server running on http://localhost:${port}${MCP_PATH}`);
  console.log(`\n🎯 Available Tools (6 total):`);
  console.log(`   Pizza: show_pizza_app, get_pizza_menu, order_pizza`);
  console.log(`   Fashion: show_fashion_app, get_fashion_catalog, purchase_fashion_item`);
  console.log(`\n📚 Demo/Educational App - No real transactions`);
});
