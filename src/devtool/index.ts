import { createApp } from 'vue'
import App from './Devtool.vue'
import store from '../store'

const app = createApp(App).use(store)

app.mount('#app')
