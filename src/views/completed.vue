<template>
    <main class="container" aria-label="Address List">
        <router-link :to="{ name: 'home' }" class="btn btn-danger" aria-label="Go Back">Go back</router-link>
        <h1 aria-label="Address List">Address List</h1>
        <div class="list-group">
            <a href="#" v-for="address in addresses" :key="address.id" class="list-group-item list-group-item-action d-flex flex-column justify-content-between align-items-center" :aria-current="address.id === selectedAddressId ? 'page' : undefined" tabindex="0" @focus="selectedAddressId = address.id" @click="viewInspections(address.id, true)" aria-label="Address">
                {{ address.street }}, {{ address.city }}
                <button class="btn btn-primary" @click="viewInspections(address.id, true)" aria-label="View Inspections">View Inspections</button>
            </a>
        </div>
    </main>
</template>

<script>
    import axios from 'axios';
    import store from '../store/store.js'

    export default {
        name: "AddressList",
        data() {
            return {
                addresses: []
        };
    },
    // Create function, which will be called when component is created
    async created() {
        // Store completion status in local storage
        store.commit('toggleCompletion', true);

        try {
            // Make a GET request to the specified API endpoint
            const response = await axios.get(`https://api.jsonbin.io/v3/b/683ff2528a456b7966a94a26`, {
                headers: {
                'Content-Type': 'application/json',
                'X-Master-Key': '$2a$10$0f5YYc/h5v90cnRnqPCRNO9gVNlilQdyogyR7rKTPbseXPdI5Co3q'
                }
            });

            // Assign addresses to the component's data
            this.addresses = response.data.record.addresses;

            // Iterate through addresses and remove those that do not have inspections by the current user and with the current completion status
            for (let i = 0; i < response.data.record.addresses.length; i++) {
                let address = response.data.record.addresses[i];
                if (address.inspections === null || address.inspections === undefined) continue;

                let found = false;
                for (let j = 0; j < address.inspections.length; j++) {
                    let inspection = address.inspections[j];
                    if (inspection.inspector === store.getters.userID && inspection.completion === store.getters.completion) {
                        found = true;
                        break;
                    }
                }

                if (!found) {
                    response.data.record.addresses.splice(i, 1);
                    i--;
                }
            }
        } catch (error) {
            console.log(error);
        }
    },
    methods: {
        async viewInspections(id, completion) {
            try {
                // Save the address id to local storage so it can be accessed in the inspections view
                store.commit("changeAddress", id)
                // Save the completion status to local storage so it can be accessed in the inspections view
                store.commit("toggleCompletion", completion)
                // Navigate to the inspections view
                this.$router.push({ name: 'inspections'});
            } catch (error) {
                console.log(error);
            }
        }
    }
};
</script>