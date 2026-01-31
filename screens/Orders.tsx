
import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout.tsx';
import { Screen, Order } from '../types.ts';
import { storeAdminApi, formatPrice } from '../api.ts';

interface OrdersProps {
  onNavigate: (screen: Screen, id?: string) => void;
}

const Orders: React.FC<OrdersProps> = ({ onNavigate }) => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [ordersRes, dashboardRes] = await Promise.all([
          storeAdminApi.getOrders(),
          storeAdminApi.getDashboard('?period=today')
        ]);
        if (ordersRes.success) {
          setOrders(ordersRes.data);
        }
        if (dashboardRes.success) {
          setStats(dashboardRes.data.stats);
        }
      } catch (err) {
        console.error('Failed to fetch store orders', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
      case 'Completed': return 'bg-green-100 text-green-700';
      case 'Processing':
      case 'Confirmed': return 'bg-orange-100 text-orange-700';
      case 'Paid': return 'bg-blue-100 text-blue-700';
      case 'Cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
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
          <div className="flex-1 bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Orders</p>
            <p className="text-2xl font-extrabold text-gray-900 dark:text-white">{stats?.total_orders || '0'}</p>
          </div>
          <div className="flex-1 bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Gross Volume</p>
            <p className="text-2xl font-extrabold text-primary">{formatPrice(stats?.total_revenue || 0)}</p>
          </div>
        </div>

        {/* List Header */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-lg">Recent Orders</h3>
          <span className="text-[10px] font-bold text-gray-400 uppercase bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
        </div>

        {loading ? (
          <div className="flex justify-center p-12">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          /* List */
          <div className="space-y-1 -mx-4">
            {orders.length === 0 ? (
              <div className="text-center p-12 text-gray-400">
                No orders found
              </div>
            ) : (
              orders.map((order) => (
                <button
                  key={order.id}
                  onClick={() => onNavigate(Screen.ORDER_DETAIL, order.id)}
                  className="w-full flex items-center gap-4 px-4 py-5 bg-white dark:bg-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors border-b border-gray-50 dark:border-gray-800 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors">
                    <span className="material-symbols-outlined text-primary group-hover:text-white">receipt_long</span>
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-[10px] font-bold text-primary mb-1 uppercase">#{order.id}</p>
                    <p className="text-base font-bold text-gray-900 dark:text-white leading-tight truncate">{order.customer || order.customerName || 'Guest Customer'}</p>
                    <p className="text-xs text-gray-400 mt-1">{order.timestamp || order.date}</p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-2 ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                    <p className="text-base font-extrabold text-gray-900 dark:text-white">{formatPrice(order.amount)}</p>
                  </div>
                </button>
              ))
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Orders;
