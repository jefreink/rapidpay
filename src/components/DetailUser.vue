<template>
  <div class="detalles">
    <div class="row" v-if="!load">
      <div class="col-12">
        <h5 class="text-center text-capitalize text-white font-weight-bold" v-html="sendData.name"></h5>
      </div>
      <div class="col">
        <div class="row">
          <div class="col-5 box-coin animated fadeInLeftBig">
            <img :src="'fiat/'+userAccount.coin+'.svg'" alt />
          </div>
          <div class="col-7 offset-sm-5 animated fadeInRightBig">
            <div class="col-12 pr-4">
              <div class="text">
                <div
                  class="text-uppercase"
                  v-html="formatPrice(userAccount.amount) + ' ' + userAccount.coin"
                ></div>
                <label v-html="'Saldo'"></label>
              </div>
              <div class="text">
                <div
                  class="text-uppercase"
                  v-html="(formatPrice(userAccount.amount - sendData.amount)) + ' ' + userAccount.coin"
                ></div>
                <label v-html="'Despues'"></label>
              </div>
              <div class="text">
                <div
                  class="text-uppercase"
                  v-html="formatPrice(sendData.amount) + ' ' + sendData.coin"
                ></div>
                <label class="text-uppercase"></label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { cuenta, getUser } from "@/api/account";
import { mapGetters } from "vuex";

export default {
  name: "Detalles",
  data() {
    return {
      cuenta: [],
      pruebas: [],
      moneda: "USD",
      datas: [],
      user: null,
      idCuenta: null,
      load: false
    };
  },
  methods: {
 
    formatPrice(value) {
      let val = (value / 1).toFixed(0).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
  },
  mounted: function() {
    this.subscriber = getUser().subscribe(resp => {
      this.user = resp;
    });
  },
  computed: {
    ...mapGetters({
      sendData: "sendOperation",
      userData: "sendUserData",
      userAccount: "sendAccount"
    })
  },
    beforeDestroy() {
        if (this.subscriber) {
            this.subscriber.unsubscribe();
        }
    }
};
</script>
<style lang="sass" scoped>
@import "@/styles/mixins.sass"
$special: 575px
@mixin phone-special
  @media only screen and (max-width: $special)
    @content

.detalles
  h1
      color: #fff
      font-size: 1.5rem
      padding: 1rem
  .box-coin
    position: absolute
    left: 0
    right: 0
    margin: 0 auto
    @include phone-special
      position: relative
    img
      max-width: 240px
      @include phone-special
        margin-left: -90%
  .text
      text-align: right
      line-height: 1
      color: #fff
      margin-top: 2rem
      label
          font-size: 1rem
          @include phone-sxs
            font-size: .8rem
      div
          font-size: 1.5rem
          @include phone-sm
            font-size: 1rem

  .box-oper
      padding-top: 2rem
      .minus, .plus
          height: 40px
          width: 40px
          margin: 0 auto
          border-radius: 50%
          border: 2px solid rgb(176, 226, 255)
          box-shadow: 0 0 50px 2px #005aff inset
          text-shadow: 1px 1px 5px #005aff
          color: #fff
          position: relative
          &::before
              content: ''
              position: absolute
              left: -3px
              top: -2px
              height: 40px
              width: 40px 
              border-radius: 50%
              box-shadow: 0 0 50px 5px #005aff
      .plus
          font-size: 2.5rem
          line-height: .9
      .minus
          line-height: .43
          font-size: 4rem
      .font-weight-bold
          font-size: .8rem
      .text-amount
          font-size: 1.3rem
          font-weight: bold
      .btn
          background: #000
          padding: 1rem
          color: #ccc
          font-weight: bold
          font-size: 1.2rem  
</style>
