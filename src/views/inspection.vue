<template>
    <main class="container">
        <!-- button to go back to inspection list -->
        <button type="button" class="btn btn-danger" @click="cancelInspection()" aria-label="Back to inspections">Back to inspections</button> 
        <form v-if="typeof this.inspection !== 'undefined' && this.inspection.id !== ''" @submit.prevent="saveInspection" aria-label="Form to edit inspection">
            <h1>Inspection {{ inspection.id }}</h1>
            <div class="form-group">
                <label for="cleanlinessScore" aria-label="Cleanliness Score">Cleanliness Score</label>
                <select v-model="inspection.cleanlinessScore" class="form-select" id="cleanlinessScore" aria-label="Cleanliness score dropdown">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>
            </div>
            <!-- Damage section -->
            <div class="form-group my-3 py-3">
                <h2>
                    <!-- Toggle button to show/hide the damage section -->
                    <button type="button" class="btn btn-secondary" @click="showDamage = !showDamage" aria-label="Toggle damage section">
                        <ion-icon v-if="!showDamage" class="m-auto" id="navigation-caretDownOutline-icon" :icon="caretDownOutline"></ion-icon>
                        <ion-icon v-if="showDamage" class="m-auto" id="navigation-caretUpOutline-icon" :icon="caretUpOutline"></ion-icon>
                    </button>
                    <span class="ms-3">Damage</span>
                </h2>
                <!-- Button to add a new damage item -->
                <div class="d-flex justify-content-between">
                    <button type="button" class="btn btn-primary" @click="addDamage" aria-label="Add new damage item">Add Damage</button>
                </div>
                <!-- Transition to show/hide the damage items -->
                <transition name="fade">
                    <div v-if="showDamage" class="d-flex gap-3 flex-column mt-3">
                        <!-- Component to display and edit a damage item -->
                        <damage-component v-for="(damage, index) in inspection.damage" :key="index" :damage="damage" @destroy="removeDamage(index)" aria-label="Damage item"></damage-component>
                    </div>
                </transition>
            </div>

            <!-- Maintenance section -->
            <div class="form-group my-3 py-3">
                <h2>
                    <!-- Toggle button to show/hide the maintenance section -->
                    <button type="button" class="btn btn-secondary" @click="showMaintenance = !showMaintenance" aria-label="Toggle maintenance section">
                        <ion-icon v-if="!showMaintenance" class="m-auto" id="navigation-caretDownOutline-icon" :icon="caretDownOutline"></ion-icon>
                        <ion-icon v-if="showMaintenance" class="m-auto" id="navigation-caretUpOutline-icon" :icon="caretUpOutline"></ion-icon>
                    </button>
                    <span class="ms-3">Maintenance</span>
                </h2>
                <!-- button to add a new maintenance item -->
                <div class="d-flex justify-content-between">
                    <button type="button" class="btn btn-primary" @click="addMaintenance" aria-label="Add new maintenance item">Add Maintenance</button>
                </div>
                <!-- Transition to show/hide the maintenance items -->
                <transition name="fade">
                    <div v-if="showMaintenance" class="d-flex gap-3 flex-column mt-3">
                        <!-- Component to display and edit a maintenance item -->
                        <maintenance-component v-for="(maintenance, index) in inspection.maintenance" :key="index" :maintenance="maintenance" @destroy="removeMaintenace(index)" aria-label="Maintenance item"></maintenance-component>
                    </div>
                </transition>
            </div>
            <!-- Installation section -->
            <div class="form-group my-3 py-3">
                <h2>
                    <!-- Toggle button to show/hide the installation section -->
                    <button type="button" class="btn btn-secondary" @click="showInstallation = !showInstallation" aria-label="Toggle Installation section">
                        <ion-icon v-if="!showInstallation" class="m-auto" id="navigation-caretDownOutline-icon" :icon="caretDownOutline"></ion-icon>
                        <ion-icon v-if="showInstallation" class="m-auto" id="navigation-caretUpOutline-icon" :icon="caretUpOutline"></ion-icon>
                    </button>
                    <span class="ms-3">Installations</span>
                </h2>

                <!-- button to add a new installation item -->
                <div class="d-flex justify-content-between">
                    <button type="button" class="btn btn-primary" @click="addInstallation" aria-label="Add Installation">Add Installation</button>
                </div>
                <!-- Transition to show/hide the installation items -->
                <transition name="fade">
                    <div v-if="showInstallation" class="d-flex gap-3 flex-column mt-3">
                        <!-- Component to display and edit a installation item -->
                        <installation-component v-for="(installation, index) in inspection.installation" :key="index" :installation="installation" @destroy="removeInstallation(index)" aria-label="Installation Component"></installation-component>
                    </div>
                </transition>
            </div>
            <!-- Modifications section -->
            <div class="form-group my-3 py-3">
                <h2>
                    <!-- Toggle button to show/hide the modifications section -->
                    <button type="button" class="btn btn-secondary" @click="showModification = !showModification" aria-label="Toggle modifications section">
                        <ion-icon v-if="!showModification" class="m-auto" id="navigation-caretDownOutline-icon" :icon="caretDownOutline" aria-hidden="true"></ion-icon>
                        <ion-icon v-if="showModification" class="m-auto" id="navigation-caretUpOutline-icon" :icon="caretUpOutline" aria-hidden="true"></ion-icon>
                    </button>
                    <span class="ms-3">Modifications</span>
                </h2>

                <!-- button to add a new modifications item -->
                <div class="d-flex justify-content-between">
                    <button type="button" class="btn btn-primary" @click="addModification" aria-label="Add modification">Add Modification</button>
                </div>
                <!-- Transition to show/hide the modifications items -->
                <transition name="fade">
                    <div v-if="showModification" class="d-flex gap-3 flex-column mt-3">
                        <!-- Component to display and edit a modifications item -->
                        <modification-component v-for="(modification, index) in inspection.modifications" :key="index" :modification="modification" @destroy="removeModification(index)" aria-label="Modification item"></modification-component>
                    </div>
                </transition>
            </div>
            <div class="form-group d-flex gap-3">
                <!-- "Cancel" button that takes the user back to the inspection list -->
                <button :disabled="saving" type="button" class="btn btn-danger" @click="cancelInspection()" aria-label="Cancel inspection">Cancel</button>
                <!-- "Save inspection" button that saves the current inspection -->
                <button :disabled="saving" class="btn btn-success" type="submit" aria-label="Save inspection">Save inspection</button>
                <!-- "Complete inspection" button that marks the inspection as completed, only visible if the inspection is not already completed -->
                <button :disabled="saving" type="button" v-if="!inspection.completion" class="btn btn-success" @click="completeInspection" aria-label="Complete inspection">Complete inspection</button>
            </div>

        </form>

        <div v-else class="text-danger">
            <!-- Display message if no inspection was found -->
            <p>No inspection was found. Would you like to navigate back to the inspection overview? You can do so via the "Back to inspections" button.</p>
        </div>

        <div v-if="showToast" class="toast-container">
            <!-- Toast message container -->
            <div v-bind:class="{'show': showToast}" :class="'toast toast-' + toastType" aria-live="assertive">
                <!-- Display toast message -->
                {{ toastMessage }}
            </div>
        </div>
    </main>
</template>

<script>
    import { caretDownOutline, caretUpOutline } from 'ionicons/icons';
    import axios from 'axios';
    import store from '../store/store.js'

    import DamageComponent from '../components/form/DamageComponent.vue';
    import MaintenanceComponent from '../components/form/MaintenanceComponent.vue';
    import InstallationComponent from '../components/form/InstallationComponent.vue';
    import ModificationComponent from '../components/form/ModificationComponent.vue';

    export default {
        name: 'Inspection',
        // importing the child components to be used in this component
        components: {
            DamageComponent,
            MaintenanceComponent,
            InstallationComponent,
            ModificationComponent
        },
        mounted() {
            this.caretDownOutline = caretDownOutline;
            this.caretUpOutline = caretUpOutline;

            this.showDamage = false;
            this.showMaintenance = false;
            this.showInstallation = false;
            this.showModification = false;
        },
        data() {
            return {
                caretDownOutline: null,
                caretUpOutline: null,
                inspection: {
                    completion: false,
                    damage: [],
                    maintenance: [],
                    installations: [],
                    modifications: [],
                    cleanlinessScore: 0
                },
                addressId: '',
                inspectionId: '',
                showDamage: true,
                showMaintenance: true,
                showInstallation: true,
                showModification: true,
                showToast: false,
                toastMessage: '',
                toastType: '',
                saving: false,
            };
        },
        // when the component is created, retrieve the inspection data from the API
        async created() {
            this.addressId = store.getters.address;
            let inspectionId = store.getters.inspection;
            this.inspectionId = inspectionId;

            try {
                const response = await axios.get(`https://api.jsonbin.io/v3/b/63c1a09815ab31599e35cf00/latest`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Master-Key': '$2b$10$6OQ5plkCt1vMLN8m7VMniOP5RSMQB3WOfPoQlYh/JNbs2xeF7psUu'
                    }
                });
                // check if the address and inspection exist, and set the inspection data if they do
                if (response.data.record.addresses !== undefined && response.data.record.addresses !== null) {
                    if (this.addressId !== undefined && this.addressId !== null && response.data.record.addresses.filter(address => address.id === this.addressId) !== undefined && response.data.record.addresses.filter(address => address.id === this.addressId) !== null) {
                        let address = response.data.record.addresses.filter(address => address.id === this.addressId);
                        if (address.length > 0) {
                            address = address[0];
                            if (address.inspections.filter(inspection => inspection.id === inspectionId) !== undefined && address.inspections.filter(inspection => inspection.id === inspectionId) !== null) {
                                let inspection = address.inspections.filter(inspection => inspection.id === inspectionId);
                                if (inspection.length > 0) {
                                    this.inspection = inspection[0];
                                }
                            }
                        }
                    }
                }
            } catch (error) {
                console.log(error);
            }
        },
        methods: {
            addDamage() {
                // Add new damage array
                this.inspection.damage.push({});
            },
            removeDamage(index) {
                this.inspection.damage.splice(index, 1);
            },
            addMaintenance() {
                // Add new maintenace array
                this.inspection.maintenance.push({});
            },
            removeMaintenace(index) {
                this.inspection.maintenance.splice(index, 1);
            },
            addInstallation() {
                // Add new installation array
                this.inspection.installations.push({});
            },
            removeInstallation(index) {
                this.inspection.installations.splice(index, 1);
            },
            addModification() {
                // Add new modifications array
                this.inspection.modifications.push({});
            },
            removeModification(index) {
                this.inspection.modifications.splice(index, 1);
            },
            async saveInspection() {
                try {
                    //set the saving state to true
                    this.saving = true;
                    //get the data from the api
                    const response = await axios.get(`https://api.jsonbin.io/v3/b/63c1a09815ab31599e35cf00/latest`, {
                        headers: {
                            'Content-Type': 'application/json',
                            'X-Master-Key': '$2b$10$6OQ5plkCt1vMLN8m7VMniOP5RSMQB3WOfPoQlYh/JNbs2xeF7psUu'
                        }
                    });

                    //find the index of the address and inspection in the response data
                    const addressIndex = response.data.record.addresses.findIndex(address => address.id === this.addressId);
                    const inspectionIndex = response.data.record.addresses[addressIndex].inspections.findIndex(inspection => inspection.id === this.inspectionId);

                    //update the data in the response object
                    response.data.record.addresses[addressIndex].inspections[inspectionIndex].completion = this.inspection.completion;
                    response.data.record.addresses[addressIndex].inspections[inspectionIndex].damage = this.inspection.damage;
                    response.data.record.addresses[addressIndex].inspections[inspectionIndex].maintenance = this.inspection.maintenance;
                    response.data.record.addresses[addressIndex].inspections[inspectionIndex].installations = this.inspection.installations;
                    response.data.record.addresses[addressIndex].inspections[inspectionIndex].modifications = this.inspection.modifications;
                    response.data.record.addresses[addressIndex].inspections[inspectionIndex].cleanlinessScore = this.inspection.cleanlinessScore;
                    response.data.record.addresses[addressIndex].inspections[inspectionIndex].somethingBroken = this.inspection.somethingBroken;

                    //put the updated data back to the api
                    const update = await axios.put(`https://api.jsonbin.io/v3/b/63c1a09815ab31599e35cf00`, {
                        addresses: response.data.record.addresses,
                    }, {
                        headers: {
                            'Content-Type': 'application/json',
                            'X-Master-Key': '$2b$10$6OQ5plkCt1vMLN8m7VMniOP5RSMQB3WOfPoQlYh/JNbs2xeF7psUu'
                        }
                    });

                    // Check if the status is 200 if so show succes toast
                    if (update.status === 200) {
                        this.toastType = 'success';
                        this.toastMessage = 'Inspection saved successfully';
                        this.showToast = true;

                        // Remove toast after 3 seconds
                        setTimeout(() => {
                            this.toastType = '';
                            this.toastMessage = '';
                            this.showToast = false;
                        }, 3000);
                    }

                    // Check if the status is not 200 if so show error toast
                    if (update.status !== 200) {
                        this.toastType = 'error';
                        this.toastMessage = 'Inspection not saved, error occurred';
                        this.showToast = true;

                        // Remove toast after 3 seconds
                        setTimeout(() => {
                            this.toastType = '';
                            this.toastMessage = '';
                            this.showToast = false;
                        }, 3000);
                    }
                } catch (error) {
                    // Save the inspection to the offlineInspection array when there's no internet connection
                    let offlineInspections = store.getters.offlineInspections || [];
                    this.inspection.inspectionId = this.inspectionId;
                    this.inspection.addressId = this.addressId;
                    offlineInspections.push(this.inspection);
                    store.commit("setOfflineInspections", offlineInspections);
                    this.toastType = 'error';
                    this.toastMessage = 'You do not have wifi, Inspection saved in offline mode';
                    this.showToast = true;

                    setTimeout(() => {
                        this.toastType = '';
                        this.toastMessage = '';
                        this.showToast = false;
                    }, 3000);
                } finally {
                    this.saving = false;
                }
            },
            cancelInspection() {
                // If called send user to the inspections view
                try {
                    this.$router.push({ name: 'inspections' });
                } catch (error) {
                    console.log(error);
                }
            },
            completeInspection() {
                // If called send user to the inspections view, complete the inspection and save the inspection
                this.inspection.completion = true;
                this.saveInspection();
                
                try {
                    store.commit("toggleCompletion", true)

                    this.$router.push({ name: 'inspection' });
                } catch (error) {
                    console.log(error);
                }
            }
        }
    }
</script>