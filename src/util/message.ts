import { ExtensionPageType, Notify } from './notify'
import { ComponentInternalInstance } from 'vue'
const MessageDict = [
  {
    local: ExtensionPageType.Content,
    origin: ExtensionPageType.Popup,
    // @ts-ignore
    send: chrome.runtime.sendMessage,
  },
  {
    local: ExtensionPageType.Content,
    origin: ExtensionPageType.Background,
    // @ts-ignore
    send: chrome.runtime?.sendMessage
  },
  {
    local: ExtensionPageType.Content,
    origin: ExtensionPageType.Inject,
    send: window.postMessage
  },
  {
    local: ExtensionPageType.Inject,
    origin: ExtensionPageType.Popup,
    // @ts-ignore
    send: chrome.runtime?.sendMessage
  },
  {
    local: ExtensionPageType.Inject,
    origin: ExtensionPageType.Background,
    // @ts-ignore
    send: chrome.runtime?.sendMessage
  },
  {
    local: ExtensionPageType.Inject,
    origin: ExtensionPageType.Content,
    send: window.postMessage
  },
  {
    local: ExtensionPageType.Popup,
    origin: ExtensionPageType.Background,
    // @ts-ignore
    send: () => {}
  },
  {
    local: ExtensionPageType.Popup,
    origin: ExtensionPageType.Content,
    // @ts-ignore
    send: chrome.tabs?.sendMessage
  },
  {
    local: ExtensionPageType.Popup,
    origin: ExtensionPageType.Inject,
    // @ts-ignore
    send: chrome.tabs?.sendMessage
  },
  {
    local: ExtensionPageType.Background,
    origin: ExtensionPageType.Content,
    // @ts-ignore
    send: chrome.tabs?.sendMessage
  },
  {
    local: ExtensionPageType.Background,
    origin: ExtensionPageType.Inject,
    // @ts-ignore
    send: chrome.tabs?.sendMessage
  }
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
    this.sendFn = this.findSendFn('send')
  }

  private findSendFn (key: string) {
    const dict = MessageDict.find(item => {
      return item.local === this.from && item.origin === this.to
    })
    return dict?.send
  }

  public send (payload: any, callback?: Function) {
    const options = {active: true, currentWindow: true}

    // @ts-ignore
    chrome.tabs.query(options, tabs => {
      // @ts-ignore
      if (this.sendFn === chrome.tabs.sendMessage) {
        // this.sendFn === chrome.tabs.sendMessage
        this.sendFn(tabs[0]?.id, payload, callback)   // 这里似乎可以用函数重载进行简化
        // @ts-ignore
      } else if (this.sendFn === chrome.tabs?.sendMessage) {
        // this.sendFn === chrome.runtime.sendMessage
        this.sendFn(payload, callback)
      } else {
        // this.sendFn === window.postMessage
        this.sendFn(payload, this.from)
      }
    })
  }

  public on(callback?: Function) {
    // @ts-ignore
    chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
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
