<template>          
    <div class="doughnuts">
        <div class="d-flex justify-content-between p-2">
            <div class="d-flex flex-column align-items-start">         
                <div class="h5 mb-0">
                    <i class="fas fa-chart-pie mr-2 text-primary"></i>
                    <span class="font-weight-bold">Overview</span>
                </div>
                <p class="mb-0 font-weight-bold text-secondary">A break down of all workflows and your assigned tasks</p>
            </div>
        </div>
        <div class="doughnuts-body">
            <div class="doughnut p-0">
                <div class="h6 mb-0 p-2">
                    <i class="fas fa-home mr-2 text-primary"></i>
                    <span class="font-weight-bold">Active</span>
                </div>
                <div>
                    <doughnut-chart :chart-data="firmsetsfull" @click-section="viewList"></doughnut-chart>
                </div>
            </div>
            <!-- this is the doughnut chart for the overview of the firm -->
            <div class="doughnut p-0">
                <div class="carousel h6 mb-0 p-0">
                    <carousel ref="carousel" :per-page="1"  :mouse-drag="false" :loop="true" :navigationEnabled="true" :paginationEnabled="false" @pageChange="handleClick" :navigationNextLabel='`<i class="fas fa-arrow-alt-circle-right text-primary"></i>`' :navigationPrevLabel='`<i class="fas fa-arrow-alt-circle-left text-primary"></i>`'>
                        <slide class="font-weight-bold p-2 slide" ref="slide" v-for="workflow in mapWorkflowsWithIds" :key="workflow.workflow_id" :title="`${workflow.workflow_id}`">
                            <i class="fas fa-route mr-2 text-primary"></i>{{workflow.workflow}}
                        </slide>
                    </carousel>
                </div>
                <div>
                    <doughnut-chart :chart-data="workflowsetsfull" @click-section="viewList"></doughnut-chart>
                </div>
            </div>
            <!-- this is the dougnut chart for the tasks -->
            <div class="doughnut p-0">
                <div class="h6 mb-0 p-2">
                    <i class="fas fa-list-ul mr-2 text-primary"></i>
                    <span class="font-weight-bold">Tasks</span>
                </div>
                <div>
                    <doughnut-chart v-if="tasks && tasks.length > 0" :chart-data="tasksetsfull" @click-section="viewList"></doughnut-chart>
                    <div class="mt-3" v-else>
                    <span class="font-weight-bold">You currently have zero tasks</span>
                    </div>
                </div>
            </div>
        </div>
        <p class="font-weight-bold mt-4 hint">Hint: Click a section of any doughnut chart to view<br> a filtered list of the engagements or tasks</p>
    </div>  
</template>

<script>
import DoughnutChart from '@/components/charts/DoughnutChart.vue'
import DashboardProfile from '@/components/dashboard/DashboardProfile.vue'
import moment from 'moment'
import { mapGetters } from 'vuex'

export default {
    name: 'DashboardDoughnuts',
    props: ['workflows', 'tasks', 'engagements', 'tax_year', 'current_workflow', 'details'],
    components: {
        DoughnutChart,
        DashboardProfile
    },
    data () {
        return {
            chartData: false,
            taskData: false,
            loading: false,
            noData: false,
            selected: false,
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
        selectedWorkflow: {
            get() {
                return this.current_workflow
            },
            set(value) {
                return value
            }
        },
        mapStatuses() {
        if(this.workflows && this.workflows.length >= 1) {
               
                const selectedWorkflow = this.workflows.filter(workflow => workflow.id === this.selectedWorkflow)

                const res = selectedWorkflow.map(({statuses}) => ({
                    statuses: statuses.reduce((acc, cur) => {
                        acc.push(cur.status)

                        return acc;
                    }, []) 
                }))
                return res
             }
        },
        mapWorkflows() {
            return this.workflows.map(workflow => workflow.workflow)
        },
        countEngagementsByStatus () {
        if(this.workflows && this.workflows.length >= 1) {
            const selectedWorkflow = this.workflows.filter(workflow => workflow.id === this.selectedWorkflow)
    
            const res = selectedWorkflow.map(({statuses, id}) => ({
                workflow_id: id,
                statuses: statuses.reduce((acc, cur) => {
    
                const count = this.engagements.filter(({workflow_id, status, done}) => workflow_id === id && status === cur.status && done == false).filter(eng => this.tax_year === 'All' ? eng : eng.year === this.tax_year).length;
    
                acc.push(count);
    
                return acc;
            
                }, [])
            }))
            return res
            }
        },
        countEngagementsBySelectedWorkflow() {
            const workflow = this.workflows.filter(workflow => workflow.id === this.selectedWorkflow)
            const id = workflow.map(({id}) => id)
            const res = this.engagements.filter(engagement => engagement.workflow_id === id[0] && engagement.done == false).filter(eng => this.tax_year === 'All' ? eng : eng.year === this.tax_year).length
            
            return res
        },
        mapWorkflowsWithIds() {
            const workflows = this.workflows.map(({id, workflow}) => ({
            workflow_id: id,
            workflow: workflow,
            count: this.engagements.filter(({workflow_id}) => workflow_id === id).length
            }))

            return workflows
        },
        countEngagementsLengthByWorkflow () {
        const workflows = this.workflows.map(({id, workflow}) => ({
            workflow_id: id,
            workflow: workflow,
            count: this.engagements.filter(({workflow_id, done}) => workflow_id === id && done == false).filter(eng => this.tax_year === 'All' ? eng : eng.year === this.tax_year).length
        }))

        const res = workflows.reduce((acc, workflow) => {
            acc.push(workflow.count)

            return acc
        }, [])

        return res
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
        countTasks() {
            return this.tasks.length
        },
        countTasksLengthByStatus() {
           const statuses = this.tasks.map(task => task.engagements[0])

            const arr = statuses.map(({status}) => ({
            title: status,
            count: this.tasks.filter(task => task.engagements[0].status == status).length
            }))

            const unique =  this.getUnique(arr, 'title')

            const res = unique.reduce((acc, count) => {
                acc.push(count.count)

                return acc
            }, [])

            return res
        },
        getTaskLabels() {
           const statuses = this.tasks.map(task => task.engagements[0])

            const arr = statuses.map(({status}) => ({
            title: status,
            count: this.tasks.filter(task => task.engagements[0].status == status).length
            }))

            const unique =  this.getUnique(arr, 'title')

            const res = unique.reduce((acc, count) => {
                acc.push(count.title)

                return acc
            }, [])

            return res
        },
        firmsetsfull() {
            return {
                labels: this.mapWorkflows,
                datasets: [
                {
                    workflow: null,
                    label: 'Firm',
                    borderColor: 'black',
                    pointBackgroundColor: 'white',
                    borderWidth: 1,
                    pointBorderColor: 'white',
                    backgroundColor: this.backgroundColors,
                    data: this.countEngagementsLengthByWorkflow
                    }
                ],
                centerText: this.engagements.filter(engagement => engagement.done == false).filter(eng => this.tax_year === 'All' ? eng : eng.year === this.tax_year).length
            }
        },
        workflowsetsfull() {
            return {
                labels: this.mapStatuses[0].statuses,
                datasets: [
                {   
                    workflow: this.workflows.filter(w => w.id == this.current_workflow)[0],
                    label: 'Workflow',
                    borderColor: 'black',
                    pointBackgroundColor: 'white',
                    borderWidth: 1,
                    pointBorderColor: 'white',
                    backgroundColor: this.backgroundColors,
                    data: this.countEngagementsByStatus[0].statuses
                    }
                ],
                centerText: this.countEngagementsBySelectedWorkflow
            }
        },
        tasksetsfull() {
            return {
                labels: this.getTaskLabels,
                datasets: [
                {
                    workflow: null,
                    label: 'Task',
                    borderColor: 'black',
                    pointBackgroundColor: 'white',
                    borderWidth: 1,
                    pointBorderColor: 'white',
                    backgroundColor: this.backgroundColors,
                    data: this.countTasksLengthByStatus
                    }
                ],
                centerText: this.tasks.length
            }
        },
    },
    methods: {
        changeKey(id) {
            this.selectedWorkflow = id
            this.selected = true
        },
        handleClick() {
            const index = this.$refs.slide[0].$parent.currentPage
            const id = this.$refs.slide[index].title
            this.$emit('change-workflow', JSON.parse(id))
        },
        getUnique(arr, comp) {
            const unique = arr.map(e => e[comp]).map((e, i, final) => final.indexOf(e) === i && i).filter(e => arr[e]).map(e => arr[e]);
            return unique
        },
        viewList(data) {
            var workflow = null
            const label = data.value.labels[data.index]
            const chart = data.value.datasets[0].label
            if(chart == 'Workflow') {
                workflow = data.value.datasets[0].workflow
            }

            if(chart == 'Workflow' || chart == 'Firm') {
                this.$router.push({path: '/engagements', query: {data: {workflow: workflow, label: label, chart: chart, year: this.tax_year}}})
            } else {
                this.$router.push({path: '/tasks', query: {data: {label: label, chart: chart}}})
            }
        }
    },
}
</script>

<style lang="scss">
.doughnuts-body {
    display: flex;
    justify-content: space-around;
    height: 100%;
}

.doughnut {
    width: 20%;
    margin-top: 50px;
    padding: 20px;
}

.slide {
    white-space: nowrap;
}

.hint {
    color: rgb(168, 168, 168);
    font-size: .8rem;
}
</style>

