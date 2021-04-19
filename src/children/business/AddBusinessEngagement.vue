<template>
  <div class="container col-6 mb-3">
    <div class="card-body bg-light border mb-2">
        <div class="input-group my-3">
            <div class="input-group-prepend">
                <label class="input-group-text text-primary font-weight-bold" for="option">Workflow<span class="text-danger">*</span></label>
            </div>
            <select class="form-control" name="workflow_id" id="workflow_id" v-model="engagement.workflow_id" v-if="allWorkflows.length > 0">
                <option v-for="workflow in allWorkflows" :key="workflow.id" :value="workflow.id">{{workflow.workflow}}</option>
            </select>
        </div>
    </div>
    <form @submit.prevent="validateBeforeSubmit" class="d-flex-column justify-content-center bg-light px-3 pt-3 border pb-0" v-if="engagement.workflow_id != null">
      <div class="form-group text-left">
        <span class=" font-weight-bold"><span class="text-danger">*</span> Required field</span>

        <div v-if="workflow && workflow.engagement_type == 'Bookkeeping'">
          <div class="d-flex justify-content-between mb-3 p-2 custom-control custom-checkbox bg-white form-control" v-bind:class="{'input-error' : nothingChecked}">
            <div class="d-flex">
              <span class="mr-3 font-weight-bold h6 span-4-checkbox">Monthly</span>
              <input type="checkbox" v-model="monthChecked" class="custom-control-input ml-3" id="customCheck1" @change="selectedMonthRange">
              <label class="custom-control-label ml-3" for="customCheck1"></label>
            </div>
            <div class="d-flex">
              <span class="mr-3 font-weight-bold h6 span-4-checkbox">Quarterly</span>
              <input type="checkbox" v-model="quarterChecked" class="custom-control-input ml-3" id="customCheck2" @change="selectedQuarterRange">
              <label class="custom-control-label ml-3" for="customCheck2"></label>
            </div>
            <div class="d-flex">
              <span class="mr-3 font-weight-bold h6 span-4-checkbox">Annual</span>
              <input type="checkbox" v-model="annualChecked" class="custom-control-input ml-3" id="customCheck3" @change="selectedAnnualRange">
              <label class="custom-control-label ml-3" for="customCheck3"></label>
            </div>
          </div>
          <small v-if="nothingChecked" class="text-danger">Please select a date range before submitting</small>
        </div>

        <form-select :options="years" :value_type="'array'" :selected="option" :label="'Tax Year'" :prop="'year'" @select-change="selectedValue" :required="true" :formError="errorsList"></form-select>

        
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

        <form-select :options="difficulty_levels" :value_type="'objects'" :selected="option" :label="'Difficulty'" :prop="'difficulty'" @select-change="selectedValue" :required="false" :formError="errorsList"></form-select>
        <form-select :options="priority_levels" :value_type="'objects'" :selected="option" :label="'Priority'" :prop="'priority'" @select-change="selectedValue" :required="false" :formError="errorsList"></form-select>
        <form-select :options="monthly" :value_type="'array'" :selected="option" :label="'Month of'" :prop="'title'" @select-change="selectedValue" v-if="monthRange" :required="true" :formError="errorsList"></form-select>
        <form-select :options="quarterly" :value_type="'array'" :selected="option" :label="'Quarter'" :prop="'title'" @select-change="selectedValue" v-if="quarterRange" :required="true" :formError="errorsList"></form-select>
        <form-select :options="reducedReturnTypes" :value_type="'array'" :selected="option" :label="'Return Type'" :prop="'return_type'" @select-change="selectedValue" v-if="returnTypes && workflow && workflow.engagement_type != 'Bookkeeping'" :required="true" :formError="errorsList"></form-select>
        <form-select :options="filteredUsers" :value_type="'objects'" :selected="option" :label="'Assign To'" :prop="'assigned_to'" @select-change="selectedValue" :required="true" :formError="errorsList"></form-select>
        <form-select :options="statuses" :value_type="'array'" :selected="option" :label="'Status'" :prop="'status'" @select-change="selectedValue" :required="true" :formError="errorsList"></form-select>


      <button type="submit" class="btn btn-primary d-flex justify-content-start font-weight-bold" :disabled="processing">
        <span v-if="!processing">Start Engagement</span>
        <span v-if="processing">Starting...</span>
      </button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import FormSelect from '@/components/forms/FormSelect.vue'
import Spinner from '@/components/loaders/Spinner.vue'
import levels from '../../plugins/levels'
export default {
  name: 'AddBusinessEngagement',
  props: ['business'],
  components: {FormSelect, Spinner},
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
      data: false,
      engagement: {
        title: '',
        year: null,
        name: null,
        workflow_id: null,
        return_type: null,
        assigned_to: null,
        status: null,
        difficulty: null,
        priority: null,
        estimated_date: null
      },
      difficulty_levels: levels.difficulty_levels,
      priority_levels: levels.priority_levels,
      option: 'Choose...',
      empty: 'Please select workflow first...',
      monthly: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      quarterly: ['Jan-Mar', 'Apr-Jun', 'Jul-Sep', 'Oct-Dec'],
      requiredTax: ['year', 'return_type', 'assigned_to', 'status'],
      requiredBook: ['year', 'title', 'assigned_to', 'status'],
      requiredOther: ['year', 'assigned_to', 'status'],
      errorsList: []
    }
  },
  computed: {
    ...mapGetters(
        [
          'allWorkflows',
          'users',
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
    reducedReturnTypes() {
      return this.returnTypes.reduce((acc, type) => {
        acc.push(type.return_type)
        return acc
      }, [])
    },
    statuses() {
      return this.allWorkflows.filter(w => w.id === this.engagement.workflow_id)[0].statuses.reduce((acc, status) => {
        acc.push(status.status)
        return acc
      }, [])
    },
    workflow() {
        return this.allWorkflows.filter(workflow => workflow.id === this.engagement.workflow_id)[0]
    },
    filteredUsers() {
        return this.users.filter(user => user.name != 'Admin')
    }
  },
  methods: {
    ...mapActions(['addEngagement']),
    removeSelected() {
      this.engagement.client_id = this.option
      this.engagement.name = this.option
    },
    validateFields(fields, engagement) {
      for(var i = 0; i < fields.length; i++) {
          const prop = fields[i]
          const value = this.engagement[prop]
          if(!value || value == this.option) {
            console.log(prop)
            this.errorsList.push(prop)
          }
      } if(this.errorsList.length >= 1) {
        return false
      } else {
        return true
      }
    },
    validateBeforeSubmit() {
          const result = null

          if(this.workflow.engagement_type == 'Tax Return') {
            const result = this.validateFields(this.requiredTax, this.engagement)
            if(result) {
              this.addNewEngagement()
            } 
          } else if(this.workflow.engagement_type == 'Bookkeeping') {
            const result = this.validateFields(this.requiredBook, this.engagement)
            if(result) {
              this.addNewEngagement()
            }
          } else {
            const result = this.validateFields(this.requiredOther, this.engagement)
            if(result) {
              this.addNewEngagement()
            }
          }

          return
      },
    addNewEngagement() {
      this.addEngagement({
        type: this.workflow.engagement_type.replace(/[^a-zA-Z0-9 ]/g, "").replace(/\s+/g,'' ).replace(/^\s/,'').replace(/\s$/,'').toLowerCase(),
        title: this.engagement.title,
        description: this.workflow.workflow,
        category: 'Business',
        client_id: this.business.client_id,
        name: this.business.business_name,
        workflow_id: this.engagement.workflow_id,
        return_type: this.engagement.return_type == this.option ? null : this.engagement.return_type,
        year: this.engagement.year,
        assigned_to: this.engagement.assigned_to,
        status: this.engagement.status,
        difficulty: this.engagement.difficulty == this.option ? null : this.engagement.difficulty,
        priority: this.engagement.priority == this.option ? 0 : this.engagement.priority,
        estimated_date: this.engagement.estimated_date == this.option ? null : this.engagement.estimated_date,
        done: false
      }).then(() => {
        this.$store.dispatch('retrieveTasks')
      })
    },
    selectedValue(prop, value) {
      if(this.errorsList.includes(prop)) {
        var index = this.errorsList.indexOf(prop)
        this.errorsList.splice(index, 1)
      }
      this.engagement[prop] = value
      return
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
    }
  },
  created: function() {
    this.$store.dispatch('retrieveWorkflows');
    this.$store.dispatch('retrieveUsers');
    this.$store.dispatch('getReturnTypes')
    this.engagement.return_type = this.option
    this.engagement.client_id = this.option
    this.engagement.assigned_to = this.option
    this.engagement.status = this.option
    this.engagement.category = this.option
    this.engagement.name = this.option
    this.engagement.year = this.option
    this.engagement.priority = this.option
    setTimeout(() => {
        this.data = true
        this.engagement.workflow_id = this.allWorkflows[0].id
    }, 2000)
  },
}
</script>

<style lang="scss" scoped>

  .input-error {
      border: 1px solid red;
  }

  #due_date {
    box-sizing: border-box;
    flex-grow: 1;
  }

</style>
