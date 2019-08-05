<template>
  <div class="verificar">
    <span v-html="'verificando ...'"></span>
    <b-modal ref="modal" v-model="modalShow" @hide="logout" centered hide-footer>
      <template slot="modal-title" v-if="modalContent.length">{{modalContent[0].title}}</template>
      <div v-if="modalContent.length">{{modalContent[0].text}}</div>
      <div v-if="botones.length">
        <div class="col" v-for="boton of botones" :key="boton.id">
          <button class="btn float-right" @click="boton.funcion">{{boton.texto}}</button>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import firebase from "firebase";
import { generateUser, generateToken } from "@/api/account";
import { mapState, mapActions } from "vuex";
export default {
  name: "autenticar",
  data() {
    return {
      modalShow: false,
      modalContent: [],
      botones: [],
    };
  },
  created() {
    this.usuerioVerified();
  },
  mounted() {},
  methods: {
    ...mapActions(["checkUserStatus", "llenarNotify"]),

    usuerioVerified() {
      this.$store
        .dispatch("checkUserStatus")
        .then(usuario => {
          if (usuario) {
            generateUser(usuario);
            if (usuario.emailVerified == false) {
              this.enviarMail();
              this.modalContent.push({
                title: "Error",
                text: "Debe verificar su usuario para poder ingresar"
              });
              this.botones.push(
                {
                  funcion: this.enviarMail,
                  texto: "Enviar mail de verificacion"
                },
                { funcion: this.logout, texto: "Cancelar" }
              );
              this.modalShow = true;
            } else {
              this.llenarDatos(usuario);
              this.$store.photo = usuario.photoURL;
              this.$router.replace("resume");
            }
          }
        })
        .catch(error => {
          this.logout();
        });
    },
    logout() {
      this.$store
        .dispatch("logout")
        .then(resp => {
          this.$router.replace("home");
        })
        .catch(error => {
          this.$router.replace("home");
        });
    },
    llenarDatos(data) {
      let datos = {
        name: data.displayName,
        email: data.email,
        id: data.uid
      };
      this.$store.commit("userDataFirst", datos);
    },
    enviarMail() {
      var user = firebase.auth().currentUser;
      user
        .sendEmailVerification()
        .then(function() {
          let data = {
            msg:
              "Su email de verificacion fue enviado, revise su bandeja de entrada",
            color: "green",
            title: "Completado",
            position: "b-toaster-top-center"
          };
          this.notify(data);
          this.$router.replace("home");
        })
        .catch(function(error) {
          let data = {
            msg: "No se pudo enviar email de verificacion, intentelo nuevamente",
            color: "red",
            title: "Error",
            position: "b-toaster-bottom-center"
          };
          this.notify(data);
          this.$router.replace("/");
        });
    },
    notify(notify) {
      this.$store.dispatch("llenarNotify", notify);
    }
  }
};
</script>

<style lang="scss" scoped>
.verificar {
  padding-top: 4rem;
  padding-bottom: 4rem;
  background: #0b1844;
  background: linear-gradient(to bottom, #000 60%, #0b1844);
  min-height: 100vh;
  position: relative;
}
</style>

<style src="../styles/modal.sass" lang="sass" scoped></style>
