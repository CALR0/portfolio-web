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

  // Compute how many items form full desktop rows (4 columns)
  const additionalCount = additionalSkills.length
  const additionalRemainder = additionalCount % 4
  const additionalFull = additionalCount - additionalRemainder
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
        
        <!-- Desktop Layout: uniform grid so items wrap evenly -->
        <div class="hidden lg:block">
          <div class="max-w-4xl mx-auto">
            <div class="grid grid-cols-4 gap-8 mb-12">
              {#each primarySkills as skill, index}
                <SkillCard 
                  {skill} 
                  isVisible={primarySkillsVisible}
                  animationDelay="{0.1 + index * 0.08}"
                  animationType="bounce-in"
                />
              {/each}
            </div>
          </div>
        </div>

        <!-- Mobile/Tablet Layout: responsive grid showing all skills evenly -->
        <div class="lg:hidden">
          <div class="grid grid-cols-2 md:grid-cols-3 gap-6 mb-6">
            {#each primarySkills as skill, index}
              <SkillCard 
                {skill} 
                isVisible={primarySkillsVisible}
                animationDelay="{0.1 + index * 0.06}"
                animationType="bounce-in"
              />
            {/each}
          </div>
        </div>
      </div>
      
      <!-- Additional Technologies -->
      <div class="mb-12">
        {#if isVisible}
          <h3 class="text-2xl font-semibold text-white mb-8 text-center" in:fadeIn={{ delay: 700 }}>
            {$t('skills.additionalTitle')}
          </h3>
        {/if}
        
        <!-- Desktop Layout: show full rows of 4, and center the last incomplete row -->
        <div class="hidden lg:block">
          <div class="max-w-4xl mx-auto">
            {#if additionalFull > 0}
              <div class="grid grid-cols-4 gap-8 mb-8">
                {#each additionalSkills.slice(0, additionalFull) as skill, index}
                  <SkillCard 
                    {skill} 
                    isVisible={additionalSkillsVisible}
                    animationDelay="{0.1 + index * 0.08}"
                    animationType="rotate-in"
                  />
                {/each}
              </div>
            {/if}

            {#if additionalRemainder === 1}
              <div class="flex justify-center">
                <div class="grid grid-cols-1 gap-8 max-w-2xl">
                  {#each additionalSkills.slice(additionalFull) as skill, index}
                    <SkillCard 
                      {skill}
                      isVisible={additionalSkillsVisible}
                      animationDelay="{0.1 + index * 0.08}"
                      animationType="rotate-in"
                    />
                  {/each}
                </div>
              </div>
            {:else if additionalRemainder === 2}
              <div class="flex justify-center">
                <div class="grid grid-cols-2 gap-8 max-w-2xl">
                  {#each additionalSkills.slice(additionalFull) as skill, index}
                    <SkillCard 
                      {skill}
                      isVisible={additionalSkillsVisible}
                      animationDelay="{0.1 + index * 0.08}"
                      animationType="rotate-in"
                    />
                  {/each}
                </div>
              </div>
            {:else if additionalRemainder === 3}
              <div class="flex justify-center">
                <div class="grid grid-cols-3 gap-8 max-w-2xl">
                  {#each additionalSkills.slice(additionalFull) as skill, index}
                    <SkillCard 
                      {skill}
                      isVisible={additionalSkillsVisible}
                      animationDelay="{0.1 + index * 0.08}"
                      animationType="rotate-in"
                    />
                  {/each}
                </div>
              </div>
            {/if}
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