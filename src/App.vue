<template>
  <div id="app">
    <Top></Top>
    <Notify></Notify>
    <transition name="slide-fade">
      <router-view />
    </transition>
  </div>
</template>

<script>
import Top from "@/components/Header.vue";
import Notify from "@/components/Notifys.vue";
export default {
  components: {
    Top,
    Notify
  }
};
</script>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: #0b1844;
  overflow-x: hidden;
  background: linear-gradient(to bottom, #000 25%, #0b1844 100%);
  min-height: 100vh;

  .fade-enter-active,
  .fade-leave-active {
    transition: all ease 0.8s;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }

  .slide-fade-enter-active {
    transition: all ease 0.5s;
  }

  .slide-fade-leave-active {
    transition: all 0.3s cubic-bezier(0.17, 0.67, 0.83, 0.67);
  }

  .slide-fade-enter,
  .slide-fade-leave-to {
    transform: translateX(800px);
    opacity: 0;
  }
}

#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
<style src="@/styles/mixins.sass" lang="sass"></style>
<style src="@/styles/animate.css"></style>
<style>
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(100px);
  opacity: 0;
}
</style>