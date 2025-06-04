// Import Bootstrap CSS and JS
import "bootstrap/dist/css/bootstrap.min.css"
import 'bootstrap/dist/js/bootstrap.min.js'
import "bootstrap"

// Import Ionic CSS
import "@ionic/core/css/ionic.bundle.css"

// Import Ionic Vue, IonIcon and IonToast
import { IonicVue, IonIcon, IonToast } from '@ionic/vue';

// Import createApp function from Vue
import { createApp } from 'vue'

// Import store
import store from './store/store.js'

// Import App.vue and router
import App from './App.vue'
import router from './router'

// Create the Vue app
const app = createApp(App);

// Use Ionic Vue, router, IonIcon and IonToast
app.use(IonicVue).use(router).use(IonIcon).component('ion-icon', IonIcon, {silent: true}).use(IonToast).use(store);

// Mount the app to the element with id "app"
app.mount('#app');

router.beforeEach((to, from, next) => {
    // check if the user is not trying to access the login page and if the user is not logged in
    if (to.name != 'login' && Object.keys(store.getters.user).length < 1) {
        // redirect the user to the login page
        next({ name: 'login' })
    } else {
        // check if the user is trying to access the login page and if the user is already logged in
        if (to.name === 'login' && Object.keys(store.getters.user).length > 0 && store.getters.user.id != null && store.getters.user.id != undefined) {
            // redirect the user to the home page
            next({name: 'home'});
        } else {
            // continue to the next route
            next();
        }
    }
})

document.addEventListener("keydown", event => {
    // Select all form elements
    const formElements = document.querySelectorAll("input, select, textarea, button, a[href]");
    let currentIndex = 0;

    // Find index of focused
    for (let i = 0; i < formElements.length; i++) {
        if (document.activeElement === formElements[i]) {
            currentIndex = i;
            break;
        }
    }

    // Watch which key is pressed
    switch(event.key) {
        case "ArrowUp":
            // Prevent the default behavior of the arrow key (scrolling the page)
            event.preventDefault();
            if (currentIndex > 0) {
                // Move focus to the previous form element
                formElements[currentIndex - 1].focus();
            }
            break;
        case "ArrowDown":
            // Prevent the default behavior of the arrow key (scrolling the page)
            event.preventDefault();
            if (currentIndex < formElements.length - 1) {
                // Move focus to the next form element
                formElements[currentIndex + 1].focus();
            }
            break;
    }
})