import React from 'react';
import { ShopPatternId } from '../../types/pattern';
import { ListDemo } from './demos/ListDemo';
import { GridDemo } from './demos/GridDemo';
import { CardDemo } from './demos/CardDemo';
import { CarouselDemo } from './demos/CarouselDemo';
import { TableDemo } from './demos/TableDemo';
import { TimelineDemo } from './demos/TimelineDemo';
import { AccordionDemo } from './demos/AccordionDemo';
import { MasonryDemo } from './demos/MasonryDemo';
import { InfiniteScrollDemo } from './demos/InfiniteScrollDemo';

interface DemoRendererProps {
  patternId: ShopPatternId;
}

export const DemoRenderer: React.FC<DemoRendererProps> = ({ patternId }) => {
  switch (patternId) {
    case 'list':
      return <ListDemo />;
    case 'grid':
      return <GridDemo />;
    case 'card':
      return <CardDemo />;
    case 'carousel':
      return <CarouselDemo />;
    case 'table':
      return <TableDemo />;
    case 'timeline':
      return <TimelineDemo />;
    case 'accordion':
      return <AccordionDemo />;
    case 'masonry':
      return <MasonryDemo />;
    case 'infinite-scroll':
      return <InfiniteScrollDemo />;
  }
};
