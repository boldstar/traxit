<template>
  <div class="page-wrapper mt-1">

  <div class="flex-row justify-content-between d-flex my-3">
    <router-link v-bind:to="'/engagement/' +this.engagement.id" class="btn btn-outline-secondary"><i class="fas fa-arrow-circle-left mr-2"></i>Cancel</router-link>
    <div v-if="$can('delete', engagement)">
      <b-btn class="outline-secondary" v-b-modal.myModal><i class="fas fa-trash"></i><span class="ml-2">Delete</span></b-btn> 
    </div>
  </div>  

  <hr>

  <div class="d-flex justify-content-start my-4 h4">
    <div>
      <span class="mr-3"><i class="fas fa-user-edit"></i> </span>
      {{ engagement.name }}
    </div>
  </div>

  <hr>

  <form @submit.prevent="editThisEngagement" class="d-flex-column justify-content-center">
      <div class="form-group">

        <div class="d-flex justify-content-between mb-3 p-2 custom-control custom-checkbox bg-white form-control" v-bind:class="{'input-error' : nothingChecked}" v-if="engagement.type == 'bookkeeping'">
          <div class="d-flex">
            <span class="mr-3 font-weight-bold h6">Monthly</span>
            <input type="checkbox" v-model="monthChecked" class="custom-control-input ml-3" id="customCheck1" @change="selectedMonthRange">
            <label class="custom-control-label ml-3" for="customCheck1"></label>
          </div>
          <div class="d-flex">
            <span class="mr-3 font-weight-bold h6">Quarterly</span>
            <input type="checkbox" v-model="quarterChecked" class="custom-control-input ml-3" id="customCheck2" @change="selectedQuarterRange">
            <label class="custom-control-label ml-3" for="customCheck2"></label>
          </div>
          <div class="d-flex">
            <span class="mr-3 font-weight-bold h6">Annual</span>
            <input type="checkbox" v-model="annualChecked" class="custom-control-input ml-3" id="customCheck3" @change="selectedAnnualRange">
            <label class="custom-control-label ml-3" for="customCheck3"></label>
          </div>
        </div>

        <input type="text" class="form-control mb-3" placeholder="Year" v-model="engagement.year">
        

         <div class="input-group my-3" v-if="monthRange">
          <div class="input-group-prepend">
            <label class="input-group-text text-primary" for="option">Month Of</label>
          </div>
          <select class="form-control" id="type" v-model="engagement.title" name="Title">
              <option v-for="(month, index) in monthly" :key="index" :value="month">{{ month }}</option>
          </select>
        </div>

        <div class="input-group my-3" v-if="quarterRange">
          <div class="input-group-prepend">
            <label class="input-group-text text-primary" for="option">Quarter Of</label>
          </div>
          <select class="form-control" id="type" v-model="engagement.title" name="Title">
              <option v-for="(quarter, index) in quarterly" :key="index" :value="quarter">{{ quarter }}</option>
          </select>
        </div>

        <div class="input-group my-3">
          <div class="input-group-prepend">
            <label class="input-group-text text-primary" for="option">Workflow Type</label>
          </div>
          <select class="form-control" id="client_id" v-model.number="engagement.workflow_id">
            <option v-for="workflow in allWorkflows" :key="workflow.id" :value="workflow.id">
              {{ workflow.workflow }}
            </option>
          </select>
        </div>

       <div class="input-group my-3" v-if="engagement.type == 'taxreturn'">
          <div class="input-group-prepend">
            <label class="input-group-text text-primary" for="option">Return Type</label>
          </div>
          <select class="form-control" id="type" v-model="engagement.return_type">
              <option v-for="type in returnTypes" :key="type.id" :value="type.return_type">{{ type.return_type }}</option>
          </select>
        </div>

        <div class="input-group my-3" :class="{'input-error':assignAUser}" @change="clearAlarm">
        <div class="input-group-prepend">
          <label class="input-group-text text-primary" for="option">Assign To</label>
        </div>
        <select class="form-control" id="user_id" v-model="engagement.assigned_to">
          <option v-for="user in users" :key="user.id" :value="user.name" v-if="user.name != 'Admin'">
            {{ user.name }}
          </option>
        </select>
      </div>
      <small class="text-danger" v-if="assignAUser">Please Assign Task To User</small>

      <div v-for="workflow in allWorkflows" :key="workflow.id" v-if="workflow.id === engagement.workflow_id">
      <div class="input-group my-3">
        <div class="input-group-prepend">
          <label class="input-group-text text-primary" for="option">Status</label>
        </div>
          <select class="form-control" id="status" v-model="engagement.status">
          <option v-for="status in workflow.statuses" :key="status.id" :value="status.status">
            {{ status.status }}
          </option>
        </select>
        </div>
      </div>

      <div class="d-flex mb-3 bg-light p-2 custom-control custom-checkbox bg-white form-control">
      <span class="mr-3 font-weight-bold mb-1 h6">Engagement Complete</span>
      <input type="checkbox" v-model="engagement.done" class="custom-control-input" id="customCompleteCheck">
      <label class="custom-control-label ml-3 align-self-start" for="customCompleteCheck"></label>
      </div>
      <div class="text-left mb-3 ml-1">
        <small class="text-danger" v-if="engagement.done == true">Warning: If Engagement Box Is Checked, Engagement Will Be Marked As Completed Or Has Already Been Complete</small>
      </div>

      <button type="submit" class="btn btn-lg btn-primary d-flex justify-content-start">Save Changes</button>
      </div>
    </form>


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
</template>

<script>
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'
import bModal from 'bootstrap-vue/es/components/modal/modal'
import bModalDirective from 'bootstrap-vue/es/directives/modal/modal'

export default {
  name: 'EditEngagement',
  data() {
    return {
      monthRange: false,
      quarterRange: false,
      annualRange: false,
      monthChecked: false,
      quarterChecked: false,
      annualChecked: false,
      nothingChecked: false,
      assignAUser: false,
      monthly: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      quarterly: ['Jan-Mar', 'Apr-Jun', 'Jul-Sep', 'Oct-Dec'],
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
          'engagement',
          'users',
          'allWorkflows',
          'returnTypes'
        ]
      )
  },
  methods: {
    ...mapActions(['updateEngagement']),

    editThisEngagement(id) {
        if(!this.engagement.year ) return;
        if(this.annualChecked === true) {
          this.engagement.title = 'Annual'
        }
        if(this.engagement.done == false) {
          if(this.engagement.assigned_to == 'Complete') {
            this.assignAUser = true
            return;
          }
        }
        
        this.updateEngagement({
          id: this.engagement.id,
          client_id: this.engagement.client_id,
          workflow_id: this.engagement.workflow_id,
          type: this.engagement.type,
          title: this.engagement.title,
          description: this.engagement.description,
          return_type: this.engagement.return_type,
          year: this.engagement.year,
          assigned_to: this.engagement.assigned_to,
          status: this.engagement.status,
          done: this.engagement.done
        })   
        .then(() => {
          this.$router.push({ path: '/engagement/' + this.engagement.id});
        })
    },
    deleteEngagement(id) {
      this.$store.dispatch('deleteEngagement', id)
      .then(() => {
        this.$router.push({path: '/engagements', query: {alert: 'Engagement Was Succesfully Deleted'}});
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
    selectedMonthRange() {
      this.monthRange = !this.monthRange
      this.quarterRange = false
      this.annualRange = false
      this.quarterChecked = false
      this.annualChecked = false
      this.nothingChecked = false
    },
    selectedQuarterRange() {
      this.quarterRange = !this.quarterRange
      this.monthRange = false
      this.annualRange = false
      this.monthChecked = false
      this.annualChecked = false
      this.nothingChecked = false
    },
    selectedAnnualRange() {
      this.annualRange = !this.annualRange
      this.monthRange = false
      this.quarterRange = false
      this.monthChecked = false
      this.quarterChecked = false
      this.nothingChecked = false
    },
    clearAlarm() {
      this.assignAUser = false
    }
  },
  created: function(){
    this.$store.dispatch('getEngagement', this.$route.params.id);
    this.$store.dispatch('retrieveUsers')
    this.$store.dispatch('retrieveWorkflows')
    this.$store.dispatch('getReturnTypes')
    if(this.engagement.description == 'Monthly') {
      this.monthChecked = true
      this.monthRange = true
      this.quarterRange = false
    }
    if(this.engagement.description == 'Quarterly') {
      this.quarterChecked = true
      this.quarterRange = true
      this.monthRange = false
    }
    if(this.engagement.description == 'Annual') {
      this.annualChecked = true
    }
  }
  
}
</script>


<style scoped lang="scss">
 label {
    width: 8em;
  }
</style>
