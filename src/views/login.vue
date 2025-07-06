<template>
  <main class="container">
    <div class="row mt-5">
      <div class="col-sm"></div>
      <div class="col-sm">
<<<<<<< Updated upstream
        <!-- login form -->
        <form @submit.prevent="loginRoute" id="login" name="login" method="post">
          <!-- Toegevoegde hinttekst onder elk invoerveld -->
<div class="mb-3">
  <label for="email" class="form-label">Email</label>
  <input
    type="email"
    class="form-control"
    id="email"
    name="email"
    v-model="email"
    aria-describedby="emailHelp"
  >
  <div id="emailHelp" class="form-text">Voer een geldig e-mailadres in.</div>
</div>

<div class="mb-3">
  <label for="password" class="form-label">Wachtwoord</label>
  <input
    type="password"
    class="form-control"
    id="password"
    name="password"
    v-model="password"
    aria-describedby="passwordHelp"
  >
  <div id="passwordHelp" class="form-text">Voer je wachtwoord in.</div>
</div>

<!-- Toast met verbeterde toegankelijkheid -->
<div v-if="showToast" class="toast-container">
  <div
    :class="['toast', 'toast-' + toastType, { show: showToast }]"
    aria-live="assertive"
    aria-atomic="true">
    {{ toastMessage }}
  </div>
</div>
  </main>
</template>

<style scoped>
input:focus,
button:focus {
  outline: 2px solid #0d6efd;
  outline-offset: 3px;
=======
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

const email = ref('')
const password = ref('')
const errorMsg = ref('')

const router = useRouter()
const store = useStore()

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

store.commit('setUser', {
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
>>>>>>> Stashed changes
}
.toast-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1050;
}
</style>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import store from '../store/store.js';

const email = ref('');
const password = ref('');
const toastMessage = ref('');
const toastType = ref('');
const showToast = ref(false);
const router = useRouter();

const showErrorToast = (message) => {
  toastType.value = 'error';
  toastMessage.value = message;
  showToast.value = true;
  setTimeout(() => (showToast.value = false), 3000);
};

const loginRoute = async () => {
  try {
    const response = await axios.get('https://api.jsonbin.io/v3/b/683f10408a456b7966a90cb8', {
      headers: {
        'X-Master-Key': '$2a$10$0f5YYc/h5v90cnRnqPCRNO9gVNlilQdyogyR7rKTPbseXPdI5Co3q'
      }
    });

    if (response.status !== 200) {
      showErrorToast('Could not verify the user');
      return;
    }

    const users = response.data.record;
    const user = users.find(u => u.email === email.value && u.password === password.value);

    if (user) {
      const { password, ...userData } = user;
      store.commit('setUser', userData);
      router.go('/');
    } else {
      showErrorToast('There is no user with those credentials found');
    }
  } catch (err) {
    console.error(err);
const message = err.code !== 'ERR_NETWORK'
  ? 'Er is iets misgegaan tijdens het inloggen. Neem contact op met de ontwikkelaar.'
  : 'Netwerkfout: controleer je internetverbinding.';

    showErrorToast(message);
  }
};
</script>