import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area } from 'recharts'
import { 
  TrendingUp, 
  DollarSign, 
  Globe, 
  Users,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Download,
  Filter
} from 'lucide-react'

const tradeVolumeData = [
  { month: 'Jul', volume: 1800000, trades: 18 },
  { month: 'Aug', volume: 2100000, trades: 22 },
  { month: 'Sep', volume: 1950000, trades: 19 },
  { month: 'Oct', volume: 2300000, trades: 25 },
  { month: 'Nov', volume: 2150000, trades: 24 },
  { month: 'Dec', volume: 2400000, trades: 26 },
  { month: 'Jan', volume: 2600000, trades: 28 },
]

const regionData = [
  { name: 'Europe', value: 35, amount: 910000, color: '#3B82F6' },
  { name: 'Asia Pacific', value: 30, amount: 780000, color: '#10B981' },
  { name: 'North America', value: 20, amount: 520000, color: '#F59E0B' },
  { name: 'Latin America', value: 10, amount: 260000, color: '#EF4444' },
  { name: 'Africa/Middle East', value: 5, amount: 130000, color: '#8B5CF6' },
]

const productData = [
  { category: 'Electronics', Q4: 850000, Q1: 920000 },
  { category: 'Textiles', Q4: 420000, Q1: 480000 },
  { category: 'Food & Beverages', Q4: 380000, Q1: 410000 },
  { category: 'Machinery', Q4: 650000, Q1: 720000 },
  { category: 'Chemicals', Q4: 290000, Q1: 310000 },
  { category: 'Raw Materials', Q4: 320000, Q1: 360000 },
]

const performanceMetrics = [
  {
    label: 'Total Trade Volume',
    value: '$2.6M',
    change: '+18.5%',
    trend: 'up',
    icon: DollarSign,
    period: 'vs last month'
  },
  {
    label: 'Active Trade Partners',
    value: '147',
    change: '+12',
    trend: 'up',
    icon: Users,
    period: 'new this quarter'
  },
  {
    label: 'Countries Reached',
    value: '34',
    change: '+2',
    trend: 'up',
    icon: Globe,
    period: 'expansion markets'
  },
  {
    label: 'Avg Settlement Time',
    value: '3.2 days',
    change: '-0.8 days',
    trend: 'down',
    icon: TrendingUp,
    period: 'faster processing'
  }
]

const topPartners = [
  { name: 'Global Import Co.', trades: 12, volume: '$1.2M', growth: '+15%' },
  { name: 'Euro Trade Ltd.', trades: 8, volume: '$850K', growth: '+22%' },
  { name: 'Asia Manufacturing', trades: 6, volume: '$640K', growth: '+8%' },
  { name: 'Nordic Imports', trades: 5, volume: '$420K', growth: '+31%' },
  { name: 'Pacific Traders', trades: 4, volume: '$380K', growth: '+12%' },
]

export default function Analytics() {
  const [timeRange, setTimeRange] = useState('6m')
  const [selectedMetric, setSelectedMetric] = useState('volume')

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Trade Analytics</h1>
          <p className="text-gray-600">Comprehensive insights into your cross-border trade operations</p>
        </div>
        <div className="flex items-center space-x-4 mt-4 sm:mt-0">
          <select 
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
          >
            <option value="1m">Last Month</option>
            <option value="3m">Last 3 Months</option>
            <option value="6m">Last 6 Months</option>
            <option value="1y">Last Year</option>
          </select>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2 text-sm">
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </button>
          <button className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2 text-sm">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {performanceMetrics.map((metric, index) => {
          const Icon = metric.icon
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Icon className="w-6 h-6 text-primary-600" />
                </div>
                <div className={`flex items-center space-x-1 text-sm ${
                  metric.trend === 'up' ? 'text-green-600' : 'text-green-600'
                }`}>
                  {metric.trend === 'up' ? (
                    <ArrowUpRight className="w-4 h-4" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4" />
                  )}
                  <span>{metric.change}</span>
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</div>
              <div className="text-sm text-gray-600">{metric.label}</div>
              <div className="text-xs text-gray-500 mt-1">{metric.period}</div>
            </div>
          )
        })}
      </div>

      {/* Trade Volume Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Trade Volume Trends</h2>
          <div className="flex items-center space-x-4 text-sm">
            <button 
              onClick={() => setSelectedMetric('volume')}
              className={`px-3 py-1 rounded ${selectedMetric === 'volume' ? 'bg-primary-100 text-primary-600' : 'text-gray-600'}`}
            >
              Volume ($)
            </button>
            <button 
              onClick={() => setSelectedMetric('trades')}
              className={`px-3 py-1 rounded ${selectedMetric === 'trades' ? 'bg-primary-100 text-primary-600' : 'text-gray-600'}`}
            >
              Trade Count
            </button>
          </div>
        </div>
        
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={tradeVolumeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => [
                  selectedMetric === 'volume' ? `$${(value / 1000000).toFixed(1)}M` : value,
                  selectedMetric === 'volume' ? 'Trade Volume' : 'Number of Trades'
                ]}
              />
              <Area 
                type="monotone" 
                dataKey={selectedMetric}
                stroke="#3B82F6" 
                fill="#3B82F6" 
                fillOpacity={0.1}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Regional Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Trade Distribution by Region</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={regionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {regionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Share']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-1 gap-3 mt-4">
            {regionData.map((region, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: region.color }}
                  ></div>
                  <span className="text-sm text-gray-600">{region.name}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">
                    ${(region.amount / 1000).toFixed(0)}K
                  </div>
                  <div className="text-xs text-gray-500">{region.value}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Trading Partners */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Top Trading Partners</h2>
          <div className="space-y-4">
            {topPartners.map((partner, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">{partner.name}</h3>
                  <p className="text-sm text-gray-600">{partner.trades} trades completed</p>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900">{partner.volume}</div>
                  <div className="text-sm text-green-600">{partner.growth}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Product Categories Performance */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Product Categories Performance</h2>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>Q4 2024</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Q1 2025</span>
            </div>
          </div>
        </div>
        
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={productData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${(value / 1000).toFixed(0)}K`, 'Volume']} />
              <Bar dataKey="Q4" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Q1" fill="#10B981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}