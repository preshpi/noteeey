import React from 'react'
import { useLayoutEffect } from 'react';
import gsap from 'gsap';

const useModalAnimation = (animateComRef: React.RefObject<HTMLElement>) => {
    useLayoutEffect(() => {
      let ctx = gsap.context(() => {
        const t1 = gsap.timeline();
        t1.from(animateComRef.current, { opacity: 0, duration: 0.5 });
      }, animateComRef);
      return () => ctx.revert();
    }, [animateComRef]);
  };
  

export default useModalAnimation