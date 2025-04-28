import React, { useState } from 'react';
import { Client } from '../../types';
import { ChevronDown, ChevronUp, Phone, Mail, MapPin } from 'lucide-react';

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
      ? <ChevronUp size={16} className="ml-1 text-green-600" />
      : <ChevronDown size={16} className="ml-1 text-green-600" />;
  };

  const toggleExpand = (clientId: string) => {
    setExpandedClient(expandedClient === clientId ? null : clientId);
  };

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="w-full text-left text-gray-700">
        <thead className="text-sm uppercase bg-gray-50 text-gray-600">
          <tr>
            <th className="px-6 py-3 w-10"></th>
            <th className="px-6 py-3">
              <button 
                className="flex items-center focus:outline-none hover:text-green-600 transition-colors"
                onClick={() => handleSort('name')}
              >
                Client
                <SortIndicator field="name" />
              </button>
            </th>
            <th className="px-6 py-3">
              <button 
                className="flex items-center focus:outline-none hover:text-green-600 transition-colors"
                onClick={() => handleSort('email')}
              >
                Email
                <SortIndicator field="email" />
              </button>
            </th>
            <th className="px-6 py-3">
              <button 
                className="flex items-center focus:outline-none hover:text-green-600 transition-colors"
                onClick={() => handleSort('totalOrders')}
              >
                Commandes
                <SortIndicator field="totalOrders" />
              </button>
            </th>
            <th className="px-6 py-3">
              <button 
                className="flex items-center focus:outline-none hover:text-green-600 transition-colors"
                onClick={() => handleSort('lastOrder')}
              >
                Dernière commande
                <SortIndicator field="lastOrder" />
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedClients.map((client) => (
            <React.Fragment key={client.id}>
              <tr className="bg-white border-b hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <button 
                    className="text-gray-500 hover:text-green-600 focus:outline-none transition-colors"
                    onClick={() => toggleExpand(client.id)}
                  >
                    {expandedClient === client.id ? 
                      <ChevronDown size={16} /> : 
                      <ChevronUp size={16} className="rotate-180" />
                    }
                  </button>
                </td>
                <td className="px-6 py-4 font-medium text-gray-800">{client.name}</td>
                <td className="px-6 py-4 text-gray-600">{client.email}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-green-50 text-green-600 rounded-full text-xs font-medium">
                    {client.totalOrders}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-600">
                  {client.lastOrder ? new Date(client.lastOrder).toLocaleDateString('fr-FR') : 'Aucune'}
                </td>
              </tr>
              {expandedClient === client.id && (
                <tr className="bg-gray-50">
                  <td colSpan={5} className="px-6 py-4">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium mb-3 text-gray-800">Informations de contact</h4>
                        <div className="space-y-3">
                          <div className="flex items-center">
                            <Mail size={16} className="text-gray-500 mr-3" />
                            <span className="text-gray-600">{client.email}</span>
                          </div>
                          <div className="flex items-center">
                            <Phone size={16} className="text-gray-500 mr-3" />
                            <span className="text-gray-600">{client.phone || 'Non renseigné'}</span>
                          </div>
                          <div className="flex items-start">
                            <MapPin size={16} className="text-gray-500 mr-3 mt-0.5" />
                            <span className="text-gray-600">{client.address || 'Non renseignée'}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-3 text-gray-800">Statistiques</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Commandes totales :</span>
                            <span className="font-medium text-gray-800">{client.totalOrders}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Dernière commande :</span>
                            <span className="font-medium text-gray-800">
                              {client.lastOrder ? new Date(client.lastOrder).toLocaleDateString('fr-FR') : 'Aucune'}
                            </span>
                          </div>
                        </div>
                        <div className="mt-4 flex gap-3">
                          <button className="px-4 py-2 bg-green-50 text-green-600 hover:bg-green-100 rounded-lg text-sm font-medium transition-colors">
                            Voir les commandes
                          </button>
                          <button className="px-4 py-2 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors">
                            Modifier le client
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