<template>
    <div class="timesheet-card">
        <div v-if="!data_received">
            <!-- <CurrentJob /> -->
            <TimesheetTotals />
            <CustomerList :customers="job_codes" v-if="job_codes_received" :clock="tsheet_id" />
            <TimesheetSelects :cfields="custom_fields" :items="custom_field_items" v-if="custom_fields_received" />
            <!-- <TeamTimesheet /> -->
        </div>
        <div v-else>
            <p class="font-weight-bold bg-light py-3 mt-1">Building Timesheet. This could take a minute...</p>
            <div class="border mx-3 shadow">
                <spinner></spinner> 
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
export default {
    name: 'TimesheetCard',
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
            'tsheet_id'
        ])
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
