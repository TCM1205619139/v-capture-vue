import { createApp } from 'vue'
import App from './Option.vue'
import store from '../store'

import {
  ElInput
} from 'element-plus'

const app = createApp(App).use(store)

app.use(ElInput)
app.mount('#app')
