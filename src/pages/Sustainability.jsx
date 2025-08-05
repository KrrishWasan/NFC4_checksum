import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts'
import { 
  Leaf, 
  TrendingDown, 
  Award, 
  Target,
  Truck,
  Factory,
  Recycle,
  Zap,
  Globe,
  Download
} from 'lucide-react'

const carbonData = [
  { month: 'Jan', emissions: 245, offset: 280, net: -35 },
  { month: 'Feb', emissions: 220, offset: 290, net: -70 },
  { month: 'Mar', emissions: 235, offset: 310, net: -75 },
  { month: 'Apr', emissions: 205, offset: 285, net: -80 },
  { month: 'May', emissions: 190, offset: 300, net: -110 },
  { month: 'Jun', emissions: 180, offset: 320, net: -140 },
]

const impactByCategory = [
  { name: 'Transportation', value: 45, color: '#3B82F6' },
  { name: 'Manufacturing', value: 30, color: '#10B981' },
  { name: 'Packaging', value: 15, color: '#F59E0B' },
  { name: 'Storage', value: 10, color: '#EF4444' },
]

const sustainabilityMetrics = [
  {
    label: 'Carbon Footprint Reduction',
    value: '23%',
    trend: 'down',
    icon: TrendingDown,
    color: 'green',
    description: 'vs. last quarter'
  },
  {
    label: 'Renewable Energy Usage',
    value: '67%',
    trend: 'up',
    icon: Zap,
    color: 'blue',
    description: 'of total energy consumption'
  },
  {
    label: 'Sustainable Partners',
    value: '89%',
    trend: 'up',
    icon: Award,
    color: 'green',
    description: 'ESG certified partners'
  },
  {
    label: 'Waste Reduction',
    value: '34%',
    trend: 'down',
    icon: Recycle,
    color: 'purple',
    description: 'packaging waste eliminated'
  }
]

const sustainableRoutes = [
  {
    route: 'Shanghai → Hamburg',
    emissions: '2.4t CO₂',
    savings: '15%',
    method: 'Sea Freight + Rail',
    trades: 5
  },
  {
    route: 'São Paulo → Amsterdam',
    emissions: '1.8t CO₂',
    savings: '22%',
    method: 'Carbon Offset + Sea',
    trades: 3
  },
  {
    route: 'Mumbai → Los Angeles',
    emissions: '3.1t CO₂',
    savings: '18%',
    method: 'Optimized Route',
    trades: 4
  }
]

const certifications = [
  {
    name: 'ISO 14001',
    description: 'Environmental Management System',
    status: 'active',
    expires: '2025-12-15'
  },
  {
    name: 'Carbon Trust Standard',
    description: 'Carbon footprint verification',
    status: 'active',
    expires: '2025-08-20'
  },
  {
    name: 'B Corp Certification',
    description: 'Social and environmental performance',
    status: 'pending',
    expires: '2025-06-30'
  }
]

export default function Sustainability() {
  const [selectedTab, setSelectedTab] = useState('overview')
  const [timeRange, setTimeRange] = useState('6m')

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Sustainability Dashboard</h1>
          <p className="text-gray-600">Track environmental impact and sustainable practices</p>
        </div>
        <div className="flex items-center space-x-4 mt-4 sm:mt-0">
          <select 
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2"
          >
            <option value="1m">Last Month</option>
            <option value="3m">Last 3 Months</option>
            <option value="6m">Last 6 Months</option>
            <option value="1y">Last Year</option>
          </select>
          <button className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>ESG Report</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {sustainabilityMetrics.map((metric, index) => {
          const Icon = metric.icon
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-${metric.color}-100`}>
                  <Icon className={`w-6 h-6 text-${metric.color}-600`} />
                </div>
                <span className={`text-sm text-center pl-1 ${
                  metric.trend === 'down' ? 'text-green-600' : 'text-blue-600'
                }`}>
                  {metric.trend === 'down' ? '↓' : '↑'} {metric.label}
                </span>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</div>
              <div className="text-sm text-gray-600">{metric.description}</div>
            </div>
          )
        })}
      </div>

      {/* Carbon Footprint Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Carbon Footprint Tracking</h2>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span>Emissions</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Offset</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>Net Impact</span>
            </div>
          </div>
        </div>
        
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={carbonData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="emissions" stroke="#EF4444" strokeWidth={2} />
              <Line type="monotone" dataKey="offset" stroke="#10B981" strokeWidth={2} />
              <Line type="monotone" dataKey="net" stroke="#3B82F6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Impact by Category */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Impact by Category</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={impactByCategory}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {impactByCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {impactByCategory.map((category, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: category.color }}
                ></div>
                <span className="text-sm text-gray-600">{category.name}</span>
                <span className="text-sm font-medium text-gray-900">{category.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sustainable Routes */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Sustainable Trade Routes</h2>
          <div className="space-y-4">
            {sustainableRoutes.map((route, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{route.route}</h3>
                  <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                    {route.savings} saved
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Truck className="w-4 h-4" />
                      <span>{route.method}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Globe className="w-4 h-4" />
                      <span>{route.trades} trades</span>
                    </div>
                  </div>
                  <span className="font-medium text-gray-900">{route.emissions}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Certifications & Goals */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Certifications */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Environmental Certifications</h2>
          <div className="space-y-4">
            {certifications.map((cert, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">{cert.name}</h3>
                  <p className="text-sm text-gray-600">{cert.description}</p>
                  <p className="text-xs text-gray-500 mt-1">Expires: {cert.expires}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  cert.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {cert.status.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Sustainability Goals */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">2025 Sustainability Goals</h2>
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-900">Carbon Neutral Operations</span>
                <span className="text-sm text-gray-600">78%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '78%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-900">100% Renewable Energy</span>
                <span className="text-sm text-gray-600">67%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '67%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-900">Zero Waste to Landfill</span>
                <span className="text-sm text-gray-600">45%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-900">Sustainable Supply Chain</span>
                <span className="text-sm text-gray-600">89%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '89%' }}></div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-green-50 rounded-lg">
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-green-600" />
              <span className="font-medium text-green-900">On track to meet 2025 targets</span>
            </div>
            <p className="text-sm text-green-700 mt-1">
              Excellent progress across all sustainability initiatives
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}