import { createApp } from 'vue'
import App from './Popup.vue'
import store from '../store'

const app = createApp(App).use(store)

app.mount('#app')