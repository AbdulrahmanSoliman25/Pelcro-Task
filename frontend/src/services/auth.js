import axios from "@/network/axios";
import * as ep from "../endpoints/auth";

export default class {
  static async login(payload) {
    return await axios
      .post(ep.login, payload, {
        headers: {
          Authorization: null,
        },
      })
      .then((res) => res.data);
  }
  static async logout() {
    return await axios.post(ep.logout).then((res) => res.data);
  }
}
