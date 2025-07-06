<script setup>
import { ref, onMounted, watch } from 'vue'

const props = defineProps({
  installation: {
    type: Object,
    required: true
  }
})
const emit = defineEmits(['destroy'])

const photos = ref([])
const files = ref([])
const photosInput = ref(null)

onMounted(() => {
  photos.value = Array.isArray(props.installation.photos)
    ? [...props.installation.photos]
    : []
})

watch(photos, (newVal) => {
  props.installation.photos = [...newVal]
})

function uploadPhotos(event) {
  files.value = Array.from(event.target.files)
  photos.value = []
  props.installation.photos = []

  files.value.forEach((file) => {
    const reader = new FileReader()
    reader.onloadend = (e) => {
      photos.value.push(e.target.result)
      props.installation.photos.push(e.target.result)
    }
    reader.readAsDataURL(file)
  })
}

function removePhoto(index) {
  photos.value.splice(index, 1)
  files.value.splice(index, 1)
  updateFileInput()
}

function updateFileInput() {
  const dt = new DataTransfer()
  files.value.forEach(file => dt.items.add(file))
  if (photosInput.value) {
    photosInput.value.files = dt.files
    if (photosInput.value.webkitEntries?.length) {
      photosInput.value.dataset.file = dt.files[0]?.name || ''
    }
  }
  props.installation.photos = [...photos.value]
}

function destroy() {
  emit('destroy')
}
</script>

<template>
  <div>
    <div class="card">
      <div class="card-header">
        <button type="button" @click="destroy" class="btn btn-danger float-end" aria-label="delete">Delete</button>
      </div>
      <div class="card-body">
        <div class="form-group mb-3">
          <label for="location">Location</label>
          <input
            id="location"
            v-model="props.installation.location"
            type="text"
            class="form-control"
            aria-label="location"
          />
          <small class="form-text text-muted">Enter the location of the installation</small>
        </div>

        <div class="form-group mb-3">
          <label for="type">Type</label>
          <input
            id="type"
            v-model="props.installation.type"
            type="text"
            class="form-control"
            aria-label="type"
          />
          <small class="form-text text-muted">Enter the type of installation</small>
        </div>

        <div class="form-group mb-3">
          <label for="reportedErrors">Reported Errors</label>
          <input
            id="reportedErrors"
            v-model="props.installation.reportedErrors"
            type="text"
            class="form-control"
            aria-label="reported errors"
          />
          <small class="form-text text-muted">Enter any reported errors for the installation</small>
        </div>

        <div class="form-group mb-3">
          <label for="testProcedure">Test Procedure</label>
          <input
            id="testProcedure"
            v-model="props.installation.testProcedure"
            type="text"
            class="form-control"
            aria-label="test procedure"
          />
          <small class="form-text text-muted">Enter the test procedure used for the installation</small>
        </div>

        <div class="form-group form-check mb-3">
          <input
            id="approved"
            v-model="props.installation.approved"
            type="checkbox"
            class="form-check-input"
            aria-label="approved"
          />
          <label for="approved" class="form-check-label ms-2">Approved</label>
        </div>

        <div class="form-group mb-3">
          <label for="comments">Comments</label>
          <input
            id="comments"
            v-model="props.installation.comments"
            type="text"
            class="form-control"
            aria-label="comments"
          />
          <small class="form-text text-muted">Enter any comments for the installation</small>
        </div>

        <div class="form-group mb-3">
          <label for="photos">Photos</label>
          <input
            id="photos"
            ref="photosInput"
            @change="uploadPhotos"
            class="form-control"
            type="file"
            accept="image/*"
            multiple
            aria-label="upload photos"
          />
          <small class="form-text text-muted">Upload any relevant photos for the installation</small>
        </div>

        <div class="card mt-3">
          <div class="card-body">
            <div class="row">
              <div
                v-for="(photo, index) in photos"
                :key="index"
                class="col-md-4 mb-3"
              >
                <div class="position-relative">
                  <img
                    :src="photo"
                    class="img-fluid w-75 d-block mx-auto rounded"
                    aria-label="uploaded photo"
                  />
                  <button
                    type="button"
                    @click="removePhoto(index)"
                    class="btn btn-danger btn-sm position-absolute top-0 end-0"
                    aria-label="remove photo"
                  >
                    remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>