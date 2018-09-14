<template>
<div class="page-wrapper mt-1">
<!-- this is the go back button -->
  <div>
    <router-link class="float-left btn btn-secondary btn-sm mt-3" to="/clients"><i class="far fa-arrow-alt-circle-left mr-2"></i>Go Back</router-link>  
  </div>

<!-- this is the setting dropdown -->
  <div class="float-right mt-3">
    <div class="dropdown">
      <button class="btn btn-sm btn-outline-primary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <i class="fas fa-cog mr-2"></i>
        Settings
      </button>
      <div class="dropdown-menu dropdown-menu-right mr-0" aria-labelledby="dropdownMenu2">
        <button class="dropdown-item" type="button"><i class="fas fa-pencil-alt"></i><span class="ml-2 pl-4">Edit Contact</span></button>
        <button class="dropdown-item" type="button"><i class="far fa-pause-circle"></i><span class="ml-2 pl-4">Deactivate</span></button>
        <div class="dropdown-divider"></div>
        <b-btn class="dropdown-item text-danger" v-b-modal.myModal><i class="fas fa-trash"></i><span class="ml-2">Delete Account</span></b-btn>
      </div>
    </div>
  </div>


<!-- this is the tab links for the different views -->
  <div class="d-flex justify-content-center">
    <ul class="nav mb-3" id="myTab" role="tablist">
      <li class="nav-item">
        <a v-bind:class="{ active: isActive('account') }" class="nav-link active mx-3" data-toggle="tab" href="#account" role="tab" aria-controls="account" aria-selected="true"><i class="pr-2 far fa-address-card"></i>Account</a>
      </li>
      <li class="nav-item">
        <a v-bind:class="{ active: isActive('engagements') }" class="nav-link mx-3" data-toggle="tab" href="#engagements" role="tab" aria-controls="engagements" aria-selected="false"><i class="pr-2 far fa-folder-open"></i>Engagements</a>
      </li>
      <li class="nav-item">
        <a v-bind:class="{ active: isActive('pending') }" class="nav-link mx-3" data-toggle="tab" href="#pending" role="tab" aria-controls="pending" aria-selected="false"><i class="pr-2 far fa-question-circle"></i>Pending</a>
      </li>
      <li class="nav-item">
        <a v-bind:class="{ active: isActive('notes') }" class="nav-link mx-3" data-toggle="tab" href="#notes" role="tab" aria-controls="notes" aria-selected="false"><i class="pr-2 far fa-clipboard"></i>Notes</a>
      </li>
      <li class="nav-item"> 
        <a v-bind:class="{ active: isActive('files') }" class="nav-link mx-3" data-toggle="tab" href="#files" role="tab" aria-controls="files" aria-selected="false"><i class="pr-2 fas fa-file-download"></i>Files</a>
      </li>
      <li class="nav-item">
        <a v-bind:class="{ active: isActive('portal') }" class="nav-link mx-3" data-toggle="tab" href="#portal" role="tab" aria-controls="portal" aria-selected="false"><i class="pr-2 fas fa-sign-in-alt"></i>Portal</a>
      </li>
    </ul>
  </div>

<!-- this is the modal popup for confirming the delete action -->
  <b-modal id="myModal" ref="myModalRef" hide-footer title="Delete Client">
    <div class="d-block text-left">
      <h5>Are you sure you want to delete, {{client.name}}?</h5>
      <br>
      <p><strong>*Warning:</strong> Can not be undone once deleted.</p>
    </div>
    <div class="d-flex">
      <b-btn class="mt-3" variant="danger" @click="hideModal">Cancel</b-btn>
      <b-btn class="mt-3 ml-auto" variant="outline-success" @click="deleteClient(client.id)">Confirm</b-btn>
    </div>
  </b-modal>

  <div class="tab-content" id="myTabContent">   
    <!-- these are the panes for the different tab views -->
    <div class="tab-pane fade show active" id="account" role="tabpanel" aria-labelledby="account-tab">
    <!-- this is the account section of the client details view -->
        <account></account>
    </div>
    <div class="tab-pane fade" id="engagements" role="tabpanel">
    <!-- this is the pending section of the client details view -->
      <client-engagements></client-engagements>
    </div>
    <div class="tab-pane fade" id="pending" role="tabpanel">
    <!-- this is the pending section of the client details view -->
      <pending></pending>
    </div>
    <div class="tab-pane fade" id="notes" role="tabpanel">
    <!-- this is the notes section of the client details view -->
      <notes></notes>
    </div>
    <div class="tab-pane fade" id="files" role="tabpanel">
    <!-- this is the files section of the client details view -->
      <files></files>
    </div>
    <div class="tab-pane fade" id="portal" role="tabpanel">
    <!-- this is the portal section of the client details view -->
      <portal></portal>
    </div>
  </div>

</div>
</template>

<script>
import { mapGetters } from 'vuex'
import bModal from 'bootstrap-vue/es/components/modal/modal'
import bModalDirective from 'bootstrap-vue/es/directives/modal/modal'
import Account from '@/components/client_detail_tabs/Account.vue'
import ClientEngagements from '@/components/client_detail_tabs/ClientEngagements.vue'
import Pending from '@/components/client_detail_tabs/Pending.vue'
import Notes from '@/components/client_detail_tabs/Notes.vue'
import Files from '@/components/client_detail_tabs/Files.vue'
import Portal from '@/components/client_detail_tabs/Portal.vue'




export default {
  name: 'ClientDetails',
  data () {
    return {
      activeItem: 
        [
          'portal',
          'files',
          'notes',
          'pending',
          'engagements',
          'account',
        ]
    }
  },
  components:{
    Account,
    ClientEngagements,
    Pending,
    Notes,
    Files,
    Portal,
    //  Modal
    'b-modal': bModal
  },
  directives: {
    'b-modal': bModalDirective
  },
  computed: {
    ...mapGetters(
      [
        'client',
        'engagement'
      ]
      )
  },
  methods: {
    deleteClient(id) {
      this.$store.dispatch('deleteClient', id)
      .then(() => {
        this.$router.push({path: '/clients'});
      })
    },
    showModal () {
      this.$refs.myModalRef.show()
    },
    hideModal () {
      this.$refs.myModalRef.hide()
    },
    isActive: function (menuItem) {
      return this.activeItem === menuItem
    },
  },
  created: function(){
    this.$store.dispatch('getDetails', this.$route.params.id);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

#account, #engagements, #pending, #notes, #files, #portal {
  border: none;
  color:  rgb(29, 29, 29);
}
.nav-link {
 padding-left: 5px;
 padding-right: 5px;
 font-weight: regular;
 font-size: 18px;
 color: rgb(185, 179, 179);

 &:hover {
   border-bottom: 3px solid rgb(150, 227, 255);
 }
}

.active {
  border-bottom: 3px solid #0077ff;
  color: #181818;
}


</style>