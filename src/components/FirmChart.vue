<script>
import { Doughnut } from 'vue-chartjs'
import {mapGetters} from 'vuex'

export default {
    name: 'FirmChart',
    extends: Doughnut,
    computed: {
        ...mapGetters(['allEngagements'])
    },
    mounted () {
        this.renderChart({
        labels: ['Scanned', 'Recieved', 'Preparation', 'Review', '2nd Review', 'Pending', 'Complete'],
        datasets: [
                {
                label: 'Data One',
                borderColor: '#FC2525',
                pointBackgroundColor: 'white',
                borderWidth: 1,
                pointBorderColor: 'white',
                backgroundColor: [
                    '#0077ff', 
                    '#0022ff',
                    '#002211',
                    '#0088aa',
                    '#11ffdd',
                    '#aabbcc',
                    '#22aabb',
                    ],
                data: [
                    this.allEngagements.length,
                    this.allEngagements.length,
                    this.allEngagements.length,
                    this.allEngagements.length,
                    this.allEngagements.length,
                    this.allEngagements.length,
                    this.allEngagements.length,
                    ]
                },
            ]
        }, {responsive: true, maintainAspectRatio: false});
    },
}
</script>

