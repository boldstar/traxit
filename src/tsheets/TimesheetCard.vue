<template>
    <div class="timesheet-card" :key="`A-${sync_tsheets}`">
        <transition name="router-animation" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in">
            <TimesheetAlert v-if="tsheet_alert" :message="tsheet_alert" />
        </transition>
        <!-- <CurrentJob :current-job="tasks" :key="timesheet" /> -->
        <div class="card mx-3 shadow">
            <TimesheetTotals :key="`B-${timesheet}`" :current="current_tsheet" :totals="total_tsheets" :week-total="weeks_tsheets" />
            <CustomerList :key="`C-${processing}`" :previous="total_tsheets" :customers="job_codes" :current="current_tsheet" :clock="tsheet_id" @clock-in="clockIn" @switch-job="switchJob" @clock-out="blankFields = []"/>
            <TimesheetSelects :updating="updating_items" :key="`D-${updating_items}`" :cfields="custom_fields" :current-fields="currentFieldsObj" :items="custom_field_items" v-if="custom_fields_received" @item-select="setItemObj" @current-obj="setCurrentObj" :missing-fields="blankFields" @remove-error="removeFromErrors"/>
            <!-- <TeamTimesheet /> -->
            <div class="d-flex justify-content-between card-footer">
                <button class="btn btn-sm btn-danger font-weight-bold" v-if="current_tsheet" :disabled="clock_out_state" @click="clockOut">
                    <span v-if="clock_out_state">Clocking Out..</span>
                    <span v-else>Clock Out</span>
                </button>
                <button class="btn btn-sm btn-primary font-weight-bold" :disabled="sync_tsheets" @click="syncTsheets">
                    <span v-if="sync_tsheets">Syncing...</span>
                    <span v-else>Sync Tsheets</span>
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
import TimesheetAlert from './TimesheetAlert.vue'
import {requiredFields, validateFields, compressItems} from '../plugins/tsheets'
export default {
    name: 'TimesheetCard',
    data() {
        return {
            selectedCustomFields: {},
            blankFields: [],
        }
    },
    components: {
        Spinner,
        CurrentJob,
        CustomerList,
        TimesheetTotals,
        TimesheetSelects,
        TeamTimesheet,
        TimesheetAlert
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
            'timesheet',
            'weeks_tsheets',
            'tasks',
            'tsheet_alert',
            'updating_items',
            'sync_tsheets',
            'clock_out_state'
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
                this.$store.commit('TSHEET_ALERT', 'Please provide service item')
            } else {
                this.$store.dispatch('clockIn', {id: job.id, customFields: this.selectedCustomFields}).then(() => {
                    this.selectedCustomFields = {}
                    this.blankFields = [] 
                })
            }
        },
        setItemObj(items) {
            this.selectedCustomFields = items
            if(this.current_tsheet) {
                this.$store.dispatch('updateFieldItems', {id: this.current_tsheet.jobcode_id, customFields: this.selectedCustomFields}).then(() => {
                    this.selectedCustomFields = {}
                    this.blankFields = []  
                })
            } return
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
                this.$store.commit('TSHEET_ALERT', 'Please provide service item')
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
        },
        syncTsheets() {
            this.$store.dispatch('syncTsheets')
        }
    },
    created() {
        this.$store.dispatch('requestCurrentUser')
        this.$store.dispatch('requestTimesheet')
        this.$store.dispatch('requestTimesheetTotal')
        this.$store.dispatch('requestWeeksTimesheets')
        this.$store.dispatch('requestCustomFields')
        this.$store.dispatch('requestJobCodes')
         this.$store.dispatch('retrieveTasks');
    }
}
</script>

