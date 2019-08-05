import Detalles from "@/components/DetailUser.vue"
import Top from '@/components/Header.vue'
import Load from '@/components/LoadTransfer.vue'
import { mapGetters, mapActions } from 'vuex'
import TrendingNeutral from "vue-material-design-icons/TrendingNeutral.vue"
import { sendDeposit } from '@/api/account'

export default {
    name: 'Operdetails',
    data() {
        return {
            data: [],
            parametros: [{ "showRuta": true, "back": "list", "logo": true, "showImg": true }],
            amount: 0,
            fee: 0,
            coin: '',
            load: true,
            showload: false
        }
    },
    beforeRouteEnter(to, from, next) {
        next((vm) => {
            vm.verificarData()
        })
    },
    components: {
        Detalles,
        Top,
        Load,
        TrendingNeutral
    },
    methods: {
        ...mapActions(['validAumentar', 'validReducir', 'response', 'llenarNotify']),
        verificarData() {
            this.$store
                .dispatch("checkUserStatus")
                .then(usuario => {
                    if (this.sendData !== undefined) {
                        this.$store
                            .dispatch("paramsHeader", this.parametros);
                        this.load = false;
                    } else {
                        let data = {
                            msg: 'Hubo un error, intentelo nuevamente',
                            color: "red",
                            title: "Error",
                            position: "b-toaster-bottom-center"
                        };
                        this.notify(data);
                        this.$router.replace("list");
                    }
                })
                .catch(error => {
                    this.$router.replace("/");
                });
        },
        notify(notify) {
            this.$store.dispatch('llenarNotify', notify)
        },
        formatPrice(value) {
            let val = (value / 1).toFixed(0).replace(".", ",");
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        },
        send() {
            this.showload = true;
            this.userData.amount = this.userAccount.amount - this.sendData.amount;
            this.subscriber = sendDeposit(this.userAccount, this.sendData, this.userData.displayName).subscribe(resp => {
                this.$store.dispatch('response', resp)

                setTimeout(function () {
                    this.showload = false;
                    this.$router.replace('/response');
                }.bind(this), 3000);
            });
        },
    },
    mounted() {
    },
    computed: {
        ...mapGetters({
            userData: 'sendUserData',
            sendData: 'sendOperation',
            userAccount: 'sendAccount'
        }),

    },
    beforeDestroy() {
        if (this.subscriber) {
            this.subscriber.unsubscribe();
        }
    }
}