import { createApp } from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'

const vuexPersist = new VuexPersist({
  key: 'vuex', // The key to store the state on in the storage provider.
  storage: window.localStorage, // or sessionStorage or whatever storage you are using.
  // Function that passes the state and returns the state with only the objects you want to store.
  reducer: state => ({ 
    user: state.user,
    completion: state.completion,
    address: state.address,
    inspection: state.inspection,
    offlineInspections: state.offlineInspections
  })
})

import App from '@/App.vue'

const app = createApp(App);
app.use(Vuex)

export default new Vuex.Store({
  state: {
      user: {},
      completion: false,
      address: 0,
      inspection: 0,
      offlineInspections: []
  },
  getters: {
      user: state => state.user,
      userID: state => (state.user != undefined && state.user != null && state.user.id != undefined && state.user.id != null) ? state.user.id : false,
      userNotifications: state => (state.user.settings != undefined && state.user.settings.notifications != undefined) ? state.user.settings.notifications : false,
      completion: state => (state.completion != undefined && state.completion != null) ? state.completion : false,
      address: state => (state.address != undefined && state.address != null) ? state.address : false,
      inspection: state => (state.inspection != undefined && state.inspection != null) ? state.inspection : false,
      offlineInspections: state=> (state.offlineInspections != undefined && state.offlineInspections != null) ? state.offlineInspections : false,
      darkTheme: state => (state.user.settings != undefined && state.user.settings.darkTheme != undefined && state.user.settings.darkTheme === true) ? true : false,
  },
  mutations: {
      setUser(state, newUser) {
          state.user = newUser
      },
      toggleCompletion(state, value) {
          state.completion = value
      },
      changeAddress(state, newAddress) {
          state.address = newAddress
      },
      changeInspection(state, newInspection) {
          state.inspection = newInspection
      },
      setOfflineInspections(state, newOfflineInspections) {
        state.offlineInspections = newOfflineInspections
      }
  },
  plugins: [vuexPersist.plugin]
})
