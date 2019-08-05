import Top from '@/components/Header.vue'
import Pays from '@/components/Pays.vue'
import Recharges from '@/components/Recharges.vue'
import Transfers from '@/components/Transfers.vue'
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";

export default {
    name: 'history',
    components: {
        Top,
        Pays,
        Recharges,
        Transfers,
        swiper,
        swiperSlide
    },
    beforeRouteEnter(to, from, next) {
        next((vm) => {
          vm.verificarData()
        })
      },
    data() {
        return {
            parametros: [{ "showRuta": true, "back": "resume", "logo": true, "showImg": true }],
            seleccion: null,
            showCircle: false,
            mes: '',
            dia: '',
            load: true,
            selected: 0,
            bigOptions: {
                slidesPerView: 1,
                spaceBetween: 20,
                mousewheel: true,
                slideToClickedSlide: true
            }
        }
    },
    methods: {
        showMounth(evento) {
            this.dia = evento.dia;
            this.seleccion = evento.mes;
            let meses = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct',
                'nov', 'dic'];
            this.mes = meses[this.seleccion - 1]
        },
        toSlide(i) {
            this.$refs.contentSwiper.swiper.slideTo(i, 300);
            this.selected = i;
        },
        slide() {
            this.selected = this.$refs.contentSwiper.swiper.activeIndex;
            if(this.selected == 0 ){
                this.showCircle = false
            } else {
                this.showCircle = true 
            }
        },
        verificarData() {
            this.$store
                .dispatch("checkUserStatus")
                .then(usuario => {
                    this.$store
                        .dispatch("paramsHeader", this.parametros);
                        this.load = false;
                        
                })
                .catch(error => {
                    this.$router.replace("/");
                });
        },
    },
}