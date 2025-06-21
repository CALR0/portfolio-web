<script lang="ts">
  import { bounceIn, rotateIn } from '../../utils/animations'
  import type { Skill } from '../../types'
  
  interface Props {
    skill: Skill
    isVisible: boolean
    animationDelay: string
    animationType: 'bounce-in' | 'rotate-in'
  }
  
  let { skill, isVisible, animationDelay, animationType }: Props = $props()
  
  // Reactive variable to hold the chosen transition function
  let transitionFn = $derived(animationType === 'bounce-in' ? bounceIn : rotateIn)
</script>

{#if isVisible}
  <div class="group flex flex-col items-center p-6 card hover:scale-[1.02] transition-all duration-[800ms] ease-out hover-glow relative overflow-hidden skill-card" in:transitionFn={{ delay: parseFloat(animationDelay) * 1000 }}>
    <!-- Skill level indicator -->
    <div class="absolute top-2 right-2 text-xs text-blue-300 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-[600ms] ease-out">
      {skill.level}%
    </div>
    
    <!-- Progress ring background -->
    <div class="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-15 transition-opacity duration-[800ms] ease-out" style="background: conic-gradient(from 0deg, {skill.color}40 {skill.level * 3.6}deg, transparent {skill.level * 3.6}deg);"></div>
    
    <!-- Icon container -->
    <div class="relative mb-4 transition-transform duration-[700ms] ease-out group-hover:scale-[1.06] group-hover:-translate-y-0.5 icon-container">
      <img 
        src={skill.icon} 
        alt={skill.name}
        class="w-12 h-12 lg:w-16 lg:h-16 transition-all duration-[700ms] ease-out filter drop-shadow-lg skill-icon"
        style="filter: drop-shadow(0 4px 8px {skill.color}40);"
      />
      <!-- Glow effect -->
      <div class="absolute inset-0 rounded-full opacity-0 group-hover:opacity-15 transition-all duration-[800ms] ease-out icon-glow" style="background: {skill.color}; filter: blur(8px);"></div>
      
      <!-- Floating particles -->
      <div class="absolute -top-2 -right-2 w-2 h-2 bg-blue-400/40 rounded-full opacity-0 group-hover:opacity-80 transition-all duration-[900ms] ease-out particle-1"></div>
      <div class="absolute -bottom-2 -left-2 w-1.5 h-1.5 bg-blue-300/30 rounded-full opacity-0 group-hover:opacity-70 transition-all duration-[900ms] ease-out particle-2"></div>
    </div>
    
    <!-- Skill name -->
    <span class="text-sm lg:text-base font-medium text-gray-300 group-hover:text-white transition-colors duration-[600ms] ease-out text-center skill-name">
      {skill.name}
    </span>
    
    <!-- Skill level bar -->
    <div class="w-full h-1 bg-gray-700 rounded-full mt-2 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-[600ms] ease-out skill-bar">
      <div class="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all duration-[1200ms] ease-out group-hover:shadow-sm group-hover:shadow-blue-400/30 skill-progress" style="width: {skill.level}%;"></div>
    </div>
  </div>
{/if}

<style>
  .skill-card {
    will-change: transform, box-shadow;
    transform: translateZ(0);
  }

  .icon-container {
    will-change: transform;
    transform: translateZ(0);
  }

  .skill-icon {
    will-change: filter, transform;
    transform: translateZ(0);
  }

  .icon-glow {
    will-change: opacity;
  }

  .skill-name {
    will-change: color;
  }

  .skill-bar {
    will-change: opacity;
  }

  .skill-progress {
    will-change: width, box-shadow;
    transform: translateZ(0);
  }

  .particle-1 {
    will-change: opacity;
    animation-delay: 0.1s;
  }

  .particle-2 {
    will-change: opacity;
    animation-delay: 0.2s;
  }

  .group:hover .skill-card {
    transition: all 800ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .group:hover .icon-container {
    transition: transform 700ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .group:hover .skill-icon {
    transition: all 700ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  @media (max-width: 768px) {
    .skill-card {
      transition-duration: 600ms;
    }
    
    .icon-container {
      transition-duration: 500ms;
    }
    
    .skill-icon {
      transition-duration: 500ms;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .skill-card,
    .icon-container,
    .skill-icon,
    .icon-glow,
    .skill-name,
    .skill-bar,
    .skill-progress,
    .particle-1,
    .particle-2 {
      transition: none !important;
    }
    
    .group:hover .skill-card,
    .group:hover .icon-container {
      transform: none !important;
    }
  }

  @media (hover: none) and (pointer: coarse) {
    .skill-card:hover {
      transform: none;
    }
    
    .skill-card:active {
      transform: scale(0.98);
      transition: transform 200ms ease;
    }
  }
</style>