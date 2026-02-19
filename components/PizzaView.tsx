'use client'

import { useState } from 'react'
import { ArrowLeft, Pizza, CheckCircle2 } from 'lucide-react'

interface PizzaViewProps {
  onBack: () => void
  toolData?: any
}

const defaultPizzas = [
  {
    id: 1,
    name: 'Margherita Classic',
    description: 'Fresh mozzarella, tomato sauce, basil',
    price: '$12.99',
    image: '🍕'
  },
  {
    id: 2,
    name: 'Pepperoni Supreme',
    description: 'Double pepperoni, extra cheese, Italian herbs',
    price: '$15.99',
    image: '🍕'
  },
  {
    id: 3,
    name: 'Veggie Delight',
    description: 'Bell peppers, mushrooms, olives, onions',
    price: '$13.99',
    image: '🍕'
  },
  {
    id: 4,
    name: 'BBQ Chicken',
    description: 'Grilled chicken, BBQ sauce, red onions',
    price: '$16.99',
    image: '🍕'
  }
]

export default function PizzaView({ onBack, toolData }: PizzaViewProps) {
  const [orderedItem, setOrderedItem] = useState<string | null>(null)
  const pizzas = toolData?.menu || defaultPizzas

  const handleOrder = (pizzaName: string) => {
    setOrderedItem(pizzaName)
    setTimeout(() => setOrderedItem(null), 3000)
  }

  return (
    <div className="animate-fadeIn">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Industries
      </button>

      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="flex items-center gap-3 mb-6">
          <Pizza className="w-10 h-10 text-orange-600" />
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Pizza Paradise</h2>
            <p className="text-gray-600">Authentic Italian pizzas delivered fresh</p>
          </div>
        </div>

        {orderedItem && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-green-600" />
            <div>
              <p className="font-semibold text-green-800">Order Successful!</p>
              <p className="text-green-700">Your {orderedItem} is being prepared. Estimated delivery: 30 mins</p>
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {pizzas.map((pizza: any) => (
            <div
              key={pizza.id}
              className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
            >
              <div className="text-6xl mb-4 text-center">{pizza.image}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{pizza.name}</h3>
              <p className="text-gray-600 mb-4">{pizza.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-orange-600">{pizza.price}</span>
                <button
                  onClick={() => handleOrder(pizza.name)}
                  className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                >
                  Place Order
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
