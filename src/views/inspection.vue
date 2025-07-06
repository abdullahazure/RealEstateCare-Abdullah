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
<script setup>
import { ref, reactive, onMounted, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import { caretDownOutline, caretUpOutline } from 'ionicons/icons';
import axios from 'axios';
import store from '../store/store.js';

import DamageComponent from '../components/form/DamageComponent.vue';
import MaintenanceComponent from '../components/form/MaintenanceComponent.vue';
import InstallationComponent from '../components/form/InstallationComponent.vue';
import ModificationComponent from '../components/form/ModificationComponent.vue';

const router = useRouter();

const caretDownIcon = ref(caretDownOutline);
const caretUpIcon = ref(caretUpOutline);

const showDamage = ref(true);
const showMaintenance = ref(true);
const showInstallation = ref(true);
const showModification = ref(true);

const inspection = reactive({
  completion: false,
  damage: [],
  maintenance: [],
  installations: [],
  modifications: [],
  cleanlinessScore: 0,
  somethingBroken: false
});

const addressId = ref('');
const inspectionId = ref('');
const showToast = ref(false);
const toastMessage = ref('');
const toastType = ref('');
const saving = ref(false);

onBeforeMount(async () => {
  addressId.value = store.getters.address;
  inspectionId.value = store.getters.inspection;

  try {
    const response = await axios.get(`https://api.jsonbin.io/v3/b/63c1a09815ab31599e35cf00/latest`, {
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': '...'
      }
    });

    const addresses = response.data.record.addresses;
    const address = addresses.find(a => a.id === addressId.value);

    if (address) {
      const foundInspection = address.inspections.find(i => i.id === inspectionId.value);
      if (foundInspection) {
        Object.assign(inspection, foundInspection);
      }
    }
  } catch (error) {
    console.error(error);
  }
});

// ✅ LOGICA FUNCTIES

const addDamage = () => inspection.damage.push({});
const removeDamage = (index) => inspection.damage.splice(index, 1);

const addMaintenance = () => inspection.maintenance.push({});
const removeMaintenance = (index) => inspection.maintenance.splice(index, 1);

const addInstallation = () => inspection.installations.push({});
const removeInstallation = (index) => inspection.installations.splice(index, 1);

const addModification = () => inspection.modifications.push({});
const removeModification = (index) => inspection.modifications.splice(index, 1);

const saveInspection = async () => {
  try {
    saving.value = true;

    const response = await axios.get(`https://api.jsonbin.io/v3/b/63c1a09815ab31599e35cf00/latest`, {
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': '...'
      }
    });

    const addresses = response.data.record.addresses;
    const addressIndex = addresses.findIndex(a => a.id === addressId.value);
    const inspectionIndex = addresses[addressIndex].inspections.findIndex(i => i.id === inspectionId.value);

    if (addressIndex !== -1 && inspectionIndex !== -1) {
      Object.assign(addresses[addressIndex].inspections[inspectionIndex], inspection);

      const update = await axios.put(`https://api.jsonbin.io/v3/b/63c1a09815ab31599e35cf00`, {
        addresses
      }, {
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': '...'
        }
      });

      if (update.status === 200) {
        toastType.value = 'success';
        toastMessage.value = 'Inspection saved successfully';
      } else {
        toastType.value = 'error';
        toastMessage.value = 'Inspection not saved, error occurred';
      }
    }
  } catch (error) {
    // Offline fallback
    const offline = store.getters.offlineInspections || [];
    inspection.inspectionId = inspectionId.value;
    inspection.addressId = addressId.value;
    offline.push({ ...inspection });
    store.commit("setOfflineInspections", offline);

    toastType.value = 'error';
    toastMessage.value = 'You do not have wifi, Inspection saved in offline mode';
  } finally {
    showToast.value = true;
    setTimeout(() => (showToast.value = false), 3000);
    saving.value = false;
  }
};

const cancelInspection = () => {
  try {
    router.push({ name: 'inspections' });
  } catch (error) {
    console.error(error);
  }
};

const completeInspection = () => {
  inspection.completion = true;
  saveInspection();
  try {
    store.commit("toggleCompletion", true);
    router.push({ name: 'inspection' });
  } catch (error) {
    console.error(error);
  }
};
</script>