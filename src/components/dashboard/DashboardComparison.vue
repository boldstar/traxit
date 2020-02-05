<template>
    <div class="comparison bg-white">
        <div class="text-left p-2">
            <div class="d-flex flex-column">
                <div class="d-flex h5 mb-0">
                    <i class="fas fa-chart-area mr-2 text-primary align-self-center"></i>
                    <span class="font-weight-bold">Comparison</span>
                </div>
                <p class="mb-0 font-weight-bold text-secondary">A comparison between created and completed engagements</p>
            </div>
        </div>
        <line-chart class="w-100 mt-3 card-body" :height="barHeight" :chart-data="lineData" v-if="completedDates && createdDates"></line-chart>
    </div>
</template>

<script>
import LineChart from '@/components/charts/LineChart.vue'
import moment from 'moment'
export default {
    name: 'DashboardComparison',
    props: ['engagements', 'tax_year', 'created_engagements', 'completed_engagements'],
   components: {
        LineChart,
    },
    data () {
        return {
            barHeight: 260,
           
        }
    },
    computed: {
        createdDates() {
            const dates = this.created_engagements.filter(eng => this.tax_year === 'All' ? eng : eng[1] === this.tax_year).map(e => e[0].date)
            const formateddates = dates.reduce((acc, date) => {
                const momentDate = new Date(date)
                acc.push(moment(momentDate).format('MM/DD/YYYY'))

                return acc
            }, [])
            const filtereddates = this.mapCreatedDates(formateddates)
            const sorteddates = filtereddates.sort((a, b) => {return new Date(a.x) - new Date(b.x)})
            return sorteddates
        },
        completedDates() {
            const dates = this.completed_engagements.filter(eng => this.tax_year === 'All' ? eng : eng[1] === this.tax_year).map(e => e[0].date)
            const formateddates = dates.reduce((acc, date) => {
                const momentDate = new Date(date)
                acc.push(moment(momentDate).format('MM/DD/YYYY'))

                return acc
            }, [])
            const filtereddates = this.mapCreatedDates(formateddates)
            const sorteddates = filtereddates.sort((a, b) => {return new Date(a.x) - new Date(b.x)})
            return sorteddates
        },
        lineData () {
            return {
                datasets: [
                    {
                    label: 'Created',
                    pointBackgroundColor: 'black',
                    backgroundColor: '#0077ff2c',
                    borderColor: '#0077ff',
                    data: this.createdDates,
                    lineTension: .2,
                    },
                    {
                    label: 'Completed',
                    pointBackgroundColor: 'black',
                    backgroundColor: '#00aaff9c',
                    borderColor:  '#00ccff',
                    data: this.completedDates,
                    lineTension: .2
                    }
                ]
            }
        },
    },
    methods: {
        mapCreatedDates(arr) {
            var a = [], prev;

            arr.sort();
            for ( var i = 0; i < arr.length; i++ ) {
                if ( arr[i] !== prev ) {
                    a.push({
                        x: arr[i],
                        y: 1
                    })
                } else {
                    a[a.length-1].y++
                }
                prev = arr[i];
            }

            return a;
        },
    },
}
</script>

<style lang="scss">
    .comparison {
        width: 100%;
    }
</style>