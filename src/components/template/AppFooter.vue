<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { build, search, alertCircle } from 'ionicons/icons'

const store = useStore()
const route = useRoute()

// Check login status via computed (reactief)
const loggedIn = computed(() => !!store.getters.userID)
</script>

<template>
  <footer
    class="container-fluid bg-primary position-fixed bottom-0"
    role="navigation"
    aria-label="footer navigatie"
  >
    <div class="row p-2">
      <div class="col d-flex flex-column justify-content-center text-center">
        <router-link
          v-if="loggedIn"
          to="/"
          aria-label="Active task"
          aria-labelledby="footer-build-icon"
          class="d-flex flex-column align-items-center justify-content-center"
        >
          <ion-icon class="fs-1 m-auto" id="footer-build-icon" :icon="build" />
          <span>Active task</span>
        </router-link>
      </div>
      <div class="col d-flex flex-column justify-content-center text-center">
        <router-link
          v-if="loggedIn"
          to="/search"
          aria-label="Search"
          aria-labelledby="footer-search-icon"
          class="d-flex flex-column align-items-center justify-content-center"
        >
          <ion-icon class="fs-1 m-auto" id="footer-search-icon" :icon="search" />
          <span>Search</span>
        </router-link>
      </div>
      <div class="col d-flex flex-column justify-content-center text-center">
        <router-link
          v-if="loggedIn"
          to="/help"
          aria-label="Help"
          aria-labelledby="footer-alertCircle-icon"
          class="d-flex flex-column align-items-center justify-content-center"
        >
          <ion-icon class="fs-1 m-auto" id="footer-alertCircle-icon" :icon="alertCircle" />
          <span>Help</span>
        </router-link>
      </div>
    </div>
  </footer>
</template>