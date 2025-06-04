<template>
    <div>
        <div class="card">
            <div class="card-header">
                <button type="button" @click="destroy" class="btn btn-danger float-right" aria-label="Delete button">Delete</button>
            </div>
            <div class="card-body">
                <!-- form-group for location input -->
                <div class="form-group">
                    <label for="location" aria-label="Location">Location</label>
                    <input type="text" v-model="maintenance.location" class="form-control" id="location" aria-describedby="location">
                </div>
                <!-- form-group for type input -->
                <div class="form-group">
                    <label for="type" aria-label="Type">Type</label>
                    <input type="text" v-model="maintenance.type" class="form-control" id="type" aria-describedby="type">
                </div>
                <!-- form-group for acute action checkbox -->
                <div class="form-group">
                    <label for="acuteAction" class="me-2" aria-label="Acute Action">Acute Action</label>
                    <input type="checkbox" v-model="maintenance.acuteAction" class="form-check-input" id="acuteAction" aria-describedby="acuteAction">
                </div>
                <!-- form-group for cost estimate input -->
                <div class="form-group">
                    <label for="costEstimate" aria-label="Cost Estimate">Cost Estimate</label>
                    <input type="text" v-model="maintenance.costEstimate" class="form-control" id="costEstimate" aria-describedby="costEstimate">
                </div>
                <!-- file input for photos -->
                <div class="form-group">
                    <label for="photos" aria-label="Photos">Photos</label>
                    <input type="file" ref="photos" @change="uploadPhotos" class="form-control" id="photos" accept="image/*" multiple aria-describedby="photos-help">
                    <small id="photos-help" class="form-text text-muted">Please select the photos of the damage</small>
                </div>
                <div class="card mt-3">
                    <div class="card-body">
                        <div class="row">
                            <div v-for="(photo, index) in photos" :key="index" class="col-md-4">
                                <div class="img-container position-relative">
                                    <img :src="photo" class="img-fluid w-50 mb-3 d-block m-auto img-preview" alt="damage photo">
                                    <button type="button" @click="removePhoto(index)" class="btn btn-danger btn-sm position-absolute top-0 end-0 delete-button" aria-label="Remove photo">
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

<script>
    export default {
        name: 'MaintenanceComponent',
        props: {
            // maintenance data passed as prop
            maintenance: {
            type: Object,
            required: true
            }
        },
        computed: {
            getPhotos() {
                return this.maintenance.photos;
            }
        },
        data() {
            return {
                photos: this.maintenance.photos,
            }
        },
        methods: {
            uploadPhotos(event) {
                this.files = Array.from(event.target.files);
                this.maintenance.photos = [];
                for (let i = 0; i < this.files.length; i++) {
                    let file = this.files[i];
                    let reader = new FileReader();
                    reader.onloadend = e => {
                        this.photos.push(e.target.result);
                        this.maintenance.photos.push(e.target.result);
                    };
                    reader.readAsDataURL(file);
                }
            },
            removePhoto(index) {
                this.photos.splice(index, 1);
                this.files.splice(index, 1);
                this.updateFileInput();
            },
            updateFileInput() {
                // Now let's create a FileList
                const dataTransfer = new DataTransfer();
                for(let i = 0; i < this.files.length; i++) {
                    dataTransfer.items.add(this.files[i])
                }
                this.$refs.photos.files = dataTransfer.files;

                this.maintenance.photos = dataTransfer.files;  

                // Help Safari out
                if (this.$refs.photos.webkitEntries.length) {
                    this.$refs.photos.dataset.file = `${dataTransfer.files[0].name}`;
                }
            },
            destroy() {
                // emit the "destroy" event to the parent component
                this.$emit("destroy");
            }
        }
    };
</script> 