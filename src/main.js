import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
import { Form, Field, ErrorMessage, defineRule, configure } from 'vee-validate';
import { all } from '@vee-validate/rules';
import { localize, setLocale } from '@vee-validate/i18n';
import en from '@vee-validate/i18n/dist/locale/en.json';
import App from './App.vue'
import router from './router'
import { currency, date } from './methods/format'

const app = createApp(App)
app.config.globalProperties.$format = {
  date,
  currency
}

Object.keys(all).forEach((rule) => {
  defineRule(rule, all[rule])
})

configure({
  generateMessage: localize({ en }),
  validateOnInput: true
})

setLocale('en')

app.use(createPinia())
app.use(router)
app.provide('$axios', axios)
app.component('LoadingVue', Loading)
app.component('FormVue', Form)
app.component('FieldVue', Field)
app.component('ErrorMessage', ErrorMessage)
app.mount('#app')
