import React from 'react';
import { ProductItem, Locale } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import { X, Trash2, ShoppingBag, Truck, ArrowRight, ShieldCheck } from 'lucide-react';

interface CartItem {
  product: ProductItem;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQty: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  currentLocale: Locale;
  isWholesaleMode: boolean;
  onCheckoutSuccess: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
  currentLocale,
  isWholesaleMode,
  onCheckoutSuccess
}) => {
  const t = TRANSLATIONS[currentLocale];

  if (!isOpen) return null;

  // Group cart items by merchant to calculate independent shipping sub-totals
  const itemsByMerchant: { [merchantId: string]: { merchantName: string; wilaya: string; items: CartItem[] } } = {};
  
  cart.forEach(item => {
    if (!itemsByMerchant[item.product.merchantId]) {
      itemsByMerchant[item.product.merchantId] = {
        merchantName: item.product.merchantName,
        wilaya: item.product.merchantWilaya,
        items: []
      };
    }
    itemsByMerchant[item.product.merchantId].items.push(item);
  });

  const calculateItemPrice = (item: CartItem) => {
    if (!isWholesaleMode) return item.product.unitRetailPriceDzd;
    // Tiered bulk pricing calculation
    const tiers = [...item.product.bulkPricingTiers].sort((a, b) => b.minQty - a.minQty);
    for (const tier of tiers) {
      if (item.quantity >= tier.minQty) {
        return tier.priceDzd;
      }
    }
    return item.product.unitRetailPriceDzd;
  };

  const totalProductsPrice = cart.reduce((acc, item) => {
    return acc + calculateItemPrice(item) * item.quantity;
  }, 0);

  // 1,500 DZD per merchant origin wilaya shipping fee
  const shippingFees = Object.keys(itemsByMerchant).length * 1500;
  const grandTotal = totalProductsPrice + (cart.length > 0 ? shippingFees : 0);

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/50 backdrop-blur-xs">
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-emerald-700" />
            <h2 className="text-base font-bold text-slate-900">{t.marketplace.cartTitle}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto" />
              <p className="text-sm font-semibold text-slate-700">السلة فارغة حالياً</p>
              <p className="text-xs text-slate-700">تصفح سوق مواد البناء والعتاد وأضف المنتجات لسلتك.</p>
            </div>
          ) : (
            <>
              {/* Grouped by Merchant */}
              {Object.entries(itemsByMerchant).map(([merchantId, group]) => (
                <div key={merchantId} className="border border-slate-200 rounded-xl p-3.5 bg-slate-50/50 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="text-xs font-bold text-slate-800">{group.merchantName}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold">
                      ولاية {group.wilaya} · شحن 1,500 دج
                    </span>
                  </div>

                  <div className="space-y-3">
                    {group.items.map(item => {
                      const unitPrice = calculateItemPrice(item);
                      const isMoqViolated = isWholesaleMode && item.quantity < item.product.moq;

                      return (
                        <div key={item.product.id} className="flex gap-3 items-center justify-between">
                          <img
                            src={item.product.imageUrl}
                            alt={item.product.titleFr}
                            className="w-12 h-12 rounded-lg object-cover border border-slate-200 shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-semibold text-slate-900 truncate">
                              {currentLocale === 'ar' ? item.product.titleAr : item.product.titleFr}
                            </h4>
                            <div className="text-[11px] text-emerald-700 font-mono font-bold">
                              {unitPrice.toLocaleString()} {t.common.dzd} / {t.common.units}
                            </div>
                            {isMoqViolated && (
                              <div className="text-[10px] text-red-600 font-semibold">
                                الحد الأدنى للطلب (MOQ): {item.product.moq} وحدة
                              </div>
                            )}
                          </div>

                          {/* Stepper */}
                          <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-lg p-1 shrink-0">
                            <button
                              onClick={() => onUpdateQty(item.product.id, -1)}
                              className="w-6 h-6 rounded-md hover:bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600 cursor-pointer"
                            >
                              -
                            </button>
                            <span className="w-8 text-center text-xs font-mono font-bold text-slate-900">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQty(item.product.id, 1)}
                              className="w-6 h-6 rounded-md hover:bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600 cursor-pointer"
                            >
                              +
                            </button>
                          </div>

                          <button
                            onClick={() => onRemoveItem(item.product.id)}
                            className="p-1.5 text-slate-400 hover:text-red-600 transition-colors cursor-pointer shrink-0"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        {/* Footer & Checkout */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-slate-200 bg-white space-y-3">
            <div className="space-y-1.5 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>{t.marketplace.subtotal}</span>
                <span className="font-mono font-bold text-slate-900">{totalProductsPrice.toLocaleString()} {t.common.dzd}</span>
              </div>
              <div className="flex justify-between">
                <span>تكلفة الشحن متعدد المستودعات:</span>
                <span className="font-mono text-slate-900">{shippingFees.toLocaleString()} {t.common.dzd}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-slate-900 pt-2 border-t border-slate-100">
                <span>المجموع النهائي:</span>
                <span className="font-mono text-emerald-700 text-base">{grandTotal.toLocaleString()} {t.common.dzd}</span>
              </div>
            </div>

            <button
              onClick={() => {
                onCheckoutSuccess();
                onClearCart();
                onClose();
              }}
              className="w-full py-3 px-4 rounded-xl text-xs font-bold bg-emerald-700 text-white hover:bg-emerald-800 transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{t.marketplace.checkout} (الدفع عند الاستلام COD / تحويل)</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
