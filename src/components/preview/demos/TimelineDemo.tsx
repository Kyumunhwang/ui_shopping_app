import React, { useState } from 'react';
import { PackageCheck, Truck } from 'lucide-react';

interface DeliveryStep {
  title: string;
  desc: string;
  time: string;
}

const STEPS: DeliveryStep[] = [
  { title: '주문 완료', desc: '신용카드 일시불 결제 승인', time: '어제 14:10' },
  { title: '상품 준비', desc: '경기 용인 풀필먼트 센터 포장 완료', time: '어제 18:35' },
  { title: '배송 중', desc: '강남 3캠프 배송 기사님 출발', time: '오늘 08:20' },
  { title: '도착', desc: '문 앞 배송 완료 및 사진 전송', time: '오늘 15:00 예정' },
];

export const TimelineDemo: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(2);

  const advanceStep = () => {
    setCurrentStep((prev) => (prev + 1) % STEPS.length);
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Live Status Banner */}
      <div className="flex items-center justify-between rounded-2xl bg-[#3182F6] p-4 text-white shadow-md shadow-[#3182F6]/20">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
            {currentStep === STEPS.length - 1 ? (
              <PackageCheck className="h-5 w-5" />
            ) : (
              <Truck className="h-5 w-5" />
            )}
          </div>
          <div>
            <p className="text-[11px] font-medium text-white/80">운송장 5841-2910-4421</p>
            <p className="text-sm font-extrabold">{STEPS[currentStep].title}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={advanceStep}
          className="rounded-xl bg-white px-2.5 py-1.5 text-[11px] font-bold text-[#3182F6] transition-transform active:scale-95"
        >
          다음 단계
        </button>
      </div>

      {/* Vertical Timeline */}
      <div className="rounded-2xl bg-white p-5 shadow-xs">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-xs font-bold text-[#191F28]">배송 진행 타임라인</span>
          <span className="text-[11px] text-[#8B95A1]">단계 클릭 시 시뮬레이션</span>
        </div>

        <div>
          {STEPS.map((step, index) => {
            const isCompleted = index <= currentStep;
            const isCurrent = index === currentStep;
            const isLast = index === STEPS.length - 1;

            return (
              <button
                key={step.title}
                type="button"
                onClick={() => setCurrentStep(index)}
                className="flex w-full items-stretch gap-3.5 text-left"
              >
                <div className="flex flex-col items-center">
                  <span
                    className={`mt-1 h-3 w-3 shrink-0 rounded-full transition-all ${
                      isCompleted
                        ? isCurrent
                          ? 'bg-[#3182F6] ring-4 ring-[#E8F3FF]'
                          : 'bg-[#3182F6]'
                        : 'bg-[#D1D6DB]'
                    }`}
                  />
                  {!isLast && (
                    <span
                      className={`my-1 w-0.5 flex-1 min-h-9 transition-colors ${
                        index < currentStep ? 'bg-[#3182F6]' : 'bg-[#E5E8EB]'
                      }`}
                    />
                  )}
                </div>

                <div className={`flex-1 ${isLast ? 'pb-0' : 'pb-6'}`}>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`text-[13px] font-bold ${
                          isCompleted ? 'text-[#191F28]' : 'text-[#8B95A1]'
                        }`}
                      >
                        {step.title}
                      </span>
                      {isCurrent && (
                        <span className="rounded bg-[#E8F3FF] px-1.5 py-0.5 text-[10px] font-bold text-[#3182F6]">
                          진행 중
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] tabular-nums text-[#8B95A1]">
                      {step.time}
                    </span>
                  </div>
                  <p
                    className={`mt-0.5 text-xs ${
                      isCompleted ? 'text-[#4E5968]' : 'text-[#B0B8C1]'
                    }`}
                  >
                    {step.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
