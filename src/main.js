import { createApp } from 'vue'
import App from './App.vue'
import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

createApp(App).use(Quasar, quasarUserOptions).use(Toast).mount('#app')
