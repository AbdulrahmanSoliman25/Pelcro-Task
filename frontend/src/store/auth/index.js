import AuthService from "../../services/auth";
import router from "../../router";

export default {
  namespaced: true,
  state: {
    admin: [],
    token: localStorage.getItem("authorization") || "",
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    adminData: (state) => state.admin,
  },
  mutations: {
    setAdmin(state, payload) {
      state.admin = payload;
    },
    setToken(state, payload) {
      localStorage.setItem("authorization", payload);
      state.token = payload;
    },
  },
  actions: {
    async loginAction({ dispatch, commit }, object) {
      try {
        const response = await AuthService.login(object);
        if (response.status == 200) {
          commit("setToken", response.data.token);
          localStorage.getItem("authorization");
          debugger;
          commit("setAdmin", response.data);
          const toasObj = {
            message: response.message,
            config: {
              position: "bottom-right",
              timeout: 5000,
              icon: true,
              hideProgressBar: true,
            },
          };
          const toastInfo = { toasObj, type: "success" };
          dispatch("Alert/toast", toastInfo, { root: true });
          router.push({
            name: "home",
          });
        } else {
          const toasObj = {
            message: response.message,
            config: {
              position: "bottom-right",
              timeout: 5000,
              icon: true,
              hideProgressBar: true,
            },
          };
          const toastInfo = { toasObj, type: "error" };
          dispatch("Alert/toast", toastInfo, { root: true });
          dispatch("logoutAction");
        }
      } catch (err) {
        console.log(err);
      } finally {
      }
    },
    async logoutAction({ dispatch, commit }) {
      try {
        const response = await AuthService.logout();
        if (response.status == 200) {
          localStorage.removeItem("authorization");
          commit("setToken", "");
          const toasObj = {
            message: response.message,
            config: {
              position: "bottom-right",
              timeout: 5000,
              icon: true,
              hideProgressBar: true,
            },
          };
          const toastInfo = { toasObj, type: "success" };
          dispatch("Alert/toast", toastInfo, { root: true });
          router.go();
        } else {
          const toasObj = {
            message: response.message,
            config: {
              position: "bottom-right",
              timeout: 5000,
              icon: true,
              hideProgressBar: true,
            },
          };
          const toastInfo = { toasObj, type: "error" };
          dispatch("Alert/toast", toastInfo, { root: true });
        }
      } catch (err) {
        console.log(err);
      } finally {
      }
    },
  },
};
