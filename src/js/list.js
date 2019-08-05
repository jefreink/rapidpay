import Top from '@/components/Header.vue'
import Addlist from '@/components/Addlist.vue'
import { swiper, swiperSlide } from "vue-awesome-swiper";
import { getUser, listar, cuenta } from "@/api/account";
import { mapGetters, mapActions } from 'vuex'
import TrendingNeutral from "vue-material-design-icons/TrendingNeutral.vue"

export default {
  name: 'lista',
  components: {
    Top,
    swiper,
    swiperSlide,
    Addlist,
    TrendingNeutral
  },
  data() {
    return {
      load: true,
      parametros: [{ "showRuta": true, "back": "resume", "logo": true, "showImg": true }],
      listado: [],
      search: '',
      idUser: null,
      amount: 1,
      select: [],
      toastShow: false,
      position: "",
      toastContent: [],
      toastError: false,
      swipeOptions: {
        slidesPerView: 6,
        spaceBetween: 20,
        mousewheel: true,
        centeredSlides: true,
        breakpoints: {
          480: {
            slidesPerView: 4,
            spaceBetween: 5,
          },
        }
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.verificarData()
    })
  },
  methods: {
    ...mapActions([
      'validOperation',
      'validIncreaseOperation',
      'llenarAccount',
      'llenarNotify'
    ]),
    selectAccount(val) {
      this.listado.forEach(element => {
        if (element.email == val) {
          if (element.status !== "active") {
            element.status = "active";
            this.select = [];
            this.amount = this.$refs.mySwiper.swiper.activeIndex + 1;
            let data = {
              name: element.nombre,
              email: element.email,
              coin: 'usd',
              foto: element.foto,
              amount: this.amount
            }
            this.select.push(data);
          } else {
            element.status = ""
            this.limpiarOperacion();
          }
        } else {
          element.status = ""
        }
      });
    },
    sendDeposit() {
      if (this.userAccount.amount >= this.amount) {
        this.$router.replace({ path: '/details' });
      }
    },
    listarCuentas() {
      this.subscriber2 = listar(this.idUser).subscribe(resp => {
        this.listado = [];
        resp.forEach(element => {
          this.listado.push(element);
        })
        this.load = false
      });
    },
    slide() {
      this.amount = this.$refs.mySwiper.swiper.activeIndex + 1;
      if (this.select.length > 0) {
        this.$store.dispatch('validIncreaseOperation', this.amount);
      }

      if (this.amount > this.userAccount.amount) {
        this.validAmount();
      } else {
        this.toastShow = false;
      }
    },
    validAmount() {
      let notify = {
        msg: "El monto supera tu saldo",
        color: "red",
        title: "Error",
        position: "b-toaster-bottom-center"
      };
      this.$store.dispatch('llenarNotify', notify);
    },
    toSlide(i) {
      this.$refs.mySwiper.swiper.slideTo(i - 1, 2000);
    },
    limpiarOperacion() {
      this.select = [];
      this.$store.commit('clearOperacion')
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    verificarData() {
      this.$store
        .dispatch("checkUserStatus")
        .then(usuario => {
          this.listarCuentas();
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
    beforeEnter(el) {
      el.style.opacity = 0
      el.style.height = 0
    },
    enter(el, done) {
      var delay = el.dataset.index * 150
      setTimeout(function () {
        Velocity(
          el,
          { opacity: 1, height: '55px' },
          { complete: done }
        )
      }, delay)
    },
    leave(el, done) {
      var delay = el.dataset.index * 150
      setTimeout(function () {
        Velocity(
          el,
          { opacity: 0, height: 0 },
          { complete: done }
        )
      }, delay)
    }

  },
  computed: {
    SelectFirst() {
      let a = 0;
      let send = true;
      this.listado.forEach(element => {
        if (element.status == 'active') {
          a++;
        }
      });

      if (a > 0 && (this.select.length > 0 || this.select.length !== undefined)) {
        send = false;
        this.$store.dispatch('validOperation', this.select[0]);
      } else {
        send = true
      }
      return send;
    },

    filterPerson() {
      return this.listado.filter(item => item.email.toLowerCase().includes(this.search.toLowerCase())
        || item.nombre.toLowerCase().includes(this.search.toLowerCase()));
    },
    ...mapGetters({
      userData: 'sendUserData',
      userAccount: 'sendAccount'
    })
  },
  mounted() {
    this.subscriber = getUser().subscribe(resp => {
      this.idUser = resp;
    });
    this.limpiarOperacion();
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
  }
}