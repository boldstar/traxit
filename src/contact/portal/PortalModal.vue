<template>
    <b-modal v-model="modal" centered hide-footer title="Invite Contact To Portal">
          <div class="d-flex flex-column text-left">
              <div class="invite-alert" v-if="alert">Please select who to invite.</div>
            <h5 class="mb-4">Who would you like to invite?</h5>
             <div class="custom-control custom-radio">
                <input type="radio" id="customRadio1" name="customRadio" class="custom-control-input" v-model="invite.taxpayer" value="taxpayer" @click="invite.spouse = '', invite.both = '', $emit('clear-alert')">
                <label class="custom-control-label" for="customRadio1">Taxpayer</label>
            </div>
            <div class="custom-control custom-radio">
                <input type="radio" id="customRadio2" name="customRadio" class="custom-control-input" v-model="invite.spouse" value="spouse" @click="invite.taxpayer = '', invite.both = '', $emit('clear-alert')">
                <label class="custom-control-label" for="customRadio2">Spouse</label>
            </div>
            <div class="custom-control custom-radio">
                <input type="radio" id="customRadio3" name="customRadio" class="custom-control-input" v-model="invite.both" value="both" @click="invite.spouse = '', invite.taxpayer = '', $emit('clear-alert')">
                <label class="custom-control-label" for="customRadio3">Both</label>
            </div>
          
          </div>
        <div class="d-flex justify-content-between mt-4">
            <button class="btn btn-primary btn-sm font-weight-bold" @click="approveInvite" :disabled="processing">
              <span v-if="processing">Sending...</span>
              <span v-else>Send Invite</span>
            </button>
            <button type="button" class="btn btn-secondary btn-sm font-weight-bold" @click="$store.commit('portal_modal')">Cancel</button>
        </div>
      </b-modal>
</template>

<script>
import bModal from 'bootstrap-vue/es/components/modal/modal'
import bModalDirective from 'bootstrap-vue/es/directives/modal/modal'
import {mapGetters} from 'vuex'
export default {
    name: 'PortalModal',
    props: ['alert'],
    data() {
        return {
            invite: {
                taxpayer: '',
                spouse: '',
                both: '',
            },
            nothingSelected: false,
        }
    },
    components:{
        'b-modal': bModal,
    },
    directives: {
        'b-modal': bModalDirective
    },
    computed: {
        ...mapGetters(['portalModal', 'processing']),
        modal: {
             get() {
                 return this.portalModal
             },
             set(newState) {
                 return newState
             }
         }
    },
    methods: {
        inviteContact() {
            this.$store.commit('portal_modal')
        },
        approveInvite() {
            this.$emit('approve-invite', this.invite)
        }
    }
}
</script>

<style lang-scss>

.invite-alert {
    background: red;
    border-radius: 5px;
    padding: 10px;
    margin: 10px;
}

</style>
