<template>
    <b-modal v-model="modal" centered hide-footer title="Invite Contact To Portal">
          <div class="d-flex flex-column text-left">
            <h5 class="mb-4">Who would you like to invite?</h5>
             <div class="custom-control custom-radio">
                <input type="radio" id="customRadio1" name="customRadio" class="custom-control-input" v-model="taxpayer" value="taxpayer" @click="spouse = '', both = ''">
                <label class="custom-control-label" for="customRadio1">Taxpayer</label>
            </div>
            <div class="custom-control custom-radio">
                <input type="radio" id="customRadio2" name="customRadio" class="custom-control-input" v-model="spouse" value="spouse" @click="taxpayer = '', both = ''">
                <label class="custom-control-label" for="customRadio2">Spouse</label>
            </div>
            <div class="custom-control custom-radio">
                <input type="radio" id="customRadio3" name="customRadio" class="custom-control-input" v-model="both" value="both" @click="spouse = '', taxpayer = ''">
                <label class="custom-control-label" for="customRadio3">Both</label>
            </div>
          
          </div>
        <div class="d-flex justify-content-between mt-4">
            <button class="btn btn-primary btn-sm font-weight-bold" @click="submitInvite" :disabled="processing">
              <span v-if="processing">Sending</span>
              <span v-else>Send Invite</span>
            </button>
            <button type="button" class="btn btn-secondary btn-sm font-weight-bold" @click="$store.commit('portal_modal')">Cancel</button>
        </div>
      </b-modal>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    name: 'PortalModal',
    data() {
        return {
            taxpayer: '',
            spouse: '',
            both: '',
            nothingSelected: false,
        }
    },
    computed: {
        modal: {
            ...mapGetters(['portalModal']),
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
    }
}
</script>

<style>

</style>
