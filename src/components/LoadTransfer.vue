<template>
  <div>
    <transition name="fadeUp">
      <div class="load-arrow">
        <div class="box-svg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            version="1.1"
            id="Arrow_right"
            x="0px"
            y="0px"
            viewBox="0 0 20 20"
          >
            <path d="M11,16.5V13H3V7h8V3.5l6.5,6.5L11,16.5z" />
          </svg>
        </div>
        <div class="box-line">
          <div class="line1"></div>
          <div class="line2"></div>
        </div>
        <div class="box-line2">
          <div class="line3"></div>
          <div class="line4"></div>
        </div>
        <div class="box-line3">
          <div class="line5"></div>
          <div class="line6"></div>
        </div>

        <div class="box-details d-flex align-items-center justify-content-center box-card" v-if="data">
          <div>
            <div class="form-group">
              <div class="amount">
                <span v-html="formatPrice(data.amount)"></span>
                <sup>$</sup>
              </div>
            </div>
            <template v-if="data.type == 'recharge'">
              <div class="form-group">
                <div class="text" v-html="'Se estan recargando'"></div>
                <div class="to" v-html="'A'"></div>
              </div>
            </template>
            <template v-else>
              <div class="form-group">
                <div class="text" v-html="'Se estan enviando'"></div>
                <div class="to" v-html="'A'"></div>
              </div>
            </template>

            <div class="form-group">
              <div class="box-img" v-if="data.foto !== ''">
                <img :src="data.foto" alt />
              </div>
            </div>
            <div class="form-group">
              <div class="name" v-html="data.name"></div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "LoadTransfer",
  props: ["data"],
  methods: {
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
  }
};
</script>

<style lang="scss">
@import "@/styles/mixins.sass";
.load-arrow {
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 10000;
  background: #000;
  overflow-x: hidden;
  .box-svg {
    position: relative;
    &::before {
      position: absolute;
      content: "";
      top: -150px;
      left: 0;
      width: 100%;
      height: 100%;
      -webkit-box-shadow: 0 0 360px 98px #00ff43;
      box-shadow: 0 0 300px 100px #00ff43;
      opacity: 0.5;
    }
    svg {
      width: 150px;
      margin: 0 auto;
      animation: arrow 2s infinite;
      position: relative;
      @include phone-sm {
        width: 100px;
      }
      &::before {
        position: absolute;
        content: "";
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        box-shadow: 0 0 360px 98px #00ff43;
      }
      filter: blur(1px) drop-shadow(0 0 5px #00ff43)
        drop-shadow(0 0 200px #00ff43);
      path {
        stroke-width: 0.5px;
        stroke: #00ff43;
        fill: transparent;
      }
    }
  }

  .box-line {
    margin-top: -80px;
    animation: line 1s infinite;
    .line1 {
      width: 80px;
      height: 4px;
      background: #00ff43;
      margin-bottom: 6rem;
      box-shadow: 0 0 20px 0px #00ff43;
    }
    .line2 {
      width: 120px;
      height: 4px;
      background: #00ff43;
      margin-left: 15%;
      box-shadow: 0 0 20px 0px #00ff43;
    }
  }
  .box-line2 {
    margin-top: -80px;
    animation: line 1.5s infinite;
    .line3 {
      width: 80px;
      height: 4px;
      background: #00ff43;
      margin-top: -105px;
      margin-left: 20%;
      box-shadow: 0 0 20px 0px#00ff43;
    }
    .line4 {
      width: 120px;
      height: 4px;
      background: #00ff43;
      margin-left: 35%;
      margin-top: 95px;
      box-shadow: 0 0 20px 0px #00ff43;
    }
  }
  .box-line3 {
    margin-top: -80px;
    animation: line 2s infinite;
    .line5 {
      width: 80px;
      height: 4px;
      background: #00ff43;
      margin-top: -105px;
      margin-left: 45%;
      box-shadow: 0 0 20px 0px#00ff43;
    }
    .line6 {
      width: 120px;
      height: 4px;
      background: #00ff43;
      margin-left: 30%;
      margin-top: 95px;
      box-shadow: 0 0 20px 0px #00ff43;
    }
  }
  .box-details {
    min-height: 70vh;
    transform: scale(1.2);
    @include phone-blgm {
      transform: scale(1);
    }
    .amount {
      font-family: Mont-SemiBold;
      color: #fff;
      font-size: 2rem;
      sup {
        font-size: 1rem;
        color: #555;
        font-family: Mont-Regular;
      }
    }
    .text {
      font-family: Mont-Regular;
    }
    .name {
      color: #fff;
      font-family: Mont-SemiBold;
    }
    .box-img {
      img {
        margin: 0 auto;
        display: block;
        max-width: 40px;
        border-radius: 50%;
      }
    }
  }
  @keyframes arrow {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(20px);
    }
  }

  @keyframes line {
    0% {
      margin-left: 100%;
    }
    100% {
      margin-left: -150%;
      // opacity: 0;
    }
  }
}

.fadeUp-enter-active {
  transition: opacity 0.5s;
}
.fadeUp-leave-active {
  transition: all 0.5s ease;
}
.fadeUp-enter,
.fadeUp-leave-to {
  transform: translateX(20px);
}

.slide-fade-leave-active {
  transition: all 0.5s ease;
}
</style>
