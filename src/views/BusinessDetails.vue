<template>
  <div class="page-wrapper mt-1 business-details">
  <!-- this is the go back button -->
  <Alert v-if="alert" v-bind:message="alert" />
  <Alert v-if="successAlert" v-bind:message="successAlert" />

    <div class="business-content" v-if="businessDetails">
      <div class="business-content-header">
        <h5>{{businessDetails.business_name}}</h5>

        <div class="float-right settings-dropdown">
          <div class="dropdown">
            <button class="btn btn-sm btn-outline-primary dropdown-toggle settings-btn" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <i class="fas fa-cog mr-2"></i>
              Options
            </button>
            <div class="dropdown-menu dropdown-menu-right mr-0" aria-labelledby="dropdownMenu2">
              <router-link :to="'/business/' + businessDetails.id + '/details/' + 'edit'" class="dropdown-item"><i class="fas fa-pencil-alt"></i><span class="ml-2 pl-4">Edit Business</span></router-link>
              <router-link :to="'/business/' + businessDetails.id + '/engagements/add'" class="dropdown-item"><i class="fas fa-plus-square"></i><span class="ml-2 pl-4">Add Engagement</span></router-link>
            </div>
          </div>
        </div>
      </div>

      <div class="d-flex">
        <div class="col-2 mr-3 pl-2">
          <ul class="list-group business-sidebar" id="myTab" role="tablist">
            <li class="list-group-item" :class="{ 'selected-list-item' : $route.name == 'account-details' }"  @click="goTo('details')">
              <router-link :to="{ path: '/business/' + businessDetails.id + '/details' }" class="business-link" data-toggle="tab" role="tab">Details</router-link>
            </li>
            <li class="list-group-item" :class="{ 'selected-list-item' : $route.name == 'business-engagements' }"  @click="goTo('engagements')">
              <router-link  :to="{ path: '/business/' + businessDetails.id +'/engagements' }" class="business-link" data-toggle="tab" role="tab" >Engagements</router-link>
              <span class="business-sidebar-badge" v-if="engagementsLength > 0">{{engagementsLength}}</span>
            </li>
            <li class="list-group-item" :class="{ 'selected-list-item' : $route.name == 'business-services' }"  @click="goTo('services')">
              <router-link  :to="{ path: '/business/' + businessDetails.id +'/services' }" class="business-link" data-toggle="tab" role="tab" >Services</router-link>
            </li>
            <li class="list-group-item" :class="{ 'selected-list-item' : $route.name == 'business-notes' }"  @click="goTo('notes')">
              <router-link  :to="{ path: '/business/' + businessDetails.id +'/notes' }" class="business-link" data-toggle="tab" role="tab" >Notes</router-link>
            </li>
            <li class="list-group-item" :class="{ 'selected-list-item' : $route.name == 'business-bookkeeping' }"  @click="goTo('bookkeeping')">
              <router-link  :to="{ path: '/business/' + businessDetails.id +'/bookkeeping' }" class="business-link" data-toggle="tab" role="tab" >Bookkeeping</router-link>
            </li>
            <li class="list-group-item" :class="{ 'selected-list-item' : $route.name == 'business-owner' }"  @click="goTo('owner')">
              <router-link  :to="{ path: '/business/' + businessDetails.id +'/owner' }" class="business-link" data-toggle="tab" role="tab" >Owner</router-link>
            </li>
          </ul>
        </div>

        <div class="tab-content" id="myTabContent">
          <div class="tab-pane fade show active" role="tabpanel">
            <router-view  
              :business="businessDetails" 
              :engagements="businessEngagements"
              :contact="businessDetails.client"
            >
            </router-view>
          </div>
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
      ),
      engagementsLength() {
        return this.businessEngagements.filter(eng =>  eng.name == this.businessDetails.business_name).length
      }
  },
  methods: {
    goTo(path) {
      this.$router.push({path: '/business/' + this.businessDetails.id + '/' + path})
    }
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

.business-content {
  display: flex;
  flex-direction: column;

  .business-content-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  .list-group-item {

    .business-link {
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

  .business-sidebar {
    position: -webkit-sticky;
    position: sticky;
    top: 0;

    li {
      position: relative;

    .business-sidebar-badge {
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

.tab-content {
  flex-grow: 1;
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