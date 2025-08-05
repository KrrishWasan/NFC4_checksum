import { useState } from 'react'
import { 
  Plus, 
  Search, 
  Filter, 
  Globe, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Eye,
  MoreHorizontal,
  Truck,
  MapPin
} from 'lucide-react'

import NewTradeForm from './NewTradeForm'

export default function TradeManagement() {
  const [trades, setTrades] = useState([
    {
      id: 'TR-001',
      counterparty: 'Global Import Co.',
      product: 'Electronics Components',
      value: '$450,000',
      status: 'in_transit',
      origin: 'Shanghai, China',
      destination: 'Hamburg, Germany',
      progress: 65,
      eta: '2025-01-15',
      compliance: 'verified',
      sustainability: 'high',
      created: '2025-01-08'
    },
    {
      id: 'TR-002',
      counterparty: 'Euro Trade Ltd.',
      product: 'Organic Coffee Beans',
      value: '$125,000',
      status: 'completed',
      origin: 'São Paulo, Brazil',
      destination: 'Amsterdam, Netherlands',
      progress: 100,
      eta: '2025-01-10',
      compliance: 'verified',
      sustainability: 'high',
      created: '2025-01-05'
    },
    {
      id: 'TR-003',
      counterparty: 'Asia Manufacturing',
      product: 'Textile Materials',
      value: '$280,000',
      status: 'pending',
      origin: 'Mumbai, India',
      destination: 'Los Angeles, USA',
      progress: 0,
      eta: '2025-01-20',
      compliance: 'pending',
      sustainability: 'medium',
      created: '2025-01-12'
    },
    {
      id: 'TR-004',
      counterparty: 'Nordic Imports',
      product: 'Sustainable Furniture',
      value: '$180,000',
      status: 'in_transit',
      origin: 'Stockholm, Sweden',
      destination: 'New York, USA',
      progress: 30,
      eta: '2025-01-18',
      compliance: 'verified',
      sustainability: 'high',
      created: '2025-01-10'
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showCreateModal, setShowCreateModal] = useState(false)

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'in_transit':
        return <Truck className="w-4 h-4 text-blue-600" />
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-600" />
      default:
        return <AlertTriangle className="w-4 h-4 text-gray-400" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'in_transit':
        return 'bg-blue-100 text-blue-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getSustainabilityColor = (level) => {
    switch (level) {
      case 'high':
        return 'bg-green-100 text-green-800'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'low':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredTrades = trades.filter(trade => {
    const matchesSearch = trade.counterparty.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         trade.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         trade.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || trade.status === statusFilter
    return matchesSearch && matchesStatus
  })

  // ✅ Now this pushes new trades into the array
  const handleCreateTrade = (newTrade) => {
    setTrades((prevTrades) => [...prevTrades, newTrade])
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Trade Management</h1>
          <p className="text-gray-600">Manage and track your cross-border trade operations</p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2 mt-4 sm:mt-0"
        >
          <Plus className="w-4 h-4" />
          <span>New Trade</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search trades, counterparties, or products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="in_transit">In Transit</option>
            <option value="completed">Completed</option>
          </select>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
            <Filter className="w-4 h-4" />
            <span>More Filters</span>
          </button>
        </div>
      </div>

      {/* Trades Grid */}
      <div className="grid gap-6">
        {filteredTrades.map((trade) => (
          <div key={trade.id} className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Trade Info */}
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="font-mono text-sm font-semibold text-primary-600">{trade.id}</span>
                    {getStatusIcon(trade.status)}
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(trade.status)}`}>
                      {trade.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{trade.counterparty}</h3>
                  <p className="text-gray-600 mb-3">{trade.product}</p>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{trade.origin} → {trade.destination}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>ETA: {trade.eta}</span>
                    </div>
                  </div>
                </div>

                {/* Progress & Value */}
                <div className="lg:w-64">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-2xl font-bold text-gray-900">{trade.value}</span>
                    <span className="text-sm text-gray-500">{trade.progress}%</span>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                    <div 
                      className="bg-primary-600 h-2 rounded-full transition-all"
                      style={{ width: `${trade.progress}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${getSustainabilityColor(trade.sustainability)}`}>
                        {trade.sustainability} impact
                      </span>
                      <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">
                        {trade.compliance}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Tracking Timeline for in-transit trades */}
            {trade.status === 'in_transit' && (
              <div className="border-t border-gray-100 p-6 bg-gray-50">
                <h4 className="text-sm font-medium text-gray-900 mb-4">Shipment Tracking</h4>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Departed {trade.origin}</span>
                  </div>
                  <div className="flex-1 h-px bg-gray-300"></div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-600">In Transit</span>
                  </div>
                  <div className="flex-1 h-px bg-gray-300"></div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                    <span className="text-sm text-gray-400">Arriving {trade.destination}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredTrades.length === 0 && (
        <div className="text-center py-12">
          <Globe className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No trades found</h3>
          <p className="text-gray-500 mb-6">Try adjusting your search criteria or create a new trade</p>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
          >
            Create Your First Trade
          </button>
        </div>
      )}

      {/* New Trade Modal */}
      {showCreateModal && (
        <NewTradeForm 
          onClose={() => setShowCreateModal(false)} 
          onCreate={handleCreateTrade} 
        />
      )}
    </div>
  )
}
