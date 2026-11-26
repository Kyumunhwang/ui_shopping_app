import React, { useState } from 'react';
import { Heart, MapPin } from 'lucide-react';

interface TravelPackage {
  id: string;
  tag: string;
  code: string;
  title: string;
  detail: string;
  price: string;
}

const PACKAGES: TravelPackage[] = [
  {
    id: 'jeju',
    tag: '제주 2박',
    code: 'JEJU',
    title: '서귀포 오션뷰 풀빌라 + 렌터카',
    detail: '조식 2인 포함 · 즉시 확정',
    price: '289,000원~',
  },
  {
    id: 'osaka',
    tag: '오사카 3박',
    code: 'OSA',
    title: '난바역 도보 3분 프리미엄 호텔',
    detail: '왕복 항공 포함 · 위탁수하물 15kg',
    price: '459,000원~',
  },
  {
    id: 'busan',
    tag: '부산 1박',
    code: 'PUS',
    title: '해운대 시그니처 스카이 스위트',
    detail: '인피니티풀 무료 · 레이트 체크아웃',
    price: '198,000원~',
  },
];

export const CardDemo: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>('jeju');
  const [likedIds, setLikedIds] = useState<string[]>(['jeju']);

  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between px-1">
        <span className="text-xs font-bold text-[#191F28]">주말 특가 패키지</span>
        <span className="text-[11px] font-semibold text-[#3182F6]">
          찜 {likedIds.length}건
        </span>
      </div>

      {PACKAGES.map((pkg) => {
        const isActive = pkg.id === selectedId;
        const isLiked = likedIds.includes(pkg.id);

        return (
          <div
            key={pkg.id}
            role="button"
            tabIndex={0}
            onClick={() => setSelectedId(pkg.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') setSelectedId(pkg.id);
            }}
            className={`relative flex cursor-pointer items-center gap-3.5 rounded-2xl bg-white p-3.5 transition-all ${
              isActive
                ? 'ring-2 ring-[#3182F6] shadow-[0_10px_28px_rgba(49,130,246,0.16)]'
                : 'shadow-[0_4px_16px_rgba(25,31,40,0.06)] hover:-translate-y-0.5'
            }`}
          >
            <div
              className={`flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-2xl transition-colors ${
                isActive
                  ? 'bg-[#3182F6] text-white'
                  : 'bg-[#E8F3FF] text-[#3182F6]'
              }`}
            >
              <MapPin className="h-4 w-4" />
              <span className="mt-0.5 text-[10px] font-extrabold tracking-wider">
                {pkg.code}
              </span>
            </div>

            <div className="min-w-0 flex-1 pr-6">
              <span className="inline-block text-xs font-extrabold text-[#3182F6]">
                {pkg.tag}
              </span>
              <h4 className="mt-0.5 truncate text-[13px] font-bold text-[#191F28]">
                {pkg.title}
              </h4>
              <p className="mt-0.5 truncate text-[11px] text-[#8B95A1]">
                {pkg.detail}
              </p>
              <p className="mt-1.5 text-[13px] font-extrabold tabular-nums text-[#191F28]">
                {pkg.price}
              </p>
            </div>

            <button
              type="button"
              aria-label="찜하기"
              onClick={(e) => toggleLike(pkg.id, e)}
              className="absolute top-3.5 right-3.5 flex h-7 w-7 items-center justify-center rounded-full bg-[#F2F4F6] transition-transform active:scale-90"
            >
              <Heart
                className={`h-3.5 w-3.5 ${
                  isLiked
                    ? 'fill-[#F04452] text-[#F04452]'
                    : 'text-[#8B95A1]'
                }`}
              />
            </button>
          </div>
        );
      })}
    </div>
  );
};
