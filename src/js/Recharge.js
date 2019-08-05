import Top from '@/components/Header.vue'
import Cards from '@/components/Cards.vue'
import Load from '@/components/LoadTransfer.vue'
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import { recargarSaldo, cuenta, generateCards, Mycards } from '@/api/account'
import TrendingNeutral from "vue-material-design-icons/TrendingNeutral.vue"
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'recharge',
  components: {
    Top,
    Cards,
    swiper,
    swiperSlide,
    Load,
    TrendingNeutral
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.verificarData()
    })
  },
  data() {
    return {
      parametros: [{ "showRuta": true, "back": "resume", "logo": true, "showImg": true }],
      beforeAmount: null,
      monto: null,
      load: true,
      showload: false,
      select: 0,
      rechargeData: [],
      cards: [],
      swiperOption: {
        slidesPerView: 1,
        spaceBetween: 20,
        mousewheel: true,
        centeredSlides: true,
        pagination: {
          el: ".swiper-pagination"
        }
      }
    }
  },
  methods: {
    ...mapActions(['llenarAccount', 'llenarNotify']),

    SelectedCard(event) {
      this.select = event;
    },
    recargar() {
      this.rechargeData = [];
      let total = parseFloat(this.monto) + parseFloat(this.beforeAmount);
      let datos = {
        number: this.userAccount.number,
        amount: this.monto,
        total: total,
        id: this.userData.uid,
        name: this.userData.displayName,
        foto: this.pararms.img,
        type: 'recharge'
      }
      this.rechargeData.push(datos);
      this.showload = true;
      this.subscriber3 = recargarSaldo(datos).subscribe(data => {
        if (data.error == 0) {
          let notify = {
            msg: data.resp,
            color: "green",
            title: "Completado",
            position: 'b-toaster-top-center'
          };
          setTimeout(function () {
            this.$store.dispatch('llenarNotify', notify)
            this.monto = 0;
            this.$router.replace("/");
          }.bind(this), 3000);
        }
        else {
        }
      });
    },
    showCuenta(id) {
      this.subscriber = cuenta({ "id": id })
        .subscribe(resp => {
          if (resp.error == 0) {
            this.beforeAmount = resp.msg.amount;
            this.showCards(this.userData.uid);
          }
        });
    },
    showCards(id) {
     this.subscriber2 = Mycards(id).subscribe(resp => {
        this.cards = [];
        if (resp.error == 0) {
          this.cuenta = resp.msg;
          this.load = false;
          resp.msg.forEach(element => {
            this.cards.push(element);
          });
        } else if (resp.error == 2) {
          let data = {
            msg: "Espera unos segundos estamos generando sus rapidCards",
            color: "orange",
            title: "Info",
            position: "b-toaster-top-center"
          };
          this.notify(data);
          this.subscriber4 = generateCards(id)
            .subscribe(resp => {
              if (resp.error == 0) {
                let data = {
                  msg: resp.msg,
                  color: "green",
                  title: "Completado",
                  position: "b-toaster-top-center"
                };
                setTimeout(function () {
                  this.notify(data);
                }.bind(this), 2700);
                this.load = false;
                this.showCards(this.userData.uid);
              } else {
                let data = {
                  msg: resp.msg,
                  color: "red",
                  title: "Error",
                  position: "b-toaster-bottom-center"
                };
                setTimeout(function () {
                  this.notify(data);
                }.bind(this), 2700);
              }
            })
        } else {
          let data = {
            msg: resp.msg,
            color: "red",
            title: "Error",
            position: "b-toaster-bottom-center"
          };
          this.notify(data);
        }
      });
    },
    notify(notify) {
      this.$store.dispatch('llenarNotify', notify)
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(0).replace('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    },
    verificarData() {
      this.$store
        .dispatch("checkUserStatus")
        .then(usuario => {
          this.showCuenta(usuario.uid);
          this.$store
            .dispatch("paramsHeader", this.parametros);
          if (!this.userAccount) {
            this.subscriber1 = cuenta({ "id": this.userData.uid, "coin": this.userData.coin })
              .subscribe(resp => {
                if (resp.error == 0) {
                  this.$store.dispatch('llenarAccount', resp.msg)
                }
              })
          }

        })
        .catch(error => {
          this.$router.replace("/");
        });
    },
    keyPressValid(event) {
      var el = event.target;
      var evt = event;
      var ints = 7;
      var key = window.event ? event.which : event.keyCode;
      if (key < 48 || key > 57) {
        event.preventDefault();
      } else {
        if (el.value.length >= ints) {
          event.preventDefault();
        }
      }
    },
    validInput(event) {
      let dato = event.target.value;
      dato = dato.replace(/[^0-9]/g, '');
      let expo = String(dato).split(/[eE]/);
      if (expo[0].length > 7) {
        this.monto = expo[0].slice(0, 7);
      }
      if (this.monto < 0) {
        this.monto = '';
      }
    }
  },
  computed: {
    totalRecarga() {
      let total = parseFloat(this.monto) + parseFloat(this.beforeAmount);
      if (total >= 0) {
        return total
      } else {
        return ''
      }
    },
    ...mapGetters({
      userData: 'sendUserData',
      userAccount: 'sendAccount',
      pararms: 'headerParams'
    })
  },
  beforeDestroy() {
    if (this.subscriber) {
      this.subscriber.unsubscribe();
    }
    if (this.subscriber1) {
      this.subscriber1.unsubscribe();
    }
    if (this.subscriber2) {
      this.subscriber2.unsubscribe();
    }
    if (this.subscriber3) {
      this.subscriber3.unsubscribe();
    }
    if (this.subscriber4) {
      this.subscriber4.unsubscribe();
    }
  }
}



