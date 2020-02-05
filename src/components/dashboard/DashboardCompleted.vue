<template>
  <div class="completed bg-white">
        <div class="d-flex justify-content-between p-2">
            <div class="d-flex flex-column align-items-start">
                <div class="h5 mb-0">
                    <i class="fas fa-folder mr-2 text-primary"></i>
                    <span class="font-weight-bold">Completed </span>
                </div>
                <p class="mb-0 font-weight-bold text-secondary">A chart of completed engagements in each workflow</p>
            </div>
            <div class="h5 mb-0">
                <span v-if="average && averageCalc" class="font-weight-bold">Average | <span class="text-primary">{{ average }} days</span></span>
            </div>
        </div>
        <bar-chart class="w-100 mt-5" :height="barHeight" v-if="engagements && engagements.length > 0" :chart-data="barData"></bar-chart>
    </div>
</template>

<script>
import BarChart from '@/components/charts/BarChart.vue'
import moment from 'moment'
import { mapGetters } from 'vuex'
export default {
    name: 'DashboardCompleted',
    props: ['workflows', 'tasks', 'engagements', 'tax_year', 'average_days'],
    components: {BarChart},
    data () {
        return {
            barHeight: 250,
            loading: false,
            noData: false,
            selected: false,
            option: 'All',
            averageCalc: false,
            backgroundColors: [
                '#0077ff', 
                '#0022ff',
                '#0050ff',
                '#1133bb',
                '#0088aa',
                '#11ffdd',
                '#1a75ff',
                '#22aabb',
                '#006699',
                '#66ccff',
                '#0077bb',
                '#0000cc',
                '#007788',
                '#0077aa',
                '#0077cc',
                '#2d8fff',
                '#2673cc',
                '#00d8ff',
                '#0043d3',
                '#0015ff'
            ]
        }
    },
    computed: {
        mapWorkflows() {
            return this.workflows.map(workflow => workflow.workflow)
        },
        countEngagementsCompleteByWorkflow () {
        const workflows = this.workflows.map(({id, workflow}) => ({
            workflow_id: id,
            workflow: workflow,
            count: this.engagements.filter(({workflow_id, done, year}) => workflow_id === id && done == true).filter(eng => this.tax_year === 'All' ? eng : eng.year === this.tax_year).length
        }))

        const res = workflows.reduce((acc, workflow) => {
            acc.push(workflow.count)

            return acc
        }, [])

        return res
        },
        average() {
            const created = this.average_days.created.filter(eng => this.tax_year === 'All' ? eng : eng.year === this.tax_year)
            const completed = this.average_days.completed.filter(eng => this.tax_year === 'All' ? eng : eng.year === this.tax_year)
            const cre_formatted = created.reduce((acc, data) => {
                acc.push({date: moment(data.created_at).format('MM/DD/YYYY'), e_id: data.engagement_id})

                return acc
            }, [])
            const com_formatted = completed.reduce((acc, data) => {
                acc.push({date: moment(data.created_at).format('MM/DD/YYYY'), e_id: data.engagement_id})

                return acc
            }, [])

            const days =  this.compareArrays(cre_formatted, com_formatted)
            this.averageCalc = true
            return Math.round(days)
        },
        barData () {
            return {
                labels: this.mapWorkflows,
                datasets: [
                    {
                    backgroundColor: this.backgroundColors,
                    data: this.countEngagementsCompleteByWorkflow
                    }
                ]
            }
        },
    },
    methods: {
        compareArrays(cre, com) {
            const final = cre.map(c => ({
                created: c.date,
                completed: com.filter(co => co.e_id == c.e_id).map(co => co.date)
            }))

            const reduced = final.reduce((acc, date) => {
                acc.push({cre: date.created, com: date.completed[0]})
                return acc
            }, [])

            const average = reduced.map(d => moment(d.com).diff(moment(d.cre), 'days'))

            return average.reduce((a,b) => a + b, 0) / average.length
        },
    }
}
</script>

<style lang="scss">
    .completed {
        width: 100%;
    }
</style>
                    