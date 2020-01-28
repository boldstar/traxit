<template>
    <b-modal v-model="modal" centered hide-footer title="Remove Contact From Portal">
          <div class="d-flex flex-column text-left">
              <div class="invite-alert" v-if="alert">Please select who to remove.</div>
            <h5 class="mb-4">Who would you like to remove?</h5>
            <p class="invite-info">Only showing contacts available.</p>
             <div class="custom-control custom-radio" v-if="client && client.email">
                <input type="radio" id="customRadio1" name="customRadio" class="custom-control-input" v-model="remove.taxpayer" value="taxpayer" @click="remove.spouse = '', remove.both = '', $emit('clear-alert')">
                <label class="custom-control-label" for="customRadio1">Taxpayer</label>
            </div>
            <div class="custom-control custom-radio" v-if="client && client.spouse_email">
                <input type="radio" id="customRadio2" name="customRadio" class="custom-control-input" v-model="remove.spouse" value="spouse" @click="remove.taxpayer = '', remove.both = '', $emit('clear-alert')">
                <label class="custom-control-label" for="customRadio2">Spouse</label>
            </div>
            <div class="custom-control custom-radio" v-if="client && client.email && client.spouse_email">
                <input type="radio" id="customRadio3" name="customRadio" class="custom-control-input" v-model="remove.both" value="both" @click="remove.spouse = '', remove.taxpayer = '', $emit('clear-alert')">
                <label class="custom-control-label" for="customRadio3">Both</label>
            </div>
          
          </div>
        <div class="d-flex justify-content-between mt-4">
            <button class="btn btn-primary btn-sm font-weight-bold" @click="removeContact" :disabled="processing">
              <span v-if="processing">Removing...</span>
              <span v-else>Remove Contact</span>
            </button>
            <button type="button" class="btn btn-secondary btn-sm font-weight-bold" @click="$store.commit('portal_modal_remove_contact')">Cancel</button>
        </div>
      </b-modal>
</template>

<script>
import bModal from 'bootstrap-vue/es/components/modal/modal'
import bModalDirective from 'bootstrap-vue/es/directives/modal/modal'
import {mapGetters} from 'vuex'
export default {
    name: 'PortalRemoveContact',
    props: ['alert', 'client'],
    data() {
        return {
            remove: {
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
        ...mapGetters(['portalModalRemoveContact', 'processing']),
        modal: {
             get() {
                 return this.portalModalRemoveContact
             },
             set(newState) {
                 return newState
             }
         }
    },
    methods: {
        removeContact() {
            this.$emit('approve-removal', this.remove)
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
    color: white;
    font-weight: bold;
}

.invite-info {
    font-size: .8rem;
    background: lightgray;
    border-radius: 5px;
    padding: 5px;
}

</style>
