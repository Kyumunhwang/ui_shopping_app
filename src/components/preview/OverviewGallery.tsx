import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { ShopPatternId, ShopPatternMeta } from '../../types/pattern';

interface OverviewGalleryProps {
  patterns: ShopPatternMeta[];
  onSelectPattern: (id: ShopPatternId) => void;
}

const ThumbnailWireframe: React.FC<{ id: ShopPatternId }> = ({ id }) => {
  switch (id) {
    case 'list':
      return (
        <div className="flex h-full flex-col justify-between gap-1.5 p-2.5">
          {[
            { price: '12,900원', active: false },
            { price: '8,500원', active: true },
            { price: '23,000원', active: false },
            { price: '5,900원', active: false },
          ].map((row, idx) => (
            <div
              key={idx}
              className={`flex items-center gap-2 rounded-lg px-2 py-1 ${
                row.active ? 'bg-[#E8F3FF]/70' : ''
              }`}
            >
              <div
                className={`h-5 w-5 shrink-0 rounded-md ${
                  row.active ? 'bg-[#3182F6]' : 'bg-[#DCE8FA]'
                }`}
              />
              <div className="flex-1 space-y-1">
                <div className="h-1.5 w-3/4 rounded-full bg-[#333D4B]" />
                <div className="h-1 w-1/2 rounded-full bg-[#D1D6DB]" />
              </div>
              <span className="text-[8.5px] font-bold tabular-nums text-[#333D4B]">
                {row.price}
              </span>
            </div>
          ))}
        </div>
      );

    case 'grid':
      return (
        <div className="grid h-full grid-cols-3 gap-2 p-3">
          {[0, 1, 2, 3, 4, 5].map((cell) => (
            <div
              key={cell}
              className={`rounded-xl ${
                cell === 4
                  ? 'bg-[#3182F6] shadow-sm shadow-[#3182F6]/30'
                  : 'bg-[#DCE8FA]/80'
              }`}
            />
          ))}
        </div>
      );

    case 'card':
      return (
        <div className="flex h-full flex-col justify-center gap-2.5 bg-[#F2F4F6]/70 p-3">
          <div className="flex items-center gap-2.5 rounded-xl bg-white p-2 shadow-sm">
            <div className="h-10 w-10 shrink-0 rounded-lg bg-[#3182F6]" />
            <div className="flex-1 space-y-1.5">
              <div className="h-1.5 w-4/5 rounded-full bg-[#333D4B]" />
              <div className="h-1 w-3/5 rounded-full bg-[#D1D6DB]" />
              <span className="block text-[8.5px] font-bold text-[#3182F6]">
                제주 2박
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2.5 rounded-xl bg-white p-2 shadow-sm">
            <div className="h-10 w-10 shrink-0 rounded-lg bg-[#DCE8FA]" />
            <div className="flex-1 space-y-1.5">
              <div className="h-1.5 w-4/5 rounded-full bg-[#333D4B]" />
              <div className="h-1 w-3/5 rounded-full bg-[#D1D6DB]" />
              <span className="block text-[8.5px] font-bold text-[#3182F6]">
                오사카 3박
              </span>
            </div>
          </div>
        </div>
      );

    case 'carousel':
      return (
        <div className="flex h-full flex-col justify-between p-3">
          <div className="flex flex-1 items-stretch gap-2 overflow-hidden pt-1">
            <div className="w-2/5 shrink-0 rounded-xl bg-[#DCE8FA]" />
            <div className="w-2/5 shrink-0 rounded-xl bg-[#DCE8FA]" />
            <div className="w-1/4 shrink-0 rounded-xl bg-[#3182F6]" />
          </div>
          <div className="mt-2.5 flex items-center justify-center gap-1">
            <span className="h-1 w-1 rounded-full bg-[#D1D6DB]" />
            <span className="h-1 w-1 rounded-full bg-[#D1D6DB]" />
            <span className="h-1 w-3 rounded-full bg-[#3182F6]" />
          </div>
        </div>
      );

    case 'table':
      return (
        <div className="flex h-full flex-col justify-between overflow-hidden rounded-xl border border-[#F2F4F6] text-[9px]">
          <div className="grid grid-cols-3 bg-[#F2F4F6] px-2.5 py-1.5 font-semibold text-[#6B7684]">
            <span>상품</span>
            <span className="text-center">수량</span>
            <span className="text-right">금액</span>
          </div>
          {[
            { name: '니트', qty: '1', price: '39,000', active: false },
            { name: '머그', qty: '2', price: '24,000', active: false },
            { name: '양말', qty: '3', price: '9,000', active: true },
          ].map((row) => (
            <div
              key={row.name}
              className={`grid grid-cols-3 px-2.5 py-2 tabular-nums ${
                row.active
                  ? 'bg-[#E8F3FF] font-bold text-[#191F28]'
                  : 'text-[#333D4B]'
              }`}
            >
              <span>{row.name}</span>
              <span className="text-center">{row.qty}</span>
              <span className="text-right font-semibold">{row.price}</span>
            </div>
          ))}
        </div>
      );

    case 'timeline':
      return (
        <div className="flex h-full flex-col justify-center px-5 py-3">
          {[
            { label: '주문 완료', done: true },
            { label: '상품 준비', done: true },
            { label: '배송 중', done: true },
            { label: '도착', done: false },
          ].map((step, idx, arr) => (
            <div key={step.label} className="flex items-stretch gap-2.5">
              <div className="flex flex-col items-center">
                <span
                  className={`h-2 w-2 rounded-full ${
                    step.done ? 'bg-[#3182F6]' : 'bg-[#D1D6DB]'
                  }`}
                />
                {idx < arr.length - 1 && (
                  <span
                    className={`w-0.5 flex-1 min-h-4 ${
                      idx < 2 ? 'bg-[#3182F6]' : 'bg-[#E5E8EB]'
                    }`}
                  />
                )}
              </div>
              <span
                className={`-mt-0.5 pb-3 text-[9.5px] font-semibold ${
                  step.done ? 'text-[#191F28]' : 'text-[#8B95A1]'
                }`}
              >
                {step.label}
              </span>
            </div>
          ))}
        </div>
      );

    case 'accordion':
      return (
        <div className="flex h-full flex-col justify-center gap-1.5 p-3">
          <div className="flex items-center justify-between rounded-lg bg-[#F2F4F6] px-2.5 py-1.5 text-[9px] font-semibold text-[#333D4B]">
            <span>배송 안내</span>
            <span>⌄</span>
          </div>
          <div className="rounded-lg border border-[#DCE8FA] bg-white">
            <div className="flex items-center justify-between bg-[#E8F3FF] px-2.5 py-1.5 text-[9px] font-bold text-[#1B64DA]">
              <span>교환, 반품</span>
              <span>⌃</span>
            </div>
            <div className="space-y-1 p-2">
              <div className="h-1 w-full rounded-full bg-[#D1D6DB]" />
              <div className="h-1 w-2/3 rounded-full bg-[#E5E8EB]" />
            </div>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-[#F2F4F6] px-2.5 py-1.5 text-[9px] font-semibold text-[#333D4B]">
            <span>결제 수단</span>
            <span>⌄</span>
          </div>
        </div>
      );

    case 'masonry':
      return (
        <div className="grid h-full grid-cols-2 items-start gap-2 p-3">
          <div className="flex flex-col gap-2">
            <div className="h-20 rounded-xl bg-[#DCE8FA]" />
            <div className="h-12 rounded-xl bg-[#DCE8FA]" />
          </div>
          <div className="flex flex-col gap-2">
            <div className="h-12 rounded-xl bg-[#DCE8FA]" />
            <div className="h-20 rounded-xl bg-[#3182F6] shadow-sm shadow-[#3182F6]/30" />
          </div>
        </div>
      );

    case 'infinite-scroll':
      return (
        <div className="flex h-full flex-col justify-between p-2.5">
          {[0, 1, 2].map((row) => (
            <div key={row} className="flex items-center gap-2 px-1.5 py-1">
              <div className="h-5 w-5 shrink-0 rounded-md bg-[#DCE8FA]" />
              <div className="flex-1 space-y-1">
                <div className="h-1.5 w-4/5 rounded-full bg-[#333D4B]" />
                <div className="h-1 w-1/2 rounded-full bg-[#D1D6DB]" />
              </div>
            </div>
          ))}
          <div className="flex justify-center py-1">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#E5E8EB] border-t-[#3182F6]" />
          </div>
        </div>
      );
  }
};

export const OverviewGallery: React.FC<OverviewGalleryProps> = ({
  patterns,
  onSelectPattern,
}) => {
  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <span className="inline-flex items-center rounded-full bg-[#E8F3FF] px-3 py-1 text-xs font-bold text-[#3182F6]">
            Commerce UI Design System
          </span>
          <h2 className="mt-2.5 text-2xl font-extrabold tracking-tight text-[#191F28]">
            9가지 쇼핑 앱 화면 &amp; 콘텐츠 배치 패턴
          </h2>
          <p className="mt-1 text-sm text-[#4E5968]">
            카드를 클릭하면 모바일 실기기 프리뷰에서 직접 조작하고 React / HTML 코드를 즉시 복사할 수 있습니다.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {patterns.map((pattern) => (
          <button
            key={pattern.id}
            type="button"
            onClick={() => onSelectPattern(pattern.id)}
            className="group flex flex-col rounded-[24px] bg-white p-4 text-left shadow-[0_2px_12px_rgba(25,31,40,0.04)] ring-1 ring-[#E5E8EB]/80 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(49,130,246,0.12)] hover:ring-[#3182F6]/40"
          >
            {/* Reference Thumbnail Container */}
            <div className="h-44 w-full overflow-hidden rounded-2xl border border-[#F2F4F6] bg-[#FAFBFD] shadow-inner">
              <ThumbnailWireframe id={pattern.id} />
            </div>

            {/* Footer Label matching reference image */}
            <div className="mt-4 flex items-start justify-between px-1">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-base font-extrabold tabular-nums text-[#3182F6]">
                    {pattern.number}
                  </span>
                  <h3 className="text-lg font-extrabold tracking-tight text-[#191F28]">
                    {pattern.titleKo}
                  </h3>
                </div>
                <p className="mt-0.5 text-xs font-medium text-[#8B95A1]">
                  {pattern.titleEn} · {pattern.category}
                </p>
              </div>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F2F4F6] text-[#4E5968] transition-colors group-hover:bg-[#3182F6] group-hover:text-white">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
