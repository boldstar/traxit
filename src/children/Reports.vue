<template>
  <div class="mt-3">
    <div class="d-flex justify-content-between">
      <div class="h3 report-title">
        <span class="m-0">Reports Builder</span>
      </div>
    </div>
    <hr>

    <!-- this is the alert options -->
    <Alert v-if="errorAlert && $route.name === 'reports'" v-bind:message="errorAlert" />
    <Alert v-if="successAlert && $route.name === 'reports'" v-bind:message="successAlert" />
    <Alert v-if="processing" v-bind:message="'Downloading Your Report...'" />

    <div v-if="$route.name == 'reports'" class="d-flex flex-column justify-content-center align-items-center">
      <div class="card col-5 p-0 reports-card">
        <div class="card-header bg-white shadow font-weight-bold mb-2">
          <span>Engagements Report Card</span>
        </div>
        <div class="reports-info p-2">
          <p class="reports-info-text">By selecting "Engagement Type" you will be able to run a report by the following parameters</p>
          <p class="reports-info-text">None of the parameters are required, if you want all engagements simply click "Create Spreadsheet"</p>
          <ul>
            <li>Engagement Type (Tax Return, Bookkeeping or Custom)</li>
            <li>Engagement Year (The year the engagement was created for)</li>
            <li>Created On Date Range (The date range the the engagement was created between)</li>
            <li>Return Type (Only for engagements types of "Tax Return or Custom"</li>
            <li>Workflow (The workflow the engagement belongs to)</li>
            <li>Status (The status of the engagement in the workflow that the status belongs to)</li>
          </ul>
          <span class="font-weight-bold">More Filters Coming Soon</span>
        </div>

        <div class="d-flex flex-column align-items-center shadow p-3 report-card">
          <div class="text-left w-100">
            <label for="action-type" class="ml-3 text-primary font-weight-bold">Engagement Type</label>
            <select name="Custom" id="select" class="form-control mb-2" v-model="selectedType">
              <option disabled>{{option}}</option>
              <option value="taxreturn">Tax Returns</option>
              <option value="bookkeeping">Bookkeeping</option>
              <option value="custom">Custom</option>
            </select>
          </div>
    


        <form v-if="selectedType != option" class="w-100">
          <div class="text-left">
            <label for="action-type" class="ml-3 text-primary font-weight-bold">For The Year Of</label>
            <select name="Custom" id="select" class="form-control mb-2" v-model="year">
              <option disabled>{{option}}</option>
              <option v-for="(year, index) in years" :key="index" :value="year">{{year}}</option>
            </select>
          </div>
          <div class="text-left">
            <div v-if="!extraFilters">
              <p class="bg-white card border-primary p-2 font-weight-bold">Clicking the "Extra Filters" button will give you more flexibility on the report you are looking to run</p>
              <button type="button" class="btn btn-secondary btn-block font-weight-bold mb-3" @click="showFilters">Extra Filters</button>
            </div>
            <div v-if="extraFilters">
              <label for="data-picker" class="ml-3 text-primary font-weight-bold">Created On Date Range</label>
              <div class="d-flex bg-light form-control mb-3" id="date-picer">
                <div class="d-flex mr-2">
                  <span class="align-self-center mr-2">From</span>
                <v-date-picker
                  mode='single'
                  v-model='filters.fromValue'
                  :input-props='{class: "form-control h-100"}'>
                </v-date-picker>
                </div>
                <div class="d-flex">
                <span class="align-self-center mr-2">To</span>
                <v-date-picker
                  mode='single'
                  v-model='filters.toValue'
                  :input-props='{class: "form-control h-100"}'>
                </v-date-picker>
              </div>
              </div>
              <label for="return-type" class="ml-3 text-primary font-weight-bold" v-if="selectedType != 'bookkeeping'">Return Type</label>
              <select name="return-type" class="form-control my-2" v-model="filters.return_type" id="return-type" v-if="selectedType != 'bookkeeping'">
                <option disabled>{{option}}</option>
                <option v-for="(returntype, index) in returnTypes" :key="index" :value="returntype.return_type">{{returntype.return_type}}</option>
              </select>
              <label for="workflow" class="ml-3 text-primary font-weight-bold">Workflow</label>
              <select name="return-type" class="form-control mt-2 mb-3" v-model="filters.workflow" id="workflow">
                <option disabled>{{option}}</option>
                <option v-for="(workflow, index) in allWorkflows" :key="index" :value="workflow.id">{{workflow.workflow}}</option>
              </select>
              <label for="workflow" class="ml-3 text-primary font-weight-bold" v-if="filters.workflow != option">Status</label>
              <div class="mb-3" v-for="workflow in allWorkflows" :key="workflow.id" v-if="workflow.id === filters.workflow">
                <select class="custom-select" id="status" v-model="filters.status">
                  <option  selected disabled>{{ option }}</option>
                  <option v-for="status in workflow.statuses" :key="status.id" :value="status.status">
                    {{ status.status }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </form>
          <button :disabled="processing" type="button" class="btn btn-primary btn-block font-weight-bold w-100" @click="requestAReport">
            <span v-if="!processing">Create Spreadsheet</span>
            <span v-if="processing">Downloading Your Report...</span>
          </button>
      </div>
      </div>
    </div>


    <b-modal v-model="modalShow" id="myWorkflow" ref="myReports" hide-footer title="Reports Form">

    </b-modal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Alert from '@/components/Alert.vue'
import bModal from 'bootstrap-vue/es/components/modal/modal'
import bModalDirective from 'bootstrap-vue/es/directives/modal/modal'

export default {
  name: 'reports',
  data() {
    return {
      modalShow: false,
      typeExcel: false,
      typePdf: false,
      extraFilters: false,
      selectedType: null,
      selectedReturn: '',
      selectedAction: '',
      selectedStatus: '',
      workflowKey: null,
      option: 'Choose...',
      year: [],
      reportTypes: ['Tax Returns', 'Bookkeeping', 'Custom'],
      actionTypes: ['Created', 'Completed'],
      typeOfReport: '',
      filters: {
        workflow: null,
        return_type: null,
        status: null,
        fromValue: null,
        toValue: null,
      }
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
    ...mapGetters(['errorAlert', 'successAlert', 'returnTypes', 'allWorkflows', 'processing']),
    statusesByWorkflow () {
       const workflows = this.allWorkflows.filter(workflow => workflow.id === this.workflowKey)
       const res = workflows.map(({statuses}) => ({
        statuses: statuses.reduce((acc, cur) => {

        acc.push(cur.status);

        return acc;
    
        }, [])
      }))
      return res
    },
    years() {
      var currentYear = new Date().getFullYear(), years = [];
      var startYear =  2010;  
        while ( startYear <= currentYear ) {
            years.push(startYear++);
        }   
        return years;
    }
  },
  methods: {
    ...mapActions(['requestReport']),
    requestAReport() {
      if (this.selectedType == this.option) {
        this.selectedType = null
      } if (this.filters.return_type == this.option) {
        this.filters.return_type = null
      } if (this.filters.workflow == this.option) {
        this.filters.workflow = null
      } if( this.filters.status == this.option) {
        this.filters.status = null
      } if(this.year == this.option) {
        this.year = null
      }
      this.requestReport({
        type: this.selectedType,
        year: this.year,
        fromValue: this.filters.fromValue,
        toValue: this.filters.toValue,
        return_type: this.filters.return_type,
        action: this.selectedAction,
        workflow_id: this.filters.workflow,
        status: this.filters.status
      })
      .then(() => {
        this.modalShow = false
        this.typeOfReport = ''
        this.selectedType = this.option
        this.filters.return_type = this.option
        this.filters.workflow = this.option
        this.filters.status = this.option
        this.filters.action = this.option
        this.filters.fromValue = null
        this.filters.toValue = null
        this.extraFilters = false
      })
    },
    showFilters() {
      this.extraFilters = !this.extraFilters
    },
    showModal(type) {
      this.typeOfReport = type
      this.modalShow = true
      this.selectedType = this.option
      this.filters.return_type = this.option
      this.filters.workflow = this.option
      this.filters.status = this.option
      this.filters.action = this.option
      this.filters.fromValue = null
      this.filters.toValue = null
      this.extraFilters = false
    }
  },
  created: function() {
    this.selectedType = this.option
    this.filters.return_type = this.option
    this.filters.workflow = this.option
    this.filters.status = this.option
    this.filters.action = this.option
    this.filters.fromValue = null
    this.filters.toValue = null
    this.year = this.option
    this.$store.dispatch('getReturnTypes')
  },
}
</script>

<style lang="scss" scoped>

.reports-card {
  margin-bottom: 50px;
}

.report-card {
  border-radius: 5px;
}

.reports-info {
  background: #f7f7f7;
  font-size: .8rem;
  text-align: left;
}

.reports-info-text {
  margin-bottom: 5px;

  &:last-of-type {
    color: red;
  }
}

@media screen and (max-width: 1300px) {
  .reports-card {
    width:100%!important;
    max-width: 100%!important;
    flex: 0 0 100%!important;
  }
}

@media screen and (max-width: 600px) {
  .report-cards {
    flex-direction: column!important;
    align-items: center!important;
  }

  .report-title {
    font-size: 1rem!important;
    align-self: center!important;
    margin-bottom: 0!important;
  }
}

@media screen and (max-width: 375px) {
  .reports-info {
    font-size: .6rem;
  }
}

</style>