<template>
  <div>
    <nav :class="[{'bg-black':position}, 'navbar navbar-expand-sm fixed-top']">
      <a class="navbar-brand mx-auto font-weight-bold" href="#">
        <div class="logo" v-if="params.logo" v-html="'RapidPay'"></div>
      </a>
      <ul class="navbar-nav flex-row-reverse">
        <li class="nav-item">
          <a class="nav-link text-white" href="#" @click="back" v-if="params.showRuta">
            <TrendingNeutral class="back" />
          </a>
        </li>
        <li v-if="params.showImg">
          <b-dropdown right>
             <template slot="text">
             <img :src="params.img" alt class="rounded-circle" />
              </template>
              <transition name="slideUp">
            <b-dropdown-item href="#"  @click="logout" class="animated fadeInUp">
              <span v-html="'Cerrar sesion'"></span>
            </b-dropdown-item>
              </transition>
          </b-dropdown>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import TrendingNeutral from "vue-material-design-icons/TrendingNeutral.vue";

export default {
  name: "Top",
  components: {
    TrendingNeutral
  },
  data() {
    return {
      position: false,
      user: [],
      foto: null
    };
  },
  methods: {
    ...mapActions(["logout"]),
    logout() {
      this.$store
        .dispatch("logout")
        .then(usuario => {
          this.$router.replace("/");
        })
        .catch(error => {
          this.$router.replace("/");
        });
    },
    back() {
      this.$router.replace(this.params.back);
    },
    Scroll(event) {
      if (window.scrollY > 0) {
        this.position = true;
      } else {
        this.position = false;
      }
    }
  },
  created() {
    window.addEventListener("scroll", this.Scroll);
  },
  computed: {
    ...mapGetters({
      params: "headerParams"
    })
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.Scroll);
  }
};
</script>

<style lang="sass">
  .navbar
    padding: 0 !important
    background: transparent
    min-height: 50px
    &.bg-black
        background: linear-gradient(to top, #000 20%, #0b1844 100%)
    .dropdown
      position: absolute
      right: 0
      top: 0
      .dropdown-toggle
        background: transparent !important
        box-shadow: none !important
        border: none
        &::after
          filter: drop-shadow(0 0 5px #226efa) drop-shadow(0px 0 0px #226efa)
        img
          width: 40px
      .dropdown-menu
        background: #030720
        animation-duration: 1s
        animation-fill-mode: both
        animation-name: fadeIn
        a
          background: transparent !important
          color: #95bfe8
    .logo
      font-size: 1.5rem
      color: #fff
      font-family: Mont-Bold
      text-shadow: 0 0px 30px #7bd4ff
    .back
      font-size: 3em
      transform: rotate(180deg)
      position: absolute
      left: 10px
      top: 5px
    .menu
      position: absolute
      right: 2px
      top: 0px
      font-size: 2.5em

  .slideUp-enter-active 
    transition: all 0.5s ease

  .slideUp-leave-active 
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1)

  .slideUp-enter,
  .slideUp-leave-to 
    transform: translateY(100px)
    opacity: 1
</style>