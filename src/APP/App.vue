<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import mixins from './mixins';
import Vue from 'vue'
export default {
  name: 'app',
  mixins: [mixins],
  components: {
    // HelloWorld
  },
  created() {
    this.handler();
    let HelloWorld = Vue.extend(HelloWorld);
    
    const Hello = () => {
      const el = new HelloWorld({});
      el.$mount();
      document.body.appendChild(el.$el);
    }

    alert('我是一个弹窗'); // 我是一个注释

    Vue.use(() => {
      Vue.prototype.$Hello = Hello;
    });
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
</style>
