<template>
  <div id="app">
    <MainView />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import MainView from './components/MainView.vue';

  export default Vue.extend({
    name: 'App',
    components: {
      MainView,
    },
  });
</script>

<style scoped>
  #app {
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
