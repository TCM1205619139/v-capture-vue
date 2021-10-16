import { DefineComponent } from 'vue'

type VueComponent = DefineComponent<{}, {}, any>

// eg: createAsyncComponent(import(/* webpackChunkName: 'component' */ './component.vue'))
/**
 * 创建异步组件函数
 * @param component
 * @param loading
 * @param error
 * @param delay
 * @param timeout
 */
const createAsyncComponent = (
  importComponentFn: Promise<VueComponent>,
  loading: VueComponent,
  error: VueComponent,
  delay: number = 200,
  timeout: number = 5000
) => {
  return {
    component: importComponentFn,
    loading: loading,
    error: error,
    delay: delay,
    timeout: timeout
  }
}

export {
  createAsyncComponent
}
