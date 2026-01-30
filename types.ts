
export enum Screen {
  LOGIN = 'LOGIN',
  OVERVIEW = 'OVERVIEW',
  ORDERS = 'ORDERS',
  ORDER_DETAIL = 'ORDER_DETAIL',
  INVENTORY = 'INVENTORY',
  INVENTORY_DETAIL = 'INVENTORY_DETAIL',
  CUSTOMERS = 'CUSTOMERS',
  STAFF = 'STAFF',
  SETTINGS = 'SETTINGS'
}

export interface Order {
  id: string;
  customerName: string;
  customerAvatar?: string;
  date: string;
  time: string;
  status: 'Delivered' | 'Processing' | 'Paid' | 'Cancelled';
  amount: number;
}

export interface InventoryItem {
  id: string;
  sku: string;
  name: string;
  image: string;
  stock: number;
  lowStock?: boolean;
}

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  access: 'FULL ADMIN' | 'POS ACCESS' | 'LIMITED' | 'BASIC';
  status: 'ACTIVE' | 'INACTIVE';
  avatar: string;
}

export interface Customer {
  id: string;
  name: string;
  lastOrderDate: string;
  email: string;
  orderCount: number;
  avatar: string;
}
