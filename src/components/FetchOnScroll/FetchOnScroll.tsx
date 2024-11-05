import { Box } from '@mui/material';
import React, { ReactNode, useEffect, useRef } from 'react';

interface IFetchOnScroll {
  newLimit: () => void;
  isLast: boolean;
  children: ReactNode;
}

const FetchOnScroll = ({ newLimit, isLast, children }: IFetchOnScroll) => {
  const cardRef = useRef();

  useEffect(() => {
    if (!cardRef?.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (isLast && entry.isIntersecting) {
        newLimit();
        observer.unobserve(entry.target);
      }
    });

    observer.observe(cardRef.current);
  }, [isLast, newLimit]);

  return <Box ref={cardRef}>{children}</Box>;
};

export default FetchOnScroll;
