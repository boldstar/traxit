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
                <span class="h3 mb-4"><i class=" far fa-folder-open mr-3 text-primary"></i><router-link to="/firm" class="text-muted">Firm Overview</router-link></span>
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
            scanned: null,
            received: null,
            preparation: null,
            review: null,
            secondreview: null,
            complete: null,
        }
    },
    computed: {
        datasetsfull() {
            return {
                labels: ['Scanned', 'Received', 'Preparation', 'Review', '2nd Review', 'Complete'],
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
                        ],
                    data: [
                            this.scanned,
                            this.received,
                            this.preparation,
                            this.review,
                            this.secondreview,
                            this.complete,
                        ]
                    }
                ]
            }
        },
        ...mapGetters(['tasks'])
    },
    created() {
        this.$store.dispatch('retrieveEngagementsChartData')
        .then(response => {
            this.scanned = response.data.Scanned.length
            this.complete = response.data.Complete.length
            this.received = response.data.Received.length
            this.review = response.data.Review.length
            this.preparation = response.data.Preparation.length
            this.secondreview = response.data['2nd Review'].length
        });
        this.$store.dispatch('retrieveTasks')
    },
}
</script>
