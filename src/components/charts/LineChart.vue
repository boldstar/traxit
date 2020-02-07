<script>
import { Line, mixins } from 'vue-chartjs'

export default {
    name: 'LineChart',
    extends: Line,
    mixins: [mixins.reactiveProp],
	data: function () {
		return {
			options: {
				scales: {
					yAxes: [{
						
					}],
					xAxes: [{
						type: 'time',
					}]
				},
				animation: {
					duration: 750,
				},
				legend: {
					display: true,
					position: 'bottom'
				},
				tooltips: {
					enabled: true,
					mode: 'single',
				},
				responsive: true,
				maintainAspectRatio: false,
				height: 200,
			},
		}
	},
	mounted () {
		// this.chartData is created in the mixin
		this.renderChart(this.chartData, this.options)
	}
}
</script>

