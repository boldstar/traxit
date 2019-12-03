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
            <div class="d-flex" v-else>
                <PortalUploader />
                <PortalTable />
            </div>
        </div>

        <PortalModal v-if="modal" />

    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import FileShareSvg from '@/components/FileShareSvg.vue'
import PortalTable from './portal/PortalTable.vue'
import PortalUploader from './portal/PortalUploader.vue'
import PortalModal from './portal/PortalModal.vue'
export default {
    name: 'Portal',
    props: ['clientDetails'],
    components:{
        FileShareSvg,
        PortalTable,
        PortalUploader,
        PortalModal
    },
    data() {
        return {

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
        