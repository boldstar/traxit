<template>

    <div>
        <div class="card shadow-sm mx-auto w-100 bg-light">
            <div class="card-body">
                <span class="pr-3 h4 text-capitalize text-primary">Welcome, {{ name }}!</span>
            </div>
        </div>

        <div class="row mt-4">
            <div class="col-4 col-sm-6">
                <span class="h3 mb-4 text-muted"><i class=" far fa-folder-open mr-3 text-primary"></i>Overview</span>
                <br><br>
                <firm-chart class="" :chart-data="datasetsfull"></firm-chart>
            </div>

            <div class="col-4 col-sm-6"></div>
            <div class="col-4"></div>
        </div>


    </div>  


</template>

<script>
import FirmChart from '@/components/FirmChart.vue'
import { mapGetters } from 'vuex'

export default {
    name: 'dashboard',
    components: {
        FirmChart,
    },
    data () {
        return {
            name: '',
            scanned: null,
            recieved: null,
            preparation: null,
            review: null,
            secondreview: null,
            complete: null
        }
    },
    computed: {
        datasetsfull() {
            return {
                labels: ['Scanned', 'Recieved', 'Preparation', 'Review', '2nd Review', 'Complete'],
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
                            this.recieved,
                            this.preparation,
                            this.review,
                            this.secondreview,
                            this.complete,
                        ]
                    }
                ]
            }
        },
        ...mapGetters([
            'chartEngagements'
        ])
    },
    created() {
        this.$store.dispatch('retrieveName')
        .then(response => {
            this.name = response.data.name
        });
        this.$store.dispatch('retrieveEngagementsChartData')
        .then(response => {
            this.scanned = response.data.Scanned.length
            this.complete = response.data.Complete.length
            this.recieved = response.data.Recieved.length
            this.review = response.data.Review.length
            this.preparation = response.data.Preparation.length
            this.secondreview = response.data['2nd Review'].length
        });
    },
}
</script>

<style scoped lang="scss">


</style>