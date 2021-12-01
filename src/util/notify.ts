import { ComponentInternalInstance } from 'vue'

interface Notify {
  readonly from: ExtensionPageType
  readonly context: ComponentInternalInstance | null
}

export {
  Notify
}
