<template>

    <div class="dashboard flex-column justify-content-center">

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
                <div class="workflow-card col-lg-2 col-md-2 col-sm-12 p-0">
                    <div class="list-group p-0">
                        <div class="card-header border font-weight-bold text-primary py-2 bg-white">Workflows</div>
                        <div class="d-flex justify-content-between list-group-item py-1 workflow-select font-weight-bold" :value="workflow.workflow_id" v-for="workflow in countEngagementsLengthByWorkflow" :key="workflow.workflow_id" @click="changeKey(workflow.workflow_id)" v-bind:class="{'selected': selected && workflow.workflow_id == workflowKey}">
                            <span>{{ workflow.workflow }}</span>
                            <span class="badge badge-primary align-self-center">{{ workflow.count }}</span>
                            </div>
                    </div>
                </div>
                <!-- this is the doughnut chart for the overview of the firm -->
                <div class="col-lg-4 col-md-4 col-sm-12">
                    <div class="h4">
                        <i class="far fa-building mr-2 text-primary "></i>
                    <span class="font-weight-bold">Firm</span> 
                    </div>
                    <doughnut-chart v-if="chartData" :chart-data="datasetsfull"></doughnut-chart>
                </div>
                <!-- this is the dougnut chart for the tasks -->
                <div class="col-lg-4 col-md-4 col-sm-12">
                    <div class="h4">
                        <i class="far fa-folder-open mr-2 text-primary"></i>
                    <span class="font-weight-bold">Tasks</span>
                    </div>
                    <doughnut-chart v-if="chartData && tasks.length > 0" :chart-data="tasksetsfull"></doughnut-chart>
                    <div class="mt-3" v-else>
                        <span class="font-weight-bold">You Currently Have Zero Tasks</span>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="noData && !loading">
            <welcome></welcome> 
        </div>
        <div v-if="loading && !noData" class="lds-dual-ring justify-content-center"></div>
        </div>  
</template>

<script>
import DoughnutChart from '@/components/DoughnutChart.vue'
import Welcome from '@/components/Welcome.vue'
import { mapGetters } from 'vuex'

export default {
    name: 'dashboard',
    components: {
        DoughnutChart,
        Welcome
    },
    data () {
        return {
            workflowKey: 1,
            chartData: false,
            taskData: false,
            loading: false,
            noData: false,
            selected: false,
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
        countEngagementsByStatus () {
        const selectedWorkflow = this.allWorkflows.filter(workflow => workflow.id === this.workflowKey)

        const res = selectedWorkflow.map(({statuses, id}) => ({
            workflow_id: id,
            statuses: statuses.reduce((acc, cur) => {

            const count = this.allEngagements.filter(({workflow_id, status}) => workflow_id === id && status === cur.status).length;

            acc.push(count);

            return acc;
        
            }, [])
        }))
        return res
        },
        countEngagementsLengthByWorkflow () {
       

        const res = this.allWorkflows.map(({id, workflow}) => ({
            workflow_id: id,
            workflow: workflow,
            count: this.allEngagements.filter(({workflow_id}) => workflow_id === id).length
        }))
        return res
        },
        countTasks() {
            return this.tasks.length
        },
        tasksLabels() {
            const engagements = this.tasks.map(task => task.engagements)

            const statuses = engagements.reduce((acc, engagement) => {
                acc.push(engagement[0].status)

                return acc
            }, [])

            return statuses
        },
        datasetsfull() {
            return {
                labels: this.mapStatuses[0].statuses,
                datasets: [
                {
                    label: 'Data One',
                    borderColor: 'black',
                    pointBackgroundColor: 'white',
                    borderWidth: 1,
                    pointBorderColor: 'white',
                    backgroundColor: [
                            '#0077ff', 
                            '#0022ff',
                            '#1133bb',
                            '#0088aa',
                            '#11ffdd',
                            '#aabbcc',
                            '#22aabb',
                            '#22aaaa',
                            '#22aa11',
                            '#0077bb',
                            '#007711',
                            '#007788',
                            '#0077aa',
                            '#0077cc',
                        ],
                    data: this.countEngagementsByStatus[0].statuses
                    }
                ]
            }
        },
        tasksetsfull() {
            return {
                labels: this.tasksLabels,
                datasets: [
                {
                    label: 'Data One',
                    borderColor: 'black',
                    pointBackgroundColor: 'white',
                    borderWidth: 1,
                    pointBorderColor: 'white',
                    backgroundColor: [
                            '#0077ff', 
                            '#0022ff',
                            '#1133bb',
                            '#0088aa',
                            '#11ffdd',
                            '#aabbcc',
                            '#22aabb',
                            '#22aaaa',
                            '#22aa11',
                            '#0077bb',
                            '#007711',
                            '#007788',
                            '#0077aa',
                            '#0077cc',
                        ],
                    data: [
                        this.countTasks
                        ]  
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
.workflow-card{
    height: 100%;
}

.workflow-select {
    cursor: pointer;

    &:hover {
        background-color: beige;
    }
}

.selected {
    background-color: beige;
    color: #0044ff;
}
</style>

