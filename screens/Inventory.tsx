
import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout.tsx';
import { Screen, InventoryItem } from '../types.ts';
import { storeAdminApi } from '../api.ts';
import { useToast } from '../components/Toast.tsx';

interface InventoryProps {
  onNavigate: (screen: Screen, id?: string) => void;
}

const Inventory: React.FC<InventoryProps> = ({ onNavigate }) => {
  const { showToast } = useToast();
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All Items');

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const query = search ? `?search=${search}` : '';
        const res = await storeAdminApi.getProducts(query);
        if (res.success) {
          setItems(res.data);
        }
      } catch (err) {
        console.error('Failed to fetch store inventory', err);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(fetchItems, search ? 300 : 0);
    return () => clearTimeout(debounce);
  }, [search]);

  const filteredItems = items.filter(item => {
    if (filter === 'Low Stock') return item.lowStock || item.stock < 10;
    if (filter === 'Out of Stock') return item.stock === 0;
    return true;
  });

  return (
    <Layout
      activeScreen={Screen.INVENTORY}
      onNavigate={onNavigate}
      title="Inventory Overview"
      rightAction={
        <button
          onClick={() => showToast('Inventory sync completed!', 'success')}
          className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center active:scale-90 transition-transform"
        >
          <span className="material-symbols-outlined text-[20px]">sync</span>
        </button>
      }
    >
      <div className="px-4 py-6">
        <div className="flex gap-3 mb-6">
          <div className="flex-1 bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total SKUs</p>
            <p className="text-2xl font-bold">{items.length}</p>
          </div>
          <div className="flex-1 bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
            <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest mb-1">Low Stock</p>
            <p className="text-2xl font-bold">{items.filter(i => (i.lowStock || i.stock < 10)).length}</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">search</span>
          <input
            type="text"
            placeholder="Search by name or SKU"
            className="w-full h-12 bg-gray-100 dark:bg-gray-800 border-none rounded-2xl pl-12 pr-4 focus:ring-primary focus:bg-white transition-all outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-8 overflow-x-auto no-scrollbar">
          {['All Items', 'Low Stock', 'Out of Stock'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-colors whitespace-nowrap ${filter === f ? 'bg-primary text-white shadow-sm' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'}`}
            >
              {f}
            </button>
          ))}
        </div>

        <h3 className="text-xs font-extrabold text-gray-400 uppercase tracking-widest mb-4">Product Catalog</h3>
        {loading ? (
          <div className="flex justify-center p-12">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="space-y-3 pb-8">
            {filteredItems.length === 0 ? (
              <div className="text-center p-12 text-gray-400">
                No products found
              </div>
            ) : (
              filteredItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(Screen.INVENTORY_DETAIL, item.id)}
                  className="w-full p-3 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 flex items-center gap-4 shadow-sm active:scale-[0.98] transition-all hover:border-primary/30"
                >
                  <div
                    className="w-16 h-16 rounded-xl bg-gray-50 bg-cover shrink-0 bg-center"
                    style={{ backgroundImage: `url('${item.image || item.imageUrl || 'https://picsum.photos/seed/product/200'}')` }}
                  />
                  <div className="flex-1 text-left min-w-0">
                    <p className="text-sm font-extrabold truncate text-gray-900 dark:text-white">{item.name}</p>
                    <p className="text-xs text-gray-400 font-bold mb-1">SKU: {item.sku || 'N/A'}</p>
                    {(item.lowStock || item.stock < 10) && (
                      <span className="inline-block px-2 py-0.5 bg-red-100 text-red-600 text-[10px] font-black rounded-full uppercase">Low Stock</span>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">In Stock</p>
                    <p className={`text-xl font-black ${(item.lowStock || item.stock < 10) ? 'text-red-600' : 'text-primary'}`}>{item.stock}</p>
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

export default Inventory;
