
import React from 'react';
import { Screen } from '../types';

interface OrderDetailProps {
  orderId: string | null;
  onBack: () => void;
}

const OrderDetail: React.FC<OrderDetailProps> = ({ orderId, onBack }) => {
  return (
    <div className="flex flex-col h-full">
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-background-dark/80 ios-blur border-b border-gray-100 dark:border-gray-800 px-4 py-3 flex items-center">
        <button onClick={onBack} className="w-10 h-10 flex items-center justify-center rounded-full">
          <span className="material-symbols-outlined">arrow_back_ios</span>
        </button>
        <h2 className="flex-1 text-center font-bold text-lg pr-10">Order {orderId || '#ORD-8829'}</h2>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar pb-10">
        {/* Status Banner */}
        <div className="p-4">
          <div className="bg-primary/10 border border-primary/20 rounded-2xl p-4 flex items-center justify-between shadow-sm">
            <div>
              <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">Current Status</p>
              <p className="text-xl font-bold text-primary">Delivered</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white">
              <span className="material-symbols-outlined">check_circle</span>
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
                <p className="text-lg font-bold">John Doe</p>
                <p className="text-sm text-gray-500 mt-2">johndoe@email.com<br/>+1 234 567 890</p>
              </div>
              <div 
                className="w-20 h-20 rounded-full border-2 border-white shadow-md bg-cover"
                style={{ backgroundImage: `url('https://picsum.photos/seed/customer/200')` }}
              />
            </div>
            <div className="h-px bg-gray-50 dark:bg-gray-700 mx-4" />
            <div className="p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">map</span>
              </div>
              <div>
                <p className="text-sm font-bold">123 Business Way, Suite 100</p>
                <p className="text-xs text-gray-400">Delivery Address • San Francisco, CA</p>
              </div>
            </div>
          </div>
        </section>

        {/* Items */}
        <section className="px-4 mb-6">
          <h3 className="font-bold mb-3">Order Items</h3>
          <div className="space-y-3">
            {[
              { name: 'Premium Wireless Headphones', desc: 'Matte Black • Qty: 1', price: 299.00, img: 'https://picsum.photos/seed/hp/200' },
              { name: 'Leather Carrying Case', desc: 'Tan Brown • Qty: 1', price: 45.00, img: 'https://picsum.photos/seed/case/200' }
            ].map((item) => (
              <div key={item.name} className="bg-white dark:bg-gray-800 p-3 rounded-2xl border border-gray-100 dark:border-gray-700 flex items-center gap-4">
                <div 
                  className="w-16 h-16 rounded-xl bg-gray-50 shrink-0 bg-cover" 
                  style={{ backgroundImage: `url('${item.img}')` }}
                />
                <div className="flex-1">
                  <p className="text-sm font-bold">{item.name}</p>
                  <p className="text-xs text-gray-400">{item.desc}</p>
                </div>
                <p className="font-bold text-sm">${item.price.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section className="px-4 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-4 space-y-3 shadow-sm">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Subtotal</span>
              <span className="font-bold">$344.00</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Shipping (Express)</span>
              <span className="font-bold">$15.00</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Tax</span>
              <span className="font-bold">$28.72</span>
            </div>
            <div className="h-px bg-gray-50 dark:bg-gray-700" />
            <div className="flex justify-between items-center pt-1">
              <span className="font-bold">Grand Total</span>
              <span className="text-2xl font-extrabold text-primary">$387.72</span>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="px-4 mb-10">
          <h3 className="font-bold mb-6">Order Timeline</h3>
          <div className="relative pl-6 space-y-8">
            <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-gray-100 dark:bg-gray-700" />
            {[
              { label: 'Order Placed', time: 'Oct 12, 2023 • 09:41 AM', icon: 'inventory_2' },
              { label: 'Order Processed', time: 'Oct 12, 2023 • 10:15 AM', icon: 'package_2' },
              { label: 'Shipped via FedEx', time: 'Oct 13, 2023 • 02:30 PM', icon: 'local_shipping' },
              { label: 'Delivered', time: 'Oct 14, 2023 • 11:20 AM', icon: 'home' }
            ].map((step, i) => (
              <div key={step.label} className="relative flex items-center gap-4">
                <div className="absolute -left-[19px] w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white ring-4 ring-white dark:ring-background-dark">
                  <span className="material-symbols-outlined text-[12px]">{step.icon}</span>
                </div>
                <div>
                  <p className="text-sm font-bold">{step.label}</p>
                  <p className="text-[10px] text-gray-400 mt-1 uppercase">{step.time}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <footer className="text-center px-8">
          <p className="text-xs text-gray-400 italic">Store: Downtown San Francisco Flagship</p>
          <p className="text-[10px] text-gray-300 font-bold uppercase tracking-widest mt-1">Read-Only Administrative View</p>
        </footer>
      </main>
    </div>
  );
};

export default OrderDetail;
