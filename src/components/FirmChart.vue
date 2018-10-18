<script>
import { Doughnut, mixins } from 'vue-chartjs'
import {mapGetters} from 'vuex'

export default {
    name: 'FirmChart',
    extends: Doughnut,
    mixins: [mixins.reactiveProp],
    props: ['options'],
    mounted () {
        this.renderChart(
            this.chartData, 
            {
                responsive: true, 
                maintainAspectRatio: false, 
                legend: 
                        {
                            position: 'left',
                            padding: 100
                        }
                    }
            );
    },
}
</script>

<style>

</style>

