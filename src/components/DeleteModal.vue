<template>
    <b-modal v-model="modal" centered hide-footer title="Confirm Delete Request">
        <span v-if="name">
            Are you sure you would like to <strong>delete {{name}}</strong>?
        </span>
        <span v-else>
            Are you sure you would like to delete the resource?
        </span>
        <p v-if="warning" class="border p-3 mt-3 font-weight-bold text-danger">{{warning}}</p>
        <div class="d-flex justify-content-between mt-4">
            <button class="btn btn-primary btn-sm font-weight-bold" @click="approveRequest" :disabled="processing">
              <span v-if="processing">Deleting...</span>
              <span v-else>Confirm</span>
            </button>
            <button type="button" class="btn btn-secondary btn-sm font-weight-bold" @click="$store.commit('toggleDeleteModal', null)">Cancel</button>
        </div>
      </b-modal>
</template>

<script>
import bModal from 'bootstrap-vue/es/components/modal/modal'
import bModalDirective from 'bootstrap-vue/es/directives/modal/modal'
import {mapGetters} from 'vuex'
export default {
    name: 'DeleteModal',
    props: ['name', 'warning'],
     components:{
        'b-modal': bModal,
    },
    directives: {
        'b-modal': bModalDirective
    },
    computed: {
        ...mapGetters(['deleteModal', 'processing', 'deleteModalDetails']),
        modal: {
            get() {
                return this.deleteModal
            },
            set(newValue) {
                return newValue
            }
        }
    },
    methods: {
        approveRequest() {
            if(this.deleteModalDetails) {
                this.$store.dispatch(this.deleteModalDetails.action, this.deleteModalDetails.id)
            } return
        }
    }
}
</script>

<style>

</style>
