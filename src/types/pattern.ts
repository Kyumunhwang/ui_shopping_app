export type ShopPatternId =
  | 'list'
  | 'grid'
  | 'card'
  | 'carousel'
  | 'table'
  | 'timeline'
  | 'accordion'
  | 'masonry'
  | 'infinite-scroll';

export interface PatternUxGuide {
  whenToUse: string;
  keyPoints: string[];
  caution: string;
}

export interface ShopPatternMeta {
  id: ShopPatternId;
  number: string;
  titleKo: string;
  titleEn: string;
  category: string;
  summary: string;
  interactionHint: string;
  uxGuide: PatternUxGuide;
  reactCode: string;
  htmlCode: string;
}
