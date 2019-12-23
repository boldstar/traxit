<template>
    <div class="portal">
        <div class="header p-0 d-flex flex-row justify-content-between mt-2 shadow-sm mb-3">
            <div class="ml-3 pr-2  h3 align-self-center m-0">
                <span>Portal</span>
            </div>
            <div class="btn-group dropleft  m-0 align-self-center mr-3 ">
                <button class="btn btn-primary btn-sm dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="mr-2 fas fa-plus-square"></i></button>
                <div class="dropdown-menu">
                    <button class="btn dropdown-item font-weight-bold" type="button" @click="$store.commit('portal_upload')"><i class="fas fa-file-upload mr-2 text-success"></i>Share File</button>
                    <div class="dropdown-divider"></div>
                    <button class="btn dropdown-item font-weight-bold" type="button" @click="inviteContact"><i class="fas fa-user-plus mr-2 text-success"></i>Invite Contact</button>
                    <div class="dropdown-divider"></div>
                    <button class="btn dropdown-item font-weight-bold " type="button" @click="removeContact"><i class="fas fa-user-times mr-2 text-danger"></i>Remove Contact</button>
                    <div class="dropdown-divider"></div>
                    <button class="btn dropdown-item font-weight-bold " type="button" @click="removePortal()"><i class="fas fa-trash mr-2 text-danger"></i>Remove Portal</button>
                </div>
            </div>
        </div>
        <div class="portal-body">
            <div v-if="!inviteStatus">
                <FileShareSvg class="mt-5 mb-3" />
                <button class="btn btn-primary font-weight-bold" @click="inviteContact">Invite Contact</button>
            </div>
            <div v-else>
                <PortalUploader v-if="portalUpload" @close-uploader="$store.commit('portal_upload')" />
                <PortalTable @view-file-options="setFile"/>
            </div>
        </div>

        <PortalModal v-if="modal" :client="clientDetails" @approve-invite="submitInvite" :alert="nothingSelected" @clear-alert="nothingSelected = false"/>
        <PortalOptions  :file="viewFileOptions" />
        <delete-modal ></delete-modal>

    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import FileShareSvg from '@/components/FileShareSvg.vue'
import PortalTable from './portal/PortalTable.vue'
import PortalUploader from './portal/PortalUploader.vue'
import PortalModal from './portal/PortalModal.vue'
import PortalOptions from './portal/PortalOptions.vue'
import DeleteModal from '@/components/DeleteModal.vue'
export default {
    name: 'Portal',
    props: ['clientDetails'],
    components:{
        FileShareSvg,
        PortalTable,
        PortalUploader,
        PortalModal,
        PortalOptions,
        DeleteModal
    },
    data() {
        return {
            showUploader: false,
            viewFileOptions: null,
            nothingSelected: false
        }
    },
    computed: {
        ...mapGetters(['processing','portalModal', 'inviteStatus', 'portalUpload', 'fileOptions', 'portalFile']),
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
        submitInvite(invite) {
            if(!invite.taxpayer && !invite.spouse && !invite.both) {
                this.nothingSelected = true
                return
            }   this.$store.dispatch('inviteContact', {
                client_id: this.clientDetails.id,
                send_to: invite.both ? invite.both : invite.taxpayer ? invite.taxpayer : invite.spouse ? invite.spouse : null
            })
        },
        setFile(file) {
            this.viewFileOptions = file
        },
        removePortal() {
               this.$store.commit('toggleDeleteModal', {
                    id: this.clientDetails.id, 
                    action: 'removePortal',
                    warning: 'All files associated with this client will be removed.',
                    name: 'Portal'
                })
        },
        removeContact() {

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
        