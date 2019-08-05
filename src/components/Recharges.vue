<template>
  <div class="container">
    <div class="col-12 box-slide">
      <swiper :options="swiperOptions" ref="RechargeSwiper" @transitionEnd="slide">
        <template v-if="listado.length > 0">
          <swiper-slide
            :ref="'line'+index"
            v-for="(item, index) of listado"
            :key="index"
            @click.native="toSlide(index)"
          >
            <div class="d-flex py-3" @click="cambiarMes(item.date)">
              <div class="pl-2 text-left flex-fill" v-html="formatPrice(item.amount)"></div>
              <div class="text-right flex-fill" v-html="item.date"></div>
            </div>
          </swiper-slide>
        </template>
        <template v-else>
          <div class="d-flex align-items-center justify-content-center msg-recharges">
            <div v-html="'No tienes historial de Recargas'"></div>
          </div>
        </template>
      </swiper>
    </div>
  </div>
</template>

<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import { getUser, listRecharge } from "@/api/account";
import { mapGetters } from "vuex";
export default {
  name: "Recharges",
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      listado: [],
      swiperOptions: {
        slidesPerView: "auto",
        loop: true,
        mousewheel: true,
        centeredSlides: true,
        direction: "vertical"
      }
    };
  },
  methods: {
    returnList() {
      this.subscriber = listRecharge(this.userData.uid).subscribe(resp => {
        this.listado = [];
        resp.forEach(element => {
          this.listado.push(element);
        });
        this.$refs.RechargeSwiper.swiper.slideTo(5, 2000);
      });
    },
    cambiarMes(val) {
      let fecha = val.split("-");
      let dia = fecha[0];
      let mes = fecha[1];
      let data = {
        mes: mes,
        dia: dia
      };
      this.$emit("changeMounth", data);
    },
    toSlide(i) {
      this.$refs.RechargeSwiper.swiper.slideTo(i, 2000);
    },
    slide() {
      let val = this.$refs.RechargeSwiper.swiper.activeIndex;
      this.cambiarMes(this.listado[val].date);
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    sendMounth() {
      let val = this.listado[this.$refs.RechargeSwiper.swiper.activeIndex];
      this.$emit("changeMounth", element.mounth);
    },
    verificarData() {
      this.$store
        .dispatch("checkUserStatus")
        .then(usuario => {
          this.returnList();
        })
        .catch(error => {});
    }
  },
  mounted() {
    this.verificarData();
  },
  computed: {
    ...mapGetters({
      userData: "sendUserData"
    })
  },
  beforeDestroy() {
    if (this.subscriber) {
      this.subscriber.unsubscribe();
    }
  }
};
</script>

<style src="@/styles/VerticalSwiper.sass" lang="sass"></style>
<style lang="scss" scoped>
.box-slide {
  height: 63vh;
  overflow-y: hidden;
  .msg-recharges {
    min-height: 70vh;
  }
}
</style>