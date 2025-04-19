import React, { useState } from 'react';
import { mockOrders } from '../data/mockData';
import { ClipboardList, Filter, Search, Download, Calendar } from 'lucide-react';

const OrdersPage: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  const filteredOrders = statusFilter === 'all' 
    ? mockOrders 
    : mockOrders.filter(order => order.status === statusFilter);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <span className="bg-amber-100 text-amber-800 text-xs font-medium px-2.5 py-0.5 rounded">Pending</span>;
      case 'printing':
        return <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Printing</span>;
      case 'completed':
        return <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">Completed</span>;
      case 'delivered':
        return <span className="bg-teal-100 text-teal-800 text-xs font-medium px-2.5 py-0.5 rounded">Delivered</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Order History</h1>
        <p className="text-gray-500">View and manage all past and current orders</p>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search orders..."
              className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
          </div>
          
          <div className="flex space-x-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="printing">Printing</option>
              <option value="completed">Completed</option>
              <option value="delivered">Delivered</option>
            </select>
            
            <button className="px-3 py-2 rounded-md border border-gray-300 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center">
              <Calendar size={18} />
            </button>
            
            <button className="px-3 py-2 rounded-md border border-gray-300 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <Filter size={18} />
            </button>
          </div>
        </div>
        
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <ClipboardList size={18} className="text-blue-500" />
            <span>Showing {filteredOrders.length} orders</span>
          </div>
          
          <div className="text-sm text-gray-600">
            <button className="text-blue-600 hover:text-blue-800 flex items-center">
              <Download size={16} className="mr-1" />
              Export
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="text-xs uppercase bg-gray-50 text-gray-500">
              <tr>
                <th className="px-6 py-3">Order ID</th>
                <th className="px-6 py-3">Client</th>
                <th className="px-6 py-3">Document</th>
                <th className="px-6 py-3">Format</th>
                <th className="px-6 py-3">Pages</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Received Date</th>
                <th className="px-6 py-3">Completed Date</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{order.id}</td>
                  <td className="px-6 py-4">{order.clientName}</td>
                  <td className="px-6 py-4">{order.documentType}</td>
                  <td className="px-6 py-4">{order.format}</td>
                  <td className="px-6 py-4">{order.pages}</td>
                  <td className="px-6 py-4">
                    {getStatusBadge(order.status)}
                  </td>
                  <td className="px-6 py-4">
                    {new Date(order.receivedAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    {order.completedAt ? new Date(order.completedAt).toLocaleDateString() : '-'}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="font-medium text-blue-600 hover:underline">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredOrders.length}</span> of <span className="font-medium">{filteredOrders.length}</span> results
          </div>
          <div className="flex space-x-1">
            <button className="px-3 py-1 border rounded text-gray-600 hover:bg-gray-50">Previous</button>
            <button className="px-3 py-1 border rounded bg-blue-600 text-white">1</button>
            <button className="px-3 py-1 border rounded text-gray-600 hover:bg-gray-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;