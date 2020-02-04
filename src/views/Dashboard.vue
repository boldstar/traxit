<template>
    <div class="chart d-flex flex-column align-items-center justify-content-center">
        <div class="card-header bg-white shadow w-100 d-flex justify-content-between border">
            <div class="d-flex">
                <span class="h5 mb-0 align-self-center">Dashboard</span>
                <span class="h5 mb-0 align-self-center mx-2">|</span>
                <div class="input-group input-group-sm">
                    <div class="input-group-prepend">
                        <label class="input-group-text text-secondary bg-white font-weight-bold" for="option">Tax Year</label>
                    </div>
                    <select name="year" id="year" class="form-control form-control-sm" v-model="currentYear">
                        <option selected>{{option}}</option>
                        <option v-for="(year, index) in filterYears" :value="year" :key="index">{{year}}</option>
                    </select>
                 </div>
            </div>
            <div class="d-flex">
                <button class="btn btn-sm btn-outline-primary refresh" @click="refresh"><i class="fas fa-sync-alt mr-2"></i>Refresh</button>
            </div>
        </div>
        <div class="d-flex flex-column align-items-center pt-3 w-100 mb-3 body dashboard">

            <spinner v-if="loading && !noData" class="mx-auto"></spinner>
            <welcome v-if="noData && !loading" class="align-self-center mt-5"></welcome>
            
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

            <div class="dashboard-bottom-grid mt-2">
                <DashboardCompleted 
                    :workflows="allWorkflows" 
                    :tasks="tasks" 
                    :engagements="allEngagements" 
                    :tax_year="currentYear" 
                    :current_workflow="workflowKey"
                    :average_days="averageDays" 
                    v-if="!loading && !noData"
                />

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
        }, 8000)
    },
}
</script>

<style lang="scss">

.body {
    height: 100%;
    min-height: calc(100vh - 190px);
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

.selected {
    background-color: #0044ff3d;
    color: #0044ff;
    border: 1px solid #0044ff;
}

.completed {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.data-card {
    background: #f8f8f8;
    padding: 5px 10px;
    border-radius: 5px;
    box-shadow: 0 0 5px 0 rgba(0,0,0,.150);
    font-size: 1.1rem;
    font-weight: bold;
}

.data-card-header {
    font-size: .8rem;
    color: #0077ff;
    text-align: left;
}

a .fa-question-circle {
    font-size: 1.25rem!important;
}

.dashboard-bottom-grid {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
}

.dashboard-bg {
    background: lightgray;
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