<template>
  <main class="container">
    <button type="button" class="btn btn-danger" @click="cancelInspection" aria-label="Back to inspections">Back to inspections</button>

    <form v-if="inspection && inspection.id !== ''" @submit.prevent="saveInspection" aria-label="Form to edit inspection">
      <h1>Inspection {{ inspection.id }}</h1>

      <div class="form-group">
        <label for="cleanlinessScore">Cleanliness Score</label>
        <select v-model="inspection.cleanlinessScore" class="form-select" id="cleanlinessScore">
          <option v-for="n in 10" :key="n" :value="n">{{ n }}</option>
        </select>
      </div>

      <!-- Damage Section -->
      <div class="form-group my-3 py-3">
        <h2>
          <button type="button" class="btn btn-secondary" @click="showDamage = !showDamage">
            <ion-icon :icon="showDamage ? caretUpOutline : caretDownOutline" class="m-auto" />
          </button>
          <span class="ms-3">Damage</span>
        </h2>
        <div class="d-flex justify-content-between">
          <button type="button" class="btn btn-primary" @click="addDamage">Add Damage</button>
        </div>
        <transition name="fade">
          <div v-if="showDamage" class="d-flex gap-3 flex-column mt-3">
            <damage-component
              v-for="(damage, index) in inspection.damage"
              :key="index"
              :damage="damage"
              @destroy="removeDamage(index)"
            />
          </div>
        </transition>
      </div>

      <!-- Maintenance Section -->
      <div class="form-group my-3 py-3">
        <h2>
          <button type="button" class="btn btn-secondary" @click="showMaintenance = !showMaintenance">
            <ion-icon :icon="showMaintenance ? caretUpOutline : caretDownOutline" class="m-auto" />
          </button>
          <span class="ms-3">Maintenance</span>
        </h2>
        <div class="d-flex justify-content-between">
          <button type="button" class="btn btn-primary" @click="addMaintenance">Add Maintenance</button>
        </div>
        <transition name="fade">
          <div v-if="showMaintenance" class="d-flex gap-3 flex-column mt-3">
            <maintenance-component
              v-for="(maintenance, index) in inspection.maintenance"
              :key="index"
              :maintenance="maintenance"
              @destroy="removeMaintenance(index)"
            />
          </div>
        </transition>
      </div>

      <!-- Installation Section -->
      <div class="form-group my-3 py-3">
        <h2>
          <button type="button" class="btn btn-secondary" @click="showInstallation = !showInstallation">
            <ion-icon :icon="showInstallation ? caretUpOutline : caretDownOutline" class="m-auto" />
          </button>
          <span class="ms-3">Installations</span>
        </h2>
        <div class="d-flex justify-content-between">
          <button type="button" class="btn btn-primary" @click="addInstallation">Add Installation</button>
        </div>
        <transition name="fade">
          <div v-if="showInstallation" class="d-flex gap-3 flex-column mt-3">
            <installation-component
              v-for="(installation, index) in inspection.installation"
              :key="index"
              :installation="installation"
              @destroy="removeInstallation(index)"
            />
          </div>
        </transition>
      </div>

      <!-- Modifications Section -->
      <div class="form-group my-3 py-3">
        <h2>
          <button type="button" class="btn btn-secondary" @click="showModification = !showModification">
            <ion-icon :icon="showModification ? caretUpOutline : caretDownOutline" class="m-auto" />
          </button>
          <span class="ms-3">Modifications</span>
        </h2>
        <div class="d-flex justify-content-between">
          <button type="button" class="btn btn-primary" @click="addModification">Add Modification</button>
        </div>
        <transition name="fade">
          <div v-if="showModification" class="d-flex gap-3 flex-column mt-3">
            <modification-component
              v-for="(modification, index) in inspection.modifications"
              :key="index"
              :modification="modification"
              @destroy="removeModification(index)"
            />
          </div>
        </transition>
      </div>

      <!-- Action Buttons -->
      <div class="form-group d-flex gap-3">
        <button :disabled="saving" type="button" class="btn btn-danger" @click="cancelInspection">Cancel</button>
        <button :disabled="saving" type="submit" class="btn btn-success">Save inspection</button>
        <button v-if="!inspection.completion" :disabled="saving" type="button" class="btn btn-success" @click="completeInspection">Complete inspection</button>
      </div>
    </form>

    <div v-else class="text-danger">
      <p>No inspection was found. Use the "Back to inspections" button above to return.</p>
    </div>

    <div v-if="showToast" class="toast-container">
      <div :class="['toast', 'toast-' + toastType, showToast ? 'show' : '']">
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
    const response = await axios.get(`https://api.jsonbin.io/v3/b/683ff2528a456b7966a94a26`, {
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': '$2a$10$0f5YYc/h5v90cnRnqPCRNO9gVNlilQdyogyR7rKTPbseXPdI5Co3q'
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

// LOGICA FUNCTIES

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

    const response = await axios.get(`https://api.jsonbin.io/v3/b/683ff2528a456b7966a94a26/latest`, {
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': '$2a$10$0f5YYc/h5v90cnRnqPCRNO9gVNlilQdyogyR7rKTPbseXPdI5Co3q'
      }
    });

    const addresses = response.data.record.addresses;
    const addressIndex = addresses.findIndex(a => a.id === addressId.value);
    const inspectionIndex = addresses[addressIndex].inspections.findIndex(i => i.id === inspectionId.value);

    if (addressIndex !== -1 && inspectionIndex !== -1) {
      Object.assign(addresses[addressIndex].inspections[inspectionIndex], inspection);

      const update = await axios.put(`https://api.jsonbin.io/v3/b/683ff2528a456b7966a94a26`, {
        addresses
      }, {
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': '$2a$10$0f5YYc/h5v90cnRnqPCRNO9gVNlilQdyogyR7rKTPbseXPdI5Co3q'
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