import firebase from 'firebase';
import 'firebase/firestore';
import { Observable } from 'rxjs/Observable'
const database = firebase.firestore();

//se usa para crear el user interno
export function generateUser(data) {

    if (data.photoURL == null || data.photoURL == '') {
        data.photoURL = "https://www.accountchooser.com/static/image/generic_avatar.png";
    }
    database.collection('users')
        .where("idUser", "==", data.uid)
        .get().then(function (querySnapshot) {
            if (querySnapshot.docs.length == 0) {
                database.collection('users').add({
                    idUser: data.uid,
                    user_email: data.email,
                    names: data.displayName,
                    foto: data.photoURL
                })
                    .then(function () {
                    })
                    .catch(function (error) {
                    })
            }
        });
}

//se usa para obtener el id del usuario
export function getUser() {
    return Observable.create(function (observer) {
        let usuario = firebase.auth().currentUser;
        if (usuario !== null) {
            observer.next(usuario.uid)
        }
    });
}

//se usa para obtener los datos usuario
export function getUserData() {
    return Observable.create(function (observer) {
        let usuario = firebase.auth().currentUser;
        if (usuario !== null) {
            database.collection('users')
                .where("idUser", "==", usuario.uid)
                .get().then(function (querySnapshot) {
                    let response = querySnapshot.docs.map(docSnapshot => docSnapshot.data());
                    observer.next(response[0]);
                });
        }
    });
}

//
export function cuenta(data) {
    return Observable.create(function (observer) {
        database.collection("accounts")
            .where("id_user", "==", data.id)
            .get()
            .then(function (resp) {
                if (resp.empty) {
                    observer.next({ error: 2 });
                } else {
                    database.collection("accounts")
                        .where("id_user", "==", data.id)
                        .onSnapshot((querySnapshot) => {
                            let response = querySnapshot.docs.map(docSnapshot => docSnapshot.data());
                            observer.next({ msg: response[0], error: 0 });
                        },
                            function (error) {
                                observer.next({ msg: 'Ocurrio un error vuelva a intentar' + error, error: 1 });
                            });
                }
            });

    });
}

//se usa para recargar saldo
export function recargarSaldo(data) {
    return Observable.create(function (observer) {
        database.collection('accounts')
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    let respo = doc.data();
                    if (respo.id_user == data.id) {
                        database.collection('accounts')
                            .doc(doc.id)
                            .update({
                                amount: data.total
                            })
                            .then(function (resp) {
                                añadirRecarga(data)
                                observer.next({ resp: 'la recarga fue realizada con exito', error: 0 })
                            })
                            .catch(function (error) {
                                observer.next({ resp: 'Ocurrio un error al intentar realizar la recarga, intente de nuevo', error: 1 })
                            })
                    }
                })
            })
    })
}

//listar recargas realizadas
function añadirRecarga(datos) {
    let doc = database.collection('innerCuentas')
        .doc(datos.id).get()

    if (!doc.exists) {
        database.collection('innerCuentas')
            .doc(datos.id)
            .set({ cid: datos.id })
    }

    let hoy = new Date();
    let fec = hoy.getDate() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getFullYear();
    let hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    let fecha = fec + ' ' + hora;

    let data = {
        amount: datos.amount,
        person: datos.name,
        date: fecha
    }

    database.collection('innerCuentas')
        .doc(datos.id).collection('recharges').add(data)
        .then(() => {
        })
        .catch(function (error) {
        })
}

//listar transferencias receptor

function añadirTransferenciaRecept(datos, name) {
    let doc = database.collection('innerCuentas')
        .doc(datos.id).get()
    if (!doc.exists) {
        database.collection('innerCuentas')
            .doc(datos.id)
            .set({ cid: datos.id })
    }
    let hoy = new Date();
    let fec = hoy.getDate() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getFullYear();
    let hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    let fecha = fec + ' ' + hora;

    let data = {
        amount: datos.amount,
        person: name,
        coin: datos.coin,
        date: fecha,
        type: 'deposit'
    }
    database.collection('innerCuentas')
        .doc(datos.id).collection('transfers').add(data)
        .then(() => {
        })
        .catch(function (error) {
        })
}

//listar transferencias emisor

function añadirTransferenciaEmit(datos, resp) {

    let doc = database.collection('innerCuentas')
        .doc(datos.id_user).get()
    if (!doc.exists) {
        database.collection('innerCuentas')
            .doc(datos.id_user)
            .set({ cid: datos.id_user })
    }
    let hoy = new Date();
    let fec = hoy.getDate() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getFullYear();
    let hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    let fecha = fec + ' ' + hora;

    let data = {
        amount: resp.amount,
        person: resp.name,
        coin: datos.coin,
        date: fecha,
        type: 'transfer'
    }

    database.collection('innerCuentas')
        .doc(datos.id_user).collection('transfers').add(data)
        .then(() => {
        })
        .catch(function (error) {
        })
}

//se usa para generar cuenta
export function generateAccount(id) {
    return Observable.create(function (observer) {
        let min = 10000000000000000000
        let max = 99999999999999999999;
        let cuenta = Math.floor(Math.random() * max) + min;
        let validar = false;
        cuenta = String(cuenta);

        database.collection("accounts")
            .where("number", "==", cuenta)
            .onSnapshot((resp) => {
                if (resp.exists) {
                    validar = true;
                }
            })
        if (validar == false) {
            database.collection("accounts").add({
                "id_user": id,
                "amount": 0,
                "coin": 'usd',
                "number": cuenta
            })
                .then(() => {
                    observer.next({ msg: 'Su cuenta fue generada con exito', error: 0 });
                })
                .catch(function () {
                    observer.next({ msg: 'Error al generar su cuenta, intente nuevamente iniciando sesion', error: 1 });
                })
        }

    });
}

//se usa para añadir cuentas para transferir
export function addAccount(data) {
    return Observable.create(function (observer) {
        let id = data.id;
        let cuenta = {
            email: data.email
        };
        database.collection('users')
            .where("user_email", "==", data.email)
            .get()
            .then(function (query) {
                if (query.empty == true) {
                    observer.next({ msg: 'La cuenta no existe en nuestra plataforma', error: 1 });
                } else {
                    let doc = database.collection('innerCuentas').doc(id).get()

                    if (!doc.exists) {
                        database.collection('innerCuentas')
                            .doc(id)
                            .set({ cid: id })
                    }
                    cuentaExisteSubcoleccion(id, data.email).subscribe(resp => {
                        if (resp == true) {
                            observer.next({ msg: 'El contacto ya existe en tu lista', error: 1 });
                        } else {
                            database.collection('innerCuentas')
                                .doc(id).collection('persons')
                                .add(cuenta)
                                .then(() => {
                                    observer.next({ msg: 'La cuenta fue agregada con exito', error: 0 });
                                })
                                .catch(function (error) {
                                    observer.next({ msg: 'Error: intenta de nuevo' + error, error: 1 });
                                })
                        }
                    })
                }
            })

    });
}

// listar cuentas para depositar

export function listar(id) {
    let data = [];
    return Observable.create(function (observer) {
        database.collection("innerCuentas")
            .doc(id)
            .collection('persons')
            .onSnapshot((querySnapshot) => {
                if (!querySnapshot.empty) {
                    data = [];
                    let response = querySnapshot.docs.map(docSnapshot => docSnapshot.data());
                    response.forEach(el => {
                        database.collection('users')
                            .where("user_email", "==", el.email)
                            .get()
                            .then(function (query) {
                                let resp = query.docs.map(docSnapshot => docSnapshot.data());
                                if (resp.length > 0) {
                                    let objeto = {
                                        nombre: resp[0].names,
                                        email: resp[0].user_email,
                                        foto: resp[0].foto,
                                        status: ''
                                    }
                                    data.push(objeto);
                                }
                                observer.next(data)
                            });
                    });
                } else {
                    observer.next([])
                }
            });
    });

}

export function searchData(obj) {
    return Observable.create(function (observer) {
        let data = [];
        obj.forEach(el => {
            database.collection('users')
                .where("user_email", "==", el.email)
                .get()
                .then(function (query) {
                    let resp = query.docs.map(docSnapshot => docSnapshot.data());
                    if (resp.length > 0) {
                        let objeto = {
                            nombre: resp[0].names,
                            email: resp[0].email,
                            foto: resp[0].foto,
                            status: ''
                        }
                        data.push(objeto);
                    }
                    observer.next(data)
                });
        });
    });
}

export function logout() {
    let resp = '';
    return Observable.create(function (observer) {
        firebase.auth().signOut()
            .then(function () {
                resp = 'success';
            })
            .catch(function () {
                resp = 'error'
            });
        observer.next(resp)
    })
}


// enviar transferencia
export function sendDeposit(user, recep, name) {
    let id = null;
    let idAccount = null;
    let response;
    return Observable.create(function (observer) {
        database.collection('users')
            .where("user_email", "==", recep.email)
            .get()
            .then(function (query) {
                response = query.docs.map(docSnapshot => docSnapshot.data());
                id = response[0].idUser;
            });

        database.collection('accounts')
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    let respo = doc.data();
                    if (respo.id_user == id) {
                        idAccount = doc.id;
                        let result = parseFloat(respo.amount) + parseFloat(recep.amount)
                        database.collection('accounts')
                            .doc(idAccount)
                            .update({
                                amount: result
                            })
                            .then(function (resp) {
                                let datos = {
                                    amount: recep.amount,
                                    name: recep.name,
                                    type: 'deposit',
                                    coin: 'usd'
                                }
                                restDeposit(user, datos);
                                recep.id = id;
                                añadirTransferenciaRecept(recep, name)
                                observer.next({ msg: 'La transferencia se realizo con exito', error: 0 })
                            })
                            .catch(function (error) {
                                observer.next({ msg: 'Ocurrio un error al intentar realizar la transferencia, intente de nuevo', error: 1 })
                            })
                    }
                })
            });
    })
}

function restDeposit(user, datos) {
    database.collection('accounts')
        .get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                let respo = doc.data();
                if (respo.id_user == user.id_user) {
                    let idAccount = doc.id;
                    database.collection('accounts')
                        .doc(idAccount)
                        .update({
                            amount: respo.amount - datos.amount
                        })
                        .then(() => {
                            añadirTransferenciaEmit(user, datos);
                        })
                }
            })
        })
}


export function listRecharge(id) {
    return Observable.create(function (observer) {
        database.collection("innerCuentas")
            .doc(id)
            .collection('recharges')
            .orderBy("date", "desc")
            .limit(15)
            .onSnapshot((querySnapshot) => {
                let response = querySnapshot.docs.map(docSnapshot => docSnapshot.data());
                observer.next(response);
            });
    });
}

export function listTransfers(id) {
    return Observable.create(function (observer) {
        database.collection("innerCuentas")
            .doc(id)
            .collection('transfers')
            .orderBy("date", "desc")
            .limit(15)
            .onSnapshot((querySnapshot) => {
                let response = querySnapshot.docs.map(docSnapshot => docSnapshot.data());
                observer.next(response);
            });
    });
}

function cuentaExisteSubcoleccion(id, email) {
    let resp = false;
    return Observable.create(function (observer) {
        database.collection('innerCuentas')
            .doc(id).collection('persons')
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach((doc) => {
                    if (doc.data().email == email) {
                        resp = true
                    }
                });
                observer.next(resp);
            });
    });
}

export function Mycards(id) {
    return Observable.create(function (observer) {
        database.collection('innerCuentas')
            .doc(id).collection('cards')
            .onSnapshot((querySnapshot) => {
                if (querySnapshot.empty) {
                    observer.next({ error: 2 });
                } else {
                    let response = querySnapshot.docs.map(docSnapshot => docSnapshot.data());
                    observer.next({ msg: response, error: 0 },
                        function (error) {
                            observer.next({ msg: 'Ocurrio un error vuelva a intentar' + error, error: 1 });
                        });
                }
            })
    })
}

export function generateCards(id) {
    return Observable.create(function (observer) {
        let doc = database.collection('innerCuentas')
            .doc(id).get();

        if (!doc.exists) {
            database.collection('innerCuentas')
                .doc(id)
                .set({ cid: id })
        }

        database.collection('innerCuentas')
            .doc(id).collection('cards')
            .get()
            .then(function (resp) {
                if (resp.empty) {
                    for (let a = 0; a <= 2; a++) {
                        let data = {
                            number: Math.floor(Math.random() * 9999999999999999) + 1000000000000000,
                            date: (Math.floor(Math.random() * 12) + 1) + '/' + (Math.floor(Math.random() * 25) + 20),
                            amount: Math.floor(Math.random() * 100) + 20
                        }

                        database.collection('innerCuentas')
                            .doc(id).collection('cards')
                            .add(data)
                            .then(() => {
                                observer.next({ msg: 'Tus tarjetas fueron generadas exitosamente', error: 0 });
                            })
                            .catch(function (error) {
                                observer.next({ msg: 'Error intenta de nuevo' + error, error: 1 });
                            })
                    }
                }

            });
    });

}
//
export function updateBalanceCard(data) {
    database.collection('innerCuentas')
        .doc(data.id).collection('cards')
        .where('number', '==', data.number)
        .get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(doc => {
                database.collection('innerCuentas')
                    .doc(data.id).collection('cards')
                    .doc(doc.id)
                    .update({
                        amount: data.before - data.amount
                    })
                    .then(() => {
                    })
                    .catch(function (error) {
                    })
            });
        })
}

export function notifyBalance(id) {
    return Observable.create(function (observer) {
        database.collection("innerCuentas").doc(id)
            .collection('transfers')
            .onSnapshot(function (snapshot) {
                snapshot.docChanges().forEach(function (change) {
                    if (change.type === "added") {
                        // console.log("recarga: ", change.doc.data());
                        // observer.next({ msg: change.doc.data(), error: 0 })
                    }
                })
            })
    })
}