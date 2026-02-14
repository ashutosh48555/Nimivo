import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

export default function CartDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const clearCart = useCartStore((s) => s.clearCart);
  const totalPrice = useCartStore((s) => s.totalPrice);
  const totalItems = useCartStore((s) => s.totalItems);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    if (open) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const count = totalItems();

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-xl hover:bg-slate-100 transition-colors"
        aria-label="Cart"
      >
        <ShoppingCart className="w-5 h-5 text-slate-600" />
        {count > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-fp-orange-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm animate-bounce">
            {count}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-[340px] bg-white rounded-2xl shadow-2xl border border-slate-100 z-[60] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-800">
              My Cart {count > 0 && <span className="text-slate-400">({count})</span>}
            </h3>
            {items.length > 0 && (
              <button
                onClick={clearCart}
                className="text-[10px] font-semibold text-slate-400 hover:text-red-500 transition-colors uppercase tracking-wider"
              >
                Clear All
              </button>
            )}
          </div>

          {/* Items */}
          {items.length === 0 ? (
            <div className="px-4 py-10 text-center">
              <ShoppingCart className="w-10 h-10 text-slate-200 mx-auto mb-2" />
              <p className="text-sm text-slate-500">Your cart is empty</p>
              <p className="text-xs text-slate-400 mt-1">Browse services and add them here</p>
            </div>
          ) : (
            <>
              <div className="max-h-[280px] overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 px-4 py-3 border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-slate-800 truncate">{item.name}</p>
                      <p className="text-xs font-bold text-fp-blue-700">₹{item.price}</p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 rounded-md bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
                      >
                        <Minus className="w-3 h-3 text-slate-600" />
                      </button>
                      <span className="text-xs font-bold text-slate-700 w-5 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 rounded-md bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
                      >
                        <Plus className="w-3 h-3 text-slate-600" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-1 text-slate-300 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="px-4 py-3 bg-slate-50 border-t border-slate-100">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-slate-500">Total</span>
                  <span className="text-lg font-extrabold text-slate-900">₹{totalPrice().toLocaleString('en-IN')}</span>
                </div>
                <Link
                  to="/book"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-2.5 bg-fp-blue-700 hover:bg-fp-blue-800 text-white text-sm font-semibold rounded-xl transition-colors"
                >
                  Proceed to Book <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
