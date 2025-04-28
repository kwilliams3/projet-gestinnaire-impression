import React, { useState } from 'react';
import { PrinterIcon, Eye, X } from 'lucide-react';

interface PrintJob {
  id: string;
  client: string;
  document: string;
  format: string;
  pages: number;
  received: string;
  status: 'pending' | 'printing' | 'completed' | 'failed';
  type: string;
  time: string;
  copies?: number;
  paperType?: string;
  color?: string;
  weight?: string;
  stapling?: string;
  coating?: string;
  binding?: string;
  amount?: string;
}

const PrintQueuePage: React.FC = () => {
  const [jobs] = useState<PrintJob[]>(mockPrintJobs);
  const [selectedJob, setSelectedJob] = useState<PrintJob | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePrint = (job: PrintJob) => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Printing: ${job.document}</title>
            <style>
              body { font-family: Arial; padding: 20px; }
              h1 { color: #333; }
            </style>
          </head>
          <body>
            <h1>${job.document}</h1>
            <p><strong>Client:</strong> ${job.client}</p>
            <p><strong>Type:</strong> ${job.type}</p>
            <p><strong>Format:</strong> ${job.format}</p>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const handleView = (job: PrintJob) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
  };

  return (
    <div className="container mx-auto p-6 relative">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">File d'impression</h1>
        <p className="text-gray-500 mt-1">Gestion des travaux d'impression en cours</p>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Format</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reçu le</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {jobs.map((job) => (
                <tr key={job.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{job.client}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{job.document}</div>
                    <div className="text-xs text-gray-500">{job.type}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{job.format}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{job.received}</div>
                    <div className="text-xs text-gray-500">{job.time}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleView(job)}
                        className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors"
                        title="Voir les détails"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => handlePrint(job)}
                        className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-md transition-colors"
                        title="Imprimer"
                        disabled={job.status === 'completed'}
                      >
                        <PrinterIcon size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal pour afficher les détails */}
      {isModalOpen && selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b p-4">
              <h2 className="text-xl font-bold text-gray-800">Détails d'impression</h2>
              <button 
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6">
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-700 mb-2">Date :</h3>
                    <p className="text-gray-900">{selectedJob.received} à {selectedJob.time}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-700 mb-2">Client :</h3>
                    <p className="text-gray-900">{selectedJob.client}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-700 mb-2">Document :</h3>
                    <p className="text-gray-900">{selectedJob.document}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-700 mb-2">Type :</h3>
                    <p className="text-gray-900">{selectedJob.type}</p>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6 mt-6">
                  <h3 className="font-semibold text-xl text-gray-800 mb-4">Paramètres d'impression</h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-700 mb-2">Format :</h4>
                      <p className="text-gray-900">{selectedJob.format}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-700 mb-2">Pages :</h4>
                      <p className="text-gray-900">{selectedJob.pages}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-700 mb-2">Copies :</h4>
                      <p className="text-gray-900">{selectedJob.copies || '1'}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-700 mb-2">Type de papier :</h4>
                      <p className="text-gray-900">{selectedJob.paperType || 'Standard'}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-700 mb-2">Couleur :</h4>
                      <p className="text-gray-900">{selectedJob.color || (selectedJob.format.includes('Color') ? 'Couleur' : 'Noir & blanc')}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-700 mb-2">Grammage :</h4>
                      <p className="text-gray-900">{selectedJob.weight || 'Standard'}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-700 mb-2">Agrafage :</h4>
                      <p className="text-gray-900">{selectedJob.stapling || 'Non'}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-700 mb-2">Reliure :</h4>
                      <p className="text-gray-900">{selectedJob.binding || 'Aucune'}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-700 mb-2">Pelliculage :</h4>
                      <p className="text-gray-900">{selectedJob.coating || 'Aucun'}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-700 mb-2">Montant :</h4>
                      <p className="text-gray-900">{selectedJob.amount || 'N/A'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t p-4 flex justify-end">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Données mockées
const mockPrintJobs: PrintJob[] = [
  {
    id: '1',
    client: 'Jean Dupont',
    document: 'affiche_conférence.png',
    format: 'A4',
    pages: 1,
    received: '12/04/2025',
    status: 'printing',
    type: 'Image',
    time: '12:17:03',
    copies: 50,
    paperType: 'Brillant',
    color: 'Noir & blanc',
    weight: '80g',
    stapling: 'Non',
    coating: 'Aucun',
    binding: 'Spirale métal',
    amount: '7500 fcfa'
  },
  {
    id: '2',
    client: 'Retail Partners',
    document: 'Marketing Materials',
    format: 'A4 Color',
    pages: 28,
    received: '15/03/2025',
    status: 'completed',
    type: 'Single-sided',
    time: '12:00:00',
    copies: 1,
    paperType: 'Mat',
    color: 'Couleur',
    weight: '120g',
    binding: 'Reliure thermocollée',
    amount: '15000 fcfa'
  },
  {
    id: '3',
    client: 'Legal Associates',
    document: 'Contract Documents',
    format: 'A4 B&W',
    pages: 52,
    received: '15/03/2025',
    status: 'printing',
    type: 'Double-sided',
    time: '11:30:00',
    copies: 3,
    binding: 'Reliure à anneaux'
  },
];

export default PrintQueuePage;