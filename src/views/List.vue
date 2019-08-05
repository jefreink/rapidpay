<template>
  <div class="lista">
    <div class="amounts" ref="amountLet">
      <div class="d-flex align-items-center justify-content-center centrar-list">
        <div class="container-fluid">
          <div>
            <swiper :options="swipeOptions" ref="mySwiper" @transitionEnd="slide">
              <swiper-slide v-for="index in 100" :key="index" @click.native="toSlide(index)" v-html="formatPrice(index)"></swiper-slide>
            </swiper>
          </div>
        </div>
      </div>
    </div>
    <div class="container list-content">
      <div class="form-group mb-3 px-3 box-search">
        <input
          type="text"
          id="input"
          class="form-control mb-3 text-center"
          v-model="search"
          placeholder="Buscar cuenta"
        />
        <label for="input"></label>
      </div>
      <div class="d-flex">
        <div class="flex-fill">
          <div class="title mb-3 px-3" v-html="'Cuentas afiliadas'"></div>
        </div>
        <div class="flex-fill">
          <Addlist></Addlist>
        </div>
      </div>

      <div class="box-cards px-3">
        <div class="d-flex justify-content-center" v-if="load">
          <div class="spinner-border" role="status">
            <span class="sr-only" v-html="'Loading...'"></span>
          </div>
        </div>
        <div v-if="!load">
          <template v-if="listado.length > 0">
            <transition-group
              name="list"
              tag="ul"
              class="list-unstyled"
              :css="false"
              v-on:before-enter="beforeEnter"
              v-on:enter="enter"
              v-on:leave="leave"
            >
              <li v-for="(item, index) in filterPerson" :key="index" v-bind:data-index="index">
                <div
                  @click="selectAccount(item.email)"
                  :class="['media draw px-3 py-2', item.status]"
                >
                  <img :src="item.foto" alt class="rounded-circle mr-3" width="25" />
                  <div class="media-body">
                    <p class="float-left mb-0 text-capitalize" v-html="item.nombre"></p>
                    <p class="float-right mb-0 d-none d-sm-block" v-html="item.email"></p>
                  </div>
                </div>
              </li>
            </transition-group>
          </template>
          <template v-else>
            <div class="d-flex align-items-center justify-content-center empty" v-html="'Su lista de contactos se encuentra vacia'"></div>
          </template>
        </div>
      </div>
      <div class="form-group">
        <label for="nota" v-html="'Escribir nota'"></label>
        <textarea class="form-control" id="nota"></textarea>
      </div>

      <div class="col col-sm-6 mx-auto">
        <div class="form-group m-0">
          <button
            class="btn w-100"
            :disabled="SelectFirst || amount > userAccount.amount"
            @click="sendDeposit">
            <span  v-html="'Enviar '"></span>
            <span v-if="amount" v-html="formatPrice(amount) + ' $'"></span>
            <TrendingNeutral class="arrow" />
          </button>
        </div>
      </div>
    </div>
    <b-toast v-model="toastShow" :toaster="position" auto-hide-delay="300000" solid>
      <div
        v-if="toastContent.length > 0"
        slot="toast-title"
        class="d-flex flex-grow-1 align-items-baseline"
      >
        <b-img blank :blank-color="toastContent[0].color" class="mr-2" width="12" height="12"></b-img>
        <strong class="mr-auto">{{toastContent[0].title}}</strong>
      </div>
      <div v-if="toastContent.length > 0" v-html="'toastContent[0].msg'"></div>
    </b-toast>
  </div>
</template>

<script src="../js/list.js"></script>
<style src="../styles/list.sass" lang="sass" scoped></style>