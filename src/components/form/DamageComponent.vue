<script setup>
import { ref, watch, onMounted } from 'vue'

const props = defineProps({
  damage: {
    type: Object,
    required: true
  }
})
const emit = defineEmits(['destroy'])

const photos = ref([])
const files = ref([])
const photosInput = ref(null)

onMounted(() => {
  photos.value = Array.isArray(props.damage.photos) ? [...props.damage.photos] : []
})

watch(photos, (val) => {
  props.damage.photos = [...val]
})

function uploadPhotos(event) {
  files.value = Array.from(event.target.files)
  props.damage.photos = []
  photos.value = []

  files.value.forEach(file => {
    const reader = new FileReader()
    reader.onloadend = e => {
      photos.value.push(e.target.result)
      props.damage.photos.push(e.target.result)
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
  files.value.forEach(f => dt.items.add(f))

  if (photosInput.value) {
    photosInput.value.files = dt.files
    if (photosInput.value.webkitEntries?.length) {
      photosInput.value.dataset.file = dt.files[0]?.name || ''
    }
  }

  props.damage.photos = [...photos.value]
}

function destroy() {
  emit('destroy')
}
</script>

<template>
  <div>
    <div class="card">
      <div class="card-header">
        <button type="button" @click="destroy" class="btn btn-danger float-end" aria-label="Delete">Delete</button>
      </div>
      <div class="card-body">
        <div class="form-group mb-3">
          <label for="location">Location</label>
          <input type="text" v-model="props.damage.location" class="form-control" id="location" />
          <small class="form-text text-muted">Enter the location of the damage</small>
        </div>

        <div class="form-group form-check mb-3">
          <input type="checkbox" v-model="props.damage.new" class="form-check-input" id="new" />
          <label for="new" class="form-check-label">New</label>
        </div>

        <div class="form-group mb-3">
          <label for="type">Type</label>
          <input type="text" v-model="props.damage.type" class="form-control" id="type" />
          <small class="form-text text-muted">Enter the type of damage</small>
        </div>

        <div class="form-group mb-3">
          <label for="date">Date</label>
          <input type="date" v-model="props.damage.date" class="form-control" id="date" />
          <small class="form-text text-muted">Enter the date the damage was discovered</small>
        </div>

        <div class="form-group form-check mb-3">
          <input type="checkbox" v-model="props.damage.acuteAction" class="form-check-input" id="acuteAction" />
          <label for="acuteAction" class="form-check-label">Acute Action</label>
        </div>

        <div class="form-group mb-3">
          <label for="description">Description</label>
          <textarea v-model="props.damage.description" class="form-control" id="description"></textarea>
          <small class="form-text text-muted">Enter a description of the damage</small>
        </div>

        <div class="form-group mb-3">
          <label for="photos">Photos</label>
          <input
            type="file"
            ref="photosInput"
            @change="uploadPhotos"
            class="form-control"
            id="photos"
            accept="image/*"
            multiple
          />
        </div>

        <div class="card mt-3">
          <div class="card-body">
            <div class="row">
              <div v-for="(photo, index) in photos" :key="index" class="col-md-4 mb-3">
                <div class="position-relative">
                  <img :src="photo" class="img-fluid w-75 d-block mx-auto rounded" />
                  <button
                    type="button"
                    @click="removePhoto(index)"
                    class="btn btn-danger btn-sm position-absolute top-0 end-0"
                    aria-label="remove"
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