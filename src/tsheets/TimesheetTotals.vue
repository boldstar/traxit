<template>
    <div class="timesheet-totals mx-3 shadow">
        <div class="timesheet-body">
            <table class="table table-bordered mb-0">
                <thead>
                    <tr>
                        <th>Current</th>
                        <th>Day</th>
                        <th>Week</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="font-weight-bold">
                            <span v-if="time != null">{{ time }}</span>
                            <span v-else-if="calculating">Loading...</span>
                            <span v-else>-:--</span>
                        </td>
                        <td>
                            <span v-if="totalForToday != null">{{ totalForToday }}</span>
                            <span v-else-if="calculating">Loading...</span>
                            <span v-else>-:--</span>
                        </td>
                        <td>
                            <span v-if="timestate">{{ weeksTime(totals) }}</span>
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
import {daysTotal} from '../plugins/tsheets'
export default {
    name: 'TimesheetTotals',
    props: ['current', 'totals'],
    data() {
        return {
            time: null,
            calculating: true,
            timestate: false,
            currentDistance: null,
            totalForToday: null
        }
    },
    computed: {
        
    },
    methods: {
        daysTime() {
            this.totalForToday = daysTotal(this.totals.results.timesheets, this.currentDistance)
        },
        weeksTime(totals) {

        },
        currentTime() {
            if(this.current == undefined)return; 
            var startDate = new Date(this.current.start).getTime();
            var now = new Date().getTime();
            var distance = now - startDate;
            this.currentDistance = distance
            // Time calculations for hours, minutes and seconds
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);
 
            // Output the result
            this.time = hours + ":" + (minutes + 2) + ":" + seconds
        },
    },
    mounted() {
        setInterval(this.currentTime, 1000)
        setInterval(this.daysTime, 1000)
        setTimeout(() => {
            this.calculating = false
        }, 3000)
    }
}
</script>

<style>

</style>
