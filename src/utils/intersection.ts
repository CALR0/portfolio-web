export interface IntersectionOptions {
  threshold?: number | number[]
  rootMargin?: string
  triggerOnce?: boolean
}

export const createIntersectionObserver = (
  callback: (isVisible: boolean, entry: IntersectionObserverEntry) => void,
  options: IntersectionOptions = {}
): IntersectionObserver => {
  const {
    threshold = [0.1, 0.3, 0.5],
    rootMargin = '50px 0px -50px 0px',
    triggerOnce = false
  } = options

  let hasTriggered = false

  return new IntersectionObserver(
    ([entry]) => {
      const isVisible = entry.isIntersecting && entry.intersectionRatio > 0.1
      
      if (isVisible && (!triggerOnce || !hasTriggered)) {
        hasTriggered = true
        callback(true, entry)
      } else if (!isVisible && !triggerOnce) {
        callback(false, entry)
      }
    },
    { threshold, rootMargin }
  )
}

export const observeElement = (
  element: HTMLElement | null,
  callback: (isVisible: boolean, entry: IntersectionObserverEntry) => void,
  options?: IntersectionOptions
): (() => void) => {
  if (!element) return () => {}

  const observer = createIntersectionObserver(callback, options)
  observer.observe(element)

  return () => observer.disconnect()
}