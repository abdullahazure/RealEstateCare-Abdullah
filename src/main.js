// Import Bootstrap CSS en JS
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

// Import Ionic CSS
import '@ionic/core/css/ionic.bundle.css'

// Import Vue en essentials
import { createApp } from 'vue'
import { IonicVue, IonIcon, IonToast } from '@ionic/vue'

import App from './App.vue'
import router from './router'
import store from './store/store.js'

// App initialiseren
const app = createApp(App)

app
  .use(IonicVue)
  .use(router)
  .use(IonToast)
  .use(store)
  .component('ion-icon', IonIcon)

app.mount('#app')

// Arrow key navigatie (optioneel)
document.addEventListener('keydown', event => {
  const formElements = document.querySelectorAll("input, select, textarea, button, a[href]")
  const currentIndex = [...formElements].findIndex(el => el === document.activeElement)

  if (event.key === 'ArrowUp' && currentIndex > 0) {
    event.preventDefault()
    formElements[currentIndex - 1].focus()
  }

  if (event.key === 'ArrowDown' && currentIndex < formElements.length - 1) {
    event.preventDefault()
    formElements[currentIndex + 1].focus()
  }
})