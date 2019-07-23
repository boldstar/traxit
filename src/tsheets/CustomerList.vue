<template>
    <div>   
     <div class="mx-3 shadow" v-if="job_codes_received">
      <input type="text" v-model="searchJob" class="search-customer-input" placeholder="Search for customers">
      <ul class="p-0 customer-card">
        <li class="d-flex justify-content-between p-2 border current-job-li" v-if="current">
          <span class="align-self-center">
            <i class="fas fa-star mr-2"></i>{{ currentJob.name }}
          </span>
          <button class="btn btn-sm btn-danger clock-in-btn font-weight-bold" @click="clockOut(currentJob.id)" :disabled="processing && clockingOut">
                <span v-if="processing && clockingOut">Clocking Out..</span>
                <span v-else>Clock Out</span>
            </button>
        </li>
        <li class="d-flex justify-content-between p-2 border" v-for="(code, index) in computedJobCodes" :key="index" @mouseover="showClockIn(code.id)" @mouseout="hideClockIn">
          <span class="align-self-center" :class="{'py-1': code.id != hoveredId}">
            {{code.name}}
          </span>
          <button class="btn btn-sm btn-success clock-in-btn font-weight-bold" v-if="!current && code.id == hoveredId" @click="clockIn(code)" :disabled="processing">
                <span v-if="!processing">Clock In</span>
                <span v-if="processing">Clocking In..</span>
            </button>
          <button class="btn btn-sm btn-success clock-in-btn font-weight-bold" v-else-if="current && code.id == hoveredId" @click="switchJob(code)" :disabled="processing">
                <span v-if="!processing">Switch</span>
                <span v-if="processing">Switching..</span>
            </button>
        </li>
      </ul>
    </div>
    <div class="d-flex flex-column align-items-center bg-light m-3 p-3 shadow" v-else>
       <span class="font-weight-bold">Retrieving Customers. This Could Take A Minute.</span> 
        <Spinner />
    </div>
    </div>
</template>

<script>
import {compressItems} from '../plugins/tsheets'
import {mapGetters} from 'vuex'
import Spinner from '../components/Spinner.vue'
export default {
    name: 'CustomerList',
    props: ['customers', 'clock', 'current'],
    components: {Spinner},
    data() {
        return {
            searchJob: '',
            hoveredId: null,
            clockingOut: false
        }
    },
    computed: {
        ...mapGetters(['tsheet_id', 'processing', 'job_codes_received']),
        computedJobCodes() {
            return compressItems(this.customers).filter(code => {if(!this.searchJob){ return code } else{ return code.name.toLowerCase().indexOf(this.searchJob.toLowerCase()) >= 0}})
        },
        currentJob() {
            return compressItems(this.customers).filter(code => code.id == this.current.jobcode_id)[0]
        },
    },
    methods: {
        clockIn(code) {
            this.$emit('clock-in', code)
            this.clockingOut = false
        },
        showClockIn(id) {
            this.hoveredId = id
        },
        hideClockIn() {
            this.hoveredId = null
        },
        clockOut(job) {
            this.clockingOut = true
            this.$store.dispatch('clockOut', job)
        },
        switchJob(job) {
            this.$emit('switch-job', job)
            this.searchJob = ''
            this.clockingOut = false
        }
    },
    mounted() {
        this.searchJob = ''
    }
}
</script>

<style>
    .customer-card {
        height: 300px;
        overflow-y: scroll;
    }

    .search-customer-input {
        width: 100%;
        padding: 10px;
        font-size: 1.00rem;
    }

    .current-job-li {
        background: #0077ff3b;
    }
</style>
