<script setup>
    // import the build, search, and alertCircle icons from the ionicons library
    import { build, search, alertCircle } from 'ionicons/icons';
</script>
<template>
    <footer class="container-fluid bg-primary position-fixed bottom-0" role="navigation" aria-label="footer navigatie">
        <div class="row p-2">
            <div class="col d-flex flex-column justify-content-center text-center">
                <!-- if the user is logged in, display a router link to the homepage that when clicked, shows the active task -->
                <router-link v-if="loggedIn" to="/" aria-label="Active task" aria-labelledby="footer-build-icon" class="d-flex flex-column align-items-center justify-content-center">
                    <ion-icon class="fs-1 m-auto" id="footer-build-icon" :icon="build"></ion-icon>
                    <span>Active task</span>
                </router-link>
            </div>
            <div class="col d-flex flex-column justify-content-center text-center">
                <!-- if the user is logged in, display a router link to the search page -->
                <router-link v-if="loggedIn" to="/search" aria-label="Search" aria-labelledby="footer-search-icon" class="d-flex flex-column align-items-center justify-content-center">
                    <ion-icon class="fs-1 m-auto" id="footer-search-icon" :icon="search"></ion-icon>
                    <span>Search</span>
                </router-link>
            </div>
            <div class="col d-flex flex-column justify-content-center text-center">
                <!-- if the user is logged in, display a router link to the help page -->
                <router-link v-if="loggedIn" to="/help" aria-label="Help" aria-labelledby="footer-alertCircle-icon" class="d-flex flex-column align-items-center justify-content-center">
                    <ion-icon class="fs-1 m-auto" id="footer-alertCircle-icon" :icon="alertCircle"></ion-icon>
                    <span>Help</span>
                </router-link>
            </div>
        </div>
    </footer>
</template>

<script>
    import store from '../../store/store.js'

    export default {
        data() {
            return {
                loggedIn: false,
            }
        },
        created(){
            if (store.getters.userID) {
                this.loggedIn = true;
            }
        },
        watch: {
            '$store.getters.userID': {
                handler(newValue) {
                    this.loggedIn = newValue;
                },
                deep: true
            }
        },
        mounted() {
            this.$store.watch(
                (state) => (state.getters != undefined && state.getters.userID != undefined) ? state.getters.userID : false,
                (newValue) => {
                    this.loggedIn = newValue;
                }
            );
        }
    }
</script>