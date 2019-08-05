<template>
  <div class="hello">
    <div v-html="msg"></div>
    <div v-html="email"></div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
    email: ""
  }
};
</script>

<style scoped lang="scss">
.hello {
  position: absolute;
  width: 100%;
  text-align: center;
  bottom: 0px;
  left: 0;
  font-size: 1rem;
  font-family: Mont-Semibold;
}
</style>
