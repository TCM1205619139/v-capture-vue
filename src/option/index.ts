import { createApp } from 'vue'
import App from './Option.vue'
import store from '../store'

const app = createApp(App).use(store)

app.mount('#app')
