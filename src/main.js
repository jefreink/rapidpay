import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import BootstrapVue from 'bootstrap-vue'
import VueResource from "vue-resource"
import firebase from "firebase"
import velocityPlugin from 'velocity-vue'
import Rx from 'rxjs' 
import VueRx from 'vue-rx'
import {Config} from "./config/firebaseConfig"
import "vue-material-design-icons/styles.css" 
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'swiper/dist/css/swiper.css'
import 'firebaseui/dist/firebaseui.css'

Vue.use(velocityPlugin)
Vue.use(BootstrapVue)
Vue.use(VueAwesomeSwiper)
Vue.use(VueResource);
Vue.use(VueRx, Rx);
Vue.config.productionTip = false

  firebase.initializeApp(Config);
  firebase.auth().onAuthStateChanged(function(){
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  });


