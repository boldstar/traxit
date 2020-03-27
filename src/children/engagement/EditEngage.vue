<template>
  <div class="page-wrapper  w-100">
    <div class="d-flex text-left mb-3">
        <div>
            <h4 class="mb-0">Engagement Form</h4>
            <span class="title-description text-secondary">Update the information about the engagement</span>
        </div>
    </div>

    <div class="d-flex flex-column align-items-center mb-2 edit-engagement-form">
      <form class="w-100">
        <div class="text-left card p-3 shadow-sm mb-3">
          <h5>General</h5>
          <div class="input-group-grid">
            <div class="input-group-grid-section">
              <div class="custom-input-group">
                <label for="name">Name<span class="text-danger">*</span></label>
                <input type="text" id="name" v-model="engagement.name">
              </div>
              <div class="custom-input-group">
                <label for="due_date">Due Date</label>
                <v-date-picker
                  mode='single'
                  v-model='engagement.estimated_date'
                  id="due_date"
                >
                </v-date-picker>
              </div>
            </div>
            <div class="input-group-grid-section">
              <div class="custom-input-group">
                <label for="priority">Priority</label>
                <select id="priority" v-model="engagement.priority">
                  <option v-for="(level, index) in priority_levels" :key="index" :value="level.level">
                    {{ level.value }}
                  </option>
                </select>
              </div>
              <div class="custom-input-group">
                <label for="difficulty">Difficulty</label>
                <select id="difficulty" v-model="engagement.difficulty">
                  <option v-for="(level, index) in difficulty_levels" :key="index" :value="level.level">
                    {{ level.value }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>

        
        <div class="text-left card p-3 shadow-sm mb-3">
          <h5>Details</h5>
          <div class="custom-input-group">
            <label for="time">Tax Year<span class="text-danger">*</span></label>
            <select id="time" v-model="engagement.year" name="Title">
                <option v-for="(year, index) in years" :key="index" :value="year">{{ year }}</option>
            </select>
          </div>
          <div class="custom-input-group" v-if="engagement.type == 'bookkeeping'">
            <label for="timespan">Timespan</label>
             <select  id="timespan" v-model="timespan" name="timespan" @change="setTimespan($event)">
                <option v-for="(option, index) in timespans" :key="index" :value="option">{{ option }}</option>
            </select>
          </div>
          <div class="custom-input-group" v-if="monthRange">
            <label for="time">Month Of<span class="text-danger">*</span></label>
            <select  id="time" v-model="engagement.title" name="Title">
                <option v-for="(month, index) in monthly" :key="index" :value="month">{{ month }}</option>
            </select>
          </div>
          <div class="custom-input-group" v-if="quarterRange">
            <label for="option">Quarter Of<span class="text-danger">*</span></label>
            <select id="type" v-model="engagement.title" name="Title">
                <option v-for="(quarter, index) in quarterly" :key="index" :value="quarter">{{ quarter }}</option>
            </select>
          </div>
          <div class="custom-input-group" v-if="engagement.type == 'taxreturn'">
            <label for="type">Return Type<span class="text-danger">*</span></label>
            <select id="type" v-model="engagement.return_type">
                <option v-for="type in returnTypes" :key="type.id" :value="type.return_type">{{ type.return_type }}</option>
            </select>
          </div>
        </div>

        <div class="text-left card shadow-sm p-3 mb-3">
          <h5>Workflow</h5>
          <div class="custom-input-group">
            <label for="workflow">Workflow Type<span class="text-danger">*</span></label>
            <select id="workflow" v-model.number="engagement.workflow_id">
              <option v-for="workflow in allWorkflows" :key="workflow.id" :value="workflow.id">
                {{ workflow.workflow }}
              </option>
            </select>
          </div>
          <div class="custom-input-group">
            <label for="user" >Currently Assigned To<span class="text-danger">*</span></label>
            <select id="user" v-model="engagement.assigned_to" :class="{'custom-input-error':assignAUser}" @change="clearAlarm">
              <option v-for="user in computedUsers" :key="user.id" :value="user.name">
                {{ user.name }}
              </option>
            </select>
          </div>
          <small class="text-danger" v-if="assignAUser">Please Assign Task To User</small>
          <div class="custom-input-group" v-for="workflow in computedWorkflows" :key="workflow.id">
              <label for="status">Status<span class="text-danger">*</span></label>
              <select id="status" v-model="engagement.status">
              <option v-for="status in workflow.statuses" :key="status.id" :value="status.status">
                {{ status.status }}
              </option>
            </select>
          </div>
        </div>

        <div v-if="engagement.type == 'taxreturn'" class="text-left card shadow-sm p-3 mb-3">
          <h5>Fee & Balance Due</h5>
          <div class="custom-input-group">
            <label for="fee">Preparation Fee</label>
            <currency-input id="fee" :placeholder="'Enter amount'"  v-model="engagement.fee" mask-type="currency" class="custom-currency-input"></currency-input>
          </div>
          <div class="custom-input-group mb-4" >
            <label for="balance">Balance</label>
            <input id="balance"  v-model="engagement.balance" :class="{'border-danger': balance}" placeholder="Enter Amount" type="text" />
            <p class="input-legend">{{legend}}</p>
          </div>
        </div>
        <small class="text-danger" v-if="balance">Balance must have an amount if "Owed" or "Refunded" is marked</small>
        <small class="text-danger" v-if="chooseOwed">Please select "Owed" or "Refunded" if balance has an amount entered</small>


        
        <div class="text-left card shadow-sm p-3 mb-3">
          <h5>Complete</h5>
          <div class="d-flex p-2 custom-control custom-checkbox">
            <input type="checkbox" v-model="engagement.paid" class="custom-control-input" id="customPaidCheck">
            <label class="custom-control-label ml-3 align-self-start" for="customPaidCheck"></label>
            <span class="mr-3 font-weight-bold mb-1">Engagement Paid</span>
          </div>
          <div class="d-flex p-2 custom-control custom-checkbox">
            <input type="checkbox" v-model="engagement.done" class="custom-control-input" id="customCompleteCheck">
            <label class="custom-control-label ml-3 align-self-start" for="customCompleteCheck"></label>
            <span class="mr-3 font-weight-bold mb-1">Engagement Complete</span>
          </div>
        </div>
        <div class="text-left mb-3 ml-1">
          <small class="text-danger" v-if="engagement.done == true">Warning: If Engagement Complete Box Is Checked, Engagement Will Be Completed Or Has Already Been Complete</small>
        </div>

        <div class="d-flex justify-content-between">
          <button type="button" class="btn btn-primary d-flex font-weight-bold" :disabled="processing" @click="editThisEngagement">
            <span v-if="!processing">Save Changes</span>
            <span v-if="processing">Saving...</span>
          </button>
          <router-link v-bind:to="'/engagement/' + engagement.id + '/details'" class="btn btn-secondary font-weight-bold">Cancel</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'
import CurrencyInput from '@/components/forms/CurrencyInput.vue'
import levels from '../../plugins/levels'
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
      timespan: null,
      timespans: ['Monthly', 'Quarterly', 'Annual'],
      monthly: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      quarterly: ['Jan-Mar', 'Apr-Jun', 'Jul-Sep', 'Oct-Dec'],
      difficulty_levels: levels.difficulty_levels,
      priority_levels: levels.priority_levels,
      owed: null,
      legend: 'Refund < 0 || Owed > 0',
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
          estimated_date: this.engagement.estimated_date,
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
    },
    setTimespan(event) {
      var timespan = event.target.value
      if(timespan == 'Monthly') {
          this.selectedMonthRange()
          return
      } else if(timespan == 'Quarterly') {
          this.selectedQuarterRange()
          return
      } else if(timespan == 'Annual') {
          this.selectedAnnualRange()
          return
      } else {
        return
      }
    }
  },
  created: function(){
    this.$store.dispatch('getEngagement', this.$route.params.id);
    this.$store.dispatch('retrieveUsers')
    this.$store.dispatch('retrieveWorkflows')
    this.$store.dispatch('getReturnTypes')
    this.dueDate = this.engagement.estimated_date ? new Date(this.engagement.estimated_date) : null
    if(this.monthly.includes(this.engagement.title)) {
      this.timespan = 'Monthly'
      this.monthChecked = true
      this.monthRange = true
      this.quarterRange = false
    }
    if(this.quarterly.includes(this.engagement.title)) {
      this.timespan = 'Quarterly'
      this.quarterChecked = true
      this.quarterRange = true
      this.monthRange = false
    }
    if(this.engagement.title == 'Annual') {
      this.timespan = 'Annual'
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

.custom-currency-input {
    padding: 10px !important;
    padding-top: 10px !important;
    border: 2px solid lightgray !important;
    border-radius: 5px !important;
    width: 100% !important;
    z-index: 1 !important;
    height: auto!important;
}
</style>
