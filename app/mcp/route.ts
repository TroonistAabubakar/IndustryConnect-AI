import { NextRequest, NextResponse } from 'next/server';

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

const MCP_TOOLS = [
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
        pizza_name: { type: "string", description: "Name of the pizza to order" },
        quantity: { type: "number", description: "Quantity to order" },
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
        category: { type: "string", description: "Category to filter by" },
      },
    },
  },
  {
    name: "purchase_fashion_item",
    description: "Buy clothing items from Fashion Factory",
    inputSchema: {
      type: "object",
      properties: {
        item_name: { type: "string", description: "Name of the item to purchase" },
        size: { type: "string", description: "Size of the item" },
        quantity: { type: "number", description: "Quantity to purchase" },
      },
      required: ["item_name"],
    },
  },
];

function handleToolCall(toolName: string, args: any) {
  switch (toolName) {
    case "show_pizza_app":
      return {
        content: [{ type: "text", text: "🍕 Pizza Paradise - Delicious pizzas delivered to your door!" }],
        structuredContent: { menu: pizzas }
      };
    
    case "get_pizza_menu":
      return {
        content: [{ type: "text", text: "🍕 Pizza Paradise Menu - Choose your favorite!" }],
        structuredContent: { menu: pizzas }
      };
    
    case "order_pizza":
      const pizzaName = args?.pizza_name ?? "";
      const qty = args?.quantity ?? 1;
      return {
        content: [{ type: "text", text: `Order placed for ${qty}x ${pizzaName}! Estimated delivery: 30 minutes 🍕` }],
        structuredContent: { menu: pizzas }
      };
    
    case "show_fashion_app":
      return {
        content: [{ type: "text", text: "👔 Fashion Factory - Premium clothing and apparel for modern lifestyle" }],
        structuredContent: { items: fashionItems }
      };
    
    case "get_fashion_catalog":
      const category = args?.category;
      let items = fashionItems;
      if (category) {
        items = fashionItems.filter(item => item.category.toLowerCase() === category.toLowerCase());
      }
      return {
        content: [{ type: "text", text: `Fashion Factory - Premium clothing collection 👔` }],
        structuredContent: { items }
      };
    
    case "purchase_fashion_item":
      const itemName = args?.item_name ?? "";
      const size = args?.size ?? "M";
      return {
        content: [{ type: "text", text: `Purchase successful! Your ${itemName} (Size ${size}) will ship in 2-3 days 🎉` }],
        structuredContent: { items: fashionItems }
      };
    
    default:
      throw new Error(`Unknown tool: ${toolName}`);
  }
}

export async function GET(req: NextRequest) {
  return NextResponse.json({
    name: "industryconnect-ai",
    version: "1.0.0",
    description: "IndustryConnect AI MCP Server - Pizza Paradise & Fashion Factory",
    tools: MCP_TOOLS
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Handle MCP protocol requests
    if (body.method === "tools/list") {
      return NextResponse.json({
        tools: MCP_TOOLS
      });
    }
    
    if (body.method === "tools/call") {
      const { name, arguments: args } = body.params;
      const result = handleToolCall(name, args);
      return NextResponse.json(result);
    }
    
    // Default response
    return NextResponse.json({
      error: "Unknown method",
      method: body.method
    }, { status: 400 });
    
  } catch (error) {
    console.error("MCP error:", error);
    return NextResponse.json({
      error: "Internal server error"
    }, { status: 500 });
  }
}

export async function OPTIONS(req: NextRequest) {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE",
      "Access-Control-Allow-Headers": "content-type, mcp-session-id",
      "Access-Control-Expose-Headers": "Mcp-Session-Id",
    },
  });
}
