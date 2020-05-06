<template>
<div class="page-wrapper mt-1 contact-details">
<!-- this is the go back button -->
<Alert v-if="alert" v-bind:message="alert" />
<Alert v-if="successAlert" v-bind:message="successAlert" />

  <div class="contact-content">
    <div class="contact-content-header">
      <span class="h4">{{client.last_name}}</span>
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
      <div class="d-flex contact-nav-links">
        <div class="col-2 mr-3 pl-0">
          <ul class="list-group contact-sidebar" id="myTab" role="tablist">
            <li class="list-group-item" v-bind:class="{ 'selected' : $route.name == 'account' }" @click="goTo('account')">
              <router-link :to="{ path: '/contact/' + client.id + '/account' }" class="contact-link" data-toggle="tab" role="tab">Account</router-link>
            </li>
            <li class="list-group-item" v-bind:class="{ 'selected' : $route.name == 'contact-dependents' }" @click="goTo('contact-dependents')">
              <router-link  :to="{ path: '/contact/' + client.id +'/contact-dependents' }" class="contact-link" data-toggle="tab" role="tab">Dependents</router-link>
            </li>
            <li class="list-group-item" v-bind:class="{ 'selected' : $route.name == 'contact-businesses' }" @click="goTo('contact-businesses')">
              <router-link :to="{ path: '/contact/' + client.id +'/contact-businesses' }" class="contact-link" data-toggle="tab" role="tab" >Businesses</router-link>
            </li>
            <li class="list-group-item" v-bind:class="{ 'selected' : $route.name == 'contact-engagements' }" @click="goTo('engagements')">
              <router-link  :to="{ path: '/contact/' + client.id +'/engagements' }" class="contact-link" data-toggle="tab" role="tab" >Engagements</router-link>
            </li>
            <li class="list-group-item" v-bind:class="{ 'selected' : $route.name == 'pending' }" @click="goTo('pending')">
              <router-link  :to="{ path: '/contact/' + client.id + '/pending' }" class="contact-link" data-toggle="tab" role="tab">Pending</router-link>
            </li>
            <li class="list-group-item" v-bind:class="{ 'selected' : $route.name == 'notes' }" @click="goTo('notes')">
              <router-link  :to="{ path: '/contact/' + client.id + '/notes' }" class="contact-link" data-toggle="tab" role="tab">Notes</router-link>
            </li>
            <li class="list-group-item" v-bind:class="{ 'selected' : $route.name == 'portal' }" @click="goTo('portal')">
              <router-link  :to="{ path: '/contact/' + client.id + '/portal' }" class="contact-link" data-toggle="tab" role="tab">Portal</router-link>
            </li>
            <li class="list-group-item" v-bind:class="{ 'selected' : $route.name == 'contact-settings' }" @click="goTo('contact-settings')">
              <router-link :to="{ path: '/contact/' + client.id +'/contact-settings' }" class="contact-link" data-toggle="tab" role="tab">Settings</router-link>
            </li>
          </ul>
        </div>

        <div class="tab-content flex-fill" id="myTabContent">   
          <!-- these are the panes for the different tab views -->
          <div class="tab-pane fade show active" role="tabpanel" v-if="client['id']">
            <router-view  :clientDetails="client"></router-view>
          </div>
        </div>
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
</template>

<script>
import { mapGetters } from 'vuex'
import Alert from '@/components/alerts/Alert.vue'
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
    goTo(path) {
      this.$router.push({path: '/contact/' + this.client.id + '/' + path})
    }
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
  }

  .selected {
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