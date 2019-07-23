<template>
    <div class="timesheet-totals mx-3 shadow">
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
                    <tr class="table-bordered">
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
import {daysTotal, currentTotal, distance} from '../plugins/tsheets'
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
        
    },
    methods: {
        daysTime() {
            this.totalForToday = daysTotal(this.totals.results.timesheets, this.currentDistance)
        },
        weeksTime() {
            this.totalForWeek = daysTotal(this.weekTotal, this.currentDistance)
        },
        currentTime() {
            if(this.current == undefined)return; 
            this.currentDistance = distance(this.current.start)
            this.totalForCurrent = currentTotal(this.current.start)
        },
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
