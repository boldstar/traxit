<template>
  <div class="mt-1 d-flex justify-content-center">
    <div class="add-engagement col-6">
       <div class="card shadow mb-2">  
        <div class="text-left pl-4">
          <span class="text-primary font-weight-bold">Choose Engagement Type:</span>
        </div>
        <div class="d-flex p-2">
            <div class="d-flex custom-control custom-checkbox">
              <span class="font-weight-bold w-100 mr-1">Tax Return</span>
              <input type="checkbox" v-model="taxChecked" class="custom-control-input " id="customCheck1" @change="selectedTax">
              <label class="custom-control-label" for="customCheck1"></label>
            </div>
            <div class="d-flex custom-control custom-checkbox">
              <span class="font-weight-bold w-100 mr-1">Bookkeeping</span>
              <input type="checkbox" v-model="bookChecked" class="custom-control-input ml-3" id="customCheck2" @change="selectedBook">
              <label class="custom-control-label" for="customCheck2"></label>
            </div>
            <div class="d-flex custom-control custom-checkbox">
              <span class="font-weight-bold w-100 mr-1">Custom</span>
              <input type="checkbox" v-model="customChecked" class="custom-control-input" id="customCheck2.1" @change="selectedCustom">
              <label class="custom-control-label" for="customCheck2.1"></label>
            </div>
        </div>
       </div>
      

        <form @submit.prevent="validateBeforeSubmit" class="d-flex-column bg-light justify-content-center card p-3" v-if="viewForm">
          <div class="form-group">


            <div class="d-flex justify-content-between mb-3 p-2 custom-control custom-checkbox bg-white form-control" v-bind:class="{'input-error' : nothingChecked}" v-if="bookChecked">
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

            <input type="text" class="form-control mb-3" placeholder="Year" v-model="engagement.year">

            <div class="input-group mb-3" v-if="taxChecked || customChecked">
              <div class="input-group-prepend">
                <label class="input-group-text text-primary" for="option">Difficulty</label>
              </div>
              <select class="form-control" id="difficulty" v-model="engagement.difficulty">
                <option disabled>{{ option }}</option>
                <option v-for="(level, index) in levels" :key="index" :value="level">
                  {{ level }}
                </option>
              </select>
            </div>

            <div class="input-group mb-3" v-if="taxChecked || customChecked">
              <div class="input-group-prepend">
                <label class="input-group-text text-primary" for="option">Category</label>
              </div>
              <select class="form-control" id="client_id" v-model="engagement.category">
                <option disabled>{{ option }}</option>
                <option v-for="(category, index) in categories" :key="index" :value="category">
                  {{ category }}
                </option>
              </select>
            </div>

            <div class="input-group my-3" v-if="bookChecked || taxChecked && engagement.category == 'Business'">
              <div class="input-group-prepend">
                <label class="input-group-text text-primary" for="option">Find Business</label>
              </div>
              <select :class="{ 'input-error': errors.has('Business') }" class="form-control" id="client_id" v-model="engagement.name" v-validate="{ is_not: option }" name="Business">
                <option disabled>{{ option }}</option>
                <option v-for="(business, index) in clientBusinesses" :key="index">
                  {{business.business_name}} {{business.business_type}}
                </option>
              </select>
            </div>
            <span class="form-error" v-show="errors.has('Business')">{{ errors.first('Business') }}</span>

            <div v-if="bookChecked">
                <div class="input-group my-3" v-if="monthRange">
                <div class="input-group-prepend">
                  <label class="input-group-text text-primary" for="option">Month Of</label>
                </div>
                <select :class="{ 'input-error': errors.has('Month') }" class="form-control" id="type" v-model="engagement.title" v-validate="{ is_not: option }" name="Month">
                    <option  selected disabled>{{ option }}</option>
                    <option v-for="(month, index) in monthly" :key="index" :value="month">{{ month }}</option>
                </select>
              </div>
                <span class="form-error" v-show="errors.has('Month')">{{ errors.first('Month') }}</span>

              <div class="input-group my-3" v-if="quarterRange">
                <div class="input-group-prepend">
                  <label class="input-group-text text-primary" for="option">Quarter Of</label>
                </div>
                <select :class="{ 'input-error': errors.has('Quarter') }" class="form-control" id="type" v-model="engagement.title" v-validate="{ is_not: option }" name="Quarter">
                    <option  selected disabled>{{ option }}</option>
                    <option v-for="(quarter, index) in quarterly" :key="index" :value="quarter">{{ quarter }}</option>
                </select>
              </div>
            </div>
            <span class="form-error" v-show="errors.has('Quarter')">{{ errors.first('Quarter') }}</span>

            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <label class="input-group-text text-primary" for="option">Workflow Type</label>
              </div>
              <select :class="{'input-error': errors.has('Workflow')}" v-validate="{is_not: option}" name="Workflow" class="form-control" id="workflow_id" v-model.number="engagement.workflow_id">
                <option disabled>{{ option }}</option>
                <option v-for="workflow in allWorkflows" :key="workflow.id" :value="workflow.id">
                  {{ workflow.workflow }}
                </option>
              </select>
            </div>
            <span class="form-error" v-show="errors.has('Workflow')">{{ errors.first('Workflow') }}</span>

            <div class="input-group mb-3" v-if="taxChecked || customChecked">
              <div class="input-group-prepend">
                <label class="input-group-text text-primary" for="option">Return Type</label>
              </div>
              <select class="form-control" id="type" v-model="engagement.return_type">
              <option disabled>{{ return_option }}</option>
              <option v-for="type in returnTypes" :key="type.id" :value="type.return_type">{{ type.return_type }}</option>
              </select>
            </div>

            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <label class="input-group-text text-primary" for="option">Assign To</label>
              </div>
              <select :class="{'input-error': errors.has('Assigned To')}" v-validate="{is_not: option}" name="Assigned To" class="form-control" id="user_id" v-model="engagement.assigned_to">
                <option  selected disabled>{{ option }}</option>
                <option v-for="user in users" :key="user.id" :value="user.id" v-if="user.name != 'Admin'">
                  {{ user.name }}
                </option>
              </select>
            </div>
            <span class="form-error" v-show="errors.has('Assigned To')">{{ errors.first('Assigned To') }}</span>

              <div v-for="workflow in allWorkflows" :key="workflow.id" v-if="workflow.id === engagement.workflow_id">
                <div class="input-group my-3">
                  <div class="input-group-prepend">
                    <label class="input-group-text text-primary" for="option">Status</label>
                  </div>
                    <select class="form-control" id="status" v-model="engagement.status">
                    <option  selected disabled>{{ option }}</option>
                    <option v-for="status in workflow.statuses" :key="status.id" :value="status.status">
                      {{ status.status }}
                    </option>
                  </select>
                </div>
              </div>

              <div class="input-group my-3" v-if="engagement.workflow_id === option">
                <div class="input-group-prepend">
                  <label class="input-group-text text-primary" for="option">Status</label>
                </div>
                  <select class="form-control" id="status">
                  <option  selected disabled>{{ empty }}</option>
                </select>
              </div> 

            <div class="d-flex justify-content-between">
              <button type="submit" class="btn btn-primary d-flex justify-content-start">Create</button>
              <router-link v-bind:to="'/contact/' +client.id+ '/engagements'" class="btn btn-secondary float-right">Dismiss</router-link>
            </div>
          </div>
        </form>
      </div>  
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

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
        type: '',
        title: '',
        description: null,
        category: null,
        name: null,
        return_type: null,
        year: '',
        assigned_to: null,
        status: null,
      },
      option: 'Choose..',
      return_option: 'Choose..(Optional)',
      empty: 'Please select workflow first...',
      categories: ['Personal', 'Business'],
      monthly: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      quarterly: ['Jan-Mar', 'Apr-Jun', 'Jul-Sep', 'Oct-Dec'],
      levels: [1,2,3,4,5]
    }
  },
  computed: {
    ...mapGetters(
        [
          'client',
          'allWorkflows',
          'users',
          'returnTypes'
        ]
      ),
      clientBusinesses() {
      return this.client.businesses
    }
  },
  methods: {
    ...mapActions(['addEngagement']),
    validateBeforeSubmit() {
          if(this.bookChecked === true) {
            if(this.monthChecked === false && this.quarterChecked === false && this.annualChecked === false) {
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
      if(!this.engagement.year) return;
      if(this.annualChecked) {
        this.engagement.title = 'Annual'
        this.engagement.description = 'Annual'
      }
      if(this.monthChecked) {
        this.engagement.description = 'Monthly'
      }
      if(this.quarterChecked) {
       this.engagement.description = 'Quarterly'
      }
      if(this.bookChecked) {
        this.engagement.type = 'bookkeeping'
        this.engagement.category = 'Business'
      }
      if(this.taxChecked) {
        this.engagement.type = 'taxreturn'
      }
      if(this.customChecked) {
        this.engagement.type = 'custom'
      }
      if(this.engagement.return_type === this.return_option) {
        this.engagement.return_type = null
      }
      this.addEngagement({
        id: this.idForEngagement,
        category: this.engagement.category,
        client_id: this.client.id,
        type: this.engagement.type,
        title: this.engagement.title,
        description: this.engagement.description,
        name: this.engagement.name,
        workflow_id: this.engagement.workflow_id,
        return_type: this.engagement.return_type,
        year: this.engagement.year,
        assigned_to: this.engagement.assigned_to,
        status: this.engagement.status,
        difficulty: this.engagement.difficulty
      })   
      .then(() => {
        this.engagement = "" 
        this.idForEngagement++
        this.$router.push({path: '/contact/' +this.client.id+'/engagements'});
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
      this.engagement.title = this.option
      this.quarterRange = false
      this.annualRange = false
      this.quarterChecked = false
      this.annualChecked = false
      this.nothingChecked = false
    },
    selectedQuarterRange() {
      this.quarterRange = !this.quarterRange
      this.engagement.title = this.option
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
    }
  },
  created: function() {
    this.$store.dispatch('getReturnTypes')
    this.$store.dispatch('retrieveWorkflows');
    this.$store.dispatch('retrieveUsers');
    this.engagement.return_type = this.return_option
    this.engagement.workflow_id = this.option
    this.engagement.assigned_to = this.option
    this.engagement.status = this.option
    this.engagement.category = this.option
    this.engagement.name = this.option
    this.engagement.difficulty = this.option
  },
}
</script>

<style lang="scss" scoped>

 label {
    width: 8em;
  }

  .input-error {
      border: 1px solid red;
  }

</style>

