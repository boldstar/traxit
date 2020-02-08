<template>
    <div class="dashboard" :class="{'dashboard-bg': !loading && !noData}">

        <spinner v-if="loading && !noData" class="mx-auto"></spinner>
        <welcome v-if="noData && !loading" class="mx-auto mt-5"></welcome>

        <div class="dashboard-grids" v-if="!loading && !noData">
            <div class="dashboard-section">
                <DashboardProfile
                    :details="accountDetails"
                    :tax_year="currentYear"
                    :engagements="allEngagements"
                    v-if="!loading && !noData"
                    @change-year="setYear"
                />
            </div>
            <div class="dashboard-section">
                <DashboardDoughnuts
                    :details="accountDetails" 
                    :workflows="allWorkflows" 
                    :tasks="tasks" 
                    :engagements="allEngagements" 
                    :tax_year="currentYear" 
                    :current_workflow="workflowKey"
                    v-if="!loading && !noData"
                    @change-workflow="changeKey"
                />
            </div>
            <div class="dashboard-section">
                <DashboardCompleted 
                    :workflows="allWorkflows" 
                    :tasks="tasks" 
                    :engagements="allEngagements" 
                    :tax_year="currentYear" 
                    :current_workflow="workflowKey"
                    :average_days="averageDays" 
                    v-if="!loading && !noData"
                />
            </div>
            <div class="dashboard-section">
                <DashboardComparison
                    :engagements="allEngagements" 
                    :created_engagements="createdEngagements"
                    :completed_engagements="completedEngagements"
                    :tax_year="currentYear" 
                    v-if="!loading && !noData"
                />
            </div>
        </div>
    </div>      
</template>

<script>
import DashboardDoughnuts from '@/components/dashboard/DashboardDoughnuts.vue'
import DashboardProfile from '@/components/dashboard/DashboardProfile.vue'
import DashboardCompleted from '@/components/dashboard/DashboardCompleted.vue'
import DashboardComparison from '@/components/dashboard/DashboardComparison.vue'
import Welcome from '@/components/onboard/Welcome.vue'
import Spinner from '@/components/loaders/Spinner.vue'
import moment from 'moment'
import { mapGetters } from 'vuex'

export default {
    name: 'dashboard',
    components: {
        DashboardDoughnuts,
        DashboardProfile,
        DashboardCompleted,
        DashboardComparison,
        Welcome,
        Spinner
    },
    data () {
        return {
            barHeight: 250,
            workflowKey: null,
            chartData: false,
            taskData: false,
            loading: false,
            noData: false,
            selected: false,
            currentYear: 'All',
            option: 'All',
            averageCalc: false,
            dataLoaded: false,
            loaded: [],
            required: [
                'allWorkflows', 
                'tasks', 
                'allEngagements', 
                'accountDetails', 
                'completedEngagements', 
                'createdEngagements', 
                'averageDays',
            ]
        }
    },
    computed: {
        ...mapGetters([
            'allWorkflows', 
            'tasks', 
            'allEngagements', 
            'accountDetails', 
            'completedEngagements', 
            'createdEngagements', 
            'averageDays', 
            'role'
        ]),
        filterYears() {
            //map year
            const years = this.allEngagements.map(engagement => engagement.year)
            //filter duplicates
            const result = years.filter((v, i) => years.indexOf(v) === i)

            return result
        },
    },
    methods: {
        changeKey(id) {
            this.workflowKey = id
            this.selected = true
        },
        refresh() {
            this.loading = true
            this.noData = false
            this.$store.dispatch('retrieveWorkflows')
            this.$store.dispatch('retrieveEngagements')
            this.$store.dispatch('retrieveTasks')
            var self = this;
            setTimeout(() => {
                self.loading = false;
                if(self.allEngagements.length == 0){
                    self.noData = true
                } else {
                    self.noData = false
                }
            }, 3000);
        },
        setYear(year) {
            this.currentYear = year
        },
         resolvingData(data) {
            this.loaded.push(data)
        },
        dataResolved(incoming) {
            // Check if the arrays are the same length
            if (incoming.length !== this.required.length) return false;

            // Check if all items exist and are in the same order
            for (var i = 0; incoming.length < i; i++) {
                if (incoming[i] !== this.required[i]) return false;
            }

            if(this.allWorkflows.length >= 1) {
                this.workflowKey = this.allWorkflows[0].id
            } else (
                this.workflowKey = 1
            )

            return true
        }
    },
    watch: {
        'allWorkflows': function(value) {
            this.resolvingData('allWorkflows')
        }, 
        'tasks': function(value) {
            this.resolvingData('tasks')
        }, 
        'allEngagements': function(value) {
            this.resolvingData('allEngagements')
        }, 
        'accountDetails': function(value) {
            this.resolvingData('accountDetails')
        }, 
        'completedEngagements': function(value) {
            this.resolvingData('completedEngagements')
        }, 
        'createdEngagements': function(value) {
            this.resolvingData('createdEngagements')
        }, 
        'averageDays': function(value) {
            this.resolvingData('averageDays')
        }, 
        'loaded': function(value) {
            if(this.dataResolved(value)) {
                setTimeout(() => {
                    this.loading = false
                    this.noData = false
                    this.dataLoaded = true
                }, 300)
            }
        }
    },
    created() {
        this.$store.dispatch('retrieveWorkflows')
        this.$store.dispatch('retrieveEngagements')
        this.$store.dispatch('retrieveTasks')
        this.$store.dispatch('getAccount')
        this.$store.dispatch('getEngagementsHistory')
        this.$store.dispatch('averageEngagementDays')
        this.loading = true
        this.selected = true
        this.currentYear = this.option
        var self = this
        setTimeout(() => {
            if(!self.dataLoaded) {
                this.noData = true
                this.loading = false
            }
        }, 10000)
    },
}
</script>

<style lang="scss">

.body {
    height: 100%;
    min-height: calc(100vh - 190px);
  }

.selected {
    background-color: #0044ff3d;
    color: #0044ff;
    border: 1px solid #0044ff;
}

.dashboard {
    height: 100%;
    min-height: calc(100vh - 35px);
    padding-top: 58px;
}
  
.dashboard-bg {
    background: lightgray;
}  
    

.dashboard-grids {
    height: 100%;
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    grid-template-rows: minmax(0, 1fr) minmax(0, 1fr);
    grid-gap: 1px;
}

.dashboard-section {
    background: white;
    max-width: 100%;
}

.dashboard-chart-wrapper {
    border-bottom: 1px solid lightgray;
}

.no-tasks-img {
    height: 23em;
    width: 31em;
}

.workflow-select {
    cursor: pointer;

    &:hover {
        background-color: #0044ff3d;
    }
}

@media screen and (max-width: 1300px) {
    .dashboard {
        display: flex;
        flex-direction: column!important;
    }

    .profile-card {
        max-width: 100%!important;
    }

    .doughnut-charts {
        max-width: 100%!important;
    }
}

@media screen and (max-width: 767px) {
    .dashboard {
        box-shadow: none!important;
        border: none!important;
    }

    .doughnuts {
        display: flex!important;
        flex-direction: column!important;
        align-items: center!important;
        margin: 0 auto!important;
        max-width: 100%!important;
    }

    .doughnut {
        width: 100%!important;
        max-width: 100%!important;
        margin-left: 0!important;
        margin-right: 0!important;
        margin: 10px auto!important;
    }
}

@media screen and (max-width: 500px) {
    .doughnut {
        width: 90%!important;
        max-width: 100%!important;
    }

    .completed {
        display: none!important;
    }

    .refresh {
        display: none!important;
    }

    .line-chart {
        display: none!important;
    }
}

</style>