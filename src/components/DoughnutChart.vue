<script>
import { Doughnut, mixins } from 'vue-chartjs'


export default {
    name: 'DoughnutChart',
    extends: Doughnut,
    mixins: [mixins.reactiveProp],
    props: ['options', 'chart-data'],
    mounted () {
        this.renderChart(
            this.chartData, 
            {
                responsive: true, 
                maintainAspectRatio: false,
                legend: 
                        {
                            position: 'left',
                            labels: {
                                padding: 20
                            }
                        }
                    }
            );
    },
}
</script>

