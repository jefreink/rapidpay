import Top from '@/components/Header.vue'
import { cuenta, generateAccount } from '@/api/account'
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'resume',
    subscriptions() {
        return {
        }
    },
    components: {
        Top
    },
    data() {
        return {
            parametros: [{ "showRuta": false, "back": "", "logo": true, "showImg": true }],
            cuenta: [],
            user: null,
            load: true,
            toastShow: false,
            position: "",
            toastContent: [],
            toastError: false,
            classCircle: ''
        }
    },
    beforeRouteEnter(to, from, next) {
        next((vm) => {
            vm.verificarData()
        })
    },
    created() {

    },
    methods: {
        ...mapActions(['llenarAccount', 'llenarNotify']),
        deposit() {
            let el = this;
            this.classCircle = 'active-green';
            setTimeout(function () {
                el.$router.replace('/list');
            }, 2700);
        },
        historical() {
            let el = this;
            this.classCircle = 'active-blue';
            setTimeout(function () {
                el.$router.replace('/history');
            }, 2700);
        },
        recharge() {
            let el = this;
            this.classCircle = 'active-pink';
            setTimeout(function () {
                el.$router.replace('/recarga');
            }, 2700);
        },
        showCuenta(id, coin) {
            this.subscriber1 = cuenta({ "id": id, "coin": coin })
                .subscribe(resp => {
                    if (resp.error == 0) {
                        this.cuenta = resp.msg;
                        this.load = false;
                        this.$store.dispatch('llenarAccount', resp.msg)
                    } else if (resp.error == 2) {
                        let data = {
                            msg: "Espera unos segundos estamos generando su numero de cuenta",
                            color: "orange",
                            title: "Info",
                            position: "b-toaster-top-center"
                        };
                        this.notify(data);
                        this.subscriber = generateAccount(id)
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
                                        this.load = false;
                                    }.bind(this), 2700);
                                    this.showCuenta(this.userData.uid, this.userData.coin);
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
            let val = (value / 1).toFixed(2).replace('.', ',')
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        },
        verificarData() {
            this.$store
                .dispatch("checkUserStatus")
                .then(usuario => {
                    this.showCuenta(usuario.uid, usuario.coin);
                    this.$store
                        .dispatch("paramsHeader", this.parametros);

                })
                .catch(error => {
                    this.$router.replace("/");
                });
        },
    },
    computed: {
        ...mapGetters({
            userData: 'sendUserData'
        })
    },
    beforeDestroy() {
        if (this.subscriber) {
            this.subscriber.unsubscribe();
        }
        if (this.subscriber1) {
            this.subscriber1.unsubscribe();
        }
    },
}
