<script lang="ts">
  import { onMount } from 'svelte'
  import { observeElement } from '../../utils/intersection'
  import { slideUp, scaleIn, fadeIn } from '../../utils/animations'
  import { experiences } from '../../data/experiences'
  import ExperienceCard from '../ui/ExperienceCard.svelte'
  import { t } from '../../utils/i18n'
  
  let sectionRef: HTMLElement
  let isVisible = $state(false)
  let timelineVisible = $state(false)
  let cardsVisible = $state(false)
  
  onMount(() => {
    const cleanup = observeElement(
      sectionRef,
      (visible) => {
        if (visible) {
          isVisible = true
          setTimeout(() => {
            timelineVisible = true
          }, 600)
          setTimeout(() => {
            cardsVisible = true
          }, 600)
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

<section id="experience" class="py-20 relative section-transition" bind:this={sectionRef}>
  <!-- Enhanced decorative elements -->
  <div class="absolute top-1/3 left-0 w-80 h-80 bg-white/[0.008] rounded-full filter blur-3xl opacity-50 animate-pulse-glow"></div>
  <div class="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/[0.02] rounded-full filter blur-3xl opacity-40 animate-float"></div>
  
  <div class="container">
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-16">
        {#if isVisible}
          <h2 class="text-5xl font-bold text-white mb-4" in:slideUp={{ delay: 0 }}>{$t('experience.title')}</h2>
          <div class="w-24 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto mb-6 transition-all duration-700" in:scaleIn={{ delay: 200 }}></div>
          <p class="text-lg text-gray-300" in:fadeIn={{ delay: 400 }}>
            {$t('experience.description')}
          </p>
        {/if}
      </div>
      
      <div class="relative">
        <!-- Enhanced timeline line with gradient -->
        {#if timelineVisible}
          <div class="absolute left-8 md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600 origin-top transition-all duration-1000 shadow-lg shadow-blue-500/30" in:scaleIn={{ delay: 0 }}></div>
        {/if}
        
        <div class="space-y-12">
          {#each experiences as experience, index}
            <ExperienceCard 
              {experience} 
              {index}
              isVisible={cardsVisible}
              animationDelay="{0.2 + index * 0.3}s"
            />
          {/each}
        </div>
      </div>
    </div>
  </div>
</section>