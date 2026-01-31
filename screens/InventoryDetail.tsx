
import React, { useEffect, useState } from 'react';
import { storeAdminApi } from '../api.ts';

interface InventoryDetailProps {
  itemId: string | null;
  onBack: () => void;
}

const InventoryDetail: React.FC<InventoryDetailProps> = ({ itemId, onBack }) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!itemId) return;

    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await storeAdminApi.getProduct(itemId);
        if (res.success) {
          setData(res.data);
        }
      } catch (err) {
        console.error('Failed to fetch product detail', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [itemId]);

  if (loading) {
    return (
      <div className="flex flex-col h-full bg-white dark:bg-background-dark">
        <header className="sticky top-0 z-50 bg-white/80 dark:bg-background-dark/80 ios-blur border-b border-gray-100 dark:border-gray-800 px-4 py-3 flex items-center">
          <button onClick={onBack} className="w-10 h-10 flex items-center justify-center rounded-full">
            <span className="material-symbols-outlined">arrow_back_ios</span>
          </button>
          <h2 className="flex-1 text-center font-bold text-lg pr-10">Product Detail</h2>
        </header>
        <div className="flex-1 flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  const product = data || {};
  const inventory = data?.inventory || [];

  return (
    <div className="flex flex-col h-full bg-background-light dark:bg-background-dark overflow-y-auto">
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-background-dark/80 ios-blur border-b border-gray-100 dark:border-gray-800 px-4 py-3 flex items-center">
        <button onClick={onBack} className="w-10 h-10 flex items-center justify-center rounded-full">
          <span className="material-symbols-outlined">arrow_back_ios</span>
        </button>
        <h2 className="flex-1 text-center font-bold text-lg pr-10 truncate">{product.name}</h2>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar pb-10">
        <div className="p-4">
          <div
            className="w-full aspect-square bg-white dark:bg-gray-800 rounded-2xl shadow-sm bg-cover mb-[-40px] relative z-0 bg-center"
            style={{ backgroundImage: `url('${product.image || product.imageUrl || 'https://picsum.photos/seed/detail/600'}')` }}
          />
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-t-[40px] pt-8 px-6 relative z-10 shadow-[0_-10px_30px_rgba(0,0,0,0.05)] border-b border-gray-50 dark:border-gray-800">
          <div className="text-center pb-6">
            <span className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-4">SKU: {product.sku || 'N/A'}</span>
            <h1 className="text-4xl font-black mb-2 text-gray-900 dark:text-white">{product.stock || 0} Units</h1>
            <div className="flex items-center justify-center gap-2 text-gray-400 text-sm font-bold">
              <span className="material-symbols-outlined text-[16px]">sync</span>
              Current Stock • Last updated {new Date().toLocaleTimeString()}
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg text-gray-900 dark:text-white">Inventory Breakdown</h3>
            <span className="text-[10px] font-bold text-gray-400 uppercase">Per Store</span>
          </div>

          <div className="space-y-4">
            {inventory.length === 0 ? (
              <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 italic text-gray-400">
                No store inventory data
              </div>
            ) : (
              inventory.map((entry: any, i: number) => (
                <div key={i} className="flex items-center gap-4 bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-primary/10 text-primary`}>
                    <span className="material-symbols-outlined">storefront</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-gray-900 dark:text-white truncate pr-2">{entry.store_name}</span>
                      <span className="font-black text-primary whitespace-nowrap">{entry.stock} Units</span>
                    </div>
                    <p className="text-sm text-gray-500 font-medium">{entry.location || 'Local Store'}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default InventoryDetail;
