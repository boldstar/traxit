<script>
import { Doughnut, mixins } from 'vue-chartjs'
import { mapGetters } from 'vuex'

export default {
    name: 'DoughnutChart',
    extends: Doughnut,
    mixins: [mixins.reactiveProp],
    props: ['chart-data'],
    data() {
        return {
              options: {
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
                }, 
                elements: {
                        center: {
                            color: '#575c63', // Default is #000000
                            fontStyle: 'Arial', // Default is Arial
                            sidePadding: 20 // Defualt is 20 (as a percentage)
                        }
                    }       
            },
        }
    },
    watch: {
    'chartData': {
      handler (newElement, oldElement) {
        this.$data._chart.destroy();
        this.addPlugin({
            beforeDraw: function (chart) {
			if (chart.config.options.elements.center) {
            //Get ctx from string
            var ctx = chart.chart.ctx;
            
            //Get options from the center object in options
            var centerConfig = chart.config.options.elements.center;
            var fontStyle = centerConfig.fontStyle || 'Arial';
            var txt = chart.config.data.centerText;
            var color = centerConfig.color || '#000';
            var sidePadding = centerConfig.sidePadding || 20;
            var sidePaddingCalculated = (sidePadding/100) * (chart.innerRadius * 2);
            //Start with a base font of 30px
            ctx.font = "30px " + fontStyle;
            
            //Get the width of the string and also the width of the element minus 10 to give it 5px side padding
            var stringWidth = ctx.measureText(txt).width;
            var elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;

            // Find out how much the font can grow in width.
            var widthRatio = elementWidth / stringWidth;
            var newFontSize = Math.floor(10 * widthRatio);
            var elementHeight = (chart.innerRadius * 2);

            // Pick a new font size so it will not be larger than the height of label.
            var fontSizeToUse = Math.min(80, elementHeight);

            //Set font settings to draw it correctly.
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
            var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
            ctx.font = fontSizeToUse+"px " + fontStyle;
            ctx.fillStyle = color;
            
            //Draw text in center
            ctx.fillText(txt, centerX, centerY);
                }
            }
        })
        this.renderChart(this.chartData, this.options)
      },
        deep: true
        }
    },
    mounted () {
        this.addPlugin({
            beforeDraw: function (chart) {
			if (chart.config.options.elements.center) {
            //Get ctx from string
            var ctx = chart.chart.ctx;
            
            //Get options from the center object in options
            var centerConfig = chart.config.options.elements.center;
            var fontStyle = centerConfig.fontStyle || 'Arial';
            var txt = chart.config.data.centerText;
            var color = centerConfig.color || '#000';
            var sidePadding = centerConfig.sidePadding || 20;
            var sidePaddingCalculated = (sidePadding/100) * (chart.innerRadius * 2);
            //Start with a base font of 30px
            ctx.font = "30px " + fontStyle;
            
            //Get the width of the string and also the width of the element minus 10 to give it 5px side padding
            var stringWidth = ctx.measureText(txt).width;
            var elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;

            // Find out how much the font can grow in width.
            var widthRatio = elementWidth / stringWidth;
            var newFontSize = Math.floor(10 * widthRatio);
            var elementHeight = (chart.innerRadius * 2);

            // Pick a new font size so it will not be larger than the height of label.
            var fontSizeToUse = Math.min(80, elementHeight);

            //Set font settings to draw it correctly.
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
            var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
            ctx.font = fontSizeToUse+"px " + fontStyle;
            ctx.fillStyle = color;
            
            //Draw text in center
            ctx.fillText(txt, centerX, centerY);
                }
            }
        })
        this.renderChart(
            this.chartData,
            this.options,
        );
    },
}
</script>

