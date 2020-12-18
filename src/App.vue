<template>
  <theme-provider :theme="theme">
    <div class="custom-control custom-switch text-right mr-3">
      <input
        type="checkbox"
        class="custom-control-input"
        id="customSwitch1"
        @click="toggleTheme"
      />
      <label class="custom-control-label" for="customSwitch1">dark theme</label>
    </div>
    <router-view />
  </theme-provider>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import ThemeProvider from './components/ThemeProvider.vue';

export default {
  components: {
    ThemeProvider,
  },
  setup() {
    const store = useStore();

    return {
      theme: computed(() => store.state.theme),
      toggleTheme: () => store.commit('toggleTheme'),
    };
  },
};
</script>

<style lang="scss">
@import url('../node_modules/bootstrap/dist/css/bootstrap.min.css');

html {
  height: 100%;
  position: relative;
}
body {
  height: 100%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.card,
.list-group-item {
  background-color: inherit;
}
</style>
