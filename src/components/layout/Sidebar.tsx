import React from 'react';
import { LayoutGrid, ShoppingBag, Sparkles } from 'lucide-react';
import { ShopPatternId, ShopPatternMeta } from '../../types/pattern';

interface SidebarProps {
  patterns: ShopPatternMeta[];
  activePatternId: ShopPatternId;
  viewMode: 'overview' | 'detail';
  onSelectPattern: (id: ShopPatternId) => void;
  onSelectOverview: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  patterns,
  activePatternId,
  viewMode,
  onSelectPattern,
  onSelectOverview,
}) => {
  return (
    <aside className="flex w-full shrink-0 flex-col border-b border-[#E5E8EB] bg-white lg:h-full lg:w-[272px] lg:border-r lg:border-b-0">
      {/* Brand Header */}
      <div className="flex items-center justify-between border-b border-[#F2F4F6] px-5 py-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#3182F6] text-white shadow-sm shadow-[#3182F6]/30">
            <ShoppingBag className="h-4.5 w-4.5" />
          </div>
          <div>
            <h1 className="text-[15px] font-bold tracking-tight text-[#191F28]">
              커머스 UI 패턴
            </h1>
            <p className="text-[11px] font-medium text-[#8B95A1]">
              쇼핑 앱 배치 &amp; 코드 라이브러리
            </p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-[#E8F3FF] px-2 py-0.5 text-[10px] font-bold text-[#3182F6]">
          <Sparkles className="h-3 w-3" />
          v1.0
        </span>
      </div>

      {/* Overview Mode Button */}
      <div className="px-3.5 pt-3.5 pb-2">
        <button
          type="button"
          onClick={onSelectOverview}
          className={`flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-bold transition-all ${
            viewMode === 'overview'
              ? 'bg-[#3182F6] text-white shadow-sm shadow-[#3182F6]/25'
              : 'bg-[#F2F4F6] text-[#333D4B] hover:bg-[#E5E8EB]/80'
          }`}
        >
          <span className="flex items-center gap-2">
            <LayoutGrid className="h-4 w-4" />
            전체 한눈에 보기
          </span>
          <span
            className={`rounded-md px-1.5 py-0.5 text-[10px] font-bold ${
              viewMode === 'overview'
                ? 'bg-white/20 text-white'
                : 'bg-white text-[#4E5968]'
            }`}
          >
            9종
          </span>
        </button>
      </div>

      {/* Pattern List (01~09) */}
      <nav
        aria-label="쇼핑 앱 UI 패턴 목록"
        className="toss-scroll flex gap-1.5 overflow-x-auto px-3.5 py-2 lg:flex-1 lg:flex-col lg:overflow-y-auto lg:overflow-x-hidden"
      >
        <p className="hidden px-2 pb-1 text-[11px] font-semibold tracking-wide text-[#8B95A1] lg:block">
          패턴 컴포넌트 (01–09)
        </p>
        {patterns.map((pattern) => {
          const isActive =
            viewMode === 'detail' && pattern.id === activePatternId;
          return (
            <button
              key={pattern.id}
              type="button"
              onClick={() => onSelectPattern(pattern.id)}
              className={`group flex shrink-0 items-center justify-between rounded-xl px-3 py-2.5 text-left transition-all lg:w-full ${
                isActive
                  ? 'bg-[#E8F3FF] text-[#1B64DA]'
                  : 'text-[#4E5968] hover:bg-[#F9FAFB] hover:text-[#191F28]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span
                  className={`text-xs font-extrabold tabular-nums transition-colors ${
                    isActive
                      ? 'text-[#3182F6]'
                      : 'text-[#8B95A1] group-hover:text-[#3182F6]'
                  }`}
                >
                  {pattern.number}
                </span>
                <div>
                  <span className="block text-[13.5px] font-bold leading-tight">
                    {pattern.titleKo}
                  </span>
                  <span
                    className={`hidden text-[11px] lg:block ${
                      isActive ? 'text-[#3182F6]/80' : 'text-[#8B95A1]'
                    }`}
                  >
                    {pattern.titleEn}
                  </span>
                </div>
              </div>
              <span
                className={`ml-2 hidden rounded-md px-1.5 py-0.5 text-[10px] font-semibold lg:inline-block ${
                  isActive
                    ? 'bg-white text-[#3182F6]'
                    : 'bg-[#F2F4F6] text-[#6B7684]'
                }`}
              >
                {pattern.category}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Footer Info */}
      <div className="hidden border-t border-[#F2F4F6] px-5 py-3.5 lg:block">
        <p className="text-[11px] leading-relaxed text-[#8B95A1]">
          외부 무거운 UI 라이브러리 없이{' '}
          <span className="font-semibold text-[#4E5968]">
            순수 React + Tailwind CSS
          </span>
          로 구현되어 즉시 복사·적용할 수 있습니다.
        </p>
      </div>
    </aside>
  );
};
