import React, { useState } from 'react';
import { ArrowUpDown, Minus, Plus } from 'lucide-react';

interface OrderItem {
  id: number;
  name: string;
  unitPrice: number;
  qty: number;
}

const INITIAL_ROWS: OrderItem[] = [
  { id: 1, name: '니트', unitPrice: 39000, qty: 1 },
  { id: 2, name: '머그', unitPrice: 12000, qty: 2 },
  { id: 3, name: '양말', unitPrice: 3000, qty: 3 },
];

export const TableDemo: React.FC = () => {
  const [rows, setRows] = useState<OrderItem[]>(INITIAL_ROWS);
  const [selectedId, setSelectedId] = useState<number>(3);
  const [sortKey, setSortKey] = useState<'qty' | 'amount' | null>(null);
  const [sortAsc, setSortAsc] = useState<boolean>(false);

  const handleSort = (key: 'qty' | 'amount') => {
    if (sortKey === key) {
      setSortAsc((prev) => !prev);
    } else {
      setSortKey(key);
      setSortAsc(false);
    }
  };

  const adjustSelectedQty = (delta: number) => {
    setRows((prev) =>
      prev.map((row) =>
        row.id === selectedId
          ? { ...row, qty: Math.max(1, Math.min(20, row.qty + delta)) }
          : row
      )
    );
  };

  const sortedRows = [...rows].sort((a, b) => {
    if (!sortKey) return a.id - b.id;
    const valA = sortKey === 'qty' ? a.qty : a.qty * a.unitPrice;
    const valB = sortKey === 'qty' ? b.qty : b.qty * b.unitPrice;
    return sortAsc ? valA - valB : valB - valA;
  });

  const totalAmount = rows.reduce(
    (sum, item) => sum + item.unitPrice * item.qty,
    0
  );
  const selectedRow = rows.find((r) => r.id === selectedId) ?? rows[0];

  return (
    <div className="flex flex-col gap-3">
      <div className="overflow-hidden rounded-2xl bg-white shadow-xs">
        <div className="flex items-center justify-between border-b border-[#F2F4F6] px-4 py-3">
          <span className="text-xs font-bold text-[#191F28]">주문 내역 상세</span>
          <span className="text-[11px] font-medium text-[#8B95A1]">
            헤더 클릭 시 정렬
          </span>
        </div>

        <table className="w-full border-collapse text-[13px]">
          <thead>
            <tr className="bg-[#F2F4F6] text-[11px] font-semibold text-[#6B7684]">
              <th className="px-4 py-2.5 text-left">상품</th>
              <th className="px-4 py-2.5 text-right">
                <button
                  type="button"
                  onClick={() => handleSort('qty')}
                  className="inline-flex items-center gap-1 hover:text-[#191F28]"
                >
                  수량
                  <ArrowUpDown className="h-3 w-3" />
                </button>
              </th>
              <th className="px-4 py-2.5 text-right">
                <button
                  type="button"
                  onClick={() => handleSort('amount')}
                  className="inline-flex items-center gap-1 hover:text-[#191F28]"
                >
                  금액
                  <ArrowUpDown className="h-3 w-3" />
                </button>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F2F4F6]">
            {sortedRows.map((row) => {
              const isSelected = row.id === selectedId;
              const amount = row.unitPrice * row.qty;
              return (
                <tr
                  key={row.id}
                  onClick={() => setSelectedId(row.id)}
                  className={`cursor-pointer transition-colors ${
                    isSelected ? 'bg-[#E8F3FF]/85' : 'hover:bg-[#F9FAFB]'
                  }`}
                >
                  <td className="px-4 py-3.5 text-left font-bold text-[#191F28]">
                    {row.name}
                  </td>
                  <td className="px-4 py-3.5 text-right tabular-nums text-[#4E5968]">
                    {row.qty}
                  </td>
                  <td className="px-4 py-3.5 text-right font-extrabold tabular-nums text-[#191F28]">
                    {amount.toLocaleString('ko-KR')}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="flex items-center justify-between border-t border-[#E5E8EB] bg-[#FAFBFD] px-4 py-3">
          <span className="text-xs font-bold text-[#4E5968]">합계 금액</span>
          <span className="text-sm font-extrabold tabular-nums text-[#3182F6]">
            {totalAmount.toLocaleString('ko-KR')}원
          </span>
        </div>
      </div>

      {/* Selected Row Quick Control */}
      <div className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 shadow-xs">
        <div>
          <p className="text-[11px] font-medium text-[#8B95A1]">선택 행 수량 조절</p>
          <p className="text-xs font-bold text-[#191F28]">
            {selectedRow.name} (개당 {selectedRow.unitPrice.toLocaleString()}원)
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="수량 줄이기"
            onClick={() => adjustSelectedQty(-1)}
            className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#F2F4F6] text-[#333D4B] hover:bg-[#E5E8EB]"
          >
            <Minus className="h-3.5 w-3.5" />
          </button>
          <span className="w-5 text-center text-xs font-extrabold tabular-nums text-[#191F28]">
            {selectedRow.qty}
          </span>
          <button
            type="button"
            aria-label="수량 늘리기"
            onClick={() => adjustSelectedQty(1)}
            className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#3182F6] text-white hover:bg-[#1B64DA]"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
