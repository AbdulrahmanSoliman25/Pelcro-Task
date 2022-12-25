import CustomersService from "../../services/customers";

export default {
  namespaced: true,

  state: {
    customers: [],
    customer: [],
    pagination: [],
    page: 1,
  },
  mutations: {
    setCustomers(state, payload) {
      state.customers = payload;
    },
    setCustomer(state, payload) {
      state.customer = payload;
    },
    setPagination(state, payload) {
      state.pagination = payload;
    },
    setPage(state, payload) {
      state.page = payload;
    },
  },
  actions: {
    async getCustomersAction({ commit }, page) {
      commit("setLoading", true, { root: true });
      try {
        const response = await CustomersService.getCustomers(page);
        commit("setCustomers", response.data);
        commit("setPagination", response.meta);
      } catch (err) {
        console.log(err);
      } finally {
        commit("setLoading", false, { root: true });
      }
    },
    async getCustomerAction({ commit }, id) {
      commit("setLoading", true, { root: true });
      try {
        const response = await CustomersService.fetchCustomer(id);
        commit("setCustomer", response);
      } catch (err) {
        console.log(err);
      } finally {
        commit("setLoading", false, { root: true });
      }
    },
    async deleteCustomerAction({ commit, dispatch }, id) {
      commit("setLoading", true, { root: true });
      try {
        const response = await CustomersService.deleteCustomer(id);
        const toasObj = {
          message: response.message,
          config: {
            position: "bottom-right",
            timeout: 5000,
            icon: true,
            hideProgressBar: true,
          },
        };
        if (response.status == 200) {
          const toastInfo = { toasObj, type: "success" };
          dispatch("Alert/toast", toastInfo, { root: true });
          dispatch("getCustomersAction");
          commit("setPage", 1);
        } else {
          const toastInfo = { toasObj, type: "error" };
          dispatch("Alert/toast", toastInfo, { root: true });
          commit("setBackendErrors", response.errors, { root: true });
        }
      } catch (err) {
        console.log(err);
      } finally {
        commit("setLoading", false, { root: true });
      }
    },
    async createCustomerAction({ commit, dispatch }, data) {
      commit("setLoading", true, { root: true });
      try {
        const response = await CustomersService.createCustomer(data);

        const toasObj = {
          message: response.message,
          config: {
            position: "bottom-right",
            timeout: 5000,
            icon: true,
            hideProgressBar: true,
          },
        };
        if (response.status == 200) {
          const toastInfo = { toasObj, type: "success" };
          dispatch("Alert/toast", toastInfo, { root: true });
          dispatch("getCustomersAction");
          commit("setPage", 1);
        } else {
          const toastInfo = { toasObj, type: "error" };
          dispatch("Alert/toast", toastInfo, { root: true });
          commit("setBackendErrors", response.errors, { root: true });
        }
      } catch (err) {
        console.log(err);
      } finally {
        commit("setLoading", false, { root: true });
      }
    },
    async updateCustomerAction({ commit, dispatch }, data) {
      commit("setLoading", true, { root: true });
      try {
        const response = await CustomersService.updateCustomer(data, data.id);

        const toasObj = {
          message: response.message,
          config: {
            position: "bottom-right",
            timeout: 5000,
            icon: true,
            hideProgressBar: true,
          },
        };
        if (response.status == 200) {
          const toastInfo = { toasObj, type: "success" };
          dispatch("Alert/toast", toastInfo, { root: true });
          dispatch("getCustomersAction");
          commit("setPage", 1);
        } else {
          const toastInfo = { toasObj, type: "error" };
          dispatch("Alert/toast", toastInfo, { root: true });
          commit("setBackendErrors", response.errors, { root: true });
        }
      } catch (err) {
        console.log(err);
      } finally {
        commit("setLoading", false, { root: true });
      }
    },
  },
  getters: {
    customers(state) {
      return state.customers;
    },
    customer(state) {
      return state.customer;
    },
    pagination(state) {
      return state.pagination;
    },
    page(state) {
      return state.page;
    },
  },
};
