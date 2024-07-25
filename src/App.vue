<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <div id="app">
      <VueHeader/>
      <div id="content" class="content">
        <router-view></router-view>
      </div>
  </div>
</template>

<script>
import VueHeader from './components/layout/Header.vue'

export default {
  name: 'App',
  components: {
    VueHeader
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
