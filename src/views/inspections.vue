<template>
    <main class="container">
        <router-link :to="{ name: archive }" class="btn btn-danger" aria-label="Go back">Go back</router-link>
        <h1>Inspections {{address}}</h1>
        <div class="list-group gap-3">
            <div class="list-group-item list-group-item-action d-flex justify-content-between align-items-center" v-for="inspection in inspections" :key="inspection.id">
                <!-- display the inspection id and date -->
                <div>
                    <p>Inspection ID: {{ inspection.id }}</p>
                    <p>Date: {{ inspection.date }}</p>
                    <!-- display the completion status -->
                    <div class="badge" :class="{'text-bg-success': inspection.completion, 'text-bg-danger': !inspection.completion }" aria-label="Inspection status">{{ inspection.completion ? 'Completed' : 'In progress' }}</div>
                </div>
                <!-- link to the inspection page, passing the inspection id and address id through local storage -->
                <router-link :to="{ name: 'inspection' }" @click="saveParams(inspection.id, addressId)" class="btn btn-primary" aria-label="Go to Inspection">Go to Inspection</router-link>
            </div>
        </div>
    </main>
</template>

<script>
    import axios from 'axios';
    import store from '../store/store.js'

    export default {
        name: 'Inspections',
        data() {
            return {
                inspections: [],
                addressId: '',
                address: '',
                archive: 'scheduled',
            };
        },
        methods: {
            saveParams(inspection, address) {
                store.commit("changeInspection", inspection);
                store.commit("changeAddress", address);
            }
        },
        async created() {
            this.addressId = store.getters.address;
            this.archive = (store.getters.completion) ? 'completed' : 'scheduled';

            try {
                //get the data from the api
                const response = await axios.get(`https://api.jsonbin.io/v3/b/683ff2528a456b7966a94a26`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Master-Key': '$2a$10$0f5YYc/h5v90cnRnqPCRNO9gVNlilQdyogyR7rKTPbseXPdI5Co3q'
                    }
                });

                //filter the inspections for the selected address and completion status
                let address = response.data.record.addresses.filter(address => address.id === this.addressId);
                let inspections = address[0].inspections.filter(inspection => inspection.completion === (store.getters.completion) && inspection.inspector === store.getters.userID);
                //set the filtered inspections and address to be displayed
                this.inspections = inspections;
                this.address = address[0].street + ', ' + address[0].city;
            } catch (error) {
                console.log(error);
            }
        }
    };
</script>