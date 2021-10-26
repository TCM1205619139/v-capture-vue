<template>
  <div class="popup-container">{{title}}</div>
</template>

<script lang="ts">
  import Message from "../util/message";
  import {defineComponent, ref, getCurrentInstance} from 'vue'
  import {ComponentInternalInstance} from "@vue/runtime-core";

  const createMessage = (vueInstance: ComponentInternalInstance | null): void => {
    const message = new Message(ExtensionPageType.Popup, ExtensionPageType.Content, vueInstance)

    message.send({time: new Date()})
  }

  export default defineComponent({
    name: 'App',
    setup () {
      const title = ref('你好')
      createMessage(getCurrentInstance())

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
