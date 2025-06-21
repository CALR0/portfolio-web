<script lang="ts">
  import { bounceIn } from '../../utils/animations'
  import { t } from '../../utils/i18n'
  import type { SocialLink } from '../../types'
  
  interface Props {
    social: SocialLink
    isVisible: boolean
    animationDelay: string
    index: number
  }
  
  let { social, isVisible, animationDelay, index }: Props = $props()
  
  // Componente personalizado para el icono de X
  function XIcon(node: HTMLElement, props: { size: number, class: string }) {
    node.innerHTML = `
      <svg width="${props.size}" height="${props.size}" viewBox="0 0 24 24" fill="currentColor" class="${props.class}">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    `;
    return {
      update(newProps: { size: number, class: string }) {
        node.innerHTML = `
          <svg width="${newProps.size}" height="${newProps.size}" viewBox="0 0 24 24" fill="currentColor" class="${newProps.class}">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        `;
      }
    };
  }

  // Get social link key for translations
  const getSocialKey = (label: string) => {
    return label.toLowerCase()
  }
</script>

{#if isVisible}
  <a 
    href={social.href}
    target="_blank"
    rel="noopener noreferrer"
    class="group flex flex-col items-center p-4 sm:p-6 lg:p-8 glass-effect rounded-xl shadow-2xl contact-button border border-blue-500/20 {social.bgColor} hover-glow relative overflow-hidden"
    aria-label={$t(`contact.socialLinks.${getSocialKey(social.label)}.label`)}
    in:bounceIn={{ delay: parseInt(animationDelay) * 1000 }}
  >
    <!-- Floating particles with smooth animations -->
    <div class="absolute top-2 right-2 w-2 h-2 bg-blue-400/40 rounded-full opacity-0 group-hover:opacity-100 animate-ping particle-1"></div>
    <div class="absolute bottom-2 left-2 w-1.5 h-1.5 bg-blue-300/30 rounded-full opacity-0 group-hover:opacity-100 animate-bounce particle-2"></div>
    
    <!-- Icon with enhanced smooth effects -->
    <div class="relative mb-3 sm:mb-4 icon-container">
      {#if social.icon === 'X'}
        <div use:XIcon={{ size: 28, class: `text-gray-300 contact-icon ${social.color} sm:w-9 sm:h-9` }}></div>
      {:else}
        <social.icon 
          size={28} 
          class="text-gray-300 contact-icon {social.color} sm:w-9 sm:h-9" 
        />
      {/if}
      
      <!-- Smooth glow effect -->
      <div class="absolute inset-0 rounded-full opacity-0 group-hover:opacity-30 icon-glow" style="background: {social.color === 'hover:text-blue-400' ? '#3b82f6' : social.color === 'hover:text-white' ? '#ffffff' : '#6b7280'}; filter: blur(8px);"></div>
    </div>
    
    <!-- Label with smooth shimmer effect -->
    <span class="text-xs sm:text-sm font-medium text-gray-300 group-hover:text-white contact-label text-center mb-1">
      {$t(`contact.socialLinks.${getSocialKey(social.label)}.label`)}
    </span>
    
    <!-- Description with smooth transition -->
    <span class="text-xs text-gray-500 group-hover:text-gray-400 contact-description text-center opacity-0 group-hover:opacity-100">
      {$t(`contact.socialLinks.${getSocialKey(social.label)}.description`)}
    </span>
    
    <!-- Smooth decorative border animation -->
    <div class="absolute inset-0 rounded-xl border border-blue-400/0 group-hover:border-blue-400/30 contact-border"></div>
  </a>
{/if}

<style>
  /* Ultra smooth contact button hover effects */
  .contact-button {
    transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    transform: translateY(0) translateZ(0);
    will-change: transform, box-shadow;
  }

  .contact-button:hover {
    transform: translateY(-8px) translateZ(0);
    box-shadow: 0 20px 40px rgba(59, 130, 246, 0.25);
    transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .icon-container {
    transition: all 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    transform: scale(1) translateZ(0);
  }

  .group:hover .icon-container {
    transform: scale(1.15) translateZ(0);
    transition: all 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .contact-icon {
    transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    transform: scale(1) translateZ(0);
  }

  .group:hover .contact-icon {
    transform: scale(1.05) translateZ(0);
    transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .icon-glow {
    transition: opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .contact-label {
    transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .contact-description {
    transition: all 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .contact-border {
    transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .particle-1 {
    transition: opacity 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    animation-delay: 0.2s;
  }

  .particle-2 {
    transition: opacity 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    animation-delay: 0.4s;
  }

  @media (max-width: 768px) {
    .contact-button:hover {
      transform: translateY(-6px) translateZ(0);
    }

    .group:hover .icon-container {
      transform: scale(1.1) translateZ(0);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .contact-button,
    .icon-container,
    .contact-icon,
    .icon-glow,
    .contact-label,
    .contact-description,
    .contact-border,
    .particle-1,
    .particle-2 {
      transition: none !important;
    }
    
    .contact-button:hover,
    .group:hover .icon-container,
    .group:hover .contact-icon {
      transform: none !important;
    }
  }

  @media (hover: none) and (pointer: coarse) {
    .contact-button:hover {
      transform: none;
    }
    
    .contact-button:active {
      transform: translateY(-3px) scale(0.98);
      transition: all 0.3s ease;
    }
    
    .group:hover .icon-container,
    .group:hover .contact-icon {
      transform: none;
    }
  }
</style>