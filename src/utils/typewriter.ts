export interface TypewriterOptions {
  texts: string[]
  typeSpeed?: number
  deleteSpeed?: number
  pauseDuration?: number
}

export class TypewriterEffect {
  private texts: string[]
  private typeSpeed: number
  private deleteSpeed: number
  private pauseDuration: number
  private currentIndex = 0
  private currentText = ''
  private isDeleting = false
  private timeoutId: number | null = null

  constructor(
    private onUpdate: (text: string) => void,
    options: TypewriterOptions
  ) {
    this.texts = options.texts
    this.typeSpeed = options.typeSpeed || 150
    this.deleteSpeed = options.deleteSpeed || 50
    this.pauseDuration = options.pauseDuration || 2000
  }

  start(delay = 0): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId)
    }
    
    this.timeoutId = setTimeout(() => {
      this.type()
    }, delay)
  }

  stop(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId)
      this.timeoutId = null
    }
  }

  private type(): void {
    const current = this.texts[this.currentIndex]
    
    if (this.isDeleting) {
      this.currentText = current.substring(0, this.currentText.length - 1)
    } else {
      this.currentText = current.substring(0, this.currentText.length + 1)
    }
    
    this.onUpdate(this.currentText)
    
    let nextDelay = this.isDeleting ? this.deleteSpeed : this.typeSpeed
    
    if (!this.isDeleting && this.currentText === current) {
      nextDelay = this.pauseDuration
      this.isDeleting = true
    } else if (this.isDeleting && this.currentText === '') {
      this.isDeleting = false
      this.currentIndex = (this.currentIndex + 1) % this.texts.length
    }
    
    this.timeoutId = setTimeout(() => this.type(), nextDelay)
  }
}