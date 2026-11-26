import React, { useEffect, useRef, useState } from 'react';
import { CheckCircle2, RefreshCw } from 'lucide-react';

interface FeedProduct {
  id: number;
  title: string;
  category: string;
  price: number;
}

const SAMPLE_TITLES = [
  '코튼 옥스포드 릴렉스 셔츠',
  '세라믹 머그컵 2인 세트',
  '마카다미아 다크 초콜릿',
  '초경량 접이식 미니 양우산',
  '고탄력 메모리폼 경추 베개',
  '프리미엄 메리노 울 양말',
];

const createBatch = (startId: number, count: number): FeedProduct[] =>
  Array.from({ length: count }, (_, idx) => {
    const id = startId + idx;
    return {
      id,
      title: `${SAMPLE_TITLES[(id - 1) % SAMPLE_TITLES.length]} #${id}`,
      category: id % 2 === 0 ? '오늘 출발' : '무료배송',
      price: 12900 + (id % 6) * 4500,
    };
  });

const MAX_ITEMS = 22;

export const InfiniteScrollDemo: React.FC = () => {
  const [items, setItems] = useState<FeedProduct[]>(() => createBatch(1, 6));
  const [loading, setLoading] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const loadMore = () => {
    if (loading || items.length >= MAX_ITEMS) return;
    setLoading(true);
    window.setTimeout(() => {
      setItems((prev) => {
        const remaining = MAX_ITEMS - prev.length;
        if (remaining <= 0) return prev;
        return [...prev, ...createBatch(prev.length + 1, Math.min(4, remaining))];
      });
      setLoading(false);
    }, 650);
  };

  useEffect(() => {
    const root = containerRef.current;
    const target = sentinelRef.current;
    if (!root || !target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { root, threshold: 0.25 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  });

  const handleReset = () => {
    setItems(createBatch(1, 6));
    setLoading(false);
    containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center justify-between rounded-2xl bg-white px-4 py-2.5 shadow-xs">
        <span className="text-xs font-bold text-[#191F28]">
          실시간 추천 피드{' '}
          <span className="text-[#3182F6] tabular-nums">
            ({items.length}/{MAX_ITEMS})
          </span>
        </span>
        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center gap-1 rounded-lg bg-[#F2F4F6] px-2 py-1 text-[11px] font-semibold text-[#4E5968] hover:bg-[#E5E8EB]"
        >
          <RefreshCw className="h-3 w-3" />
          처음으로
        </button>
      </div>

      {/* Scrollable Viewport */}
      <div
        ref={containerRef}
        className="toss-scroll h-[385px] overflow-y-auto rounded-2xl bg-white p-3 shadow-xs"
      >
        <ul className="divide-y divide-[#F2F4F6]">
          {items.map((item) => (
            <li key={item.id} className="flex items-center gap-3 py-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E8F3FF] text-[11px] font-extrabold text-[#3182F6]">
                {String(item.id).padStart(2, '0')}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-bold text-[#191F28]">
                  {item.title}
                </p>
                <p className="text-[11px] text-[#8B95A1]">{item.category}</p>
              </div>
              <span className="shrink-0 text-xs font-extrabold tabular-nums text-[#191F28]">
                {item.price.toLocaleString('ko-KR')}원
              </span>
            </li>
          ))}
        </ul>

        {/* Sentinel Loader */}
        <div
          ref={sentinelRef}
          className="flex flex-col items-center justify-center gap-2 py-4"
        >
          {loading ? (
            <>
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#E5E8EB] border-t-[#3182F6]" />
              <span className="text-[11px] font-medium text-[#3182F6]">
                추천 상품을 불러오는 중...
              </span>
            </>
          ) : items.length >= MAX_ITEMS ? (
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#8B95A1]">
              <CheckCircle2 className="h-3.5 w-3.5 text-[#3182F6]" />
              모든 신상품을 확인했습니다
            </div>
          ) : (
            <button
              type="button"
              onClick={loadMore}
              className="rounded-full bg-[#E8F3FF] px-3 py-1 text-[11px] font-bold text-[#3182F6] hover:bg-[#DCEBFF]"
            >
              스크롤하거나 눌러서 더 보기
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
