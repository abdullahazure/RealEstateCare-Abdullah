<template>
    <main class="container">
        <div class="row">
            <div class="col-2-sm"></div>
            <!-- Profile settings container -->
            <div class="col-sm">
                <h1>Profile settings</h1>
                <!-- Profile form -->
                <form v-on:submit.prevent="updateAccountDetails" id="accountdetails" name="accountdetails" method="post">
                    <div class="mb-3">
                        <label for="firstname" class="form-label" aria-label="Firstname">Firstname</label>
                        <input type="firstname" class="form-control" id="firstname" name="firstname" placeholder="Abdullah" v-model="firstname" aria-describedby="firstname-description">
                        <small id="firstname-description" class="form-text text-muted">Enter your first name</small>
                    </div>
                    <div class="mb-3">
                        <label for="lastname" class="form-label" aria-label="Lastname">Lastname</label>
                        <input type="lastname" class="form-control" id="lastname" name="lastname" placeholder="Fa" v-model="lastname" aria-describedby="lastname-description">
                        <small id="lastname-description" class="form-text text-muted">Enter your last name</small>
                    </div>
                    <div class="mb-3">
                        <label for="newpassword" class="form-label" aria-label="New password">New password</label>
                        <input type="newpassword" class="form-control" id="newpassword" name="newpassword" placeholder="&bull;&bull;&bull;&bull;&bull;&bull;" v-model="newpassword" aria-describedby="newpassword-description">
                        <small id="newpassword-description" class="form-text text-muted">Enter your new password</small>
                    </div>
                    <div class="mb-3">
                        <label for="newpassword" class="form-label" aria-label="Confirm new password">Confirm new password</label>
                        <input type="newpassword" class="form-control" id="newpassword" name="newpassword" placeholder="&bull;&bull;&bull;&bull;&bull;&bull;" v-model="confirmnewpassword" aria-describedby="confirmnewpassword-description">
                        <small id="confirmnewpassword-description" class="form-text text-muted">Confirm your new password</small>
                    </div>
                    <div>
                        <input :disabled="saving" type="submit" value="Change account" class="btn btn-primary" aria-label="Change account">
                    </div>
                </form>

            </div>
            <div class="col-2-sm"></div>
        </div>
        <hr>
        <div class="row">
            <div class="col-2-sm"></div>
            <!-- Application settings for user container -->
            <div class="col-sm">
                <h1>Application settings</h1>
                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" role="switch" id="darkModeSwitch" v-model="settings.darkTheme" aria-label="Dark mode switch">
                    <label class="form-check-label" for="darkModeSwitch">Dark modus</label>
                </div>
                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" role="switch" id="notificationsSwitch" v-model="settings.notifications" aria-label="Notifications switch">
                    <label class="form-check-label" for="notificationsSwitch">Notifications</label>
                </div>
                <div class="form-check form-switch mb-3">
                    <input class="form-check-input" type="checkbox" role="switch" id="soundSwitch" v-model="settings.sounds" aria-label="Sound switch">
                    <label class="form-check-label" for="soundSwitch">Sounds</label>
                </div>
                <!-- Update application settings for user -->
                <button :disabled="saving" class="btn btn-primary" @click="updateSettings()" aria-label="Save changes">Save changes</button>
            </div>
            <div class="col-2-sm"></div>
        </div>
        <button class="btn btn-danger mt-3" :disabled="saving" @click="logout()" aria-label="Logout">Logout</button>

        <div v-if="showToast" class="toast-container">
            <div v-bind:class="{'show': showToast}" :class="'toast toast-' + toastType">
                {{ toastMessage }}
            </div>
        </div>
    </main>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import store from '../store/store.js';
import inspections from '@/data/inspections.json?url';
import users from '@/data/users.json?url';

const router = useRouter();
const user = store.getters.user;

const settings = ref(user.settings ?? false);
const firstname = ref(user.firstName ?? '');
const lastname = ref(user.lastName ?? '');
const password = ref('');
const newpassword = ref('');
const confirmnewpassword = ref('');

const showToast = ref(false);
const toastMessage = ref('');
const toastType = ref('');
const saving = ref(false);

const showToastMessage = (type, message) => {
  toastType.value = type;
  toastMessage.value = message;
  showToast.value = true;
  setTimeout(() => {
    showToast.value = false;
    toastType.value = '';
    toastMessage.value = '';
  }, 3000);
};

const logout = async () => {
  saving.value = true;
  try {
    const [jsonInspections, jsonUsers] = await Promise.all([
      axios.get(inspections),
      axios.get(users),
    ]);

    const headers = {
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': '$2a$10$0f5YYc/h5v90cnRnqPCRNO9gVNlilQdyogyR7rKTPbseXPdI5Co3q',
      },
    };

    await Promise.all([
      axios.put('https://api.jsonbin.io/v3/b/683f10408a456b7966a90cb8', jsonInspections.data, headers),
      axios.put('https://api.jsonbin.io/v3/b/683f10408a456b7966a90cb8', jsonUsers.data, headers),
    ]);
  } catch (err) {
    console.error(err);
  } finally {
    store.commit('setUser', {});
    router.go({ name: 'home' });
    saving.value = false;
  }
};

const updateSettings = async () => {
  saving.value = true;
  try {
    const response = await axios.get('https://api.jsonbin.io/v3/b/683f10408a456b7966a90cb8/latest', {
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': '$2a$10$0f5YYc/h5v90cnRnqPCRNO9gVNlilQdyogyR7rKTPbseXPdI5Co3q',
      },
    });

    const jsonData = response.data.record;
    const idx = jsonData.findIndex((u) => u.id === user.id);
    if (idx === -1) {
      showToastMessage('error', 'User is not found in the API!');
      saving.value = false;
      return;
    }

    jsonData[idx].settings = settings.value;

    const update = await axios.put('https://api.jsonbin.io/v3/b/683f10408a456b7966a90cb8', jsonData, {
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': '$2a$10$0f5YYc/h5v90cnRnqPCRNO9gVNlilQdyogyR7rKTPbseXPdI5Co3q',
      },
    });

    if (update.status === 200) {
      const updatedUser = { ...jsonData[idx] };
      delete updatedUser.password;
      store.commit('setUser', updatedUser);
      showToastMessage('success', 'Settings saved successfully');
    } else {
      throw new Error('Failed to update user');
    }
  } catch (err) {
    console.error(err);
    const msg = err.code !== 'ERR_NETWORK'
      ? 'There has been an error occurred, contact the developer!'
      : 'You don’t have wifi!';
    showToastMessage('error', msg);
  } finally {
    saving.value = false;
  }
};

const updateAccountDetails = async () => {
  saving.value = true;
  try {
    if (!user) {
      showToastMessage('error', 'No user logged in!');
      saving.value = false;
      return;
    }

    const response = await axios.get('https://api.jsonbin.io/v3/b/683f10408a456b7966a90cb8/latest', {
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': '$2a$10$0f5YYc/h5v90cnRnqPCRNO9gVNlilQdyogyR7rKTPbseXPdI5Co3q',
      },
    });

    const jsonData = response.data.record;
    const idx = jsonData.findIndex((u) => u.id === user.id);
    if (idx === -1) {
      showToastMessage('error', 'User not found!');
      saving.value = false;
      return;
    }

    if (firstname.value) jsonData[idx].firstName = firstname.value;
    if (lastname.value) jsonData[idx].lastName = lastname.value;

    if (newpassword.value) {
      if (newpassword.value === confirmnewpassword.value) {
        jsonData[idx].password = newpassword.value;
      } else {
        showToastMessage('error', 'Passwords do not match!');
        saving.value = false;
        return;
      }
    }

    const update = await axios.put('https://api.jsonbin.io/v3/b/683f10408a456b7966a90cb8', jsonData, {
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': '$2a$10$0f5YYc/h5v90cnRnqPCRNO9gVNlilQdyogyR7rKTPbseXPdI5Co3q',
      },
    });

    if (update.status === 200) {
      const updatedUser = { ...jsonData[idx] };
      delete updatedUser.password;
      store.commit('setUser', updatedUser);
      newpassword.value = '';
      confirmnewpassword.value = '';
      showToastMessage('success', 'Account updated successfully');
    } else {
      showToastMessage('error', 'Failed to update user');
    }
  } catch (err) {
    const msg = err.code !== 'ERR_NETWORK'
      ? 'There has been an error occurred, contact the developer!'
      : 'You don’t have wifi!';
    showToastMessage('error', msg);
  } finally {
    saving.value = false;
  }
};
</script>