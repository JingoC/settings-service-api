<template>
  <div id="app">
    <div class="container">
      <div class="row">
        <main-view></main-view>
      </div>
    </div>
  </div>
</template>

<script>

import MainView from "./views/config-view/main-view"

export default {
  name: 'App',
  components: {
    MainView
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
