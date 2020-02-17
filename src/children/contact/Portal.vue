<template>
    <div class="portal">
        <div class="header p-0 d-flex flex-row justify-content-between mt-2 shadow-sm mb-3 bg-white">
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
                    <button class="btn dropdown-item font-weight-bold " type="button" @click="$store.commit('portal_modal_remove_contact')"><i class="fas fa-user-times mr-2 text-danger"></i>Remove Contact</button>
                    <div class="dropdown-divider"></div>
                    <button class="btn dropdown-item font-weight-bold " type="button" @click="removePortal"><i class="fas fa-trash mr-2 text-danger"></i>Remove Portal</button>
                </div>
            </div>
        </div>
        <div class="portal-body">
            <div v-if="!inviteStatus && !loading && portalFiles.length < 1">
                <FileShareSvg class="mt-5 mb-3" />
                <button class="btn btn-primary font-weight-bold" @click="inviteContact">Invite Contact</button>
            </div>
            <div v-else-if="portalFiles && portalFiles.length > 0 && !loading">
                <PortalUploader v-if="portalUpload" @close-uploader="$store.commit('portal_upload')" />
                <PortalTable v-if="!loading" :docs="portalFiles" @view-file-options="setFile"/>
            </div>
            <Spinner v-if="loading" />
        </div>


        <PortalRemoveContact v-if="remove" :users="portalUsers" :client="clientDetails" @approve-removal="removeContact" :alert="nothingSelected" @clear-alert="nothingSelected = false"/>
        <PortalModal v-if="modal" :client="clientDetails" @approve-invite="submitInvite" :alert="nothingSelected" @clear-alert="nothingSelected = false"/>
        <PortalOptions  :file="viewFileOptions" />
        <delete-modal ></delete-modal>

    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import FileShareSvg from '@/components/placeholders/FileShareSvg.vue'
import PortalTable from '@/components/portal/PortalTable.vue'
import PortalUploader from '@/components/portal/PortalUploader.vue'
import PortalModal from '@/components/portal/PortalModal.vue'
import PortalRemoveContact from '@/components/portal/PortalRemoveContact.vue'
import PortalOptions from '@/components/portal/PortalOptions.vue'
import DeleteModal from '@/components/modals/DeleteModal.vue'
import Spinner from '@/components/loaders/Spinner.vue'
export default {
    name: 'Portal',
    props: ['clientDetails'],
    components:{
        FileShareSvg,
        PortalTable,
        PortalUploader,
        PortalModal,
        PortalRemoveContact,
        PortalOptions,
        DeleteModal,
        Spinner
    },
    data() {
        return {
            showUploader: false,
            viewFileOptions: null,
            nothingSelected: false,
            loading: false
        }
    },
    computed: {
        ...mapGetters([
                'processing',
                'portalModal', 
                'inviteStatus', 
                'portalUpload', 
                'fileOptions', 
                'portalFile', 
                'portalModalRemoveContact', 
                'portalUsers', 
                'portalFiles'
            ]),
         modal: {
             get() {
                 return this.portalModal
             },
             set(newState) {
                 return newState
             }
         },
         remove: {
             get() {
                 return this.portalModalRemoveContact
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
        removeContact(contacts) {
            this.$store.dispatch('removePortalUser', contacts)
        }
    },
    created() {
        this.$store.dispatch('checkInvitations', this.clientDetails.id)
        this.$store.dispatch('getPortalUsers', this.clientDetails.id)
        this.$store.dispatch('getPortalFiles', this.$route.params.id)
        this.loading = true
        var self = this
        setTimeout(() => {
            self.loading = false
        }, 3000)
    }
}
</script>

<style lang="scss" scoped>

    .header {
        height: 4em;
    }

</style>
        