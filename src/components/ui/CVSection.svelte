<script lang="ts">
  import { FileText, Download } from 'lucide-svelte'
  import { t } from '../../utils/i18n'
  import { fadeIn } from '../../utils/animations'
  
  interface Props {
    isVisible: boolean
    animationDelay: number
  }
  
  let { isVisible, animationDelay }: Props = $props()
  
  const cvFiles = {
    en: '/CV - CARLOS LIZARAZO (ENGLISH).pdf',
    es: '/CV - CARLOS LIZARAZO (ESPAÑOL).pdf'
  }
  
  const downloadCV = (language: 'en' | 'es') => {
    const link = document.createElement('a')
    link.href = cvFiles[language]
    link.download = `CV-Carlos-Lizarazo-${language.toUpperCase()}.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
</script>

{#if isVisible}
  <div class="mt-12 sm:mt-16 pt-8 border-t border-blue-500/20" in:fadeIn={{ delay: animationDelay }}>
    <!-- CV Section Header -->
    <div class="text-center mb-8">
      <div class="flex items-center justify-center gap-3 mb-4">
        <FileText size={28} class="text-blue-400" />
        <h3 class="text-xl sm:text-2xl font-semibold text-white">
          {$t('contact.cv.sectionTitle')}
        </h3>
      </div>
      <p class="text-gray-300 text-sm sm:text-base max-w-md mx-auto">
        {$t('contact.cv.description')}
      </p>
    </div>
    
    <!-- CV Download Buttons -->
    <div class="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
      
      <!-- English CV Download Button -->
      <button
        onclick={() => downloadCV('en')}
        class="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-blue-500/25 font-medium text-base"
      >
        <Download size={20} />
        <span>{$t('contact.cv.downloadEnglish')}</span>
      </button>
      
      <!-- Spanish CV Download Button -->
      <button
        onclick={() => downloadCV('es')}
        class="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-blue-500/25 font-medium text-base"
      >
        <Download size={20} />
        <span>{$t('contact.cv.downloadSpanish')}</span>
      </button>
    </div>
    
    <!-- Additional info -->
    <div class="text-center mt-6">
      <p class="text-xs sm:text-sm text-gray-500">
        {$t('contact.cv.additionalInfo')}
      </p>
    </div>
  </div>
{/if}

<style>
  /* Enhanced button hover effects */
  button {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
  }
  
  button::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  button:hover::before {
    left: 100%;
  }
  
  button:active {
    transform: scale(0.98);
  }
  
  /* Responsive adjustments */
  @media (max-width: 640px) {
    button {
      font-size: 0.875rem;
      padding: 1rem 1.5rem;
    }
  }
  
  /* Reduce motion for accessibility */
  @media (prefers-reduced-motion: reduce) {
    button {
      transition: none;
    }
    
    button:hover {
      transform: none;
    }
    
    button::before {
      display: none;
    }
  }
</style>