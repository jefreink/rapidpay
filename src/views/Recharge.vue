<template>
  <div class="recharge" :class="{'showLoad': showload}">
    <transition name="scale">
      <div class="box-cards" v-if="!load" :class="{'showLoad': showload}">
        <div class="container">
          <Cards :cards="cards" @changeCard="SelectedCard"></Cards>
        </div>
      </div>
    </transition>
    <div class="box-account d-flex align-items-center justify-content-center">
      <div class="load d-flex justify-content-center" v-if="load">
        <div class="spinner-border" role="status">
          <span class="sr-only" v-html="'Loading...'"></span>
        </div>
      </div>
      <transition name="slideUp">
        <div v-if="!load">
          <div class="container">
            <div class="col col-lg-10 mx-auto">
              <div class="box-amount">
                <div class="enter" v-html="'Ingresar monto'"></div>
                <div class="d-flex mb-4">
                  <div class="flex-fill">
                    <div class="coin" v-html="'USD'"></div>
                  </div>
                  <div class="col-8">
                    <div class="amount">
                      <input
                        type="number"
                        class="form-control"
                        placeholder="0.00"
                        v-model.number="monto"
                        @input="validInput($event)"
                        @keypress="keyPressValid($event)"
                      />
                    </div>
                  </div>
                  <div class="flex-fill">
                    <div class="resp">
                      <div v-if="monto !== null && monto !== ''">
                        <template v-if="monto > 0 && monto <= cards[select].amount">
                          <div class="svg-success d-flex align-items-center justify-content-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="26"
                              height="26"
                              viewBox="-263.5 236.5 26 26"
                            >
                              <g class="svg-success">
                                <circle cx="-250.5" cy="249.5" r="12" />
                                <path d="M-256.46 249.65l3.9 3.74 8.02-7.8" />
                              </g>
                            </svg>
                          </div>
                        </template>
                        <template v-else-if="monto < 0 || monto > cards[select].amount">
                          <div class="svg-error d-flex align-items-center justify-content-center">
                            <svg
                              viewBox="0 0 87 87"
                              version="1.1"
                              width="26"
                              height="26"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g
                                id="Page-1"
                                stroke="none"
                                stroke-width="1"
                                fill="none"
                                fill-rule="evenodd"
                              >
                                <g id="Group-2" transform="translate(2.000000, 2.000000)">
                                  <circle id="Oval2" cx="41.5" cy="41.5" r="41.5" />
                                  <circle class="ui-error-circle" cx="41.5" cy="41.5" r="41.5" />
                                  <path
                                    class="ui-error-line1"
                                    d="M22.244224,22 L60.4279902,60.1837662"
                                    id="Line"
                                    stroke-linecap="square"
                                  />
                                  <path
                                    class="ui-error-line2"
                                    d="M60.755776,21 L23.244224,59.8443492"
                                    id="Line"
                                    stroke-linecap="square"
                                  />
                                </g>
                              </g>
                            </svg>
                          </div>
                        </template>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="resume">
                  <div class="d-flex mb-4">
                    <div class="flex-fill text-left texto" v-html="'Saldo actual:'"></div>
                    <div class="flex-fill text-right postText" v-html="formatPrice(beforeAmount)"></div>
                  </div>
                  <div class="d-flex mb-4">
                    <div class="flex-fill text-left texto" v-html="'Monto de recarga:'"></div>
                    <div class="flex-fill text-right postText" v-html="formatPrice(monto)"></div>
                  </div>
                  <div class="d-flex mb-4">
                    <div class="flex-fill text-left texto" v-html="'Total:'"></div>
                    <div class="flex-fill text-right postText" v-html="formatPrice(totalRecarga)"></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col col-sm-8 col-lg-6 mx-auto">
              <div class="form-group m-0 box-recharge">
                <button
                  class="btn w-100"
                  @click="recargar"
                  :disabled="monto <= 0 || monto > cards[select].amount">
                <span v-html="'Recargar'"></span>
                  <TrendingNeutral class="arrow" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <transition name="fadeUp">
      <Load v-if="showload" :data="rechargeData[0]"></Load>
    </transition>
  </div>
</template>

<script src="../js/Recharge.js"></script>
<style src="../styles/recharge.sass" lang="sass" scoped></style>

<style>
.box-indicators {
  bottom: -40px !important;
  z-index: 100;
}
.fadeUp-enter-active {
  position: fixed;
  left: 0;
  height: 100%;
  width: 100%;
  top: 100%;
  animation: up 0.8s forwards;
}
.fadeUp-leave-active {
  opacity: 0;
}
.fadeUp-enter,
.fade-leave-to {
  opacity: 0;
}

.slideUp-enter-active {
  transition: all 0.5s ease;
}
.slideUp-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slideUp-enter,
.slideUp-leave-to {
  transform: translateY(100px);
  opacity: 0;
}

.scale-enter-active {
  transition: all .3s ease;
   transform: scaleX(1);
}
.scale-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.scale-enter,
.scale-leave-to {
   transform: scaleX(0);
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