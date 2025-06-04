<template>
    <link rel="stylesheet" v-bind:href="cssBase">
    <link rel="stylesheet" v-bind:href="cssFile">
    <!-- render AppHeader component -->
    <app-header />
    <!-- render current page based on router -->
    <router-view></router-view>
    <!-- render AppFooter component -->
    <app-footer />
    <!-- render NoWifiModal component -->
    <NoWifiModal />

    <!-- Show toast message for offline inspections -->
    <div v-if="showOfflineToast" class="toast-container">
        <div v-bind:class="{'show': showOfflineToast}" :class="'toast toast-' + toastOfflineType">
            {{ toastOfflineMessage }}
        </div>
    </div>
</template>


<script>
    // import AppHeader, AppFooter and NoWifiModal components
    import AppHeader from '@/components/template/AppHeader.vue'
    import AppFooter from '@/components/template/AppFooter.vue'
    import NoWifiModal from '@/components/alerts/WifiCheck.vue'
    import store from './store/store.js'
    // Import axios library for making HTTP requests
    import axios from 'axios'

    import baseStyle from '@/assets/css/base.css?url'
    import mainStyle from '@/assets/css/main.css?url'
    import darkStyle from '@/assets/css/dark.css?url'

    export default {
        components: {
            AppHeader,
            AppFooter,
            NoWifiModal
        },
        // Save offline inspections when the component is created
        created() {
            this.saveOfflineInspections();
        },  
        // Save offline inspections when the user comes back online
        mounted() {
            window.addEventListener('online', this.saveOfflineInspections);
        },
        data() {
            return {
                // Flag to show/hide the offline toast message
                showOfflineToast: false,
                // Message to show in the toast
                toastOfflineMessage: '',
                // Type of the toast message (e.g. success, error)
                toastOfflineType: '',
            }
        },  
        methods: {
            // Function to save offline inspections to the server
            async saveOfflineInspections() {
                // Check if there are any offline inspections to save
                if (store.getters.offlineInspections && store.getters.offlineInspections.length > 0) {
                    try {
                        // Get the latest record
                        const response = await axios.get(`https://api.jsonbin.io/v3/b/63c1a09815ab31599e35cf00/latest`, {
                            headers: {
                                'Content-Type': 'application/json',
                                'X-Master-Key': '$2b$10$6OQ5plkCt1vMLN8m7VMniOP5RSMQB3WOfPoQlYh/JNbs2xeF7psUu'
                            }
                        });

                        // Update the record with the offline inspections data
                        store.getters.offlineInspections.forEach(inspection => {
                            // Check if the address and inspection indexes exist in the record
                            if (inspection.addressId === null || inspection.addressId === undefined || inspection.inspectionId === null || inspection.inspectionId === undefined) return;
                            const addressIndex = response.data.record.addresses.findIndex(address => address.id === inspection.addressId);
                            const inspectionIndex = response.data.record.addresses[addressIndex].inspections.findIndex(insp => insp.id === inspection.inspectionId);
                            if (response.data.record.addresses[addressIndex] === null || response.data.record.addresses[addressIndex] === undefined ||
                                response.data.record.addresses[addressIndex].inspections === null || response.data.record.addresses[addressIndex].inspections === undefined ||
                                response.data.record.addresses[addressIndex].inspections[inspectionIndex] === null || response.data.record.addresses[addressIndex].inspections[inspectionIndex] === undefined ) return;
                            // Update data
                            response.data.record.addresses[addressIndex].inspections[inspectionIndex].completion = inspection.completion; // Completion
                            response.data.record.addresses[addressIndex].inspections[inspectionIndex].damage = inspection.damage; // Damage(s)
                            response.data.record.addresses[addressIndex].inspections[inspectionIndex].maintenance = inspection.maintenance; // Maintenance(s)
                            response.data.record.addresses[addressIndex].inspections[inspectionIndex].installations = inspection.installations; // Installation(s)
                            response.data.record.addresses[addressIndex].inspections[inspectionIndex].modifications = inspection.modifications; // Modification(s)
                            response.data.record.addresses[addressIndex].inspections[inspectionIndex].cleanlinessScore = inspection.cleanlinessScore; // CleanlinesScore
                            response.data.record.addresses[addressIndex].inspections[inspectionIndex].somethingBroken = inspection.somethingBroken; // SomethingBroken;
                            delete inspection.addressId;
                            delete inspection.inspectionId;
                        });

                        // Update the record
                        const update = await axios.put(`https://api.jsonbin.io/v3/b/63c1a09815ab31599e35cf00`, response.data.record, {
                            headers: {
                                'Content-Type': 'application/json',
                                'X-Master-Key': '$2b$10$6OQ5plkCt1vMLN8m7VMniOP5RSMQB3WOfPoQlYh/JNbs2xeF7psUu'
                            }
                        });
                        // Show success toast message
                        this.showOfflineToast = true;
                        this.toastOfflineMessage = 'Offline inspections saved successfully';
                        this.toastOfflineType = 'success';
                        // Clear offline inspections from local storage
                        store.commit("setOfflineInspections", []);

                        setTimeout(() => {
                            this.toastType = '';
                            this.toastMessage = '';
                            this.showToast = false;
                        }, 3000);
                    } catch (error) {
                        // Show error toast message
                        this.showOfflineToast = true;
                        this.toastOfflineMessage = 'Error saving offline inspections';
                        this.toastOfflineType = 'error';

                        setTimeout(() => {
                        this.toastType = '';
                        this.toastMessage = '';
                        this.showToast = false;
                    }, 3000);
                    }
                }
            },
        },
        computed: {
            cssBase() {
                return baseStyle;
            },
            cssFile() {
                return store.getters.darkTheme ? darkStyle : mainStyle;
            }
        }
    }
</script>