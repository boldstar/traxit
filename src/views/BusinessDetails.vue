<template>
<div class="page-wrapper mt-1 business-details">
<!-- this is the go back button -->
<Alert v-if="alert" v-bind:message="alert" />
<Alert v-if="successAlert" v-bind:message="successAlert" />

  <div class="business-content">
    <div class="d-flex justify-content-between business-nav">
    <div class="contacts-link">
      <router-link class="float-left btn btn-secondary btn-sm mt-3" to="/contacts"><i class="far fa-arrow-alt-circle-left mr-2"></i>Business List</router-link>  
    </div>

    <!-- this is the tab links for the different views -->
      <div class="d-flex justify-content-center business-nav-links" v-if="businessDetails">
        <ul class="nav mb-3" id="myTab" role="tablist">
          <li class="nav-item" v-bind:class="{ 'is-active' : isClicked }" >
            <router-link :to="{ path: '/business/' + businessDetails.id + '/details' }" class="nav-link mx-3" data-toggle="tab" role="tab"><i class="pr-2 far fa-address-card"></i>Account</router-link>
          </li>
          <li class="nav-item" v-bind:class="{ 'is-active' : isClicked }">
            <router-link  :to="{ path: '/business/' + businessDetails.id +'/engagements' }" class="nav-link mx-3" data-toggle="tab" role="tab" ><i class="pr-2 far fa-folder-open"></i>Engagements</router-link>
          </li>
        </ul>
      </div>

      <div class="float-right mt-3 settings-dropdown" v-if="businessDetails">
        <div class="dropdown">
          <button class="btn btn-sm btn-outline-primary dropdown-toggle settings-btn" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i class="fas fa-cog mr-2"></i>
            Settings
          </button>
          <div class="dropdown-menu dropdown-menu-right mr-0" aria-labelledby="dropdownMenu2">
            <router-link :to="'/business/' + businessDetails.id + '/details/' + 'edit'" class="dropdown-item"><i class="fas fa-pencil-alt"></i><span class="ml-2 pl-4">Edit Business</span></router-link>
            <router-link :to="'/business/' + businessDetails.id + '/engagements/add'" class="dropdown-item"><i class="fas fa-plus-square"></i><span class="ml-2 pl-4">Add Engagement</span></router-link>
          </div>
        </div>
      </div>
    </div>



    <div class="tab-content" id="myTabContent">   
      <!-- these are the panes for the different tab views -->
      <div class="tab-pane fade show active" role="tabpanel" v-if="businessDetails">
        <router-view  :business="businessDetails" :engagements="businessEngagements"></router-view>
      </div>
    </div>
  </div>

</div>
</template>

<script>
import { mapGetters } from 'vuex'
import Alert from '@/components/alerts/Alert.vue'
import bModal from 'bootstrap-vue/es/components/modal/modal'
import bModalDirective from 'bootstrap-vue/es/directives/modal/modal'

export default {
  name: 'BusinessDetails',
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
          'businessDetails',
          'businessEngagements',
          'successAlert'
        ]
      )
  },
  methods: {
    isActive: function (menuItem) {
      return this.activeItem === menuItem
    },
  },
  created: function(){
    this.$store.dispatch('getBusinessDetails', this.$route.params.id)
    this.$store.dispatch('getBusinessEngagements', this.$route.params.id)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

#account, #engagements {
  border: none;
  color:  rgb(29, 29, 29);
}
.nav-link {
 padding-left: 5px;
 padding-right: 5px;
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

.business-content {
  display: flex;
  flex-direction: column;
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

  .business-nav {
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

  .business-content {
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

  .business-nav {
    width: 100%!important;
    flex-direction: row!important;
  }

  .business-content {
    flex-direction: column!important;
    align-items: center!important;
  }

  .business-nav-links {
    align-self: center!important;
  }

  .settings-dropdown {
    margin-bottom: 10px!important;
  }
}
</style>