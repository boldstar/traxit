<template>

    <div class="dashboard flex-column justify-content-center">

        <!-- this is the header for the dashboard -->
        <div class="card mb-5 shadow-sm">
        <div class="d-flex justify-content-between card-body">
          <div class="h2 align-self-center m-0">
            <i class="fas fa-tachometer-alt text-primary"></i> 
          </div>
          <p class="h2 align-self-center">Dashboard
          </p>
          <div class="align-self-center">
            <button class="btn btn-sm btn-outline-primary"><i class="fas fa-sync-alt mr-2"></i>Refresh</button>
          </div>
        </div>
      </div>

        <!-- this is the doughnut chart for the overview of the firm -->
        <div class="row justify-content-around mt-3">
            <div class="col-4 col-md-5">
                <div class="d-flex">
                    <span class="h3 mb-4 mr-3"><i class=" far fa-folder-open mr-3 text-primary"></i><router-link to="/firm" class="text-muted">Firm Overview</router-link></span>
                    <select class="custom-select flex-fill" v-model="workflowKey" style="width: 100px">
                        <option :value="workflow.id" v-for="workflow in allWorkflows" :key="workflow.id" @click="changeKey(workflow.id)">{{ workflow.workflow }}</option>
                    </select>
                </div>
                <br><br>
                <doughnut-chart :chart-data="datasetsfull"></doughnut-chart>
            </div>


            <!-- this is the simple list of current tasks -->
            <div class="col-6">
                <span class="h3 mb-4"><i class="fas fa-tasks text-primary mr-3"></i><router-link to="/tasks" class="text-muted">Your Tasks</router-link></span>
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
                    <tbody class="table-bordered">
                    <tr v-for="(task, index) in tasks"  :key="index">
                        <th>{{ index + 1 }}</th>
                        <td>{{ task.engagements[0].client.last_name }}, {{ task.engagements[0].client.first_name }} & {{ task.engagements[0].client.spouse_first_name }}</td>
                        <td>{{ task.created_at | formatDate }}</td>
                        <td>{{ task.engagements[0].return_type }}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="col-lg-4">

            </div>
        </div>


    </div>  


</template>

<script>
import DoughnutChart from '@/components/DoughnutChart.vue'
import { mapGetters } from 'vuex'

export default {
    name: 'dashboard',
    components: {
        DoughnutChart,
    },
    data () {
        return {
            workflowKey: 1,
        }
    },
    computed: {
        ...mapGetters(['allWorkflows', 'tasks', 'allEngagements']),
        mapStatuses() {
        const selectedWorkflow = this.allWorkflows.filter(workflow => workflow.id === this.workflowKey)

        const result = selectedWorkflow.map(({statuses}) => ({
            statuses: statuses.reduce((acc, cur) => {
                acc.push(cur.status)

                return acc;
            }, []) 
        }))
        return result
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
        }
    },
    created() {
        this.$store.dispatch('retrieveWorkflows')
        this.$store.dispatch('retrieveEngagements')
        this.$store.dispatch('retrieveTasks')
    },
}
</script>
