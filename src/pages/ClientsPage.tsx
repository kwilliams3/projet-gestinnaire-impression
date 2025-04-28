import React, { useState } from 'react';
import ClientsTable from '../components/clients/ClientsTable';
import { mockClients } from '../data/mockData';
import { Users, Search, Filter } from 'lucide-react';

const ClientsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  const filteredClients = mockClients.filter(client => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' ||
      (filter === 'active' && client.isActive) ||
      (filter === 'inactive' && !client.isActive);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="container mx-auto p-6 space-y-6">
      <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h1 className="text-4xl font-bold text-gray-900">Gestion des Clients</h1>
      </header>

      <section className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Rechercher par nom ou email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search size={20} className="text-gray-400" />
            </div>
          </div>

          <div className="flex space-x-2">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200"
            >
              <option value="all">Tous les clients</option>
              <option value="active">Clients actifs</option>
              <option value="inactive">Clients inactifs</option>
            </select>

            <button className="px-4 py-3 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200 flex items-center justify-center">
              <Filter size={20} className="mr-2" />
              <span>Filtres</span>
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Users size={20} className="text-green-500" />
            <span>{filteredClients.length} {filteredClients.length > 1 ? 'clients trouvés' : 'client trouvé'}</span>
          </div>

          <div className="text-sm">
            <button className="text-green-600 hover:text-green-800 font-medium px-4 py-2 bg-green-50 rounded-lg hover:bg-green-100 transition-all duration-200">
              Exporter en CSV
            </button>
          </div>
        </div>

        <ClientsTable clients={filteredClients} />
      </section>
    </div>
  );
};

export default ClientsPage;