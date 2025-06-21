<script lang="ts">
  import { onMount } from 'svelte'
  import { observeElement } from '../../utils/intersection'
  import { slideUp, scaleIn, fadeIn } from '../../utils/animations'
  import { projects } from '../../data/projects'
  import ProjectCard from '../ui/ProjectCard.svelte'
  import { t } from '../../utils/i18n'
  
  let sectionRef: HTMLElement
  let isVisible = $state(false)
  let projectsAnimated = $state(false)
  
  onMount(() => {
    // Preload all project images for faster loading
    projects.forEach(project => {
      if (project.image) {
        const img = new Image()
        img.src = project.image
      }
    })
    
    const cleanup = observeElement(
      sectionRef,
      (visible) => {
        if (visible) {
          isVisible = true
          setTimeout(() => {
            projectsAnimated = true
          }, 400)
        }
      },
      { 
        threshold: [0.1, 0.2, 0.3],
        rootMargin: '100px 0px -50px 0px'
      }
    )
    
    return cleanup
  })
</script>

<section id="projects" class="py-20 relative section-transition" bind:this={sectionRef}>
  <!-- Enhanced decorative elements -->
  <div class="absolute top-1/2 right-0 w-80 h-80 bg-white/[0.01] rounded-full filter blur-3xl opacity-40 animate-pulse-glow"></div>
  <div class="absolute bottom-0 left-1/4 w-64 h-64 bg-blue-500/[0.015] rounded-full filter blur-2xl opacity-30 animate-float"></div>
  
  <div class="container">
    <div class="text-center mb-16">
      {#if isVisible}
        <h2 class="text-5xl font-bold text-white mb-4" in:slideUp={{ delay: 0 }}>{$t('projects.title')}</h2>
        <div class="w-24 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto mb-6 transition-all duration-700" in:scaleIn={{ delay: 200 }}></div>
        <p class="text-lg text-gray-300" in:fadeIn={{ delay: 400 }}>
          {$t('projects.description')}
        </p>
      {/if}
    </div>
    
    <!-- Optimized grid -->
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {#each projects as project, index}
        <ProjectCard 
          {project} 
          {index}
          isVisible={projectsAnimated}
          animationDelay="{0.1 + index * 0.15}" 
        />
      {/each}
    </div>
  </div>
</section>