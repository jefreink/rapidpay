<template>
  <div>
    <div class="response d-flex align-items-center justify-content-center">
      <div v-if="response" class="p-4">
        <img
          v-if="response.error == 0"
          src="@/assets/congratulations.svg"
          alt
          class="mx-auto d-block"
        />
        <img v-else src="transfer/error.svg" alt class="mx-auto d-block" />
        <div class="text" v-html="response.msg"></div>
        <div class="col mt-5 pt-5 mx-auto">
        <router-link to="/resume">
          <button class="btn" v-html="'Continuar'"></button>
        </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="../js/response.js"></script>
<style src="../styles/response.sass" lang="sass" scoped></style>