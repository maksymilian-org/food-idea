import { createStore } from 'vuex';

const state = {
  apiKey: 'apiKey=c9c8b9e56bc24b6f8baa7520ab3d7f66',
  theme: 'light',
};

const mutations = {
  toggleTheme(state) {
    state.theme = state.theme === 'light' ? 'dark' : 'light';
  },
};

export default createStore({
  state,
  mutations,
});
