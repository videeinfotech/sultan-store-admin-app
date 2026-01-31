
import React, { useEffect, useState } from 'react';
import { storeAdminApi } from '../api.ts';

interface OrderDetailProps {
  orderId: string | null;
  onBack: () => void;
}

const OrderDetail: React.FC<OrderDetailProps> = ({ orderId, onBack }) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) return;

    const fetchOrder = async () => {
      setLoading(true);
      try {
        const res = await storeAdminApi.getOrder(orderId);
        if (res.success) {
          setData(res.data);
        }
      } catch (err) {
        console.error('Failed to fetch order detail', err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className="flex flex-col h-full bg-white dark:bg-background-dark">
        <header className="sticky top-0 z-50 bg-white/80 dark:bg-background-dark/80 ios-blur border-b border-gray-100 dark:border-gray-800 px-4 py-3 flex items-center">
          <button onClick={onBack} className="w-10 h-10 flex items-center justify-center rounded-full">
            <span className="material-symbols-outlined">arrow_back_ios</span>
          </button>
          <h2 className="flex-1 text-center font-bold text-lg pr-10">Order Detail</h2>
        </header>
        <div className="flex-1 flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  const order = data?.order || {};
  const customer = data?.customer || {};
  const details = data?.details || [];

  return (
    <div className="flex flex-col h-full bg-background-light dark:bg-background-dark overflow-y-auto">
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-background-dark/80 ios-blur border-b border-gray-100 dark:border-gray-800 px-4 py-3 flex items-center">
        <button onClick={onBack} className="w-10 h-10 flex items-center justify-center rounded-full">
          <span className="material-symbols-outlined">arrow_back_ios</span>
        </button>
        <h2 className="flex-1 text-center font-bold text-lg pr-10">Order #{order.id}</h2>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar pb-10">
        {/* Status Banner */}
        <div className="p-4">
          <div className="bg-primary/10 border border-primary/20 rounded-2xl p-4 flex items-center justify-between shadow-sm">
            <div>
              <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">Current Status</p>
              <p className="text-xl font-bold text-primary">{order.status}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white">
              <span className="material-symbols-outlined">{order.status === 'Delivered' || order.status === 'Completed' ? 'check_circle' : 'pending_actions'}</span>
            </div>
          </div>
        </div>

        {/* Customer Info */}
        <section className="px-4 mb-6">
          <h3 className="font-bold mb-3">Customer Details</h3>
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
            <div className="p-4 flex gap-4">
              <div className="flex-1">
                <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Customer Name</p>
                <p className="text-lg font-bold">{customer.name || 'Anonymous'}</p>
                <p className="text-sm text-gray-500 mt-2">{customer.email}<br />{customer.phone || customer.contact}</p>
              </div>
              <div
                className="w-20 h-20 rounded-full border-2 border-white shadow-md bg-cover bg-gray-50"
                style={{ backgroundImage: `url('${customer.avatar || 'https://picsum.photos/seed/customer/200'}')` }}
              />
            </div>
            <div className="h-px bg-gray-50 dark:bg-gray-700 mx-4" />
            <div className="p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">map</span>
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold truncate">{order.shipping_address || 'No address provided'}</p>
                <p className="text-xs text-gray-400">Delivery Address</p>
              </div>
            </div>
          </div>
        </section>

        {/* Items */}
        <section className="px-4 mb-6">
          <h3 className="font-bold mb-3">Order Items ({details.length})</h3>
          <div className="space-y-3">
            {details.map((item: any) => (
              <div key={item.id} className="bg-white dark:bg-gray-800 p-3 rounded-2xl border border-gray-100 dark:border-gray-700 flex items-center gap-4">
                <img
                  src={item.product_image || 'https://picsum.photos/seed/product/200'}
                  className="w-16 h-16 rounded-xl bg-gray-50 shrink-0 object-cover"
                  alt={item.product_name}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold truncate">{item.product_name}</p>
                  <p className="text-xs text-gray-400">{item.variant || 'Standard'} • Qty: {item.qty}</p>
                </div>
                <p className="font-bold text-sm">${item.price}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section className="px-4 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-4 space-y-3 shadow-sm">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Subtotal</span>
              <span className="font-bold">${order.order_amount}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Tax</span>
              <span className="font-bold">${order.tax || '0.00'}</span>
            </div>
            <div className="h-px bg-gray-50 dark:bg-gray-700" />
            <div className="flex justify-between items-center pt-1">
              <span className="font-bold">Grand Total</span>
              <span className="text-2xl font-extrabold text-primary">${order.order_amount}</span>
            </div>
          </div>
        </section>

        {/* Actions */}
        <div className="px-4 mb-10 space-y-3">
          <button className="w-full h-12 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-primary/20 flex items-center justify-center gap-2">
            <span className="material-symbols-outlined">print</span>
            Print Invoice
          </button>
          <button className="w-full h-12 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-100 dark:border-gray-700 font-bold rounded-2xl flex items-center justify-center gap-2">
            <span className="material-symbols-outlined">mail</span>
            Email Customer
          </button>
        </div>

        <footer className="text-center px-8">
          <p className="text-xs text-gray-400 italic">Store ID: {order.store_id}</p>
          <p className="text-[10px] text-gray-300 font-bold uppercase tracking-widest mt-1">Sultan Store Management System</p>
        </footer>
      </main>
    </div>
  );
};

export default OrderDetail;
