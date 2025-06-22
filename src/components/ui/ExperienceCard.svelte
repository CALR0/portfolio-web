<script lang="ts">
  import { Calendar, MapPin, ExternalLink } from 'lucide-svelte'
  import { slideLeft, slideRight, bounceIn } from '../../utils/animations'
  import { t } from '../../utils/i18n'
  import type { Experience } from '../../types'
  
  interface Props {
    experience: Experience
    isVisible: boolean
    animationDelay: string
    index: number
  }
  
  let { experience, isVisible, animationDelay, index }: Props = $props()
  
  // Reactive variable to hold the chosen transition function
  let transitionFn = $derived(index % 2 === 0 ? slideLeft : slideRight)
  
  // Get translated period
  let translatedPeriod = $derived($t(`experience.periods.${experience.id}.period`))
</script>

<div class="relative flex flex-col md:flex-row items-start md:items-center {index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}">
  
  <!-- Enhanced timeline dot -->
  {#if isVisible}
    <div class="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full border-4 border-gray-900 shadow-lg z-10" in:bounceIn={{ delay: 400 + index * 100 }}>
      {#if experience.current}
        <div class="absolute inset-0 bg-blue-400 rounded-full animate-ping"></div>
      {/if}
    </div>
  {/if}
  
  <!-- Static content card -->
  <div class="ml-16 md:ml-0 md:w-5/12 {index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'}">
    {#if isVisible}
      <div class="experience-card relative overflow-hidden" in:transitionFn={{ delay: parseInt(animationDelay) * 1000 }}>
        <!-- Header -->
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
          <div>
            <h3 class="text-xl font-semibold text-white mb-1">
              {$t(`experience.experiences.${experience.id}.title`)}
            </h3>
            <div class="flex items-center gap-2 text-blue-400 font-medium mb-2">
              <span>{$t(`experience.experiences.${experience.id}.company`)}</span>
              {#if experience.website}
                <a href={experience.website} target="_blank" rel="noopener noreferrer" class="hover:text-blue-300 transition-colors duration-300">
                  <ExternalLink size={16} />
                </a>
              {/if}
            </div>
          </div>
        </div>
        
        <!-- Period and Location -->
        <div class="flex flex-col sm:flex-row sm:items-center gap-4 mb-4 text-sm text-gray-400">
          <div class="flex items-center gap-2">
            <Calendar size={16} class="text-blue-400" />
            <span>{translatedPeriod}</span>
          </div>
          <div class="flex items-center gap-2">
            <MapPin size={16} class="text-blue-400" />
            <span>{experience.location}</span>
          </div>
        </div>
        
        <!-- Description -->
        <p class="text-gray-300 mb-4 leading-relaxed">
          {$t(`experience.experiences.${experience.id}.description`)}
        </p>
        
        <!-- Achievements -->
        <div class="mb-6">
          <h4 class="text-white font-medium mb-3">{$t('experience.keyAchievements')}</h4>
          <ul class="space-y-2">
            {#each $t(`experience.experiences.${experience.id}.achievements`) as achievement}
              <li class="flex items-start gap-3 text-gray-300 text-sm">
                <span class="w-2 h-2 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                <span class="leading-relaxed">{achievement}</span>
              </li>
            {/each}
          </ul>
        </div>
        
        <!-- Technologies -->
        <div>
          <h4 class="text-white font-medium mb-3">{$t('experience.technologiesUsed')}</h4>
          <div class="flex flex-wrap gap-2">
            {#each experience.technologies as tech, techIndex}
              <span class="tech-badge px-3 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full font-medium border border-blue-500/30 backdrop-filter backdrop-blur-sm transition-all duration-300" in:bounceIn={{ delay: 600 + techIndex * 50 }}>
                {tech}
              </span>
            {/each}
          </div>
        </div>
      </div>
    {/if}
  </div>
</div>

<style>
  .experience-card {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(20px);
    border-radius: 1rem;
    padding: 2rem;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    border: 1px solid rgba(59, 130, 246, 0.2);
    position: relative;
    overflow: hidden;
    z-index: 15;
    transform: translateZ(0);
  }

  @media (max-width: 768px) {
    .experience-card {
      padding: 1.5rem;
    }
  }

  @media (max-width: 640px) {
    .experience-card {
      padding: 1.25rem;
    }
  }

  .experience-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, #3b82f6, transparent);
  }

  .experience-card:hover {
    background: rgba(255, 255, 255, 0.08);
    box-shadow: 0 20px 40px rgba(59, 130, 246, 0.2);
    border-color: rgba(59, 130, 246, 0.4);
  }

  .experience-card::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.1), transparent);
    transition: left 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    pointer-events: none;
  }

  .experience-card:hover::after {
    left: 100%;
  }

  .tech-badge {
    position: relative;
    cursor: pointer;
  }

  .tech-badge:hover {
    background: rgba(59, 130, 246, 0.3);
    color: #93c5fd;
    border-color: rgba(59, 130, 246, 0.5);
    transform: translateY(-1px);
    box-shadow: 
      0 4px 12px rgba(59, 130, 246, 0.25),
      0 0 20px rgba(59, 130, 246, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
  }

  .tech-badge::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(147, 197, 253, 0.05));
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .tech-badge:hover::before {
    opacity: 1;
  }

  .tech-badge::after {
    content: '';
    position: absolute;
    inset: -2px;
    border-radius: inherit;
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(147, 197, 253, 0.1));
    opacity: 0;
    z-index: -1;
    filter: blur(4px);
    transition: opacity 0.3s ease;
  }

  .tech-badge:hover::after {
    opacity: 1;
  }

  @media (max-width: 768px) {
    .tech-badge:hover {
      transform: none;
      box-shadow: 0 2px 8px rgba(59, 130, 246, 0.2);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .tech-badge {
      transition: none;
    }
    
    .tech-badge:hover {
      transform: none;
    }
  }
</style>