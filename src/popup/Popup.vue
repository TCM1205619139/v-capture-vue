<template>
  <div class="popup-container">
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, Ref, onMounted, SetupContext } from 'vue'

  export default defineComponent({
    name: 'App',
    setup (props, ctx) {
    }
  })
</script>

<style lang="less">
  #app {
    padding: 0;
    margin: 0;
    box-sizing: border-box;

    .popup-container {
      display: none;
    }
  }
</style>
