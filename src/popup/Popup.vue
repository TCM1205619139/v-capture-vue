<template>
  <div class="popup-container">{{title}}</div>
</template>

<script>
  import { defineComponent, ref } from 'vue'

  export default defineComponent({
    name: 'App',
    setup () {
      const title = ref('你好')

      return {
        title
      }
    }
  })
</script>

<style lang="less">
  #app {
    padding: 0;
    margin: 0;
    box-sizing: border-box;

    .popup-container {
      width: 300px;
      min-height: 100px;
    }
  }
</style>
