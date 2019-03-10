<template>
    <div >
        <!-- this is the modal to notify client of status -->
      <b-modal v-model="notifyModal" hide-footer hide-header>
        <div class="d-flex justify-content-between mb-2">
          <h4 class="text-primary font-weight-bold">Notify Contact</h4>
          <i class="far fa-envelope text-primary fa-2x"></i>
        </div>
        <div class="py-4 bg-light">
          <span class="font-weight-bold bg-light message">Would You Like To Notify The Contact Of The Following Status Update?</span>
          <div class="mt-3">
            <span class="font-weight-bold text-primary">"{{ taskForNotification.title }}"</span>
          </div>
        </div>
        <div class="d-flex justify-content-between mt-4">
          <button type="button" class="btn btn-primary btn-sm" @click="sendMail()" :disabled="processing">
            <span v-if="!processing">Yes, Send Email</span>
            <span v-if="processing">Sending Mail...</span>
          </button>
          <button type="button" class="btn btn-danger btn-sm" @click="closeModal()">No Thanks</button>
        </div>
      </b-modal>
    </div>
</template>

<script>
import bModal from 'bootstrap-vue/es/components/modal/modal'
import bModalDirective from 'bootstrap-vue/es/directives/modal/modal'
import { mapGetters } from 'vuex'

export default {
    name: 'NotifyModal',
    data() {
      return {
        notifyModal: true,
      }
    },
    components:{
        'b-modal': bModal,
    },
    directives: {
        'b-modal': bModalDirective
    },
    computed: {
      ...mapGetters(['taskForNotification', 'processing'])
    },
    methods: {
      closeModal() {
        this.$store.commit('notifyClientModal')
      },
      sendMail() {
        this.$store.dispatch('notifyClient', this.taskForNotification)
      }
    },
    mounted() {
     
    }

}
</script>

<style scoped>

 .message {
   font-size: .8rem;
 }

</style>




