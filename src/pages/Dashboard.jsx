import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  TrendingUp, 
  Globe, 
  Shield, 
  Leaf, 
  DollarSign,
  Users,
  AlertTriangle,
  CheckCircle,
  Clock,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react'

const stats = [
  {
    label: 'Total Trade Volume',
    value: '$2.4M',
    change: '+12.5%',
    trend: 'up',
    icon: DollarSign,
    color: 'primary',
  },
  {
    label: 'Active Trades',
    value: '24',
    change: '+3',
    trend: 'up',
    icon: Globe,
    color: 'green'
  },
  {
    label: 'Compliance Score',
    value: '98.5%',
    change: '+0.8%',
    trend: 'up',
    icon: Shield,
    color: 'blue'
  },
  {
    label: 'Carbon Savings',
    value: '145t CO₂',
    change: '+23t',
    trend: 'up',
    icon: Leaf,
    color: 'green'
  }
]

const recentTrades = [
  {
    id: 'TR-001',
    counterparty: 'Global Import Co.',
    product: 'Electronics Components',
    value: '$450,000',
    status: 'in_transit',
    sustainability: 'high',
    compliance: 'verified'
  },
  {
    id: 'TR-002',
    counterparty: 'Euro Trade Ltd.',
    product: 'Organic Coffee Beans',
    value: '$125,000',
    status: 'completed',
    sustainability: 'high',
    compliance: 'verified'
  },
  {
    id: 'TR-003',
    counterparty: 'Asia Manufacturing',
    product: 'Textile Materials',
    value: '$280,000',
    status: 'pending',
    sustainability: 'medium',
    compliance: 'pending'
  }
]

const alerts = [
  {
    type: 'compliance',
    message: 'New EU regulation update requires action on 3 trades',
    severity: 'warning',
    time: '2 hours ago'
  },
  {
    type: 'sustainability',
    message: 'Carbon offset opportunity available for TR-001',
    severity: 'info',
    time: '4 hours ago'
  }
]

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState('7d')
  const navigate = useNavigate()

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'in_transit':
        return <Clock className="w-4 h-4 text-blue-600" />
      case 'pending':
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />
      default:
        return <Clock className="w-4 h-4 text-gray-400" />
    }
  }

  const getSustainabilityBadge = (level) => {
    const colors = {
      high: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-red-100 text-red-800'
    }
    return colors[level] || colors.medium
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div id='header' className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Trade Dashboard</h1>
        <p className="text-gray-600">Monitor your cross-border trade operations in real-time</p>
      </div>

      <div id='stats' className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="bg-white cursor-default rounded-xl shadow-sm hover:shadow-md border border-gray-100 p-6 transition-all delay-50">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-${stat.color}-100`}>
                  <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
                <div className={`flex items-center space-x-1 font-medium text-sm ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.trend === 'up' ? (
                    <ArrowUpRight className="w-4 h-4" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4" />
                  )}
                  <span>{stat.change}</span>
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          )
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div id='recent_trades' className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Recent Trades</h2>
                <select 
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="text-sm border border-gray-300 rounded-lg px-3 py-1"
                >
                  <option value="7d">Last 7 days</option>
                  <option value="30d">Last 30 days</option>
                  <option value="90d">Last 90 days</option>
                </select>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentTrades.map((trade) => (
                  <div key={trade.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="font-mono text-sm text-gray-500">{trade.id}</span>
                        {getStatusIcon(trade.status)}
                        <span className="text-sm text-gray-600 capitalize">{trade.status.replace('_', ' ')}</span>
                      </div>
                      <div className="font-medium text-gray-900 mb-1">{trade.counterparty}</div>
                      <div className="text-sm text-gray-600">{trade.product}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900 mb-2">{trade.value}</div>
                      <div className="flex items-center space-x-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${getSustainabilityBadge(trade.sustainability)}`}>
                          {trade.sustainability} impact
                        </span>
                        <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">
                          {trade.compliance}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Alerts & Quick Actions */}
        <div className="space-y-6">
          {/* Alerts */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900">Alerts</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {alerts.map((alert, index) => (
                  <div key={index} className={`p-4 rounded-lg border-l-4 ${
                    alert.severity === 'warning' ? 'bg-yellow-50 border-yellow-400' : 'bg-blue-50 border-blue-400'
                  }`}>
                    <div className="flex items-start space-x-3">
                      <AlertTriangle className={`w-5 h-5 mt-0.5 ${
                        alert.severity === 'warning' ? 'text-yellow-600' : 'text-blue-600'
                      }`} />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 mb-1">
                          {alert.message}
                        </p>
                        <p className="text-xs text-gray-500">{alert.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                <button className="w-full bg-primary-600 text-white px-4 py-3 rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2">
                  <TrendingUp className="w-4 h-4" />
                  <span>Create New Trade</span>
                </button>
                <button className="w-full border border-gray-300 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
                  <Shield className="w-4 h-4" />
                  <span>Compliance Check</span>
                </button>
                <button className="w-full border border-gray-300 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
                  <Leaf className="w-4 h-4" />
                  <span>Carbon Report</span>
                </button>
              </div>
            </div>
          </div>

          {/* Network Status */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900">Network Status</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Blockchain Network</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-green-600">Operational</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Consensus Nodes</span>
                  <span className="text-sm font-medium text-gray-900">247/250</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Last Block</span>
                  <span className="text-sm font-medium text-gray-900">2 sec ago</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Gas Price</span>
                  <span className="text-sm font-medium text-gray-900">0.003 ETH</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}