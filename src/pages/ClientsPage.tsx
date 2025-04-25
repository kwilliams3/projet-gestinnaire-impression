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
        <h1 className="text-4xl font-bold text-gray-900">Rechercher des clients...</h1>
      </header>

      <section className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Rechercher des clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search size={20} className="text-gray-400" />
            </div>
          </div>

          <div className="flex space-x-2">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="all">Tous</option>
              <option value="active">Actifs</option>
              <option value="inactive">Inactifs</option>
            </select>

            <button className="px-4 py-3 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500">
              <Filter size={20} />
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Users size={20} className="text-green-500" />
            <span>Affichage de {filteredClients.length} clients</span>
          </div>

          <div className="text-sm text-gray-600">
            <button className="text-green-600 hover:text-green-800">Exporter CSV</button>
          </div>
        </div>

        <ClientsTable clients={filteredClients} />
      </section>
    </div>
  );
};

export default ClientsPage;