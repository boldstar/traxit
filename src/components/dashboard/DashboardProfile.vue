<template>
  <div class="d-flex flex-column col-4 profile-card" v-if="!loading && !noData">
                <div class="card h-100 mb-3" >
                    <div class="card-header p-2 text-left">
                        <span class="h5 mb-0 font-weight-bold align-self-center" v-if="details && details.business_name">{{ businessName }}</span>
                        <router-link :disabled="role != 'Admin'" to="/administrator/account" class="btn btn-secondary btn-sm font-weight-bold align-self-center" v-else>Add Bussiness Name</router-link>
                    </div>
                    <div class="card-body px-0 pb-0">
                        <img class="ml-5 profile-logo" v-if="details && details.logo && logo" v-bind:src="logo" />
                        <router-link :disabled="role != 'Admin'" to="/administrator/account" class="btn btn-primary font-weight-bold my-5" v-else>Add Logo</router-link>
                        <hr>
                        <ul class="px-2">
                            <div class="data-card mb-3">
                                <div class="data-card-header">
                                    <span>Activity Totals</span>
                                </div>
                                <li class="d-flex justify-content-between"> 
                                    <span class="mr-2 font-weight-bold">Active: </span>
                                    <span>{{ activeEngagements }}</span>
                                </li>
                                <li class="d-flex justify-content-between mt-1"> 
                                    <span class="mr-2 font-weight-bold">Complete: </span>
                                    <span>{{ countCompleteEngagements }}</span>
                                </li>
                            </div>
                            <div class="data-card">
                                <div class="data-card-header">
                                    <span>Type Totals</span>
                                </div>
                                <li class="d-flex justify-content-between"> 
                                    <span class="mr-2 font-weight-bold">Tax Returns: </span>
                                    <span>{{ totalTaxReturns }}</span>
                                </li>
                                <li class="d-flex justify-content-between my-1"> 
                                    <span class="mr-2 font-weight-bold">Bookkeeping: </span>
                                    <span>{{ totalBookkeeping }}</span>
                                </li>
                                <li class="d-flex justify-content-between"> 
                                    <span class="mr-2 font-weight-bold">Other: </span>
                                    <span>{{ totalCustom }}</span>
                                </li>
                            </div>
                        </ul>
                    </div>
                    <line-chart class="w-100 line-chart" :height="barHeight" :chart-data="lineData"></line-chart>
                </div>
            </div>
</template>

<script>
import DashboardDoughnuts from '@/components/dashboard/DashboardDoughnuts.vue'
import DoughnutChart from '@/components/DoughnutChart.vue'
import BarChart from '@/components/BarChart.vue'
import LineChart from '@/components/LineChart.vue'
import Welcome from '@/components/Welcome.vue'
import Spinner from '@/components/Spinner.vue'
import moment from 'moment'
import { mapGetters } from 'vuex'

export default {
   name: 'DashboardProfile',
   props: ['workflows', 'tasks', 'engagements', 'tax_year', 'current_workflow', 'created_engagements', 'completed_engagements','details'],
   components: {
        DashboardDoughnuts,
        DoughnutChart,
        BarChart,
        LineChart,
        Welcome,
        Spinner
    },
    data () {
        return {
            barHeight: 250,
            workflowKey: null,
            chartData: false,
            taskData: false,
            loading: false,
            noData: false,
            selected: false,
            currentYear: 'All',
            option: 'All',
            averageCalc: false,
           
        }
    },
    computed: {
        businessName() {
            return this.details.business_name
        },
        logo() {
            return `data:image/png;base64, ${this.details.logo}`
        },
        activeEngagements() {
            return this.engagements.filter(engagement => engagement.done == false).filter(eng => this.currentYear === 'All' ? eng : eng.year === this.currentYear).length
        },
        totalTaxReturns() {
            return this.engagements.filter(engagement => engagement.type == 'taxreturn').filter(eng => this.currentYear === 'All' ? eng : eng.year === this.currentYear).length
        },
        totalBookkeeping() {
            return this.engagements.filter(engagement => engagement.type == 'bookkeeping').filter(eng => this.currentYear === 'All' ? eng : eng.year === this.currentYear).length
        },
        totalCustom() {
            return this.engagements.filter(engagement => engagement.type == 'custom').filter(eng => this.currentYear === 'All' ? eng : eng.year === this.currentYear).length
        },
        filterYears() {
            //map year
            const years = this.engagements.map(engagement => engagement.year)
            //filter duplicates
            const result = years.filter((v, i) => years.indexOf(v) === i)

            return result
        },
        countCompleteEngagements() {
            const res = this.engagements.filter(engagement => engagement.done == true).length
            
            return res
        },
        createdDates() {
            const dates = this.created_engagements.filter(eng => this.currentYear === 'All' ? eng : eng[1] === this.currentYear).map(e => e[0].date)
            const formateddates = dates.reduce((acc, date) => {
                const momentDate = new Date(date)
                acc.push(moment(momentDate).format('MM/DD/YYYY'))

                return acc
            }, [])
            const filtereddates = this.mapCreatedDates(formateddates)
            return filtereddates
        },
        completedDates() {
            const dates = this.completed_engagements.filter(eng => this.currentYear === 'All' ? eng : eng[1] === this.currentYear).map(e => e[0].date)
            const formateddates = dates.reduce((acc, date) => {
                const momentDate = new Date(date)
                acc.push(moment(momentDate).format('MM/DD/YYYY'))

                return acc
            }, [])
            const filtereddates = this.mapCreatedDates(formateddates)
            return filtereddates
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
        getUnique(arr, comp) {
            const unique = arr.map(e => e[comp]).map((e, i, final) => final.indexOf(e) === i && i).filter(e => arr[e]).map(e => arr[e]);
            return unique
        },
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
    .profile-logo {
        max-height: 150px;
        width: auto;
    }
</style>