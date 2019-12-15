<template>
    <b-modal v-model="showOptions" centered hide-footer :title="file.document_name">
        <div class="d-flex">
            <div><pdf :src="fileUrl"></pdf></div>
            <div class="d-flex flex-column text-left file-body">
                <div class="file-options">
                    <p>Options</p>
                    <PortalInput :data="file.payment_required" :label="'Payment Required'"/>
                    <PortalInput :data="file.signature_required" :label="'Signature Required'"/>
                    <PortalInput :data="file.downloadable" :label="'Downloadable'"/>
                    <label for="message" class="font-weight-bold mt-2">Message:</label>
                    <textarea name="message" class="form-control mb-2" cols="20" rows="5" v-model="file.message" v-if="file.message"></textarea>
                </div>
                <div class="file-status">
                    <p>Status</p>
                    <PortalInput :data="file.paid" :label="'Paid'"/>
                    <PortalInput :data="file.signed" :label="'Signed'"/>
                </div>
            </div>
        </div>
        <div class="d-flex justify-content-between mt-4">
            <button class="btn btn-primary btn-sm font-weight-bold" :disabled="processing">
              <span v-if="processing">Submitting...</span>
              <span v-else>Submit Edit</span>
            </button>
            <button type="button" class="btn btn-secondary btn-sm font-weight-bold" @click="$store.commit('file_options')">Cancel</button>
        </div>
      </b-modal>
</template>

<script>
import bModal from 'bootstrap-vue/es/components/modal/modal'
import bModalDirective from 'bootstrap-vue/es/directives/modal/modal'
import PortalInput from './PortalInput.vue'
import {mapGetters} from 'vuex'
import pdf from 'vue-pdf'
export default {
    name: 'PortalOptions',
    props: ['file'],
    data() {
        return {
            modal: false
        }
    },
    components:{
        'b-modal': bModal,
        pdf,
        PortalInput
    },
    directives: {
        'b-modal': bModalDirective
    },
    computed: {
        ...mapGetters(['fileOptions', 'processing', 'portalFile']),
        showOptions: {
            get() {
                return this.fileOptions
            },
            set(newValue) {
                return newValue
            }
        },
        fileUrl() {
            return URL.createObjectURL(new Blob([this.portalFile]));
        }
    },
    methods: {
        closeOptions() {
            this.$store.commit('file_options')
        }
    }
}
</script>

<style lang="scss">

.file-body {

    .file-options {
        
    p {
        border-bottom: 2px solid #0077ff;
        font-weight: bold;
    }
    }

    .file-status {
        
    p {
        border-bottom: 2px solid #0077ff;
        font-weight: bold;
    }
    }
}

</style>
