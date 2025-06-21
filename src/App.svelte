<script lang="ts">
  import Hero from './components/sections/Hero.svelte'
  import About from './components/sections/About.svelte'
  import Experience from './components/sections/Experience.svelte'
  import Skills from './components/sections/Skills.svelte'
  import Projects from './components/sections/Projects.svelte'
  import Contact from './components/sections/Contact.svelte'
  import Navigation from './components/layout/Navigation.svelte'
  import VideoBackground from './components/layout/VideoBackground.svelte'
</script>

<VideoBackground />
<Navigation />

<main>
  <Hero />
  <About />
  <Experience />
  <Skills />
  <Projects />
  <Contact />
</main>