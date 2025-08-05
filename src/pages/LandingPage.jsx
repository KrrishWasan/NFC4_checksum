import { Link } from 'react-router-dom'
import { 
  Shield, 
  Globe, 
  Leaf, 
  TrendingUp, 
  Users, 
  Lock,
  ArrowRight,
  CheckCircle,
  Star
} from 'lucide-react'

const features = [
  {
    icon: Shield,
    title: 'Regulatory Compliance',
    description: 'Automated compliance with global trade laws and regulations'
  },
  {
    icon: Globe,
    title: 'Cross-Border Trade',
    description: 'Seamless international trade operations with real-time tracking'
  },
  {
    icon: Leaf,
    title: 'Sustainability Tracking',
    description: 'Monitor and reduce carbon footprint across supply chains'
  },
  {
    icon: Lock,
    title: 'Blockchain Security',
    description: 'Immutable transaction records with consortium blockchain'
  },
  {
    icon: Users,
    title: 'Multi-Party Collaboration',
    description: 'Connect traders, regulators, and sustainability auditors'
  },
  {
    icon: TrendingUp,
    title: 'Smart Analytics',
    description: 'AI-powered insights for optimized trade operations'
  }
]

const stats = [
  { value: '250+', label: 'Global Partners' },
  { value: '$2.5B+', label: 'Trade Volume' },
  { value: '99.9%', label: 'Uptime' },
  { value: '45%', label: 'Carbon Reduction' }
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">

      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-[#2563eb] to-green-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold cursor-default text-gray-900">TradeChain</span>
            </div>
            <Link
              to="/login"
              className="bg-[#2563eb] text-[#f5f5f5] px-6 py-2 rounded-lg hover:bg-[#1d4ed8] transition-colors flex items-center space-x-2"
            >
              <span>Connect Wallet</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </header>


      <section className="bg-gradient-to-br from-[#eff6ff] via-white to-green-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 animate-fade-in">
              The Future of
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563eb] to-green-600"> Cross-Border Trade</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto animate-slide-up">
              Secure, transparent, and sustainable global trade operations powered by consortium blockchain technology. 
              Ensure compliance while reducing environmental impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
              <Link
                to="/login"
                className="bg-[#2563eb] text-white px-8 py-4 rounded-lg hover:bg-[#1d4ed8] transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <span>Start Trading</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <button className="border-2 border-[#2563eb] text-[#2563eb] px-8 py-4 rounded-lg hover:bg-[#1d4ed8] hover:text-white transition-all transform hover:scale-105">
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#2563eb] mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Revolutionizing Global Trade
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our blockchain platform provides comprehensive solutions for modern cross-border trade challenges
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div 
                  key={index} 
                  className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-[#dbeafe] to-green-100 rounded-lg flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 text-[#2563eb]" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How TradeChain Works
            </h2>
            <p className="text-xl text-gray-600">
              Simple, secure, and sustainable trade operations in three steps
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#2563eb] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Connect Wallet</h3>
              <p className="text-gray-600">
                Securely connect your blockchain wallet to access the platform and verify your identity
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Create Trade</h3>
              <p className="text-gray-600">
                Set up your trade parameters with automated compliance and sustainability checks
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Track & Execute</h3>
              <p className="text-gray-600">
                Monitor real-time progress with blockchain transparency and automated settlements
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-[#2563eb] to-green-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Trade Operations?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join the future of sustainable, compliant, and transparent cross-border trade
          </p>
          <Link
            to="/login"
            className="bg-white text-[#2563eb] px-8 py-4 rounded-lg hover:bg-gray-50 transition-colors inline-flex items-center space-x-2 font-semibold"
          >
            <span>Get Started Now</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-[#2563eb] to-green-600 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <span className="text-2xl font-bold">TradeChain</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                The world's leading blockchain platform for secure, transparent, and sustainable cross-border trade operations.
              </p>
              <div className="flex space-x-4">
                {[1, 2, 3, 4].map((i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
                <Star className="w-5 h-5 text-gray-400" />
                <span className="text-gray-400 ml-2">4.8/5 rating</span>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Trade Management</li>
                <li>Compliance</li>
                <li>Sustainability</li>
                <li>Analytics</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>About Us</li>
                <li>Contact</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 TradeChain. All rights reserved. Built for the future of global trade.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}