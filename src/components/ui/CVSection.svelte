<script lang="ts">
  import { FileText, Download } from 'lucide-svelte'
  import { t } from '../../utils/i18n'
  import { fadeIn } from '../../utils/animations'
  
  interface Props {
    isVisible: boolean
    animationDelay: number
  }
  
  let { isVisible, animationDelay }: Props = $props()
  
  // Single CV file (Spanish) — download only one version
  const cvFile = '/CV - CARLOS LIZARAZO (ESPAÑOL).pdf'

  const downloadCV = async () => {
    try {
      // If File System Access API is available, allow save-as
      if ('showSaveFilePicker' in window) {
        const fileHandle = await (window as any).showSaveFilePicker({
          suggestedName: `CV-Carlos-Lizarazo-ES.pdf`,
          types: [{
            description: 'PDF files',
            accept: { 'application/pdf': ['.pdf'] }
          }]
        })

        const response = await fetch(cvFile)
        const blob = await response.blob()

        const writable = await fileHandle.createWritable()
        await writable.write(blob)
        await writable.close()
      } else {
        // Fallback traditional download
        const response = await fetch(cvFile)
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)

        const link = document.createElement('a')
        link.href = url
        link.download = `CV-Carlos-Lizarazo-ES.pdf`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        window.URL.revokeObjectURL(url)
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.warn('Error downloading CV:', error)
      }
    }
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
    
    <!-- CV Download Button (single) -->
    <div class="flex justify-center items-center max-w-md mx-auto">
      <button
        onclick={() => downloadCV()}
        class="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-blue-500/25 font-medium text-base"
      >
        <Download size={20} />
        <span>{$t('contact.cv.download')}</span>
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