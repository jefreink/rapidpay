import Vue from 'vue'
import Vuex from 'vuex'
import firebase from "firebase";
import Axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    respuesta: [],
    operation: [],
    user: [],
    notify: [],
    account: [],
    intro: [],
    technologies: [],
    soon: 0,
    header: {
      back: false,
      logo: false,
      img: '',
      showImg: false,
      showRuta: false
    }
  },
  mutations: {
    userData(state, data) {
      if (data.photoURL !== null) {
        state.header.img = data.photoURL;
      } else {
        state.header.img = "https://www.accountchooser.com/static/image/generic_avatar.png";
      }

      state.user.push(data);
    },
    crearOperacion(state, query) {
      state.operation = [];
      state.operation.push(query);
    },
    increaseOperation(state, query) {
      state.operation[0].amount = query;
    },
    clearOperacion(state) {
      state.operation = [];
    },
    userDataFirst(state, query) {
      state.user.name = query.name;
      state.user.email = query.email;
      state.user.id = query.id;
    },
    datosCuenta(state, query) {
      state.account = [];
      state.account.push(query)
    },
    datosNotify(state, query) {
      state.notify = [];
      state.notify.push(query)
    },
    limpiarNotify(state) {
      state.notify = [];
    },
    aumentar(state) {
      state.operation[0].amount++
    },
    disminuir(state) {
      state.operation[0].amount--
    },
    signout(state) {
      state.user = [];
      state.header.back = false;
      state.header.logo = false;
      state.header.img = '';
      state.header.showImg = false;
      state.header.showRuta = false;
    },
    asignarParams(state, query) {
      state.header.back = query[0].back;
      state.header.logo = query[0].logo;
      state.header.showImg = query[0].showImg;
      state.header.showRuta = query[0].showRuta;
    },
    asignarResp(state, query) {
      state.respuesta = [];
      state.respuesta.push(query);
    },
    llenarIntro(state, query) {
      state.intro = query;
    },
    llenarTechnologies(state, query) {
      state.technologies = query;
    },
    Selectsoon(state, soon) {
      state.soon = soon;
    }

  },
  actions: {
    validOperation({ commit, state }, data) {
      if (state.account[0].amount - data.amount >= 0) {
        commit('crearOperacion', data)
      }
    },
    validIncreaseOperation({ commit, state }, amount) {
      if (state.account[0].amount - amount >= 0) {
        commit('increaseOperation', amount)
      }
    },
    validAumentar({ commit, state }) {
      if (state.account[0].amount - state.operation[0].amount > 0) {
        commit('aumentar')
      }
    },
    validReducir({ commit, state }) {
      if (state.operation[0].amount - 1 > 0) {
        commit('disminuir')
      }
    },
    llenarAccount({ commit }, cuenta) {
      commit('datosCuenta', cuenta);
    },
    llenarNotify({ commit }, content) {
      commit('datosNotify', content);
    },
    paramsHeader({ commit }, params) {
      commit('asignarParams', params)
    },
    response({ commit }, resp) {
      commit('asignarResp', resp);
    },
    cambiarSoon({ commit }, soon) {
      commit('Selectsoon', soon);
    },
    checkUserStatus({ commit, state }) {
      return new Promise((resolve, reject) => {
        firebase.auth().onAuthStateChanged((user) => {
          if (user && user.emailVerified == true) {
            if (state.user.length == 0) {
              commit('userData', user);
            }
            resolve(user);
          } else {
            reject();
          }
        });
      });
    },
    logout({ commit }) {
      return new Promise((resolve, reject) => {
        firebase.auth().signOut()
          .then(() => {
            commit('signout');
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    validIntro: async function ({ commit }) {
      Axios.get('../apis/IntroPays.json', {})
        .then(response => {
          let items = response.data;
          commit('llenarIntro', items);
        })
        .catch(error => {
        })
    },
    validTechnologies: async function ({ commit }) {
      Axios.get('../apis/Technologies.json', {})
        .then(response => {
          let items = response.data;
          commit('llenarTechnologies', items);
        })
        .catch(error => {
        })
    },
  },
  getters: {
    sendOperation(state) {
      switch (Object.prototype.toString.call(state.operation[0])) {
        case '[object Array]':
          return state.operation[0][0];
          break;
        case '[object Object]':
          return state.operation[0]
          break;
        default:
      }
    },
    sendAccount(state) {
      switch (Object.prototype.toString.call(state.account[0])) {
        case '[object Array]':
          return state.account[0][0];
          break;
        case '[object Object]':
          return state.account[0]
          break;
        default:
      }
    },
    sendUserData(state) {
      return state.user[0];
    },
    headerParams(state) {
      return state.header;
    },
    sendResponse(state) {
      return state.respuesta[0];
    },
    sendNotifys(state) {
      return state.notify[0];
    },
    sendIntro(state) {
      return state.intro;
    },
    sendTechnologies(state) {
      return state.technologies;
    },
    sendSoon(state) {
      return state.soon;
    }
  },
})
