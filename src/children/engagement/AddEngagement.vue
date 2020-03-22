<template>
  <div class="mt-1 d-flex justify-content-center">
    <div class="add-engagement col-6">
       <div class="card shadow mb-2">  
        <div class="d-flex p-2">
            <div class="input-group my-3">
              <div class="input-group-prepend">
                <label class="input-group-text text-primary workflow-select" for="option">Choose Workflow</label>
              </div>
              <select :class="{'input-error': errors.has('Workflow')}" v-validate="{is_not: option}" name="Workflow" class="form-control" id="workflow_id" v-model.number="engagement.workflow_id" @change="setCategory">
                <option disabled>{{ option }}</option>
                <option v-for="workflow in allWorkflows" :key="workflow.id" :value="workflow.id">
                  {{ workflow.workflow }}
                </option>
              </select>
            </div>
            <span class="form-error" v-show="errors.has('Workflow')">{{ errors.first('Workflow') }}</span>
        </div>
       </div>
      

        <form @submit.prevent="validateBeforeSubmit" class="d-flex-column bg-light justify-content-center card px-3 py-2" v-if="engagementType &&engagementType.length > 0">
          <div class="form-group text-left">
            <div class="mb-2">
              <span class=" font-weight-bold"><span class="text-danger">*</span> Required field</span>
            </div>

            <div class="d-flex justify-content-between mb-3 p-2 custom-control custom-checkbox bg-white form-control" v-bind:class="{'input-error' : nothingChecked}" v-if="engagementType[0].engagement_type == 'Bookkeeping'">
              <div class="d-flex">
                <span class="mr-3 font-weight-bold h6">Monthly</span>
                <input type="checkbox" v-model="monthChecked" class="custom-control-input ml-3" id="customCheck3" @change="selectedMonthRange">
                <label class="custom-control-label ml-3" for="customCheck3"></label>
              </div>
              <div class="d-flex">
                <span class="mr-3 font-weight-bold h6">Quarterly</span>
                <input type="checkbox" v-model="quarterChecked" class="custom-control-input ml-3" id="customCheck4" @change="selectedQuarterRange">
                <label class="custom-control-label ml-3" for="customCheck4"></label>
              </div>
              <div class="d-flex">
                <span class="mr-3 font-weight-bold h6">Annual</span>
                <input type="checkbox" v-model="annualChecked" class="custom-control-input ml-3" id="customCheck5" @change="selectedAnnualRange">
                <label class="custom-control-label ml-3" for="customCheck5"></label>
              </div>
            </div>
            <small v-if="nothingChecked" class="text-danger">Please select a date range before submitting</small>

            <div class="input-group" :class="{'mb-3': !errors.has('Tax Year')}">
              <div class="input-group-prepend">
                <label class="input-group-text text-primary font-weight-bold" for="option">Tax Year<span class="text-danger">*</span></label>
              </div>
              <select :class="{ 'input-error': errors.has('Tax Year') }" class="form-control" id="Tax Year" v-model="engagement.year" v-validate="{ is_not: option }" name="Tax Year">
                <option disabled>{{ option }}</option>
                <option v-for="(year, index) in years" :key="index" :value="year">
                  {{ year }}
                </option>
              </select>
            </div>
             <span class="form-error" v-show="errors.has('Tax Year')">{{ errors.first('Tax Year') }}</span>

            <div class="input-group mb-3 d-flex">
              <div class="input-group-prepend">
                <label class="input-group-text text-primary font-weight-bold" for="due_date">Due Date</label>
              </div>
              <v-date-picker
                mode='single'
                v-model='engagement.estimated_date'
                :input-props='{class: "form-control"}'
                id="due_date"
                >
              </v-date-picker>
            </div>

            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <label class="input-group-text text-primary font-weight-bold" for="option">Priority</label>
              </div>
              <select class="form-control" id="difficulty" v-model="engagement.priority">
                <option disabled>{{ option }}</option>
                <option v-for="(level, index) in priority_levels" :key="index" :value="level.id">
                  {{ level.value }}
                </option>
              </select>
            </div>

            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <label class="input-group-text text-primary font-weight-bold" for="option">Difficulty</label>
              </div>
              <select class="form-control" id="difficulty" v-model="engagement.difficulty">
                <option disabled>{{ option }}</option>
                <option v-for="(level, index) in difficulty_levels" :key="index" :value="level.id">
                  {{ level.value }}
                </option>
              </select>
            </div>

            <div class="input-group mb-3" v-if="engagementType[0].engagement_type != 'Bookkeeping'">
              <div class="input-group-prepend">
                <label class="input-group-text text-primary font-weight-bold" for="option">Category<span class="text-danger">*</span></label>
              </div>
              <select class="form-control" id="client_id" v-model="engagement.category">
                <option disabled>{{ option }}</option>
                <option v-for="(category, index) in categories" :key="index" :value="category">
                  {{ category }}
                </option>
              </select>
            </div>

            <div class="input-group" :class="{'mb-3': !errors.has('Business')}" v-if="engagement.category == 'Business'">
              <div class="input-group-prepend">
                <label class="input-group-text text-primary font-weight-bold" for="option">Business<span class="text-danger">*</span></label>
              </div>
              <select :class="{ 'input-error': errors.has('Business') }" class="form-control" id="client_id" v-model="engagement.name" v-validate="{ is_not: option }" name="Business">
                <option disabled>{{ option }}</option>
                <option v-for="(business, index) in clientBusinesses" :key="index">
                  {{business.business_name}} {{business.business_type}}
                </option>
              </select>
            </div>
            <span class="form-error" v-show="errors.has('Business')">{{ errors.first('Business') }}</span>

            <div class="input-group" :class="{'mb-3': !errors.has('Month')}" v-if="monthRange">
                <div class="input-group-prepend">
                  <label class="input-group-text text-primary font-weight-bold" for="option">Month Of<span class="text-danger">*</span></label>
                </div>
                <select :class="{ 'input-error': errors.has('Month') }" class="form-control" id="type" v-model="engagement.title" v-validate="{ is_not: option }" name="Month">
                    <option  selected disabled>{{ option }}</option>
                    <option v-for="(month, index) in monthly" :key="index" :value="month">{{ month }}</option>
                </select>
            </div>
            <span class="form-error" v-show="errors.has('Month')">{{ errors.first('Month') }}</span>

            <div class="input-group" :class="{'mb-3': !errors.has('Quarter')}" v-if="quarterRange">
              <div class="input-group-prepend">
                  <label class="input-group-text text-primary font-weight-bold" for="option">Quarter Of<span class="text-danger">*</span></label>
              </div>
              <select :class="{ 'input-error': errors.has('Quarter') }" class="form-control" id="type" v-model="engagement.title" v-validate="{ is_not: option }" name="Quarter">
                  <option  selected disabled>{{ option }}</option>
                  <option v-for="(quarter, index) in quarterly" :key="index" :value="quarter">{{ quarter }}</option>
              </select>
              </div>
            <span class="form-error" v-show="errors.has('Quarter')">{{ errors.first('Quarter') }}</span>


            <div class="input-group mb-3" v-if="engagementType[0].engagement_type != 'Bookkeeping'">
              <div class="input-group-prepend">
                <label class="input-group-text text-primary font-weight-bold" for="option">Return Type<span class="text-danger" v-if="engagementType[0].engagement_type == 'Tax Return'">*</span></label>
              </div>
              <select class="form-control" id="type" v-model="engagement.return_type">
              <option disabled selected>{{ option }}<span v-if="engagementType[0].engagement_type != 'Tax Return'">(Optional)</span></option>
              <option v-for="type in returnTypes" :key="type.id" :value="type.return_type">{{ type.return_type }}</option>
              </select>
            </div>

            <div class="input-group" :class="{'mb-3': !errors.has('Assigned To')}">
              <div class="input-group-prepend">
                <label class="input-group-text text-primary font-weight-bold" for="option">Assign To<span class="text-danger">*</span></label>
              </div>
              <select :class="{'input-error': errors.has('Assigned To')}" v-validate="{is_not: option}" name="Assigned To" class="form-control" id="user_id" v-model="engagement.assigned_to">
                <option  selected disabled>{{ option }}</option>
                <option v-for="user in filteredUsers" :key="user.id" :value="user.id">
                  {{ user.name }}
                </option>
              </select>
            </div>
            <span class="form-error" v-show="errors.has('Assigned To')">{{ errors.first('Assigned To') }}</span>

            <div v-for="workflow in filteredWorkflows" :key="workflow.id">
            <div class="input-group" :class="{'mb-3': !errors.has('Status')}">
              <div class="input-group-prepend">
                <label class="input-group-text text-primary font-weight-bold" for="option">Status<span class="text-danger">*</span></label>
              </div>
                <select :class="{ 'input-error': errors.has('Status') }" class="form-control" id="status" v-model="engagement.status" v-validate="{ is_not: option }" name="Status">
                <option  selected disabled>{{ option }}</option>
                <option v-for="status in workflow.statuses" :key="status.id" :value="status.status">
                  {{ status.status }}
                </option>
              </select>
              </div>
            </div>
            <span class="form-error" v-show="errors.has('Status')">{{ errors.first('Status') }}</span>


            <div class="d-flex justify-content-between">
              <button type="submit" class="btn btn-primary d-flex justify-content-start" :disabled="processing">
                <span v-if="processing">Starting...</span>
                <span v-if="!processing">Start Engagement</span>
              </button>
              <router-link v-bind:to="'/contact/' +client.id+ '/engagements'" class="btn btn-secondary float-right">Dismiss</router-link>
            </div>
          </div>
        </form>
      </div>  
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import levels from '../../plugins/levels'

export default {
  name: 'add-engagement',
  data() {
    return {
      viewForm: false,
      taxChecked: false,
      bookChecked: false,
      customChecked: false,
      monthRange: false,
      quarterRange: false,
      annualRange: false,
      monthChecked: false,
      quarterChecked: false,
      annualChecked: false,
      nothingChecked: false,
      engagement: {
        workflow_id: null,
        difficulty: null,
        type: null,
        title: null,
        description: null,
        category: null,
        name: null,
        return_type: null,
        year: null,
        assigned_to: null,
        status: null,
        estimated_date: null
      },
      difficulty_levels: levels.difficulty_levels,
      priority_levels: levels.priority_levels,
      option: 'Choose..',
      return_option: 'Choose..(Optional)',
      empty: 'Please select workflow first...',
      categories: ['Personal', 'Business'],
      monthly: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      quarterly: ['Jan-Mar', 'Apr-Jun', 'Jul-Sep', 'Oct-Dec'],
    }
  },
  computed: {
    ...mapGetters(
        [
          'client',
          'allWorkflows',
          'users',
          'returnTypes',
          'processing'
        ]
      ),
    clientBusinesses() {
      return this.client.businesses
    },
    engagementType() {
        return this.allWorkflows.filter(workflow => workflow.id === this.engagement.workflow_id)
    },
     years() {
        var currentYear = new Date().getFullYear(), years = [];
        var startYear = currentYear - 10;  
        while(startYear <= currentYear) {
          years.push(startYear++)
        } 
        return years.reverse();
    },
     filteredUsers() {
        return this.users.filter(user => user.name != 'Admin')
    },
    filteredWorkflows() {
      return this.allWorkflows.filter(w => w.id === this.engagement.workflow_id)
    }
  },
  methods: {
    ...mapActions(['addEngagement']),
    validateBeforeSubmit() {
          if(this.engagementType[0].engagement_type == 'Bookkeeping') {
            if(this.engagement.title == false) {
              this.nothingChecked = true
              return;
            }
          }
          this.$validator.validateAll().then((result) => {
              if (result) {
                  this.addNewEngagement();
              }
          });
      },
    addNewEngagement() {
      this.addEngagement({
        type: this.engagementType[0].engagement_type.replace(/[^a-zA-Z0-9 ]/g, "").replace(/\s+/g,'' ).replace(/^\s/,'').replace(/\s$/,'').toLowerCase(),
        title: this.engagement.title == this.option ? null : this.engagement.title,
        description: this.engagementType[0].workflow,
        category: this.engagement.category,
        client_id: this.client.id,
        name: this.engagement.name,
        workflow_id: this.engagement.workflow_id,
        return_type: this.engagement.return_type == this.option ? null : this.engagement.return_type,
        year: JSON.stringify(this.engagement.year),
        assigned_to: this.engagement.assigned_to,
        status: this.engagement.status,
        difficulty: this.engagement.difficulty == this.option ? null : this.engagement.difficulty,
        priority: this.engagement.priority == this.option ? 0 : this.engagement.priority,
        estimated_date: this.engagement.estimated_date == this.option ? null : this.engagement.estimated_date,
        done: false
      })
    },
    selectedTax() {
      this.customChecked = false
      this.taxChecked = true
      this.bookChecked = false
      this.viewForm = true
    },
    selectedBook() {
      this.customChecked = false
      this.taxChecked = false
      this.bookChecked = true
      this.viewForm = true
    },
    selectedCustom() {
      this.taxChecked = false
      this.bookChecked = false
      this.customChecked = true
      this.viewForm = true
    },
    selectedMonthRange() {
      this.monthRange = !this.monthRange
      this.quarterRange = false
      this.annualRange = false
      this.quarterChecked = false
      this.annualChecked = false
      this.nothingChecked = false
      this.engagement.title = 'Monthly'
    },
    selectedQuarterRange() {
      this.quarterRange = !this.quarterRange
      this.monthRange = false
      this.annualRange = false
      this.monthChecked = false
      this.annualChecked = false
      this.nothingChecked = false
      this.engagement.title = 'Quarterly'
    },
    selectedAnnualRange() {
      this.annualRange = !this.annualRange
      this.monthRange = false
      this.quarterRange = false
      this.monthChecked = false
      this.quarterChecked = false
      this.nothingChecked = false
      this.engagement.title = 'Annual'
    },
    setCategory() {
      if(this.engagementType[0].engagement_type == 'Bookkeeping') {
        console.log('im in')
        this.engagement.category = 'Business'
      }
    }
  },
  created: function() {
    this.$store.dispatch('getReturnTypes')
    this.$store.dispatch('retrieveWorkflows');
    this.$store.dispatch('retrieveUsers');
    this.engagement.return_type = this.option
    this.engagement.workflow_id = this.option
    this.engagement.assigned_to = this.option
    this.engagement.status = this.option
    this.engagement.category = this.option
    this.engagement.name = this.option
    this.engagement.difficulty = this.option
    this.engagement.year = this.option
    this.engagement.priority = this.option
  },
}
</script>

<style lang="scss" scoped>

 label {
    width: 8em;
  }

  label.workflow-select {
    width: 10em;
    font-weight: bold;
  }

  .input-error {
      border: 1px solid red;
  }

   #due_date {
    box-sizing: border-box;
    flex-grow: 1;
  }

  @media screen and (max-width: 1500px) {
    .custom-control {
      width: 100%!important;
    }
    .custom-control-label {
      max-width: 5px!important;
    }

    .add-engagement {
      width: 80%!important;
      flex: 0 0 80%!important;
      max-width: 80%!important;
    }
  }

  @media screen and (max-width: 1100px) {
    .add-engagement {
      width: 100%!important;
      flex: 0 0 100%!important;
      max-width: 100%!important;
      padding: 0!important;
    }

    .custom-control {
      padding-left: 0!important;
    }
  }

</style>

