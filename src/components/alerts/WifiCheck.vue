<template>
    <div class="vh-100 position-fixed top-0 d-flex align-items-center nowifi" aria-hidden="false" aria-label="No Wifi Modal">
        <div v-if="showNoWifiModal" class="text-center">
            <div ref="noWifiModal" class="noWifi p-3" :visible="true" title="Oops!" aria-label="No Wifi Message">
                <p class="my-4" aria-label="No Wifi Message">You don't have wifi. All your actions will be run when there is wifi again</p>
                <button class="btn btn-danger" @click="closeModal" aria-label="Close Modal">Close</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isOnline: true,
                showNoWifiModal: false
            }
        },
        created() {
            window.addEventListener('online', this.updateIsOnline)
            window.addEventListener('offline', this.updateIsOnline)
        },
        methods: {
            // Update the isOnline data property based on the current online status
            updateIsOnline() {
                this.isOnline = navigator.onLine
                this.showNoWifiModal = !this.isOnline
            },
            // Close the no wifi modal by setting the showNoWifiModal data property to false
            closeModal() {
                this.showNoWifiModal = false;
            }
        }
    }
</script>