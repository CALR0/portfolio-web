<script lang="ts">
  import { onMount } from 'svelte'
  
  let videoElement: HTMLVideoElement
  let isLoaded = $state(false)
  let hasError = $state(false)
  let fadeOverlay = $state(0) // Cambiar a número para más control
  
  onMount(() => {
    if (videoElement) {
      // Configurar el video para que se reproduzca automáticamente
      videoElement.muted = true
      videoElement.playsInline = true
      videoElement.loop = true
      
      // Manejar eventos del video
      videoElement.addEventListener('loadeddata', () => {
        isLoaded = true
        videoElement.play().catch(console.error)
      })
      
      videoElement.addEventListener('error', () => {
        hasError = true
        console.error('Error loading video background')
      })
      
      // Crear transición suave en el loop - MEJORADA
      videoElement.addEventListener('timeupdate', () => {
        const duration = videoElement.duration
        const currentTime = videoElement.currentTime
        
        if (duration > 0) {
          // Transición más larga y suave - últimos 1.2 segundos
          if (duration - currentTime <= 1.2) {
            // Fade gradual más pronunciado
            const timeLeft = duration - currentTime
            const fadeProgress = 1 - (timeLeft / 1.2)
            fadeOverlay = Math.min(fadeProgress * 0.3, 0.3) // Reducido de 0.4 a 0.3
          }
          // Primeros 1.2 segundos - fade out gradual
          else if (currentTime <= 1.2) {
            const fadeProgress = currentTime / 1.2
            fadeOverlay = Math.max(0.3 - (fadeProgress * 0.3), 0) // Reducido de 0.4 a 0.3
          }
          // En el medio del video, sin overlay
          else {
            fadeOverlay = 0
          }
        }
      })
      
      // Intentar cargar el video
      videoElement.load()
    }
  })
</script>

<div class="fixed inset-0 w-full h-full overflow-hidden z-0">
  <!-- Video background -->
  <video
    bind:this={videoElement}
    class="absolute inset-0 w-full h-full object-cover transition-all duration-700"
    autoplay
    muted
    loop
    playsinline
    preload="auto"
  >
    <source src="/src/assets/videoplayback.webm" type="video/webm">
    <!-- Fallback para navegadores que no soporten webm -->
    Your browser does not support the video tag.
  </video>
  
  <!-- Overlay de transición mejorado para suavizar el loop -->
  <div 
    class="absolute inset-0 bg-gradient-to-b from-black/20 via-black/15 to-black/20 transition-opacity duration-1000 ease-in-out pointer-events-none"
    style="opacity: {fadeOverlay};"
  ></div>
  
  <!-- Overlay oscuro para mejorar legibilidad del texto - REDUCIDO -->
  <div class="absolute inset-0 bg-black/25 backdrop-blur-[0.5px]"></div>
  
  <!-- Gradiente cinematográfico para mejorar la estética - MÁS SUTIL -->
  <div class="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/20"></div>
  
  <!-- Vignette más sutil -->
  <div class="absolute inset-0" style="background: radial-gradient(circle at center, transparent 0%, transparent 70%, rgba(0,0,0,0.2) 100%);"></div>
  
  <!-- Overlay con movimiento muy sutil para crear continuidad visual - MÁS VISIBLE -->
  <div class="absolute inset-0 opacity-8 pointer-events-none">
    <div class="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/8 to-transparent animate-pulse" style="animation-duration: 15s;"></div>
    <div class="absolute inset-0 bg-gradient-to-b from-transparent via-white/3 to-transparent animate-pulse" style="animation-duration: 20s; animation-delay: 5s;"></div>
  </div>
  
  <!-- Loading state -->
  {#if !isLoaded && !hasError}
    <div class="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
      <div class="text-white text-lg">Loading...</div>
    </div>
  {/if}
  
  <!-- Error fallback -->
  {#if hasError}
    <div class="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"></div>
  {/if}
</div>

<style>
  /* Optimizaciones para performance */
  video {
    will-change: auto;
    transform: translateZ(0);
    /* Filtros mejorados para mejor apariencia cinematográfica - MÁS BRILLANTE */
    filter: brightness(1.05) contrast(1.12) saturate(1.25) hue-rotate(3deg);
  }
  
  /* Responsive optimizations */
  @media (max-width: 768px) {
    video {
      /* En móviles, usar object-position para centrar mejor el video */
      object-position: center center;
      /* Mantener buena visibilidad en móviles */
      filter: brightness(1.0) contrast(1.15) saturate(1.2) hue-rotate(2deg);
    }
  }
  
  @media (max-width: 480px) {
    video {
      /* En pantallas muy pequeñas, ajustar la posición */
      object-position: center 30%;
      filter: brightness(0.95) contrast(1.18) saturate(1.15);
    }
  }
  
  /* Optimización para dispositivos con poca potencia */
  @media (prefers-reduced-motion: reduce) {
    video {
      animation: none;
    }
    
    /* Desactivar animaciones si el usuario prefiere menos movimiento */
    .animate-pulse {
      animation: none !important;
    }
  }
  
  /* Optimización para modo oscuro del sistema */
  @media (prefers-color-scheme: dark) {
    .bg-black\/25 {
      background-color: rgba(0, 0, 0, 0.3);
    }
  }
</style>