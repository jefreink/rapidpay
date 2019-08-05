<template>
  <div class="Operdetails d-flex align-items-center justify-content-center" :class="{'showLoad': showload}">
    <div class="d-flex justify-content-center" v-if="load">
      <div class="spinner-border" role="status">
        <span class="sr-only" v-html="'Loading...'"></span>
      </div>
    </div>
    <div class="container" v-if="!load">
      <h1 class="text-center" v-html="'Detalles de la operación'"></h1>
      <Detalles></Detalles>
      <div class="col-12">
        <div class="box-oper">
          <div class="row">
            <div class="col-3">
              <div
                class="plus"
                @click="validAumentar"
                :class="{'disabled':userAccount.amount - sendData.amount == 0}"
              ></div>
            </div>
            <div class="col">
              <div class="text-center text-white font-weight-bold" v-html="'Total a enviar'"></div>
              <div class="text-amount text-white">
                {{formatPrice(sendData.amount)}}
                <span class="text-uppercase">{{sendData.coin}}</span>
              </div>
            </div>
            <div class="col-3">
              <div
                class="minus"
                @click="validReducir"
                :class="{'disabled':sendData.amount - 1 == 0}"
              ></div>
            </div>
            <div class="col-12 mt-3">
              <button class="btn btn-block" @click="send">
                <span v-html="'Confirmar'"></span>
                 <TrendingNeutral class="arrow" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <transition name="fadeUp">
      <Load v-if="showload" :data="sendData"></Load>
    </transition>
  </div>
</template>

<script src="../js/Operdetails.js"></script>
<style src="../styles/Operdetails.sass" lang="sass" scoped></style>
<style>
.fadeUp-enter-active {
  position: fixed;
  left: 0;
  height: 100%;
  width: 100%;
  top: 100%;
  z-index: 1000;
  animation: up 0.3s forwards;
}
.fadeUp-leave-active {
  opacity: 0;
}
.fadeUp-enter,
.fade-leave-to {
  opacity: 0;
}

@keyframes up {
  from {
    top: 100%;
  }
  to {
    top: 0%;
  }
}
</style>
