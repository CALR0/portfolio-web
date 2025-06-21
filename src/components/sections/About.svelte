<script lang="ts">
  import { onMount } from 'svelte'
  import { observeElement } from '../../utils/intersection'
  import { fadeIn, slideUp, slideLeft, slideRight, scaleIn } from '../../utils/animations'
  import { t } from '../../utils/i18n'
  
  let sectionRef: HTMLElement
  let isVisible = $state(false)
  let skillsVisible = $state(false)
  let avatarVisible = $state(false)
  let imageLoaded = $state(false)
  let imageError = $state(false)
  
  onMount(() => {
    const cleanup = observeElement(
      sectionRef,
      (visible) => {
        if (visible) {
          isVisible = true
          setTimeout(() => {
            skillsVisible = true
          }, 1200)
          setTimeout(() => {
            avatarVisible = true
          }, 1500)
        }
      },
      { 
        threshold: [0.1, 0.3, 0.5],
        rootMargin: '50px 0px -50px 0px'
      }
    )
    
    // Preload the image
    const img = new Image()
    img.onload = () => {
      imageLoaded = true
    }
    img.onerror = () => {
      imageError = true
    }
    img.src = '/picture.png'
    
    return cleanup
  })
  
  // Reactive skills array
  let whatIDo = $derived($t('about.skills'))
</script>

<section id="about" class="py-16 sm:py-20 relative section-transition" bind:this={sectionRef}>
  <!-- Enhanced decorative elements -->
  <div class="absolute top-0 right-0 w-72 h-72 bg-white/[0.015] rounded-full filter blur-3xl opacity-60 animate-pulse-glow"></div>
  <div class="absolute bottom-1/4 left-0 w-48 h-48 bg-blue-500/[0.02] rounded-full filter blur-2xl opacity-40 animate-float"></div>
  
  <div class="container">
    <div class="max-w-6xl mx-auto">
      <!-- Section Header -->
      <div class="text-center mb-12 sm:mb-16">
        {#if isVisible}
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4" in:slideUp={{ delay: 0 }}>{$t('about.title')}</h2>
          <div class="w-24 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto transition-all duration-700" in:scaleIn={{ delay: 200 }}></div>
        {/if}
      </div>
      
      <!-- Main Content Grid -->
      <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <!-- Avatar Section -->
        <div class="order-1 lg:order-1 flex justify-center">
          <!-- Desktop version with delayed animation -->
          <div class="hidden lg:block">
            {#if avatarVisible}
              <div class="relative group max-w-sm w-full" in:slideLeft={{ delay: 0 }}>
                <div class="aspect-square bg-gradient-to-br from-blue-500/20 via-blue-400/10 to-blue-600/20 rounded-2xl flex items-center justify-center shadow-2xl border border-blue-500/30 backdrop-filter backdrop-blur-lg transition-all duration-700 hover:scale-105 hover-glow overflow-hidden">
                  
                  <!-- Loading skeleton -->
                  {#if !imageLoaded && !imageError}
                    <div class="w-full h-full bg-gradient-to-r from-gray-700/50 via-gray-600/50 to-gray-700/50 animate-pulse rounded-2xl flex items-center justify-center">
                      <div class="text-gray-400 text-sm">Loading...</div>
                    </div>
                  {/if}
                  
                  <!-- Error fallback - show original "A" -->
                  {#if imageError}
                    <div class="text-6xl sm:text-7xl lg:text-8xl font-bold gradient-text animate-pulse-glow">A</div>
                  {/if}
                  
                  <!-- Actual photo -->
                  {#if !imageError}
                    <img 
                      src="/picture.png" 
                      alt="Carlos Lizarazo"
                      class="w-full h-full object-cover rounded-2xl transition-all duration-700 group-hover:scale-105 {imageLoaded ? 'opacity-100' : 'opacity-0'}"
                      loading="eager"
                      decoding="async"
                      onload={() => imageLoaded = true}
                      onerror={() => imageError = true}
                    />
                  {/if}
                  
                  <!-- Photo overlay effects -->
                  {#if imageLoaded && !imageError}
                    <div class="absolute inset-0 bg-gradient-to-t from-blue-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl"></div>
                  {/if}
                  
                  <!-- Floating elements around avatar -->
                  <div class="absolute -top-4 -right-4 w-8 h-8 bg-blue-400/20 rounded-full animate-bounce opacity-60"></div>
                  <div class="absolute -bottom-4 -left-4 w-6 h-6 bg-blue-300/30 rounded-full animate-float opacity-50"></div>
                  <div class="absolute top-1/2 -left-6 w-4 h-4 bg-blue-500/25 rounded-full animate-ping opacity-40"></div>
                </div>
                
                <!-- Decorative rings -->
                <div class="absolute inset-0 rounded-2xl border border-blue-400/10 animate-pulse-glow" style="animation-delay: 0.5s;"></div>
                <div class="absolute inset-2 rounded-xl border border-blue-300/5 animate-pulse-glow" style="animation-delay: 1s;"></div>
              </div>
            {/if}
          </div>
          
          <!-- Mobile/Tablet version with original timing -->
          <div class="lg:hidden">
            {#if isVisible}
              <div class="relative group max-w-sm w-full" in:slideLeft={{ delay: 400 }}>
                <div class="aspect-square bg-gradient-to-br from-blue-500/20 via-blue-400/10 to-blue-600/20 rounded-2xl flex items-center justify-center shadow-2xl border border-blue-500/30 backdrop-filter backdrop-blur-lg transition-all duration-700 hover:scale-105 hover-glow overflow-hidden">
                  
                  <!-- Loading skeleton -->
                  {#if !imageLoaded && !imageError}
                    <div class="w-full h-full bg-gradient-to-r from-gray-700/50 via-gray-600/50 to-gray-700/50 animate-pulse rounded-2xl flex items-center justify-center">
                      <div class="text-gray-400 text-sm">Loading...</div>
                    </div>
                  {/if}
                  
                  <!-- Error fallback - show original "A" -->
                  {#if imageError}
                    <div class="text-6xl sm:text-7xl lg:text-8xl font-bold gradient-text animate-pulse-glow">A</div>
                  {/if}
                  
                  <!-- Actual photo -->
                  {#if !imageError}
                    <img 
                      src="/picture.png" 
                      alt="Carlos Lizarazo"
                      class="w-full h-full object-cover rounded-2xl transition-all duration-700 group-hover:scale-105 {imageLoaded ? 'opacity-100' : 'opacity-0'}"
                      loading="eager"
                      decoding="async"
                      onload={() => imageLoaded = true}
                      onerror={() => imageError = true}
                    />
                  {/if}
                  
                  <!-- Photo overlay effects -->
                  {#if imageLoaded && !imageError}
                    <div class="absolute inset-0 bg-gradient-to-t from-blue-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl"></div>
                  {/if}
                  
                  <!-- Floating elements around avatar -->
                  <div class="absolute -top-4 -right-4 w-8 h-8 bg-blue-400/20 rounded-full animate-bounce opacity-60"></div>
                  <div class="absolute -bottom-4 -left-4 w-6 h-6 bg-blue-300/30 rounded-full animate-float opacity-50"></div>
                  <div class="absolute top-1/2 -left-6 w-4 h-4 bg-blue-500/25 rounded-full animate-ping opacity-40"></div>
                </div>
                
                <!-- Decorative rings -->
                <div class="absolute inset-0 rounded-2xl border border-blue-400/10 animate-pulse-glow" style="animation-delay: 0.5s;"></div>
                <div class="absolute inset-2 rounded-xl border border-blue-300/5 animate-pulse-glow" style="animation-delay: 1s;"></div>
              </div>
            {/if}
          </div>
        </div>
        
        <!-- Content Section -->
        <div class="order-2 lg:order-2 space-y-6 text-center lg:text-left">
          <!-- Introduction Paragraphs -->
          <div class="space-y-6">
            {#if isVisible}
              <p class="text-base sm:text-lg text-gray-300 leading-relaxed" in:slideRight={{ delay: 600 }}>
                {$t('about.intro1')}
              </p>
              
              <p class="text-base sm:text-lg text-gray-300 leading-relaxed" in:slideRight={{ delay: 800 }}>
                {$t('about.intro2')}
              </p>
            {/if}
          </div>
          
          <!-- What I Do Section -->
          {#if isVisible}
            <div class="pt-4" in:fadeIn={{ delay: 1000 }}>
              <h3 class="text-xl sm:text-2xl font-semibold text-white mb-6">{$t('about.whatIDo')}</h3>
              <ul class="space-y-4">
                {#each whatIDo as item, index}
                  {#if skillsVisible}
                    <li class="flex items-start text-gray-300 static-list-item" in:slideRight={{ delay: 200 + index * 200 }}>
                      <span class="w-3 h-3 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full mr-4 mt-2 shadow-lg flex-shrink-0 static-bullet"></span>
                      <span class="text-sm sm:text-base static-text">{item}</span>
                    </li>
                  {/if}
                {/each}
              </ul>
            </div>
          {/if}
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  /* Static styles for What I Do section - no hover effects */
  .static-list-item {
    transition: none !important;
  }

  .static-list-item:hover {
    transform: none !important;
    color: inherit !important;
  }

  .static-bullet {
    transition: none !important;
  }

  .static-bullet:hover {
    transform: none !important;
    scale: 1 !important;
  }

  .static-text {
    transition: none !important;
  }

  .static-text:hover {
    color: inherit !important;
  }

  .static-list-item * {
    transition: none !important;
  }

  .static-list-item *:hover {
    transform: none !important;
    color: inherit !important;
    scale: 1 !important;
  }

  /* Enhanced photo styling */
  img {
    image-rendering: -webkit-optimize-contrast;
    image-rendering: crisp-edges;
  }

  .aspect-square img {
    object-position: center center;
  }

  @media (max-width: 768px) {
    .aspect-square img {
      object-position: center 20%;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    img {
      transition: none !important;
    }
    
    .group:hover img {
      transform: none !important;
    }
  }
</style>