<template>
    <div class="timesheet-totals">
        <div class="timesheet-body">
            <table class="table  mb-0">
                <thead>
                    <tr class="text-primary">
                        <th>Current</th>
                        <th>Day</th>
                        <th>Week</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="table-bordered" :key="clock_out_state">
                        <td class="font-weight-bold time-td">
                            <span v-if="totalForCurrent != null">{{ totalForCurrent }}</span>
                            <span v-else-if="calculating">Loading...</span>
                            <span v-else>-:--</span>
                        </td>
                        <td class="time-td">
                            <span v-if="totalForToday != null">{{ totalForToday }}</span>
                            <span v-else-if="calculating">Loading...</span>
                            <span v-else>-:--</span>
                        </td>
                        <td class="time-td">
                            <span v-if="totalForWeek != null">{{ totalForWeek }}</span>
                            <span v-else-if="calculating">Loading...</span>
                            <span v-else>-:--</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import {daysTotal, weeksTotal, currentTotal, distance, isEmpty} from '../plugins/tsheets'
import {mapGetters} from 'vuex'
export default {
    name: 'TimesheetTotals',
    props: ['current', 'totals', 'week-total'],
    data() {
        return {
            totalForCurrent: null,
            calculating: true,
            timestate: false,
            currentDistance: null,
            totalForToday: null,
            totalForWeek: null
        }
    },
    computed: {
       ...mapGetters(['clock_out_state']) 
    },
    methods: {
        daysTime() {
            if(isEmpty(this.totals.results.timesheets)) return;
            this.totalForToday = daysTotal(this.totals.results.timesheets, this.currentDistance ? this.currentDistance : 0)
        },
        weeksTime() {
            this.totalForWeek = weeksTotal(this.weekTotal, this.currentDistance)
        },
        currentTime() {
            if(this.current == undefined)return; 
            this.currentDistance = distance(this.current.start)
            this.totalForCurrent = currentTotal(this.current.start)
            this.$store.commit('CURRENT_TIME', this.totalForCurrent)
        },
        stopCurrentTime() {
            clearInterval(this.currentTime)
            this.totalForCurrent = null
            this.$store.commit('CURRENT_TIME', null)
        }
    },
    watch: {
        'clock_out_state': function(val) {
            if(val) {
                this.stopCurrentTime()
            }
        }
    },
    beforeDestroy() {
        clearInterval(this.daysTime)
        clearInterval(this.weeksTime)
    },
    mounted() {
        setInterval(this.currentTime, 1000)
        setInterval(this.daysTime, 1000)
        setInterval(this.weeksTime, 1000)
        setTimeout(() => {
            this.calculating = false
        }, 3000)
    }
}
</script>

<style>
    .time-td {
        font-size: 1.1rem;
        padding: 10px!important;
    }
</style>
