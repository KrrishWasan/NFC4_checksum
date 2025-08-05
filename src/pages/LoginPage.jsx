import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { 
  Wallet, 
  Shield, 
  TrendingUp, 
  AlertCircle,
  CheckCircle,
  Loader
} from 'lucide-react'

const walletProviders = [
  {
    name: 'MetaMask',
    icon: '🦊',
    description: 'Connect using MetaMask wallet'
  },
  {
    name: 'WalletConnect',
    icon: '🔗',
    description: 'Scan with mobile wallet'
  },
  {
    name: 'Coinbase Wallet',
    icon: '🔵',
    description: 'Connect using Coinbase Wallet'
  }
]

export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const [selectedWallet, setSelectedWallet] = useState(null)
  const [error, setError] = useState('')
  const [step, setStep] = useState('select') // select, connecting, signature
  
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleWalletConnect = async (walletName) => {
    setLoading(true)
    setSelectedWallet(walletName)
    setError('')
    setStep('connecting')

    try {
      // Simulate wallet connection delay
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Simulate wallet address generation
      const mockWalletAddress = '0x' + Math.random().toString(16).substr(2, 40)
      
      setStep('signature')
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Simulate successful login
      await login(mockWalletAddress, 'mock_signature')
      navigate('/dashboard')
      
    } catch (err) {
      setError('Failed to connect wallet. Please try again.')
      setStep('select')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-primary-600 to-green-600 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <span className="text-3xl font-bold text-gray-900">TradeChain</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Connect Your Wallet
          </h1>
          <p className="text-gray-600">
            Access the future of cross-border trade with blockchain security
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          {step === 'select' && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
                <Shield className="w-4 h-4 text-green-600" />
                <span>Secure blockchain authentication</span>
              </div>

              {walletProviders.map((wallet, index) => (
                <button
                  key={index}
                  onClick={() => handleWalletConnect(wallet.name)}
                  disabled={loading}
                  className="w-full flex items-center space-x-4 p-4 border-2 border-gray-200 rounded-xl hover:border-primary-300 hover:bg-primary-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  <div className="text-2xl">{wallet.icon}</div>
                  <div className="flex-1 text-left">
                    <div className="font-semibold text-gray-900 group-hover:text-primary-700">
                      {wallet.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {wallet.description}
                    </div>
                  </div>
                  <Wallet className="w-5 h-5 text-gray-400 group-hover:text-primary-600" />
                </button>
              ))}

              {error && (
                <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm">{error}</span>
                </div>
              )}
            </div>
          )}

          {step === 'connecting' && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Loader className="w-8 h-8 text-primary-600 animate-spin" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Connecting to {selectedWallet}
              </h3>
              <p className="text-gray-600 mb-6">
                Please confirm the connection in your wallet
              </p>
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          )}

          {step === 'signature' && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Sign Message
              </h3>
              <p className="text-gray-600 mb-6">
                Please sign the message to verify ownership of your wallet
              </p>
              <div className="bg-gray-50 rounded-lg p-4 text-left">
                <code className="text-sm text-gray-700">
                  Sign in to TradeChain Platform
                  <br />
                  Timestamp: {new Date().toISOString()}
                  <br />
                  Nonce: {Math.random().toString(36).substr(2, 9)}
                </code>
              </div>
            </div>
          )}
        </div>

        {/* Security Notice */}
        <div className="mt-6 text-center">
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
            <Shield className="w-4 h-4" />
            <span>Your wallet information is encrypted and secure</span>
          </div>
        </div>

        {/* Features */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          <div className="p-3">
            <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Shield className="w-4 h-4 text-primary-600" />
            </div>
            <div className="text-xs text-gray-600">Secure</div>
          </div>
          <div className="p-3">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
            </div>
            <div className="text-xs text-gray-600">Verified</div>
          </div>
          <div className="p-3">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <TrendingUp className="w-4 h-4 text-purple-600" />
            </div>
            <div className="text-xs text-gray-600">Efficient</div>
          </div>
        </div>
      </div>
    </div>
  )
}