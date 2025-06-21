import { cubicOut } from 'svelte/easing'

// Svelte transition functions - Optimizadas para mayor fluidez
export function fadeIn(node: Element, { delay = 0, duration = 1000 } = {}) {
  return {
    delay,
    duration,
    easing: cubicOut,
    css: (t: number) => `
      opacity: ${t};
      transform: translateY(${(1 - t) * 15}px);
    `
  }
}

export function slideUp(node: Element, { delay = 0, duration = 1200 } = {}) {
  return {
    delay,
    duration,
    easing: cubicOut,
    css: (t: number) => `
      opacity: ${t};
      transform: translateY(${(1 - t) * 25}px);
    `
  }
}

export function slideLeft(node: Element, { delay = 0, duration = 1100 } = {}) {
  return {
    delay,
    duration,
    easing: cubicOut,
    css: (t: number) => `
      opacity: ${t};
      transform: translateX(${(1 - t) * -35}px);
    `
  }
}

export function slideRight(node: Element, { delay = 0, duration = 1100 } = {}) {
  return {
    delay,
    duration,
    easing: cubicOut,
    css: (t: number) => `
      opacity: ${t};
      transform: translateX(${(1 - t) * 35}px);
    `
  }
}

export function scaleIn(node: Element, { delay = 0, duration = 1000 } = {}) {
  return {
    delay,
    duration,
    easing: cubicOut,
    css: (t: number) => `
      opacity: ${t};
      transform: scale(${0.92 + (t * 0.08)});
    `
  }
}

export function bounceIn(node: Element, { delay = 0, duration = 1200 } = {}) {
  return {
    delay,
    duration,
    easing: cubicOut,
    css: (t: number) => {
      const bounce = Math.sin(t * Math.PI) * 0.03
      const scale = 0.7 + (t * 0.3)
      return `
        opacity: ${t};
        transform: scale(${scale}) translateY(${bounce * 3}px);
      `
    }
  }
}

export function rotateIn(node: Element, { delay = 0, duration = 1000 } = {}) {
  return {
    delay,
    duration,
    easing: cubicOut,
    css: (t: number) => `
      opacity: ${t};
      transform: rotate(${(1 - t) * -3}deg) scale(${0.96 + (t * 0.04)});
    `
  }
}