/**
 * 因为content.js，没有视图， 所以不需要使用Vue
 */

// do something
import Message from '../util/message'
import { ExtensionPageType } from '../util/notify'

const messageP2C = new Message(ExtensionPageType.Content, ExtensionPageType.Popup, null)

messageP2C.on((response: any, sender: any) => {
  console.log(response)
  console.log(sender)
})
