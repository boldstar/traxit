<template>
    <div class="timesheet-card">
        <div>
            <CurrentJob />
            <TimesheetTotals :key="timesheet || processing" :current="current_tsheet" :totals="total_tsheets" />
            <CustomerList :key="processing" :customers="job_codes" :current="current_tsheet" :clock="tsheet_id" @clock-in="clockIn" @switch-job="switchJob" @clock-out="blankFields = []"/>
            <TimesheetSelects :key="!processing" :cfields="custom_fields" :current-fields="currentFieldsObj" :items="custom_field_items" v-if="custom_fields_received" @item-select="setItemObj" @current-obj="setCurrentObj" :missing-fields="blankFields" @remove-error="removeFromErrors"/>
            <!-- <TeamTimesheet /> -->
            <div class="d-flex mx-3" v-if="current_tsheet">
                <button class="btn btn-sm btn-danger font-weight-bold" :disabled="processing" @click="clockOut">
                    <span v-if="processing">Clocking Out..</span>
                    <span v-else>Clock Out</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import Spinner from '../components/Spinner.vue'
import CurrentJob from './CurrentJob.vue'
import CustomerList from './CustomerList.vue'
import TimesheetTotals from './TimesheetTotals.vue'
import TeamTimesheet from './TeamTimesheet.vue'
import TimesheetSelects from './TimesheetSelects.vue'
import {requiredFields, validateFields, compressItems} from '../plugins/tsheets'
export default {
    name: 'TimesheetCard',
    data() {
        return {
            selectedCustomFields: {},
            blankFields: []
        }
    },
    components: {
        Spinner,
        CurrentJob,
        CustomerList,
        TimesheetTotals,
        TimesheetSelects,
        TeamTimesheet
    },
    computed: {
        ...mapGetters([
            'data_received', 
            'tsheets_user', 
            'current_tsheet', 
            'total_tsheets', 
            'custom_fields', 
            'custom_field_items', 
            'custom_fields_received',
            'job_codes',
            'job_codes_received',
            'tsheet_id',
            'processing',
            'timesheet'
        ]),
        currentFieldsObj() {
            return this.current_tsheet && this.current_tsheet.customfields ? this.current_tsheet.customfields : this.createObj()
        },
        storedJobCodes() {
            return JSON.parse(localStorage.getItem('jobcodes'))
        }
    },
    methods: {
        clockIn(job) {
            const required = requiredFields(this.custom_fields)
            const validated = validateFields(required, this.selectedCustomFields)
            if(validated.length > 0) {
                this.blankFields = validated
            } else {
                this.$store.dispatch('clockIn', {id: job.id, customFields: this.selectedCustomFields}).then(() => {
                    this.selectedCustomFields = {}
                    this.blankFields = [] 
                })
            }
        },
        setItemObj(items) {
            this.selectedCustomFields = items
        },
        removeFromErrors(item) {
            if(this.blankFields.indexOf(item) >= 0) {
                const index = this.blankFields.indexOf(item)
                this.blankFields.splice(index, 1)
            } 
        },
        switchJob(job) {
            const required = requiredFields(this.custom_fields)
            const validated = validateFields(required, this.selectedCustomFields)
            if(validated.length > 0) {
                this.blankFields = validated
            } else {
                this.$store.dispatch('switchJob', {id: job.id, customFields: this.selectedCustomFields}).then(() => {
                    this.selectedCustomFields = {}
                    this.blankFields = []  
                })
            }
        },
        createObj() {
            var obj = {}
            var keys = Object.keys(this.custom_fields)
            for( var i in keys) {
                obj[keys[i]] = ''
            } 
            this.selectedCustomFields = obj
            return obj
        },
        setCurrentObj(obj) {
            this.selectedCustomFields = obj
        },
        clockOut() {
            this.$store.dispatch('clockOut', this.current_tsheet.jobcode_id)
        }
    },
    created() {
        this.$store.dispatch('requestCurrentUser')
        this.$store.dispatch('requestTimesheet')
        this.$store.dispatch('requestTimesheetTotal')
        this.$store.dispatch('requestCustomFields')
        this.$store.dispatch('requestJobCodes')
    }
}
</script>
