<script lang="ts">
  import { Briefcase } from 'lucide-svelte'
  import { onMount } from 'svelte'
  import { NAVIGATION_SECTIONS, updateActiveSection, scrollToSection, type NavigationSection } from '../utils/navigation'
  import { observeElement } from '../utils/intersection'
  import { t } from '../utils/i18n'
  import LanguageToggle from './ui/LanguageToggle.svelte'
  
  let isMenuOpen = $state(false)
  let activeSection = $state<NavigationSection>('home')

  function toggleMenu() {
    isMenuOpen = !isMenuOpen
  }

  function closeMenu() {
    isMenuOpen = false
  }

  onMount(() => {
    // Observer principal
    const observers: (() => void)[] = []
    
    NAVIGATION_SECTIONS.forEach(sectionId => {
      const cleanup = observeElement(
        document.getElementById(sectionId),
        (isVisible, entry) => {
          if (isVisible) {
            const rect = entry.boundingClientRect
            const viewportHeight = window.innerHeight
            
            if (entry.intersectionRatio > 0.3 || rect.top < viewportHeight * 0.3) {
              activeSection = sectionId as NavigationSection
            }
          }
        },
        {
          threshold: [0.1, 0.3, 0.5, 0.7],
          rootMargin: '-80px 0px -30% 0px'
        }
      )
      observers.push(cleanup)
    })

    const scrollHandler = () => {
      updateActiveSection(NAVIGATION_SECTIONS, (section) => {
        activeSection = section as NavigationSection
      })
    }

    window.addEventListener('scroll', scrollHandler, { passive: true })
    
    setTimeout(() => {
      updateActiveSection(NAVIGATION_SECTIONS, (section) => {
        activeSection = section as NavigationSection
      })
    }, 100)

    return () => {
      observers.forEach(cleanup => cleanup())
      window.removeEventListener('scroll', scrollHandler)
    }
  })

  function isActive(section: NavigationSection): boolean {
    return activeSection === section
  }

  function handleNavClick(sectionId: NavigationSection) {
    activeSection = sectionId
    scrollToSection(sectionId)
    closeMenu()
  }

  function handleOutsideClick(event: Event) {
    if (isMenuOpen && event.target instanceof Element) {
      const nav = event.target.closest('nav')
      if (!nav) {
        closeMenu()
      }
    }
  }

  onMount(() => {
    document.addEventListener('click', handleOutsideClick)
    return () => {
      document.removeEventListener('click', handleOutsideClick)
    }
  })
  
  const navigationItems: { id: NavigationSection; labelKey: string }[] = [
    { id: 'home', labelKey: 'nav.home' },
    { id: 'about', labelKey: 'nav.about' },
    { id: 'experience', labelKey: 'nav.experience' },
    { id: 'skills', labelKey: 'nav.skills' },
    { id: 'projects', labelKey: 'nav.projects' },
    { id: 'contact', labelKey: 'nav.contact' }
  ]
</script>

<nav class="fixed w-full top-0 z-50">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <!-- Main navigation bar -->
    <div class="flex justify-between items-center h-16 sm:h-20 lg:h-24">
      <!-- Logo - solo el ícono con glow -->
      <div class="flex items-center flex-shrink-0">
        <button on:click={() => handleNavClick('home')} class="logo-button text-blue-400 hover:text-blue-300 transition-colors duration-300">
          <Briefcase size={28} class="sm:w-8 sm:h-8" />
        </button>
      </div>
      
      <!-- Desktop Navigation - Better centered -->
      <div class="hidden lg:flex items-center justify-center absolute left-1/2 transform -translate-x-1/2">
        <div class="flex items-center space-x-6 xl:space-x-10">
          {#each navigationItems as item}
            <button 
              on:click={() => handleNavClick(item.id)}
              class="{isActive(item.id) ? 'text-blue-400' : 'text-white hover:text-blue-400'} transition-all duration-300 font-medium text-xs xl:text-sm uppercase tracking-wider relative group"
            >
              {$t(item.labelKey)}
            </button>
          {/each}
        </div>
      </div>

      <!-- Right side with language toggle -->
      <div class="hidden lg:flex items-center justify-end flex-shrink-0">
        <LanguageToggle />
      </div>

      <!-- Mobile menu button and language toggle -->
      <div class="lg:hidden flex items-center space-x-3">
        <LanguageToggle />
        <button
          on:click={toggleMenu}
          class="text-white hover:text-blue-400 focus:outline-none focus:text-blue-400 transition-colors p-2 rounded-md hover:bg-white/10 relative z-50"
          aria-label="Toggle menu"
        >
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {#if isMenuOpen}
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            {:else}
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            {/if}
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Navigation Menu -->
    {#if isMenuOpen}
      <div class="lg:hidden bg-black/95 backdrop-blur-md border-t border-white/10 shadow-2xl">
        <div class="px-4 pt-2 pb-3 space-y-1">
          {#each navigationItems as item}
            <button 
              on:click={() => handleNavClick(item.id)}
              class="{isActive(item.id) ? 'text-blue-400 bg-blue-500/20' : 'text-white hover:text-blue-400'} block w-full text-left px-4 py-3 hover:bg-white/10 rounded-md transition-all duration-300 font-medium text-sm uppercase tracking-wider"
            >
              {$t(item.labelKey)}
            </button>
          {/each}
        </div>
      </div>
    {/if}
  </div>
</nav>

<style>
  /* Logo completamente limpio - solo glow */
  .logo-button {
    /* Sin padding, sin background, sin border-radius */
    background: none;
    border: none;
    padding: 0;
    /* Solo el glow effect */
    filter: drop-shadow(0 0 8px rgba(59, 130, 246, 0.3));
    transition: all 0.3s ease;
  }

  .logo-button:hover {
    /* Intensificar el glow al hover */
    filter: drop-shadow(0 0 12px rgba(59, 130, 246, 0.5));
  }
</style>