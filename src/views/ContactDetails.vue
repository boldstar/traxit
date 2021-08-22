<template>
<div class="page-wrapper mt-1 contact-details">
<!-- this is the go back button -->
<Alert v-if="alert" v-bind:message="alert" />
<Alert v-if="successAlert" v-bind:message="successAlert" />

  <div class="contact-content"  v-if="client && client['id'] && !loading">
    <div class="contact-content-header">
      <span class="h4" v-if="client && client.last_name">{{contactName}}</span>
      <div class="dropdown">
        <button class="btn btn-sm btn-outline-primary dropdown-toggle settings-btn" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <i class="fas fa-cog mr-2"></i>
          Options
        </button>
        <div class="dropdown-menu dropdown-menu-right mr-0" aria-labelledby="dropdownMenu2">
          <router-link :to="'/contact/' + client.id + '/account/' + 'edit'" class="dropdown-item"><i class="fas fa-pencil-alt"></i><span class="ml-2 pl-4">Edit Contact</span></router-link>
          <router-link :to="'/contact/' + client.id + '/account/business/' + 0" class="dropdown-item"><i class="far fa-building"></i><span class="ml-2 pl-4">Add Business</span></router-link>
          <router-link :to="'/contact/' + client.id + '/account/dependent/' + 0" class="dropdown-item"><i class="far fa-plus-square"></i><span class="ml-2 pl-4">Add Dependent</span></router-link>
          <div class="dropdown-divider"></div>
          <b-btn v-if="$can('delete', client)" class="dropdown-item text-danger" @click="showModal = !showModal"><i class="fas fa-trash"></i><span class="ml-2">Delete Account</span></b-btn>
        </div>
      </div>
    </div>

    <!-- this is the tab links for the different views -->
      <div class="d-flex">
        <div class="col-2 mr-3 pl-2">
          <ul class="list-group contact-sidebar" id="myTab" role="tablist">
            <li class="list-group-item" v-bind:class="{ 'selected-list-item' : $route.name == 'account' }" @click="goTo('account')">
              <router-link :to="{ path: '/contact/' + client.id + '/account' }" class="contact-link" data-toggle="tab" role="tab">Contacts</router-link>
            </li>
            <li class="list-group-item" v-bind:class="{ 'selected-list-item' : $route.name == 'contact-dependents' }" @click="goTo('contact-dependents')">
              <router-link  :to="{ path: '/contact/' + client.id +'/contact-dependents' }" class="contact-link" data-toggle="tab" role="tab">Dependents</router-link>
               <span class="contact-sidebar-badge" v-if="client.dependents.length > 0">{{client.dependents.length}}</span>
            </li>
            <li class="list-group-item" v-bind:class="{ 'selected-list-item' : $route.name == 'contact-businesses' }" @click="goTo('contact-businesses')">
              <router-link :to="{ path: '/contact/' + client.id +'/contact-businesses' }" class="contact-link" data-toggle="tab" role="tab" >Businesses</router-link>
              <span class="contact-sidebar-badge" v-if="client.businesses.length > 0">{{client.businesses.length}}</span>
            </li>
            <li class="list-group-item" v-bind:class="{ 'selected-list-item' : $route.name == 'contact-engagements' }" @click="goTo('engagements')">
              <router-link  :to="{ path: '/contact/' + client.id +'/engagements' }" class="contact-link" data-toggle="tab" role="tab" >Engagements</router-link>
              <span class="contact-sidebar-badge" v-if="client.engagements.length > 0">{{client.engagements.length}}</span>
            </li>
            <li class="list-group-item" v-bind:class="{ 'selected-list-item' : $route.name == 'pending' }" @click="goTo('pending')">
              <router-link  :to="{ path: '/contact/' + client.id + '/pending' }" class="contact-link" data-toggle="tab" role="tab">Pending</router-link>
            </li>
            <li class="list-group-item" v-bind:class="{ 'selected-list-item' : $route.name == 'notes' }" @click="goTo('notes')">
              <router-link  :to="{ path: '/contact/' + client.id + '/notes' }" class="contact-link" data-toggle="tab" role="tab">Notes</router-link>
              <span class="contact-sidebar-badge" v-if="client.notes.length > 0">{{client.notes.length}}</span>
            </li>
            <li class="list-group-item" v-bind:class="{ 'selected-list-item' : $route.name == 'portal' }" @click="goTo('portal')">
              <router-link  :to="{ path: '/contact/' + client.id + '/portal' }" class="contact-link" data-toggle="tab" role="tab">Portal</router-link>
            </li>
            <li class="list-group-item" v-bind:class="{ 'selected-list-item' : $route.name == 'contact-settings' }" @click="goTo('contact-settings')">
              <router-link :to="{ path: '/contact/' + client.id +'/contact-settings' }" class="contact-link" data-toggle="tab" role="tab">Settings</router-link>
            </li>
          </ul>
        </div>

        <div class="tab-content flex-fill" id="myTabContent">   
          <!-- these are the panes for the different tab views -->
          <div class="tab-pane fade show active" role="tabpanel">
            <router-view  
              :clientDetails="client" 
              :businesses="client.businesses" 
              :dependents="client.dependents"
              @delete-client="requestDelete"
              @delete-business="requestDeleteBusiness"
            ></router-view>
          </div>
        </div>
      </div>
    </div>

    <Spinner v-else/>

      <!-- this is the modal popup for confirming the delete action -->
    <b-modal v-model="showModal" id="myModal" ref="myModalRef" hide-footer title="Delete Client">
      <div class="d-block text-left">
        <h5 v-if="client">Are you sure you want to delete the {{client.last_name}} account?</h5>
        <br>
        <p><strong>*Warning:</strong> Can not be undone once deleted.</p>
      </div>
      <div class="d-flex">
        <b-btn class="mt-3" variant="danger" @click="showModal = false">Cancel</b-btn>
        <b-btn class="mt-3 ml-auto" variant="outline-success" @click="deleteClient">Confirm</b-btn>
      </div>
    </b-modal>

      <!-- this is the modal popup for confirming the delete action -->
    <b-modal v-model="showModalBusiness" id="myModal" ref="myModalRefBusiness" hide-footer title="Delete Business">
      <div class="d-block text-left">
        <h5 v-if="client">Are you sure you want to delete the business?</h5>
        <br>
        <p><strong>*Warning:</strong> Can not be undone once deleted.</p>
      </div>
      <div class="d-flex">
        <b-btn class="mt-3" variant="danger" @click="showModalBusiness = false">Cancel</b-btn>
        <b-btn class="mt-3 ml-auto" variant="outline-success" @click="deleteBusiness">Confirm</b-btn>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Alert from '@/components/alerts/Alert.vue'
import bModal from 'bootstrap-vue/es/components/modal/modal'
import bModalDirective from 'bootstrap-vue/es/directives/modal/modal'
import Spinner from '@/components/loaders/Spinner'
export default {
  name: 'ContactDetails',
  data () {
    return {
      isClicked: false,
      showModal: false,
      showModalBusiness: false,
      selectedBusiness : null,
      alert: '',
      loading: false
    }
  },
  components:{
    'b-modal': bModal,
    Alert,
    Spinner
  },
  directives: {
    'b-modal': bModalDirective
  },
  computed: {
    ...mapGetters(
        [
          'client',
          'successAlert',
          'browserHistory'
        ]
      ),
      contactName() {
        if(this.client) {
          if(this.client.spouse_first_name && this.client.spouse_last_name) {
            return  this.client.last_name + ', ' + this.client.first_name + ' & ' + this.client.spouse_last_name + ', ' + this.client.spouse_first_name
          } else if (this.client.spouse_first_name) {
            return  this.client.last_name + ', ' + this.client.first_name + ' & ' +  this.client.spouse_first_name 
          } else {
            return this.client.last_name + ', ' + this.client.first_name
          }
        }
      }
  },
  methods: {
    requestDelete() {
      this.showModal = true
    },
    deleteClient() {
      this.$store.dispatch('deleteClient', this.client.id)
      .then(() => {
        this.$router.push({path: '/contacts'});
      })
    },
    isActive: function (menuItem) {
      return this.activeItem === menuItem
    },
    goTo(path) {
      this.$router.push({path: '/contact/' + this.client.id + '/' + path})
    },
    requestDeleteBusiness(id) {
      this.selectedBusiness = id
      this.showModalBusiness = true
    },
    deleteBusiness() {
      this.$store.dispatch('deleteBusiness', this.selectedBusiness)
      this.showModalBusiness = false
    }
  },
  watch: {
      $route (to, from) {
        if(this.browserHistory) {
          this.loading = true
          var self = this
          this.$store.dispatch('getDetails', this.$route.params.id)
          setTimeout(() => {
            self.loading = false
          }, 2000)
        }
        if(this.$route.query.alert) {
          this.alert  = this.$route.query.alert;
          this.$router.replace({path: '/contact/' +this.client.id+ '/account'});
          setTimeout(() => {
            this.alert = '';
          }, 10000)
        }    
    }
  },
  beforeDestroy() {
    this.$store.commit('getDetails', null)
  },
  created: function(){
    this.$store.dispatch('getDetails', this.$route.params.id)
    this.loading = true
    var self = this
    setTimeout(() => {
      self.loading = false
    }, 2000)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

#account, #engagements, #pending, #notes, #files, #portal {
  border: none;
  color:  rgb(29, 29, 29);
}

.contact-content {
  display: flex;
  flex-direction: column;

  .contact-content-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  .list-group-item {

    .contact-link {
      color: rgb(158, 158, 158);

      &:hover {
        text-decoration: none;
      }
    }


    .is-active {
      color: #0077ff;
      font-weight: bold;
    }

    &:hover {
      background: rgb(235, 235, 235);
      cursor: pointer;
    }
  }

  .contact-sidebar {
    position: -webkit-sticky;
    position: sticky;
    top: 0;

    li {
      position: relative;

    .contact-sidebar-badge {
        position: absolute;
        background: #0077ff;
        color: white;
        font-weight: bold;
        padding: 0 10px;
        border-radius: 5px;
        font-size: .8rem;
        right: 5px;
        top: 15px;
      }
    }
  }

  .selected-list-item {
    border-left: 3px solid #0077ff;
  }

}

@media screen and (max-width: 1300px) {
  .contacts-link {
    display: none;
  }
}

@media screen and (max-width: 1180px) {
  .tab-content  {
    float: right!important;
    width: 100%!important;
  }

  .contact-nav {
    flex-direction: column!important;
    align-items: flex-start!important;
    align-self: flex-start!important;
  }

  .nav {
    flex-direction: column!important;
    align-items: flex-start!important;
    text-align: left;
    max-width: 150px!important;
  }

  .nav-link {
    font-size: .8rem!important;
  }

  .settings-dropdown {
    float: left!important;
    display: flex!important;
  }

  .contact-content {
    flex-direction: row!important;
  }

   a .nav-link {
    margin-left: 0!important;
  }

  
  i {
    display: none!important;
  }
}


@media screen and (max-width: 767px) {
  .nav {
    flex-direction: row!important;
    max-width: 100%!important;
    margin-bottom: 0!important;
  }

  .contact-nav {
    width: 100%!important;
    flex-direction: row!important;
  }

  .contact-content {
    flex-direction: column!important;
    align-items: center!important;
  }

  .contact-nav-links {
    align-self: center!important;
  }

  .settings-dropdown {
    margin-bottom: 10px!important;
  }
}
</style>