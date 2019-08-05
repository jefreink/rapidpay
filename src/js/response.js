import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'response',
    data() {
        return {
            parametros: [{ "showRuta": false, "back": "", "logo": true, "showImg": true }]
        }
    },
    beforeRouteEnter(to, from, next) {
        next((vm) => {
            vm.verificarData()
        })
    },
    methods: {
        ...mapActions(['paramsHeader', 'llenarNotify']),
        verificarData() {
            this.$store
                .dispatch("checkUserStatus")
                .then(() => {
                    if (this.response !== undefined) {
                        this.$store
                            .dispatch("paramsHeader", this.parametros);
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
    },
    computed: {
        ...mapGetters({
            response: 'sendResponse'
        })
    },

}