<template>
  <div class="container"></div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'App',
    setup () {
      return {}
    }
  })
</script>

<style lang="less">
  #app {
    padding: 0;
    margin: 0;
    box-sizing: border-box;

    .container {
      width: 300px;
      min-height: 100px;
    }
  }
</style>
