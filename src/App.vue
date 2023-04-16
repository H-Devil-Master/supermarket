<template>
  <div id="app">
    <Header v-show="$route.meta.show"></Header>
    <router-view></router-view>
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
}
</script>

<style>
*{
  padding: 0;
  margin: 0;
}
#app {
  /*background-color: red;*/
  width: 100vw;
  height: 100vh;
}
</style>
