import { createApp } from 'vue'
import App from './Popup.vue'
import store from '../store'

const app = createApp(App).use(store)

app.mount('#app')

enum Gender {
  Male,
  Female
}

interface Person {
  name: string,
  age: number
}

class Male implements Person {
  name: string
  age: number
  gender: Gender

  constructor(name:string, age: number) {
    this.name = name
    this.age = age
    this.gender = Gender.Male
  }
}

console.log(new Male('唐晨铭', 22))
