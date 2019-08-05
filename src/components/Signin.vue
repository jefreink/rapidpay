<template>
  <div>
    <div id="firebaseui-auth-container"></div>
  </div>
</template>

<script>
import firebase from "firebase";
import firebaseui from "firebaseui";
import { config } from "../config/firebaseConfig";
export default {
  name: "signin",
  mounted() {
    var uiConfig = {
      signInSuccessUrl: "/",
      signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID]
    };
    let ui = firebaseui.auth.AuthUI.getInstance();
    if (!ui) {
      ui = new firebaseui.auth.AuthUI(firebase.auth());
    }
    setTimeout(function() {
      var button = document.querySelector(
        '[data-provider-id="google.com"] .firebaseui-idp-text'
      );
      if (button) {
        button.innerHTML = `Acceder`;
      }
    });
    ui.start("#firebaseui-auth-container", uiConfig);
  }
};
</script>

<style>
#firebaseui-auth-container .firebaseui-container {
  background: transparent;
}
#firebaseui-auth-container .firebaseui-container.firebaseui-id-page-sign-in,
#firebaseui-auth-container
  .firebaseui-container.firebaseui-id-page-password-sign-up,
#firebaseui-auth-container
  .firebaseui-container.firebaseui-id-page-password-sign-in,
#firebaseui-auth-container
  .firebaseui-container.firebaseui-id-page-password-recovery {
  background: #fff;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  right: 0;
}

#firebaseui-auth-container .firebaseui-idp-text {
  width: 100%;
  padding: 0;
  text-align: center;
}
</style>
