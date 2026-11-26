import { useState } from 'react';
import {
  AlertCircle,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Compass,
  LayoutGrid,
} from 'lucide-react';
import { SHOP_PATTERNS } from './data/shopPatterns';
import { ShopPatternId } from './types/pattern';
import { Sidebar } from './components/layout/Sidebar';
import { DeviceFrame } from './components/preview/DeviceFrame';
import { DemoRenderer } from './components/preview/DemoRenderer';
import { OverviewGallery } from './components/preview/OverviewGallery';
import { CodeViewer } from './components/code/CodeViewer';

export function App() {
  const [activePatternId, setActivePatternId] = useState<ShopPatternId>('list');
  const [viewMode, setViewMode] = useState<'overview' | 'detail'>('detail');
  const [demoResetSeed, setDemoResetSeed] = useState<number>(0);

  const activeIndex = SHOP_PATTERNS.findIndex(
    (item) => item.id === activePatternId
  );
  const activePattern =
    SHOP_PATTERNS[activeIndex >= 0 ? activeIndex : 0];

  const handleSelectPattern = (id: ShopPatternId) => {
    setActivePatternId(id);
    setViewMode('detail');
    setDemoResetSeed(0);
  };

  const handleStepPattern = (delta: number) => {
    const nextIndex =
      (activeIndex + delta + SHOP_PATTERNS.length) % SHOP_PATTERNS.length;
    handleSelectPattern(SHOP_PATTERNS[nextIndex].id);
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#F2F4F6] text-[#191F28] lg:h-screen lg:flex-row lg:overflow-hidden">
      {/* 1. Left Sidebar Navigation */}
      <Sidebar
        patterns={SHOP_PATTERNS}
        activePatternId={activePatternId}
        viewMode={viewMode}
        onSelectPattern={handleSelectPattern}
        onSelectOverview={() => setViewMode('overview')}
      />

      {/* Main Content Area */}
      {viewMode === 'overview' ? (
        <main className="toss-scroll flex-1 overflow-y-auto">
          <OverviewGallery
            patterns={SHOP_PATTERNS}
            onSelectPattern={handleSelectPattern}
          />
        </main>
      ) : (
        <div className="flex flex-1 flex-col overflow-hidden lg:flex-row">
          {/* 2. Center Live Interactive Preview & UX Guide */}
          <main className="toss-scroll flex-1 overflow-y-auto px-4 py-5 sm:px-6 lg:px-7">
            <div className="mx-auto flex max-w-xl flex-col gap-5">
              {/* Pattern Title & Quick Switcher */}
              <header className="flex flex-wrap items-start justify-between gap-3 rounded-2xl bg-white p-4.5 shadow-2xs ring-1 ring-[#E5E8EB]/80">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="rounded-lg bg-[#E8F3FF] px-2 py-0.5 text-xs font-extrabold tabular-nums text-[#3182F6]">
                      {activePattern.number}
                    </span>
                    <span className="rounded-lg bg-[#F2F4F6] px-2 py-0.5 text-[11px] font-semibold text-[#4E5968]">
                      {activePattern.category}
                    </span>
                  </div>
                  <h2 className="mt-2 flex items-baseline gap-2 text-xl font-extrabold tracking-tight text-[#191F28]">
                    <span>{activePattern.titleKo}</span>
                    <span className="text-sm font-semibold text-[#8B95A1]">
                      {activePattern.titleEn}
                    </span>
                  </h2>
                  <p className="mt-1 text-[13px] leading-relaxed text-[#4E5968]">
                    {activePattern.summary}
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setViewMode('overview')}
                    title="전체 한눈에 보기"
                    className="flex h-8 items-center gap-1 rounded-xl bg-[#F2F4F6] px-2.5 text-xs font-bold text-[#4E5968] transition-colors hover:bg-[#E5E8EB] hover:text-[#191F28]"
                  >
                    <LayoutGrid className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">전체</span>
                  </button>
                  <button
                    type="button"
                    aria-label="이전 패턴"
                    onClick={() => handleStepPattern(-1)}
                    className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#F2F4F6] text-[#4E5968] transition-colors hover:bg-[#E5E8EB] hover:text-[#191F28]"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    aria-label="다음 패턴"
                    onClick={() => handleStepPattern(1)}
                    className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#F2F4F6] text-[#4E5968] transition-colors hover:bg-[#E5E8EB] hover:text-[#191F28]"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </header>

              {/* Interactive Mobile Device Preview */}
              <DeviceFrame
                pattern={activePattern}
                onResetDemo={() => setDemoResetSeed((s) => s + 1)}
              >
                <DemoRenderer
                  key={`${activePattern.id}-${demoResetSeed}`}
                  patternId={activePattern.id}
                />
              </DeviceFrame>

              {/* Commerce UX Design Guide */}
              <section className="rounded-2xl bg-white p-5 shadow-2xs ring-1 ring-[#E5E8EB]/80">
                <h3 className="flex items-center gap-2 text-sm font-extrabold text-[#191F28]">
                  <Compass className="h-4 w-4 text-[#3182F6]" />
                  실무 UX 설계 가이드
                </h3>

                <div className="mt-3.5 space-y-3.5">
                  <div className="rounded-xl bg-[#F9FAFB] p-3.5">
                    <p className="text-[11px] font-bold text-[#3182F6]">
                      언제 사용하나요?
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-[#333D4B]">
                      {activePattern.uxGuide.whenToUse}
                    </p>
                  </div>

                  <div>
                    <p className="mb-2 text-[11px] font-bold text-[#4E5968]">
                      핵심 구현 포인트
                    </p>
                    <ul className="space-y-1.5">
                      {activePattern.uxGuide.keyPoints.map((point) => (
                        <li
                          key={point}
                          className="flex items-start gap-2 text-xs leading-relaxed text-[#333D4B]"
                        >
                          <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#3182F6]" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-start gap-2 rounded-xl bg-[#FFF8F6] px-3.5 py-2.5 ring-1 ring-[#F04452]/15">
                    <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#F04452]" />
                    <p className="text-xs leading-relaxed text-[#4E5968]">
                      <strong className="font-bold text-[#191F28]">
                        주의사항:{' '}
                      </strong>
                      {activePattern.uxGuide.caution}
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </main>

          {/* 3. Right Code Snippet Panel */}
          <section className="h-[540px] shrink-0 p-4 pt-0 lg:h-full lg:w-[44%] lg:p-5 lg:pl-0 xl:w-[46%]">
            <CodeViewer pattern={activePattern} />
          </section>
        </div>
      )}
    </div>
  );
}

export default App;
