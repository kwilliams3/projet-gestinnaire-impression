import React, { useState, useMemo } from 'react';
import { PrinterIcon, Filter, Plus, Search, RefreshCw, X, Edit, Trash2 } from 'lucide-react';

interface PrintJob {
  id: string;
  name: string;
  user: string;
  status: 'pending' | 'printing' | 'completed' | 'failed' | 'delivered';
  fileName: string;
  submittedAt: string;
  content?: string; // Contenu modifiable
}

const PrintQueuePage: React.FC = () => {
  // États
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [jobs, setJobs] = useState<PrintJob[]>(mockPrintJobs);
  const [editingJob, setEditingJob] = useState<PrintJob | null>(null);
  const [editContent, setEditContent] = useState('');

  // Filtrage des jobs
  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchesStatus = statusFilter === 'all' || job.status === statusFilter;
      const matchesSearch = 
        job.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.fileName.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesStatus && matchesSearch;
    });
  }, [jobs, statusFilter, searchQuery]);

  // Actions
  const handleEdit = (job: PrintJob) => {
    setEditingJob(job);
    setEditContent(job.content || '');
  };

  const handleSaveEdit = () => {
    if (!editingJob) return;
    
    setJobs(jobs.map(job => 
      job.id === editingJob.id 
        ? { ...job, content: editContent }
        : job
    ));
    setEditingJob(null);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this print job?')) {
      setJobs(jobs.filter(job => job.id !== id));
    }
  };

  const handlePrint = (job: PrintJob) => {
    // Simulation d'impression
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Printing: ${job.fileName}</title>
            <style>
              body { font-family: Arial; padding: 20px; }
              h1 { color: #333; }
              pre { background: #f5f5f5; padding: 15px; border-radius: 5px; }
            </style>
          </head>
          <body>
            <h1>${job.fileName}</h1>
            <p><strong>Job:</strong> ${job.name}</p>
            <p><strong>User:</strong> ${job.user}</p>
            <hr>
            <pre>${job.content || 'No content available'}</pre>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const handleCancelEdit = () => {
    setEditingJob(null);
  };

  return (
    <div className="container mx-auto p-4">
      {/* En-tête et contrôles (identique à la version précédente) */}
      {/* ... */}

      {/* Modal d'édition */}
      {editingJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <h2 className="text-xl font-bold mb-4">Edit Document: {editingJob.fileName}</h2>
            
            <textarea
              className="w-full h-64 p-3 border rounded mb-4 font-mono"
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              placeholder="Document content..."
            />
            
            <div className="flex justify-end gap-2">
              <button 
                onClick={handleCancelEdit}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button 
                onClick={handleSaveEdit}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tableau avec actions */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Job</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">File</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredJobs.map((job) => (
              <tr key={job.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{job.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.user}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.fileName}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    job.status === 'completed' ? 'bg-green-100 text-green-800' :
                    job.status === 'printing' ? 'bg-blue-100 text-blue-800' :
                    job.status === 'failed' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {job.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handlePrint(job)}
                      title="Print"
                      className="p-1 text-blue-600 hover:text-blue-800"
                    >
                      <PrinterIcon size={16} />
                    </button>
                    
                    <button 
                      onClick={() => handleEdit(job)}
                      title="Edit"
                      className="p-1 text-green-600 hover:text-green-800"
                    >
                      <Edit size={16} />
                    </button>
                    
                    <button 
                      onClick={() => handleDelete(job.id)}
                      title="Delete"
                      className="p-1 text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Données mockées avec contenu
const mockPrintJobs: PrintJob[] = [
  {
    id: '1',
    name: 'Annual Report',
    user: 'john.doe',
    status: 'completed',
    fileName: 'report_2023.pdf',
    submittedAt: '2023-05-15 09:30',
    content: '# Annual Report 2023\n\n## Financial Summary\nRevenue: $1.2M\nProfit: $300K\n\n## Key Achievements\n- Launched new product line\n- Expanded to 3 new markets'
  },
  {
    id: '2',
    name: 'Product Presentation',
    user: 'jane.smith',
    status: 'printing',
    fileName: 'product_deck.pptx',
    submittedAt: '2023-05-15 10:15',
    content: 'Product Features:\n- Feature 1: Fast performance\n- Feature 2: Easy to use\n- Feature 3: Affordable pricing'
  },
  {
    id: '3',
    name: 'Meeting Notes',
    user: 'bob.johnson',
    status: 'pending',
    fileName: 'meeting_notes.txt',
    submittedAt: '2023-05-15 11:45',
    content: 'Action Items:\n1. Update project timeline\n2. Contact client for feedback\n3. Prepare Q2 budget'
  },
];

export default PrintQueuePage;