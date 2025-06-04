<script setup>
    import { triangle, ellipse, square, settings, notificationsOutline, notificationsOffOutline } from 'ionicons/icons';
</script>

<template>
    <header class="bg-dark container-fluid">
        <div class="row">
            <div class="col bg-primary p-2 d-flex justify-content-end gap-2">
                <!-- Iconbar icons -->
                <ion-icon id="iconbar-square" :icon="square" aria-label="square icon"></ion-icon>
                <ion-icon id="iconbar-ellipse" :icon="ellipse" aria-label="ellipse icon"></ion-icon>
                <ion-icon id="iconbar-triangle" :icon="triangle" aria-label="triangle icon"></ion-icon>
            </div>
        </div>

        <div class="row text-light p-3">
            <div class="col">
                <!-- Logo image -->
                <img alt="RealEstateCare logo" class="logo" src="@/assets/realestatecare/logo/logo.svg" height="150" />
            </div>
            <div class="col d-flex justify-content-end gap-2 align-items-center">
                <nav>
                    <ul class="list-unstyled m-0">
                        <li class="d-flex gap-3">
                            <!-- Notifications and settings icons -->
                            <ion-icon v-if="notificationsEnabled" class="fs-1" id="notifications-icon" :icon="notificationsOutline" aria-label="notifications icon"></ion-icon>
                            <ion-icon v-else class="fs-1" id="notifications-off-icon" :icon="notificationsOffOutline" aria-label="notifications off icon"></ion-icon>
                            <router-link v-if="loggedIn" to="/settings" aria-label="settings"><ion-icon class="fs-1" id="settings-icon" :icon="settings"></ion-icon></router-link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </header>
</template>

<script>
    import store from '../../store/store.js'

    export default {
        data() {
            return {
                loggedIn: false,
                notificationsEnabled: false,
            }
        },
        created() {
            if (store.getters.userID) {
                this.loggedIn = true;
                this.notificationsEnabled = store.getters.userNotifications;
            }
        },
        watch: {
            '$store.getters.userNotifications': {
                handler(newValue) {
                    this.notificationsEnabled = newValue;
                },
                deep: true
            }
        },
        mounted() {
            this.$store.watch(
                (state) => (state.getters != undefined && state.getters.userNotifications != undefined) ? state.getters.userNotifications : false,
                (newValue) => {
                    this.notificationsEnabled = newValue;
                }
            );
        }
    }
</script>