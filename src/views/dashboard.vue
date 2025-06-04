<script setup>
    import { settings, bookmarkOutline, checkmarkCircle, grid } from 'ionicons/icons';
</script>

<template>
    <main id="dashboard" class="container-fluid text-dark p-3 d-flex align-items-center justify-content-center" aria-label="Dashboard">
        <div class="row">
            <div class="col-6 d-flex flex-column align-items-center justify-content-center p-3" aria-label="Scheduled">
                <!-- Router link to scheduled page with bookmarkOutline icon and text -->
                <router-link to="/scheduled" class="d-flex flex-column align-items-center justify-content-center" aria-label="Scheduled">
                    <ion-icon class="m-auto" id="navigation-bookmarkOutline-icon" :icon="bookmarkOutline" aria-hidden="true"></ion-icon>
                    <span class="fw-bold fs-6 mt-4" aria-hidden="true">Scheduled</span>
                </router-link>
            </div>
            <div class="col-6 d-flex flex-column align-items-center justify-content-center p-3" aria-label="Completed">
                <!-- Router link to completed page with checkmarkCircle icon and text -->
                <router-link to="/completed" class="d-flex flex-column align-items-center justify-content-center" aria-label="Completed">
                    <ion-icon class="m-auto" id="navigation-checkmarkCircle-icon" :icon="checkmarkCircle" aria-hidden="true"></ion-icon>
                    <span class="fw-bold fs-6 mt-4" aria-hidden="true">Completed</span>
                </router-link>
            </div>
            <div class="col-6 d-flex flex-column align-items-center justify-content-center p-3" aria-label="Knowledge Base">
                <!-- Router link to knowledge base page with grid icon and text -->
                <router-link to="/knowledge-base" class="d-flex flex-column align-items-center justify-content-center" aria-label="Knowledge Base">
                    <ion-icon class="m-auto" id="navigation-grid-icon" :icon="grid" aria-hidden="true"></ion-icon>
                    <span class="fw-bold fs-6 mt-4" aria-hidden="true">Knowledge base</span>
                </router-link>
            </div>
            <div class="col-6 d-flex flex-column align-items-center justify-content-center p-3" aria-label="Settings">
                <!-- Router link to settings page with settings icon and text -->
                <router-link to="/settings" class="d-flex flex-column align-items-center justify-content-center" aria-label="Settings">
                    <ion-icon class="m-auto" id="navigation-settings-icon" :icon="settings" aria-hidden="true"></ion-icon>
                    <span class="fw-bold fs-6 mt-4" aria-hidden="true">Settings</span>
                </router-link>
            </div>
        </div>
    </main>
</template>