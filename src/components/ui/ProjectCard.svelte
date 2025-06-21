<script lang="ts">
  import { ExternalLink, Github } from 'lucide-svelte'
  import { slideLeft, slideRight, bounceIn } from '../../utils/animations'
  import { t } from '../../utils/i18n'
  import type { Project } from '../../types'
  import { onMount } from 'svelte'
  
  interface Props {
    project: Project
    isVisible: boolean
    animationDelay: string
    index: number
  }
  
  let { project, isVisible, animationDelay, index }: Props = $props()
  
  // Image loading optimization
  let imageLoaded = $state(false)
  let imageError = $state(false)
  let imageElement: HTMLImageElement
  
  // Reactive variable to hold the chosen transition function
  let transitionFn = $derived(index % 2 === 0 ? slideLeft : slideRight)
  
  onMount(() => {
    // Preload image when component mounts
    if (project.image) {
      const img = new Image()
      img.onload = () => {
        imageLoaded = true
      }
      img.onerror = () => {
        imageError = true
      }
      img.src = project.image
    }
  })
</script>

{#if isVisible}
  <div class="card group hover-glow relative overflow-hidden project-card" in:transitionFn={{ delay: parseInt(animationDelay) * 1000 }}>
    
    <!-- Enhanced image section with loading optimization -->
    <div class="relative overflow-hidden rounded-lg mb-4 lg:mb-6 image-container bg-gray-800/50">
      <!-- Loading skeleton -->
      {#if !imageLoaded && !imageError}
        <div class="w-full h-36 lg:h-40 bg-gradient-to-r from-gray-700/50 via-gray-600/50 to-gray-700/50 animate-pulse rounded-lg flex items-center justify-center">
          <div class="text-gray-400 text-sm">Loading...</div>
        </div>
      {/if}
      
      <!-- Error fallback -->
      {#if imageError}
        <div class="w-full h-36 lg:h-40 bg-gray-800/70 rounded-lg flex items-center justify-center border border-gray-600/30">
          <div class="text-center text-gray-400">
            <div class="text-2xl mb-2">📷</div>
            <div class="text-sm">Image unavailable</div>
          </div>
        </div>
      {/if}
      
      <!-- Actual image with optimized loading -->
      {#if !imageError}
        <img 
          bind:this={imageElement}
          src={project.image} 
          alt={$t(`projects.projectsList.${project.id}.title`)}
          class="w-full h-36 lg:h-40 object-cover project-image {imageLoaded ? 'opacity-100' : 'opacity-0'}"
          loading="eager"
          decoding="async"
          fetchpriority="high"
          onload={() => imageLoaded = true}
          onerror={() => imageError = true}
        />
      {/if}
      
      <!-- Overlay effects - only show when image is loaded -->
      {#if imageLoaded}
        <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 overlay-gradient"></div>
        <div class="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 overlay-blue"></div>
        
        <!-- Floating overlay icons -->
        <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 overlay-icons">
          <div class="flex gap-3 lg:gap-4">
            <a 
              href={project.github}
              class="p-2 lg:p-3 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 icon-button github-icon"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View GitHub repository"
            >
              <Github size={18} class="lg:w-5 lg:h-5" />
            </a>
            <a 
              href={project.demo}
              class="p-2 lg:p-3 bg-blue-500/50 backdrop-blur-sm rounded-full text-white hover:bg-blue-500/70 icon-button demo-icon"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View live demo"
            >
              <ExternalLink size={18} class="lg:w-5 lg:h-5" />
            </a>
          </div>
        </div>
      {/if}
    </div>
    
    <!-- Enhanced content section -->
    <h3 class="text-lg lg:text-xl font-semibold text-white mb-2 lg:mb-3 project-title text-shimmer">{$t(`projects.projectsList.${project.id}.title`)}</h3>
    <p class="text-gray-300 mb-4 lg:mb-6 leading-relaxed project-description text-sm lg:text-base">{$t(`projects.projectsList.${project.id}.description`)}</p>
    
    <!-- Enhanced technology tags with faster animation -->
    <div class="flex flex-wrap gap-1.5 lg:gap-2">
      {#each project.technologies as tech, techIndex}
        <span class="px-2 lg:px-3 py-1 bg-blue-500/20 text-blue-300 text-xs lg:text-sm rounded-full font-medium border border-blue-500/30 backdrop-filter backdrop-blur-sm tech-tag" in:bounceIn={{ delay: 200 + techIndex * 30 }}>
          {tech}
        </span>
      {/each}
    </div>
    
    <!-- Decorative corner elements -->
    <div class="absolute top-0 left-0 w-6 lg:w-8 h-6 lg:h-8 border-l-2 border-t-2 border-blue-400/20 opacity-0 group-hover:opacity-100 corner-decoration corner-top-left"></div>
    <div class="absolute bottom-0 right-0 w-6 lg:w-8 h-6 lg:h-8 border-r-2 border-b-2 border-blue-400/20 opacity-0 group-hover:opacity-100 corner-decoration corner-bottom-right"></div>
  </div>
{/if}

<style>
  /* Enhanced smooth transitions for project cards */
  .project-card {
    transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    transform: translateZ(0);
    will-change: transform, box-shadow;
  }

  .project-card:hover {
    transform: translateY(-18px) translateZ(0);
    transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .image-container {
    transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    transform: translateZ(0);
  }

  .image-container:hover {
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4);
    transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .project-image {
    transition: all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    transform: scale(1) translateZ(0);
  }

  .group:hover .project-image {
    transform: scale(1.08) translateZ(0);
    transition: all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .overlay-gradient {
    transition: opacity 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .overlay-blue {
    transition: opacity 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .overlay-icons {
    transition: opacity 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .icon-button {
    transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    transform: scale(1) translateZ(0);
  }

  .icon-button:hover {
    transform: scale(1.15) translateZ(0);
    transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .project-title {
    transition: all 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .group:hover .project-title {
    color: #93c5fd;
    transition: all 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .project-description {
    transition: all 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .group:hover .project-description {
    color: #e5e7eb;
    transition: all 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .tech-tag {
    transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    transform: scale(1) translateZ(0);
  }

  .tech-tag:hover {
    background: rgba(59, 130, 246, 0.3);
    transform: scale(1.08) translateY(-2px) translateZ(0);
    box-shadow: 0 8px 25px rgba(59, 130, 246, 0.25);
    transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .corner-decoration {
    transition: opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  @media (max-width: 768px) {
    .project-card:hover {
      transform: translateY(-6px) translateZ(0);
    }

    .group:hover .project-image {
      transform: scale(1.04) translateZ(0);
    }

    .tech-tag:hover {
      transform: scale(1.04) translateY(-1px) translateZ(0);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .project-card,
    .image-container,
    .project-image,
    .overlay-gradient,
    .overlay-blue,
    .overlay-icons,
    .icon-button,
    .project-title,
    .project-description,
    .tech-tag,
    .corner-decoration {
      transition: none !important;
    }

    .project-card:hover,
    .group:hover .project-image,
    .icon-button:hover,
    .tech-tag:hover {
      transform: none !important;
    }
  }
</style>