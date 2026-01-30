
import React from 'react';
import Layout from '../components/Layout';
import { Screen, InventoryItem } from '../types';

interface InventoryProps {
  onNavigate: (screen: Screen, id?: string) => void;
}

const Inventory: React.FC<InventoryProps> = ({ onNavigate }) => {
  const mockItems: InventoryItem[] = [
    { id: '1', sku: '88231-M', name: 'Organic Whole Milk 1L', image: 'https://picsum.photos/seed/milk/200', stock: 12, lowStock: true },
    { id: '2', sku: '11092-B', name: 'Whole Wheat Sourdough', image: 'https://picsum.photos/seed/bread/200', stock: 156 },
    { id: '3', sku: '44231-S', name: 'Garden Fresh Salad Bowl', image: 'https://picsum.photos/seed/salad/200', stock: 42 },
    { id: '4', sku: '99012-W', name: 'Classic Quartz Watch', image: 'https://picsum.photos/seed/watch/200', stock: 3, lowStock: true },
    { id: '5', sku: '22019-C', name: 'Retro Instant Camera', image: 'https://picsum.photos/seed/camera/200', stock: 88 },
  ];

  return (
    <Layout 
      activeScreen={Screen.INVENTORY} 
      onNavigate={onNavigate}
      title="Inventory Overview"
      rightAction={
        <button className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
          <span className="material-symbols-outlined text-[20px]">sync</span>
        </button>
      }
    >
      <div className="px-4 py-6">
        <div className="flex gap-3 mb-6">
          <div className="flex-1 bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total SKUs</p>
            <p className="text-2xl font-bold">1,240</p>
          </div>
          <div className="flex-1 bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
            <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest mb-1">Low Stock</p>
            <p className="text-2xl font-bold">12</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">search</span>
          <input 
            type="text" 
            placeholder="Search by name or SKU" 
            className="w-full h-12 bg-gray-100 dark:bg-gray-800 border-none rounded-2xl pl-12 pr-4 focus:ring-primary focus:bg-white transition-all"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-8">
          {['All Items', 'Low Stock', 'Out of Stock'].map((f, i) => (
            <button key={f} className={`px-5 py-2 rounded-full text-xs font-bold ${i === 0 ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-800'}`}>
              {f}
            </button>
          ))}
        </div>

        <h3 className="text-xs font-extrabold text-gray-400 uppercase tracking-widest mb-4">Product Catalog</h3>
        <div className="space-y-3">
          {mockItems.map((item) => (
            <button 
              key={item.id}
              onClick={() => onNavigate(Screen.INVENTORY_DETAIL, item.id)}
              className="w-full p-3 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 flex items-center gap-4 shadow-sm active:scale-[0.98] transition-all"
            >
              <div 
                className="w-16 h-16 rounded-xl bg-gray-50 bg-cover shrink-0" 
                style={{ backgroundImage: `url('${item.image}')` }}
              />
              <div className="flex-1 text-left min-w-0">
                <p className="text-sm font-extrabold truncate">{item.name}</p>
                <p className="text-xs text-gray-400 font-bold mb-1">SKU: {item.sku}</p>
                {item.lowStock && (
                  <span className="inline-block px-2 py-0.5 bg-red-100 text-red-600 text-[10px] font-black rounded-full uppercase">Low Stock</span>
                )}
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold text-gray-400">In Stock</p>
                <p className={`text-xl font-black ${item.lowStock ? 'text-red-600' : 'text-primary'}`}>{item.stock}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Inventory;
