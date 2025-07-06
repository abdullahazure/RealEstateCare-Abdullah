// src/store/index.js
import { createStore } from 'vuex'
import VuexPersist from 'vuex-persist'

const vuexPersist = new VuexPersist({
  key: 'vuex',
  storage: window.localStorage,
  reducer: state => ({
    user: state.user,
    completion: state.completion,
    address: state.address,
    inspection: state.inspection,
    offlineInspections: state.offlineInspections
  })
})

const store = createStore({
  state: () => ({
    user: {},
    completion: false,
    address: 0,
    inspection: 0,
    offlineInspections: []
  }),
  getters: {
    user: state => state.user,
    userID: state => state.user?.id ?? false,
    userNotifications: state => state.user?.settings?.notifications ?? false,
    completion: state => state.completion ?? false,
    address: state => state.address ?? false,
    inspection: state => state.inspection ?? false,
    offlineInspections: state => state.offlineInspections ?? false,
    darkTheme: state => state.user?.settings?.darkTheme === true
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

export default store