import React from 'react';
import { ChevronLeft, RotateCcw, ShoppingCart, Wifi, Battery } from 'lucide-react';
import { ShopPatternMeta } from '../../types/pattern';

interface DeviceFrameProps {
  pattern: ShopPatternMeta;
  onResetDemo: () => void;
  children: React.ReactNode;
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({
  pattern,
  onResetDemo,
  children,
}) => {
  return (
    <div className="flex flex-col items-center">
      {/* Device Mockup Shell */}
      <div className="relative w-full max-w-[376px] rounded-[40px] border-[7px] border-[#191F28] bg-[#F2F4F6] shadow-[0_24px_60px_rgba(25,31,40,0.14)]">
        {/* Top Speaker / Dynamic Notch */}
        <div className="flex items-center justify-between bg-white px-6 pt-3 pb-2 rounded-t-[32px]">
          <span className="text-[11px] font-bold tabular-nums text-[#191F28]">
            9:41
          </span>
          <div className="h-4 w-20 rounded-full bg-[#191F28]" />
          <div className="flex items-center gap-1.5 text-[#191F28]">
            <Wifi className="h-3 w-3" />
            <Battery className="h-3.5 w-3.5" />
          </div>
        </div>

        {/* App Navigation Bar */}
        <div className="flex items-center justify-between border-b border-[#F2F4F6] bg-white px-4 py-2.5">
          <div className="flex items-center gap-1.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-full text-[#4E5968]">
              <ChevronLeft className="h-4.5 w-4.5" />
            </span>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-extrabold text-[#3182F6]">
                  {pattern.number}
                </span>
                <h3 className="text-sm font-bold text-[#191F28]">
                  {pattern.titleKo} 쇼핑 데모
                </h3>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={onResetDemo}
              title="데모 상태 초기화"
              className="flex h-7 items-center gap-1 rounded-full bg-[#F2F4F6] px-2.5 text-[11px] font-semibold text-[#4E5968] transition-colors hover:bg-[#E5E8EB] hover:text-[#191F28]"
            >
              <RotateCcw className="h-3 w-3" />
              초기화
            </button>
            <span className="relative flex h-7 w-7 items-center justify-center rounded-full bg-[#F2F4F6] text-[#333D4B]">
              <ShoppingCart className="h-3.5 w-3.5" />
              <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#3182F6] text-[9px] font-bold text-white">
                2
              </span>
            </span>
          </div>
        </div>

        {/* Interactive App Content Area */}
        <div className="toss-scroll h-[470px] overflow-y-auto bg-[#F2F4F6] p-3.5">
          {children}
        </div>

        {/* Bottom Home Indicator */}
        <div className="flex justify-center rounded-b-[32px] bg-white py-2.5">
          <div className="h-1 w-28 rounded-full bg-[#D1D6DB]" />
        </div>
      </div>

      {/* Interaction Hint Pill */}
      <p className="mt-3.5 inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-xs font-medium text-[#4E5968] shadow-xs ring-1 ring-[#E5E8EB]">
        <span className="h-1.5 w-1.5 rounded-full bg-[#3182F6]" />
        {pattern.interactionHint}
      </p>
    </div>
  );
};
