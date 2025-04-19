import React, { useState } from 'react';
import { Client } from '../../types';
import { ChevronDown, ChevronUp, MoreVertical, Phone, Mail, MapPin } from 'lucide-react';

interface ClientsTableProps {
  clients: Client[];
}

const ClientsTable: React.FC<ClientsTableProps> = ({ clients }) => {
  const [sortField, setSortField] = useState<keyof Client>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [expandedClient, setExpandedClient] = useState<string | null>(null);
  
  const handleSort = (field: keyof Client) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  const sortedClients = [...clients].sort((a, b) => {
    if (sortField === 'totalOrders') {
      return sortDirection === 'asc' 
        ? a.totalOrders - b.totalOrders
        : b.totalOrders - a.totalOrders;
    }
    
    if (sortField === 'lastOrder') {
      if (!a.lastOrder) return sortDirection === 'asc' ? -1 : 1;
      if (!b.lastOrder) return sortDirection === 'asc' ? 1 : -1;
      
      return sortDirection === 'asc'
        ? new Date(a.lastOrder).getTime() - new Date(b.lastOrder).getTime()
        : new Date(b.lastOrder).getTime() - new Date(a.lastOrder).getTime();
    }
    
    // Default string comparison for other fields
    const aValue = a[sortField]?.toString() || '';
    const bValue = b[sortField]?.toString() || '';
    
    return sortDirection === 'asc'
      ? aValue.localeCompare(bValue)
      : bValue.localeCompare(aValue);
  });

  const SortIndicator = ({ field }: { field: keyof Client }) => {
    if (sortField !== field) return null;
    
    return sortDirection === 'asc' 
      ? <ChevronUp size={16} className="ml-1" />
      : <ChevronDown size={16} className="ml-1" />;
  };

  const toggleExpand = (clientId: string) => {
    setExpandedClient(expandedClient === clientId ? null : clientId);
  };

  return (
    <div className="overflow-x-auto rounded-lg shadow">
      <table className="w-full text-sm text-left text-gray-700">
        <thead className="text-xs uppercase bg-gray-50 text-gray-500">
          <tr>
            <th className="px-6 py-3 w-10"></th>
            <th className="px-6 py-3">
              <button 
                className="flex items-center focus:outline-none"
                onClick={() => handleSort('name')}
              >
                Client
                <SortIndicator field="name" />
              </button>
            </th>
            <th className="px-6 py-3">
              <button 
                className="flex items-center focus:outline-none"
                onClick={() => handleSort('email')}
              >
                Contact
                <SortIndicator field="email" />
              </button>
            </th>
            <th className="px-6 py-3">
              <button 
                className="flex items-center focus:outline-none"
                onClick={() => handleSort('totalOrders')}
              >
                Total Orders
                <SortIndicator field="totalOrders" />
              </button>
            </th>
            <th className="px-6 py-3">
              <button 
                className="flex items-center focus:outline-none"
                onClick={() => handleSort('lastOrder')}
              >
                Last Order
                <SortIndicator field="lastOrder" />
              </button>
            </th>
            <th className="px-6 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedClients.map((client) => (
            <React.Fragment key={client.id}>
              <tr className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4">
                  <button 
                    className="text-gray-500 hover:text-gray-700 focus:outline-none"
                    onClick={() => toggleExpand(client.id)}
                  >
                    {expandedClient === client.id ? 
                      <ChevronDown size={16} /> : 
                      <ChevronUp size={16} className="rotate-180" />
                    }
                  </button>
                </td>
                <td className="px-6 py-4 font-medium">{client.name}</td>
                <td className="px-6 py-4">{client.email}</td>
                <td className="px-6 py-4">{client.totalOrders}</td>
                <td className="px-6 py-4">
                  {client.lastOrder ? new Date(client.lastOrder).toLocaleDateString() : 'N/A'}
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-gray-500 hover:text-gray-700">
                    <MoreVertical size={16} />
                  </button>
                </td>
              </tr>
              {expandedClient === client.id && (
                <tr className="bg-gray-50">
                  <td colSpan={6} className="px-6 py-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">Contact Information</h4>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <Mail size={16} className="text-gray-500 mr-2" />
                            <span>{client.email}</span>
                          </div>
                          <div className="flex items-center">
                            <Phone size={16} className="text-gray-500 mr-2" />
                            <span>{client.phone}</span>
                          </div>
                          <div className="flex items-start">
                            <MapPin size={16} className="text-gray-500 mr-2 mt-0.5" />
                            <span>{client.address}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Order Statistics</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Total Orders:</span>
                            <span className="font-medium">{client.totalOrders}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Last Order:</span>
                            <span className="font-medium">
                              {client.lastOrder ? new Date(client.lastOrder).toLocaleDateString() : 'N/A'}
                            </span>
                          </div>
                        </div>
                        <div className="mt-3 flex gap-2">
                          <button className="px-3 py-1 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded text-sm">
                            View Orders
                          </button>
                          <button className="px-3 py-1 bg-gray-50 text-gray-600 hover:bg-gray-100 rounded text-sm">
                            Edit Client
                          </button>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientsTable;