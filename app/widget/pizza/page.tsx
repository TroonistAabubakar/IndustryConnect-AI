"use client";

import { useState, useEffect } from "react";

type Pizza = {
  id: number;
  name: string;
  description: string;
  price: string;
  icon: string;
};

type ToolOutput = {
  structuredContent?: {
    menu?: Pizza[];
  };
};

function getToolOutput(): ToolOutput | null {
  if (typeof window === "undefined") return null;
  const raw = window.openai?.toolOutput;
  return (raw as ToolOutput | undefined) ?? null;
}

export default function PizzaWidgetPage() {
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

  const pizzas = toolOutput?.structuredContent?.menu ?? [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 p-6">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-orange-600 mb-2">🍕 Pizza Paradise</h1>
          <p className="text-gray-600">Delicious pizzas delivered to your door!</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {pizzas.length === 0 ? (
            <div className="col-span-2 text-center py-12 text-gray-500">
              Loading menu...
            </div>
          ) : (
            pizzas.map((pizza) => (
              <div
                key={pizza.id}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="text-5xl">{pizza.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {pizza.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      {pizza.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-orange-600">
                        {pizza.price}
                      </span>
                      <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors">
                        Order Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>🎓 Demo/Educational App - No real transactions</p>
        </div>
      </div>
    </div>
  );
}
