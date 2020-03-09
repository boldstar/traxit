<template>
  <div >
      <DoughnutChart class="engagement-doughnut" :chart-data="dataSet" />
  </div>
</template>

<script>
import DoughnutChart from '@/components/charts/DoughnutChart.vue'
export default {
    name: 'EngagementDoughnut',
    props: ['percentage'],
    components: {DoughnutChart},
    data () {
        return {
            backgroundColors: [
                '#0077FF',
                '#F8F9FA'
            ]
        }
    },
    computed: {
        dataSet() {
            return {
                labels: ['Complete', 'Remaining'],
                datasets: [
                {
                    workflow: null,
                    label: 'Task',
                    borderColor: 'black',
                    pointBackgroundColor: 'white',
                    borderWidth: 1,
                    pointBorderColor: 'white',
                    backgroundColor: this.backgroundColors,
                    data: [this.percentage, 100 - this.percentage]
                    }
                ],
                centerText: this.percentage + '% Complete'
            }
        },
    }
}
</script>

<style lang="scss">
    .engagement-doughnut {
        max-width: 350px;
    }
</style>