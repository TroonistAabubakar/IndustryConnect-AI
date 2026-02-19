'use client'

import { useState } from 'react'
import { ArrowLeft, Shirt, CheckCircle2 } from 'lucide-react'

interface ClothingViewProps {
  onBack: () => void
  toolData?: any
}

const defaultClothingItems = [
  {
    id: 1,
    name: 'Premium Cotton Shirt',
    description: 'Soft, breathable, perfect for any occasion',
    price: '$49.99',
    image: '👔',
    category: 'Shirts'
  },
  {
    id: 2,
    name: 'Classic Denim Pants',
    description: 'Durable denim with modern fit',
    price: '$79.99',
    image: '👖',
    category: 'Pants'
  },
  {
    id: 3,
    name: 'Designer Polo Shirt',
    description: 'Elegant polo with premium fabric',
    price: '$59.99',
    image: '👕',
    category: 'Shirts'
  },
  {
    id: 4,
    name: 'Casual Chino Pants',
    description: 'Comfortable chinos for everyday wear',
    price: '$69.99',
    image: '👖',
    category: 'Pants'
  },
  {
    id: 5,
    name: 'Formal Dress Shirt',
    description: 'Crisp white shirt for professional look',
    price: '$54.99',
    image: '👔',
    category: 'Shirts'
  },
  {
    id: 6,
    name: 'Slim Fit Jeans',
    description: 'Modern slim fit with stretch comfort',
    price: '$89.99',
    image: '👖',
    category: 'Pants'
  }
]

export default function ClothingView({ onBack, toolData }: ClothingViewProps) {
  const [purchasedItem, setPurchasedItem] = useState<string | null>(null)
  const clothingItems = toolData?.items || defaultClothingItems

  const handlePurchase = (itemName: string) => {
    setPurchasedItem(itemName)
    setTimeout(() => setPurchasedItem(null), 3000)
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
          <Shirt className="w-10 h-10 text-purple-600" />
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Fashion Factory</h2>
            <p className="text-gray-600">Premium clothing and apparel for modern lifestyle</p>
          </div>
        </div>

        {purchasedItem && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-green-600" />
            <div>
              <p className="font-semibold text-green-800">Purchase Successful!</p>
              <p className="text-green-700">Your {purchasedItem} will be shipped within 2-3 business days.</p>
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-6">
          {clothingItems.map((item: any) => (
            <div
              key={item.id}
              className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
            >
              <div className="text-6xl mb-4 text-center">{item.image}</div>
              <div className="mb-2">
                <span className="text-xs font-semibold text-purple-600 bg-purple-100 px-2 py-1 rounded">
                  {item.category}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{item.name}</h3>
              <p className="text-gray-600 mb-4 text-sm">{item.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-purple-600">{item.price}</span>
                <button
                  onClick={() => handlePurchase(item.name)}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg font-semibold transition-colors text-sm"
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
