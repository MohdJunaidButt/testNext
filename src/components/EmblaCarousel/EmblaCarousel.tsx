import { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import React, { ReactNode } from 'react';

type PropType = {
  options?: EmblaOptionsType;
  children: ReactNode;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { options, children } = props;
  const [emblaRef] = useEmblaCarousel(options);

  return (
    <section className='embla'>
      <div className='embla__viewport' ref={emblaRef}>
        <div className='embla__container'>{children}</div>
      </div>
    </section>
  );
};

export default EmblaCarousel;
