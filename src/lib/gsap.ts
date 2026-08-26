import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Register GSAP plugins globally
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export { gsap, ScrollTrigger, useGSAP };

/**
 * GSAP Number Rolling Counter Utility
 * Smoothly interpolates numerical values from start to target with custom easing.
 */
export const animateCounter = (
  element: HTMLElement | null,
  targetValue: number,
  duration = 2,
  prefix = '',
  suffix = '+'
) => {
  if (!element) return;
  const obj = { val: 0 };
  return gsap.to(obj, {
    val: targetValue,
    duration,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: element,
      start: 'top 85%',
      toggleActions: 'play none none none',
      once: true,
    },
    onUpdate: () => {
      element.textContent = `${prefix}${Math.floor(obj.val)}${suffix}`;
    },
  });
};

/**
 * Staggered Card Entrance Animation
 */
export const animateStaggerCards = (
  container: HTMLElement | string,
  cards: string,
  delay = 0.1
) => {
  return gsap.fromTo(
    cards,
    {
      opacity: 0,
      y: 40,
      scale: 0.96,
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
        toggleActions: 'play none none none',
        once: true,
      },
      delay,
    }
  );
};

/**
 * Floating Ambient Parallax Effect
 */
export const setupFloatingParallax = (
  element: HTMLElement | string,
  intensityY = 15,
  duration = 3.5
) => {
  return gsap.to(element, {
    y: `+=${intensityY}`,
    duration,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  });
};
