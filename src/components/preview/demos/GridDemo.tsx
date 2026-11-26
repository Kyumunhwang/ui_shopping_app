import React, { useState } from 'react';
import {
  Shirt,
  Sparkles,
  Lamp,
  Apple,
  Smartphone,
  Plane,
} from 'lucide-react';

interface CategoryTile {
  id: string;
  label: string;
  count: number;
  icon: React.FC<{ className?: string }>;
  picks: { name: string; price: string }[];
}

const CATEGORIES: CategoryTile[] = [
  {
    id: 'fashion',
    label: '패션의류',
    count: 1240,
    icon: Shirt,
    picks: [
      { name: '캐시미어 블렌드 니트', price: '49,900원' },
      { name: '와이드 코튼 팬츠', price: '38,000원' },
    ],
  },
  {
    id: 'beauty',
    label: '뷰티',
    count: 860,
    icon: Sparkles,
    picks: [
      { name: '시카 수분 진정 크림', price: '24,500원' },
      { name: '저자극 약산성 클렌저', price: '15,900원' },
    ],
  },
  {
    id: 'living',
    label: '리빙홈',
    count: 540,
    icon: Lamp,
    picks: [
      { name: '무선 포터블 단스탠드', price: '32,000원' },
      { name: '호텔식 60수 면 베개커버', price: '14,000원' },
    ],
  },
  {
    id: 'food',
    label: '신선식품',
    count: 920,
    icon: Apple,
    picks: [
      { name: '청송 고당도 부사 사과 2kg', price: '19,800원' },
      { name: '무항생제 특란 30구', price: '8,900원' },
    ],
  },
  {
    id: 'digital',
    label: '디지털',
    count: 410,
    icon: Smartphone,
    picks: [
      { name: '노이즈캔슬링 무선 이어폰', price: '149,000원' },
      { name: '65W GaN 멀티 고속충전기', price: '29,900원' },
    ],
  },
  {
    id: 'travel',
    label: '여행티켓',
    count: 195,
    icon: Plane,
    picks: [
      { name: '제주 렌터카 48시간 이용권', price: '54,000원' },
      { name: '오사카 주유패스 2일권', price: '36,500원' },
    ],
  },
];

export const GridDemo: React.FC = () => {
  const [activeId, setActiveId] = useState<string>('digital');
  const activeCategory =
    CATEGORIES.find((cat) => cat.id === activeId) ?? CATEGORIES[4];

  return (
    <div className="flex flex-col gap-3">
      <div className="rounded-2xl bg-white p-4 shadow-xs">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-xs font-bold text-[#191F28]">카테고리 바로가기</span>
          <span className="text-[11px] font-semibold text-[#3182F6]">
            {activeCategory.label} 선택됨
          </span>
        </div>

        {/* 3x2 Grid matching reference */}
        <div className="grid grid-cols-3 gap-2.5">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = cat.id === activeId;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveId(cat.id)}
                className={`flex aspect-square flex-col items-center justify-center gap-1.5 rounded-2xl p-2 transition-all active:scale-95 ${
                  isActive
                    ? 'bg-[#3182F6] text-white shadow-md shadow-[#3182F6]/30'
                    : 'bg-[#E8F3FF]/80 text-[#191F28] hover:bg-[#DCEBFF]'
                }`}
              >
                <Icon
                  className={`h-5 w-5 ${
                    isActive ? 'text-white' : 'text-[#3182F6]'
                  }`}
                />
                <span className="text-xs font-bold">{cat.label}</span>
                <span
                  className={`text-[10px] font-medium tabular-nums ${
                    isActive ? 'text-white/80' : 'text-[#6B7684]'
                  }`}
                >
                  {cat.count.toLocaleString()}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Filtered Category Preview */}
      <div className="rounded-2xl bg-white p-3.5 shadow-xs">
        <p className="mb-2 text-[11px] font-bold text-[#8B95A1]">
          {activeCategory.label} 추천 상품
        </p>
        <div className="space-y-2">
          {activeCategory.picks.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between rounded-xl bg-[#F9FAFB] px-3 py-2.5"
            >
              <span className="text-xs font-semibold text-[#191F28]">
                {item.name}
              </span>
              <span className="text-xs font-extrabold tabular-nums text-[#3182F6]">
                {item.price}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
