<script lang="ts">
  import { onMount } from 'svelte'
  import { TypewriterEffect } from '../utils/typewriter'
  import { scrollToSection } from '../utils/navigation'
  import { t } from '../utils/i18n'
  
  let mounted = $state(false)
  let heroRef: HTMLElement
  let typedText = $state('')
  let showCursor = $state(true)
  let typewriter: TypewriterEffect | null = null
  
  // Reactive texts based on current language
  let texts = $derived($t('hero.roles'))
  
  onMount(() => {
    // Delay para asegurar una entrada suave
    const timer = setTimeout(() => {
      mounted = true
    }, 100)
    
    // Cursor blinking animation
    const cursorBlink = setInterval(() => {
      showCursor = !showCursor
    }, 530)
    
    return () => {
      clearTimeout(timer)
      clearInterval(cursorBlink)
      typewriter?.stop()
    }
  })

  // Reactive effect to restart typewriter when language changes
  $effect(() => {
    if (texts && Array.isArray(texts)) {
      typewriter?.stop()
      typewriter = new TypewriterEffect(
        (text) => { typedText = text },
        { texts, typeSpeed: 150, deleteSpeed: 50, pauseDuration: 2000 }
      )
      typewriter.start(500)
    }
  })

  const handleViewWork = () => {
    scrollToSection('projects')
  }
</script>

<section id="home" class="min-h-screen flex items-center justify-center relative overflow-hidden section-transition px-4 sm:px-6" bind:this={heroRef}>
  <!-- Enhanced decorative elements -->
  <div class="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400/60 rounded-full animate-pulse-glow opacity-60"></div>
  <div class="absolute top-1/2 right-1/3 w-3 h-3 bg-blue-300/40 rounded-full animate-float opacity-40" style="animation-delay: 2s;"></div>
  <div class="absolute bottom-1/3 left-1/2 w-2 h-2 bg-blue-500/50 rounded-full animate-pulse-glow opacity-50" style="animation-delay: 4s;"></div>
  <div class="absolute top-1/3 right-1/4 w-1 h-1 bg-white/30 rounded-full animate-ping opacity-30" style="animation-delay: 1s;"></div>
  <div class="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-blue-200/40 rounded-full animate-float opacity-40" style="animation-delay: 3s;"></div>
  
  <!-- Floating geometric shapes -->
  <div class="absolute top-20 left-10 w-16 h-16 border border-blue-400/20 rotate-45 animate-float opacity-20" style="animation-delay: 1s;"></div>
  <div class="absolute bottom-20 right-10 w-12 h-12 border border-blue-300/15 rounded-full animate-pulse-glow opacity-15" style="animation-delay: 2.5s;"></div>
  
  <div class="container text-center relative z-10">
    <div class="max-w-4xl mx-auto">
      <div class="mb-8">
        <!-- Enhanced greeting with staggered animation -->
        <div class="mb-4 {mounted ? 'animate-slide-up' : 'opacity-0'}">
          <span class="text-lg sm:text-xl text-blue-400 font-medium tracking-wide">{$t('hero.greeting')}</span>
        </div>
        
        <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-6 leading-tight {mounted ? 'animate-fade-in stagger-1' : 'opacity-0'}">
          <span class="block sm:inline hover-scale">{$t('hero.name')}</span>
        </h1>
        
        <!-- Enhanced animated subtitle with typewriter effect -->
        <div class="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-blue-400 mb-6 leading-relaxed max-w-3xl mx-auto px-4 {mounted ? 'animate-fade-in stagger-2' : 'opacity-0'} min-h-[3rem] sm:min-h-[4rem] flex items-center justify-center">
          <span class="relative">
            <span class="bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent font-bold tracking-wide">
              {typedText}
            </span>
            <span class="inline-block w-1 h-8 sm:h-10 md:h-12 lg:h-14 bg-blue-400 ml-2 {showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100"></span>
          </span>
        </div>
        
        <p class="text-base sm:text-lg text-white mb-8 leading-relaxed max-w-2xl mx-auto px-4 {mounted ? 'animate-fade-in stagger-3' : 'opacity-0'}">
          {$t('hero.description')}
        </p>
      </div>
      
      <!-- Enhanced buttons with smooth hover animations -->
      <div class="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center {mounted ? 'animate-bounce-in stagger-4' : 'opacity-0'}">
        <button onclick={handleViewWork} class="btn btn-primary w-full sm:w-auto hero-button group">
          <span class="relative z-10">{$t('hero.viewWork')}</span>
          <div class="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
        </button>
        <a href="#contact" class="btn btn-secondary w-full sm:w-auto hero-button group">
          <span class="relative z-10">{$t('hero.contactMe')}</span>
          <div class="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
        </a>
      </div>
    </div>
  </div>
</section>

<style>
  /* Smooth hero button hover effects */
  .hero-button {
    transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    transform: translateY(0) translateZ(0);
    will-change: transform, box-shadow;
  }

  .hero-button:hover {
    transform: translateY(-6px) translateZ(0);
    transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  /* Enhanced shadow transitions for primary button */
  .btn-primary.hero-button:hover {
    box-shadow: 0 16px 32px rgba(59, 130, 246, 0.35);
  }

  /* Enhanced shadow transitions for secondary button */
  .btn-secondary.hero-button:hover {
    box-shadow: 0 12px 24px rgba(59, 130, 246, 0.25);
  }

  /* Responsive adjustments for mobile */
  @media (max-width: 768px) {
    .hero-button:hover {
      transform: translateY(-4px) translateZ(0);
    }
  }

  /* Reduce motion for accessibility */
  @media (prefers-reduced-motion: reduce) {
    .hero-button {
      transition: none !important;
    }
    
    .hero-button:hover {
      transform: none !important;
    }
  }

  /* Touch device optimizations */
  @media (hover: none) and (pointer: coarse) {
    .hero-button:hover {
      transform: none;
    }
    
    .hero-button:active {
      transform: translateY(-2px) scale(0.98);
      transition: all 0.2s ease;
    }
  }
</style>