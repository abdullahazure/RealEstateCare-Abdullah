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

<script>
import axios from 'axios';
import store from '../store/store.js'
import inspections from '@/data/inspections.json?url'
import users from '@/data/users.json?url'

export default {
    data() {
        return {
            settings: (store.getters.user.settings != undefined) ? store.getters.user.settings : false,
            firstname: (store.getters.user.firstName != undefined) ? store.getters.user.firstName : false,
            lastname: (store.getters.user.lastName != undefined) ? store.getters.user.lastName : false,
            password: '',
            newpassword: '',
            confirmnewpassword: '',
            showToast: false,
            toastMessage: '',
            toastType: '',
            saving: false,
        };
    },
    methods: {
        async logout() {
            this.saving = true;
            const jsonInspections = await axios.get(inspections)
            const jsonUsers = await (await axios.get(users))

            if (jsonInspections.status = 200 && jsonUsers.status === 200) {
                const updateInspections = await axios.put(`https://api.jsonbin.io/v3/b/683f10408a456b7966a90cb8`, jsonInspections.data, {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Master-Key': '$2a$10$0f5YYc/h5v90cnRnqPCRNO9gVNlilQdyogyR7rKTPbseXPdI5Co3q'
                    }
                });
                const updateUsers = await axios.put(`https://api.jsonbin.io/v3/b/683f10408a456b7966a90cb8`, jsonUsers.data, {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Master-Key': '$2a$10$0f5YYc/h5v90cnRnqPCRNO9gVNlilQdyogyR7rKTPbseXPdI5Co3q'
                    }
                });
                if(updateInspections.status === 200 && updateUsers.status === 200) {
                    this.saving = false;
                    store.commit("setUser", {})
                    this.$router.go({ name: 'home' });
                } else {
                    this.saving = false;
                    store.commit("setUser", {})
                    this.$router.go({ name: 'home' });
                }
            } else {
                this.saving = false;
                store.commit("setUser", {})
                this.$router.go({ name: 'home' });
            }
        },
        async updateSettings() {
            try {
                this.saving = true;
                // Get the user ID from local storage
                const usrArr = (store.getters.user);
                if (!usrArr) {
                    this.toastType = 'success';
                    this.toastMessage = 'Not loggedin';
                    this.showToast = true;

                    setTimeout(() => {
                        this.toastType = '';
                        this.toastMessage = '';
                        this.showToast = false;
                    }, 3000);
                }

                // Send GET request to GitHub REST API to retrieve the users.json file
                const response = await axios.get(`https://api.jsonbin.io/v3/b/683f10408a456b7966a90cb8/latest`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Master-Key': '$2a$10$0f5YYc/h5v90cnRnqPCRNO9gVNlilQdyogyR7rKTPbseXPdI5Co3q'
                    }
                });

                if (response.status !== 200) {
                    this.toastType = 'error';
                    this.toastMessage = 'Couldnt retrieve user settings';
                    this.showToast = true;

                    setTimeout(() => {
                        this.toastType = '';
                        this.toastMessage = '';
                        this.showToast = false;
                    }, 3000);
                }

                // parse the response content to json
                const jsonData = response.data.record;
                // Find the user by id in the jsonData
                const userIndex = jsonData.findIndex(user => user.id === usrArr.id);

                // if the user found in the json data
                if (userIndex !== -1) {
                    // update the user settings
                    jsonData[userIndex].settings = store.getters.user.settings;

                    const updateResponse = await axios.put(`https://api.jsonbin.io/v3/b/683f10408a456b7966a90cb8`, jsonData, {
                        headers: {
                            'Content-Type': 'application/json',
                            'X-Master-Key': '$2a$10$0f5YYc/h5v90cnRnqPCRNO9gVNlilQdyogyR7rKTPbseXPdI5Co3q'
                        }
                    });
                    if(updateResponse.status === 200) {
                        this.toastType = 'success';
                        this.toastMessage = 'Settings saved successfully';
                        this.showToast = true;

                        setTimeout(() => {
                            this.toastType = '';
                            this.toastMessage = '';
                            this.showToast = false;
                        }, 3000);

                        const user = jsonData[userIndex];

                        delete user.password;

                        store.commit("setUser", user);
                    } else {
                        throw new Error(updateResponse.data);
                    }
                } else {
                    this.toastType = 'error';
                    this.toastMessage = 'User is not found in the API!';
                    this.showToast = true;

                    setTimeout(() => {
                        this.toastType = '';
                        this.toastMessage = '';
                        this.showToast = false;
                    }, 3000);
                }
            } catch(error) {
                this.toastType = 'error';
                this.toastMessage = (error.code != 'ERR_NETWORK') ? 'There has been an error occurred, contact the developer!' : 'You dont have wifi!';
                this.showToast = true;

                setTimeout(() => {
                    this.toastType = '';
                    this.toastMessage = '';
                    this.showToast = false;
                }, 3000);
            }

            this.saving = false;
        },
        async updateAccountDetails() {
            try {
                // Get the user ID from local storage
                const usrArr = store.getters.user;
                if (!usrArr) {
                    this.toastType = 'error';
                    this.toastMessage = 'No user logged in!';
                    this.showToast = true;
                    setTimeout(() => {
                        this.toastType = '';
                        this.toastMessage = '';
                        this.showToast = false;
                    }, 3000);
                    return;
                }
                this.saving = true;
                // Send GET request to jsonbin.io to retrieve the user data
                const response = await axios.get(`https://api.jsonbin.io/v3/b/683f10408a456b7966a90cb8/latest`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Master-Key': '$2a$10$0f5YYc/h5v90cnRnqPCRNO9gVNlilQdyogyR7rKTPbseXPdI5Co3q'
                    }
                });
                // parse the response content to json
                const jsonData = response.data.record;
                // Find the user by id in the jsonData
                const userIndex = jsonData.findIndex(user => user.id === usrArr.id);
                // if the user found in the json data
                if (userIndex !== -1) {
                    // update the user account details
                    // Check if the firstname field exists
                    if (this.firstname && this.firstname.length > 0) {
                        jsonData[userIndex].firstName = this.firstname;
                    }
                    // Check if the lastname field exists
                    if (this.lastname && this.lastname.length > 0) {
                        jsonData[userIndex].lastName = this.lastname;
                    }
                    // Check if the newPassword field exists
                    if (this.newpassword && this.newpassword.length > 0) {
                        //check if the newpassword and confirmnewpassword are equal
                        if(this.newpassword === this.confirmnewpassword) {
                            jsonData[userIndex].password = this.newpassword;
                        } else {
                            this.toastType = 'error';
                            this.toastMessage = 'Passwords do not match!';
                            this.showToast = true;
                            setTimeout(() => {
                                this.toastType = '';
                                this.toastMessage = '';
                                this.showToast = false;
                            }, 3000);
                            this.saving = false;
                            return;
                        }
                    }

                    // Send PUT request to update the user account details on jsonbin.io
                    const updateResponse = await axios.put(`https://api.jsonbin.io/v3/b/683f10408a456b7966a90cb8`, jsonData, {
                        headers: {
                            'Content-Type': 'application/json',
                            'X-Master-Key': '$2a$10$0f5YYc/h5v90cnRnqPCRNO9gVNlilQdyogyR7rKTPbseXPdI5Co3q'
                        }
                    });

                    if(updateResponse.status === 200) {
                        this.toastType = 'success';
                        this.toastMessage = 'Account updated successfully';
                        this.showToast = true;

                        setTimeout(() => {
                            this.toastType = '';
                            this.toastMessage = '';
                            this.showToast = false;
                        }, 3000);

                        this.newpassword, this.confirmnewpassword = '';

                        const user = jsonData[userIndex];

                        delete user.password;

                        store.commit("setUser", user);

                    } else {
                        this.toastType = 'error';
                        this.toastMessage = (response.code != 'ERR_NETWORK') ? 'There has been an error occurred, contact the developer!' : 'You dont have wifi!';
                        this.showToast = true;

                        setTimeout(() => {
                            this.toastType = '';
                            this.toastMessage = '';
                            this.showToast = false;
                        }, 3000);
                    }
                } else {
                    this.toastType = 'error';
                    this.toastMessage = 'No user has been found with that email';
                    this.showToast = true;

                    setTimeout(() => {
                        this.toastType = '';
                        this.toastMessage = '';
                        this.showToast = false;
                    }, 3000);
                }
            } catch(error) {
                this.toastType = 'error';
                this.toastMessage = (error.code != 'ERR_NETWORK') ? 'There has been an error occurred, contact the developer!' : 'You dont have wifi!';
                this.showToast = true;

                setTimeout(() => {
                    this.toastType = '';
                    this.toastMessage = '';
                    this.showToast = false;
                }, 3000);
            }

            this.saving = false;
        }
    }
}
</script>