import { useState } from 'react'
import { 
  FileText, 
  Upload, 
  Download, 
  Eye, 
  Shield, 
  CheckCircle,
  Clock,
  AlertTriangle,
  Search,
  Filter,
  Share2,
  Hash
} from 'lucide-react'

const documents = [
  {
    id: 'DOC-001',
    name: 'Commercial Invoice TR-001',
    type: 'invoice',
    trade: 'TR-001',
    status: 'verified',
    blockchainHash: '0xa1b2c3d4e5f6...',
    uploadedBy: 'John Smith',
    uploadDate: '2025-01-12',
    size: '2.4 MB',
    verified: true
  },
  {
    id: 'DOC-002',
    name: 'Certificate of Origin TR-002',
    type: 'certificate',
    trade: 'TR-002',
    status: 'verified',
    blockchainHash: '0xf6e5d4c3b2a1...',
    uploadedBy: 'Sarah Johnson',
    uploadDate: '2025-01-11',
    size: '1.8 MB',
    verified: true
  },
  {
    id: 'DOC-003',
    name: 'Bill of Lading TR-001',
    type: 'shipping',
    trade: 'TR-001',
    status: 'pending',
    blockchainHash: null,
    uploadedBy: 'Mike Chen',
    uploadDate: '2025-01-12',
    size: '3.1 MB',
    verified: false
  },
  {
    id: 'DOC-004',
    name: 'Customs Declaration TR-003',
    type: 'customs',
    trade: 'TR-003',
    status: 'verified',
    blockchainHash: '0x9876543210ab...',
    uploadedBy: 'Emma Wilson',
    uploadDate: '2025-01-10',
    size: '1.2 MB',
    verified: true
  },
  {
    id: 'DOC-005',
    name: 'Insurance Certificate TR-002',
    type: 'insurance',
    trade: 'TR-002',
    status: 'expired',
    blockchainHash: '0xabcdef123456...',
    uploadedBy: 'David Brown',
    uploadDate: '2025-01-08',
    size: '900 KB',
    verified: false
  }
]

const documentTypes = [
  { key: 'all', label: 'All Documents', count: documents.length },
  { key: 'invoice', label: 'Invoices', count: documents.filter(d => d.type === 'invoice').length },
  { key: 'certificate', label: 'Certificates', count: documents.filter(d => d.type === 'certificate').length },
  { key: 'shipping', label: 'Shipping', count: documents.filter(d => d.type === 'shipping').length },
  { key: 'customs', label: 'Customs', count: documents.filter(d => d.type === 'customs').length },
  { key: 'insurance', label: 'Insurance', count: documents.filter(d => d.type === 'insurance').length }
]

export default function Documents() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showUpload, setShowUpload] = useState(false)

  const getStatusIcon = (status) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-600" />
      case 'expired':
        return <AlertTriangle className="w-4 h-4 text-red-600" />
      default:
        return <Clock className="w-4 h-4 text-gray-400" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'verified':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'expired':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeIcon = (type) => {
    return <FileText className="w-5 h-5 text-primary-600" />
  }

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.trade.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === 'all' || doc.type === selectedType
    const matchesStatus = statusFilter === 'all' || doc.status === statusFilter
    return matchesSearch && matchesType && matchesStatus
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Document Management</h1>
          <p className="text-gray-600">Secure blockchain-verified document storage and verification</p>
        </div>
        <button 
          onClick={() => setShowUpload(true)}
          className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2 mt-4 sm:mt-0"
        >
          <Upload className="w-4 h-4" />
          <span>Upload Document</span>
        </button>
      </div>

      {/* Document Type Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6 overflow-x-auto" aria-label="Tabs">
            {documentTypes.map((type) => (
              <button
                key={type.key}
                onClick={() => setSelectedType(type.key)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  selectedType === type.key
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span>{type.label}</span>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  selectedType === type.key ? 'bg-primary-100 text-primary-600' : 'bg-gray-100 text-gray-600'
                }`}>
                  {type.count}
                </span>
              </button>
            ))}
          </nav>
        </div>

        {/* Filters */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search documents or trades..."
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
              <option value="verified">Verified</option>
              <option value="pending">Pending</option>
              <option value="expired">Expired</option>
            </select>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
              <Filter className="w-4 h-4" />
              <span>More Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Documents Grid */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="divide-y divide-gray-200">
          {filteredDocuments.map((doc) => (
            <div key={doc.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 flex-1">
                  <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center">
                    {getTypeIcon(doc.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-medium text-gray-900 truncate">{doc.name}</h3>
                      {getStatusIcon(doc.status)}
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(doc.status)}`}>
                        {doc.status.toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>Trade: {doc.trade}</span>
                      <span>•</span>
                      <span>Size: {doc.size}</span>
                      <span>•</span>
                      <span>Uploaded by {doc.uploadedBy}</span>
                      <span>•</span>
                      <span>{doc.uploadDate}</span>
                    </div>
                    
                    {doc.blockchainHash && (
                      <div className="flex items-center space-x-2 mt-2">
                        <Shield className="w-4 h-4 text-green-600" />
                        <span className="text-xs text-green-600 font-mono">
                          Blockchain Hash: {doc.blockchainHash}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 ml-4">
                  <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                    <Share2 className="w-4 h-4" />
                  </button>
                  {doc.verified && (
                    <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                      <Hash className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {filteredDocuments.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No documents found</h3>
          <p className="text-gray-500 mb-6">Try adjusting your search criteria or upload new documents</p>
          <button 
            onClick={() => setShowUpload(true)}
            className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
          >
            Upload Your First Document
          </button>
        </div>
      )}

      {/* Upload Modal */}
      {showUpload && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Upload Document</h2>
              <button 
                onClick={() => setShowUpload(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-6">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">Drag and drop your file here, or</p>
              <button className="text-primary-600 hover:text-primary-700 font-medium">
                browse files
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Document Type
                </label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                  <option>Commercial Invoice</option>
                  <option>Certificate of Origin</option>
                  <option>Bill of Lading</option>
                  <option>Customs Declaration</option>
                  <option>Insurance Certificate</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Related Trade
                </label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                  <option>TR-001 - Electronics Components</option>
                  <option>TR-002 - Organic Coffee Beans</option>
                  <option>TR-003 - Textile Materials</option>
                </select>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 mt-6">
              <button 
                onClick={() => setShowUpload(false)}
                className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button className="flex-1 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                Upload & Verify
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}