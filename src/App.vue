<template>
  <link rel="stylesheet" :href="cssBase" />
  <link rel="stylesheet" :href="cssFile" />
  <app-header />
  <router-view />
  <app-footer />
  <NoWifiModal />

  <div v-if="showOfflineToast" class="toast-container">
    <div :class="['toast', 'toast-' + toastOfflineType, { show: showOfflineToast }]">
      {{ toastOfflineMessage }}
    </div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, computed } from 'vue'
import AppHeader from '@/components/template/AppHeader.vue'
import AppFooter from '@/components/template/AppFooter.vue'
import NoWifiModal from '@/components/alerts/WifiCheck.vue'
import axios from 'axios'
import { useStore } from 'vuex'

import baseStyle from '@/assets/css/base.css?url'
import mainStyle from '@/assets/css/main.css?url'
import darkStyle from '@/assets/css/dark.css?url'

const store = useStore()

// Toast-related state
const showOfflineToast = ref(false)
const toastOfflineMessage = ref('')
const toastOfflineType = ref('')

// Computed for styling
const cssBase = computed(() => baseStyle)
const cssFile = computed(() =>
  store.getters.darkTheme ? darkStyle : mainStyle
)

// Function to save offline inspections
const saveOfflineInspections = async () => {
  const inspections = store.getters.offlineInspections
  if (inspections && inspections.length > 0) {
    try {
      const response = await axios.get(
        'https://api.jsonbin.io/v3/b/63c1a09815ab31599e35cf00/latest',
        {
          headers: {
            'Content-Type': 'application/json',
            'X-Master-Key':
              '$2b$10$6OQ5plkCt1vMLN8m7VMniOP5RSMQB3WOfPoQlYh/JNbs2xeF7psUu'
          }
        }
      )

      inspections.forEach((inspection) => {
        if (
          inspection.addressId == null ||
          inspection.inspectionId == null
        )
          return

        const addressIndex = response.data.record.addresses.findIndex(
          (a) => a.id === inspection.addressId
        )
        const inspectionIndex = response.data.record.addresses[addressIndex].inspections.findIndex(
          (i) => i.id === inspection.inspectionId
        )

        if (
          addressIndex === -1 ||
          inspectionIndex === -1 ||
          !response.data.record.addresses[addressIndex]?.inspections[inspectionIndex]
        )
          return

        const target = response.data.record.addresses[addressIndex].inspections[inspectionIndex]
        Object.assign(target, {
          completion: inspection.completion,
          damage: inspection.damage,
          maintenance: inspection.maintenance,
          installations: inspection.installations,
          modifications: inspection.modifications,
          cleanlinessScore: inspection.cleanlinessScore,
          somethingBroken: inspection.somethingBroken
        })

        delete inspection.addressId
        delete inspection.inspectionId
      })

      await axios.put(
        'https://api.jsonbin.io/v3/b/63c1a09815ab31599e35cf00',
        response.data.record,
        {
          headers: {
            'Content-Type': 'application/json',
            'X-Master-Key':
              '$2b$10$6OQ5plkCt1vMLN8m7VMniOP5RSMQB3WOfPoQlYh/JNbs2xeF7psUu'
          }
        }
      )

      store.commit('setOfflineInspections', [])
      toastOfflineType.value = 'success'
      toastOfflineMessage.value = 'Offline inspections saved successfully'
    } catch (error) {
      toastOfflineType.value = 'error'
      toastOfflineMessage.value = 'Error saving offline inspections'
    } finally {
      showOfflineToast.value = true
      setTimeout(() => {
        showOfflineToast.value = false
        toastOfflineMessage.value = ''
        toastOfflineType.value = ''
      }, 3000)
    }
  }
}

// Run when mounted
onMounted(() => {
  saveOfflineInspections()
  window.addEventListener('online', saveOfflineInspections)
})

onBeforeUnmount(() => {
  window.removeEventListener('online', saveOfflineInspections)
})
</script>