<template>
    <b-modal v-model="modal" hide-footer title='Export Engagements'>
        <small class="card p-1 bg-light">Confirm that you would like to export a list of engagements.</small>
        <div class="text-center my-4">
            <span class="font-weight-bold">Are you sure you would like to export a spreadsheet?</span> 
        </div>

        <div class="d-flex justify-content-between">
            <button class="btn btn-sm btn-primary" type="button" @click="confirm" :disabled="processing">
                <span v-if="!processing">Yes</span>
                <span v-if="processing">Downloading...</span>
            </button>
            <button class="btn btn-sm btn-secondary mr-2" type="button" @click="closeModal">Cancel</button>
        </div>
      </b-modal>
</template>

<script>
    import bModal from 'bootstrap-vue/es/components/modal/modal'
    import bModalDirective from 'bootstrap-vue/es/directives/modal/modal'
    import { mapGetters } from 'vuex'
export default {
    name: 'MessageModal',
    data() {
      return {
        modal: true,
      }
    },
    components:{
        'b-modal': bModal,
    },
    directives: {
        'b-modal': bModalDirective
    },
    computed: {
      ...mapGetters(['processing'])
    },
    methods: {
      closeModal() {
        this.$emit('close-modal')
      },
      confirm() {
        this.$emit('submit-download')
      }
    },
}
</script>
