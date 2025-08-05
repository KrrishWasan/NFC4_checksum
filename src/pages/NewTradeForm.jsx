import { useState } from 'react'
import { X } from 'lucide-react'

export default function NewTradeForm({ onClose, onCreate }) {
  const [source, setSource] = useState('')
  const [destination, setDestination] = useState('')

  const handleSubmit = () => {
    if (!source || !destination) {
      alert('Please fill in both fields.')
      return
    }

    // Call parent callback
    onCreate({
      source,
      destination,
      createdAt: new Date().toISOString(),
    })

    // Reset and close
    setSource('')
    setDestination('')
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">Create New Trade</h2>
        <p className="text-gray-600 mb-6">Enter the trade details below</p>

        <div className="space-y-4">
          {/* Source */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Source</label>
            <input
              type="text"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              placeholder="Enter source location"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          {/* Destination */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Enter destination location"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            Create Trade
          </button>
        </div>
      </div>
    </div>
  )
}
