import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface AccordionItem {
  id: string;
  title: string;
  content: string;
  note: string;
}

const ITEMS: AccordionItem[] = [
  {
    id: 'shipping',
    title: '배송 안내',
    content:
      '평일 오후 2시 이전 결제 완료 시 당일 출고되며, 평균 1~2영업일 이내에 수령하실 수 있습니다.',
    note: '30,000원 이상 구매 시 무료배송 (제주·도서산간 3,000원 추가)',
  },
  {
    id: 'refund',
    title: '교환, 반품',
    content:
      '상품 수령일로부터 7일 이내에 주문 상세 화면에서 원터치로 교환 및 반품 수거 신청이 가능합니다.',
    note: '단순 변심 왕복 배송비 6,000원 · 상품 하자 시 무료',
  },
  {
    id: 'payment',
    title: '결제 수단',
    content:
      '토스페이, 신용·체크카드, 네이버페이, 카카오페이, 무통장입금 등 모든 간편결제를 지원합니다.',
    note: '5만 원 이상 결제 시 최대 6개월 무이자 할부',
  },
  {
    id: 'point',
    title: '적립금 및 쿠폰',
    content:
      '구매 확정 즉시 결제 금액의 1.5%가 적립되며, 포토 리뷰 작성 시 1,000원이 추가 지급됩니다.',
    note: '보유 적립금은 1,000원 단위로 즉시 사용 가능',
  },
];

export const AccordionDemo: React.FC = () => {
  const [multiOpen, setMultiOpen] = useState<boolean>(false);
  const [openIds, setOpenIds] = useState<string[]>(['refund']);

  const toggleItem = (id: string) => {
    setOpenIds((prev) => {
      const exists = prev.includes(id);
      if (multiOpen) {
        return exists ? prev.filter((item) => item !== id) : [...prev, id];
      }
      return exists ? [] : [id];
    });
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Mode Toggle */}
      <div className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 shadow-xs">
        <span className="text-xs font-bold text-[#191F28]">쇼핑몰 이용 안내</span>
        <button
          type="button"
          onClick={() => setMultiOpen((prev) => !prev)}
          className={`rounded-full px-2.5 py-1 text-[11px] font-bold transition-colors ${
            multiOpen
              ? 'bg-[#3182F6] text-white'
              : 'bg-[#F2F4F6] text-[#4E5968]'
          }`}
        >
          다중 펼치기: {multiOpen ? 'ON' : 'OFF'}
        </button>
      </div>

      {/* Accordion Stack */}
      <div className="flex flex-col gap-2.5">
        {ITEMS.map((item) => {
          const isOpen = openIds.includes(item.id);
          return (
            <div
              key={item.id}
              className={`overflow-hidden rounded-2xl border bg-white transition-all ${
                isOpen
                  ? 'border-[#3182F6]/30 shadow-sm'
                  : 'border-[#E5E8EB] shadow-2xs'
              }`}
            >
              <button
                type="button"
                onClick={() => toggleItem(item.id)}
                className={`flex w-full items-center justify-between px-4 py-3.5 text-left text-[13px] font-bold transition-colors ${
                  isOpen
                    ? 'bg-[#E8F3FF]/85 text-[#1B64DA]'
                    : 'bg-[#F9FAFB] text-[#191F28] hover:bg-[#F2F4F6]'
                }`}
              >
                <span>{item.title}</span>
                <ChevronDown
                  className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-[#3182F6]' : 'text-[#8B95A1]'
                  }`}
                />
              </button>

              {isOpen && (
                <div className="border-t border-[#E5E8EB]/60 bg-white px-4 py-3.5">
                  <p className="text-xs leading-relaxed text-[#333D4B]">
                    {item.content}
                  </p>
                  <p className="mt-2 rounded-lg bg-[#F2F4F6] px-2.5 py-1.5 text-[11px] font-medium text-[#4E5968]">
                    {item.note}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
