<template>
  <div>
    <div class="box-add" @click="showModal">
      <div class="d-flex">
        <div class="flex-fill">
          <div class="text" v-html="'Añadir cuenta'"></div>
        </div>
        <div class="flex-fill">
          <div class="plus" v-html="'+'"></div>
        </div>
      </div>
    </div>

    <b-modal v-model="modalShow" centered hide-footer>
      <template slot="modal-title" v-if="modalContent.length">{{modalContent[0].title}}</template>
      <div v-if="modalContent.length" v-html="modalContent[0].text"></div>
      <template>
        <div class="form-group">
          <label class="text-left" v-html="'Cuenta de usuario'"></label>
          <input
            type="text"
            @input="reset"
            v-model="cuenta"
            class="form-control"
            placeholder="example@email.com"
          />
          <p class="text-danger" v-if="error" v-html="error"></p>
        </div>
      </template>
      <div v-if="botones.length">
        <div class="col" v-for="boton of botones" :key="boton.id">
          <button class="btn float-right" @click="boton.funcion" v-html="boton.text"></button>
        </div>
      </div>
    </b-modal>

    <b-toast v-model="toastShow" :toaster="position" auto-hide-delay="1000000" solid>
      <div
        v-if="toastContent.length > 0"
        slot="toast-title"
        class="d-flex flex-grow-1 align-items-baseline"
      >
        <b-img blank :blank-color="toastContent[0].color" class="mr-2" width="12" height="12"></b-img>
        <strong class="mr-auto">{{toastContent[0].title}}</strong>
        <small class="text-muted mr-2">42 seconds ago</small>
      </div>
      <div v-if="toastContent.length > 0">{{toastContent[0].msg}}</div>
    </b-toast>
  </div>
</template>

<script>
import { addAccount, getUser, getUserData } from "@/api/account";
import { mapActions } from "vuex";

export default {
  name: "Addlist",
  data() {
    return {
      parametros: [{ ruta: "resume", show: true }],
      beforeAmount: null,
      moneda: "USD",
      monto: 0,
      cuenta: "",
      error: "",
      idUser: null,
      data: [],
      modalShow: false,
      toastShow: false,
      position: "",
      toastContent: [],
      modalContent: [],
      botones: [],
      listado: []
    };
  },
  methods: {
    ...mapActions(["llenarNotify"]),

    hideModal() {
      this.modalShow = false;
    },
    reset() {
      this.error = "";
    },
    limpiarModal() {
      this.cuenta = "";
      this.error = "";
    },
    showModal() {
      this.limpiarModal();
      this.modalShow = true;
      this.botones = [];
      this.modalContent.push({
        title: "Añadir cuenta",
        text: "Ingresa un correo electronico valido para añadir a tu lista"
      });
      this.botones.push({
        funcion: this.agregarCuenta,
        text: "Ok"
      });
    },
    agregarCuenta() {
      let valid = this.validarEmail();
      if (valid) {
        if (this.cuenta !== this.data[0].user_email) {
          this.hideModal();
          this.subscriber1 = addAccount({
            id: this.idUser,
            email: this.cuenta
          }).subscribe(resp => {
            this.sendNotify(resp);
          });
        } else {
          this.error = "No puedes ingresar tu propia cuenta";
        }
      } else {
        this.error = "Formato de email es invalido";
      }
    },
    validarEmail() {
      this.cuenta = this.cuenta.toLowerCase();
      let patron = /^([a-z]+[a-z1-9._-]*)@{1}([a-z1-9\.]{2,})\.([a-z]{2,3})$/;
      if (!this.cuenta.search(patron)) {
        return true;
      } else {
        return false;
      }
    },
    sendNotify(data) {
      let notify = {};

      if (data.error == 1) {
        notify = {
          msg: data.msg,
          color: "red",
          title: "Error",
          position: "b-toaster-bottom-center"
        };
      } else {
        this.position = "b-toaster-top-center";
        notify = {
          msg: data.msg,
          color: "green",
          title: "Correcto"
        };
      }
      this.$store.dispatch("llenarNotify", notify);
    }
  },
  mounted() {
   this.subscriber = getUserData().subscribe(resp => {
      this.data.push(resp);
      this.idUser = resp.idUser;
    });
  },
  beforeDestroy() {
    if (this.subscriber) {
      this.subscriber.unsubscribe();
    }
    if (this.subscriber1) {
      this.subscriber1.unsubscribe();
    }
  }
};
</script>

<style src="../styles/modal.sass" lang="sass"></style>
<style src="../styles/toast.sass" lang="sass"></style>

<style lang="sass" scoped>
@import "@/styles/mixins.sass"

.box-add
    float: right
    position: relative
    z-index: 1000
    .plus
        height: 40px
        width: 40px
        font-size: 2.5rem
        line-height: .8
        margin: -8px 0
        border-radius: 50%
        border: 2px solid rgb(176, 226, 255)
        box-shadow: 0 0 50px 2px #005aff inset
        text-shadow: 1px 1px 5px #005aff
        color: #fff
        position: relative
        transform: scale(.5)
        @include phone-sm
          margin: -12px 0 0
          transform: scale(.3)
        &::before
            content: ''
            position: absolute
            left: -3px
            top: -2px
            height: 40px
            width: 40px 
            border-radius: 50%
            box-shadow: 0 0 50px 5px #005aff
    .text
        color: #fff
        font-size: 1rem
        font-family: Mont-Bold
        @include phone-sxs
          font-size: .65rem
.modal
    .form-group
        .form-control
            background: transparent
            color: #ffffff
            border: none
            border-bottom: 1px solid #53b883
            border-radius: 0
            box-shadow: none !important
</style>
