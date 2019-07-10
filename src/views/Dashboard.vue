<template>
    <div class="chart d-flex flex-column align-items-center justify-content-center">
        <div class="card-header bg-white shadow w-100 d-flex justify-content-between border">
            <div class="d-flex">
                <span class="h5 mb-0 align-self-center">Dashboard</span>
                <span class="h5 mb-0 align-self-center mx-2">|</span>
                <div class="input-group input-group-sm">
                    <div class="input-group-prepend">
                        <label class="input-group-text text-secondary bg-white font-weight-bold" for="option">Tax Year</label>
                    </div>
                    <select name="year" id="year" class="form-control form-control-sm" v-model="currentYear">
                        <option selected>{{option}}</option>
                        <option v-for="(year, index) in filterYears" :value="year" :key="index">{{year}}</option>
                    </select>
                 </div>
            </div>
            <button class="btn btn-sm btn-outline-primary refresh" @click="refresh"><i class="fas fa-sync-alt mr-2"></i>Refresh</button>
        </div>
        <div class="d-flex justify-content-center w-100 mb-3 pt-3 body dashboard">

            <spinner v-if="loading && !noData" class="mx-auto"></spinner>
            <welcome v-if="noData && !loading" class="align-self-center"></welcome>    

            <div class="d-flex flex-column col-4 profile-card" v-if="!loading && !noData">
                <div class="card h-100 mb-3" >
                    <div class="card-header p-2 text-left">
                        <span class="h5 mb-0 font-weight-bold align-self-center" v-if="accountDetails && accountDetails.business_name">{{ businessName }}</span>
                        <router-link :disabled="role != 'Admin'" to="/administrator/account" class="btn btn-secondary btn-sm font-weight-bold align-self-center" v-else>Add Bussiness Name</router-link>
                    </div>
                    <div class="card-body px-0 pb-0">
                        <img class="ml-5" v-if="accountDetails && accountDetails.logo && logo" v-bind:src="logo" />
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
            
            <div class="d-flex flex-column col-8 doughnut-charts" v-if="!loading && !noData">
                <div class="d-flex justify-content-between doughnuts">
                    <div class="doughnut card p-0">
                        <div class="h5 card-header mb-0 p-2">
                            <i class="fas fa-home mr-2 text-primary"></i>
                            <span class="font-weight-bold">Active</span>
                        </div>
                        <div class="card-body">
                            <doughnut-chart v-if="chartData" :chart-data="firmsetsfull"></doughnut-chart>
                        </div>
                    </div>
                    <!-- this is the doughnut chart for the overview of the firm -->
                    <div class="doughnut card p-0 mx-5">
                        <div class="carousel card-header h5 mb-0 p-0">
                            <carousel ref="carousel" :per-page="1"  :mouse-drag="false" :loop="true" :navigationEnabled="true" :paginationEnabled="false" @pageChange="handleClick" :navigationNextLabel='`<i class="fas fa-arrow-alt-circle-right text-primary"></i>`' :navigationPrevLabel='`<i class="fas fa-arrow-alt-circle-left text-primary"></i>`'>
                                <slide class="font-weight-bold p-2" ref="slide" v-for="workflow in mapWorkflowsWithIds" :key="workflow.workflow_id" :title="`${workflow.workflow_id}`">
                                    <i class="fas fa-route mr-2 text-primary"></i>{{workflow.workflow}}
                                </slide>
                            </carousel>
                        </div>
                        <div class="card-body">
                            <doughnut-chart v-if="chartData" :chart-data="workflowsetsfull"></doughnut-chart>
                        </div>
                    </div>
                    <!-- this is the dougnut chart for the tasks -->
                    <div class="doughnut card p-0">
                        <div class="h5 card-header mb-0 p-2">
                            <i class="fas fa-list-ul mr-2 text-primary"></i>
                            <span class="font-weight-bold">Tasks</span>
                        </div>
                        <div class="card-body">
                            <doughnut-chart v-if="chartData && tasks.length > 0" :chart-data="tasksetsfull"></doughnut-chart>
                            <div class="mt-3" v-else>
                            <span class="font-weight-bold">You currently have zero tasks</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="my-3 mt-auto completed">
                    <div class="card w-100">
                        <div class="d-flex justify-content-between card-header p-2">
                            <div class="h5 mb-0 ml-3">
                                <i class="fas fa-folder mr-2 text-primary"></i>
                                <span class="font-weight-bold">Completed </span>
                            </div>
                            <div class="h5 mb-0 ml-3">
                                <span v-if="average" class="font-weight-bold">Average | <span class="text-primary">{{ average }} days</span></span>
                            </div>
                        </div>
                        <div class="card-body">
                            <bar-chart class="w-100" :height="barHeight" :chart-data="barData"></bar-chart>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>       
</template>

<script>
import DoughnutChart from '@/components/DoughnutChart.vue'
import BarChart from '@/components/BarChart.vue'
import LineChart from '@/components/LineChart.vue'
import Welcome from '@/components/Welcome.vue'
import Spinner from '@/components/Spinner.vue'
import moment from 'moment'
import { mapGetters } from 'vuex'

export default {
    name: 'dashboard',
    components: {
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
            backgroundColors: [
                '#0077ff', 
                '#0022ff',
                '#0050ff',
                '#1133bb',
                '#0088aa',
                '#11ffdd',
                '#1a75ff',
                '#22aabb',
                '#006699',
                '#66ccff',
                '#0077bb',
                '#0000cc',
                '#007788',
                '#0077aa',
                '#0077cc',
                '#2d8fff',
                '#2673cc',
                '#00d8ff',
                '#0043d3',
                '#0015ff'
            ]
        }
    },
    computed: {
        ...mapGetters(['allWorkflows', 'tasks', 'allEngagements', 'accountDetails', 'completedEngagements', 'createdEngagements', 'averageDays', 'role']),
        businessName() {
            return this.accountDetails.business_name
        },
        logo() {
            return `data:image/png;base64, ${this.accountDetails.logo}`
        },
        activeEngagements() {
            return this.allEngagements.filter(engagement => engagement.done == false).filter(eng => this.currentYear === 'All' ? eng : eng.year === this.currentYear).length
        },
        totalTaxReturns() {
            return this.allEngagements.filter(engagement => engagement.type == 'taxreturn').filter(eng => this.currentYear === 'All' ? eng : eng.year === this.currentYear).length
        },
        totalBookkeeping() {
            return this.allEngagements.filter(engagement => engagement.type == 'bookkeeping').filter(eng => this.currentYear === 'All' ? eng : eng.year === this.currentYear).length
        },
        totalCustom() {
            return this.allEngagements.filter(engagement => engagement.type == 'custom').filter(eng => this.currentYear === 'All' ? eng : eng.year === this.currentYear).length
        },
        filterYears() {
            //map year
            const years = this.allEngagements.map(engagement => engagement.year)
            //filter duplicates
            const result = years.filter((v, i) => years.indexOf(v) === i)

            return result
        },
        mapStatuses() {
        if(this.allWorkflows && this.allWorkflows.length >= 1) {
               
                const selectedWorkflow = this.allWorkflows.filter(workflow => workflow.id === this.workflowKey)

                const res = selectedWorkflow.map(({statuses}) => ({
                    statuses: statuses.reduce((acc, cur) => {
                        acc.push(cur.status)

                        return acc;
                    }, []) 
                }))
                return res
             }
        },
        mapWorkflows() {
            return this.allWorkflows.map(workflow => workflow.workflow)
        },
        countEngagementsByStatus () {
        if(this.allWorkflows && this.allWorkflows.length >= 1) {
            const selectedWorkflow = this.allWorkflows.filter(workflow => workflow.id === this.workflowKey)
    
            const res = selectedWorkflow.map(({statuses, id}) => ({
                workflow_id: id,
                statuses: statuses.reduce((acc, cur) => {
    
                const count = this.allEngagements.filter(({workflow_id, status, done}) => workflow_id === id && status === cur.status && done == false).filter(eng => this.currentYear === 'All' ? eng : eng.year === this.currentYear).length;
    
                acc.push(count);
    
                return acc;
            
                }, [])
            }))
            return res
            }
        },
        countEngagementsBySelectedWorkflow() {
            const workflow = this.allWorkflows.filter(workflow => workflow.id === this.workflowKey)
            const id = workflow.map(({id}) => id)
            const res = this.allEngagements.filter(engagement => engagement.workflow_id === id[0] && engagement.done == false).filter(eng => this.currentYear === 'All' ? eng : eng.year === this.currentYear).length
            
            return res
        },
        countCompleteEngagements() {
            const res = this.allEngagements.filter(engagement => engagement.done == true).length
            
            return res
        },
        mapWorkflowsWithIds() {
            const workflows = this.allWorkflows.map(({id, workflow}) => ({
            workflow_id: id,
            workflow: workflow,
            count: this.allEngagements.filter(({workflow_id}) => workflow_id === id).length
            }))

            return workflows
        },
        countEngagementsLengthByWorkflow () {
        const workflows = this.allWorkflows.map(({id, workflow}) => ({
            workflow_id: id,
            workflow: workflow,
            count: this.allEngagements.filter(({workflow_id, done}) => workflow_id === id && done == false).filter(eng => this.currentYear === 'All' ? eng : eng.year === this.currentYear).length
        }))

        const res = workflows.reduce((acc, workflow) => {
            acc.push(workflow.count)

            return acc
        }, [])

        return res
        },
        countEngagementsCompleteByWorkflow () {
        const workflows = this.allWorkflows.map(({id, workflow}) => ({
            workflow_id: id,
            workflow: workflow,
            count: this.allEngagements.filter(({workflow_id, done, year}) => workflow_id === id && done == true).filter(eng => this.currentYear === 'All' ? eng : eng.year === this.currentYear).length
        }))

        const res = workflows.reduce((acc, workflow) => {
            acc.push(workflow.count)

            return acc
        }, [])

        return res
        },
        countTasks() {
            return this.tasks.length
        },
        countTasksLengthByStatus() {
           const statuses = this.tasks.map(task => task.engagements[0])

            const arr = statuses.map(({status}) => ({
            title: status,
            count: this.tasks.filter(task => task.engagements[0].status == status).length
            }))

            const unique =  this.getUnique(arr, 'title')

            const res = unique.reduce((acc, count) => {
                acc.push(count.count)

                return acc
            }, [])

            return res
        },
        getTaskLabels() {
           const statuses = this.tasks.map(task => task.engagements[0])

            const arr = statuses.map(({status}) => ({
            title: status,
            count: this.tasks.filter(task => task.engagements[0].status == status).length
            }))

            const unique =  this.getUnique(arr, 'title')

            const res = unique.reduce((acc, count) => {
                acc.push(count.title)

                return acc
            }, [])

            return res
        },
        createdDates() {
            const dates = this.createdEngagements.filter(eng => this.currentYear === 'All' ? eng : eng[1] === this.currentYear).map(e => e[0].date)
            const formateddates = dates.reduce((acc, date) => {
                const momentDate = new Date(date)
                acc.push(moment(momentDate).format('MM/DD/YYYY'))

                return acc
            }, [])
            const filtereddates = this.mapCreatedDates(formateddates)
            return filtereddates
        },
        completedDates() {
            const dates = this.completedEngagements.filter(eng => this.currentYear === 'All' ? eng : eng[1] === this.currentYear).map(e => e[0].date)
            const formateddates = dates.reduce((acc, date) => {
                const momentDate = new Date(date)
                acc.push(moment(momentDate).format('MM/DD/YYYY'))

                return acc
            }, [])
            const filtereddates = this.mapCreatedDates(formateddates)
            return filtereddates
        },
        average() {
            const created = this.averageDays.created.filter(eng => this.currentYear === 'All' ? eng : eng.year === this.currentYear)
            const completed = this.averageDays.completed.filter(eng => this.currentYear === 'All' ? eng : eng.year === this.currentYear)
            const cre_formatted = created.reduce((acc, data) => {
                acc.push({date: moment(data.created_at).format('MM/DD/YYYY'), e_id: data.engagement_id})

                return acc
            }, [])
            const com_formatted = completed.reduce((acc, data) => {
                acc.push({date: moment(data.created_at).format('MM/DD/YYYY'), e_id: data.engagement_id})

                return acc
            }, [])

            const days =  this.compareArrays(cre_formatted, com_formatted)
            return Math.round(days)
        },
        firmsetsfull() {
            return {
                labels: this.mapWorkflows,
                datasets: [
                {
                    label: 'Data One',
                    borderColor: 'black',
                    pointBackgroundColor: 'white',
                    borderWidth: 1,
                    pointBorderColor: 'white',
                    backgroundColor: this.backgroundColors,
                    data: this.countEngagementsLengthByWorkflow
                    }
                ],
                centerText: this.allEngagements.filter(engagement => engagement.done == false).filter(eng => this.currentYear === 'All' ? eng : eng.year === this.currentYear).length
            }
        },
        workflowsetsfull() {
            return {
                labels: this.mapStatuses[0].statuses,
                datasets: [
                {
                    label: 'Data One',
                    borderColor: 'black',
                    pointBackgroundColor: 'white',
                    borderWidth: 1,
                    pointBorderColor: 'white',
                    backgroundColor: this.backgroundColors,
                    data: this.countEngagementsByStatus[0].statuses
                    }
                ],
                centerText: this.countEngagementsBySelectedWorkflow
            }
        },
        tasksetsfull() {
            return {
                labels: this.getTaskLabels,
                datasets: [
                {
                    label: 'Data One',
                    borderColor: 'black',
                    pointBackgroundColor: 'white',
                    borderWidth: 1,
                    pointBorderColor: 'white',
                    backgroundColor: this.backgroundColors,
                    data: this.countTasksLengthByStatus
                    }
                ],
                centerText: this.tasks.length
            }
        },
        barData () {
            return {
                labels: this.mapWorkflows,
                datasets: [
                    {
                    backgroundColor: this.backgroundColors,
                    data: this.countEngagementsCompleteByWorkflow
                    }
                ]
            }
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
        changeKey(id) {
            this.workflowKey = id
            this.selected = true
        },
        refresh() {
            this.loading = true
            this.noData = false
            this.$store.dispatch('retrieveWorkflows')
            this.$store.dispatch('retrieveEngagements')
            this.$store.dispatch('retrieveTasks')
            var self = this;
            setTimeout(() => {
                self.loading = false;
                if(self.allEngagements.length == 0){
                    self.noData = true
                } else {
                    self.noData = false
                }
            }, 3000);
        },
        handleClick() {
            const index = this.$refs.slide[0].$parent.currentPage
            const id = this.$refs.slide[index].title
            this.workflowKey = JSON.parse(id)
        },
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
        compareArrays(cre, com) {
            const final = cre.map(c => ({
                created: c.date,
                completed: com.filter(co => co.e_id == c.e_id).map(co => co.date)
            }))

            const reduced = final.reduce((acc, date) => {
                acc.push({cre: date.created, com: date.completed[0]})
                return acc
            }, [])

            const average = reduced.map(d => moment(d.com).diff(moment(d.cre), 'days'))

            return average.reduce((a,b) => a + b, 0) / average.length
        },
    },
    created() {
        this.$store.dispatch('retrieveWorkflows')
        this.$store.dispatch('retrieveEngagements')
        this.$store.dispatch('retrieveTasks')
        this.$store.dispatch('getAccount')
        this.$store.dispatch('getEngagementsHistory')
        this.$store.dispatch('averageEngagementDays')
        this.loading = true
        this.selected = true
        this.currentYear = this.option
        var self = this
        setTimeout(() => {
            if(this.allWorkflows.length > 0 && this.allEngagements.length > 0) {
            self.chartData = true
            }
            if(this.tasks.length > 0) {
                self.taskData = true
                self.noData = false
            } 
            if(this.tasks.length > 0 && this.allWorkflows.length > 0 && this.allEngagements.length > 0) {
                self.loading = false
                self.noData = false
            } 
            if(this.allWorkflows.length > 0 && this.allEngagements.length > 0) {
                self.loading = false
                self.noData = false
            } 
            else if(this.allEngagements.length < 1 && this.tasks.length < 1) {
                self.noData = true
                self.loading = false
            }
            else if(this.allEngagements.length < 1 && this.allWorkflows.length < 1 && this.tasks.length < 1) {
                self.noData = true
                self.loading = false
            }

            if(self.allWorkflows.length >= 1) {
                self.workflowKey = self.allWorkflows[0].id
            } else (
                self.workflowKey = 1
            )
        }, 3000) 
    },
}
</script>

<style lang="scss" scoped>

.body {
    height: 100%;
    min-height: calc(100vh - 190px);
  }

.doughnut {
    width: 30%;
}

.no-tasks-img {
    height: 23em;
    width: 31em;
}

.workflow-select {
    cursor: pointer;

    &:hover {
        background-color: #0044ff3d;
    }
}

.selected {
    background-color: #0044ff3d;
    color: #0044ff;
    border: 1px solid #0044ff;
}

.completed {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.data-card {
    background: #f8f8f8;
    padding: 5px 10px;
    border-radius: 5px;
    box-shadow: 0 0 5px 0 rgba(0,0,0,.150);
    font-size: 1.1rem;
    font-weight: bold;
}

.data-card-header {
    font-size: .8rem;
    color: #0077ff;
    text-align: left;
}

@media screen and (max-width: 1300px) {
    .dashboard {
        display: flex;
        flex-direction: column!important;
    }

    .profile-card {
        max-width: 100%!important;
    }

    .doughnut-charts {
        max-width: 100%!important;
    }
}

@media screen and (max-width: 767px) {
    .dashboard {
        box-shadow: none!important;
        border: none!important;
    }

    .doughnuts {
        display: flex!important;
        flex-direction: column!important;
        align-items: center!important;
        margin: 0 auto!important;
        max-width: 100%!important;
    }

    .doughnut {
        width: 100%!important;
        max-width: 100%!important;
        margin-left: 0!important;
        margin-right: 0!important;
        margin: 10px auto!important;
    }
}

@media screen and (max-width: 500px) {
    .doughnut {
        width: 90%!important;
        max-width: 100%!important;
    }

    .completed {
        display: none!important;
    }

    .refresh {
        display: none!important;
    }

    .line-chart {
        display: none!important;
    }
}

</style>

