'use client'

import { useState } from 'react'
import { ArrowLeft, Code2, CheckCircle2, Blocks, Cpu, Globe } from 'lucide-react'

interface ITCompanyViewProps {
  onBack: () => void
  toolData?: any
}

export default function ITCompanyView({ onBack, toolData }: ITCompanyViewProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', email: '', message: '' })
    }, 4000)
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
          <Code2 className="w-10 h-10 text-blue-600" />
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Troon Technologies</h2>
            <p className="text-gray-600">Leading blockchain & software development company</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="text-center p-6 bg-blue-50 rounded-xl">
            <Blocks className="w-12 h-12 text-blue-600 mx-auto mb-3" />
            <h3 className="font-bold text-gray-800 mb-2">Blockchain Solutions</h3>
            <p className="text-sm text-gray-600">Smart contracts, DeFi, NFT platforms</p>
          </div>
          <div className="text-center p-6 bg-indigo-50 rounded-xl">
            <Cpu className="w-12 h-12 text-indigo-600 mx-auto mb-3" />
            <h3 className="font-bold text-gray-800 mb-2">AI & ML Development</h3>
            <p className="text-sm text-gray-600">Custom AI models and integrations</p>
          </div>
          <div className="text-center p-6 bg-purple-50 rounded-xl">
            <Globe className="w-12 h-12 text-purple-600 mx-auto mb-3" />
            <h3 className="font-bold text-gray-800 mb-2">Web & Mobile Apps</h3>
            <p className="text-sm text-gray-600">Full-stack development services</p>
          </div>
        </div>

        {submitted && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
            <CheckCircle2 className="w-6 h-6 text-green-600" />
            <div>
              <p className="font-semibold text-green-800">Message Sent Successfully!</p>
              <p className="text-green-700">Our team will contact you within 24 hours.</p>
            </div>
          </div>
        )}

        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Get in Touch</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Project Details
              </label>
              <textarea
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none resize-none"
                placeholder="Tell us about your project requirements..."
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
