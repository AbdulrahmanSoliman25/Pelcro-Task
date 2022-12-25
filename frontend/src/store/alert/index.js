export default {
  namespaced: true,
  actions: {
    toast({}, toastInfo) {
      if (toastInfo.type === "success") {
        this._vm.$toast.success(
          toastInfo.toasObj.message,
          toastInfo.toasObj.config
        );
      }
      if (toastInfo.type === "error") {
        this._vm.$toast.error(
          toastInfo.toasObj.message,
          toastInfo.toasObj.config
        );
      }
    },
  },
};
