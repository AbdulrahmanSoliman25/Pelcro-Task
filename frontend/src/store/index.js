import Vue from "vue";
import Vuex from "vuex";
import Alert from "./alert";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: false,
  },
  mutations: {
    setLoading(state, status) {
      state.loading = status;
    },
  },
  getters: {
    loadingStatus(state) {
      return state.loading;
    },
  },
  actions: {},
  modules: {
    Alert,
  },
});
