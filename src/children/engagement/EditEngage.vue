<template>
  <div class="page-wrapper d-flex justify-content-center align-items-center col-12">
    <div class="d-flex flex-column align-items-center col-md-6 shadow mb-5 edit-engagement-form bg-white">

    <form class="w-100 text-left py-2 bg-white">
      <div class="form-group">

        <label for="name">Name<span class="text-danger">*</span></label>
        <input type="text" id="name" class="form-control mb-2" placeholder="Engagement Name" v-model="engagement.name">

        <label for="timespan" v-if="engagement.type == 'bookkeeping'">Timespan</label>
        <div class="d-flex justify-content-between mb-2 p-2 custom-control custom-checkbox bg-white form-control" id="timespan" v-bind:class="{'input-error' : nothingChecked}" v-if="engagement.type == 'bookkeeping'">
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

        <div class="mb-2">
          <label for="time">Tax Year<span class="text-danger">*</span></label>
          <select class="form-control" id="time" v-model="engagement.year" name="Title">
              <option v-for="(year, index) in years" :key="index" :value="year">{{ year }}</option>
          </select>
        </div>

        <label for="due_date">Due Date</label>
        <v-date-picker
          mode='single'
          v-model='dueDate'
          :input-props='{class: "form-control mb-2"}'
          id="due_date"
        >
        </v-date-picker>

        <div class="mb-2" v-if="monthRange">
          <label for="time">Month Of<span class="text-danger">*</span></label>
          <select class="form-control" id="time" v-model="engagement.title" name="Title">
              <option v-for="(month, index) in monthly" :key="index" :value="month">{{ month }}</option>
          </select>
        </div>

        <div class="input-group my-3" v-if="quarterRange">
          <div class="input-group-prepend">
            <label class="input-group-text text-primary" for="option">Quarter Of<span class="text-danger">*</span></label>
          </div>
          <select class="form-control" id="type" v-model="engagement.title" name="Title">
              <option v-for="(quarter, index) in quarterly" :key="index" :value="quarter">{{ quarter }}</option>
          </select>
        </div>

        <label for="difficulty">Difficulty</label>
        <select class="form-control mb-2" id="difficulty" v-model="engagement.difficulty">
          <option v-for="(level, index) in levels" :key="index" :value="level">
            {{ level }}
          </option>
        </select>

        <label for="priority">Priority</label>
        <select class="form-control mb-2" id="priority" v-model="engagement.priority">
          <option v-for="(level, index) in levels" :key="index" :value="level">
            {{ level }}
          </option>
        </select>
  
        <label for="workflow">Workflow Type<span class="text-danger">*</span></label>
        <select class="form-control mb-2" id="workflow" v-model.number="engagement.workflow_id">
          <option v-for="workflow in allWorkflows" :key="workflow.id" :value="workflow.id">
            {{ workflow.workflow }}
          </option>
        </select>

        <div class="mb-2" v-if="engagement.type == 'taxreturn'">
          <label for="type">Return Type<span class="text-danger">*</span></label>
          <select class="form-control" id="type" v-model="engagement.return_type">
              <option v-for="type in returnTypes" :key="type.id" :value="type.return_type">{{ type.return_type }}</option>
          </select>
        </div>

        <label for="user" class="w-100">Currently Assigned To<span class="text-danger">*</span></label>
        <select class="form-control mb-2" id="user" v-model="engagement.assigned_to" :class="{'input-error':assignAUser}" @change="clearAlarm">
          <option v-for="user in computedUsers" :key="user.id" :value="user.name">
            {{ user.name }}
          </option>
        </select>
        <small class="text-danger" v-if="assignAUser">Please Assign Task To User</small>

        <div class="mb-2" v-for="workflow in computedWorkflows" :key="workflow.id">
            <label for="status">Status<span class="text-danger">*</span></label>
            <select class="form-control" id="status" v-model="engagement.status">
            <option v-for="status in workflow.statuses" :key="status.id" :value="status.status">
              {{ status.status }}
            </option>
          </select>
        </div>


        <div v-if="engagement.type == 'taxreturn'">
        <label for="fee">Preparation Fee</label>
        <currency-input id="fee" :placeholder="'Enter amount'"  v-model="engagement.fee" mask-type="currency" class="mb-2"></currency-input>

        <label for="balance" class="w-100">Balance | {{ legend }}</label>
        <div class="input-group mb-3" >
        <input id="balance"  v-model="engagement.balance" :class="{'border-danger': balance}" class="form-control" placeholder="Enter Amount" type="text" />
        </div>
        </div>
        <small class="text-danger" v-if="balance">Balance must have an amount if "Owed" or "Refunded" is marked</small>
        <small class="text-danger" v-if="chooseOwed">Please select "Owed" or "Refunded" if balance has an amount entered</small>


        <div class="d-flex my-3 bg-light p-2 custom-control custom-checkbox bg-white form-control">
          <span class="mr-3 font-weight-bold mb-1 h6">Engagement Paid</span>
          <input type="checkbox" v-model="engagement.paid" class="custom-control-input" id="customPaidCheck">
          <label class="custom-control-label ml-3 align-self-start" for="customPaidCheck"></label>
        </div>

        <div class="d-flex my-3 bg-light p-2 custom-control custom-checkbox bg-white form-control">
          <span class="mr-3 font-weight-bold mb-1 h6">Engagement Complete</span>
          <input type="checkbox" v-model="engagement.done" class="custom-control-input" id="customCompleteCheck">
          <label class="custom-control-label ml-3 align-self-start" for="customCompleteCheck"></label>
        </div>
        <div class="text-left mb-3 ml-1">
          <small class="text-danger" v-if="engagement.done == true">Warning: If Engagement Box Is Checked, Engagement Will Be Marked As Completed Or Has Already Been Complete</small>
        </div>

        <div class="d-flex justify-content-between">
          <button type="button" class="btn btn-primary d-flex font-weight-bold" :disabled="processing" @click="editThisEngagement">
            <span v-if="!processing">Save Changes</span>
            <span v-if="processing">Saving...</span>
          </button>
          <router-link v-bind:to="'/engagement/' + engagement.id + '/details'" class="btn btn-secondary font-weight-bold">Cancel</router-link>
        </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'
import CurrencyInput from '@/components/forms/CurrencyInput.vue'

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
      balance: false,
      chooseOwed: false,
      monthly: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      quarterly: ['Jan-Mar', 'Apr-Jun', 'Jul-Sep', 'Oct-Dec'],
      levels: [1,2,3,4,5],
      owed: null,
      legend: '(Refund < 0 || Owed > 0)',
      dueDate: null
    }
  },
  components:{
    CurrencyInput
  },
  computed: {
    ...mapGetters(
        [
          'engagement',
          'users',
          'allWorkflows',
          'returnTypes',
          'processing'
        ]
      ),
      years() {
        var currentYear = new Date().getFullYear(), years = [];
        var startYear = currentYear - 10;  
        while(startYear <= currentYear) {
          years.push(startYear++)
        } 
        return years.reverse();
    },
    computedUsers() {
      return this.users.filter(user => user.name != 'Admin')
    },
    computedWorkflows() {
      return this.allWorkflows.filter(w => w.id == this.engagement.workflow_id)
    }
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
          name: this.engagement.name,
          client_id: this.engagement.client_id,
          workflow_id: this.engagement.workflow_id,
          type: this.engagement.type,
          title: this.engagement.title,
          description: this.engagement.description,
          return_type: this.engagement.return_type,
          year: typeof(this.engagement.year) === 'string' ? this.engagement.year : JSON.stringify(this.engagement.year),
          assigned_to: this.engagement.assigned_to,
          status: this.engagement.status,
          difficulty: this.engagement.difficulty,
          fee: this.engagement.fee,
          balance: this.engagement.balance,
          owed: this.engagement.owed,
          done: this.engagement.done,
          paid: this.engagement.paid,
          estimated_date: this.dueDate,
          priority: this.engagement.priority
        })  
    },
    deleteEngagement(id) {
      this.$store.dispatch('deleteEngagement', id)
      .then(() => {
        this.$router.push({path: '/engagements', query: {alert: 'Engagement Was Succesfully Deleted'}});
      })
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
    },
    clearBalance() {
      this.owed = null
      this.engagement.balance = null
    }
  },
  created: function(){
    this.$store.dispatch('getEngagement', this.$route.params.id);
    this.$store.dispatch('retrieveUsers')
    this.$store.dispatch('retrieveWorkflows')
    this.$store.dispatch('getReturnTypes')
    this.dueDate = this.engagement.estimated_date ? new Date(this.engagement.estimated_date) : null
    if(this.monthly.includes(this.engagement.title)) {
      this.monthChecked = true
      this.monthRange = true
      this.quarterRange = false
    }
    if(this.quarterly.includes(this.engagement.title)) {
      this.quarterChecked = true
      this.quarterRange = true
      this.monthRange = false
    }
    if(this.engagement.title == 'Annual') {
      this.annualChecked = true
    }
  }
  
}
</script>


<style scoped lang="scss">
  label {
    font-weight: bold;
    margin-left: 3px;
    font-size: .85rem;
  }
  .choose-owed {
    background: rgba(255, 0, 0, 0.349);
  }
  .clear-owed {
    border: none;
    padding: 0;
    background: transparent;
    font-size: 1rem;
    font-weight: bold;
    color: red;
    margin-left: 5px;
  }

  @media screen and (max-width: 1300px) {
  .edit-engagement-form {
    width: 100%!important;
    flex: 0 0 100%!important;
    max-width: 100%!important;
  }
}

@media screen and (max-width: 600px) {
  .form-title {
    font-size: .9rem!important;
    align-self: center!important;
  }
}
</style>
