import { ExtensionPageType, Notify } from './notify'

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
