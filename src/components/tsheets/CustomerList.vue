<template>
    <div>   
     <div v-if="job_codes_received" class="customer-list-body">
        <div class="input-group search-input-group">
            <input type="text" v-model="searchJob" class="search-customer-input" placeholder="Search for customers">
            <i class="fab fa-searchengin"></i>
        </div>
       <div class="processing-list" v-if="processing">
            <div class="list-spinner"><Spinner /></div>
        </div>
      <ul class="p-0 customer-card mb-0">
        <li class="d-flex justify-content-between p-2 border current-job-li" v-if="current && currentJob">
          <span class="align-self-center">
            <i class="fas fa-star mr-2"></i>{{ currentJob.name }}
          </span>
          <button class="btn btn-sm btn-danger clock-in-btn font-weight-bold" @click="clockOut(currentJob.id)" :disabled="processing && clockingOut">
                <span v-if="processing && clockingOut">Clocking Out..</span>
                <span v-else>Clock Out</span>
            </button>
        </li>
        <li class="d-flex justify-content-between p-2 border previous-job-li" v-for="job in previousTimesheets" :key="job.id" @mouseover="showClockIn(job.id)" @mouseout="hideClockIn">
          <span class="align-self-center" :class="{'py-1': job.id != hoveredId}">
            <i class="fas fa-history mr-2"></i>{{ job.name }}
          </span>
           <button class="btn btn-sm btn-success clock-in-btn font-weight-bold" v-if="current && job.id == hoveredId" @click="switchJob(job)" :disabled="processing">
                <span v-if="!processing">Switch</span>
                <span v-if="processing">Switching..</span>
            </button>
           <button class="btn btn-sm btn-success clock-in-btn font-weight-bold" v-else-if="job.id == hoveredId" @click="clockIn(job)" :disabled="processing">
                <span v-if="!processing">Clock In</span>
                <span v-if="processing">Clocking In..</span>
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
import {compressItems} from '../../plugins/tsheets'
import {mapGetters} from 'vuex'
import Spinner from '@/components/loaders/Spinner.vue'
export default {
    name: 'CustomerList',
    props: ['customers', 'clock', 'current', 'previous'],
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
            return this.current && this.current.jobcode_id ? compressItems(this.customers).filter(code => code.id == this.current.jobcode_id)[0] : false
        },
        previousTimesheets() {
            return this.previous && this.previous.supplemental_data ? this.previous.supplemental_data.jobcodes.filter(j => j.id != this.currentJob) : null
        }
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

    .previous-job-li {
        background: #d4d4d43b;
    }

    .customer-list-body {
        position: relative;
    }

    .processing-list {
        position: absolute;
        background: rgba(0, 0, 0, 0.199);
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 1;
    }

    .list-spinner {
        margin-top: 100px;
    }

    .search-input-group {
        position: relative;
    }

    .fa-searchengin {
        position: absolute;
        right: 20px;
        top: 10px;
        font-size: 1.7rem!important;
    }
</style>
