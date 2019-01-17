<template>
  <div class="container col-6 mb-3">
    <div class="justify-content-between d-flex mb-1 border shadow p-3">
      <router-link to="/add" class="btn btn-sm btn-outline-secondary"><i class="fas fa-arrow-circle-left mr-2"></i>Back</router-link>
      <div class="d-flex"> 
      <router-link to="/add/contact" class="btn btn-sm btn-outline-primary mr-2"><i class="fas fa-plus mr-2"></i>Contact</router-link>
      <router-link to="/add/business" class="btn btn-sm btn-outline-primary"><i class="far fa-building mr-2"></i>Business</router-link>
      </div>
    </div>
    <div class="card-body bg-light border mb-2">
      <h4 class="text-left text-primary m-0"><i class="far fa-folder-open mr-2"></i>New Bookkeeping Engagement</h4>
    </div>
    <form @submit.prevent="validateBeforeSubmit" class="d-flex-column justify-content-center bg-light px-3 pt-3 border pb-0">
      <div class="form-group">

        <div class="d-flex justify-content-between mb-3 p-2 custom-control custom-checkbox bg-white form-control" v-bind:class="{'input-error' : nothingChecked}">
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
        <small v-if="nothingChecked" class="text-danger">Please select a date range before submitting</small>

        <input :class="{ 'input-error': errors.has('Year') }" type="text" class="form-control mb-3" placeholder="Year" v-model="engagement.year" v-validate="'required'" name="Year">
        <span class="form-error" v-show="errors.has('Year')">{{ errors.first('Year')}}</span>

        <div class="input-group my-3">
          <div class="input-group-prepend">
            <label class="input-group-text text-primary" for="option">Find Contact</label>
          </div>
          <select :class="{ 'input-error': errors.has('Business Contact') }" class="form-control" id="client_id" v-model.number="engagement.client_id" v-validate="{ is_not: option }" name="Business Contact">
            <option disabled>{{ option }}</option>
            <option v-for="client in sortClients" :key="client.id" :value="client.id">
              {{ client.last_name }}, {{client.first_name}} <span v-if="client.has_spouse == 1"> & </span>{{client.spouse_first_name }}
            </option>
          </select>
        </div>
        <span class="form-error" v-show="errors.has('Business Contact')">{{ errors.first('Business Contact') }}</span>

        <div class="input-group my-3">
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

        <div class="input-group my-3">
          <div class="input-group-prepend">
            <label class="input-group-text text-primary" for="option">Workflow Type</label>
          </div>
          <select :class="{ 'input-error': errors.has('Workflow') }" class="form-control" id="client_id" v-model.number="engagement.workflow_id" v-validate="{ is_not: option }" name="Workflow">
            <option disabled>{{ option }}</option>
            <option v-for="workflow in allWorkflows" :key="workflow.id" :value="workflow.id">
              {{ workflow.workflow }}
            </option>
          </select>
        </div>
          <span class="form-error" v-show="errors.has('Workflow')">{{ errors.first('Workflow') }}</span>

        <div class="input-group my-3" v-if="monthRange">
          <div class="input-group-prepend">
            <label class="input-group-text text-primary" for="option">Month Of</label>
          </div>
          <select :class="{ 'input-error': errors.has('Title') }" class="form-control" id="type" v-model="engagement.title" v-validate="{ is_not: option }" name="Title">
              <option  selected disabled>{{ option }}</option>
              <option v-for="(month, index) in monthly" :key="index" :value="month">{{ month }}</option>
          </select>
        </div>
          <span class="form-error" v-show="errors.has('Title')">{{ errors.first('Title') }}</span>

        <div class="input-group my-3" v-if="quarterRange">
          <div class="input-group-prepend">
            <label class="input-group-text text-primary" for="option">Quarter Of</label>
          </div>
          <select :class="{ 'input-error': errors.has('Title') }" class="form-control" id="type" v-model="engagement.title" v-validate="{ is_not: option }" name="Title">
              <option  selected disabled>{{ option }}</option>
              <option v-for="(quarter, index) in quarterly" :key="index" :value="quarter">{{ quarter }}</option>
          </select>
        </div>
          <span class="form-error" v-show="errors.has('Title')">{{ errors.first('Title') }}</span>

        <div class="input-group my-3">
        <div class="input-group-prepend">
          <label class="input-group-text text-primary" for="option">Assign To</label>
        </div>
        <select :class="{ 'input-error': errors.has('Assigned User') }" class="form-control" id="user_id" v-model="engagement.assigned_to" v-validate="{ is_not: option }" name="Assigned User">
          <option  selected disabled>{{ option }}</option>
          <option v-for="user in users" :key="user.id" :value="user.id">
            {{ user.name }}
          </option>
        </select>
      </div>
        <span class="form-error" v-show="errors.has('Assigned User')">{{ errors.first('Assigned User') }}</span>

     

      <div v-for="workflow in allWorkflows" :key="workflow.id" v-if="workflow.id === engagement.workflow_id">
      <div class="input-group my-3">
        <div class="input-group-prepend">
          <label class="input-group-text text-primary" for="option">Status</label>
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

        <div class="input-group my-3" v-if="engagement.workflow_id === option">
        <div class="input-group-prepend">
          <label class="input-group-text text-primary" for="option">Status</label>
        </div>
          <select class="form-control" id="status">
          <option  selected disabled>{{ empty }}</option>
        </select>
        </div> 
      

      <button type="submit" class="btn btn-primary d-flex justify-content-start">Create</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'engagement',
  data() {
    return {
      monthRange: false,
      quarterRange: false,
      annualRange: false,
      monthChecked: false,
      quarterChecked: false,
      annualChecked: false,
      nothingChecked: false,
      client: '',
      engagement: {
        year: '',
        category: 'Business',
        type: 'bookkeeping',
        title: '',
        description: '',
        client_id: null,
        name: null,
        workflow_id: null,
        return_type: null,
        assigned_to: null,
        status: null,
      },
      option: 'Choose...',
      empty: 'Please select workflow first...',
      monthly: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      quarterly: ['Jan-Mar', 'Apr-Jun', 'Jul-Sep', 'Oct-Dec'],
    }
  },
  computed: {
    ...mapGetters(
        [
          'allClients',
          'allWorkflows',
          'users',
          'returnTypes'
        ]
      ),
    clientBusinesses() {
      const client = this.allClients.filter(client => client.id === this.engagement.client_id)
      const businesses = client.map(c => c.businesses)
      const clientBusinesses = businesses.flat();
      return clientBusinesses
    },
    sortClients() {
    return this.allClients.sort((a,b) => {
      if(a.last_name < b.last_name) return -1;
      if(a.last_name > b.last_name)  return 1;
      return 0;
    })
  }
  },
  methods: {
    ...mapActions(['addEngagement']),
    removeSelected() {
      this.engagement.client_id = this.option
      this.engagement.name = this.option
    },
    validateBeforeSubmit() {
          if(this.quarterChecked == false && this.monthChecked == false && this.annualChecked == false) {
            this.nothingChecked = true
            return;
          }
          this.$validator.validateAll().then((result) => {
              if (result) {
                  this.addNewEngagement();
              }
          });
      },
    addNewEngagement() {
      if(!this.engagement.year) return;
      if(this.annualChecked === true) {
        this.engagement.title = 'Annual'
        this.engagement.description = 'Annual'
      }
      if(this.monthChecked === true) {
        this.engagement.description = 'Monthly'
      }
      if(this.quarterChecked === true) {
        this.engagement.description = 'Quarterly'
      }
      this.addEngagement({
        id: this.idForEngagement,
        category: this.engagement.category,
        type: this.engagement.type,
        title: this.engagement.title,
        description: this.engagement.description,
        client_id: this.engagement.client_id,
        name: this.engagement.name,
        workflow_id: this.engagement.workflow_id,
        return_type: this.engagement.return_type,
        year: this.engagement.year,
        assigned_to: this.engagement.assigned_to,
        status: this.engagement.status,
      })   
      .then(() => {
        this.engagement = "" 
        this.idForEngagement++
        this.$router.push({path: '/add'});
      })
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
    }
  },
  created: function() {
    this.$store.dispatch('retrieveClientsWithBusinesses');
    this.$store.dispatch('retrieveWorkflows');
    this.$store.dispatch('retrieveUsers');
    this.$store.dispatch('getReturnTypes')
    this.engagement.return_type = this.option
    this.engagement.client_id = this.option
    this.engagement.workflow_id = this.option
    this.engagement.assigned_to = this.option
    this.engagement.status = this.option
    this.engagement.name = this.option
    this.engagement.title = this.option
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