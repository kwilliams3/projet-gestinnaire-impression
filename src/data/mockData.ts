import { Client, Order, PrintJob, Notification, StaffMember, DashboardStats } from '../types';

// Mock dashboard statistics
export const mockStats: DashboardStats = {
  totalDocumentsToday: 24,
  totalDocumentsWeek: 156,
  totalDocumentsMonth: 543,
  activeJobs: 8,
  readyForDelivery: 12,
  delivered: 32,
  pendingValidation: 5
};

// Mock print jobs for queue
export const mockPrintJobs: PrintJob[] = [
  {
    id: 'job-001',
    clientName: 'Acme Corporation',
    documentType: 'Product Catalog',
    format: 'A4 Color Double-sided',
    pages: 42,
    status: 'printing',
    receivedAt: '2025-03-15T09:30:00Z',
    priority: 'high'
  },
  {
    id: 'job-002',
    clientName: 'Global Industries',
    documentType: 'Financial Report',
    format: 'A4 B&W Single-sided',
    pages: 18,
    status: 'pending',
    receivedAt: '2025-03-15T10:15:00Z',
    priority: 'medium'
  },
  {
    id: 'job-003',
    clientName: 'Tech Solutions',
    documentType: 'Technical Manual',
    format: 'A3 Color Double-sided',
    pages: 64,
    status: 'completed',
    receivedAt: '2025-03-15T08:45:00Z',
    completedAt: '2025-03-15T11:30:00Z',
    priority: 'low'
  },
  {
    id: 'job-004',
    clientName: 'Retail Partners',
    documentType: 'Marketing Materials',
    format: 'A4 Color Single-sided',
    pages: 28,
    status: 'pending',
    receivedAt: '2025-03-15T11:00:00Z',
    priority: 'high'
  },
  {
    id: 'job-005',
    clientName: 'Legal Associates',
    documentType: 'Contract Documents',
    format: 'A4 B&W Double-sided',
    pages: 52,
    status: 'printing',
    receivedAt: '2025-03-15T10:30:00Z',
    priority: 'high'
  }
];

// Mock orders for history
export const mockOrders: Order[] = [
  {
    id: 'order-001',
    clientId: 'client-001',
    clientName: 'Acme Corporation',
    documentType: 'Product Catalog',
    format: 'A4 Color Double-sided',
    pages: 42,
    status: 'delivered',
    receivedAt: '2025-03-10T09:30:00Z',
    completedAt: '2025-03-10T14:30:00Z',
    deliveryAddress: '123 Business Ave, Suite 500',
    priority: 'high'
  },
  {
    id: 'order-002',
    clientId: 'client-002',
    clientName: 'Global Industries',
    documentType: 'Annual Report',
    format: 'A4 Color Double-sided',
    pages: 86,
    status: 'delivered',
    receivedAt: '2025-03-11T08:15:00Z',
    completedAt: '2025-03-11T15:20:00Z',
    deliveryAddress: '456 Corporate Blvd',
    priority: 'high'
  },
  {
    id: 'order-003',
    clientId: 'client-003',
    clientName: 'Tech Solutions',
    documentType: 'Technical Manual',
    format: 'A3 Color Double-sided',
    pages: 64,
    status: 'completed',
    receivedAt: '2025-03-14T08:45:00Z',
    completedAt: '2025-03-14T13:30:00Z',
    deliveryAddress: '789 Innovation Way',
    priority: 'medium'
  },
  {
    id: 'order-004',
    clientId: 'client-004',
    clientName: 'Retail Partners',
    documentType: 'Marketing Materials',
    format: 'A4 Color Single-sided',
    pages: 28,
    status: 'printing',
    receivedAt: '2025-03-15T11:00:00Z',
    priority: 'medium'
  },
  {
    id: 'order-005',
    clientId: 'client-005',
    clientName: 'Legal Associates',
    documentType: 'Contract Documents',
    format: 'A4 B&W Double-sided',
    pages: 52,
    status: 'pending',
    receivedAt: '2025-03-15T10:30:00Z',
    priority: 'high'
  }
];

// Mock clients
export const mockClients: Client[] = [
  {
    id: 'client-001',
    name: 'Acme Corporation',
    email: 'orders@acme.com',
    phone: '555-123-4567',
    address: '123 Business Ave, Suite 500',
    totalOrders: 42,
    lastOrder: '2025-03-10T09:30:00Z'
  },
  {
    id: 'client-002',
    name: 'Global Industries',
    email: 'print@globalind.com',
    phone: '555-987-6543',
    address: '456 Corporate Blvd',
    totalOrders: 28,
    lastOrder: '2025-03-11T08:15:00Z'
  },
  {
    id: 'client-003',
    name: 'Tech Solutions',
    email: 'docs@techsolutions.com',
    phone: '555-456-7890',
    address: '789 Innovation Way',
    totalOrders: 15,
    lastOrder: '2025-03-14T08:45:00Z'
  },
  {
    id: 'client-004',
    name: 'Retail Partners',
    email: 'print@retailpartners.com',
    phone: '555-234-5678',
    address: '321 Market Street',
    totalOrders: 36,
    lastOrder: '2025-03-15T11:00:00Z'
  },
  {
    id: 'client-005',
    name: 'Legal Associates',
    email: 'documents@legalassoc.com',
    phone: '555-345-6789',
    address: '555 Justice Road',
    totalOrders: 64,
    lastOrder: '2025-03-15T10:30:00Z'
  }
];

// Mock notifications
export const mockNotifications: Notification[] = [
  {
    id: 'notif-001',
    type: 'info',
    message: 'New print job received from Acme Corporation',
    read: false,
    timestamp: '2025-03-15T09:30:00Z',
    link: '/queue'
  },
  {
    id: 'notif-002',
    type: 'warning',
    message: 'Printer #2 is low on cyan ink',
    read: false,
    timestamp: '2025-03-15T08:45:00Z',
    link: '/settings'
  },
  {
    id: 'notif-003',
    type: 'error',
    message: 'Failed to process Tech Solutions file format',
    read: true,
    timestamp: '2025-03-14T16:20:00Z',
    link: '/queue'
  },
  {
    id: 'notif-004',
    type: 'success',
    message: 'Order #32 successfully delivered to Global Industries',
    read: true,
    timestamp: '2025-03-14T15:30:00Z',
    link: '/orders'
  },
  {
    id: 'notif-005',
    type: 'info',
    message: 'New client account created: MediaWorks',
    read: false,
    timestamp: '2025-03-14T11:15:00Z',
    link: '/clients'
  }
];

// Mock staff members
export const mockStaff: StaffMember[] = [
  {
    id: 'staff-001',
    name: 'John Doe',
    role: 'admin',
    email: 'john.doe@printco.com',
    phone: '555-111-2222'
  },
  {
    id: 'staff-002',
    name: 'Jane Smith',
    role: 'operator',
    email: 'jane.smith@printco.com',
    phone: '555-222-3333'
  },
  {
    id: 'staff-003',
    name: 'Robert Johnson',
    role: 'delivery',
    email: 'robert.johnson@printco.com',
    phone: '555-333-4444'
  },
  {
    id: 'staff-004',
    name: 'Sarah Williams',
    role: 'operator',
    email: 'sarah.williams@printco.com',
    phone: '555-444-5555'
  }
];