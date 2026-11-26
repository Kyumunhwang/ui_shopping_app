import React, { useState } from 'react';
import { Heart } from 'lucide-react';

interface CurationCard {
  id: number;
  category: '패션' | '리빙';
  tag: string;
  title: string;
  price: string;
  heightClass: string;
}

const CURATION_ITEMS: CurationCard[] = [
  {
    id: 1,
    category: '패션',
    tag: '오피스룩',
    title: '미니멀 울 블렌드 자켓 코디',
    price: '128,000원',
    heightClass: 'h-44',
  },
  {
    id: 2,
    category: '리빙',
    tag: '홈카페',
    title: '핸드메이드 세라믹 화병',
    price: '34,000원',
    heightClass: 'h-32',
  },
  {
    id: 3,
    category: '리빙',
    tag: '패브릭',
    title: '프렌치 린넨 쉬폰 커튼',
    price: '62,000원',
    heightClass: 'h-32',
  },
  {
    id: 4,
    category: '패션',
    tag: 'MD 추천',
    title: '오늘의 베스트 캐시미어 세트',
    price: '89,000원',
    heightClass: 'h-44',
  },
  {
    id: 5,
    category: '패션',
    tag: '데일리',
    title: '소프트 레더 숄더백',
    price: '76,000원',
    heightClass: 'h-36',
  },
  {
    id: 6,
    category: '리빙',
    tag: '조명',
    title: '포터블 무드 테이블 램프',
    price: '48,000원',
    heightClass: 'h-40',
  },
];

export const MasonryDemo: React.FC = () => {
  const [filter, setFilter] = useState<'전체' | '패션' | '리빙'>('전체');
  const [activeId, setActiveId] = useState<number>(4);
  const [savedIds, setSavedIds] = useState<number[]>([4]);

  const filtered =
    filter === '전체'
      ? CURATION_ITEMS
      : CURATION_ITEMS.filter((item) => item.category === filter);

  const leftCol = filtered.filter((_, idx) => idx % 2 === 0);
  const rightCol = filtered.filter((_, idx) => idx % 2 === 1);

  const toggleSave = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const renderTile = (item: CurationCard) => {
    const isActive = item.id === activeId;
    const isSaved = savedIds.includes(item.id);

    return (
      <div
        key={item.id}
        role="button"
        tabIndex={0}
        onClick={() => setActiveId(item.id)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') setActiveId(item.id);
        }}
        className={`relative flex cursor-pointer flex-col justify-between rounded-2xl p-3.5 transition-all ${item.heightClass} ${
          isActive
            ? 'bg-[#3182F6] text-white shadow-md shadow-[#3182F6]/25'
            : 'bg-[#E8F3FF]/80 text-[#191F28] hover:bg-[#DCEBFF]'
        }`}
      >
        <div className="flex items-start justify-between gap-1">
          <span
            className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
              isActive
                ? 'bg-white/20 text-white'
                : 'bg-white text-[#3182F6]'
            }`}
          >
            {item.tag}
          </span>
          <button
            type="button"
            aria-label="저장"
            onClick={(e) => toggleSave(item.id, e)}
            className={`flex h-6 w-6 items-center justify-center rounded-full transition-transform active:scale-90 ${
              isActive ? 'bg-white/20' : 'bg-white/80'
            }`}
          >
            <Heart
              className={`h-3 w-3 ${
                isSaved
                  ? isActive
                    ? 'fill-white text-white'
                    : 'fill-[#F04452] text-[#F04452]'
                  : isActive
                    ? 'text-white/80'
                    : 'text-[#8B95A1]'
              }`}
            />
          </button>
        </div>

        <div>
          <p className="text-xs font-extrabold leading-snug">{item.title}</p>
          <p
            className={`mt-1 text-xs font-bold tabular-nums ${
              isActive ? 'text-white/90' : 'text-[#4E5968]'
            }`}
          >
            {item.price}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Filter Pills */}
      <div className="flex items-center justify-between rounded-2xl bg-white px-3.5 py-2.5 shadow-xs">
        <div className="flex items-center gap-1.5">
          {(['전체', '패션', '리빙'] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setFilter(tab)}
              className={`rounded-full px-3 py-1 text-xs font-bold transition-colors ${
                filter === tab
                  ? 'bg-[#3182F6] text-white'
                  : 'bg-[#F2F4F6] text-[#4E5968] hover:bg-[#E5E8EB]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <span className="text-[11px] font-semibold text-[#8B95A1]">
          저장 {savedIds.length}
        </span>
      </div>

      {/* 2-Column Staggered Masonry */}
      <div className="grid grid-cols-2 items-start gap-2.5 rounded-2xl bg-white p-3 shadow-xs">
        <div className="flex flex-col gap-2.5">{leftCol.map(renderTile)}</div>
        <div className="flex flex-col gap-2.5">{rightCol.map(renderTile)}</div>
      </div>
    </div>
  );
};
