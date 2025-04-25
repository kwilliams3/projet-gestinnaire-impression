import React, { useState, useMemo } from 'react';
import { PrinterIcon, Eye } from 'lucide-react';

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
  content?: string;
}

const PrintQueuePage: React.FC = () => {
  const [jobs] = useState<PrintJob[]>(mockPrintJobs);

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
              pre { background: #f5f5f5; padding: 15px; border-radius: 5px; }
            </style>
          </head>
          <body>
            <h1>${job.document}</h1>
            <p><strong>Client:</strong> ${job.client}</p>
            <p><strong>Type:</strong> ${job.type}</p>
            <p><strong>Format:</strong> ${job.format} - ${job.pages} pages</p>
            <hr>
            <pre>${job.content || 'No content available'}</pre>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const handleView = (job: PrintJob) => {
    const viewWindow = window.open('', '_blank');
    if (viewWindow) {
      viewWindow.document.write(`
        <html>
          <head>
            <title>Viewing: ${job.document}</title>
            <style>
              body { font-family: Arial; padding: 20px; }
              h1 { color: #333; }
              pre { background: #f5f5f5; padding: 15px; border-radius: 5px; }
            </style>
          </head>
          <body>
            <h1>${job.document}</h1>
            <p><strong>Client:</strong> ${job.client}</p>
            <p><strong>Type:</strong> ${job.type}</p>
            <p><strong>Format:</strong> ${job.format} - ${job.pages} pages</p>
            <hr>
            <pre>${job.content || 'No content available'}</pre>
          </body>
        </html>
      `);
      viewWindow.document.close();
    }
  };

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Print Queue</h1>
        <p className="text-gray-500 mt-1">Current print jobs</p>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Format</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pages</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Received</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
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
                    <div className="text-sm text-gray-900">{job.pages}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{job.received}</div>
                    <div className="text-xs text-gray-500">{job.time}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      job.status === 'completed' ? 'bg-green-100 text-green-800' :
                      job.status === 'printing' ? 'bg-blue-100 text-blue-800' :
                      job.status === 'failed' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {job.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleView(job)}
                        className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors"
                        title="View"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => handlePrint(job)}
                        className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-md transition-colors"
                        title="Print"
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
    </div>
  );
};

// Données mockées
const mockPrintJobs: PrintJob[] = [
  {
    id: '1',
    client: 'Retail Partners',
    document: 'Marketing Materials',
    format: 'A4 Color',
    pages: 28,
    received: '15/03/2025',
    status: 'completed',
    type: 'Single-sided',
    time: '12:00:00',
    content: 'Marketing materials for Q2 campaign\n\nIncludes:\n- Flyers\n- Brochures\n- Posters'
  },
  {
    id: '2',
    client: 'Legal Associates',
    document: 'Contract Documents',
    format: 'A4 B&W',
    pages: 52,
    received: '15/03/2025',
    status: 'printing',
    type: 'Double-sided',
    time: '11:30:00',
    content: 'Legal contracts for client review\n\nSections:\n1. Terms and Conditions\n2. Confidentiality\n3. Payment Terms'
  },
  {
    id: '3',
    client: 'Global Industries',
    document: 'Financial Report',
    format: 'A4 B&W',
    pages: 18,
    received: '15/03/2025',
    status: 'pending',
    type: 'Single-sided',
    time: '11:15:00',
    content: 'Q1 Financial Report\n\nHighlights:\n- Revenue: $1.5M\n- Expenses: $1.1M\n- Net Profit: $400K'
  },
  {
    id: '4',
    client: 'Acme Corporation',
    document: 'Product Catalog',
    format: 'A4 Color',
    pages: 42,
    received: '15/03/2025',
    status: 'pending',
    type: 'Double-sided',
    time: '10:30:00',
    content: 'Spring 2025 Product Catalog\n\nFeatured Products:\n- Widget X\n- Gadget Y\n- Tool Z'
  },
];

export default PrintQueuePage;