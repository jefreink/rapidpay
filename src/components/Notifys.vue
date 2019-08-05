<template>
  <div>
    <div v-if="notify">
      <b-toast
        v-model="toastShow"
        :toaster="notify.position"
        @hidden="clear"
        auto-hide-delay="5000"
        solid
      >
        <div slot="toast-title" class="d-flex flex-grow-1 align-items-baseline">
          <b-img blank :blank-color="notify.color" class="mr-2" width="12" height="12"></b-img>
          <strong class="mr-auto" v-html="notify.title"></strong>
        </div>
        <div v-html="notify.msg"></div>
      </b-toast>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "Notify",
  data() {
    return {
      toastShow: true,
      position: "",
      toastContent: [],
      toastError: false
    };
  },
  methods: {
    ...mapMutations(["limpiarNotify"]),
    clear() {
      this.$store.commit("limpiarNotify");
      this.toastShow = true;
    },
    verificarData() {
      this.$store
        .dispatch("checkUserStatus")
        .then(usuario => {
        })
        .catch(error => {});
    }
  },
  watch: {
    userData: function(val) {
      if (val !== undefined) {
        this.verificarData()
      }
    }
  },
  computed: {
    ...mapGetters({
      notify: "sendNotifys",
      userData: 'sendUserData'
    })
  }
};
</script>
<style src="../styles/toast.sass" lang="sass"></style>