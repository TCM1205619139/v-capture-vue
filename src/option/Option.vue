<template>
  <div class="popup-container">
    <el-input v-model="input" placeholder="Please input" />
<!--    <el-button>I am ElButton</el-button>-->
  </div>
</template>

<script>
  import { defineComponent, ref } from 'vue'

  export default defineComponent({
    name: 'Option',
    setup () {
      const input = ref('')

      return {
        input
      }
    }
  })
</script>

<style lang="less">
  #app {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
</style>
