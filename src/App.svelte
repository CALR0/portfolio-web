<script lang="ts">
  import Hero from './components/Hero.svelte'
  import About from './components/About.svelte'
  import Experience from './components/Experience.svelte'
  import Skills from './components/Skills.svelte'
  import Projects from './components/Projects.svelte'
  import Contact from './components/Contact.svelte'
  import Navigation from './components/Navigation.svelte'
  import VideoBackground from './components/VideoBackground.svelte'
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