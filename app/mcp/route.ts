import { baseURL } from "@/baseUrl";
import { createMcpHandler } from "mcp-handler";
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

type ContentWidget = {
  id: string;
  title: string;
  templateUri: string;
  invoking: string;
  invoked: string;
  htmlPath: string;
  description: string;
};

function widgetMeta(widget: ContentWidget) {
  return {
    "openai/outputTemplate": widget.templateUri,
    "openai/toolInvocation/invoking": widget.invoking,
    "openai/toolInvocation/invoked": widget.invoked,
    "openai/widgetAccessible": false,
    "openai/resultCanProduceWidget": true,
  } as const;
}

const getAppsSdkCompatibleHtml = async (baseUrl: string, path: string) => {
  const result = await fetch(`${baseUrl}${path}`);
  return await result.text();
};

const handler = createMcpHandler(async (server) => {
  const widgets: Record<"pizza" | "fashion", ContentWidget> = {
    pizza: {
      id: "show_pizza_app",
      title: "Show Pizza Paradise App",
      templateUri: "ui://widget/pizza.html",
      invoking: "Loading Pizza Paradise...",
      invoked: "Pizza Paradise loaded",
      htmlPath: "/widget/pizza",
      description: "Displays the interactive Pizza Paradise ordering interface.",
    },
    fashion: {
      id: "show_fashion_app",
      title: "Show Fashion Factory App",
      templateUri: "ui://widget/fashion.html",
      invoking: "Loading Fashion Factory...",
      invoked: "Fashion Factory loaded",
      htmlPath: "/widget/fashion",
      description: "Displays the interactive Fashion Factory shopping interface.",
    },
  };

  // Register widget resources
  for (const key of Object.keys(widgets) as Array<keyof typeof widgets>) {
    const widget = widgets[key];
    const html = await getAppsSdkCompatibleHtml(baseURL, widget.htmlPath);

    server.registerResource(
      `${key}-widget`,
      widget.templateUri,
      {
        title: widget.title,
        description: widget.description,
        mimeType: "text/html+skybridge",
        _meta: {
          "openai/widgetDescription": widget.description,
          "openai/widgetPrefersBorder": true,
        },
      },
      async (uri) => ({
        contents: [
          {
            uri: uri.href,
            mimeType: "text/html+skybridge",
            text: `<html>${html}</html>`,
            _meta: {
              "openai/widgetDescription": widget.description,
              "openai/widgetPrefersBorder": true,
            },
          },
        ],
      })
    );
  }

  // Pizza Paradise Tools
  server.registerTool(
    widgets.pizza.id,
    {
      title: widgets.pizza.title,
      description: "Displays the interactive IndustryConnect AI application with Pizza Paradise tab. Use this when user asks about pizza, food, restaurant, ordering food, or wants to eat.",
      inputSchema: {},
      _meta: widgetMeta(widgets.pizza),
    },
    async () => ({
      content: [{ type: "text", text: "🍕 Pizza Paradise - Delicious pizzas delivered to your door!" }],
      structuredContent: { menu: pizzas },
      _meta: widgetMeta(widgets.pizza),
    })
  );

  server.registerTool(
    "get_pizza_menu",
    {
      title: "Get Pizza Menu",
      description: "Browse the pizza menu from Pizza Paradise",
      inputSchema: {},
      _meta: widgetMeta(widgets.pizza),
    },
    async () => ({
      content: [{ type: "text", text: "🍕 Pizza Paradise Menu - Choose your favorite!" }],
      structuredContent: { menu: pizzas },
      _meta: widgetMeta(widgets.pizza),
    })
  );

  server.registerTool(
    "order_pizza",
    {
      title: "Order Pizza",
      description: "Place a pizza order from Pizza Paradise",
      inputSchema: {
        pizza_name: z.string().min(1).describe("Name of the pizza to order"),
        quantity: z.number().optional().describe("Quantity to order"),
      },
      _meta: widgetMeta(widgets.pizza),
    },
    async ({ pizza_name, quantity }) => {
      const qty = quantity ?? 1;
      return {
        content: [{ type: "text", text: `Order placed for ${qty}x ${pizza_name}! Estimated delivery: 30 minutes 🍕` }],
        structuredContent: { menu: pizzas },
        _meta: widgetMeta(widgets.pizza),
      };
    }
  );

  // Fashion Factory Tools
  server.registerTool(
    widgets.fashion.id,
    {
      title: widgets.fashion.title,
      description: "Displays the interactive IndustryConnect AI application with Fashion Factory tab. Use this when user asks about fashion, clothing, apparel, shirts, pants, or wants to buy clothes.",
      inputSchema: {},
      _meta: widgetMeta(widgets.fashion),
    },
    async () => ({
      content: [{ type: "text", text: "👔 Fashion Factory - Premium clothing and apparel for modern lifestyle" }],
      structuredContent: { items: fashionItems },
      _meta: widgetMeta(widgets.fashion),
    })
  );

  server.registerTool(
    "get_fashion_catalog",
    {
      title: "Get Fashion Catalog",
      description: "Browse premium clothing and apparel from Fashion Factory",
      inputSchema: {
        category: z.string().optional().describe("Category to filter by (Shirts or Pants)"),
      },
      _meta: widgetMeta(widgets.fashion),
    },
    async ({ category }) => {
      let items = fashionItems;
      if (category) {
        items = fashionItems.filter(item => item.category.toLowerCase() === category.toLowerCase());
      }
      return {
        content: [{ type: "text", text: `Fashion Factory - Premium clothing collection 👔` }],
        structuredContent: { items },
        _meta: widgetMeta(widgets.fashion),
      };
    }
  );

  server.registerTool(
    "purchase_fashion_item",
    {
      title: "Purchase Fashion Item",
      description: "Buy clothing items from Fashion Factory",
      inputSchema: {
        item_name: z.string().min(1).describe("Name of the item to purchase"),
        size: z.string().optional().describe("Size of the item (S, M, L, XL)"),
        quantity: z.number().optional().describe("Quantity to purchase"),
      },
      _meta: widgetMeta(widgets.fashion),
    },
    async ({ item_name, size, quantity }) => {
      const itemSize = size ?? "M";
      const qty = quantity ?? 1;
      return {
        content: [{ type: "text", text: `Purchase successful! Your ${item_name} (Size ${itemSize}) x${qty} will ship in 2-3 days 🎉` }],
        structuredContent: { items: fashionItems },
        _meta: widgetMeta(widgets.fashion),
      };
    }
  );
});

export const GET = handler;
export const POST = handler;
