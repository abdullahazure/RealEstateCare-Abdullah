<script setup>
import { ref, onMounted, watch } from 'vue'

const props = defineProps({
  maintenance: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['destroy'])

const photos = ref([])
const files = ref([])
const photosInput = ref(null)

onMounted(() => {
  photos.value = Array.isArray(props.maintenance.photos)
    ? [...props.maintenance.photos]
    : []
})

watch(photos, (val) => {
  props.maintenance.photos = [...val]
})

function uploadPhotos(event) {
  files.value = Array.from(event.target.files)
  photos.value = []
  props.maintenance.photos = []

  files.value.forEach((file) => {
    const reader = new FileReader()
    reader.onloadend = (e) => {
      photos.value.push(e.target.result)
      props.maintenance.photos.push(e.target.result)
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
  files.value.forEach((file) => dt.items.add(file))

  if (photosInput.value) {
    photosInput.value.files = dt.files
    if (photosInput.value.webkitEntries?.length) {
      photosInput.value.dataset.file = dt.files[0]?.name || ''
    }
  }

  props.maintenance.photos = [...photos.value]
}

function destroy() {
  emit('destroy')
}
</script>

<template>
  <div>
    <div class="card">
      <div class="card-header">
        <button type="button" @click="destroy" class="btn btn-danger float-end" aria-label="Delete button">
          Delete
        </button>
      </div>
      <div class="card-body">
        <div class="form-group mb-3">
          <label for="location">Location</label>
          <input
            id="location"
            v-model="props.maintenance.location"
            type="text"
            class="form-control"
            aria-describedby="location"
          />
        </div>

        <div class="form-group mb-3">
          <label for="type">Type</label>
          <input
            id="type"
            v-model="props.maintenance.type"
            type="text"
            class="form-control"
            aria-describedby="type"
          />
        </div>

        <div class="form-group form-check mb-3">
          <input
            id="acuteAction"
            v-model="props.maintenance.acuteAction"
            type="checkbox"
            class="form-check-input"
            aria-describedby="acuteAction"
          />
          <label for="acuteAction" class="form-check-label ms-2">Acute Action</label>
        </div>

        <div class="form-group mb-3">
          <label for="costEstimate">Cost Estimate</label>
          <input
            id="costEstimate"
            v-model="props.maintenance.costEstimate"
            type="text"
            class="form-control"
            aria-describedby="costEstimate"
          />
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
            aria-describedby="photos-help"
          />
          <small id="photos-help" class="form-text text-muted">
            Please select the photos of the damage
          </small>
        </div>

        <div class="card mt-3">
          <div class="card-body">
            <div class="row">
              <div v-for="(photo, index) in photos" :key="index" class="col-md-4 mb-3">
                <div class="position-relative">
                  <img
                    :src="photo"
                    class="img-fluid w-75 d-block mx-auto rounded"
                    alt="damage photo"
                  />
                  <button
                    type="button"
                    @click="removePhoto(index)"
                    class="btn btn-danger btn-sm position-absolute top-0 end-0"
                    aria-label="Remove photo"
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