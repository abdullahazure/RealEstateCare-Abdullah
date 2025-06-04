<template>
    <main class="container">
        <!-- Render a search input that allows user to filter addresses -->
        <input type="text" v-model="searchTerm" @input="filterAddresses" placeholder="Search for address or city" class="form-control mb-3" aria-label="Search for addresses or city" aria-describedby="search-input">
        <div class="list-group gap-3">
            <!-- Display each filtered address in a list-group-item element -->
            <div class="list-group-item list-group-item-action d-flex flex-column justify-content-between align-items-center" v-for="address in filteredAddresses" :key="address.id">
                <div>
                    <p>Address: {{ address.street }}, {{ address.city }}</p>
                </div>
                <!-- Add a button that takes the user to a different route and saves the selected address id to local storage -->
                <router-link :to="{ name: 'inspections' }" @click="saveParamsToLocalStorage(address.id)" class="btn btn-primary" aria-label="View inspections">View Inspections</router-link>
            </div>
        </div>
    </main>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Search',
    data() {
        return {
            // Data property to store all addresses
            addresses: [],
            // Data property to store search term
            searchTerm: '',
            // Data property to store filtered addresses
            filteredAddresses: [],
        };
    },
    methods: {
        // Method to filter addresses based on search term
        async filterAddresses() {
            this.filteredAddresses = this.addresses.filter(address => {
                return (
                    // Check if address street or city includes search term
                    address.street.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                    address.city.toLowerCase().includes(this.searchTerm.toLowerCase())
                );
            });
        },
        // Method to save selected address id to local storage
        saveParamsToLocalStorage(addressId) {
            localStorage.setItem('addressId', addressId);
        },
    },
    // Lifecycle hook to fetch addresses from API when component is created
    async created() {
        try {
            const response = await axios.get(`https://api.jsonbin.io/v3/b/683ff2528a456b7966a94a26`, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-Master-Key': '$2a$10$0f5YYc/h5v90cnRnqPCRNO9gVNlilQdyogyR7rKTPbseXPdI5Co3q'
                }
            });
            this.addresses = response.data.record.addresses;
            this.filteredAddresses = this.addresses;
        } catch (error) {
            console.log(error);
        }
    },
    // Lifecycle hook to initially filter addresses on page load
    mounted() {
        this.filterAddresses();
    },
    watch: {
        // Watch the search input change if change the do filterAddresses
        searchTerm: function (newVal) {
            this.filterAddresses();
        }
    }
};
</script>