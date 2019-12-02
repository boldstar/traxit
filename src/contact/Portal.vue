<template>
    <div class="portal">
        <div class="header p-0 d-flex flex-row justify-content-between mt-2 shadow-sm mb-3">
            <div class="ml-3 pr-2  h3 align-self-center m-0">
                <span>Portal</span>
            </div>
            <div class="btn-group dropleft  m-0 align-self-center mr-3 ">
                <button class="btn btn-primary btn-sm dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="mr-2 fas fa-plus-square"></i></button>
                <div class="dropdown-menu">
                    <button class="btn dropdown-item font-weight-bold" type="button">Invite Contact</button>
                    <button class="btn dropdown-item font-weight-bold" type="button">Share Document</button>
                    <div class="dropdown-divider"></div>
                    <button class="btn dropdown-item font-weight-bold text-danger" type="button">Delete Portal</button>
                </div>
            </div>
        </div>
        <div class="portal-body">
            <div v-if="!inviteStatus">
                <FileShareSvg class="mt-5 mb-3" />
                <button class="btn btn-primary font-weight-bold" @click="inviteContact">Invite Contact</button>
            </div>
            <div v-else>
                Share Documents
            </div>
        </div>


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

    </div>
</template>

<script>
import FileShareSvg from '@/components/FileShareSvg.vue'
import bModal from 'bootstrap-vue/es/components/modal/modal';
import bModalDirective from 'bootstrap-vue/es/directives/modal/modal';
import {mapGetters} from 'vuex'
export default {
    name: 'Portal',
    props: ['clientDetails'],
    components:{
        'b-modal': bModal,
        FileShareSvg
    },
    directives: {
        'b-modal': bModalDirective
    },
    data() {
        return {
            taxpayer: '',
            spouse: '',
            both: '',
            nothingSelected: false,
        }
    },
    computed: {
        ...mapGetters(['processing','portalModal', 'inviteStatus']),
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
        submitInvite() {
            if(!this.taxpayer && !this.spouse && !this.both) {
                this.nothingSelected = true
                return
            }   this.$store.dispatch('inviteContact', {
                client_id: this.clientDetails.id,
                send_to: this.both ? this.both : this.taxpayer ? this.taxpayer : this.spouse ? this.spouse : null
            })
        }
    },
    created() {
        this.$store.dispatch('checkInvitations', this.clientDetails.id)
    }
}
</script>

<style lang="scss" scoped>

    .header {
        height: 4em;
    }
</style>