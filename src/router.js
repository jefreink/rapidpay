import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import firebase from 'firebase'

Vue.use(Router)

const rout = new Router({
  routes: [
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/',
      name: 'bienvenido',
      component: () => import(/* webpackChunkName: "welcome" */ './views/Welcome.vue')
    },
    {
      path: '/list',
      name: 'list',
      component: () => import(/* webpackChunkName: "list" */ './views/List.vue'),
      meta: {
        autentificado: true
      }
    },
    {
      path: '/details',
      name: 'Operdetails',
      component: () => import(/* webpackChunkName: "details" */ './views/Operdetails.vue'),
      meta: {
        autentificado: true
      }
    },
    {
      path: '/response',
      name: 'response',
      component: () => import(/* webpackChunkName: "response" */ './views/Response.vue'),
      meta: {
        autentificado: true
      }
    },
    {
      path: '/resume',
      name: 'resume',
      component: () => import(/* webpackChunkName: "resume" */ './views/Resume.vue'),
      meta: {
        autentificado: true
      }
    },
    {
      path: '/history',
      name: 'history',
      component: () => import(/* webpackChunkName: "history" */ './views/History.vue'),
      meta: {
        autentificado: true
      }
    },
    {
      path: '/autenticar',
      name: 'autenticar',
      component: () => import(/* webpackChunkName: "autenticar" */ './views/Autenticar.vue'),
      meta: {
        autentificado: true
      }
    },
    {
      path: '/recarga',
      name: 'recharge',
      component: () => import(/* webpackChunkName: "recharge" */ './views/Recharge.vue'),
      meta: {
        autentificado: true
      }
    }
  ]
})
rout.beforeEach((to, from, next) => {
  let usuario = firebase.auth().currentUser;
  let autorizado = to.matched.some(record => record.meta.autentificado);
    if(usuario == null && autorizado){
      next('/bienvenido')
    } else if(!autorizado && usuario !== null) {
      next('autenticar')
    } else {
      next()
    }
});
   export default rout;

