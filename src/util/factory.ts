import { DefineComponent } from 'vue'
import LoadingComponent from '@/components/LoadingForAsync.vue'
import ErrorComponent from '@/components/ErrorForAsync.vue'

type VueComponent = DefineComponent<{}, {}, any>

/**
 * 创建异步组件函数
 * @param component
 * @param loading
 * @param error
 * @param delay
 * @param timeout
 */
// eg: createAsyncComponent(import(/* webpackChunkName: 'component' */ './component.vue'))
const createAsyncComponent = (
  importComponentFn: Promise<typeof import("*.vue")>,
  loadingComponent: VueComponent = LoadingComponent,
  errorComponent: VueComponent = ErrorComponent,
  delay: number = 200,
  timeout: number = 5000
) => {
  return () => ({
    component: importComponentFn,
    loading: loadingComponent,
    error: errorComponent,
    delay: delay,
    timeout: timeout
  })
}

export {
  createAsyncComponent
}
