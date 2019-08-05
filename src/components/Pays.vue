<template>
  <div class="pay">
    <indicator @selected="select" :selection="Intro.length" direction="vertical"></indicator>
    <div class="container">
      <swiper :options="swiperOption" ref="paySwiper" @slideChange="slide">
        <swiper-slide v-for="(item, index) of Intro" :key="index">
          <div class="d-flex align-items-center justify-content-center centrar">
            <div>
              <div class="box-img">
                <img :src="'operaciones/'+item.img+'.svg'" />
              </div>
              <div class="title" v-html="item.title"></div>
              <div class="text" v-html="item.text"></div>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import { mapState, mapActions, mapGetters } from "vuex";
import indicator from "@/components/Indicators.vue";
export default {
  name: "Pays",
  components: {
    swiper,
    swiperSlide,
    indicator
  },
  data() {
    return {
      listado: [],
      seleccion: 0,
      swiperOption: {
        direction: "vertical"
      }
    };
  },
  methods: {
    ...mapActions(["validIntro", "cambiarSoon"]),
    select(event) {
      this.toSlide(event - 1, 2000);
    },
    cargarLista() {
      this.sendMounth();
    },
    toSlide(i) {
      this.$refs.paySwiper.swiper.slideTo(i, 0);
    },
    slide() {
      this.seleccion = this.$refs.paySwiper.swiper.activeIndex;
      this.$store.dispatch("cambiarSoon", this.seleccion);
    },
    sendMounth() {
      this.listado.forEach(element => {
        if (element.id == this.$refs.paySwiper.swiper.activeIndex + 1)
          this.$emit("changeMounth", element.mounth);
      });
    }
  },
  computed: {
    ...mapGetters({
      Intro: "sendIntro"
    }),
    swiper() {
      return this.$refs.paySwiper.swiper;
    }
  },
  mounted() {
    this.$store.dispatch("validIntro");
  }
};
</script>
<style src="@/styles/VerticalSwiper.sass" lang="sass" scoped></style>
<style lang="scss" scoped>
.pay {
  padding: 0 1rem;
  margin-top: -30px;
  .swiper-container {
    .centrar {
      height: 100vh;
      .box-img {
        width: 150px;
        height: 150px;
        margin: 0 auto;
        border-radius: 50%;
        padding: 2rem;
        box-shadow: 0 0 50px 5px #005aff inset, 0 0 40px 0px #005aff,
          0 0 2px 2px #b0e2ff;
        img {
          width: 80px;
          display: block;
          margin: 0 auto;
          filter: invert(100%) drop-shadow(0 0 5px #226efa)
            drop-shadow(0px 0 10px #226efa);
        }
      }
      .title {
        color: #fff;
        font-family: Mont-SemiBold;
        text-align: center;
        padding: 1rem;
      }
      .text {
        color: #fff;
        font-family: Mont-Regular;
        text-align: center;
        padding: 1rem;
        max-width: 350px;
        margin: 0 auto;
        font-size: 0.8rem;
      }
    }
  }
}
</style>
