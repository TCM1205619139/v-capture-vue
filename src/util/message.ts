import { ExtensionPageType, Notify } from './notify'

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
  public send: Function

  constructor(from: ExtensionPageType, to: ExtensionPageType) {
    this.from = from
    this.to = to
    this.send = this.findSendFn()
  }

  private findSendFn () {
    return function () {
      // 根据字典找到对应通信方法
    }
  }
}

export default Message
