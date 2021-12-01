import { Notify } from './notify'
import {ComponentInternalInstance} from "vue";

/**
 * chrome插件各模块的长链接消息通知
 */
class Connect implements Notify{
  readonly from: ExtensionPageType
  public onMessage: Function
  public sendMessage: Function
  public context: ComponentInternalInstance | null

  constructor(from: ExtensionPageType, context: ComponentInternalInstance) {
    this.from = from
    this.onMessage =  this.findOnMessageFn()
    this.sendMessage = this.findSendMessageFn()
    this.context = context
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
