export interface PrintJob {
  id: string;
  clientName: string;
  documentType: string;
  format: string;
  pages: number;
  status: 'pending' | 'printing' | 'completed' | 'delivered';
  receivedAt: string;
  completedAt?: string;
  priority: 'low' | 'medium' | 'high';
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  totalOrders: number;
  lastOrder?: string;
}

export interface Order {
  id: string;
  clientId: string;
  clientName: string;
  documentType: string;
  format: string;
  pages: number;
  status: 'pending' | 'printing' | 'completed' | 'delivered';
  receivedAt: string;
  completedAt?: string;
  deliveryAddress?: string;
  priority: 'low' | 'medium' | 'high';
}

export interface StaffMember {
  id: string;
  name: string;
  role: 'admin' | 'operator' | 'delivery';
  email: string;
  phone?: string;
}

export interface Notification {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  message: string;
  read: boolean;
  timestamp: string;
  link?: string;
}

export interface DashboardStats {
  totalDocumentsToday: number;
  totalDocumentsWeek: number;
  totalDocumentsMonth: number;
  activeJobs: number;
  readyForDelivery: number;
  delivered: number;
  pendingValidation: number;
}