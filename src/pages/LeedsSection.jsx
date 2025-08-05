import { Eye, MoreHorizontal, MapPin, Clock } from 'lucide-react'
import { Search } from 'lucide-react'
import { useState } from 'react'
import { VscWorkspaceTrusted } from "react-icons/vsc";
import FloatingChatbot from '../components/FloatingChatbot';

export default function SimpleScrollableTradeList() {
  const trades = [
    {
      id: 'TR-001',
      counterparty: 'Global Import Co.',
      product: 'Electronics Components',
      status: 'Verified',
      value: '$450,000',
      quantity: '25,000 PS4 components',
      from: "Mumbai, India",
      depature: '2024-11-06',
      eta: '2025-01-15'
    },
    {
      id: 'TR-002',
      counterparty: 'Euro Trade Ltd.',
      product: 'Organic Coffee Beans',
      value: '$125,000',
      quantity: '25,000 PS4 components',
      from: "Mumbai, India",
      depature: '2024-11-06',
      eta: '2025-01-10'
    },
    {
      id: 'TR-003',
      counterparty: 'Asia Manufacturing',
      product: 'Textile Materials',
      value: '$280,000',
      quantity: '25,000 PS4 components',
      from: "Rio De Janerio, Brazil",
      depature: '2024-11-06',
      eta: '2025-01-20'
    },
    {
      id: 'TR-004',
      counterparty: 'Nordic Imports',
      product: 'Sustainable Furniture',
      value: '$180,000',
      quantity: '25,000 PS4 components',
      from: "Mumbai, India",
      depature: '2024-11-06',
      eta: '2025-01-18'
    }
  ]

   const [searchTerm, setSearchTerm] = useState('')
  return (
    
    <div className="max-h-[500px] my-4 overflow-y-auto space-y-6 pr-2 scrollbar-thin scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400">
        <div id="search" className='flex justify-between mx-16 items-center'>
            <div className="relative w-full max-w-lg">
      <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
      <input
        type="text"
        placeholder="Search trades, counterparties, or products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg 
                   focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
      />
    </div>
    <FloatingChatbot/>
        </div>
    <div id="cont" className='grid grid-cols-2'>
        {trades.map((trade) => (
        <div 
          key={trade.id} 
          className="bg-white w-[95%] m-2 mx-auto rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
        >
          <div className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              
              <div className="flex-1">
                <span className="font-mono text-sm font-semibold text-green-500 block mb-2">
                  {trade.status === 'Verified' && (<span className='flex items-center'><VscWorkspaceTrusted className='mr-1.5' /> Verified</span>)}
                </span>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{trade.counterparty}</h3>
                <p className="text-gray-600 mb-3">{trade.product}</p>
                
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{trade.from}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>Depature: {trade.depature}</span>
                  </div>
                </div>
              </div>

              <div className="lg:w-64">
                <div className=" flex flex-col justify-between space-y-0.5 items-center">
                  <span className="text-2xl font-bold text-gray-900">{trade.value}</span>
                  <span className="text-sm text-gray-900">{trade.quantity}</span>
                </div>
                
                
                <div className="text-lg mt-4 text-blue-500 w-fit mx-auto p-1.5 rounded-xl border-1 hover:bg-blue-500 hover:text-white transition-all delay-50 cursor-default border-blue-500">
                  View More
                </div>
              </div>
            </div>
          </div>

        </div>
      ))}
    </div>
    </div>
  )
}
