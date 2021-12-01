import { Notify } from './notify'
import { ComponentInternalInstance } from 'vue'

interface PageDict {
  local: ExtensionPageType,
  remote: ExtensionPageType,
  send: Function
}
const FromContentDict: PageDict[] = [
  {
    local: ExtensionPageType.Content,
    remote: ExtensionPageType.Popup,
    send: chrome.runtime.sendMessage,
  }, {
    local: ExtensionPageType.Content,
    remote: ExtensionPageType.Background,
    send: chrome.runtime.sendMessage
  }
]
const FromPopupDict: PageDict[] = [
  {
    local: ExtensionPageType.Popup,
    remote: ExtensionPageType.Background,
    send: (vueInstance: ComponentInternalInstance | null, payload: any, callback: Function) => {
      const backgroundPage = chrome.extension.getBackgroundPage()
      callback(vueInstance, backgroundPage)
    }
  }, {
    local: ExtensionPageType.Popup,
    remote: ExtensionPageType.Content,
    send: chrome.tabs.sendMessage
  }
]
const FromBackgroundDict: PageDict[] = [
  {
    local: ExtensionPageType.Background,
    remote: ExtensionPageType.Content,
    send: chrome.tabs.sendMessage
  }
]
const FromDevtoolDict: PageDict[] = [
  {
    local: ExtensionPageType.Devtool,
    remote: ExtensionPageType.Popup,
    send: chrome.runtime.sendMessage
  }, {
    local: ExtensionPageType.Devtool,
    remote: ExtensionPageType.Background,
    send: chrome.runtime.sendMessage
  }
]

const MessageDict = [
  ...FromContentDict,
  ...FromPopupDict,
  ...FromBackgroundDict,
  ...FromDevtoolDict
]

/**
 * chrome插件各模块的短链接消息通知
 */
class ChromeMessage implements Notify{
  readonly from: ExtensionPageType
  public context: ComponentInternalInstance | null

  constructor(from: ExtensionPageType, context: ComponentInternalInstance | null) {
    this.from = from
    this.context = context
  }

  private findSendFn (to: ExtensionPageType) {
    const dict = MessageDict.find((item: PageDict) => {
      return item.local === this.from && item.remote === to
    })
    return dict?.send || new Function()
  }

  public send (to: ExtensionPageType, payload: any, callback?: Function) {
    const options = {active: true, currentWindow: true}

    const sendFn = this.findSendFn(to)

    chrome.tabs.query(options, (tabs: any) => {
      if (sendFn === chrome.tabs.sendMessage) {
        sendFn(tabs[0].id, payload, callback)   // 这里似乎可以用函数重载进行简化
      } else if (sendFn === chrome.runtime.sendMessage) {
        sendFn(payload, callback)
      } else if (sendFn === window.postMessage) {
        sendFn(payload, this.from)
      } else {  // 自定义方法
        sendFn(this.context, payload, callback)
      }
    })
  }

  public on(callback?: Function) {
    chrome.runtime.onMessage.addListener(async (request: any, sender: any, sendResponse: Function) => {
      let response

      if (callback !== undefined) {
        response = await callback(request, sender)  // 等待接收方处理完毕后再返回
      }

      sendResponse({
        response,
        state: true
      })
    })
  }
}

export default ChromeMessage
