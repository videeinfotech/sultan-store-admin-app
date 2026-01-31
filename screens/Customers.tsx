
import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout.tsx';
import { Screen, Customer } from '../types.ts';
import { storeAdminApi } from '../api.ts';

interface CustomersProps {
  onNavigate: (screen: Screen) => void;
}

const Customers: React.FC<CustomersProps> = ({ onNavigate }) => {
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      try {
        const res = await storeAdminApi.getCustomers();
        if (res.success) {
          setCustomers(res.data);
        }
      } catch (err) {
        console.error('Failed to fetch customers', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomers();
  }, []);

  return (
    <Layout activeScreen={Screen.CUSTOMERS} onNavigate={onNavigate} title="Customer Insights">
      <div className="p-4 overflow-y-auto h-full">
        <div className="relative mb-6">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">search</span>
          <input
            type="text"
            placeholder="Search customers..."
            className="w-full h-12 bg-gray-100 dark:bg-gray-800 border-none rounded-2xl pl-12 pr-4 outline-none focus:ring-1 focus:ring-primary/30"
          />
        </div>

        <div className="flex gap-2 mb-8 overflow-x-auto no-scrollbar">
          <button className="bg-primary text-white px-5 py-2 rounded-full text-xs font-bold flex items-center gap-2 shadow-sm">
            All Customers <span className="material-symbols-outlined text-sm">expand_more</span>
          </button>
          <button className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-5 py-2 rounded-full text-xs font-bold flex items-center gap-2">
            Frequent <span className="material-symbols-outlined text-sm">star</span>
          </button>
        </div>

        <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">Customer List</h3>
        <div className="space-y-1 -mx-4 pb-12">
          {loading ? (
            <div className="flex justify-center p-12">
              <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <>
              {customers.length === 0 ? (
                <div className="text-center p-12 text-gray-400 italic">No customers found</div>
              ) : (
                customers.map((c) => (
                  <div key={c.id} className="flex items-center gap-4 px-4 py-5 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors border-b border-gray-50 dark:border-gray-800 group">
                    <img
                      src={c.avatar || 'https://picsum.photos/seed/customer/200'}
                      className="w-14 h-14 rounded-full bg-gray-200 border-2 border-white shadow-sm object-cover"
                      alt={c.name}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-lg leading-tight text-gray-900 dark:text-white truncate">{c.name || 'Anonymous'}</p>
                      <p className="text-xs text-gray-400 font-bold mb-1 uppercase">Last Order: {c.last_order_date || 'N/A'}</p>
                      <div className="flex items-center gap-1 text-gray-500 text-xs">
                        <span className="material-symbols-outlined text-[14px]">mail</span>
                        <span className="truncate">{c.email || c.phone}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="bg-primary/10 text-primary text-[10px] font-black px-3 py-1.5 rounded-lg uppercase whitespace-nowrap block mb-1">
                        {c.orders_count || 0} Orders
                      </span>
                      <span className="text-primary font-black text-sm">${c.total_spent || '0.00'}</span>
                    </div>
                  </div>
                ))
              )}
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Customers;
