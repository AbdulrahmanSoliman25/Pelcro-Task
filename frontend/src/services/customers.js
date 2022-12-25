import axios from "@/network/axios";
import * as ep from "../endpoints/customers";

export default class {
  static async getCustomers(page) {
    return await axios
      .get(ep.base.replace("num", page))
      .then((res) => res.data);
  }
  static async createCustomer(payload) {
    return await axios.post(ep.create, payload).then((res) => res.data);
  }
  static async fetchCustomer(id) {
    return await axios
      .get(ep.update.replace("id", id))
      .then((res) => res.data.data);
  }
  static async updateCustomer(payload, id) {
    return await axios
      .patch(ep.update.replace("id", id), payload)
      .then((res) => res.data);
  }
  static async deleteCustomer(id) {
    return await axios
      .delete(ep.remove.replace("id", id))
      .then((res) => res.data);
  }
}
