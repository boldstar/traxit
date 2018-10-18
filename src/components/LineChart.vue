<script>
import { Line, mixins } from 'vue-chartjs'

export default {
    name: 'LineChart',
    extends: Line,
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
                           display: false,
                        },
                elements: {
                        line: {
                            tension: 0, // disables bezier curves
                        }
                    },
                scales: {
					yAxes: [{
						ticks: {
                            beginAtZero: true,
                            stepSize: 1,
                            max: 10,
                            min: 0
						},
						gridLines: {
							display: true
						}
					}],
					xAxes: [{
						ticks: {
							beginAtZero: true
						},
						gridLines: {
							display: true
						}
					}]
				},
                },
            );
    },
}
</script>

