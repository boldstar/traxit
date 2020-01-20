<template>
     <b-modal v-model="modal" centered  hide-footer title="Update Engagement Status">
        <div class="p-4">
            <span class="font-weight-bold">Would you like to update the status of the engagement?</span>
        </div>
        <div class="d-flex justify-content-between mt-3">
            <button class="btn btn-primary" id="inputGroupFileAddon04" @click="updateStatus">Yes, Update</button>
            <button type="button" class="btn btn-secondary btn-sm" @click="closeModal">No</button>
        </div>
      </b-modal>
</template>

<script>
import { mapGetters } from 'vuex';
import bModal from 'bootstrap-vue/es/components/modal/modal';
import bModalDirective from 'bootstrap-vue/es/directives/modal/modal';

export default {
    name: 'UpdateStatusModal',
    props: ['current_id'],
    components:{
        'b-modal': bModal,
    },
    directives: {
        'b-modal': bModalDirective
    },
    computed: {
        ...mapGetters(['showUpdateStatusModal']),
        modal: {
            get() {
                return this.showUpdateStatusModal
            },
            set(newValue) {
                return newValue
            }
        }
    },
    methods: {
        updateStatus() {
            this.$router.push('/engagement/' + this.current_id + '/edit')
            this.$store.commit('showUpdateStatusModal')
        },
        closeModal() {
            this.$store.commit('showUpdateStatusModal')
        }
    }
}
</script>

<style>

</style>