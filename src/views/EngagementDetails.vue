<template>
  <div class="page-wrapper mt-1">
    <!-- this is to view the details of the engagement and will be hidden if the following route does not match -->
    <div v-if="!detailsLoaded">
    <div v-if="$route.name == 'engagement-details'">
      <div class="flex-row justify-content-between d-flex my-3">
        <span class="h4 align-self-end m-0 text-left">Details | <strong class="text-primary"><router-link :to="'/contact/' +engagement.client.id + '/account'">{{ engagement.client.last_name}}, {{ engagement.client.first_name}} & {{ engagement.client.spouse_first_name}}</router-link></strong></span>
        <div>
        <router-link to="/engagements" class="btn btn-outline-secondary mr-4"><i class="fas fa-arrow-circle-left mr-2"></i>All Engagements</router-link>
        <router-link class="btn btn-primary mr-3" :to="'/engagement/' +this.engagement.id+ '/edit'"><i class="far fa-edit mr-2"></i>Edit</router-link> 
        <b-btn class="outline-secondary" v-b-modal.myModal><i class="fas fa-trash"></i><span class="ml-2">Delete</span></b-btn>
        </div>
      </div>  

      <hr>

      
      <!-- this is the table for the details of the engagement -->
      <div class="card-body bg-light my-4 py-2 px-3"> 
        <table class="table table-bordered h3 mt-3">
          <thead class="text-primary">
            <tr>
              <th class="py-4" scope="col">Return Type</th>
              <th class="py-4" scope="col">Year</th>
              <th class="py-4" scope="col">Assigned To</th>
              <th class="py-4" scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th class="py-5">{{ engagement.return_type}}</th>
              <th class="py-5">{{ engagement.year }}</th>
              <th class="py-5">{{ engagement.assigned_to}}</th>
              <th class="py-5">{{ engagement.status }}</th>
            </tr>
          </tbody>
        </table> 
      </div>

      <!-- this is the section where the qustions will go -->
      <hr>

      <div class="d-flex justify-content-between h3">
          <span><i class="far fa-question-circle text-primary"></i></span>
          <div>    
              Questions
          </div>
          <span><router-link :to="'/contact/' +engagement.client.id + '/account'"><i class="far fa-plus-square"></i></router-link></span>
      </div>

      <hr>
    </div>


<!-- this is the modal to confirm or cancel the delete -->
      <b-modal id="myModal" ref="myModalRef" hide-footer title="Delete Client">
        <div class="d-block text-left">
          <h5>Are you sure you want to delete engagement?</h5>
          <br>
          <p><strong>*Warning:</strong> Can not be undone once deleted.</p>
        </div>
        <div class="d-flex">
          <b-btn class="mt-3" variant="danger" @click="hideModal">Cancel</b-btn>
          <b-btn class="mt-3 ml-auto" variant="outline-success" @click="deleteEngagement(engagement.id)">Confirm</b-btn>
        </div>
      </b-modal>
    </div>

    <div v-if="detailsLoaded" class="lds-dual-ring justify-content-center"></div>

<!-- this will show the edit view if the route matches the v-if below -->
  <router-view v-if="$route.path == '/engagement/' +this.engagement.id+ '/edit'"></router-view>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import bModal from 'bootstrap-vue/es/components/modal/modal'
import bModalDirective from 'bootstrap-vue/es/directives/modal/modal'

export default {
  name: 'EngagementDetails',
  data() {
    return {
      detailsLoaded: false,
    }
  },
  components:{
    'b-modal': bModal
  },
  directives: {
    'b-modal': bModalDirective
  },
  computed: {
    ...mapGetters(
        [
          'engagement'
        ]
      )
  },
  methods: {
    deleteEngagement(id) {
      this.$store.dispatch('deleteEngagement', id)
      .then(() => {
        this.$router.push({path: '/engagements'});
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
    this.$store.dispatch('getEngagement', this.$route.params.id);
    this.detailsLoaded = true;
    var self = this;
    setTimeout(() => {
        self.detailsLoaded = false;
    }, 3000)
  }
  
}
</script>


<style scoped lang="scss">

</style>
