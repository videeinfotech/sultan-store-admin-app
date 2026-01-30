
import React from 'react';
import Layout from '../components/Layout';
import { Screen, Order } from '../types';

interface OrdersProps {
  onNavigate: (screen: Screen, id?: string) => void;
}

const Orders: React.FC<OrdersProps> = ({ onNavigate }) => {
  const mockOrders: Order[] = [
    { id: '#ORD-9921', customerName: 'Johnathan Doe', date: 'Oct 24, 2023', time: '2:30 PM', status: 'Delivered', amount: 125.50 },
    { id: '#ORD-9920', customerName: 'Sarah Wilson', date: 'Oct 24, 2023', time: '1:15 PM', status: 'Processing', amount: 84.20 },
    { id: '#ORD-9919', customerName: 'Michael Chen', date: 'Oct 23, 2023', time: '11:45 PM', status: 'Paid', amount: 210.00 },
    { id: '#ORD-9918', customerName: 'Emma Rodriguez', date: 'Oct 23, 2023', time: '10:20 PM', status: 'Cancelled', amount: 45.99 },
    { id: '#ORD-9917', customerName: 'David Miller', date: 'Oct 23, 2023', time: '9:00 PM', status: 'Delivered', amount: 312.00 },
    { id: '#ORD-9916', customerName: 'Jessica Taylor', date: 'Oct 22, 2023', time: '5:45 PM', status: 'Delivered', amount: 198.50 },
  ];

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-700';
      case 'Processing': return 'bg-orange-100 text-orange-700';
      case 'Paid': return 'bg-blue-100 text-blue-700';
      case 'Cancelled': return 'bg-red-100 text-red-700';
    }
  };

  return (
    <Layout 
      activeScreen={Screen.ORDERS} 
      onNavigate={onNavigate}
      title="Orders History"
      rightAction={
        <button className="text-gray-400">
          <span className="material-symbols-outlined">search</span>
        </button>
      }
    >
      <div className="px-4 py-6">
        {/* Quick Stats */}
        <div className="flex gap-3 mb-6">
          <div className="flex-1 bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Orders</p>
            <p className="text-2xl font-extrabold text-gray-900 dark:text-white">1,248</p>
          </div>
          <div className="flex-1 bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Gross Volume</p>
            <p className="text-2xl font-extrabold text-primary">$14,290</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-8 overflow-x-auto no-scrollbar">
          <button className="flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap">
            Last 30 Days <span className="material-symbols-outlined text-sm">expand_more</span>
          </button>
          <button className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap">
            Status <span className="material-symbols-outlined text-sm">expand_more</span>
          </button>
          <button className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap">
            Payment <span className="material-symbols-outlined text-sm">expand_more</span>
          </button>
        </div>

        {/* List Header */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-lg">Recent Orders</h3>
          <span className="text-[10px] font-bold text-gray-400 uppercase bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">Today</span>
        </div>

        {/* List */}
        <div className="space-y-1 -mx-4">
          {mockOrders.map((order) => (
            <button 
              key={order.id} 
              onClick={() => onNavigate(Screen.ORDER_DETAIL, order.id)}
              className="w-full flex items-center gap-4 px-4 py-5 bg-white dark:bg-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors border-b border-gray-50 dark:border-gray-800"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-primary">receipt_long</span>
              </div>
              <div className="flex-1 text-left">
                <p className="text-[10px] font-bold text-primary mb-1">{order.id}</p>
                <p className="text-base font-bold text-gray-900 dark:text-white leading-tight">{order.customerName}</p>
                <p className="text-xs text-gray-400 mt-1">{order.date} • {order.time}</p>
              </div>
              <div className="text-right">
                <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-2 ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
                <p className="text-base font-extrabold text-gray-900 dark:text-white">${order.amount.toFixed(2)}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
