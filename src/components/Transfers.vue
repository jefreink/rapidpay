<template>
  <div>
    <div class="container">
      <div class="box-slide">
        <swiper :options="swiperOptionss" ref="transfersSwiper" @transitionEnd="slide">
          <template v-if="listado.length > 0">
            <swiper-slide
              v-for="(item, index) of listado"
              :key="index"
              @click.native="toSlide(index)"
            >
              <div class="col-12 py-3">
                <div class="row" @click="cambiarMes(item.date)">
                  <div class="col text-left text-uppercase">
                    <span
                      v-if="item.type == 'deposit'"
                      :class="{'text-success': item.type == 'deposit' }"
                      v-html="'+'"
                    ></span>
                    <span
                      v-if="item.type == 'transfer'"
                      :class="{'text-danger': item.type == 'transfer' }"
                      v-html="'-'"
                    ></span>
                    <span v-html="item.amount + ' ' + item.coin"></span>
                  </div>
                  <div class="col text-center text-capitalize" v-html="item.person"></div>
                  <div class="col text-right" v-html="item.date"></div>
                </div>
              </div>
            </swiper-slide>
          </template>
          <template v-else>
            <div class="d-flex align-items-center justify-content-center msg-transfers">
              <div v-html="'No tienes historial de transferencias'"></div>
            </div>
          </template>
        </swiper>
      </div>
    </div>
  </div>
</template>

<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import { getUser, listTransfers } from "@/api/account";
import { mapGetters } from "vuex";

export default {
  name: "transfers",
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      listado: [],
      swiperOptionss: {
        slidesPerView: "auto",
        mousewheel: true,
        centeredSlides: true,
        direction: "vertical"
      }
    };
  },
  methods: {
    returnList() {
      this.subscriber = listTransfers(this.userData.uid).subscribe(resp => {
        this.listado = [];
        resp.forEach(element => {
          this.listado.push(element);
        });
        if (resp.length > 0) {
          let val = Math.ceil(this.listado.length / 2 - 1);
          this.$refs.transfersSwiper.swiper.slideTo(val, 2000);
        }
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
      this.$refs.transfersSwiper.swiper.slideTo(i, 2000);
    },
    slide() {
      this.sendMounth();
    },
    sendMounth() {
      let val = this.$refs.transfersSwiper.swiper.activeIndex;
      this.cambiarMes(this.listado[val].date);
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
    swiper() {
      return this.$refs.transfers.swiper;
    },
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
<style src="@/styles/VerticalSwiper.sass" lang="sass" scoped></style>
<style lang="scss" scoped>
.box-slide {
  height: 63vh;
  overflow-y: hidden;
  .msg-transfers {
    min-height: 70vh;
  }
}
</style>
