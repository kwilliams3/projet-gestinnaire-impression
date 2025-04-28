import React, { useState } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  LineElement,
  PointElement,
  ArcElement,
  Title, 
  Tooltip, 
  Legend,
  Filler
} from 'chart.js';
import { 
  FaDollarSign, 
  FaPrint, 
  FaUserFriends, 
  FaFileAlt, 
  FaChartLine, 
  FaCalendarAlt, 
  FaBoxOpen,
  FaArrowUp,
  FaFilter
} from 'react-icons/fa';
import { motion } from 'framer-motion';

ChartJS.register(
  CategoryScale, 
  LinearScale, 
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title, 
  Tooltip, 
  Legend,
  Filler
);

type TimeRange = 'week' | 'month' | 'quarter';

const DashboardPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>('week');

  // Données dynamiques basées sur la période sélectionnée
  const revenueData = {
    total: timeRange === 'week' ? 1250000 : timeRange === 'month' ? 4850000 : 15000000,
    change: timeRange === 'week' ? 8.5 : timeRange === 'month' ? 12.3 : 18.7,
    isPositive: true,
  };

  const stats = {
    impressions: { count: timeRange === 'week' ? 324 : timeRange === 'month' ? 1450 : 4200, change: 12.3, isPositive: true },
    clients: { count: timeRange === 'week' ? 28 : timeRange === 'month' ? 95 : 280, change: 5.2, isPositive: true },
    documents: { count: timeRange === 'week' ? 156 : timeRange === 'month' ? 620 : 1850, change: -3.4, isPositive: false },
  };

  // Nouveaux graphiques
  const getRevenueChartData = () => {
    if (timeRange === 'week') {
      return {
        labels: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
        datasets: [
          {
            label: 'Revenus (XAF)',
            data: [45000, 75000, 110000, 55000, 85000, 25000, 105000],
            backgroundColor: 'rgba(99, 102, 241, 0.2)',
            borderColor: 'rgba(99, 102, 241, 1)',
            borderWidth: 2,
            tension: 0.4,
            fill: true,
            pointBackgroundColor: 'rgba(99, 102, 241, 1)',
            pointRadius: 4,
            pointHoverRadius: 6
          }
        ]
      };
    } else if (timeRange === 'month') {
      return {
        labels: ['Semaine 1', 'Semaine 2', 'Semaine 3', 'Semaine 4'],
        datasets: [
          {
            label: 'Revenus (XAF)',
            data: [1100000, 1050000, 1400000, 1300000],
            backgroundColor: 'rgba(99, 102, 241, 0.2)',
            borderColor: 'rgba(99, 102, 241, 1)',
            borderWidth: 2,
            tension: 0.4,
            fill: true,
            pointBackgroundColor: 'rgba(99, 102, 241, 1)',
            pointRadius: 4,
            pointHoverRadius: 6
          }
        ]
      };
    } else {
      return {
        labels: ['Mois 1', 'Mois 2', 'Mois 3'],
        datasets: [
          {
            label: 'Revenus (XAF)',
            data: [4800000, 5200000, 5000000],
            backgroundColor: 'rgba(99, 102, 241, 0.2)',
            borderColor: 'rgba(99, 102, 241, 1)',
            borderWidth: 2,
            tension: 0.4,
            fill: true,
            pointBackgroundColor: 'rgba(99, 102, 241, 1)',
            pointRadius: 4,
            pointHoverRadius: 6
          }
        ]
      };
    }
  };

  const getProductDistributionData = () => {
    return {
      labels: ['Cartes de visite', 'Flyers', 'Brochures', 'Affiches', 'Autres'],
      datasets: [
        {
          data: [35, 25, 20, 15, 5],
          backgroundColor: [
            'rgba(99, 102, 241, 0.8)',
            'rgba(79, 70, 229, 0.8)',
            'rgba(67, 56, 202, 0.8)',
            'rgba(55, 48, 163, 0.8)',
            'rgba(49, 46, 129, 0.8)'
          ],
          borderColor: [
            'rgba(99, 102, 241, 1)',
            'rgba(79, 70, 229, 1)',
            'rgba(67, 56, 202, 1)',
            'rgba(55, 48, 163, 1)',
            'rgba(49, 46, 129, 1)'
          ],
          borderWidth: 1
        }
      ]
    };
  };

  const getClientActivityData = () => {
    if (timeRange === 'week') {
      return {
        labels: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
        datasets: [
          {
            label: 'Nouveaux clients',
            data: [3, 5, 7, 4, 6, 2, 1],
            backgroundColor: 'rgba(16, 185, 129, 0.8)',
            borderRadius: 6
          },
          {
            label: 'Commandes',
            data: [8, 12, 15, 10, 14, 5, 3],
            backgroundColor: 'rgba(99, 102, 241, 0.8)',
            borderRadius: 6
          }
        ]
      };
    } else if (timeRange === 'month') {
      return {
        labels: ['Semaine 1', 'Semaine 2', 'Semaine 3', 'Semaine 4'],
        datasets: [
          {
            label: 'Nouveaux clients',
            data: [15, 20, 25, 18],
            backgroundColor: 'rgba(16, 185, 129, 0.8)',
            borderRadius: 6
          },
          {
            label: 'Commandes',
            data: [35, 40, 45, 38],
            backgroundColor: 'rgba(99, 102, 241, 0.8)',
            borderRadius: 6
          }
        ]
      };
    } else {
      return {
        labels: ['Mois 1', 'Mois 2', 'Mois 3'],
        datasets: [
          {
            label: 'Nouveaux clients',
            data: [65, 75, 70],
            backgroundColor: 'rgba(16, 185, 129, 0.8)',
            borderRadius: 6
          },
          {
            label: 'Commandes',
            data: [120, 140, 130],
            backgroundColor: 'rgba(99, 102, 241, 0.8)',
            borderRadius: 6
          }
        ]
      };
    }
  };

  // Options des graphiques
  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#6B7280',
          font: {
            family: "'Inter', sans-serif",
          },
          usePointStyle: true,
        }
      },
      tooltip: {
        backgroundColor: '#1F2937',
        titleColor: '#F9FAFB',
        bodyColor: '#E5E7EB',
        padding: 12,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          label: (context: any) => {
            return `${context.dataset.label}: ${context.parsed.y.toLocaleString()} XAF`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(229, 231, 235, 0.5)',
          drawBorder: false,
        },
        ticks: {
          color: '#6B7280',
          callback: (value: any) => {
            return `${(value / 1000)}k`;
          }
        },
      },
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          color: '#6B7280',
        },
      },
    },
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#6B7280',
          font: {
            family: "'Inter', sans-serif",
          },
          usePointStyle: true,
        }
      },
      tooltip: {
        backgroundColor: '#1F2937',
        titleColor: '#F9FAFB',
        bodyColor: '#E5E7EB',
        padding: 12,
        cornerRadius: 8,
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(229, 231, 235, 0.5)',
          drawBorder: false,
        },
        ticks: {
          color: '#6B7280',
        },
      },
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          color: '#6B7280',
        },
      },
    },
  };

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          color: '#6B7280',
          font: {
            family: "'Inter', sans-serif",
          },
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle',
        }
      },
      tooltip: {
        backgroundColor: '#1F2937',
        titleColor: '#F9FAFB',
        bodyColor: '#E5E7EB',
        padding: 12,
        cornerRadius: 8,
        callbacks: {
          label: (context: any) => {
            const label = context.label || '';
            const value = context.raw || 0;
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = Math.round((value / total) * 100);
            return `${label}: ${percentage}% (${value})`;
          }
        }
      }
    },
  };

  const orders = [
    { id: 'CMD-2023-056', client: 'Entreprise ABC', amount: 125000, status: 'Livré', date: '12/06/2023' },
    { id: 'CMD-2023-057', client: 'Université XYZ', amount: 85500, status: 'En cours', date: '10/06/2023' },
    { id: 'CMD-2023-058', client: 'Société XYZ', amount: 150000, status: 'Terminé', date: '08/06/2023' },
  ];

  const statusStyles: { [key: string]: string } = {
    'Livré': 'bg-green-100 text-green-800',
    'En cours': 'bg-yellow-100 text-yellow-800',
    'Terminé': 'bg-blue-100 text-blue-800',
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Tableau de Bord</h1>
        <div className="flex items-center mt-2">
          <p className="text-gray-500 flex items-center">
            <FaCalendarAlt className="mr-2 text-indigo-500" />
            {new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Revenue Card */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-gradient-to-br from-indigo-600 to-indigo-500 p-6 rounded-2xl shadow-lg text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-bl-full"></div>
          <div className="flex items-center justify-between relative z-10">
            <div>
              <p className="text-indigo-100 text-sm font-medium">Revenus Totaux</p>
              <p className="text-2xl font-bold mt-2">{`${revenueData.total.toLocaleString()} XAF`}</p>
              <div className={`flex items-center mt-2 ${revenueData.isPositive ? 'text-green-200' : 'text-red-200'}`}>
                <span className="text-sm font-medium">
                  {revenueData.isPositive ? '+' : ''}{revenueData.change}%
                </span>
                <FaArrowUp className={`w-3 h-3 ml-2 ${!revenueData.isPositive && 'transform rotate-180'}`} />
                <span className="text-xs ml-1 text-indigo-100">vs période précédente</span>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm">
              <FaDollarSign className="text-xl" />
            </div>
          </div>
        </motion.div>

        {/* Impressions Card */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-gradient-to-br from-blue-600 to-blue-500 p-6 rounded-2xl shadow-lg text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-bl-full"></div>
          <div className="flex items-center justify-between relative z-10">
            <div>
              <p className="text-blue-100 text-sm font-medium">Impressions</p>
              <p className="text-2xl font-bold mt-2">{stats.impressions.count}</p>
              <div className={`flex items-center mt-2 ${stats.impressions.isPositive ? 'text-green-200' : 'text-red-200'}`}>
                <span className="text-sm font-medium">
                  {stats.impressions.isPositive ? '+' : ''}{stats.impressions.change}%
                </span>
                <FaArrowUp className={`w-3 h-3 ml-2 ${!stats.impressions.isPositive && 'transform rotate-180'}`} />
                <span className="text-xs ml-1 text-blue-100">vs période précédente</span>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm">
              <FaPrint className="text-xl" />
            </div>
          </div>
        </motion.div>

        {/* Clients Card */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-gradient-to-br from-purple-600 to-purple-500 p-6 rounded-2xl shadow-lg text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-bl-full"></div>
          <div className="flex items-center justify-between relative z-10">
            <div>
              <p className="text-purple-100 text-sm font-medium">Clients Actifs</p>
              <p className="text-2xl font-bold mt-2">{stats.clients.count}</p>
              <div className={`flex items-center mt-2 ${stats.clients.isPositive ? 'text-green-200' : 'text-red-200'}`}>
                <span className="text-sm font-medium">
                  {stats.clients.isPositive ? '+' : ''}{stats.clients.change}%
                </span>
                <FaArrowUp className={`w-3 h-3 ml-2 ${!stats.clients.isPositive && 'transform rotate-180'}`} />
                <span className="text-xs ml-1 text-purple-100">vs période précédente</span>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm">
              <FaUserFriends className="text-xl" />
            </div>
          </div>
        </motion.div>

        {/* Documents Card */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-gradient-to-br from-red-600 to-red-500 p-6 rounded-2xl shadow-lg text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-bl-full"></div>
          <div className="flex items-center justify-between relative z-10">
            <div>
              <p className="text-red-100 text-sm font-medium">Documents</p>
              <p className="text-2xl font-bold mt-2">{stats.documents.count}</p>
              <div className={`flex items-center mt-2 ${stats.documents.isPositive ? 'text-green-200' : 'text-red-200'}`}>
                <span className="text-sm font-medium">
                  {stats.documents.isPositive ? '+' : ''}{stats.documents.change}%
                </span>
                <FaArrowUp className={`w-3 h-3 ml-2 ${!stats.documents.isPositive && 'transform rotate-180'}`} />
                <span className="text-xs ml-1 text-red-100">vs période précédente</span>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm">
              <FaFileAlt className="text-xl" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Revenue Trend Chart - Line Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center">
              <FaChartLine className="mr-3 text-indigo-500" />
              Tendance des revenus {timeRange === 'week' ? 'hebdomadaire' : timeRange === 'month' ? 'mensuelle' : 'trimestrielle'}
            </h2>
            <div className="flex items-center space-x-2">
              <FaFilter className="text-gray-400" />
              <select 
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value as TimeRange)}
                className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 p-1.5"
              >
                <option value="week">Semaine</option>
                <option value="month">Mois</option>
                <option value="quarter">Trimestre</option>
              </select>
            </div>
          </div>
          <div className="h-80">
            <Line data={getRevenueChartData()} options={lineChartOptions} />
          </div>
        </div>

        {/* Product Distribution - Pie Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center">
              <FaBoxOpen className="mr-3 text-indigo-500" />
              Répartition des produits
            </h2>
          </div>
          <div className="h-80">
            <Pie data={getProductDistributionData()} options={pieChartOptions} />
          </div>
        </div>
      </div>

      {/* Second Row of Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Client Activity - Bar Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center">
              <FaUserFriends className="mr-3 text-indigo-500" />
              Activité client {timeRange === 'week' ? 'hebdomadaire' : timeRange === 'month' ? 'mensuelle' : 'trimestrielle'}
            </h2>
          </div>
          <div className="h-80">
            <Bar data={getClientActivityData()} options={barChartOptions} />
          </div>
        </div>

        {/* Recent Orders Table */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Commandes Récentes</h2>
            <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium flex items-center">
              Voir tout <FaArrowUp className="ml-1 transform rotate-90" />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Commande</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Montant</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-indigo-600">{order.id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{order.client}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{order.amount.toLocaleString()} XAF</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusStyles[order.status]}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;