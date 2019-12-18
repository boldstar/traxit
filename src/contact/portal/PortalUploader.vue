<template>
    <div class="portal-wrapper">
        <div class="col-4 p-0 portal-card">
            <div class="card-header">
                <p class="m-0 font-weight-bold">Upload document to share with contact</p>
            </div>
            <div class="vue-drop-wrapper">
                <vue-dropzone 
                    ref="myVueDropzone" 
                    id="dropzone" 
                    :options="dropzoneOptions" 
                    :useCustomSlot="true"
                    :include-styling="false"
                    v-on:vdropzone-file-added="addFile($event)"
                    v-on:vdropzone-removed-file="removeFile($event)"
                >
                    <div class="dropzone-custom-img">
                        <img  src="../../assets/upload_icon.png" alt="upload_icon" class="upload_icon_img">
                    </div>
                </vue-dropzone>
            </div>
            <div class="py-2 bg-light"><p class="m-0 font-weight-bold">Preview</p></div>
            <div>
                <embed :src="docPreview" type="" v-if="docPreview" class="w-100">
                <div v-else class="p-5 bg-secondary text-white font-weight-bold">Upload Preview</div>
            </div>
            <div class="py-2 bg-light"><p class="m-0 font-weight-bold">Options</p></div>
            <div class="d-flex flex-column align-items-start pl-3 my-3">
                <div class="custom-control custom-checkbox">
                    <input type="checkbox" class="custom-control-input" id="customCheck1" v-model="options.downloadable">
                    <label class="custom-control-label" for="customCheck1">Downloadable</label>
                </div>
                <div class="custom-control custom-checkbox">
                    <input type="checkbox" class="custom-control-input" id="customCheck2" v-model="options.signature_required">
                    <label class="custom-control-label" for="customCheck2">Signature Required</label>
                </div>
                <div class="custom-control custom-checkbox">
                    <input type="checkbox" class="custom-control-input" id="customCheck3" v-model="options.payment_required">
                    <label class="custom-control-label" for="customCheck3">Payment Required</label>
                </div>
            </div>
            <div class="py-2 bg-light"><p class="m-0 font-weight-bold">Message</p></div>
            <div class="d-flex flex-column align-items-start">
                <textarea name="message" id="message" class="form-control" placeholder="Send a message or instructions with the file..." cols="10" rows="5" v-model="options.message"></textarea>
            </div>
            <div class="d-flex mt-3 card-footer">
                <button class="btn btn-primary btn-block font-weight-bold" @click="upload">
                    <span v-if="!processing">Share</span>
                    <span v-if="processing">Sharing...</span>
                </button>
                <button class="btn btn-secondary font-weight-bold ml-3" @click="$emit('close-uploader')">Cancel</button>
            </div>
        </div>
    </div>
</template>

<script>
const getTemplate = () => `
<div class="dz-preview dz-file-preview">
  <div class="dz-image">
    <div data-dz-thumbnail-bg></div>
  </div>
  <div class="dz-details">
    <div class="dz-size"><span data-dz-size></span></div>
    <div class="dz-filename"><span data-dz-name></span></div>
  </div>
  <div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>
  <div class="dz-error-message"><span data-dz-errormessage></span></div>
  <div class="dz-success-mark"><i class="fa fa-check"></i></div>
  <div class="dz-error-mark"><i class="fa fa-close"></i></div>
</div>
`;

import {mapGetters} from 'vuex'
export default {
    name: 'PortalUploader',
    data() {
        return {
            files: [],
            dropzoneOptions: {
                url: 'https://httpbin.org/post',
                maxFilesize: 0.5,
                addRemoveLinks: true,
                dictRemoveFile: 'Remove',
                dictCancelUpload: 'Cancel',
                previewTemplate: getTemplate()
            },
            options: {
                downloadable: true,
                payment_required: false,
                signature_required: false,
                message: '',
                client_id: '',
                tax_year: ''
            },
            docPreview: ''
        }
    },
    computed: {
        ...mapGetters(['processing'])
    },
    methods: {
        addFile(event) {
            this.files.push(event)
            this.docPreview = URL.createObjectURL(event)
        },
        removeFile(event) {
            const index = this.files.findIndex(file => file.upload.uuid == event.upload.uuid)
            this.files.splice(index, 1)
            this.docPreview = ''
        },
        upload() {
            if(this.files.length < 1) return;

            var account = localStorage.getItem('fqdn_api_url')
            var index = account.indexOf('.')
            var fqdn = account.slice(0, index)
            this.options.account = fqdn
            this.options.client_id = this.$route.params.id
            this.$store.dispatch('uploadDocument', {
                files: this.files,
                options: this.options
            })
        },
    }
}
</script>

<style lang="scss">

.portal-wrapper {
    position: absolute;
    z-index: 10000;
    top: 0;
    left: 0;
    background: rgba(0,0,0,.3);
    height: 100%;
    width: 100%;
    overflow: hidden;
    display: flex;
    justify-content: center;

    .portal-card {
        background: white;
        border-radius: 10px;
        align-self: center;
    }
}

.vue-drop-wrapper {
    border: 4px dashed rgb(145, 145, 145);
    padding: 6px;
    position: relative;
    z-index: 0;
}

.dropzone-custom-img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    z-index: -2;

    .upload_icon_img {
        height: 75px;
        width: auto;
    }
}


#dropzone {
    padding: 0!important;
    margin: 0!important;
    box-sizing: border-box!important;
    min-height: 100px;

    .dz-preview {
        width: 100%;
        height: 100px;
        padding: 0!important;
        margin: 0!important;
        background: white!important;
        border: 2px solid lightgray;
        border-bottom: none;
        position: relative;

        .dz-details {
            background: white;
            display: flex;
            flex-direction: row-reverse;
            position: relative;
            .dz-filename {
                margin-right: auto;
                margin-left: 5px;
                color: black;
                position: absolute;
                left: 5px;
                font-weight: bold;
            }

            .dz-size {
                color: #0077ff;
                margin-right: 10px; 
            }
        }

        .dz-remove {
            color: red;
            font-weight: bold;
            width: 100%;
            display: block;
            margin-top: 28px;
            box-sizing: border-box;
            position: absolute;
            bottom: 0;
            text-decoration: none;
        }

        .dz-success-mark {
            position: absolute;
            top: 0;
            color: green;
            display: none;
        }

        .dz-error-mark {
            display: none;
        }
        
        &:last-of-type {
            border-bottom: 2px solid lightgray;
        }
    }
}

</style>
