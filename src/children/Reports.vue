<template>
  <div class="mt-3">
    <div class="d-flex justify-content-between">
      <div class="h3">
        <span class="m-0">Reports Center</span>
      </div>
    </div>
    <hr>

    <!-- this is the alert options -->
    <Alert v-if="errorAlert && $route.name === 'workflows'" v-bind:message="errorAlert" />
    <Alert v-if="successAlert && $route.name === 'workflows'" v-bind:message="successAlert" />

    <div class="d-flex flex-wrap justify-content-center" v-if="$route.name == 'reports'">
      <div class="d-flex justify-content-around col-12 mt-5">
        <div class="card-body shadow col-3 d-flex flex-column">
          <span class="h3 mb-0 py-3 bg-light">Excel</span>
          <i class="far fa-file-excel fa-5x my-4"></i>
          <div>
            <button type="button" class="btn btn-primary font-weight-bold" @click="showModal('EXCEL')">Start</button>
          </div>
        </div>
        <div class="card-body shadow col-3 d-flex flex-column">
          <span class="h3 mb-0 py-3 bg-light">PDF</span>
          <i class="far fa-file-pdf fa-5x my-4"></i>
          <div>
            <button type="button" class="btn btn-primary font-weight-bold" @click="showModal('PDF')">Start</button>
          </div>
        </div>
      </div>

    <b-modal v-model="modalShow" id="myWorkflow" ref="myReports" hide-footer title="Reports Form">
      <div class="text-left">
        <label for="action-type" class="ml-3 text-primary font-weight-bold">Category</label>
        <select name="Custom" id="select" class="form-control my-2" v-model="selectedOption">
          <option disabled>{{option}}</option>
          <option v-for="(type, index) in reportTypes" :key="index" :value="type">{{type}}</option>
        </select>
      </div>


      <form v-if="selectedOption == 'Tax Returns'">
        <div class="text-left">
          <label for="data-picker" class="ml-3 text-primary font-weight-bold">Date Range</label>
          <div class="d-flex bg-light form-control mb-3" id="date-picer">
            <div class="d-flex mr-2">
              <span class="align-self-center mr-2">From</span>
            <v-date-picker
              mode='single'
              v-model='fromValue'
              :input-props='{class: "form-control h-100"}'>
            </v-date-picker>
            </div>
            <div class="d-flex">
            <span class="align-self-center mr-2">To</span>
            <v-date-picker
              mode='single'
              v-model='toValue'
              :input-props='{class: "form-control h-100"}'>
            </v-date-picker>
          </div>
          </div>
          <div v-if="!extraFilters">
            <p class="bg-white card border-primary p-2 font-weight-bold">Clicking the "Extra Filters" button will give you more flexibility on the report you are looking to run</p>
            <button type="button" class="btn btn-secondary btn-block font-weight-bold mb-3" @click="showFilters">Extra Filters</button>
          </div>
          <div v-if="extraFilters">
            <label for="action-type" class="ml-3 text-primary font-weight-bold">Action Type</label>
            <select name="return-type" class="form-control my-2" v-model="selectedAction" id="action-type">
              <option disabled>{{option}}</option>
              <option v-for="(action, index) in actionTypes" :key="index" :value="action">{{action}}</option>
            </select>
            <label for="return-type" class="ml-3 text-primary font-weight-bold">Return Type</label>
            <select name="return-type" class="form-control my-2" v-model="selectedReturn" id="return-type">
              <option disabled>{{option}}</option>
              <option v-for="(returntype, index) in returnTypes" :key="index" :value="returntype">{{returntype.return_type}}</option>
            </select>
            <label for="workflow" class="ml-3 text-primary font-weight-bold">Workflow</label>
            <select name="return-type" class="form-control mt-2 mb-3" v-model="workflowKey" id="workflow">
              <option disabled>{{option}}</option>
              <option v-for="(workflow, index) in allWorkflows" :key="index" :value="workflow.id">{{workflow.workflow}}</option>
            </select>
            <label for="workflow" class="ml-3 text-primary font-weight-bold" v-if="workflowKey != option">Status</label>
            <div class="mb-3" v-for="workflow in allWorkflows" :key="workflow.id" v-if="workflow.id === workflowKey">
              <select class="custom-select" id="status" v-model="selectedStatus">
                <option  selected disabled>{{ option }}</option>
                <option v-for="status in workflow.statuses" :key="status.id" :value="status.status">
                  {{ status.status }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <button type="button" class="btn btn-primary btn-block font-weight-bold" @click="requestAReport">Download Excel Report</button>
      </form>


      <form v-if="selectedOption == 'Bookkeeping'">
         <div class="text-left">
          <label for="data-picker" class="ml-3 text-primary font-weight-bold">Date Range</label>
          <div class="d-flex bg-light form-control mb-3" id="date-picer">
            <div class="d-flex mr-2">
              <span class="align-self-center mr-2">From</span>
            <v-date-picker
              mode='single'
              v-model='fromValue'
              :input-props='{class: "form-control h-100"}'>
            </v-date-picker>
            </div>
            <div class="d-flex">
            <span class="align-self-center mr-2">To</span>
            <v-date-picker
              mode='single'
              v-model='toValue'
              :input-props='{class: "form-control h-100"}'>
            </v-date-picker>
          </div>
          </div>
          <div v-if="!extraFilters">
            <p class="bg-white card border-primary p-2 font-weight-bold">Clicking the "Extra Filters" button will give you more flexibility on the report you are looking to run</p>
            <button type="button" class="btn btn-secondary btn-block font-weight-bold mb-3" @click="showFilters">Extra Filters</button>
          </div>
          <div v-if="extraFilters">
            <label for="action-type" class="ml-3 text-primary font-weight-bold">Action Type</label>
            <select name="return-type" class="form-control my-2" v-model="selectedAction" id="action-type">
              <option disabled>{{option}}</option>
              <option v-for="(action, index) in actionTypes" :key="index" :value="action">{{action}}</option>
            </select>
            <label for="return-type" class="ml-3 text-primary font-weight-bold">Return Type</label>
            <select name="return-type" class="form-control my-2" v-model="selectedReturn" id="return-type">
              <option disabled>{{option}}</option>
              <option v-for="(returntype, index) in returnTypes" :key="index" :value="returntype">{{returntype.return_type}}</option>
            </select>
            <label for="workflow" class="ml-3 text-primary font-weight-bold">Workflow</label>
            <select name="return-type" class="form-control mt-2 mb-3" v-model="workflowKey" id="workflow">
              <option disabled>{{option}}</option>
              <option v-for="(workflow, index) in allWorkflows" :key="index" :value="workflow.id">{{workflow.workflow}}</option>
            </select>
            <label for="workflow" class="ml-3 text-primary font-weight-bold" v-if="workflowKey != option">Status</label>
            <div class="mb-3" v-for="workflow in allWorkflows" :key="workflow.id" v-if="workflow.id === workflowKey">
              <select class="custom-select" id="status" v-model="selectedStatus">
                <option  selected disabled>{{ option }}</option>
                <option v-for="status in workflow.statuses" :key="status.id" :value="status.status">
                  {{ status.status }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <button type="button" class="btn btn-primary btn-block font-weight-bold" @click="requestAReport">Download Excel Report</button>
      </form>



    </b-modal>
  </div>
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
      selectedOption: '',
      selectedReturn: '',
      selectedAction: '',
      selectedStatus: '',
      workflowKey: null,
      option: 'Choose...',
      reportTypes: ['Tax Returns', 'Bookkeeping'],
      actionTypes: ['Created', 'Updated', 'Completed'],
      fromValue: new Date(),
      toValue: new Date(),
      typeOfReport: '',
      filters: {
        workflow: '',
        return_type: '',
        status: ''
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
    ...mapGetters(['errorAlert', 'successAlert', 'returnTypes', 'allWorkflows']),
    statusesByWorkflow () {
       const workflows = this.allWorkflows.filter(workflow => workflow.id === this.workflowKey)
       const res = workflows.map(({statuses}) => ({
        statuses: statuses.reduce((acc, cur) => {

        acc.push(cur.status);

        return acc;
    
        }, [])
      }))
      return res
    }
  },
  methods: {
    ...mapActions(['requestReport']),
    requestAReport() {
      this.requestReport({
        filters: this.extraFilters,
        type: this.typeOfReport,
        return_type: this.filters.return_type,
        workflow: this.filters.workflow,
        status: this.filters.status,
        fromValue: this.fromValue,
        toValue: this.toValue,
      })
      .then(() => {
        this.modalShow = false
        this.typeOfReport = ''
        this.selectedOption = this.option
        this.selectedReturn = this.option
        this.selectedAction = this.option
        this.selectedStatus = this.option
        this.workflowKey = this.option
        this.extraFilters = false
      })
    },
    showFilters() {
      this.extraFilters = !this.extraFilters
    },
    showModal(type) {
      this.typeOfReport = type
      this.modalShow = true
      this.selectedOption = this.option
      this.selectedReturn = this.option
      this.selectedAction = this.option
      this.selectedStatus = this.option
      this.workflowKey = this.option
      this.extraFilters = false
    }
  },
  created: function() {
    this.selectedOption = this.option
    this.selectedReturn = this.option
    this.selectedAction = this.option
    this.selectedStatus = this.option
    this.workflowKey = this.option
    this.$store.dispatch('getReturnTypes')
  },
}
</script>

<style lang="scss" scoped>

.image {
  width: 95%;
  max-height: 75vh;
}

</style>