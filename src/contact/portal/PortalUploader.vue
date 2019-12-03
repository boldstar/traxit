<template>
    <div class="card col-4 p-0">
        <div class="card-header">
            <p class="m-0 font-weight-bold">Upload documents to share with contact</p>
        </div>
        <div class="vue-drop-wrapper">
            <vue-dropzone 
                ref="myVueDropzone" 
                id="dropzone" 
                :options="dropzoneOptions" 
                :useCustomSlot="true"
                v-on:vdropzone-file-added="addFile($event)"
                v-on:vdropzone-removed-file="removeFile($event)"
            >
                <img src="../../assets/upload_icon.png" alt="upload_icon" class="upload_icon_img">
            </vue-dropzone>
        </div>
        <div class="py-2 bg-light"><p class="m-0 font-weight-bold">Options</p></div>
        <div class="d-flex flex-column align-items-start pl-3 my-3">
            <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" id="customCheck1">
                <label class="custom-control-label" for="customCheck1">Downloadable</label>
            </div>
            <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" id="customCheck1">
                <label class="custom-control-label" for="customCheck1">Signature Required</label>
            </div>
            <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" id="customCheck1">
                <label class="custom-control-label" for="customCheck1">Payment Required</label>
            </div>
        </div>
        <div class="py-2 bg-light"><p class="m-0 font-weight-bold">Message</p></div>
        <div class="d-flex flex-column align-items-start">
            <textarea name="message" id="message" class="form-control" placeholder="Send a message or instructions with the file..." cols="10" rows="5"></textarea>
        </div>
        <button class="btn btn-primary btn-block font-weight-bold mt-3">Share</button>
    </div>
</template>

<script>
export default {
    name: 'PortalUploader',
    data() {
        return {
            files: [],
            dropzoneOptions: {
                url: 'https://httpbin.org/post',
                maxFilesize: 0.5,
                addRemoveLinks: true,
                dictRemoveFile: 'X',
                dictCancelUpload: 'Cancel'
            },
        }
    },
    methods: {
            addFile(event) {
            this.files.push(event)
        },
        removeFile(event) {
            const index = this.files.findIndex(file => file.upload.uuid == event.upload.uuid)
            this.files.splice(index, 1)
        },
    }
}
</script>

<style lang="scss">
    textarea,
input[type=text] {
    font-family:Arial;
}

.input-wrapper {
    box-sizing: border-box;
    position: relative;
}

.input-error {
    border-color: red!important;
}

.file-manager-wrapper {
    box-sizing: border-box;
}

.account-label {
    position: absolute;
    top: 17px;
    left: 8px;
    background: rgb(233, 233, 233);
    font-weight: bold;
    padding: 3px 20px;
    border-radius: 3px;
    box-shadow: 0 0 5px 0 rgba(0,0,0,0.4);
}


.button-div {
    margin-top: 20px;
}

.vue-drop-wrapper {
    border: 4px dashed rgb(145, 145, 145);
    padding: 6px;
}

.fa-paper-plane {
    margin-left: 10px;
}

.upload_icon_img {
    height: 100px;
    width: auto;
}

.vue-dropzone {
    padding: 10px!important;
    margin: 0!important;
    box-sizing: border-box!important;
    display: flex!important;
    flex-direction: column!important;
}

.dz-preview {
    width: 100%;
    max-height: 40px!important;
    min-height: 40px!important;
    padding: 0!important;
    margin: 0!important;
    display: flex;
    background: white!important;
    color: white!important;
    // box-shadow: 0 0 5px 0 rgba(0,0,0,.9);
    border: 2px solid lightgray;
    border-bottom: none;
}

.dz-preview:last-of-type {
    border-bottom: 2px solid lightgray;
}

.dz-image {
    display: none!important;
}
.vue-dropzone>.dz-preview .dz-details {
    background-color: transparent!important;
}

.dz-details {
    display: flex;
    flex-direction: row-reverse;
    justify-content: flex-start!important;
    color: white!important;
    max-height: 40px!important;
    min-height: 40px!important;
    opacity: 1!important;
    line-height: 0!important;
    padding-top: 19px!important;
}

.dz-filename {
    span {
        color: #9b9b9b!important;
        opacity: 1!important;
        font-weight: bold;
    }
}

.dz-size {
    span {
        color: #0077ff!important;
        opacity: 1!important;
    }
}

.dropzone .dz-preview .dz-details .dz-filename {
    margin-bottom: 1em!important;
    font-size: 16px!important;
    line-height: 0!important;
}

.vue-dropzone>.dz-preview .dz-details .dz-filename {
    overflow: visible!important;
}

.dropzone .dz-preview .dz-details .dz-size {
    margin-bottom: 1em!important;
    font-size: 16px!important;
    line-height: 0!important;
}

.dz-success-mark {
    svg {
       height: 20px!important;
       width: auto!important;
       color: green; 
    }
}

.dz-error-mark {
    svg {
        height: 20px!important;
        width: auto!important;
    }
}

.vue-dropzone>.dz-preview .dz-remove {
    color: red!important;
    opacity: 1!important;
    align-self: center!important;
    top: 8px!important;
    bottom: 10px!important;
    padding: 0 5px!important;
    padding-top: 3px!important;
    border: none!important;
}

.vue-dropzone>.dz-preview .dz-progress .dz-upload {
    background: #0077ff!important;
}

.no-files {
    border-color: red;
}

.vue-editor {
    margin-bottom: 10px;
    border: 3px solid rgb(201, 201, 201);
    border-radius: 5px;
    min-height: 150px;
}

#vueText .ql-editor { min-height:150px }

</style>
