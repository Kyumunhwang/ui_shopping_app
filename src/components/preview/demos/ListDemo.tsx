import React, { useState } from 'react';
import { Check, Minus, Plus } from 'lucide-react';

interface ProductItem {
  id: number;
  name: string;
  meta: string;
  price: number;
  badge?: string;
}

const INITIAL_PRODUCTS: ProductItem[] = [
  { id: 1, name: '제주 삼다수 무라벨 2L 6입', meta: '내일(목) 새벽 도착 보장', price: 12900 },
  { id: 2, name: '유기농 아기 보리차 500ml', meta: '오늘 출발 · 무료배송', price: 8500, badge: '인기' },
  { id: 3, name: '프리미엄 3겹 천연펄프 롤휴지', meta: '30m × 24롤 · 단독특가', price: 23000 },
  { id: 4, name: '국산 무농약 친환경 콩나물 300g', meta: '신선 냉장 · 당일 수확', price: 5900 },
];

export const ListDemo: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number>(2);
  const [quantities, setQuantities] = useState<Record<number, number>>({
    1: 1,
    2: 2,
    3: 1,
    4: 1,
  });

  const adjustQty = (id: number, delta: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, Math.min(9, (prev[id] ?? 1) + delta)),
    }));
  };

  const selectedItem = INITIAL_PRODUCTS.find((p) => p.id === selectedId) ?? INITIAL_PRODUCTS[0];
  const selectedTotal = selectedItem.price * (quantities[selectedItem.id] ?? 1);

  return (
    <div className="flex flex-col gap-3">
      <div className="rounded-2xl bg-white p-3.5 shadow-xs">
        <div className="mb-2.5 flex items-center justify-between px-1">
          <span className="text-xs font-bold text-[#191F28]">오늘의 장보기 베스트</span>
          <span className="text-[11px] font-medium text-[#8B95A1]">4개 상품</span>
        </div>

        <ul className="divide-y divide-[#F2F4F6]">
          {INITIAL_PRODUCTS.map((item) => {
            const isSelected = item.id === selectedId;
            const qty = quantities[item.id] ?? 1;
            return (
              <li key={item.id}>
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelectedId(item.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') setSelectedId(item.id);
                  }}
                  className={`flex cursor-pointer items-center gap-3 rounded-xl px-2 py-3 transition-colors ${
                    isSelected ? 'bg-[#F2F7FF]' : 'hover:bg-[#F9FAFB]'
                  }`}
                >
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors ${
                      isSelected
                        ? 'bg-[#3182F6] text-white shadow-sm shadow-[#3182F6]/30'
                        : 'bg-[#E8F3FF] text-[#3182F6]'
                    }`}
                  >
                    {isSelected ? (
                      <Check className="h-5 w-5 stroke-[2.5]" />
                    ) : (
                      <span className="text-[11px] font-bold">0{item.id}</span>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <p className="truncate text-[13px] font-bold text-[#191F28]">
                        {item.name}
                      </p>
                      {item.badge && (
                        <span className="shrink-0 rounded bg-[#E8F3FF] px-1.5 py-0.5 text-[9px] font-bold text-[#3182F6]">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 truncate text-[11px] text-[#8B95A1]">
                      {item.meta}
                    </p>
                    <div className="mt-1.5 flex items-center gap-1.5">
                      <button
                        type="button"
                        aria-label="수량 감소"
                        onClick={(e) => adjustQty(item.id, -1, e)}
                        className="flex h-5 w-5 items-center justify-center rounded-md bg-[#F2F4F6] text-[#4E5968] hover:bg-[#E5E8EB]"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-4 text-center text-[11px] font-bold tabular-nums text-[#191F28]">
                        {qty}
                      </span>
                      <button
                        type="button"
                        aria-label="수량 증가"
                        onClick={(e) => adjustQty(item.id, 1, e)}
                        className="flex h-5 w-5 items-center justify-center rounded-md bg-[#F2F4F6] text-[#4E5968] hover:bg-[#E5E8EB]"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>

                  <span className="shrink-0 text-[13px] font-extrabold tabular-nums text-[#191F28]">
                    {(item.price * qty).toLocaleString('ko-KR')}원
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Selected Summary Bar */}
      <div className="flex items-center justify-between rounded-2xl bg-[#3182F6] px-4 py-3 text-white shadow-md shadow-[#3182F6]/20">
        <div className="min-w-0">
          <p className="truncate text-[11px] font-medium text-white/80">
            선택됨 · {selectedItem.name}
          </p>
          <p className="text-sm font-extrabold tabular-nums">
            총 {selectedTotal.toLocaleString('ko-KR')}원
          </p>
        </div>
        <span className="shrink-0 rounded-xl bg-white px-3 py-1.5 text-xs font-bold text-[#3182F6]">
          바로 구매
        </span>
      </div>
    </div>
  );
};
