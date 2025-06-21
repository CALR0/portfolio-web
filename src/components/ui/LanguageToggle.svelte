<script lang="ts">
  import { currentLanguage, toggleLanguage } from '../../stores/language'
  
  let isAnimating = $state(false)

  const handleToggle = () => {
    if (isAnimating) return

    isAnimating = true
    toggleLanguage()

    setTimeout(() => {
      isAnimating = false
    }, 300)
  }
</script>

<button
  onclick={handleToggle}
  class="relative flex items-center justify-center w-12 h-6 bg-gray-700/50 backdrop-blur-sm rounded-full border border-gray-600/30 transition-all duration-300 hover:bg-gray-600/60 hover:border-gray-500/50 shadow-lg shadow-blue-400/20 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:ring-offset-2 focus:ring-offset-transparent group"
  aria-label="Toggle language"
  disabled={isAnimating}
>
  <!-- Toggle slider -->
  <div 
    class="absolute w-5 h-5 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full shadow-lg shadow-blue-400/40 transition-all duration-300 ease-out flex items-center justify-center text-[10px] font-bold text-white {$currentLanguage === 'es' ? 'translate-x-3' : '-translate-x-3'} {isAnimating ? 'scale-110' : 'scale-100'}"
  >
    {$currentLanguage.toUpperCase()}
  </div>
  
  <!-- Background labels -->
  <div class="absolute inset-0 flex items-center justify-between px-1 text-[9px] font-medium text-gray-400 pointer-events-none">
    <span class="opacity-{$currentLanguage === 'en' ? '100' : '50'} transition-opacity duration-300">EN</span>
    <span class="opacity-{$currentLanguage === 'es' ? '100' : '50'} transition-opacity duration-300">ES</span>
  </div>
  
  <!-- Always visible glow background -->
  <div class="absolute inset-0 rounded-full opacity-30 transition-opacity duration-300 bg-gradient-to-r from-blue-400 to-blue-500 blur-sm"></div>
</button>

<style>
  button {
    will-change: box-shadow, background-color, border-color;
  }

  button:active {
    transform: scale(0.98);
  }

  /* Reduce motion for accessibility */
  @media (prefers-reduced-motion: reduce) {
    button,
    button > div {
      transition: none !important;
    }
  }
</style>
