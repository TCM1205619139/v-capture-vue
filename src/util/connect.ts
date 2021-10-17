import { ExtensionPageType, Notify } from './notify'

/**
 * chrome插件各模块的长链接消息通知
 */
class Connect implements Notify{
  readonly from: ExtensionPageType
  readonly to: ExtensionPageType
  public onMessage: Function
  public sendMessage: Function

  constructor(from: ExtensionPageType, to: ExtensionPageType) {
    this.from = from
    this.to = to
    this.onMessage =  this.findOnMessageFn()
    this.sendMessage = this.findSendMessageFn()
  }

  private findOnMessageFn () {
    return function () {

    }
  }

  private findSendMessageFn () {
    return function () {

    }
  }
}

export default Connect
