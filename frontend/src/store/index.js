import Vue from "vue";
import Vuex from "vuex";
import Alert from "./alert";
import Auth from "./auth";
import Customer from "./customers";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: false,
    backendErrors: [],
  },
  mutations: {
    setLoading(state, status) {
      state.loading = status;
    },
    setBackendErrors(state, payload) {
      state.backendErrors = payload;
  },
  },
  getters: {
    loadingStatus(state) {
      return state.loading;
    },
    backendErrors(state) {
      return state.backendErrors;
  },
  },
  actions: {},
  modules: {
    Alert,
    Auth,
    Customer,
  },
});
