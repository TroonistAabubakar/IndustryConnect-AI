import { readFileSync } from "node:fs";
import { join } from "node:path";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { z } from "zod";

export const runtime = "nodejs";

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

const replyWithPizzas = (message: string) => ({
  content: message ? [{ type: "text" as const, text: message }] : [],
  structuredContent: { menu: pizzas }
});

const replyWithFashion = (message: string) => ({
  content: message ? [{ type: "text" as const, text: message }] : [],
  structuredContent: { items: fashionItems }
});

function createIndustryConnectServer() {
  const server = new McpServer({
    name: "industryconnect-ai",
    version: "1.0.0",
  });

  // Pizza Paradise Tools
  server.setRequestHandler("tools/list", async () => ({
    tools: [
      {
        name: "show_pizza_app",
        description: "Displays the interactive IndustryConnect AI application with Pizza Paradise tab. Use this when user asks about pizza, food, restaurant, ordering food, or wants to eat.",
        inputSchema: {
          type: "object",
          properties: {},
        },
      },
      {
        name: "get_pizza_menu",
        description: "Browse the pizza menu from Pizza Paradise",
        inputSchema: {
          type: "object",
          properties: {},
        },
      },
      {
        name: "order_pizza",
        description: "Place a pizza order from Pizza Paradise",
        inputSchema: {
          type: "object",
          properties: {
            pizza_name: { type: "string" },
            quantity: { type: "number" },
          },
          required: ["pizza_name"],
        },
      },
      {
        name: "show_fashion_app",
        description: "Displays the interactive IndustryConnect AI application with Fashion Factory tab. Use this when user asks about fashion, clothing, apparel, shirts, pants, or wants to buy clothes.",
        inputSchema: {
          type: "object",
          properties: {},
        },
      },
      {
        name: "get_fashion_catalog",
        description: "Browse premium clothing and apparel from Fashion Factory",
        inputSchema: {
          type: "object",
          properties: {
            category: { type: "string" },
          },
        },
      },
      {
        name: "purchase_fashion_item",
        description: "Buy clothing items from Fashion Factory",
        inputSchema: {
          type: "object",
          properties: {
            item_name: { type: "string" },
            size: { type: "string" },
            quantity: { type: "number" },
          },
          required: ["item_name"],
        },
      },
    ],
  }));

  server.setRequestHandler("tools/call", async (request) => {
    const { name, arguments: args } = request.params;

    switch (name) {
      case "show_pizza_app":
        return replyWithPizzas("🍕 Pizza Paradise - Delicious pizzas delivered to your door!");
      
      case "get_pizza_menu":
        return replyWithPizzas("🍕 Pizza Paradise Menu - Choose your favorite!");
      
      case "order_pizza": {
        const pizzaName = (args as any)?.pizza_name ?? "";
        const qty = (args as any)?.quantity ?? 1;
        return replyWithPizzas(`Order placed for ${qty}x ${pizzaName}! Estimated delivery: 30 minutes 🍕`);
      }
      
      case "show_fashion_app":
        return replyWithFashion("👔 Fashion Factory - Premium clothing and apparel for modern lifestyle");
      
      case "get_fashion_catalog": {
        const category = (args as any)?.category;
        let items = fashionItems;
        if (category) {
          items = fashionItems.filter(item => item.category.toLowerCase() === category.toLowerCase());
        }
        return {
          content: [{ type: "text" as const, text: `Fashion Factory - Premium clothing collection 👔` }],
          structuredContent: { items }
        };
      }
      
      case "purchase_fashion_item": {
        const itemName = (args as any)?.item_name ?? "";
        const size = (args as any)?.size ?? "M";
        return replyWithFashion(`Purchase successful! Your ${itemName} (Size ${size}) will ship in 2-3 days 🎉`);
      }
      
      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  });

  return server;
}

async function handleMcpRequest(req: Request) {
  const server = createIndustryConnectServer();
  const transport = new StreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
    enableJsonResponse: true,
  });

  await server.connect(transport);

  // Convert Next.js Request to Node.js-like request
  const nodeReq = {
    method: req.method,
    url: req.url,
    headers: Object.fromEntries(req.headers.entries()),
  };

  // Create a response handler
  return new Promise<Response>((resolve) => {
    const chunks: Uint8Array[] = [];
    const nodeRes = {
      statusCode: 200,
      headers: {} as Record<string, string>,
      writeHead(status: number, headers?: Record<string, string>) {
        this.statusCode = status;
        if (headers) this.headers = { ...this.headers, ...headers };
        return this;
      },
      setHeader(name: string, value: string) {
        this.headers[name] = value;
      },
      write(chunk: any) {
        chunks.push(typeof chunk === 'string' ? new TextEncoder().encode(chunk) : chunk);
      },
      end(chunk?: any) {
        if (chunk) this.write(chunk);
        const body = new Uint8Array(chunks.reduce((acc, c) => acc + c.length, 0));
        let offset = 0;
        for (const chunk of chunks) {
          body.set(chunk, offset);
          offset += chunk.length;
        }
        resolve(new Response(body, {
          status: this.statusCode,
          headers: this.headers,
        }));
      },
      on() {},
    };

    transport.handleRequest(nodeReq as any, nodeRes as any).catch((error) => {
      console.error("MCP request error:", error);
      resolve(new Response("Internal server error", { status: 500 }));
    });
  });
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  
  if (url.pathname === "/mcp" || url.pathname === "/api/mcp") {
    return handleMcpRequest(req);
  }
  
  return new Response("IndustryConnect AI MCP Server", {
    status: 200,
    headers: { "Content-Type": "text/plain" },
  });
}

export async function POST(req: Request) {
  return handleMcpRequest(req);
}

export async function OPTIONS(req: Request) {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE",
      "Access-Control-Allow-Headers": "content-type, mcp-session-id",
      "Access-Control-Expose-Headers": "Mcp-Session-Id",
    },
  });
}
