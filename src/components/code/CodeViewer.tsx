import React, { useState } from 'react';
import { Check, Code2, Copy, FileCode2 } from 'lucide-react';
import { ShopPatternMeta } from '../../types/pattern';

interface CodeViewerProps {
  pattern: ShopPatternMeta;
}

type CodeTab = 'react' | 'html';

export const CodeViewer: React.FC<CodeViewerProps> = ({ pattern }) => {
  const [activeTab, setActiveTab] = useState<CodeTab>('react');
  const [copied, setCopied] = useState(false);

  const code = activeTab === 'react' ? pattern.reactCode : pattern.htmlCode;
  const lines = code.split('\n');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = code;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    }
  };

  return (
    <section className="flex h-full flex-col overflow-hidden rounded-2xl border border-[#E5E8EB] bg-[#191F28] text-white shadow-sm">
      {/* Top Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 bg-[#1E2530] px-4 py-3">
        <div className="flex items-center gap-1.5 rounded-xl bg-[#131820] p-1">
          <button
            type="button"
            onClick={() => setActiveTab('react')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
              activeTab === 'react'
                ? 'bg-[#3182F6] text-white shadow-sm'
                : 'text-[#8B95A1] hover:text-white'
            }`}
          >
            <Code2 className="h-3.5 w-3.5" />
            React + Tailwind
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('html')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
              activeTab === 'html'
                ? 'bg-[#3182F6] text-white shadow-sm'
                : 'text-[#8B95A1] hover:text-white'
            }`}
          >
            <FileCode2 className="h-3.5 w-3.5" />
            순수 HTML + CSS + JS
          </button>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all active:scale-95 ${
            copied
              ? 'bg-emerald-500 text-white'
              : 'bg-white/10 text-white hover:bg-[#3182F6]'
          }`}
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5" />
              복사 완료!
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              코드 복사
            </>
          )}
        </button>
      </div>

      {/* File Meta Bar */}
      <div className="flex items-center justify-between border-b border-white/5 bg-[#191F28] px-4 py-2 text-[11px] text-[#8B95A1]">
        <span className="font-mono">
          {pattern.number}_{pattern.id}.
          {activeTab === 'react' ? 'tsx' : 'html'}
        </span>
        <span>{lines.length}줄 · 복사 즉시 실행 가능</span>
      </div>

      {/* Code Body with Line Numbers */}
      <div className="toss-scroll flex-1 overflow-auto p-4 font-mono text-[12.5px] leading-6">
        <table className="w-full border-collapse">
          <tbody>
            {lines.map((line, idx) => (
              <tr key={idx} className="hover:bg-white/[0.03]">
                <td className="w-9 select-none pr-4 text-right text-[11px] text-[#6B7684]">
                  {idx + 1}
                </td>
                <td className="whitespace-pre text-[#E5E8EB]">
                  {line.length > 0 ? line : ' '}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
