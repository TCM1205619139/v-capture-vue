<template>
  <div class="popup-container">
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, getCurrentInstance, ComponentInternalInstance, SetupContext } from 'vue'

  export default defineComponent({
    name: 'App',
    setup (props: Object, ctx: SetupContext) {
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
