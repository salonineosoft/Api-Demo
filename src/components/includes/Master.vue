<template>
  <div>
   <Nav/>
    <Slider/>
   <Sidebar/>
   <Footer/>
  </div>
</template>

<script>
import Nav from './Nav.vue'
import Footer from '../Footer.vue'
import Sidebar from '../Front/Sidebar.vue'
import Slider from '../Front/Slider.vue'
export default {
  name: 'Master',
  components: {
    Nav,
    Footer,
    Sidebar,
    Slider
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
