<template>
  <div class="home">
    <div class="contenido">
      <div class="box-logo">
        <div class="logo animated fadeInUpBig" v-html="'RapidPay'"></div>
      </div>
      <sesiones class="animated fadeInDown"></sesiones>
      <HelloWorld msg="Powered by Jefreink Ortuño" email="jefreink@gmail.com" />
    </div>
  </div>
</template>

<script>
import HelloWorld from "@/components/HelloWorld.vue";
import sesiones from "@/components/Signin.vue";
import firebase from "firebase";
import firebaseui from "firebaseui";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "home",
  components: {
    HelloWorld,
    sesiones
  },
  methods: {
    ...mapActions(["validTechnologies"]),
    comprobarEmail() {
      // var rootRef = firebase.database().ref();
      // rootRef.once("value").then(function(snapshot) {
      //   var key = snapshot.key; // null
      //   var childKey = snapshot.child("users/jefreink@gmail.com").key; // "ada"
      //   console.log(key, childKey);
      // });
    }
  },
  mounted() {
    this.$store.dispatch("validTechnologies");
  },
  computed: {
    ...mapGetters({
      Technology: "sendTechnologies"
    })
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/mixins.sass";

.home {
  padding-top: 3rem;
  padding-bottom: 1rem;
  background: #0b1844;
  background: linear-gradient(to bottom, #000 60%, #0b1844);
  min-height: 100vh;
  position: relative;

  .box-logo {
    height: 50vh;
    font-weight: bold;
    .logo {
      font-size: 4.5rem;
      color: #fff;
      text-shadow: 0 0px 30px #7bd4ff;
      @include phone-sm {
        font-size: 3rem;
      }
    }
  }
}
</style>
