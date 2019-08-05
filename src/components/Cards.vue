<template>
  <div v-if="cards.length > 0">
    <div v-if="!load">
      <indicator @selected="select" :selection="cards.length" direction="horizontal"></indicator>
    </div>
    <swiper :options="swiperOption" ref="mySwiper" @slideChange="slide">
      <swiper-slide v-for="(item, index) of cards" :key="index">
        <div class="d-flex align-items-center justify-content-center box-card">
          <div>
            <div class="col-12">
              <div class="row">
                <div class="col">
                  <div
                    :class="['card', {'first': (index) == 0 }, { 'second': (index) == 1 }, { 'third': (index) == 2}]"
                  >
                    <div class="number" v-html="formatNumber(item.number)"></div>
                    <div class="expiry-date" v-html="item.date"></div>
                    <div class="balance" v-html="'Balance'"></div>
                    <div class="amount" v-html="item.amount"></div>
                    <img src="cards/mastercard.svg" alt="card" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import indicator from "@/components/Indicators.vue";
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import { mapActions } from "vuex";

export default {
  name: "cards",
  components: {
    swiper,
    swiperSlide,
    indicator
  },
  props: ["cards"],
  data() {
    return {
      load: true,
      swiperOption: {
        slidesPerView: 3,
        spaceBetween: 20,
        mousewheel: true,
        centeredSlides: true,
        pagination: {
          el: ".swiper-pagination"
        },
        breakpoints: {
          580: {
            slidesPerView: 2,
            spaceBetween: 100
          }
        }
      }
    };
  },
  methods: {
    ...mapActions(["cambiarSoon"]),
    select(event) {
      this.toSlide(event - 1);
    },
    toSlide(i) {
      this.$refs.mySwiper.swiper.slideTo(i, 500);
    },
    slide() {
      let item = this.$refs.mySwiper.swiper.activeIndex;
      this.$store.dispatch("cambiarSoon", item);
      this.$emit("changeCard", this.$refs.mySwiper.swiper.activeIndex);
    },
    formatNumber(val) {
      let cadena = String(val);
      var first = cadena.substring(0, 4);
      var last = cadena.substring(cadena.length - 4);
      let mask = cadena.substring(4, cadena.length - 4).replace(/\d/g, "*");
      cadena = first + " " + mask + " " + last;

      return cadena;
    }
  },
  mounted() {
    this.load = false;
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  }
};
</script>

<style lang="scss">
@import "@/styles/mixins.sass";

.box-card {
  height: 30vh;
  @include phone-xs {
    height: 25vh;
  }
  .card {
    position: relative;
    display: inline-block;
    vertical-align: middle;
    font-family: Mont-Regular;
    width: 350px;
    height: 170px;
    transform: scale(1.5);
    @include phone-blgm {
      width: 220px;
      height: 120px;
    }
    @include phone-blg {
      transform: scale(1);
    }
    @include phone-xs {
      transform: scale(0.8);
    }
    border: none;
    text-align: left;
    padding: 10px 30px;
    margin: 20px auto;
    color: #fff;
    border-radius: 20px;
    box-sizing: border-box;
    background: #141819;
    &.first {
      background: #ff00cc;
      background: -webkit-linear-gradient(to right, #333399, #ff00cc);
      background: linear-gradient(to right, #333399, #ff00cc);

      position: relative;
      &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 20px;
        box-shadow: 0px 0px 2rem 0rem #333399;
      }
    }
    &.second {
      background: #1488cc;
      background: -webkit-linear-gradient(to right, #2b32b2, #1488cc);
      background: linear-gradient(to right, #2b32b2, #1488cc);
      &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 20px;
        box-shadow: 0px 0px 2rem 0rem #1488cc;
      }
    }
    &.third {
      background: #e65c00;
      background: -webkit-linear-gradient(to right, #f9d423, #e65c00);
      background: linear-gradient(to right, #f9d423, #e65c00);

      &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 20px;
        box-shadow: 0px 0px 2rem 0rem #e65c00;
      }
    }
    img {
      position: absolute;
      right: 20px;
      top: 20px;
      width: 30px;
    }
    .number {
      font-size: 15px;
      text-align: center;
      text-shadow: 1px 1px 1px #000;
      position: absolute;
      left: 20px;
      top: 20px;
    }

    .expiry-date {
      font-size: 14px;
      padding-bottom: 20px;
      text-align: center;
      text-shadow: 1px 1px 1px #000;
      position: absolute;
      right: 20px;
      bottom: 20px;
    }

    .balance {
      position: absolute;
      font-size: 15px;
      left: 20px;
      bottom: 40px;
      text-shadow: 1px 1px 1px #000;
    }

    .amount {
      font-size: 25px;
      position: absolute;
      left: 20px;
      bottom: 10px;
      text-shadow: 1px 1px 1px #000;
    }
  }
}
</style>
