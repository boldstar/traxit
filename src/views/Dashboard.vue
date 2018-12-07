<template>

    <div class="dashboard flex-column justify-content-center">

            <!-- this is the header for the dashboard -->
            <div class="card mb-5 shadow-sm">
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

                <!-- this is the doughnut chart for the overview of the firm -->
                <div class="row justify-content-around mt-3">
                    <div class="col-4 col-md-5">
                        <div class="d-flex flex-sm-column">
                            <div class="col-6 col-sm-12 mb-sm-2">
                                <span class="h3 mr-3"><i class=" far fa-folder-open mr-3 text-primary"></i><router-link to="/firm" class="text-muted">Firm Overview</router-link></span>        
                            </div>
                            <div class="col-6 col-sm-12">     
                                <div class="input-group" >
                                <div class="input-group-prepend">
                                    <label class="input-group-text bg-light text-primary" for="option">Workflow</label>
                                </div>
                                <select class="form-control" v-model="workflowKey">
                                    <option :value="workflow.id" v-for="workflow in allWorkflows" :key="workflow.id" @click="changeKey(workflow.id)">{{ workflow.workflow }}</option>
                                </select>
                                </div>
                            </div> 
                        </div>
                        <br><br>
                    <doughnut-chart v-if="chartData" :chart-data="datasetsfull"></doughnut-chart>
                </div>


                <!-- this is the simple list of current tasks -->
                <div class="col-6">
                    <span class="h3"><i class="fas fa-tasks text-primary mr-3"></i><router-link to="/tasks" class="text-muted">Your Tasks</router-link></span>
                    <br><br>
                    <table class="table table-hover">
                        <thead class="bg-primary text-light">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Client</th>
                            <th scope="col">Created On</th>
                            <th scope="col">Return Type</th>
                        </tr>
                        </thead>
                        <tbody v-if="taskData">
                        <tr class="border" v-for="(task, index) in tasks"  :key="index">
                            <th>{{ index + 1 }}</th>
                            <td>{{ task.engagements[0].name }}</td>
                            <td>{{ task.created_at | formatDate }}</td>
                            <td>{{ task.engagements[0].return_type }}</td>
                        </tr>
                        </tbody>
                    </table>
                    <div v-if="!taskData" class="mt-5">
                        <span class="h3">You Currently Have No Tasks</span>
                    </div>
                </div>
            </div>

            </div>

    <div v-if="noData && !loading">
        <not-found ></not-found>   
    </div>

    <div v-if="loading && !noData" class="lds-dual-ring justify-content-center"></div>


    </div>  


</template>

<script>
import DoughnutChart from '@/components/DoughnutChart.vue'
import NotFound from '@/components/404.vue'
import { mapGetters } from 'vuex'

export default {
    name: 'dashboard',
    components: {
        DoughnutChart,
        NotFound
    },
    data () {
        return {
            workflowKey: 1,
            chartData: false,
            taskData: false,
            loading: false,
            noData: false
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
    },
    methods: {
        changeKey(id) {
            this.workflowKey = id
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
