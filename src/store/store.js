<<<<<<< Updated upstream
// src/store/index.js
=======
>>>>>>> Stashed changes
import { createStore } from 'vuex'
import VuexPersist from 'vuex-persist'

const vuexPersist = new VuexPersist({
  key: 'vuex',
  storage: window.localStorage,
<<<<<<< Updated upstream
  reducer: state => ({
=======
  reducer: state => ({ 
>>>>>>> Stashed changes
    user: state.user,
    completion: state.completion,
    address: state.address,
    inspection: state.inspection,
    offlineInspections: state.offlineInspections
  })
})

const store = createStore({
<<<<<<< Updated upstream
  state: () => ({
=======
  state: {
>>>>>>> Stashed changes
    user: {},
    completion: false,
    address: 0,
    inspection: 0,
    offlineInspections: []
<<<<<<< Updated upstream
  }),
  getters: {
    user: state => state.user,
    userID: state => state.user?.id ?? false,
=======
  },
  getters: {
    user: state => state.user,
    userID: state => state.user?.id || false,
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
export default store
=======
export default store
>>>>>>> Stashed changes
