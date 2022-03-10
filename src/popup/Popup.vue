<template>
  <div class="popup-container">
    <button ref="button" @click="changeColor">{{title}}</button>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, Ref, onMounted, SetupContext } from 'vue'

  const changeColor = async (e: PointerEvent) => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true })

    const setPageBackgroundColor = () => {
      chrome.storage.sync.get("color", ({ color }: any) => {
        console.log(color)
        document.body.style.backgroundColor = color
      })
    }

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: setPageBackgroundColor,
    })
  }
  const init = (button: Ref<HTMLElement | null>) => {
    chrome.storage.sync.get("color", ({ color }: any) => {
      console.log(color)
      button.value && (button.value.style.backgroundColor = color)
    })
  }

  export default defineComponent({
    name: 'App',
    setup (props, ctx) {
      const title = ref('popup')
      let button = ref(null)

      console.log(chrome)

      onMounted(() => {
        init(button)
      })

      return {
        title,
        button,
        changeColor
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
