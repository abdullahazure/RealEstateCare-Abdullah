<template>
  <main class="container">
    <div class="row mt-5">
      <div class="col-sm"></div>
      <div class="col-sm">
        <form @submit.prevent="loginFirebase" id="login" name="login">
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input
              v-model="email"
              type="email"
              class="form-control"
              id="email"
              name="email"
              placeholder="abdullahfa@realestatecare.com"
              required
            />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Wachtwoord</label>
            <input
              v-model="password"
              type="password"
              class="form-control"
              id="password"
              name="password"
              placeholder="******"
              required
            />
          </div>
          <button type="submit" class="btn btn-primary">Login</button>
        </form>

        <p v-if="errorMsg" class="text-danger mt-3">{{ errorMsg }}</p>
      </div>
      <div class="col-sm"></div>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase.js'
import axios from 'axios'
import store from '../store/store.js'

const email = ref('')
const password = ref('')
const errorMsg = ref('')
const toastMessage = ref('')
const toastType = ref('')
const showToast = ref(false)

const router = useRouter()
const vuexStore = useStore()

// Firebase login
async function loginFirebase() {
  if (!email.value || !password.value) {
    errorMsg.value = 'Vul je e-mailadres en wachtwoord in.'
    return
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email.value.trim(), password.value.trim())
    const user = userCredential.user

    const userMap = {
      'abdullahfa@realestatecare.com': 2,
      'loi@realestatecare.com': 1
    }

    const mappedUserID = userMap[user.email]
    if (!mappedUserID) {
      errorMsg.value = 'Gebruiker niet gekoppeld aan inspectiedata'
      return
    }

    vuexStore.commit('setUser', {
      id: mappedUserID,
      email: user.email,
      name: user.displayName ?? 'Gebruiker',
      settings: {
        darkTheme: false, // of true
        notifications: true // of false
      }
    })

    router.push({ name: 'home' })
  } catch (err) {
    console.error('Fout bij inloggen:', err.code || err.message)
    errorMsg.value = 'Inloggen mislukt — controleer je gegevens'
  }
}

const showErrorToast = (message) => {
  toastType.value = 'error'
  toastMessage.value = message
  showToast.value = true
  setTimeout(() => (showToast.value = false), 3000)
}

const loginRoute = async () => {
  try {
    const response = await axios.get('https://api.jsonbin.io/v3/b/683f10408a456b7966a90cb8', {
      headers: {
        'X-Master-Key': '$2a$10$0f5YYc/h5v90cnRnqPCRNO9gVNlilQdyogyR7rKTPbseXPdI5Co3q'
      }
    })

    if (response.status !== 200) {
      showErrorToast('Could not verify the user')
      return
    }

    const users = response.data.record
    const user = users.find(u => u.email === email.value && u.password === password.value)

    if (user) {
      const { password, ...userData } = user
      vuexStore.commit('setUser', userData)
      router.go('/')
    } else {
      showErrorToast('There is no user with those credentials found')
    }
  } catch (err) {
    console.error(err)
    const message = err.code !== 'ERR_NETWORK'
      ? 'Er is iets misgegaan tijdens het inloggen. Neem contact op met de ontwikkelaar.'
      : 'Netwerkfout: controleer je internetverbinding.'

    showErrorToast(message)
  }
}
</script>