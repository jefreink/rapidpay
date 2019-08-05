<template>
  <div class="resume d-flex align-items-center justify-content-center">
    <div class="container">
      <div class="load d-flex justify-content-center" v-if="load && cuenta.length == 0">
        <div class="spinner-border" role="status">
          <span class="sr-only" v-html="'Loading...'"></span>
        </div>
      </div>

      <div class="d-flex align-items-center justify-content-center" v-if="!load && cuenta">
        <div :class="['box-svg', classCircle, {'active': !load}]">
          <svg height="300" width="300">
            <circle cx="150" cy="150" r="145" class="circle" />
            <circle cx="150" cy="150" r="145" class="circle2" />
            <circle cx="150" cy="150" r="145" class="circle3" />
          </svg>

          <div class="box-account d-flex align-items-center justify-content-center">
            <div>
              <div class="account">
                <div class="text-center" v-html="'N° Cuenta'"></div>
                <div class="number" v-html="cuenta.number"></div>
              </div>

              <div class="amount">
                <div class="number" v-html="formatPrice(cuenta.amount)"></div>
                <div class="coin" v-html="cuenta.coin"></div>
              </div>
            </div>
            <div class="blue-circle"></div>
            <div class="box-lights">
              <div class="account-circle"></div>
              <div class="recharge-circle"></div>
              <div class="deposit-circle"></div>
            </div>
            <div class="box-text">
              <div class="account-text" @click="historical" v-html="'Cuenta'"></div>
              <div class="recharge-text" @click="recharge" v-html="'Recargar'"></div>
              <div class="deposit-text" @click="deposit" v-html="'Depositar'"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="../js/Resume.js"></script>
<style src="../styles/resume.sass" lang="sass" scoped></style>