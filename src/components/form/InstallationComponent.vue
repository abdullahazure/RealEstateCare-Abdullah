<template>
    <div>
        <div class="card">
            <div class="card-header">
                <button type="button" @click="destroy" class="btn btn-danger float-right" aria-label="delete">Delete</button>
            </div>
            <div class="card-body">
                <!-- Form group for location input -->
                <div class="form-group">
                    <label for="location">Location</label>
                    <input type="text" v-model="installation.location" class="form-control" id="location" aria-label="location" aria-describedby="location-help">
                    <small id="location-help" class="form-text text-muted">Enter the location of the installation</small>
                </div>
                <!-- Form group for type input -->
                <div class="form-group">
                    <label for="type">Type</label>
                    <input type="text" v-model="installation.type" class="form-control" id="type" aria-label="type" aria-describedby="type-help">
                    <small id="type-help" class="form-text text-muted">Enter the type of installation</small>
                </div>
                <!-- Form group for reported errors input -->
                <div class="form-group">
                    <label for="reportedErrors">Reported Errors</label>
                    <input type="text" v-model="installation.reportedErrors" class="form-control" id="reportedErrors" aria-label="reported errors" aria-describedby="reported-errors-help">
                    <small id="reported-errors-help" class="form-text text-muted">Enter any reported errors for the installation</small>
                </div>
                <!-- Form group for test procedure input -->
                <div class="form-group">
                    <label for="testProcedure">Test Procedure</label>
                    <input type="text" v-model="installation.testProcedure" class="form-control" id="testProcedure" aria-label="test procedure" aria-describedby="test-procedure-help">
                    <small id="test-procedure-help" class="form-text text-muted">Enter the test procedure used for the installation</small>
                </div>
                <!-- Form group for approved checkbox -->
                <div class="form-group">
                    <label for="approved" class="me-2">Approved</label>
                    <input type="checkbox" v-model="installation.approved" class="form-check-input" id="approved" aria-label="approved">
                </div>
                <!-- Form group for comments input -->
                <div class="form-group">
                    <label for="comments">Comments</label>
                    <input type="text" v-model="installation.comments" class="form-control" id="comments" aria-label="comments" aria-describedby="comments-help">
                    <small id="comments-help" class="form-text text-muted">Enter any comments for the installation</small>
                </div>
                <!-- File input for photos -->
                <div class="form-group">
                    <label for="photos">Photos</label>
                    <input type="file" ref="photos" @change="uploadPhotos" class="form-control" id="photos" accept="image/*" multiple aria-label="upload photos" aria-describedby="photos-help">
                    <small id="photos-help" class="form-text text-muted">Upload any relevant photos for the installation</small>
                </div>
                <div class="card mt-3">
                    <div class="card-body">
                        <div class="row">
                            <div v-for="(photo, index) in photos" :key="index" class="col-md-4">
                                <div class="img-container position-relative">
                                    <img :src="photo" class="img-fluid w-50 mb-3 d-block m-auto img-preview" aria-label="uploaded photo">
                                    <button type="button" @click="removePhoto(index)" class="btn btn-danger btn-sm position-absolute top-0 end-0 delete-button" aria-label="remove photo">
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
        name: 'InstallationComponent',
        // Installation object prop
        props: {
            installation: {
                type: Object,
                required: true
            }
        },
        computed: {
            getPhotos() {
                return this.installation.photos;
            }
        },
        data() {
            return {
                photos: this.installation.photos,
            }
        },
        methods: {
            uploadPhotos(event) {
                this.files = Array.from(event.target.files);
                this.installation.photos = [];
                for (let i = 0; i < this.files.length; i++) {
                    let file = this.files[i];
                    let reader = new FileReader();
                    reader.onloadend = e => {
                        this.photos.push(e.target.result);
                        this.installation.photos.push(e.target.result);
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

                this.installation.photos = dataTransfer.files;  

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