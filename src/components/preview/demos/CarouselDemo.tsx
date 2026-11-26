import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const SLIDES = [
  {
    id: 0,
    badge: '오늘만 특가',
    title: '가을 아우터 최대 40%',
    desc: '트렌치·블루종 단독 쿠폰팩 증정',
    price: '59,000원~',
  },
  {
    id: 1,
    badge: '브랜드 위크',
    title: '노이즈캔슬링 무선 헤드폰',
    desc: '토스페이 결제 시 15% 즉시할인',
    price: '198,000원',
  },
  {
    id: 2,
    badge: '라이브 단독',
    title: '프리미엄 에스프레소 머신',
    desc: '스페셜티 원두 2팩 사은품 포함',
    price: '329,000원',
  },
  {
    id: 3,
    badge: '신규 런칭',
    title: '스웨이드 미니 크로스백',
    desc: '전 색상 당일 출고 · 무료배송',
    price: '74,000원',
  },
];

const CARD_STEP = 198; // card width (186px) + gap (12px)

export const CarouselDemo: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState<number>(2);

  const goTo = (index: number) => {
    const clamped = Math.max(0, Math.min(SLIDES.length - 1, index));
    setActiveIdx(clamped);
    trackRef.current?.scrollTo({
      left: clamped * CARD_STEP,
      behavior: 'smooth',
    });
  };

  const handleScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const idx = Math.round(el.scrollLeft / CARD_STEP);
    const clamped = Math.max(0, Math.min(SLIDES.length - 1, idx));
    if (clamped !== activeIdx) setActiveIdx(clamped);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="rounded-2xl bg-white p-4 shadow-xs">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-[#191F28]">
              지금 뜨는 기획전
            </span>
            <p className="text-[11px] text-[#8B95A1]">
              좌우로 밀거나 카드를 눌러 탐색하세요
            </p>
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              aria-label="이전 슬라이드"
              onClick={() => goTo(activeIdx - 1)}
              disabled={activeIdx === 0}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F2F4F6] text-[#333D4B] disabled:opacity-35"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="다음 슬라이드"
              onClick={() => goTo(activeIdx + 1)}
              disabled={activeIdx === SLIDES.length - 1}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F2F4F6] text-[#333D4B] disabled:opacity-35"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Pure CSS Snap Carousel */}
        <div
          ref={trackRef}
          onScroll={handleScroll}
          className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1"
        >
          {SLIDES.map((slide, idx) => {
            const isCurrent = idx === activeIdx;
            return (
              <button
                key={slide.id}
                type="button"
                onClick={() => goTo(idx)}
                className={`flex h-48 w-[186px] shrink-0 snap-start flex-col justify-between rounded-2xl p-4 text-left transition-all ${
                  isCurrent
                    ? 'bg-[#3182F6] text-white shadow-md shadow-[#3182F6]/25'
                    : 'bg-[#E8F3FF]/85 text-[#191F28] hover:bg-[#DCEBFF]'
                }`}
              >
                <div>
                  <span
                    className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-bold ${
                      isCurrent
                        ? 'bg-white/20 text-white'
                        : 'bg-white text-[#3182F6]'
                    }`}
                  >
                    {slide.badge}
                  </span>
                  <h4 className="mt-3 text-sm font-extrabold leading-snug">
                    {slide.title}
                  </h4>
                  <p
                    className={`mt-1 text-[11px] leading-relaxed ${
                      isCurrent ? 'text-white/80' : 'text-[#4E5968]'
                    }`}
                  >
                    {slide.desc}
                  </p>
                </div>

                <span className="text-sm font-extrabold tabular-nums">
                  {slide.price}
                </span>
              </button>
            );
          })}
        </div>

        {/* Pagination Dots */}
        <div className="mt-3.5 flex items-center justify-center gap-1.5">
          {SLIDES.map((slide, idx) => (
            <button
              key={slide.id}
              type="button"
              aria-label={`슬라이드 ${idx + 1}로 이동`}
              onClick={() => goTo(idx)}
              className={`h-1.5 rounded-full transition-all duration-200 ${
                idx === activeIdx ? 'w-5 bg-[#3182F6]' : 'w-1.5 bg-[#D1D6DB]'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Active Slide Detail Banner */}
      <div className="rounded-2xl bg-white px-4 py-3 shadow-xs">
        <p className="text-[11px] font-semibold text-[#8B95A1]">
          현재 선택된 기획전 ({activeIdx + 1}/{SLIDES.length})
        </p>
        <p className="mt-0.5 text-xs font-bold text-[#191F28]">
          {SLIDES[activeIdx].title} ·{' '}
          <span className="text-[#3182F6]">{SLIDES[activeIdx].price}</span>
        </p>
      </div>
    </div>
  );
};
