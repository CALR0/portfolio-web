<script lang="ts">
  import { onMount } from 'svelte'
  import { observeElement } from '../utils/intersection'
  import { slideUp, scaleIn, fadeIn } from '../utils/animations'
  import { socialLinks } from '../data/socialLinks'
  import SocialLinkCard from './ui/SocialLinkCard.svelte'
  import CVSection from './ui/CVSection.svelte'
  import { t } from '../utils/i18n'
  
  let sectionRef: HTMLElement
  let isVisible = $state(false)
  let socialLinksVisible = $state(false)
  let cvSectionVisible = $state(false)
  
  onMount(() => {
    const cleanup = observeElement(
      sectionRef,
      (visible) => {
        if (visible) {
          isVisible = true
          setTimeout(() => {
            socialLinksVisible = true
          }, 800)
          setTimeout(() => {
            cvSectionVisible = true
          }, 1200)
        }
      },
      { 
        threshold: [0.1, 0.3, 0.5],
        rootMargin: '50px 0px -50px 0px'
      }
    )
    
    return cleanup
  })
</script>

<section id="contact" class="py-16 sm:py-20 relative section-transition" bind:this={sectionRef}>
  <!-- Enhanced decorative elements -->
  <div class="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-white/[0.008] rounded-full filter blur-3xl opacity-30 animate-pulse-glow"></div>
  <div class="absolute bottom-1/4 right-0 w-64 h-64 bg-blue-500/[0.015] rounded-full filter blur-2xl opacity-25 animate-float"></div>
  
  <div class="container">
    <div class="max-w-4xl mx-auto text-center">
      <div class="mb-12 sm:mb-16">
        {#if isVisible}
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4" in:slideUp={{ delay: 0 }}>{$t('contact.title')}</h2>
          <div class="w-24 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto mb-6 transition-all duration-700" in:scaleIn={{ delay: 200 }}></div>
          <p class="text-base sm:text-lg text-gray-300 mb-8 max-w-2xl mx-auto px-4" in:fadeIn={{ delay: 400 }}>
            {$t('contact.description')}
          </p>
        {/if}
      </div>
      
      <!-- Enhanced social links grid -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-12">
        {#each socialLinks as social, index}
          <SocialLinkCard 
            {social} 
            {index}
            isVisible={socialLinksVisible}
            animationDelay="0.6s"
          />
        {/each}
      </div>
      
      <!-- CV Section -->
      <CVSection 
        isVisible={cvSectionVisible}
        animationDelay={800}
      />
      
      <!-- Enhanced footer with selective tech highlighting -->
      {#if isVisible}
        <div class="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-blue-500/20" in:fadeIn={{ delay: 1400 }}>
          <p class="text-sm sm:text-base text-gray-400 px-4 footer-text">
            © 2025 Carlos Lizarazo. Built with <span class="tech-glow">Svelte</span> and <span class="tech-glow">Tailwind CSS</span>.
          </p>
        </div>
      {/if}
    </div>
  </div>
</section>

<style>
  /* Footer text base */
  .footer-text {
    color: #ffffff;
    transition: none;
  }

  /* Solo las palabras específicas tienen glow azul */
  .tech-glow {
    color: #60a5fa;
    font-weight: 600;
    text-shadow: 
      0 0 8px rgba(96, 165, 250, 0.6),
      0 0 16px rgba(96, 165, 250, 0.4),
      0 0 24px rgba(96, 165, 250, 0.2);
    transition: all 0.3s ease;
    cursor: default;
  }

  .tech-glow:hover {
    color: #93c5fd;
    text-shadow: 
      0 0 12px rgba(147, 197, 253, 0.8),
      0 0 24px rgba(147, 197, 253, 0.6),
      0 0 36px rgba(147, 197, 253, 0.4);
    transform: scale(1.05);
  }

  .footer-text:hover {
    color: #ffffff !important;
  }

  @media (max-width: 640px) {
    .tech-glow {
      text-shadow: 
        0 0 6px rgba(96, 165, 250, 0.5),
        0 0 12px rgba(96, 165, 250, 0.3),
        0 0 18px rgba(96, 165, 250, 0.1);
    }

    .tech-glow:hover {
      text-shadow: 
        0 0 8px rgba(147, 197, 253, 0.7),
        0 0 16px rgba(147, 197, 253, 0.5),
        0 0 24px rgba(147, 197, 253, 0.3);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .tech-glow {
      transition: none;
    }
    
    .tech-glow:hover {
      transform: none;
    }
  }
</style>