<script setup>
import { triangle, ellipse, square, settings, notificationsOutline, notificationsOffOutline } from 'ionicons/icons'
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const loggedIn = computed(() => !!store.getters.userID)
const notificationsEnabled = computed(() => store.getters.userNotifications)
</script>

<template>
  <header class="bg-dark container-fluid">
    <div class="row">
      <div class="col bg-primary p-2 d-flex justify-content-end gap-2">
        <ion-icon id="iconbar-square" :icon="square" aria-label="square icon" />
        <ion-icon id="iconbar-ellipse" :icon="ellipse" aria-label="ellipse icon" />
        <ion-icon id="iconbar-triangle" :icon="triangle" aria-label="triangle icon" />
      </div>
    </div>

    <div class="row text-light p-3">
      <div class="col">
        <img
          alt="RealEstateCare logo"
          class="logo"
          src="@/assets/realestatecare/logo/logo.svg"
          height="150"
        />
      </div>
      <div class="col d-flex justify-content-end gap-2 align-items-center">
        <nav>
          <ul class="list-unstyled m-0">
            <li class="d-flex gap-3">
              <ion-icon
                v-if="notificationsEnabled"
                class="fs-1"
                id="notifications-icon"
                :icon="notificationsOutline"
                aria-label="notifications icon"
              />
              <ion-icon
                v-else
                class="fs-1"
                id="notifications-off-icon"
                :icon="notificationsOffOutline"
                aria-label="notifications off icon"
              />
              <router-link v-if="loggedIn" to="/settings" aria-label="settings">
                <ion-icon class="fs-1" id="settings-icon" :icon="settings" />
              </router-link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>
