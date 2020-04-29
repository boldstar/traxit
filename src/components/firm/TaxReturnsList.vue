<template>
    <div class="taxreturns-list">
        <h5>Tax Returns</h5>
        <span class="text-secondary">A list of the tax returns filtered by the chosen variable.</span>
        <div class="taxreturns-list-content">
            <div class="taxreturns-list-header">
                <span>{{filter}}</span>
                <button @click="showFilters = !showFilters">
                    <span v-if="showFilters">Remove Filters</span>
                    <span v-else>Filter Options</span>
                </button>
            </div>
            <input type="text" placeholder="Search by name.." class="taxreturns-list-search" v-model="search">
            <div class="taxreturns-list-filters" v-if="showFilters">
                <div class="custom-input-group">
                    <label for="tax_return_status">Status</label>
                    <select name="tax_return_status" id="tax_return_status" v-model="selectedStatus">
                        <option value="All" selected>{{option}}</option>
                        <option v-for="(status, index) in statuses" :key="index" :value="status">{{status}}</option>
                    </select>
                </div>
                <div class="custom-input-group">
                    <label for="tax_return_type">Return Type</label>
                    <select name="tax_return_type" id="tax_return_type" v-model="selectedType">
                        <option value="All" selected>{{option}}</option>
                        <option v-for="(type, index) in returnTypes" :key="index" :value="type">{{type}}</option>
                    </select>
                </div>
                <div class="custom-input-group">
                    <label for="tax_return_priority">Priority</label>
                    <select name="tax_return_priority" id="tax_return_priority" v-model="selectedLevel">
                        <option value="All" selected>{{option}}</option>
                        <option v-for="(level, index) in priority_levels" :key="index" :value="level.level">{{level.value}}</option>
                    </select>
                </div>
                <div class="custom-input-group">
                    <label for="created_at_start">From Date</label>
                    <v-date-picker
                        mode='single'
                        v-model='fromDate'
                        id="due_date"
                        :popover-direction="'top'"
                    >
                    </v-date-picker>
                </div>
                <div class="custom-input-group">
                    <label for="created_at_end">To Date</label>
                    <v-date-picker
                        mode='single'
                        v-model='toDate'
                        id="due_date"
                        :popover-direction="'top'"
                    >
                    </v-date-picker>
                </div>
            </div>
            <table class="table bg-white border table-hover">
                <thead>
                    <tr> 
                        <th><span>Name</span></th>
                        <th :class="{'selected-sort': selectedSort == 'status'}" @click="sort('status')">
                            <span>Status</span>
                            <i class="fas fa-sort text-dark"></i>
                        </th>
                        <th :class="{'selected-sort': selectedSort == 'assigned_to'}" @click="sort('assigned_to')">
                            <span>Assigned To</span>
                            <i class="fas fa-sort text-dark"></i>
                        </th>
                        <th :class="{'selected-sort': selectedSort == 'return_type'}" @click="sort('return_type')">
                            <span>Return Type</span>
                            <i class="fas fa-sort text-dark"></i>
                        </th>
                        <th :class="{'selected-sort': selectedSort == 'estimated_date'}" @click="sort('estimated_date')">
                            <span>Due Date</span>
                            <i class="fas fa-sort text-dark"></i></th>
                        <th :class="{'selected-sort': selectedSort == 'created_at'}" @click="sort('created_at')">
                            <span>Created On</span>
                            <i class="fas fa-sort text-dark"></i>
                        </th>
                    </tr>
                </thead>
                <tbody v-if="filteredEngagements.length > 0">
                    <tr v-for="(engagement, index) in filteredEngagements" :key="index">
                        <th>{{engagement.name}}</th>
                        <th>{{engagement.status}}</th>
                        <th>{{engagement.assigned_to}}</th>
                        <th>{{engagement.return_type}}</th>
                        <th>{{engagement.estimated_date | formatDate}}</th>
                        <th>{{engagement.created_at | formatDate}}</th>
                    </tr>
                </tbody>
                <tbody v-else>
                    <tr>
                        <td colspan="6" class="text-center font-weight-bold">There are no tax returns under this filter</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import moment from 'moment'
import levels from '../../plugins/levels'
export default {
    name: 'TaxReturnsList',
    props: ['engagements', 'filter', 'workflows'],
    data() {
        return {
            search: '',
            fromDate: null,
            toDate: null,
            type: null,
            priority_levels: levels.priority_levels,
            option: 'All',
            selectedStatus: null,
            selectedType: null,
            selectedLevel: null,
            showFilters: false,
            selectedSort: 'status',
            currentSortDir: 'desc'
        }
    },
    computed: {
        filteredEngagements() {
            return this.engagements
            .filter(eng => eng.type == 'taxreturn')
            .filter(eng => {
                if(this.filter == 'Pending') {
                    return this.pending(eng)
                } else if (this.filter == 'Past Due') {
                    return this.past_due(eng)
                } else if (this.filter == 'Archived') {
                    return eng.archived
                } else if (this.filter == 'Complete') {
                    return eng.done
                } else {
                    return eng
                }
            }).sort((a,b) => {
                if(this.selectedSort == 'estimated_date' || this.selectedSort == 'created_at') {
                    const distantFuture = new Date(8640000000000000)
                    let dateA = a[this.secondSort] ? new Date(a[this.secondSort]) : distantFuture
                    let dateB = b[this.secondSort] ? new Date(b[this.secondSort]) : distantFuture
                    return dateB - dateA
                } else {
                    let modifier = 1;
                    if(this.currentSortDir === 'desc') modifier = -1;
                    if(a[this.selectedSort] < b[this.selectedSort]) return -1 * modifier;
                    if(a[this.selectedSort] > b[this.selectedSort]) return 1 * modifier;
                    return 0;
                }
            }).filter(eng => {
                if(this.selectedStatus == this.option) return eng
                else { return eng.status == this.selectedStatus }
            }).filter(eng => {
                if(this.selectedLevel == this.option) return eng
                else { return eng.priority == this.selectedLevel }
            }).filter(eng => {
                if(this.selectedType == this.option) return eng
                else { return eng.return_type == this.selectedType }
            }).filter(eng => {
                if(!this.fromDate) return eng
                else { return new Date(eng.created_at) > new Date(this.fromDate) }
            }).filter(eng => {
                if(!this.toDate) return eng
                else { return new Date(eng.created_at) < new Date(this.toDate) }
            }).filter(eng => {
            return !this.search || eng.name.toLowerCase().indexOf(this.search.toLowerCase()) >= 0 })
        },
        returnTypes() {
            //map types
            const types = this.filteredEngagements.filter(eng => eng.return_type).map(engagement => engagement.return_type)
            //filter duplicates
            const result = types.filter((v, i) => types.indexOf(v) === i)
            if(result && result.length > 0) {
                this.type = result[0]
            }
            return result.sort((a, b) => b - a)
        },
        statuses() {
             //map types
            const types = this.filteredEngagements.map(engagement => engagement.status)
            //filter duplicates
            const result = types.filter((v, i) => types.indexOf(v) === i)
            
            return result.sort((a, b) => b - a)
        }
    },
    methods: {
        pending(engagement) {
            //filter workflow that matches engagement
            const workflow = this.workflows.filter(flow => flow.id === engagement.workflow_id)[0].statuses
            //find status state that matches engagement filter
            const statuses = workflow.filter(st => st.state == this.filter)
            //for each status return engagement where status equals engagement status
            if(statuses && statuses.length >= 1) {
                for(var i = 0; i < statuses.length; i++)
                if(statuses[i].status == engagement.status) {
                    return engagement
                }
            }
        },
        past_due(engagement) {
            if(engagement.estimated_date && engagement.done == false) {
                if(moment(new Date(engagement.estimated_date)).format('YYYYMMDDHHMMSS') < moment(new Date()).format('YYYYMMDDHHMMSS')) {
                    return engagement
                }
            }
        },
        sort:function(s) {
            //if s == current sort, reverse
            if(s === this.selectedSort) {
                this.currentSortDir = this.currentSortDir==='asc'?'desc':'asc';
            }
            this.selectedSort = s;
        },
    },
    created() {
        this.selectedStatus = this.option
        this.selectedLevel = this.option
        this.selectedType = this.option
    }
}
</script>

<style lang="scss">
    .taxreturns-list {
        width: 100%;
        text-align: left;

        h5 {
            margin-bottom: 0;
        }

        span {
            font-weight: bold;
        }

        .taxreturns-list-content {
            margin: 10px 0;

            .taxreturns-list-header {
                background: white;
                border: 1px solid lightgray;
                display: flex;
                justify-content: space-between;
                padding-left: 10px;

                span {
                    align-self: center;
                }

                button {
                    background: #0077ff;
                    color: white;
                    font-weight: bold;
                    border: none;
                    cursor: pointer;
                    padding: 10px 30px;
                }
            }

            .taxreturns-list-search {
                width: 100%;
                padding: 10px;
                border: 1px solid lightgray;
            }

            .taxreturns-list-filters {
                background: white;
                border: 1px solid lightgray;
                display: flex;
                justify-content: space-between;
                padding: 10px;
                padding-bottom: 0;
            }

            .table {
                margin-bottom: 0!important;

                thead {
                    tr {
                        th {
                            cursor: pointer;

                            i {
                                margin-left: 60px;
                            }

                            &:hover {
                                background: rgb(240, 240, 240);
                            }

                            &:hover:first-of-type {
                                background: white;
                                cursor: default;
                            }
                        }


                        .selected-sort {
                            background: rgb(240, 240, 240);
                        }
                    }
                }
            }

            .taxreturns-list-footer {
                padding: 10px;
                background: rgb(233, 233, 233);
            }
        }
    }
</style>