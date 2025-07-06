<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useStore } from 'vuex';

import inspections from '@/data/inspections.json?url';
import users from '@/data/users.json?url';

const router = useRouter();
const store = useStore();

// Reactieve data
const settings = ref(store.getters.user.settings !== undefined ? store.getters.user.settings : {});
const firstname = ref(store.getters.user.firstName ?? '');
const lastname = ref(store.getters.user.lastName ?? '');
const newpassword = ref('');
const confirmnewpassword = ref('');
const showToast = ref(false);
const toastMessage = ref('');
const toastType = ref('');
const saving = ref(false);

// Toast helper
function showToastMsg(type, message) {
  toastType.value = type;
  toastMessage.value = message;
  showToast.value = true;
  setTimeout(() => {
    showToast.value = false;
    toastType.value = '';
    toastMessage.value = '';
  }, 3000);
}

// Uitloggen
async function logout() {
  saving.value = true;
  try {
    const [inspectionsRes, usersRes] = await Promise.all([
      axios.get(inspections),
      axios.get(users)
    ]);

    if (inspectionsRes.status === 200 && usersRes.status === 200) {
      await Promise.all([
        axios.put('https://api.jsonbin.io/v3/b/683f10408a456b7966a90cb8', inspectionsRes.data, {
          headers: {
            'Content-Type': 'application/json',
            'X-Master-Key': '$2a$10$0f5YYc/h5v90cnRnqPCRNO9gVNlilQdyogyR7rKTPbseXPdI5Co3q'
          }
        }),
        axios.put('https://api.jsonbin.io/v3/b/683f10408a456b7966a90cb8', usersRes.data, {
          headers: {
            'Content-Type': 'application/json',
            'X-Master-Key': '$2a$10$0f5YYc/h5v90cnRnqPCRNO9gVNlilQdyogyR7rKTPbseXPdI5Co3q'
          }
        })
      ]);
    }
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    saving.value = false;
    store.commit('setUser', {});
    router.go({ name: 'home' });
  }
}

// Instellingen opslaan
async function updateSettings() {
  saving.value = true;
  const user = store.getters.user;
  if (!user) {
    showToastMsg('error', 'Niet ingelogd');
    saving.value = false;
    return;
  }

  try {
    const response = await axios.get('https://api.jsonbin.io/v3/b/683f10408a456b7966a90cb8/latest', {
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': '$2a$10$0f5YYc/h5v90cnRnqPCRNO9gVNlilQdyogyR7rKTPbseXPdI5Co3q'
      }
    });

    const jsonData = response.data.record;
    const userIndex = jsonData.findIndex(u => u.id === user.id);
    if (userIndex === -1) {
      showToastMsg('error', 'Gebruiker niet gevonden');
      saving.value = false;
      return;
    }

    jsonData[userIndex].settings = settings.value;

    const update = await axios.put('https://api.jsonbin.io/v3/b/683f10408a456b7966a90cb8', jsonData, {
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': '$2a$10$0f5YYc/h5v90cnRnqPCRNO9gVNlilQdyogyR7rKTPbseXPdI5Co3q'
      }
    });

    if (update.status === 200) {
      const updatedUser = { ...jsonData[userIndex] };
      delete updatedUser.password;
      store.commit('setUser', updatedUser);
      showToastMsg('success', 'Instellingen opgeslagen');
    }

  } catch (err) {
    console.error(err);
    showToastMsg('error', 'Opslaan mislukt');
  }

  saving.value = false;
}

// Accountgegevens opslaan
async function updateAccountDetails() {
  const user = store.getters.user;
  if (!user) {
    showToastMsg('error', 'Geen gebruiker ingelogd');
    return;
  }

  saving.value = true;

  try {
    const response = await axios.get('https://api.jsonbin.io/v3/b/683f10408a456b7966a90cb8/latest', {
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': '$2a$10$0f5YYc/h5v90cnRnqPCRNO9gVNlilQdyogyR7rKTPbseXPdI5Co3q'
      }
    });

    const jsonData = response.data.record;
    const userIndex = jsonData.findIndex(u => u.id === user.id);
    if (userIndex === -1) {
      showToastMsg('error', 'Gebruiker niet gevonden');
      saving.value = false;
      return;
    }

    if (firstname.value) jsonData[userIndex].firstName = firstname.value;
    if (lastname.value) jsonData[userIndex].lastName = lastname.value;

    if (newpassword.value) {
      if (newpassword.value === confirmnewpassword.value) {
        jsonData[userIndex].password = newpassword.value;
      } else {
        showToastMsg('error', 'Wachtwoorden komen niet overeen');
        saving.value = false;
        return;
      }
    }

    const update = await axios.put('https://api.jsonbin.io/v3/b/683f10408a456b7966a90cb8', jsonData, {
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': '$2a$10$0f5YYc/h5v90cnRnqPCRNO9gVNlilQdyogyR7rKTPbseXPdI5Co3q'
      }
    });

    if (update.status === 200) {
      const updatedUser = { ...jsonData[userIndex] };
      delete updatedUser.password;
      store.commit('setUser', updatedUser);
      newpassword.value = '';
      confirmnewpassword.value = '';
      showToastMsg('success', 'Account bijgewerkt');
    }

  } catch (err) {
    console.error(err);
    showToastMsg('error', 'Bijwerken mislukt');
  }

  saving.value = false;
}
</script>

<template>
  <main class="container">
    <div class="row">
      <div class="col-sm offset-sm-2">
<div class="text-start mb-3">
        <router-link :to="{ name: 'home' }" class="btn btn-danger" aria-label="Go back">
          Go back
        </router-link>
</div>
        <h1>Profile settings</h1>
        <form @submit.prevent="updateAccountDetails">
          <div class="mb-3">
            <label for="firstname" class="form-label">Firstname</label>
            <input type="text" class="form-control" id="firstname" placeholder="Abdullah" v-model="firstname" />
          </div>

          <div class="mb-3">
            <label for="lastname" class="form-label">Lastname</label>
            <input type="text" class="form-control" id="lastname" placeholder="fa" v-model="lastname" />
          </div>

          <div class="mb-3">
            <label for="newpassword" class="form-label">New password</label>
            <input type="password" class="form-control" id="newpassword" placeholder="******" v-model="newpassword" />
          </div>

          <div class="mb-3">
            <label for="confirmnewpassword" class="form-label">Confirm new password</label>
            <input type="password" class="form-control" id="confirmnewpassword" placeholder="******" v-model="confirmnewpassword" />
          </div>

          <input :disabled="saving" type="submit" class="btn btn-primary" value="Change account" />
        </form>
      </div>
    </div>

    <hr />

    <!-- APPLICATIE INSTELLINGEN -->
    <div class="row">
      <div class="col-sm offset-sm-2">
        <h1>Application settings</h1>

        <div class="form-check form-switch">
          <input type="checkbox" class="form-check-input" id="darkModeSwitch" v-model="settings.darkTheme" />
          <label class="form-check-label" for="darkModeSwitch">Dark mode</label>
        </div>

        <div class="form-check form-switch">
          <input type="checkbox" class="form-check-input" id="notificationsSwitch" v-model="settings.notifications" />
          <label class="form-check-label" for="notificationsSwitch">Notifications</label>
        </div>

        <div class="form-check form-switch mb-3">
          <input type="checkbox" class="form-check-input" id="soundSwitch" v-model="settings.sounds" />
          <label class="form-check-label" for="soundSwitch">Sounds</label>
        </div>

        <button :disabled="saving" class="btn btn-primary" @click="updateSettings">Save changes</button>
      </div>
    </div>

    <!-- UITLOGGEN -->
    <div class="row">
      <div class="col-sm offset-sm-2">
        <button class="btn btn-danger mt-3" :disabled="saving" @click="logout">Logout</button>
      </div>
    </div>

    <!-- TOAST -->
    <div v-if="showToast" class="toast-container position-fixed bottom-0 end-0 p-3">
      <div class="toast show" :class="'toast-' + toastType" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-body">
          {{ toastMessage }}
        </div>
      </div>
    </div>
  </main>
</template>

