<template>
<div id="app">
  <h1>av-ts todo test</h1>
</div>
</template>

<script lang="ts">
import { Vue, Component, Trait, Mixin, Lifecycle, p } from 'av-ts';
import Vuex from 'vuex';

import * as AppStore from './store';

Vue.use(Vuex);

const store = AppStore.createStore();

@Component
export default class App extends Vue {
  store = store;

  @Lifecycle beforeCreate() {
    console.log('App.vue/beforeCreate, todos = ', store.getters);
  }
}

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
