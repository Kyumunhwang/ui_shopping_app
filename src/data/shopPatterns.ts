import { ShopPatternMeta } from '../types/pattern';

export const SHOP_PATTERNS: ShopPatternMeta[] = [
  {
    id: 'list',
    number: '01',
    titleKo: '리스트',
    titleEn: 'List',
    category: '상품 탐색',
    summary: '썸네일·상품명·가격을 수직으로 정렬해 빠른 탐색과 선택을 돕는 기본 쇼핑 패턴입니다.',
    interactionHint: '항목을 탭해 선택 상태를 전환하거나 장바구니 수량을 조절해 보세요.',
    uxGuide: {
      whenToUse: '생필품 장보기, 검색 결과, 랭킹, 장바구니 등 가격과 스펙을 빠르게 스캔해야 할 때 사용합니다.',
      keyPoints: [
        '좌측 1:1 둥근 썸네일 + 중앙 2줄 이내 텍스트 + 우측 가격 정렬로 시선 흐름을 단순화하세요.',
        '가격 숫자는 tabular-nums(고정폭 숫자)로 맞춰 세로 비교가 한눈에 들어오게 합니다.',
        '선택된 항목은 #E8F3FF 연한 블루 배경과 #3182F6 포인트 컬러로 즉각 피드백을 줍니다.',
      ],
      caution: '한 행에 배지·별점·할인율 등 정보가 4개 이상 들어가면 모바일에서 가독성이 급격히 떨어집니다.',
    },
    reactCode: `import React, { useState } from 'react';

interface ProductItem {
  id: number;
  name: string;
  option: string;
  price: number;
  badge?: string;
}

const ITEMS: ProductItem[] = [
  { id: 1, name: '제주 삼다수 무라벨 2L 6입', option: '로켓배송 · 내일 도착', price: 12900 },
  { id: 2, name: '유기농 아기 보리차 500ml', option: '오늘 출발 · 무료배송', price: 8500, badge: '인기' },
  { id: 3, name: '프리미엄 3겹 천연펄프 롤휴지', option: '30m × 24롤', price: 23000 },
  { id: 4, name: '국산 무농약 콩나물 300g', option: '새벽배송 가능', price: 5900 },
];

export function ShopProductList() {
  const [selectedId, setSelectedId] = useState<number>(2);

  return (
    <div className="w-full max-w-md overflow-hidden rounded-2xl border border-[#E5E8EB] bg-white shadow-sm">
      <ul className="divide-y divide-[#F2F4F6]">
        {ITEMS.map((item) => {
          const isSelected = item.id === selectedId;
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => setSelectedId(item.id)}
                className={\`flex w-full items-center gap-3.5 px-4 py-3.5 text-left transition-colors \${
                  isSelected ? 'bg-[#F2F7FF]' : 'bg-white hover:bg-[#F9FAFB]'
                }\`}
              >
                <div
                  className={\`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-xs font-bold transition-colors \${
                    isSelected
                      ? 'bg-[#3182F6] text-white shadow-sm'
                      : 'bg-[#E8F3FF] text-[#3182F6]'
                  }\`}
                >
                  {isSelected ? '선택' : '상품'}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <p className="truncate text-sm font-semibold text-[#191F28]">{item.name}</p>
                    {item.badge && (
                      <span className="shrink-0 rounded-md bg-[#E8F3FF] px-1.5 py-0.5 text-[10px] font-bold text-[#3182F6]">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 truncate text-xs text-[#8B95A1]">{item.option}</p>
                </div>

                <span className="shrink-0 text-sm font-bold tabular-nums text-[#191F28]">
                  {item.price.toLocaleString('ko-KR')}원
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}`,
    htmlCode: `<!doctype html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", sans-serif; background: #F2F4F6; padding: 20px; }
    .list-card { max-width: 400px; background: #fff; border-radius: 16px; border: 1px solid #E5E8EB; overflow: hidden; }
    .list-item { display: flex; align-items: center; gap: 14px; width: 100%; padding: 14px 16px; border: 0; border-bottom: 1px solid #F2F4F6; background: #fff; cursor: pointer; text-align: left; transition: background 0.15s; }
    .list-item:last-child { border-bottom: 0; }
    .list-item.active { background: #F2F7FF; }
    .thumb { width: 46px; height: 46px; border-radius: 12px; background: #E8F3FF; color: #3182F6; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; flex-shrink: 0; }
    .list-item.active .thumb { background: #3182F6; color: #fff; }
    .info { flex: 1; min-width: 0; }
    .name { font-size: 14px; font-weight: 600; color: #191F28; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .sub { font-size: 12px; color: #8B95A1; margin-top: 2px; }
    .price { font-size: 14px; font-weight: 700; color: #191F28; font-variant-numeric: tabular-nums; flex-shrink: 0; }
  </style>
</head>
<body>
  <div class="list-card" id="productList"></div>
  <script>
    const items = [
      { id: 1, name: '제주 삼다수 무라벨 2L 6입', sub: '로켓배송 · 내일 도착', price: 12900 },
      { id: 2, name: '유기농 아기 보리차 500ml', sub: '오늘 출발 · 무료배송', price: 8500 },
      { id: 3, name: '프리미엄 3겹 천연펄프 휴지', sub: '30m × 24롤', price: 23000 },
      { id: 4, name: '국산 무농약 콩나물 300g', sub: '새벽배송 가능', price: 5900 },
    ];
    let selectedId = 2;
    const container = document.getElementById('productList');
    function render() {
      container.innerHTML = items.map(item => \`
        <button class="list-item \${item.id === selectedId ? 'active' : ''}" onclick="selectItem(\${item.id})">
          <div class="thumb">\${item.id === selectedId ? '선택' : '상품'}</div>
          <div class="info">
            <div class="name">\${item.name}</div>
            <div class="sub">\${item.sub}</div>
          </div>
          <div class="price">\${item.price.toLocaleString('ko-KR')}원</div>
        </button>
      \`).join('');
    }
    window.selectItem = (id) => { selectedId = id; render(); };
    render();
  </script>
</body>
</html>`,
  },
  {
    id: 'grid',
    number: '02',
    titleKo: '그리드',
    titleEn: 'Grid',
    category: '카테고리',
    summary: '동일 비율의 정사각 타일을 격자로 배치해 카테고리·브랜드·옵션을 직관적으로 탐색합니다.',
    interactionHint: '각 카테고리 타일을 클릭해 활성 카테고리 필터가 전환되는 동작을 확인해 보세요.',
    uxGuide: {
      whenToUse: '홈 화면 3열/4열 카테고리 숏컷, 컬러·사이즈 칩, 브랜드관 또는 균일한 썸네일 상품 진열에 적합합니다.',
      keyPoints: [
        '모바일 기준 3열(grid-cols-3)에 10~12px 간격이 가장 균형 잡힌 터치 영역(48px 이상)을 보장합니다.',
        '모든 타일의 aspect-square 비율을 통일해 시각적 리듬감과 정렬 안정성을 확보합니다.',
        '현재 선택된 카테고리는 #3182F6 솔리드 채움과 흰색 텍스트로 명확히 구분합니다.',
      ],
      caution: '모바일 한 화면에 4열 이상 배치하면 카테고리명 줄바꿈이 발생해 답답해 보일 수 있습니다.',
    },
    reactCode: `import React, { useState } from 'react';

const CATEGORIES = [
  { id: 'fashion', label: '패션의류', count: '1,240' },
  { id: 'beauty', label: '뷰티', count: '860' },
  { id: 'living', label: '리빙홈', count: '540' },
  { id: 'food', label: '신선식품', count: '920' },
  { id: 'digital', label: '디지털', count: '410' },
  { id: 'travel', label: '여행티켓', count: '195' },
];

export function CategoryGrid() {
  const [activeId, setActiveId] = useState<string>('digital');

  return (
    <div className="w-full max-w-md rounded-2xl border border-[#E5E8EB] bg-white p-4">
      <div className="grid grid-cols-3 gap-2.5">
        {CATEGORIES.map((cat) => {
          const isActive = cat.id === activeId;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveId(cat.id)}
              className={\`flex aspect-square flex-col items-center justify-center rounded-2xl p-2 transition-all active:scale-95 \${
                isActive
                  ? 'bg-[#3182F6] text-white shadow-md shadow-[#3182F6]/25'
                  : 'bg-[#E8F3FF]/70 text-[#191F28] hover:bg-[#E8F3FF]'
              }\`}
            >
              <span className="text-sm font-bold">{cat.label}</span>
              <span
                className={\`mt-1 text-[11px] font-medium \${
                  isActive ? 'text-white/80' : 'text-[#3182F6]'
                }\`}
              >
                {cat.count}개
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}`,
    htmlCode: `<!doctype html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", sans-serif; background: #F2F4F6; padding: 20px; }
    .grid-wrap { max-width: 360px; background: #fff; border-radius: 18px; padding: 16px; border: 1px solid #E5E8EB; }
    .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
    .tile { aspect-ratio: 1 / 1; border: 0; border-radius: 16px; background: #EAF2FE; color: #191F28; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; cursor: pointer; transition: transform 0.15s, background 0.15s; }
    .tile:active { transform: scale(0.95); }
    .tile.active { background: #3182F6; color: #fff; box-shadow: 0 8px 18px rgba(49, 130, 246, 0.25); }
    .tile strong { font-size: 13px; }
    .tile span { font-size: 11px; color: #3182F6; }
    .tile.active span { color: rgba(255,255,255,0.85); }
  </style>
</head>
<body>
  <div class="grid-wrap"><div class="grid" id="grid"></div></div>
  <script>
    const categories = [
      { id: 'fashion', label: '패션의류', count: '1,240개' },
      { id: 'beauty', label: '뷰티', count: '860개' },
      { id: 'living', label: '리빙홈', count: '540개' },
      { id: 'food', label: '신선식품', count: '920개' },
      { id: 'digital', label: '디지털', count: '410개' },
      { id: 'travel', label: '여행티켓', count: '195개' },
    ];
    let active = 'digital';
    const el = document.getElementById('grid');
    function render() {
      el.innerHTML = categories.map(c => \`
        <button class="tile \${c.id === active ? 'active' : ''}" onclick="pick('\${c.id}')">
          <strong>\${c.label}</strong><span>\${c.count}</span>
        </button>
      \`).join('');
    }
    window.pick = (id) => { active = id; render(); };
    render();
  </script>
</body>
</html>`,
  },
  {
    id: 'card',
    number: '03',
    titleKo: '카드',
    titleEn: 'Card',
    category: '기획전',
    summary: '그림자와 둥근 모서리로 콘텐츠 블록을 독립시켜 여행·숙박·패키지 상품의 가치를 부각합니다.',
    interactionHint: '카드를 클릭해 상세 상품을 선택하거나 우측 하트(찜) 버튼을 눌러 보세요.',
    uxGuide: {
      whenToUse: '여행 패키지(제주 2박, 오사카 3박), 큐레이션 기획전, 정기구독 멤버십 카드 등 몰입감이 필요한 콘텐츠에 적합합니다.',
      keyPoints: [
        '배경(#F2F4F6)과 대비되는 순백색(#FFFFFF) 카드에 부드러운 다중 그림자(elevation)를 부여합니다.',
        '핵심 키워드 태그(‘제주 2박’)는 #3182F6 컬러를 활용해 시선 집중도를 높입니다.',
        '카드 내부 여백은 최소 16px 이상 확보해 프리미엄한 여백감을 유지하세요.',
      ],
      caution: '카드 내부에 또 다른 그림자 카드를 중첩하면 계층 구조가 모호해지므로 1단계 카드만 유지합니다.',
    },
    reactCode: `import React, { useState } from 'react';

interface PackageCard {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  price: string;
}

const PACKAGES: PackageCard[] = [
  {
    id: 'jeju',
    tag: '제주 2박',
    title: '서귀포 오션뷰 풀빌라 + 렌터카',
    subtitle: '조식 2인 포함 · 즉시 확정',
    price: '289,000원~',
  },
  {
    id: 'osaka',
    tag: '오사카 3박',
    title: '난바역 도보 3분 프리미엄 호텔',
    subtitle: '왕복 항공 포함 · 수하물 15kg',
    price: '459,000원~',
  },
];

export function TravelPackageCards() {
  const [selected, setSelected] = useState<string>('jeju');

  return (
    <div className="flex w-full max-w-md flex-col gap-3 rounded-2xl bg-[#F2F4F6] p-4">
      {PACKAGES.map((pkg) => {
        const isActive = pkg.id === selected;
        return (
          <button
            key={pkg.id}
            type="button"
            onClick={() => setSelected(pkg.id)}
            className={\`flex w-full items-center gap-4 rounded-2xl bg-white p-4 text-left transition-all \${
              isActive
                ? 'ring-2 ring-[#3182F6] shadow-[0_10px_28px_rgba(49,130,246,0.14)]'
                : 'shadow-[0_4px_16px_rgba(25,31,40,0.06)] hover:-translate-y-0.5'
            }\`}
          >
            <div
              className={\`flex h-16 w-16 shrink-0 items-center justify-center rounded-xl text-xs font-bold \${
                isActive ? 'bg-[#3182F6] text-white' : 'bg-[#E8F3FF] text-[#3182F6]'
              }\`}
            >
              {pkg.id === 'jeju' ? 'JEJU' : 'OSA'}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-[#3182F6]">{pkg.tag}</p>
              <p className="mt-0.5 truncate text-sm font-bold text-[#191F28]">{pkg.title}</p>
              <p className="mt-0.5 text-xs text-[#8B95A1]">{pkg.subtitle}</p>
              <p className="mt-1.5 text-sm font-extrabold tabular-nums text-[#191F28]">{pkg.price}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
}`,
    htmlCode: `<!doctype html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", sans-serif; background: #F2F4F6; padding: 20px; }
    .stack { max-width: 380px; display: flex; flex-direction: column; gap: 12px; }
    .card { display: flex; align-items: center; gap: 16px; padding: 16px; border-radius: 18px; background: #fff; border: 2px solid transparent; box-shadow: 0 6px 20px rgba(25,31,40,0.06); cursor: pointer; text-align: left; transition: all 0.2s; }
    .card.active { border-color: #3182F6; box-shadow: 0 12px 26px rgba(49,130,246,0.16); }
    .thumb { width: 64px; height: 64px; border-radius: 14px; background: #E8F3FF; color: #3182F6; font-weight: 800; font-size: 12px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
    .card.active .thumb { background: #3182F6; color: #fff; }
    .tag { font-size: 12px; font-weight: 700; color: #3182F6; }
    .title { font-size: 14px; font-weight: 700; color: #191F28; margin: 3px 0; }
    .sub { font-size: 12px; color: #8B95A1; }
    .price { font-size: 14px; font-weight: 800; color: #191F28; margin-top: 6px; }
  </style>
</head>
<body>
  <div class="stack" id="cards"></div>
  <script>
    const list = [
      { id: 'jeju', code: 'JEJU', tag: '제주 2박', title: '서귀포 오션뷰 풀빌라 + 렌터카', sub: '조식 2인 포함 · 즉시 확정', price: '289,000원~' },
      { id: 'osaka', code: 'OSA', tag: '오사카 3박', title: '난바역 도보 3분 프리미엄 호텔', sub: '왕복 항공 포함 · 수하물 15kg', price: '459,000원~' }
    ];
    let current = 'jeju';
    const root = document.getElementById('cards');
    function render() {
      root.innerHTML = list.map(c => \`
        <button class="card \${c.id === current ? 'active' : ''}" onclick="choose('\${c.id}')">
          <div class="thumb">\${c.code}</div>
          <div>
            <div class="tag">\${c.tag}</div>
            <div class="title">\${c.title}</div>
            <div class="sub">\${c.sub}</div>
            <div class="price">\${c.price}</div>
          </div>
        </button>
      \`).join('');
    }
    window.choose = (id) => { current = id; render(); };
    render();
  </script>
</body>
</html>`,
  },
  {
    id: 'carousel',
    number: '04',
    titleKo: '캐러셀',
    titleEn: 'Carousel',
    category: '상품 탐색',
    summary: '제한된 화면 너비 안에서 좌우 스와이프로 여러 프로모션·추천 상품을 탐색합니다.',
    interactionHint: '카드를 좌우로 스크롤하거나 하단 인디케이터/화살표를 눌러 슬라이드를 이동해 보세요.',
    uxGuide: {
      whenToUse: '메인 프로모션 배너, ‘지금 뜨는 타임딜’, ‘함께 보면 좋은 상품’ 등 수평 큐레이션 영역에 사용합니다.',
      keyPoints: [
        '다음 카드의 일부(15~20%)를 살짝 노출(Peeking)해 가로 스크롤이 가능함을 자연스럽게 암시하세요.',
        'CSS Scroll Snap(snap-x snap-mandatory)을 사용하면 외부 라이브러리 없이도 네이티브 앱처럼 부드럽게 멈춥니다.',
        '현재 활성 페이지 인디케이터는 원형 도트 대신 긴 알약(pill) 형태로 확장하면 시인성이 높습니다.',
      ],
      caution: '자동 재생(Autoplay) 시 사용자가 내용을 읽는 도중 넘어가지 않도록 터치/호버 중에는 일시 정지해야 합니다.',
    },
    reactCode: `import React, { useRef, useState } from 'react';

const SLIDES = [
  { id: 0, badge: '오늘만 특가', title: '가을 아우터 최대 40%', desc: '트렌치·자켓 단독 쿠폰팩', price: '59,000원~' },
  { id: 1, badge: '브랜드 위크', title: '무선 노이즈캔슬링 헤드폰', desc: '카드 즉시할인 15%', price: '198,000원' },
  { id: 2, badge: '라이브 단독', title: '프리미엄 에스프레소 머신', desc: '원두 2팩 사은품 증정', price: '329,000원' },
  { id: 3, badge: '신규 런칭', title: '스웨이드 미니 크로스백', desc: '전 색상 무료배송', price: '74,000원' },
];

export function PromoCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const cardWidth = 208; // w-48 (192px) + gap-4 (16px)
    const idx = Math.round(el.scrollLeft / cardWidth);
    setActiveIndex(Math.min(SLIDES.length - 1, Math.max(0, idx)));
  };

  const scrollToSlide = (index: number) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({ left: index * 208, behavior: 'smooth' });
    setActiveIndex(index);
  };

  return (
    <div className="w-full max-w-md rounded-2xl border border-[#E5E8EB] bg-white p-4">
      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {SLIDES.map((slide, idx) => {
          const isCurrent = idx === activeIndex;
          return (
            <div
              key={slide.id}
              onClick={() => scrollToSlide(idx)}
              className={\`w-48 shrink-0 cursor-pointer snap-start rounded-2xl p-4 transition-all \${
                isCurrent
                  ? 'bg-[#3182F6] text-white shadow-md shadow-[#3182F6]/20'
                  : 'bg-[#E8F3FF]/80 text-[#191F28]'
              }\`}
            >
              <span
                className={\`inline-block rounded-full px-2 py-0.5 text-[10px] font-bold \${
                  isCurrent ? 'bg-white/20 text-white' : 'bg-white text-[#3182F6]'
                }\`}
              >
                {slide.badge}
              </span>
              <h4 className="mt-3 text-sm font-bold leading-snug">{slide.title}</h4>
              <p className={\`mt-1 text-xs \${isCurrent ? 'text-white/80' : 'text-[#4E5968]'}\`}>
                {slide.desc}
              </p>
              <p className="mt-4 text-sm font-extrabold tabular-nums">{slide.price}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-3 flex items-center justify-center gap-1.5">
        {SLIDES.map((slide, idx) => (
          <button
            key={slide.id}
            type="button"
            aria-label={\`슬라이드 \${idx + 1}\`}
            onClick={() => scrollToSlide(idx)}
            className={\`h-1.5 rounded-full transition-all \${
              idx === activeIndex ? 'w-5 bg-[#3182F6]' : 'w-1.5 bg-[#D1D6DB]'
            }\`}
          />
        ))}
      </div>
    </div>
  );
}`,
    htmlCode: `<!doctype html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", sans-serif; background: #F2F4F6; padding: 20px; }
    .box { max-width: 360px; background: #fff; border-radius: 18px; padding: 16px; border: 1px solid #E5E8EB; }
    .track { display: flex; gap: 12px; overflow-x: auto; scroll-snap-type: x mandatory; scrollbar-width: none; padding-bottom: 8px; }
    .track::-webkit-scrollbar { display: none; }
    .slide { flex: 0 0 184px; scroll-snap-align: start; border-radius: 16px; padding: 16px; background: #EAF2FE; color: #191F28; cursor: pointer; transition: all 0.2s; }
    .slide.active { background: #3182F6; color: #fff; }
    .badge { display: inline-block; font-size: 10px; font-weight: 700; padding: 3px 8px; border-radius: 999px; background: #fff; color: #3182F6; }
    .slide.active .badge { background: rgba(255,255,255,0.2); color: #fff; }
    .dots { display: flex; justify-content: center; gap: 6px; margin-top: 10px; }
    .dot { width: 6px; height: 6px; border-radius: 999px; border: 0; background: #D1D6DB; cursor: pointer; transition: all 0.2s; padding: 0; }
    .dot.active { width: 20px; background: #3182F6; }
  </style>
</head>
<body>
  <div class="box">
    <div class="track" id="track"></div>
    <div class="dots" id="dots"></div>
  </div>
  <script>
    const slides = [
      { badge: '오늘만 특가', title: '가을 아우터 40%', price: '59,000원~' },
      { badge: '브랜드 위크', title: '노이즈캔슬링 헤드폰', price: '198,000원' },
      { badge: '라이브 단독', title: '에스프레소 머신', price: '329,000원' },
      { badge: '신규 런칭', title: '스웨이드 미니백', price: '74,000원' },
    ];
    let current = 0;
    const track = document.getElementById('track');
    const dots = document.getElementById('dots');
    function render() {
      track.innerHTML = slides.map((s, i) => \`
        <div class="slide \${i === current ? 'active' : ''}" onclick="go(\${i})">
          <span class="badge">\${s.badge}</span>
          <h4 style="margin:12px 0 6px;font-size:14px;">\${s.title}</h4>
          <strong style="font-size:14px;">\${s.price}</strong>
        </div>
      \`).join('');
      dots.innerHTML = slides.map((_, i) => \`<button class="dot \${i === current ? 'active' : ''}" onclick="go(\${i})"></button>\`).join('');
    }
    window.go = (i) => { current = i; render(); track.scrollTo({ left: i * 196, behavior: 'smooth' }); };
    render();
  </script>
</body>
</html>`,
  },
  {
    id: 'table',
    number: '05',
    titleKo: '테이블',
    titleEn: 'Table',
    category: '주문/결제',
    summary: '상품명·수량·금액 등 정형화된 주문 데이터를 열(Column) 단위로 정교하게 정렬·비교합니다.',
    interactionHint: '헤더(수량/금액)를 눌러 정렬하거나 행을 선택해 강조 표시를 확인해 보세요.',
    uxGuide: {
      whenToUse: '주문 확인서, 영수증 내역, 다중 옵션 견적 비교, 배송비/할인 정산 내역에 사용합니다.',
      keyPoints: [
        '문자열(상품명)은 좌측 정렬, 수량/금액 등 숫자 열은 우측 정렬과 tabular-nums를 적용합니다.',
        '테이블 헤더는 연한 회색 배경(#F2F4F6)과 작은 보조 텍스트(#8B95A1)로 본문 행과 위계를 나눕니다.',
        '특정 주문 항목 선택 시 행 전체에 #E8F3FF/70 하이라이트를 적용해 실수를 방지합니다.',
      ],
      caution: '모바일 화면(360px 기준)에서는 열을 최대 3~4개 이하로 제한해야 가로 스크롤 없이 깔끔하게 보입니다.',
    },
    reactCode: `import React, { useState } from 'react';

interface OrderRow {
  id: number;
  name: string;
  qty: number;
  amount: number;
}

const INITIAL_ROWS: OrderRow[] = [
  { id: 1, name: '니트', qty: 1, amount: 39000 },
  { id: 2, name: '머그', qty: 2, amount: 24000 },
  { id: 3, name: '양말', qty: 3, amount: 9000 },
];

export function OrderSummaryTable() {
  const [selectedId, setSelectedId] = useState<number>(3);
  const [sortBy, setSortBy] = useState<'qty' | 'amount' | null>(null);
  const [asc, setAsc] = useState(true);

  const sortedRows = [...INITIAL_ROWS].sort((a, b) => {
    if (!sortBy) return a.id - b.id;
    return asc ? a[sortBy] - b[sortBy] : b[sortBy] - a[sortBy];
  });

  const handleSort = (key: 'qty' | 'amount') => {
    if (sortBy === key) {
      setAsc(!asc);
    } else {
      setSortBy(key);
      setAsc(false);
    }
  };

  return (
    <div className="w-full max-w-md overflow-hidden rounded-2xl border border-[#E5E8EB] bg-white">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-[#F2F4F6] text-xs font-semibold text-[#6B7684]">
            <th className="px-4 py-3 text-left">상품</th>
            <th className="px-4 py-3 text-right">
              <button type="button" onClick={() => handleSort('qty')} className="hover:text-[#191F28]">
                수량 {sortBy === 'qty' ? (asc ? '↑' : '↓') : ''}
              </button>
            </th>
            <th className="px-4 py-3 text-right">
              <button type="button" onClick={() => handleSort('amount')} className="hover:text-[#191F28]">
                금액 {sortBy === 'amount' ? (asc ? '↑' : '↓') : ''}
              </button>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#F2F4F6]">
          {sortedRows.map((row) => {
            const isSelected = row.id === selectedId;
            return (
              <tr
                key={row.id}
                onClick={() => setSelectedId(row.id)}
                className={\`cursor-pointer transition-colors \${
                  isSelected ? 'bg-[#E8F3FF]/80 font-semibold text-[#191F28]' : 'hover:bg-[#F9FAFB]'
                }\`}
              >
                <td className="px-4 py-3.5 text-left font-medium text-[#191F28]">{row.name}</td>
                <td className="px-4 py-3.5 text-right tabular-nums text-[#4E5968]">{row.qty}</td>
                <td className="px-4 py-3.5 text-right font-bold tabular-nums text-[#191F28]">
                  {row.amount.toLocaleString('ko-KR')}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}`,
    htmlCode: `<!doctype html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", sans-serif; background: #F2F4F6; padding: 20px; }
    .table-card { max-width: 380px; background: #fff; border-radius: 16px; border: 1px solid #E5E8EB; overflow: hidden; }
    table { width: 100%; border-collapse: collapse; font-size: 14px; }
    thead th { background: #F2F4F6; color: #6B7684; font-size: 12px; font-weight: 600; padding: 12px 16px; }
    tbody td { padding: 14px 16px; border-top: 1px solid #F2F4F6; color: #191F28; font-variant-numeric: tabular-nums; }
    tbody tr { cursor: pointer; transition: background 0.15s; }
    tbody tr.active { background: #E8F3FF; }
    .left { text-align: left; }
    .right { text-align: right; }
  </style>
</head>
<body>
  <div class="table-card">
    <table>
      <thead>
        <tr>
          <th class="left">상품</th>
          <th class="right">수량</th>
          <th class="right">금액</th>
        </tr>
      </thead>
      <tbody id="rows"></tbody>
    </table>
  </div>
  <script>
    const data = [
      { id: 1, name: '니트', qty: 1, amount: '39,000' },
      { id: 2, name: '머그', qty: 2, amount: '24,000' },
      { id: 3, name: '양말', qty: 3, amount: '9,000' },
    ];
    let selected = 3;
    const tbody = document.getElementById('rows');
    function render() {
      tbody.innerHTML = data.map(r => \`
        <tr class="\${r.id === selected ? 'active' : ''}" onclick="pick(\${r.id})">
          <td class="left">\${r.name}</td>
          <td class="right">\${r.qty}</td>
          <td class="right"><strong>\${r.amount}</strong></td>
        </tr>
      \`).join('');
    }
    window.pick = (id) => { selected = id; render(); };
    render();
  </script>
</body>
</html>`,
  },
  {
    id: 'timeline',
    number: '06',
    titleKo: '타임라인',
    titleEn: 'Timeline',
    category: '주문/결제',
    summary: '주문 완료부터 도착까지의 진행 상태를 수직 연결선과 단계별 마커로 명확히 전달합니다.',
    interactionHint: '각 배송 단계를 클릭해 현재 배송 진행 상태를 시뮬레이션해 보세요.',
    uxGuide: {
      whenToUse: '실시간 배송 추적, 반품/교환 회수 현황, 예약 확정 프로세스 등 시간순 상태 변화 안내에 사용합니다.',
      keyPoints: [
        '완료·진행 중 단계는 #3182F6 블루 라인과 도트로, 미도달 단계는 #E5E8EB 회색으로 명확히 대비시킵니다.',
        '현재 진행 단계에는 은은한 펄스 링이나 강조 텍스트를 두어 사용자가 지금 어느 지점인지 1초 만에 인지하게 합니다.',
        '단계명 옆에 시각/장소 보조 정보를 배치하면 고객센터 문의를 크게 줄일 수 있습니다.',
      ],
      caution: '5단계 이상 지나치게 세분화하면 스크롤이 길어지므로 핵심 4단계(주문→준비→배송→도착)로 요약하세요.',
    },
    reactCode: `import React, { useState } from 'react';

const STEPS = [
  { label: '주문 완료', detail: '결제가 정상 승인되었습니다 · 14:10' },
  { label: '상품 준비', detail: '물류센터에서 상품을 포장 중입니다 · 16:40' },
  { label: '배송 중', detail: '강남터미널에서 고객님께 이동 중입니다 · 08:25' },
  { label: '도착', detail: '문 앞 배송 완료 예정' },
];

export function DeliveryTimeline() {
  const [currentStep, setCurrentStep] = useState(2);

  return (
    <div className="w-full max-w-md rounded-2xl border border-[#E5E8EB] bg-white p-5">
      <div className="space-y-0">
        {STEPS.map((step, index) => {
          const isCompleted = index <= currentStep;
          const isCurrent = index === currentStep;
          const isLast = index === STEPS.length - 1;

          return (
            <button
              key={step.label}
              type="button"
              onClick={() => setCurrentStep(index)}
              className="group flex w-full items-stretch gap-3.5 text-left"
            >
              <div className="flex flex-col items-center">
                <span
                  className={\`mt-1 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full transition-all \${
                    isCompleted
                      ? isCurrent
                        ? 'bg-[#3182F6] ring-4 ring-[#E8F3FF]'
                        : 'bg-[#3182F6]'
                      : 'bg-[#D1D6DB]'
                  }\`}
                />
                {!isLast && (
                  <span
                    className={\`my-1 w-0.5 flex-1 min-h-8 transition-colors \${
                      index < currentStep ? 'bg-[#3182F6]' : 'bg-[#E5E8EB]'
                    }\`}
                  />
                )}
              </div>

              <div className="pb-6">
                <p
                  className={\`text-sm font-bold transition-colors \${
                    isCompleted ? 'text-[#191F28]' : 'text-[#8B95A1]'
                  }\`}
                >
                  {step.label}
                  {isCurrent && (
                    <span className="ml-2 rounded-md bg-[#E8F3FF] px-1.5 py-0.5 text-[10px] font-bold text-[#3182F6]">
                      현재 상태
                    </span>
                  )}
                </p>
                <p className="mt-0.5 text-xs text-[#6B7684]">{step.detail}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}`,
    htmlCode: `<!doctype html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", sans-serif; background: #F2F4F6; padding: 20px; }
    .card { max-width: 360px; background: #fff; border-radius: 18px; padding: 20px; border: 1px solid #E5E8EB; }
    .step { display: flex; gap: 14px; cursor: pointer; }
    .rail { display: flex; flex-direction: column; align-items: center; }
    .dot { width: 12px; height: 12px; border-radius: 999px; background: #D1D6DB; margin-top: 4px; }
    .step.done .dot { background: #3182F6; }
    .step.current .dot { box-shadow: 0 0 0 5px #E8F3FF; }
    .line { width: 2px; flex: 1; min-height: 30px; background: #E5E8EB; margin: 4px 0; }
    .step.linked .line { background: #3182F6; }
    .content { padding-bottom: 20px; }
    .title { font-size: 14px; font-weight: 700; color: #8B95A1; }
    .step.done .title { color: #191F28; }
    .desc { font-size: 12px; color: #6B7684; margin-top: 2px; }
  </style>
</head>
<body>
  <div class="card" id="timeline"></div>
  <script>
    const steps = [
      { label: '주문 완료', desc: '결제가 정상 승인되었습니다 · 14:10' },
      { label: '상품 준비', desc: '물류센터에서 포장 중입니다 · 16:40' },
      { label: '배송 중', desc: '배송 기사님이 이동 중입니다 · 08:25' },
      { label: '도착', desc: '문 앞 배송 완료 예정' },
    ];
    let current = 2;
    const root = document.getElementById('timeline');
    function render() {
      root.innerHTML = steps.map((s, i) => \`
        <div class="step \${i <= current ? 'done' : ''} \${i === current ? 'current' : ''} \${i < current ? 'linked' : ''}" onclick="setStep(\${i})">
          <div class="rail">
            <div class="dot"></div>
            \${i < steps.length - 1 ? '<div class="line"></div>' : ''}
          </div>
          <div class="content">
            <div class="title">\${s.label}</div>
            <div class="desc">\${s.desc}</div>
          </div>
        </div>
      \`).join('');
    }
    window.setStep = (i) => { current = i; render(); };
    render();
  </script>
</body>
</html>`,
  },
  {
    id: 'accordion',
    number: '07',
    titleKo: '아코디언',
    titleEn: 'Accordion',
    category: '고객 지원',
    summary: '배송·교환/반품·결제수단 등 긴 정책 정보를 접고 펼쳐 화면 피로도를 줄입니다.',
    interactionHint: '각 정책 항목을 클릭해 부드럽게 열리고 닫히는 인터랙션을 확인해 보세요.',
    uxGuide: {
      whenToUse: '상품 상세 페이지 하단의 배송 안내, 교환/반품 규정, 결제 수단별 혜택, FAQ 목록에 사용합니다.',
      keyPoints: [
        '열려 있는 항목 헤더에는 #E8F3FF 연한 블루 배경을 적용해 현재 읽고 있는 섹션을 강조합니다.',
        '우측 화살표(Chevron)를 180도 회전시켜 열림/닫힘 상태를 직관적으로 보여주세요.',
        '항목 제목은 ‘배송 안내’, ‘교환, 반품’처럼 2~4단어로 간결하게 작성합니다.',
      ],
      caution: '필수 약관 동의처럼 반드시 읽어야 하는 경고 문구는 아코디언 안에 숨기지 않는 것이 좋습니다.',
    },
    reactCode: `import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQ_ITEMS = [
  {
    id: 'shipping',
    title: '배송 안내',
    body: '평일 오후 2시 이전 주문 건은 당일 출고되며, 평균 1~2영업일 내 수령 가능합니다. 도서산간 지역은 추가 배송비가 발생할 수 있습니다.',
  },
  {
    id: 'refund',
    title: '교환, 반품',
    body: '상품 수령 후 7일 이내에 앱 내 주문내역에서 간편하게 교환 및 반품 접수가 가능합니다. 단순 변심 시 왕복 배송비 6,000원이 차감됩니다.',
  },
  {
    id: 'payment',
    title: '결제 수단',
    body: '신용·체크카드, 토스페이, 네이버페이, 계좌이체를 지원하며 5만 원 이상 결제 시 무이자 할부 혜택을 제공합니다.',
  },
];

export function PolicyAccordion() {
  const [openId, setOpenId] = useState<string | null>('refund');

  return (
    <div className="flex w-full max-w-md flex-col gap-2.5">
      {FAQ_ITEMS.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div
            key={item.id}
            className="overflow-hidden rounded-2xl border border-[#E5E8EB] bg-white transition-shadow"
          >
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : item.id)}
              className={\`flex w-full items-center justify-between px-4 py-3.5 text-left text-sm font-bold transition-colors \${
                isOpen ? 'bg-[#E8F3FF]/80 text-[#1B64DA]' : 'bg-[#F9FAFB] text-[#191F28] hover:bg-[#F2F4F6]'
              }\`}
            >
              <span>{item.title}</span>
              <ChevronDown
                className={\`h-4 w-4 transition-transform duration-200 \${
                  isOpen ? 'rotate-180 text-[#3182F6]' : 'text-[#8B95A1]'
                }\`}
              />
            </button>
            {isOpen && (
              <div className="border-t border-[#E5E8EB]/70 bg-white px-4 py-3.5 text-xs leading-relaxed text-[#4E5968]">
                {item.body}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}`,
    htmlCode: `<!doctype html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", sans-serif; background: #F2F4F6; padding: 20px; }
    .acc-list { max-width: 380px; display: flex; flex-direction: column; gap: 10px; }
    .acc-item { background: #fff; border-radius: 16px; border: 1px solid #E5E8EB; overflow: hidden; }
    .acc-head { width: 100%; border: 0; background: #F9FAFB; padding: 14px 16px; display: flex; justify-content: space-between; align-items: center; font-size: 14px; font-weight: 700; color: #191F28; cursor: pointer; }
    .acc-item.open .acc-head { background: #E8F3FF; color: #1B64DA; }
    .acc-body { display: none; padding: 14px 16px; font-size: 12.5px; line-height: 1.6; color: #4E5968; border-top: 1px solid #F2F4F6; }
    .acc-item.open .acc-body { display: block; }
  </style>
</head>
<body>
  <div class="acc-list" id="acc"></div>
  <script>
    const items = [
      { id: 'ship', title: '배송 안내', body: '평일 오후 2시 이전 주문 시 당일 출고되며 평균 1~2일 내 도착합니다.' },
      { id: 'refund', title: '교환, 반품', body: '수령 후 7일 이내 주문내역에서 간편하게 접수할 수 있습니다.' },
      { id: 'pay', title: '결제 수단', body: '카드, 토스페이, 네이버페이, 계좌이체를 모두 지원합니다.' },
    ];
    let openId = 'refund';
    const root = document.getElementById('acc');
    function render() {
      root.innerHTML = items.map(it => \`
        <div class="acc-item \${it.id === openId ? 'open' : ''}">
          <button class="acc-head" onclick="toggle('\${it.id}')">
            <span>\${it.title}</span><span>\${it.id === openId ? '▲' : '▼'}</span>
          </button>
          <div class="acc-body">\${it.body}</div>
        </div>
      \`).join('');
    }
    window.toggle = (id) => { openId = openId === id ? null : id; render(); };
    render();
  </script>
</body>
</html>`,
  },
  {
    id: 'masonry',
    number: '08',
    titleKo: '메이슨리',
    titleEn: 'Masonry',
    category: '기획전',
    summary: '높이가 서로 다른 카드를 빈틈없이 맞물리게 배치해 시각적 탐색의 즐거움을 높입니다.',
    interactionHint: '서로 다른 비율의 스타일링 카드를 클릭해 선택/좋아요 상태를 전환해 보세요.',
    uxGuide: {
      whenToUse: '패션 룩북, 홈 인테리어 스타일링 피드, 유저 리뷰 포토 모아보기 등 이미지 비율이 다양한 콘텐츠에 적합합니다.',
      keyPoints: [
        '2열 Flex 컬럼 분배(짝수/홀수 인덱스)를 쓰면 외부 라이브러리 없이도 순서가 안정적인 메이슨리를 구현할 수 있습니다.',
        '각 카드의 높이를 의도적으로 다르게 구성해 단조로운 그리드 대비 체류 시간을 늘립니다.',
        '핵심 프로모션 카드 1~2개에만 #3182F6 블루 배경을 적용하면 시선 앵커 역할을 합니다.',
      ],
      caution: '실시간 가격 비교나 정확한 순위 파악이 목적인 화면에는 높이가 불규칙한 메이슨리를 피하세요.',
    },
    reactCode: `import React, { useState } from 'react';

interface LookbookItem {
  id: number;
  title: string;
  tag: string;
  price: string;
  heightClass: string;
}

const LOOKBOOK: LookbookItem[] = [
  { id: 1, title: '가을 미니멀 오피스룩', tag: '코디 세트', price: '128,000원', heightClass: 'h-44' },
  { id: 2, title: '우드 세라믹 화병', tag: '리빙', price: '34,000원', heightClass: 'h-28' },
  { id: 3, title: '북유럽 린넨 커튼', tag: '인테리어', price: '62,000원', heightClass: 'h-32' },
  { id: 4, title: '오늘의 베스트 스타일', tag: 'MD 추천', price: '89,000원', heightClass: 'h-40' },
];

export function StyleMasonry() {
  const [activeId, setActiveId] = useState<number>(4);
  const leftCol = LOOKBOOK.filter((_, idx) => idx % 2 === 0);
  const rightCol = LOOKBOOK.filter((_, idx) => idx % 2 === 1);

  const renderCard = (item: LookbookItem) => {
    const isActive = item.id === activeId;
    return (
      <button
        key={item.id}
        type="button"
        onClick={() => setActiveId(item.id)}
        className={\`flex w-full flex-col justify-between rounded-2xl p-3.5 text-left transition-all \${item.heightClass} \${
          isActive
            ? 'bg-[#3182F6] text-white shadow-md shadow-[#3182F6]/25'
            : 'bg-[#E8F3FF]/75 text-[#191F28] hover:bg-[#E8F3FF]'
        }\`}
      >
        <span
          className={\`self-start rounded-full px-2 py-0.5 text-[10px] font-bold \${
            isActive ? 'bg-white/20 text-white' : 'bg-white text-[#3182F6]'
          }\`}
        >
          {item.tag}
        </span>
        <div>
          <p className="text-xs font-bold leading-snug">{item.title}</p>
          <p className={\`mt-1 text-xs font-semibold tabular-nums \${isActive ? 'text-white/90' : 'text-[#4E5968]'}\`}>
            {item.price}
          </p>
        </div>
      </button>
    );
  };

  return (
    <div className="grid w-full max-w-md grid-cols-2 items-start gap-2.5 rounded-2xl border border-[#E5E8EB] bg-white p-3.5">
      <div className="flex flex-col gap-2.5">{leftCol.map(renderCard)}</div>
      <div className="flex flex-col gap-2.5">{rightCol.map(renderCard)}</div>
    </div>
  );
}`,
    htmlCode: `<!doctype html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", sans-serif; background: #F2F4F6; padding: 20px; }
    .masonry { max-width: 360px; background: #fff; border-radius: 18px; padding: 14px; border: 1px solid #E5E8EB; display: grid; grid-template-columns: 1fr 1fr; gap: 10px; align-items: start; }
    .col { display: flex; flex-direction: column; gap: 10px; }
    .pin { border: 0; border-radius: 14px; padding: 14px; background: #EAF2FE; color: #191F28; display: flex; flex-direction: column; justify-content: space-between; text-align: left; cursor: pointer; }
    .pin.active { background: #3182F6; color: #fff; }
    .pin.tall { height: 168px; }
    .pin.short { height: 112px; }
    .pin.med { height: 136px; }
    .tag { font-size: 10px; font-weight: 700; padding: 3px 8px; border-radius: 999px; background: #fff; color: #3182F6; align-self: flex-start; }
    .pin.active .tag { background: rgba(255,255,255,0.2); color: #fff; }
  </style>
</head>
<body>
  <div class="masonry">
    <div class="col">
      <button class="pin tall" onclick="pick(this)"><span class="tag">코디 세트</span><div><strong>미니멀 오피스룩</strong><div style="font-size:12px;margin-top:4px;">128,000원</div></div></button>
      <button class="pin med" onclick="pick(this)"><span class="tag">인테리어</span><div><strong>린넨 커튼</strong><div style="font-size:12px;margin-top:4px;">62,000원</div></div></button>
    </div>
    <div class="col">
      <button class="pin short" onclick="pick(this)"><span class="tag">리빙</span><div><strong>세라믹 화병</strong><div style="font-size:12px;margin-top:4px;">34,000원</div></div></button>
      <button class="pin tall active" onclick="pick(this)"><span class="tag">MD 추천</span><div><strong>베스트 스타일</strong><div style="font-size:12px;margin-top:4px;">89,000원</div></div></button>
    </div>
  </div>
  <script>
    window.pick = (el) => {
      document.querySelectorAll('.pin').forEach(p => p.classList.remove('active'));
      el.classList.add('active');
    };
  </script>
</body>
</html>`,
  },
  {
    id: 'infinite-scroll',
    number: '09',
    titleKo: '무한 스크롤',
    titleEn: 'Infinite scroll',
    category: '상품 탐색',
    summary: '스크롤이 하단에 닿으면 다음 상품 묶음을 자동으로 불러와 끊김 없는 쇼핑 흐름을 만듭니다.',
    interactionHint: '목록을 맨 아래까지 스크롤하거나 ‘더 불러오기’로 비동기 로딩 스피너를 테스트해 보세요.',
    uxGuide: {
      whenToUse: '‘오늘의 발견’, 실시간 신상품 피드, 끝없는 탐색이 핵심인 큐레이션 쇼핑 홈에 적합합니다.',
      keyPoints: [
        'IntersectionObserver로 하단 센티넬(Sentinel) 요소를 감지하면 스크롤 이벤트 부하 없이 부드럽게 동작합니다.',
        '로딩 중에는 #3182F6 컬러의 원형 스피너와 함께 명확한 로딩 인디케이터를 제공합니다.',
        '마지막 데이터에 도달하면 더 이상 요청하지 않도록 종료 안내 문구를 표시합니다.',
      ],
      caution: '푸터(Footer)에 사업자 정보나 고객센터 링크가 있다면 무한 스크롤 대신 ‘더보기’ 버튼 패턴을 고려해야 합니다.',
    },
    reactCode: `import React, { useEffect, useRef, useState } from 'react';

interface FeedItem {
  id: number;
  title: string;
  price: number;
}

const createBatch = (start: number, count: number): FeedItem[] =>
  Array.from({ length: count }, (_, i) => ({
    id: start + i,
    title: \`데일리 신상 추천 아이템 #\${start + i}\`,
    price: 14900 + ((start + i) % 5) * 4000,
  }));

export function InfiniteProductFeed() {
  const [items, setItems] = useState<FeedItem[]>(() => createBatch(1, 6));
  const [loading, setLoading] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = sentinelRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && items.length < 24) {
          setLoading(true);
          setTimeout(() => {
            setItems((prev) => [...prev, ...createBatch(prev.length + 1, 4)]);
            setLoading(false);
          }, 700);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [loading, items.length]);

  return (
    <div className="h-80 w-full max-w-md overflow-y-auto rounded-2xl border border-[#E5E8EB] bg-white p-3">
      <ul className="divide-y divide-[#F2F4F6]">
        {items.map((item) => (
          <li key={item.id} className="flex items-center gap-3 py-3">
            <div className="h-10 w-10 shrink-0 rounded-xl bg-[#E8F3FF]" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-[#191F28]">{item.title}</p>
              <p className="text-xs text-[#8B95A1]">무료배송 · 오늘 출발</p>
            </div>
            <span className="text-xs font-bold tabular-nums text-[#191F28]">
              {item.price.toLocaleString('ko-KR')}원
            </span>
          </li>
        ))}
      </ul>

      <div ref={sentinelRef} className="flex items-center justify-center py-4">
        {loading ? (
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#E5E8EB] border-t-[#3182F6]" />
        ) : items.length >= 24 ? (
          <span className="text-xs text-[#8B95A1]">모든 추천 상품을 확인했습니다</span>
        ) : (
          <span className="text-xs text-[#8B95A1]">아래로 스크롤하여 더 보기</span>
        )}
      </div>
    </div>
  );
}`,
    htmlCode: `<!doctype html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", sans-serif; background: #F2F4F6; padding: 20px; }
    .feed { max-width: 360px; height: 280px; overflow-y: auto; background: #fff; border-radius: 18px; border: 1px solid #E5E8EB; padding: 12px 16px; }
    .row { display: flex; align-items: center; gap: 12px; padding: 11px 0; border-bottom: 1px solid #F2F4F6; }
    .thumb { width: 38px; height: 38px; border-radius: 10px; background: #E8F3FF; flex-shrink: 0; }
    .title { font-size: 13px; font-weight: 600; color: #191F28; flex: 1; }
    .price { font-size: 12px; font-weight: 700; color: #191F28; }
    .loader { display: flex; justify-content: center; padding: 14px 0; }
    .spinner { width: 20px; height: 20px; border: 2px solid #E5E8EB; border-top-color: #3182F6; border-radius: 50%; animation: spin 0.8s linear infinite; }
    @keyframes spin { to { transform: rotate(360deg); } }
  </style>
</head>
<body>
  <div class="feed" id="feed">
    <div id="list"></div>
    <div class="loader" id="sentinel"><div class="spinner"></div></div>
  </div>
  <script>
    let count = 0;
    const list = document.getElementById('list');
    const sentinel = document.getElementById('sentinel');
    function appendBatch(n) {
      for (let i = 0; i < n; i++) {
        count++;
        const div = document.createElement('div');
        div.className = 'row';
        div.innerHTML = \`<div class="thumb"></div><div class="title">데일리 신상 아이템 #\${count}</div><div class="price">\${(14900 + (count % 5) * 3000).toLocaleString()}원</div>\`;
        list.appendChild(div);
      }
    }
    appendBatch(6);
    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && count < 20) {
        setTimeout(() => appendBatch(4), 600);
      } else if (count >= 20) {
        sentinel.innerHTML = '<span style="font-size:12px;color:#8B95A1;">마지막 상품입니다</span>';
      }
    }, { root: document.getElementById('feed') });
    io.observe(sentinel);
  </script>
</body>
</html>`,
  },
];
