"use client";

import { useState, useEffect } from "react";

type FashionItem = {
  id: number;
  name: string;
  description: string;
  price: string;
  icon: string;
  category: string;
};

type ToolOutput = {
  structuredContent?: {
    items?: FashionItem[];
  };
};

function getToolOutput(): ToolOutput | null {
  if (typeof window === "undefined") return null;
  const raw = window.openai?.toolOutput;
  return (raw as ToolOutput | undefined) ?? null;
}

export default function FashionWidgetPage() {
  const [toolOutput, setToolOutput] = useState<ToolOutput | null>(() => getToolOutput());

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.source !== window.parent) return;
      const message = event.data;
      if (!message || message.jsonrpc !== "2.0") return;
      if (message.method === "ui/notifications/tool-result") {
        setToolOutput(message.params);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const items = toolOutput?.structuredContent?.items ?? [];
  const shirts = items.filter(item => item.category === "Shirts");
  const pants = items.filter(item => item.category === "Pants");

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-6">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-purple-600 mb-2">👔 Fashion Factory</h1>
          <p className="text-gray-600">Premium clothing and apparel for modern lifestyle</p>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            Loading catalog...
          </div>
        ) : (
          <>
            {shirts.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">👔 Shirts</h2>
                <div className="grid gap-4 md:grid-cols-3">
                  {shirts.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                    >
                      <div className="text-center">
                        <div className="text-5xl mb-3">{item.icon}</div>
                        <h3 className="text-lg font-bold text-gray-800 mb-2">
                          {item.name}
                        </h3>
                        <p className="text-gray-600 text-sm mb-3">
                          {item.description}
                        </p>
                        <div className="text-2xl font-bold text-purple-600 mb-3">
                          {item.price}
                        </div>
                        <button className="w-full bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors">
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {pants.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">👖 Pants</h2>
                <div className="grid gap-4 md:grid-cols-3">
                  {pants.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                    >
                      <div className="text-center">
                        <div className="text-5xl mb-3">{item.icon}</div>
                        <h3 className="text-lg font-bold text-gray-800 mb-2">
                          {item.name}
                        </h3>
                        <p className="text-gray-600 text-sm mb-3">
                          {item.description}
                        </p>
                        <div className="text-2xl font-bold text-purple-600 mb-3">
                          {item.price}
                        </div>
                        <button className="w-full bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors">
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>🎓 Demo/Educational App - No real transactions</p>
        </div>
      </div>
    </div>
  );
}
