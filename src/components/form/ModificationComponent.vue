<script setup>
import { ref, onMounted, watch } from 'vue'

const props = defineProps({
  modification: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['destroy'])

const photos = ref([])
const files = ref([])
const photosInput = ref(null)

onMounted(() => {
  photos.value = Array.isArray(props.modification.photos)
    ? [...props.modification.photos]
    : []
})

watch(photos, (val) => {
  props.modification.photos = [...val]
})

function uploadPhotos(event) {
  files.value = Array.from(event.target.files)
  photos.value = []
  props.modification.photos = []

  files.value.forEach((file) => {
    const reader = new FileReader()
    reader.onloadend = (e) => {
      photos.value.push(e.target.result)
      props.modification.photos.push(e.target.result)
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

  props.modification.photos = [...photos.value]
}

function destroy() {
  emit('destroy')
}
</script>

<template>
  <div>
    <div class="card" aria-label="Form for capturing modification information">
      <div class="card-header">
        <button type="button" @click="destroy" class="btn btn-danger float-end" aria-label="Delete">
          Delete
        </button>
      </div>
      <div class="card-body">
        <div class="form-group mb-3">
          <label for="existingSituation">Existing Situation</label>
          <input
            type="text"
            id="existingSituation"
            v-model="props.modification.existingSituation"
            class="form-control"
            aria-label="Enter existing situation"
          />
        </div>

        <div class="form-group mb-3">
          <label for="location">Location</label>
          <input
            type="text"
            id="location"
            v-model="props.modification.location"
            class="form-control"
            aria-label="Enter location"
          />
        </div>

        <div class="form-group mb-3">
          <label for="performedBy">Performed By</label>
          <input
            type="text"
            id="performedBy"
            v-model="props.modification.performedBy"
            class="form-control"
            aria-label="Enter performed by"
          />
        </div>

        <div class="form-group mb-3">
          <label for="description">Description</label>
          <input
            type="text"
            id="description"
            v-model="props.modification.description"
            class="form-control"
            aria-label="Enter description"
          />
        </div>

        <div class="form-group mb-3">
          <label for="action">Action</label>
          <input
            type="text"
            id="action"
            v-model="props.modification.action"
            class="form-control"
            aria-label="Enter action"
          />
        </div>

        <div class="form-group mb-3">
          <label for="comments">Comments</label>
          <input
            type="text"
            id="comments"
            v-model="props.modification.comments"
            class="form-control"
            aria-label="Enter comments"
          />
        </div>

        <div class="form-group mb-3">
          <label for="photos">Photos</label>
          <input
            ref="photosInput"
            type="file"
            id="photos"
            class="form-control"
            accept="image/*"
            multiple
            @change="uploadPhotos"
            aria-label="Upload photos"
          />
        </div>

        <div class="card mt-3">
          <div class="card-body">
            <div class="row">
              <div v-for="(photo, index) in photos" :key="index" class="col-md-4 mb-3">
                <div class="position-relative">
                  <img
                    :src="photo"
                    class="img-fluid w-75 d-block mx-auto rounded"
                    aria-label="Preview Image"
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