<template>

    <div class="dashboard-layout flex-column justify-content-center">

            <!-- workflow card for selecting workflows -->
             <!-- <div class="workflow-card col-lg-6 col-md-6 col-sm-12 p-0">
                    <div class="list-group p-0">
                        <div class="d-flex justify-content-between list-group-item py-1 workflow-select font-weight-bold m-0" :value="workflow.workflow_id" v-for="workflow in mapWorkflowsWithIds" :key="workflow.workflow_id" @click="changeKey(workflow.workflow_id)" v-bind:class="{'selected': selected && workflow.workflow_id == workflowKey}" v-if="workflow.workflow_id == workflowKey">
                            <span>{{ workflow.workflow }}</span>
                            <span class="badge badge-primary align-self-center">{{ workflow.count }}</span>
                        </div>
                    </div>
                </div> -->
            

            <!-- this is the header for the dashboard -->
            <div class="card mb-3 shadow-sm">
                <div class="d-flex justify-content-between card-body">
                    <div class="h2 align-self-center m-0">
                        <i class="fas fa-tachometer-alt text-primary"></i> 
                    </div>
                    <p class="h2 align-self-center">Dashboard</p>
                    <div class="align-self-center">
                        <button class="btn btn-sm btn-outline-primary" @click="refresh"><i class="fas fa-sync-alt mr-2"></i>Refresh</button>
                    </div>
                </div>
            </div>

            <div v-if="!loading && !noData">
            <div class="d-flex flex-lg-row flex-sm-colum col-12 justify-content-around mt-5">
                <div class="col-lg-4 col-md-4 col-sm-12 card-body px-3 pt-0">
                    <div class="h4 py-3">
                        <i class="fas fa-home mr-2 text-primary"></i>
                        <span class="font-weight-bold">Active</span>
                    </div>
                     <doughnut-chart v-if="chartData" :chart-data="firmsetsfull"></doughnut-chart>
                </div>
                <!-- this is the doughnut chart for the overview of the firm -->
                <div class="col-lg-4 col-md-4 col-sm-12 card-body px-3 pt-0 mx-3">
                    <div class="col-lg-8 col-md-8 col-sm-12 carousel h4 py-2">
                        <carousel ref="carousel" :per-page="1"  :mouse-drag="false" :loop="true" :navigationEnabled="true" :paginationEnabled="false" @pageChange="handleClick" :navigationNextLabel='`<i class="fas fa-arrow-alt-circle-right text-primary"></i>`' :navigationPrevLabel='`<i class="fas fa-arrow-alt-circle-left text-primary"></i>`'>
                            <slide class="font-weight-bold p-2" ref="slide" v-for="workflow in mapWorkflowsWithIds" :key="workflow.workflow_id" :title="`${workflow.workflow_id}`">
                                <i class="fas fa-project-diagram mr-2 text-primary"></i>{{workflow.workflow}}
                            </slide>
                        </carousel>
                    </div>
                    <doughnut-chart v-if="chartData" :chart-data="workflowsetsfull"></doughnut-chart>
                </div>
                <!-- this is the dougnut chart for the tasks -->
                <div class="col-lg-4 col-md-4 col-sm-12 card-body px-3 pt-0">
                    <div class="h4 py-3">
                        <i class="fas fa-list-ul mr-2 text-primary"></i>
                        <span class="font-weight-bold">Tasks</span>
                    </div>
                    <doughnut-chart v-if="chartData && tasks.length > 0" :chart-data="tasksetsfull"></doughnut-chart>
                    <div class="mt-3" v-else>
                       <span class="font-weight-bold">You currently have zero tasks</span>
                    </div>
                </div>
            </div>
        </div>
        

        <div v-if="!loading && !noData" class="my-4">
            <div class="d-flex justify-content-center">
                <div class="h4 py-3 my-5">
                    <i class="far fa-folder-open mr-2 text-primary"></i>
                    <span class="font-weight-bold">Completed </span>
                    <span class="text-primary font-weight-bold">| {{countCompleteEngagements}} |</span>
                </div>
                <select name="selectYear" id="selectYear" class="ml-2 form-control col-1 align-self-center">
                    <option selected>2018</option>
                </select>
            </div>
            <bar-chart :chart-data="barData"></bar-chart>
        </div>

        <div v-if="noData && !loading">
            <welcome></welcome> 
        </div>
            <spinner v-if="loading && !noData"></spinner>
        </div>  
</template>

<script>
import DoughnutChart from '@/components/DoughnutChart.vue'
import BarChart from '@/components/BarChart.vue'
import Welcome from '@/components/Welcome.vue'
import Spinner from '@/components/Spinner.vue'
import { mapGetters } from 'vuex'

export default {
    name: 'dashboard',
    components: {
        DoughnutChart,
        BarChart,
        Welcome,
        Spinner
    },
    data () {
        return {
            workflowKey: 1,
            chartData: false,
            taskData: false,
            loading: false,
            noData: false,
            selected: false,
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
        ...mapGetters(['allWorkflows', 'tasks', 'allEngagements']),
        mapStatuses() {
        const selectedWorkflow = this.allWorkflows.filter(workflow => workflow.id === this.workflowKey)

        const res = selectedWorkflow.map(({statuses}) => ({
            statuses: statuses.reduce((acc, cur) => {
                acc.push(cur.status)

                return acc;
            }, []) 
        }))
        return res
        },
        mapWorkflows() {
            return this.allWorkflows.map(workflow => workflow.workflow)
        },
        countEngagementsByStatus () {
        const selectedWorkflow = this.allWorkflows.filter(workflow => workflow.id === this.workflowKey)

        const res = selectedWorkflow.map(({statuses, id}) => ({
            workflow_id: id,
            statuses: statuses.reduce((acc, cur) => {

            const count = this.allEngagements.filter(({workflow_id, status, done}) => workflow_id === id && status === cur.status && done == false).length;

            acc.push(count);

            return acc;
        
            }, [])
        }))
        return res
        },
        countEngagementsBySelectedWorkflow() {
            const workflow = this.allWorkflows.filter(workflow => workflow.id === this.workflowKey)
            const id = workflow.map(({id}) => id)
            const res = this.allEngagements.filter(engagement => engagement.workflow_id === id[0] && engagement.done == false).length
            
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
            count: this.allEngagements.filter(({workflow_id, done}) => workflow_id === id && done == false).length
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
            count: this.allEngagements.filter(({workflow_id, done}) => workflow_id === id && done == true).length
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
                centerText: this.allEngagements.filter(engagement => engagement.done == false).length
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
    },
    methods: {
        changeKey(id) {
            this.workflowKey = id
            this.selected = true
        },
        refresh() {
            this.loading = true
            this.$store.dispatch('retrieveWorkflows')
            this.$store.dispatch('retrieveEngagements')
            this.$store.dispatch('retrieveTasks')
            var self = this;
            setTimeout(() => {
                self.loading = false;
                if(self.allEngagements == 0){
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
        }
    },
    created() {
        this.$store.dispatch('retrieveWorkflows')
        this.$store.dispatch('retrieveEngagements')
        this.$store.dispatch('retrieveTasks')
        this.loading = true
        this.selected = true
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
        }, 3000) 
    },
}
</script>

<style lang="scss" scoped>
.dashboard {
    margin-top: 50px;
}

.carousel {
    margin-left: 75px;
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
</style>

