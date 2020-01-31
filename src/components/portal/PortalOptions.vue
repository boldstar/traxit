<template>
    <b-modal v-model="showOptions" centered hide-footer :title="file ? file.document_name : 'Document'" class="options-modal">
        <div class="card-header p-3 text-left">
            <span class="font-weight-bold">Update Document Options or Status</span>
        </div>
        <div class="d-flex p-3">
            <div class="pdf">
                <pdf :src="fileUrl" v-if="portalFile"></pdf>
                <div v-else><Spinner /></div>
            </div>
            <div class="d-flex flex-column text-left file-body" v-if="file">
                <div class="file-options">
                    <p>Options</p>
                    <PortalInput v-model="file.payment_required" :data="file.payment_required" :label="'Payment Required'"/>
                    <PortalInput v-model="file.signature_required" :data="file.signature_required" :label="'Signature Required'"/>
                    <PortalInput v-model="file.downloadable" :data="file.downloadable" :label="'Downloadable'"/>
                    <label for="message" class="font-weight-bold mt-2">Message:</label>
                    <textarea name="message" class="form-control mb-2" cols="20" rows="5" v-model="file.message" v-if="file.message"></textarea>
                </div>
                <div class="file-status">
                    <p>Status</p>
                    <PortalInput v-model="file.paid" :data="file.paid" :label="'Paid'"/>
                    <PortalInput v-model="file.signed" :data="file.signed" :label="'Signed'"/>
                </div>
            </div>
        </div>
        <div class="card-header p-3 text-left">
            <span class="font-weight-bold">Update Tax Year</span>
        </div>
        <div class="p-3" v-if="file">
            <select name="tax_year" id="tax_year" v-model="file.tax_year" class="form-control">
                <option v-for="(year, index) in years" :key="index" :value="year">{{year}}</option>
            </select>
        </div>
        <div class="d-flex justify-content-between p-3">
            <button class="btn btn-primary btn-sm font-weight-bold" :disabled="processing" @click="saveOptions">
              <span v-if="processing">Submitting...</span>
              <span v-else>Submit Update</span>
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
import Spinner from '@/components/loaders/Spinner.vue'
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
        PortalInput,
        Spinner
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
        },
        years() {
            var currentYear = new Date().getFullYear(), years = [];
            var startYear = currentYear - 10;  
            while(startYear <= currentYear) {
            years.push(JSON.stringify(startYear++))
            } 
            return years.reverse();
        },
    },
    methods: {
        closeOptions() {
            this.$store.commit('file_options')
        },
        saveOptions() {
            this.$store.dispatch('updatePortalFile', this.file)
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

.options-modal .modal-body {
    padding: 0!important;
}


.pdf {
    flex-grow: 1;
}
</style>
