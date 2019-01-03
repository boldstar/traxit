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
                maintainAspectRatio: true,
                cutoutPercentage: 65,
                legend: 
                        {
                            position: 'left',
                            labels: {
                                padding: 10
                            },
                            display: false
                        }
                    }
            );
    },
}
</script>

