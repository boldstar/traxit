<template>
    <div >
        <!-- this is the modal to notify client of status -->
      <b-modal v-model="modal" hide-footer :title='`Message For Status: ${status.status}`'>
        <small class="card p-2 bg-light">The custom status message is used in the "Status Update" email to add extra information for the contact when notifying them</small>
        <div class="text-left my-2">
            <span class="font-weight-bold">Status: <span class="text-primary">{{ status.status}}</span></span> 
        </div>
        <form class="text-right">
            <textarea name="message" id="message" cols="20" rows="5" class="w-100" v-model="status.message" maxlength="250"></textarea>
            <div class="d-flex justify-content-between">
            <span class="align-self-center font-weight-bold" v-if="status.message != null" :class="{'text-danger': status.message.length == 250}">{{ status.message.length }} / <span :class="{'text-primary': status.message.length < 250}">250 max characters</span></span>
            <div>
                <button class="btn btn-sm btn-secondary mr-2" type="button" @click="closeModal">Cancel</button>
                <button class="btn btn-sm btn-primary" type="button" @click="saveMessage" :disabled="processing">
                    <span v-if="!processing">Save</span>
                    <span v-if="processing">Saving...</span>
                </button>
            </div>
            </div>
        </form>
      </b-modal>
    </div>
</template>

<script>
import bModal from 'bootstrap-vue/es/components/modal/modal'
import bModalDirective from 'bootstrap-vue/es/directives/modal/modal'
import { mapGetters } from 'vuex'

export default {
    name: 'MessageModal',
    props: ['status'],
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
      saveMessage() {
          this.$store.dispatch('saveStatusMessage', {
              id: this.status.id,
              message: this.status.message
          })
      }
    },
}
</script>

<style scoped>

</style>




