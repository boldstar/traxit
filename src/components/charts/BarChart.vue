<script>
import { Bar, mixins } from 'vue-chartjs'

export default {
    name: 'BarChart',
    extends: Bar,
    mixins: [mixins.reactiveProp],
	data: function () {
		return {
			options: {
				scales: {
					yAxes: [{
						ticks: {
							beginAtZero: true
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
							display: false
						},
						barPercentage: 0.2
					}]
				},
				legend: {
					display: false
				},
				tooltips: {
					enabled: true,
					mode: 'single',
				},
				responsive: true,
				maintainAspectRatio: false,
				height: 200
			},
		}
	},
	mounted () {
		// this.chartData is created in the mixin
		this.renderChart(this.chartData, this.options)
	}
}
</script>

