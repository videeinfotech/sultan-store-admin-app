
import React from 'react';
import Layout from '../components/Layout';
import { Screen, Customer } from '../types';

interface CustomersProps {
  onNavigate: (screen: Screen) => void;
}

const Customers: React.FC<CustomersProps> = ({ onNavigate }) => {
  const mockCustomers: Customer[] = [
    { id: '1', name: 'Sarah Jenkins', lastOrderDate: 'Oct 24, 2023', email: 's.jenkins@gmail.com', orderCount: 12, avatar: 'https://picsum.photos/seed/sj/200' },
    { id: '2', name: 'Michael Chen', lastOrderDate: 'Nov 02, 2023', email: '(555) 0456', orderCount: 8, avatar: 'https://picsum.photos/seed/mc/200' },
    { id: '3', name: 'Alisha Williams', lastOrderDate: 'Nov 15, 2023', email: 'alisha.w@outlook.com', orderCount: 24, avatar: 'https://picsum.photos/seed/aw/200' },
  ];

  return (
    <Layout activeScreen={Screen.CUSTOMERS} onNavigate={onNavigate} title="Customer Insights">
      <div className="p-4">
        <div className="relative mb-6">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">search</span>
          <input 
            type="text" 
            placeholder="Search customers..." 
            className="w-full h-12 bg-gray-100 dark:bg-gray-800 border-none rounded-2xl pl-12 pr-4"
          />
        </div>

        <div className="flex gap-2 mb-8">
          <button className="bg-primary text-white px-5 py-2 rounded-full text-xs font-bold flex items-center gap-2">
            All Customers <span className="material-symbols-outlined text-sm">expand_more</span>
          </button>
          <button className="bg-gray-100 dark:bg-gray-800 px-5 py-2 rounded-full text-xs font-bold flex items-center gap-2">
            Frequent <span className="material-symbols-outlined text-sm">star</span>
          </button>
          <button className="bg-gray-100 dark:bg-gray-800 px-5 py-2 rounded-full text-xs font-bold">
            Inactive
          </button>
        </div>

        <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">Recent Activity</h3>
        <div className="space-y-1 -mx-4">
          {mockCustomers.map((c) => (
            <div key={c.id} className="flex items-center gap-4 px-4 py-5 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors border-b border-gray-50 dark:border-gray-800">
              <div 
                className="w-14 h-14 rounded-full bg-gray-200 bg-cover border-2 border-white shadow-sm"
                style={{ backgroundImage: `url('${c.avatar}')` }}
              />
              <div className="flex-1 min-w-0">
                <p className="font-bold text-lg leading-tight">{c.name}</p>
                <p className="text-xs text-gray-400 font-bold mb-1 uppercase">Last: {c.lastOrderDate}</p>
                <div className="flex items-center gap-1 text-gray-500 text-xs">
                  <span className="material-symbols-outlined text-[14px]">mail</span>
                  <span className="truncate">{c.email}</span>
                </div>
              </div>
              <div className="text-right">
                <span className="bg-primary/10 text-primary text-[10px] font-black px-3 py-1.5 rounded-lg uppercase whitespace-nowrap">
                  {c.orderCount} Orders
                </span>
                <span className="material-symbols-outlined text-gray-300 ml-2 block mt-2">chevron_right</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 mb-6 flex justify-between items-center">
          <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Customer Summary</h3>
          <span className="bg-green-100 text-green-600 text-[10px] font-black px-2 py-1 rounded-lg uppercase">Read-Only</span>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl p-6 shadow-sm mb-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center text-white font-black text-xl">JD</div>
            <div>
              <p className="text-2xl font-black">John Doe</p>
              <p className="text-sm text-gray-400 font-bold">Regular Customer since 2021</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase mb-1">LTV</p>
              <p className="text-2xl font-black text-primary">$1,240.50</p>
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Avg Frequency</p>
              <p className="text-2xl font-black">14 Days</p>
            </div>
          </div>
        </div>

        <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">Recent Inquiries</h3>
        <div className="space-y-3">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-orange-500">chat_bubble</span>
                <p className="font-bold">Shipping delay inquiry</p>
              </div>
              <span className="text-[10px] text-gray-400 font-bold uppercase">Nov 12</span>
            </div>
            <p className="text-xs text-gray-500 mb-3">Inquired about order #4592 status...</p>
            <span className="px-2 py-0.5 bg-green-100 text-green-600 text-[10px] font-black rounded-lg uppercase">Resolved</span>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Customers;
