<template>
  <main class="container">
    <div class="row mt-5">
      <div class="col-sm"></div>
      <div class="col-sm">
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