<template>
  <div class="historical">
    <div class="box-tabs d-flex pt-3">
      <div class="col-12">
        <div class="row">
          <div class="col-4" :class="{'active': selected == 0}">
            <span @click="toSlide(0)" v-html="'Pagos'"></span>
          </div>
          <div class="col-4" :class="{'active': selected == 1}">
            <span @click="toSlide(1)" v-html="'Recargas'"></span>
          </div>
          <div class="col-4" :class="{'active': selected == 2}">
            <span @click="toSlide(2)" v-html="'Transferencias'"></span>
          </div>
          <div class="selector"></div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="col-12"></div>
    </div>
    <div>
      <swiper :options="bigOptions" ref="contentSwiper" @slideChange="slide">
        <swiper-slide>
          <Pays @changeMounth="showMounth"></Pays>
        </swiper-slide>
        <swiper-slide>
          <Recharges @changeMounth="showMounth"></Recharges>
        </swiper-slide>
        <swiper-slide>
          <Transfers @changeMounth="showMounth"></Transfers>
        </swiper-slide>
      </swiper>
    </div>
    <div class="box-date" v-if="showCircle">
      <div class="circulo" :style="{transform: 'rotate('+ (11.6*dia) +'deg)'}">
        <div
          class="box-inner"
          :style="{transform: 'rotate('+ ((11.6*dia)*-1) +'deg)'}"
        >
          <div class="day" v-html="dia"></div>
          <div class="mounth text-capitalize" v-html="mes"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="../js/Historical.js"></script>
<style src="../styles/Historical.sass" lang="sass" scoped></style>