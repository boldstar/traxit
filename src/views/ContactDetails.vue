<template>
<div class="page-wrapper mt-1">
<!-- this is the go back button -->
<Alert v-if="alert" v-bind:message="alert" />
<Alert v-if="successAlert" v-bind:message="successAlert" />
  <div>
    <router-link class="float-left btn btn-secondary btn-sm mt-3" to="/contacts"><i class="far fa-arrow-alt-circle-left mr-2"></i>Contacts</router-link>  
  </div>

<!-- this is the setting dropdown -->
  <div class="float-right mt-3">
    <div class="dropdown">
      <button class="btn btn-sm btn-outline-primary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <i class="fas fa-cog mr-2"></i>
        Settings
      </button>
      <div class="dropdown-menu dropdown-menu-right mr-0" aria-labelledby="dropdownMenu2">
        <router-link :to="'/contact/' + client.id + '/account/' + 'edit'" class="dropdown-item"><i class="fas fa-pencil-alt"></i><span class="ml-2 pl-4">Edit Contact</span></router-link>
        <router-link :to="'/contact/' + client.id + '/account/' + 'add-business'" class="dropdown-item"><i class="far fa-building"></i><span class="ml-2 pl-4">Add Business</span></router-link>
        <router-link :to="'/contact/' + client.id + '/account/' + 'add-dependent'" class="dropdown-item"><i class="far fa-plus-square"></i><span class="ml-2 pl-4">Add Dependent</span></router-link>
        <div class="dropdown-divider"></div>
        <b-btn v-if="$can('delete', client)" class="dropdown-item text-danger" @click="showModal = !showModal"><i class="fas fa-trash"></i><span class="ml-2">Delete Account</span></b-btn>
      </div>
    </div>

      <!-- this is the modal popup for confirming the delete action -->
    <b-modal v-model="showModal" id="myModal" ref="myModalRef" hide-footer title="Delete Client">
      <div class="d-block text-left">
        <h5>Are you sure you want to delete the {{client.last_name}} account?</h5>
        <br>
        <p><strong>*Warning:</strong> Can not be undone once deleted.</p>
      </div>
      <div class="d-flex">
        <b-btn class="mt-3" variant="danger" @click="showModal = false">Cancel</b-btn>
        <b-btn class="mt-3 ml-auto" variant="outline-success" @click="deleteClient(client.id)">Confirm</b-btn>
      </div>
    </b-modal>
  </div>


<!-- this is the tab links for the different views -->
  <div class="d-flex justify-content-center">
    <ul class="nav mb-3" id="myTab" role="tablist">
      <li class="nav-item" v-bind:class="{ 'is-active' : isClicked }" >
        <router-link :to="{ path: 'account' }" class="nav-link mx-3" data-toggle="tab" href="#account" role="tab"><i class="pr-2 far fa-address-card"></i>Account</router-link>
      </li>
      <li class="nav-item" v-bind:class="{ 'is-active' : isClicked }">
        <router-link  :to="{ path: 'engagements' }" class="nav-link mx-3" data-toggle="tab" href="#engagements" role="tab" ><i class="pr-2 far fa-folder-open"></i>Engagements</router-link>
      </li>
      <li class="nav-item" v-bind:class="{ 'is-active' : isClicked }">
        <router-link  :to="{ path: 'pending' }" class="nav-link mx-3" data-toggle="tab" href="#pending" role="tab"><i class="pr-2 far fa-question-circle"></i>Pending</router-link>
      </li>
      <li class="nav-item" v-bind:class="{ 'is-active' : isClicked }">
        <router-link  :to="{ path: 'notes' }" class="nav-link mx-3" data-toggle="tab" href="#notes" role="tab"><i class="pr-2 far fa-clipboard"></i>Notes</router-link>
      </li>
      <!-- <li class="nav-item" v-bind:class="{ 'is-active' : isClicked }"> 
        <router-link  :to="{ path: 'files' }" class="nav-link mx-3" data-toggle="tab" href="#files" role="tab"><i class="pr-2 fas fa-file-download"></i>Files</router-link>
      </li> -->
      <li class="nav-item" v-bind:class="{ 'is-active' : isClicked }">
        <router-link  :to="{ path: 'portal' }" class="nav-link mx-3" data-toggle="tab" href="#portal" role="tab"><i class="pr-2 fas fa-sign-in-alt"></i>Portal</router-link>
      </li>
    </ul>
  </div>



  <div class="tab-content" id="myTabContent">   
    <!-- these are the panes for the different tab views -->
    <div class="tab-pane fade show active" role="tabpanel">
       <router-view></router-view>
    </div>
  </div>

</div>
</template>

<script>
import { mapGetters } from 'vuex'
import Alert from '@/components/Alert.vue'
import bModal from 'bootstrap-vue/es/components/modal/modal'
import bModalDirective from 'bootstrap-vue/es/directives/modal/modal'




export default {
  name: 'ContactDetails',
  data () {
    return {
      isClicked: false,
      showModal: false,
      alert: ''
    }
  },
  components:{
    'b-modal': bModal,
    Alert,
  },
  directives: {
    'b-modal': bModalDirective
  },
  computed: {
    ...mapGetters(
        [
          'client',
          'engagement',
          'successAlert'
        ]
      )
  },
  methods: {
    deleteClient(id) {
      this.$store.dispatch('deleteClient', id)
      .then(() => {
        this.$router.push({path: '/contacts'});
      })
    },
    isActive: function (menuItem) {
      return this.activeItem === menuItem
    },
  },
  watch: {
      $route (to, from) {
        if(this.$route.query.alert) {
          this.alert  = this.$route.query.alert;
          this.$router.replace({path: '/contact/' +this.client.id+ '/account'});
          setTimeout(() => {
            this.alert = '';
          }, 10000)
        }    
    }
  },
  created: function(){
    this.$store.dispatch('getDetails', this.$route.params.id)
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
   border-bottom: 3px solid #0077ff;
 }
}

.is-active {
  border-bottom: 3px solid transparent;
  color: #181818;

  i {
    color: #0077ff;
  }
}



</style>