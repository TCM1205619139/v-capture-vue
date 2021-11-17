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
class Message implements Notify{
  readonly from: ExtensionPageType
  readonly to: ExtensionPageType
  private readonly sendFn: Function
  public context: ComponentInternalInstance | null

  constructor(from: ExtensionPageType, to: ExtensionPageType, context: ComponentInternalInstance | null) {
    this.from = from
    this.to = to
    this.context = context
    this.sendFn = this.findSendFn()
  }

  private findSendFn () {
    const dict = MessageDict.find((item: PageDict) => {
      return item.local === this.from && item.remote === this.to
    })
    return dict?.send || new Function()
  }

  public send (payload: any, callback?: Function) {
    const options = {active: true, currentWindow: true}

    chrome.tabs.query(options, (tabs: any) => {
      if (this.sendFn === chrome.tabs.sendMessage) {
        this.sendFn(tabs[0].id, payload, callback)   // 这里似乎可以用函数重载进行简化
      } else if (this.sendFn === chrome.runtime.sendMessage) {
        this.sendFn(payload, callback)
      } else if (this.sendFn === window.postMessage) {
        this.sendFn(payload, this.from)
      } else {  // 自定义方法
        this.sendFn(this.context, payload, callback)
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

export default Message
