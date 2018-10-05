<template>
  <div class="page-wrapper mt-1">
    <!-- this is to view the details of the engagement and will be hidden if the following route does not match -->
    <div v-if="!detailsLoaded">
    <div v-if="$route.name == 'engagement-details'">

      <Alert v-if="alert" v-bind:message="alert" />

      <div class="flex-row justify-content-between d-flex my-3">
        <span class="h4 align-self-end m-0 text-left">Details | <strong class="text-primary"><router-link :to="'/contact/' +engagement.client.id + '/account'">{{ engagement.client.last_name}}, {{ engagement.client.first_name}} & {{ engagement.client.spouse_first_name}}</router-link></strong></span>
        <div>
        <router-link to="/engagements" class="btn btn-outline-secondary mr-4"><i class="fas fa-arrow-circle-left mr-2"></i>All Engagements</router-link>
        <router-link class="btn btn-primary mr-3" :to="'/engagement/' +this.engagement.id+ '/edit'"><i class="far fa-edit mr-2"></i>Edit</router-link> 
        <b-btn class="outline-secondary" v-b-modal.myEngage><i class="fas fa-trash"></i><span class="ml-2">Delete</span></b-btn>
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

      <div class="d-flex justify-content-between h4">
          <div>
            <span>
              Questions |
            </span>
            <span class="text-primary font-weight-bold">{{ engagement.questions.length }}</span>    
          </div>
          <span><router-link :to="'/engagement/' + engagement.id + '/add-question'" class="btn btn-sm btn-primary"><i class="far fa-plus-square mr-2"></i>Question</router-link></span>
      </div>

      <hr class="mb-4">

      <!-- this is the modal to confirm or cancel the delete for the engagement -->
      <b-modal id="myEngage" ref="myEngage" hide-footer title="Delete Engagement">
        <div class="d-block text-left">
          <h5>Are you sure you want to delete engagement?</h5>
          <br>
          <p><strong>*Warning:</strong> Can not be undone once deleted.</p>
        </div>
        <div class="d-flex">
          <b-btn class="mt-3" variant="danger" @click="hideEngageModal">Cancel</b-btn>
          <b-btn class="mt-3 ml-auto" variant="outline-success" @click="deleteEngagement(engagement.id)">Confirm</b-btn>
        </div>
      </b-modal>

  </div>

    <!-- using v-modal for showing modal for question because there seems to be a bug with deep nested modals   -->
    <div class="card mb-3"  v-for="(question, index) in engagement.questions" :key="index" v-if="$route.name == 'engagement-details'">
        <div class="card-header">
          <div class="h6 m-0 justify-content-between d-flex">
            <router-link class="btn btn-sm btn-primary mr-3" to="#" ><i class="far fa-edit mr-2"></i>Edit</router-link> 
            <b-btn class="outline-secondary" size="sm" @click="modalShow = !modalShow"><i class="fas fa-trash"></i><span class="ml-2">Delete</span></b-btn>
          </div>
        </div>
        <div class="card-body bg-light d-flex justify-content-between">
          <div class="h4 mr-5 text-left">
            {{ question.question }}
          </div>
          <div class="ml-5 d-flex align-self-center">
            <span class="font-weight-bold mr-2">Answered: </span>
            <input class="mt-2" type="checkbox" v-model="question.answered">
          </div>
        </div>


          <!-- this is the modal for deleting a question -->
        <b-modal v-model="modalShow" id="myQuestion" ref="myQuestion" hide-footer title="Delete Question">
          <div class="d-block text-left">
            <h5>Are you sure you want to delete question?</h5>
            <br>
            <p><strong>*Warning:</strong> Can not be undone once deleted.</p>
          </div>
          <div class="d-flex">
            <b-btn class="mt-3" variant="danger" @click="modalShow = false">Cancel</b-btn>
            <b-btn class="mt-3 ml-auto" variant="outline-success" @click="deleteQuestion(engagement, question.id)">Confirm</b-btn>
          </div>
        </b-modal>
      
      </div>

    </div>


    <div v-if="detailsLoaded" class="lds-dual-ring justify-content-center"></div>

<!-- this will show the child view if the route matches-->
  <router-view ></router-view>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Alert from '@/components/Alert.vue'
import bModal from 'bootstrap-vue/es/components/modal/modal'
import bModalDirective from 'bootstrap-vue/es/directives/modal/modal'

export default {
  name: 'EngagementDetails',
  data() {
    return {
      detailsLoaded: false,
      alert: '',
      modalShow: false,
    }
  },
  components:{
    'b-modal': bModal,
    Alert
  },
  directives: {
    'b-modal': bModalDirective
  },
  computed: {
    ...mapGetters(
        [
          'engagement',
          'question'
        ]
      ),
  },
  methods: {
    deleteEngagement(id) {
      this.$store.dispatch('deleteEngagement', id)
      .then(() => {
        this.$router.push({path: '/engagements', query: {alert: 'Engagement Was Succesfully Deleted'}});
      })
    },
    deleteQuestion(engagement, id) {
      this.$store.dispatch('deleteQuestion', id)
      .then(() => {
        this.modalShow = false
        this.$router.push({path: '/engagement/' +this.engagement.id , query: {alert: 'The Question Was Succesfully Deleted'}});
      })
    },
    showQuestionModal () {
      this.$refs.myQuestion.show()
    },
    hideQuestionModal () {
      this.$refs.myQuestion.data.is_hidden = true
    },
    showEngageModal () {
      this.$refs.myEngage.show()
    },
    hideEngageModal () {
      this.$refs.myEngage.hide()
    },
    isActive: function (menuItem) {
      return this.activeItem === menuItem
    },
  },
  watch: {
      $route (to, from) {
        if(this.$route.query.alert) {
          this.alert  = this.$route.query.alert;
          setTimeout(() => {
            this.alert = '';
            this.$router.replace({path: '/engagment/' +this.engagement.id});
          }, 10000)
        }    
    }
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
