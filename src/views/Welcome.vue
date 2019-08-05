<template>
  <div :class="['bienvenido', fondo]">
    <swiper :options="swiperOption" ref="mySwiper" @slideChange="slide">
      <swiper-slide>
        <div class="box-logo d-flex align-items-center justify-content-center" v-if="select == 0">
          <div class="logo animated fadeInUpBig" v-html="'RapidPay'"></div>
        </div>
        <p
          v-html="'Rapidpay es una demo técnica que simula un sistema de pago y transferencias internacionales.'"
        ></p>
      </swiper-slide>
      <swiper-slide>
        <div v-if="select == 1">
          <h1 class="pt-3 pb-5" v-html="'Tecnologías utilizadas'"></h1>
          <div class="row align-items-center box-tecnologia">
            <div
              :class="['animated', item.animation]"
              class="tecnologia col-4 co-md-4"
              v-for="item of Technology"
              :key="item.id"
            >
              <img :src="item.img" />
              <p class="text-center" v-html="item.name"></p>
            </div>
          </div>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div>
          <h1 class="pb-5 clock" v-html="hora"></h1>
          <button class="btn" @click="enterHome" v-html="'Continuar'"></button>
        </div>
      </swiper-slide>
      <div class="swiper-pagination swiper-pagination-white" slot="pagination"></div>
    </swiper>

    <HelloWorld msg="Powered by Jefreink Ortuño" email="jefreink@gmail.com" />

    <b-modal v-model="modalShow" centered hide-footer>
      <template slot="modal-title" v-if="modalContent.length">{{modalContent[0].title}}</template>
      <div v-if="modalContent.length" v-html="modalContent[0].text"></div>
      <div v-if="botones.length">
        <div class="float-right" v-for="boton of botones" :key="boton.id">
          <template v-if="boton.type !== 'checkbox'">
            <label for class>
              <input type="button" class="btn" @click="boton.funcion" :value="boton.text" />
            </label>
          </template>
          <template v-else>
            <input
              :type="boton.type"
              :v-model="boton.model"
              :id="boton.label"
              class="btn"
              @click="boton.funcion"
              :checked="boton.model"
            />
            <label class="custom" :for="boton.label"></label>
          </template>
        </div>
      </div>
    </b-modal>
  </div>
</template>
<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import HelloWorld from "@/components/HelloWorld.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "bienvenido",
  components: {
    HelloWorld,
    swiper,
    swiperSlide
  },
  data() {
    return {
      fondo: "",
      check: false,
      select: 0,
      modalContent: [],
      modalShow: false,
      botones: [],
      hora: "0:00",
      swiperOption: {
        slidesPerView: 1,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        }
      }
    };
  },
  methods: {
     ...mapActions(["validTechnologies"]),

    slide() {
      let item = this.$refs.mySwiper.swiper.activeIndex;
      this.select = item;
      let d = new Date();
      let mins = d.getMinutes();
      let hora = d.getHours();

      if (item == 2) {
        if (hora >= 1 && hora <= 9) {
          hora = "0" + hora;
        }

        if (mins >= 0 && mins <= 9) {
          mins = "0" + mins;
        }

        this.hora = hora + ":" + mins;

        if (d.getHours() >= 7 && d.getHours() <= 18) {
          this.fondo = "day";
        } else {
          this.fondo = "night";
        }
      } else {
        this.fondo = "";
      }
    },

    enterHome() {
      this.$router.replace("/home");
    }
  },
  mounted() {
    this.$store.dispatch("validTechnologies");
  },
  computed: {
    ...mapGetters({
      Technology: "sendTechnologies"
    }),
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  }
};
</script>

<style lang="scss">
@import "@/styles/mixins.sass";

.bienvenido {
  min-height: 100vh;
  position: relative;
  z-index: 10000;
  font-family: Mont-SemiBold;
  .btn {
    background: transparent;
  }
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    opacity: 0;
    transition: all ease 3s;
  }
  .clock {
    font-size: 8rem;
    font-family: Mont-SemiBold;
    text-shadow: 1px 1px 1px #000;
    min-height: 70vh;
    display: none;
    @include phone-sm {
      font-size: 6rem;
    }
  }
  &.day {
    overflow: hidden;
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      background: url(../../public/welcome/day.png) no-repeat;
      background-size: 100% 100%;
      opacity: 1;
    }
    .swiper-button-white {
      display: none;
    }
    .btn {
      color: #fff;
      background: #f8b74d;
      text-shadow: 1px 1px 1px #000;
      max-width: 340px;
      box-shadow: 0 0.3rem 0.5rem rgba(0, 0, 0, 0.2);
      opacity: 1;
      margin: 0 auto;
    }
    .clock {
      display: block;
    }
  }
  &.night {
    overflow: hidden;
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      background: url(../../public/welcome/night.png) no-repeat;
      background-size: 100% 100%;
      opacity: 1;
    }
    .swiper-button-white {
      display: none;
    }
    .btn {
      max-width: 340px;
      color: #fff;
      background: #454eae;
      margin: 0 auto;
      box-shadow: 0 0.3rem 0.5rem rgba(0, 0, 0, 0.2);
      opacity: 1;
    }
    .clock {
      display: block;
    }
  }
  .welcome {
    position: relative;
    &::before {
      content: "";
      height: 3px;
      width: 100%;
      position: absolute;
      left: 0;
      bottom: 0;
      background: rgb(176, 226, 255);
      box-shadow: 0 0 20px 3px rgb(0, 90, 255);
    }
  }
  h1 {
    color: #fff;
  }
  .box-logo {
    height: 70vh;
    @include phone-sm {
      height: 60vh;
    }
    .logo {
      font-size: 4.5rem;
      font-family: Mont-Bold;
      color: #fff;
      text-shadow: 0 0px 30px #7bd4ff;
      @include phone-sm {
        font-size: 3rem;
      }
    }
  }
  p {
    color: #fff;
    text-align: center;
    font-weight: bold;
  }
  .box-tecnologia {
    height: 60vh;
    .tecnologia {
      min-height: 100px;
      text-align: center;
      img {
        width: 60px;
        height: 60px;
      }
    }
  }
  .btn {
    width: 100%;
    margin-top: 45vh;
    height: 50px;
    opacity: 0;
    font-family: Mont-SemiBold;
    transition: all ease 3s;
  }
  .swiper-container {
    min-height: 90vh;
    padding: 0 1rem;
    padding-bottom: 40px;
    @include phone-sm {
      padding-bottom: 0;
    }
    .swiper-button-white {
      width: 30px;
      height: 30px;
    }
    .swiper-pagination-bullet {
      background: #000;
      &.swiper-pagination-bullet-active {
        background: #fff;
      }
    }
  }
}
</style>
<style src="../styles/modal.sass" lang="sass"></style>