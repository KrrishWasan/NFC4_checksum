import { useState } from 'react'
import { 
  Shield, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  FileText,
  Globe,
  TrendingUp,
  AlertCircle,
  Download,
  RefreshCw
} from 'lucide-react'

const complianceScore = {
  overall: 98.5,
  categories: [
    { name: 'Trade Regulations', score: 100, status: 'compliant' },
    { name: 'Customs Documentation', score: 98, status: 'compliant' },
    { name: 'Sanctions Screening', score: 100, status: 'compliant' },
    { name: 'AML/KYC', score: 96, status: 'compliant' },
    { name: 'Export Controls', score: 99, status: 'compliant' },
    { name: 'Environmental Standards', score: 95, status: 'warning' }
  ]
}

const regulations = [
  {
    id: 'REG-001',
    title: 'EU General Data Protection Regulation (GDPR)',
    region: 'European Union',
    status: 'compliant',
    lastUpdated: '2025-01-10',
    impact: 'All EU trades',
    description: 'Data protection and privacy compliance for EU trading partners'
  },
  {
    id: 'REG-002',
    title: 'US Export Administration Regulations (EAR)',
    region: 'United States',
    status: 'compliant',
    lastUpdated: '2025-01-08',
    impact: '15 active trades',
    description: 'Export control compliance for dual-use technologies'
  },
  {
    id: 'REG-003',
    title: 'China Cybersecurity Law',
    region: 'China',
    status: 'warning',
    lastUpdated: '2025-01-12',
    impact: '8 active trades',
    description: 'Updated data localization requirements - action required'
  },
  {
    id: 'REG-004',
    title: 'UK Modern Slavery Act',
    region: 'United Kingdom',
    status: 'compliant',
    lastUpdated: '2025-01-05',
    impact: 'Supply chain trades',
    description: 'Supply chain transparency and ethical sourcing compliance'
  }
]

const auditTrail = [
  {
    timestamp: '2025-01-12 14:30',
    action: 'Compliance Check Passed',
    trade: 'TR-001',
    details: 'All regulatory requirements met for Electronics Components trade'
  },
  {
    timestamp: '2025-01-12 10:15',
    action: 'Document Verified',
    trade: 'TR-003',
    details: 'Certificate of Origin validated for Textile Materials'
  },
  {
    timestamp: '2025-01-11 16:45',
    action: 'Sanctions Screening',
    trade: 'TR-002',
    details: 'Counterparty cleared against all watchlists'
  },
  {
    timestamp: '2025-01-11 09:20',
    action: 'Regulation Update',
    trade: 'All',
    details: 'New EU sustainability requirements integrated'
  }
]

export default function Compliance() {
  const [selectedTab, setSelectedTab] = useState('overview')
  const [refreshing, setRefreshing] = useState(false)

  const handleRefresh = async () => {
    setRefreshing(true)
    // Simulate refresh delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    setRefreshing(false)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'compliant':
        return 'text-green-600 bg-green-100'
      case 'warning':
        return 'text-yellow-600 bg-yellow-100'
      case 'non-compliant':
        return 'text-red-600 bg-red-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'compliant':
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />
      case 'non-compliant':
        return <AlertCircle className="w-4 h-4 text-red-600" />
      default:
        return <Clock className="w-4 h-4 text-gray-600" />
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Compliance Dashboard</h1>
          <p className="text-gray-600">Monitor regulatory compliance across all trade operations</p>
        </div>
        <div className="flex items-center space-x-4 mt-4 sm:mt-0">
          <button 
            onClick={handleRefresh}
            disabled={refreshing}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
          <button className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Compliance Score Overview */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="text-center">
            <div className="relative w-32 h-32 mx-auto mb-4">
              <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  className="text-gray-200"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={`${2 * Math.PI * 40}`}
                  strokeDashoffset={`${2 * Math.PI * 40 * (1 - complianceScore.overall / 100)}`}
                  className="text-green-600"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold text-gray-900">{complianceScore.overall}%</span>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Overall Compliance Score</h3>
            <p className="text-gray-600">Excellent compliance across all categories</p>
          </div>
          
          <div className="space-y-4">
            {complianceScore.categories.map((category, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(category.status)}
                  <span className="font-medium text-gray-900">{category.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: `${category.score}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 min-w-12">{category.score}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {[
              { key: 'overview', label: 'Regulations Overview', icon: Globe },
              { key: 'audit', label: 'Audit Trail', icon: FileText },
            ].map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.key}
                  onClick={() => setSelectedTab(tab.key)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    selectedTab === tab.key
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </nav>
        </div>

        <div className="p-6">
          {selectedTab === 'overview' && (
            <div className="space-y-6">
              {regulations.map((reg) => (
                <div key={reg.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-sm transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{reg.title}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(reg.status)}`}>
                          {reg.status.replace('_', ' ').toUpperCase()}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-2">{reg.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Globe className="w-4 h-4" />
                          <span>{reg.region}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <TrendingUp className="w-4 h-4" />
                          <span>Impact: {reg.impact}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>Updated: {reg.lastUpdated}</span>
                        </div>
                      </div>
                    </div>
                    {getStatusIcon(reg.status)}
                  </div>
                  
                  {reg.status === 'warning' && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div className="flex items-center space-x-2">
                        <AlertTriangle className="w-4 h-4 text-yellow-600" />
                        <span className="text-sm font-medium text-yellow-800">Action Required</span>
                      </div>
                      <p className="text-sm text-yellow-700 mt-1">
                        Review and update compliance measures for affected trades
                      </p>
                      <button className="mt-2 text-sm bg-yellow-200 text-yellow-800 px-3 py-1 rounded hover:bg-yellow-300 transition-colors">
                        View Details
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {selectedTab === 'audit' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Recent Compliance Activities</h3>
                <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last 90 days</option>
                </select>
              </div>
              
              {auditTrail.map((entry, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg">
                  <div className="w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-gray-900">{entry.action}</h4>
                      <span className="text-sm text-gray-500">{entry.timestamp}</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-1">{entry.details}</p>
                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                      Trade: {entry.trade}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}