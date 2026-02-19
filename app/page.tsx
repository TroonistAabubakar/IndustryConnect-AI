'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import PizzaView from '@/components/PizzaView'
import ClothingView from '@/components/ClothingView'
import SearchBar from '@/components/SearchBar'
import { Pizza, Shirt } from 'lucide-react'

type Industry = 'pizza' | 'fashion' | null

function HomeContent() {
  const searchParams = useSearchParams()
  const [activeIndustry, setActiveIndustry] = useState<Industry>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [toolData, setToolData] = useState<any>(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && window.openai?.onToolResponse) {
      window.openai.onToolResponse((data) => {
        console.log('Received tool response from ChatGPT:', data);
        setToolData(data);
        
        if (data.ui_component === 'pizza_view') {
          setActiveIndustry('pizza');
        } else if (data.ui_component === 'clothing_view') {
          setActiveIndustry('fashion');
        }
      });
    }
  }, []);

  useEffect(() => {
    const query = searchParams.get('query') || searchQuery
    if (query) {
      const industry = detectIndustry(query.toLowerCase())
      setActiveIndustry(industry)
    }
  }, [searchParams, searchQuery])

  const detectIndustry = (query: string): Industry => {
    const pizzaKeywords = ['pizza', 'restaurant', 'food', 'order food', 'delivery', 'italian', 'margherita', 'pepperoni', 'cheese', 'dine', 'eat', 'hungry', 'meal', 'lunch', 'dinner']
    const fashionKeywords = ['fashion', 'clothes', 'clothing', 'shirt', 'pants', 'apparel', 'wear', 'dress', 'style', 'outfit', 'wardrobe', 'garment', 'textile', 'fabric', 'denim']

    if (pizzaKeywords.some(keyword => query.includes(keyword))) return 'pizza'
    if (fashionKeywords.some(keyword => query.includes(keyword))) return 'fashion'
    
    return null
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    const industry = detectIndustry(query.toLowerCase())
    setActiveIndustry(industry)
  }

  return (
    <main className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            IndustryConnect AI
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            Demo App - Pizza Ordering & Fashion Shopping
          </p>
          <SearchBar onSearch={handleSearch} />
        </header>

        {!activeIndustry && (
          <div className="grid md:grid-cols-2 gap-6 mt-12 max-w-3xl mx-auto">
            <button
              onClick={() => setActiveIndustry('pizza')}
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
            >
              <div className="flex flex-col items-center text-center">
                <div className="bg-orange-100 p-4 rounded-full mb-4 group-hover:bg-orange-200 transition-colors">
                  <Pizza className="w-12 h-12 text-orange-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Pizza Paradise</h3>
                <p className="text-gray-600">Order delicious pizzas online</p>
              </div>
            </button>

            <button
              onClick={() => setActiveIndustry('fashion')}
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
            >
              <div className="flex flex-col items-center text-center">
                <div className="bg-purple-100 p-4 rounded-full mb-4 group-hover:bg-purple-200 transition-colors">
                  <Shirt className="w-12 h-12 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Fashion Factory</h3>
                <p className="text-gray-600">Premium clothing & apparel</p>
              </div>
            </button>
          </div>
        )}

        {activeIndustry === 'pizza' && <PizzaView onBack={() => setActiveIndustry(null)} toolData={toolData} />}
        {activeIndustry === 'fashion' && <ClothingView onBack={() => setActiveIndustry(null)} toolData={toolData} />}
      </div>
    </main>
  )
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <HomeContent />
    </Suspense>
  )
}
