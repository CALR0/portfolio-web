<script lang="ts">
  import { onMount } from 'svelte'
  import { observeElement } from '../../utils/intersection'
  import { slideUp, scaleIn, fadeIn } from '../../utils/animations'
  import { primarySkills, additionalSkills } from '../../data/skills'
  import SkillCard from '../ui/SkillCard.svelte'
  import { t } from '../../utils/i18n'
  
  let sectionRef: HTMLElement
  let isVisible = $state(false)
  let skillsAnimated = $state(false)
  let primarySkillsVisible = $state(false)
  let additionalSkillsVisible = $state(false)
  
  onMount(() => {
    const cleanup = observeElement(
      sectionRef,
      (visible) => {
        if (visible) {
          isVisible = true
          setTimeout(() => {
            skillsAnimated = true
          }, 400)
          setTimeout(() => {
            primarySkillsVisible = true
          }, 600)
          setTimeout(() => {
            additionalSkillsVisible = true
          }, 900)
        }
      },
      { 
        threshold: [0.1, 0.2, 0.3],
        rootMargin: '80px 0px -30px 0px'
      }
    )
    
    return cleanup
  })
</script>

<section id="skills" class="py-20 relative section-transition" bind:this={sectionRef}>
  <!-- Enhanced decorative elements -->
  <div class="absolute bottom-0 left-0 w-96 h-96 bg-white/[0.01] rounded-full filter blur-3xl opacity-50 animate-pulse-glow"></div>
  <div class="absolute top-1/3 right-0 w-64 h-64 bg-blue-500/[0.015] rounded-full filter blur-2xl opacity-30 animate-float"></div>
  
  <div class="container">
    <div class="max-w-5xl mx-auto">
      <div class="text-center mb-16">
        {#if isVisible}
          <h2 class="text-5xl font-bold text-white mb-4" in:slideUp={{ delay: 0 }}>{$t('skills.title')}</h2>
          <div class="w-24 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto mb-6 transition-all duration-700" in:scaleIn={{ delay: 200 }}></div>
          <p class="text-lg text-gray-300 max-w-2xl mx-auto" in:fadeIn={{ delay: 400 }}>
            {$t('skills.description')}
          </p>
        {/if}
      </div>
      
      <!-- Primary Technologies -->
      <div class="mb-12">
        {#if isVisible}
          <h3 class="text-2xl font-semibold text-white mb-8 text-center" in:fadeIn={{ delay: 500 }}>
            {$t('skills.coreTitle')}
          </h3>
        {/if}
        
        <!-- Desktop Layout: 4 + 3 aligned -->
        <div class="hidden lg:block">
          <div class="max-w-4xl mx-auto">
            <!-- First row: 4 skills -->
            <div class="grid grid-cols-4 gap-8 mb-12">
              {#each primarySkills.slice(0, 4) as skill, index}
                <SkillCard 
                  {skill} 
                  isVisible={primarySkillsVisible}
                  animationDelay="{0.1 + index * 0.08}"
                  animationType="bounce-in"
                />
              {/each}
            </div>
            
            <!-- Second row: 3 skills centered -->
            <div class="flex justify-center">
              <div class="grid grid-cols-3 gap-8 max-w-2xl">
                {#each primarySkills.slice(4) as skill, index}
                  <SkillCard 
                    {skill}
                    isVisible={primarySkillsVisible}
                    animationDelay="{0.42 + index * 0.08}"
                    animationType="bounce-in"
                  />
                {/each}
              </div>
            </div>
          </div>
        </div>
        
        <!-- Mobile/Tablet Layout with centered last item -->
        <div class="lg:hidden">
          <!-- First 6 skills in grid -->
          <div class="grid grid-cols-2 md:grid-cols-3 gap-6 mb-6">
            {#each primarySkills.slice(0, 6) as skill, index}
              <SkillCard 
                {skill} 
                isVisible={primarySkillsVisible}
                animationDelay="{0.1 + index * 0.06}"
                animationType="bounce-in"
              />
            {/each}
          </div>
          
          <!-- Last skill centered -->
          {#if primarySkills.length > 6}
            <div class="flex justify-center">
              <div class="w-1/2 md:w-1/3">
                <SkillCard 
                  skill={primarySkills[6]}
                  isVisible={primarySkillsVisible}
                  animationDelay="{0.46}"
                  animationType="bounce-in"
                />
              </div>
            </div>
          {/if}
        </div>
      </div>
      
      <!-- Additional Technologies -->
      <div class="mb-12">
        {#if isVisible}
          <h3 class="text-2xl font-semibold text-white mb-8 text-center" in:fadeIn={{ delay: 700 }}>
            {$t('skills.additionalTitle')}
          </h3>
        {/if}
        
        <!-- Desktop Layout: 4 + 2 aligned -->
        <div class="hidden lg:block">
          <div class="max-w-4xl mx-auto">
            <!-- First row: 4 skills -->
            <div class="grid grid-cols-4 gap-8 mb-12">
              {#each additionalSkills.slice(0, 4) as skill, index}
                <SkillCard 
                  {skill} 
                  isVisible={additionalSkillsVisible}
                  animationDelay="{0.1 + index * 0.08}"
                  animationType="rotate-in"
                />
              {/each}
            </div>
            
            <!-- Second row: 2 skills aligned with first and third columns -->
            <div class="grid grid-cols-4 gap-8">
              <div class="col-start-2">
                <SkillCard 
                  skill={additionalSkills[4]}
                  isVisible={additionalSkillsVisible}
                  animationDelay="{0.42}"
                  animationType="rotate-in"
                />
              </div>
              <div class="col-start-3">
                <SkillCard 
                  skill={additionalSkills[5]}
                  isVisible={additionalSkillsVisible}
                  animationDelay="{0.5}"
                  animationType="rotate-in"
                />
              </div>
            </div>
          </div>
        </div>
        
        <!-- Mobile/Tablet Layout -->
        <div class="lg:hidden grid grid-cols-2 md:grid-cols-3 gap-6">
          {#each additionalSkills as skill, index}
            <SkillCard 
              {skill} 
              isVisible={additionalSkillsVisible}
              animationDelay="{0.1 + index * 0.06}"
              animationType="rotate-in"
            />
          {/each}
        </div>
      </div>
      
      <!-- Enhanced Frontend Expertise Description -->
      {#if isVisible}
        <div class="text-center" in:scaleIn={{ delay: 1200 }}>
          <p class="text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
            {$t('skills.frontendExpertise')}
          </p>
        </div>
      {/if}
    </div>
  </div>
</section>