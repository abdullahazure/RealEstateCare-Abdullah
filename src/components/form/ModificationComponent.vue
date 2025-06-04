<template>
    <div>
        <div class="card" aria-label="Form for capturing modification information">
            <div class="card-header">
                <button type="button" @click="destroy" class="btn btn-danger float-right" aria-label="Delete">Delete</button>
            </div>
            <div class="card-body">
                <div class="form-group">
                    <label for="existingSituation" aria-label="Existing Situation">Existing Situation</label>
                    <!-- Bind the input value to the "existingSituation" property of the "modification" object -->
                    <input type="text" v-model="modification.existingSituation" class="form-control" id="existingSituation" aria-label="Enter existing situation">
                </div>
                <div class="form-group">
                    <label for="location" aria-label="Location">Location</label>
                    <!-- Bind the input value to the "location" property of the "modification" object -->
                    <input type="text" v-model="modification.location" class="form-control" id="location" aria-label="Enter location">
                </div>
                <div class="form-group">
                    <label for="performedBy" aria-label="Performed By">Performed By</label>
                    <!-- Bind the input value to the "performedBy" property of the "modification" object -->
                    <input type="text" v-model="modification.performedBy" class="form-control" id="performedBy" aria-label="Enter performed by">
                </div>
                <div class="form-group">
                    <label for="description" aria-label="Description">Description</label>
                    <!-- Bind the input value to the "description" property of the "modification" object -->
                    <input type="text" v-model="modification.description" class="form-control" id="description" aria-label="Enter description">
                </div>
                <div class="form-group">
                    <label for="action" aria-label="Action">Action</label>
                    <!-- Bind the input value to the "action" property of the "modification" object -->
                    <input type="text" v-model="modification.action" class="form-control" id="action" aria-label="Enter action">
                </div>
                <div class="form-group">
                    <label for="comments" aria-label="Comments">Comments</label>
                    <!-- Bind the input value to the "comments" property of the "modification" object -->
                    <input type="text" v-model="modification.description" class="form-control" id="description" aria-label="Description input" aria-describedby="description-help">
                </div>
                <div class="form-group" aria-label="Action form group">
                    <label for="action" aria-label="Label for action input">Action</label>
                    <!-- Bind the input value to the "action" property of the "modification" object -->
                    <input type="text" v-model="modification.action" class="form-control" id="action" aria-label="Action input" aria-describedby="action-help">
                </div>
                <!-- file input for photos -->
                <div class="form-group">
                    <label for="photos" aria-label="Photos">Photos</label>
                    <input type="file" ref="photos" @change="uploadPhotos" class="form-control" id="photos" accept="image/*" multiple aria-describedby="photos-help">
                </div>
                <div class="card mt-3">
                    <div class="card-body">
                        <div class="row">
                            <div v-for="(photo, index) in photos" :key="index" class="col-md-4">
                                <div class="img-container position-relative">
                                    <img :src="photo" class="img-fluid w-50 mb-3 d-block m-auto img-preview" aria-label="Preview Image">
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
        name: 'ModificationComponent',
        props: {
            modification: {
                type: Object,
                required: true
            }
        },
        computed: {
            getPhotos() {
                return this.modification.photos;
            }
        },
        data() {
            return {
                photos: this.modification.photos,
            }
        },
        methods: {
            uploadPhotos(event) {
                this.files = Array.from(event.target.files);
                this.modification.photos = [];
                for (let i = 0; i < this.files.length; i++) {
                    let file = this.files[i];
                    let reader = new FileReader();
                    reader.onloadend = e => {
                        this.photos.push(e.target.result);
                        this.modification.photos.push(e.target.result);
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

                this.modification.photos = dataTransfer.files;  

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