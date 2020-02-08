<template>
    <div>

         <div class="d-flex">
            <div class="d-flex px-3 engagement-list-header">
                <span class="font-weight-bold align-self-center">Viewing:
                    <span v-if="engagementFilter == 'All'">All Engagements</span>
                    <span v-if="engagementFilter == 'Past Due'">Past Due Engagements</span>
                    <span v-if="engagementFilter == 'Priority'">Priority Engagements Of Level 4 & Higher</span>
                    <span v-if="engagementFilter == 'Pending'">Pending Engagements</span>
                    <span v-if="engagementFilter == 'Complete'">Complete Engagements</span>
                    <span v-if="engagementFilter == 'In Progress'">Currently In Progress Engagements</span>
                    <span class="text-primary"> | {{sortedEngagements.length}} of {{engagements.length}}</span>
                </span>
            </div>

            <div class="flex-fill">
                <input class="engagement-search-input" placeholder="Filter By First or Last Name..." v-model="searchEngagement" type="search">
            </div>

            <div class="btn-group ml-auto">
                <div class="dropdown">
                    <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenu3" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i class="fas fa-cog mr-2"></i>
                        Options
                    </button>
                    <div class="dropdown-menu dropdown-menu-left mr-2 p-1 settings-dropdown" aria-labelledby="dropdownMenu3">
                        <button class="dropdown-item d-flex justify-content-between font-weight-bold px-1" @click="clearFilters" data-toggle="tooltip" data-placement="top" title="Clear Filters">Clear Filters<i class="fas fa-filter align-self-center text-secondary"></i></button>
                        <button class="dropdown-item d-flex justify-content-between font-weight-bold px-1" @click="confirmEngagementsDownload" data-toggle="tooltip" data-placement="top" title="Download Engagements" :disabled="processing"><span v-if="!processing">Download</span><i class="far fa-file-excel align-self-center text-success"></i><span v-if="processing" class="mx-2">Downloading...</span></button>
                        <router-link to="/add" class="dropdown-item d-flex justify-content-between font-weight-bold px-1" data-toggle="tooltip" data-placement="top" title="Add New Engagement">Add Engagement<i class="far fa-plus-square font-weight-bold align-self-center ml-3"></i></router-link>
                    </div>
                </div>
            </div>
        </div>

        <div class="d-flex flex-column">
            <table class="table border table-light table-hover text-left ">
                <thead class="text-primary hover">
                    <tr>
                        <th scope="col">Client</th>
                        <th scope="col" class="hide-row">
                            <div class="d-flex">
                                <label class="font-weight-bold align-self-center table-label" for="option">Type:</label>
                                <select class="custom-select text-capitalize ml-2" id="category" v-model="filterEngageType">
                                    <option> {{ type }}</option>
                                    <option v-for="(engagetype, index) in filterTypes" :key="index">
                                    {{ engagetype }}
                                    </option>
                                </select>
                            </div>
                        </th>
                        <th scope="col" @click="sort('year')" class="mobile-hide-row">
                            <div class="d-flex">
                                <label class="font-weight-bold align-self-center table-label" for="option">Year:</label>
                                <select class="custom-select text-capitalize ml-2" id="category" v-model="filterYear">
                                    <option> {{ type }}</option>
                                    <option v-for="(year, index) in filterYears" :key="index">
                                    {{ year }}
                                    </option>
                                </select>
                            </div>
                        </th>
                        <th scope="col" @click="sort('assigned_to')">
                            <div class="d-flex">
                                <label class="font-weight-bold align-self-center table-label" for="option">Assigned To:</label>
                                <select class="custom-select text-capitalize ml-2" id="category" v-model="filterAssigned">
                                    <option> {{ type }}</option>
                                    <option v-for="(name, index) in filterAssignedTo" :key="index">
                                    {{ name }}
                                    </option>
                                </select>
                            </div>
                        </th>
                        <th scope="col" @click="sort('return_type')" class="hide-row">
                            <div class="d-flex">
                                <label class="font-weight-bold align-self-center table-label" for="option">Workflow:</label>
                                <select class="custom-select ml-2" id="client_id" v-model="filterWorkflow">
                                    <option> {{ type }}</option>
                                    <option v-for="(workflow, index) in allWorkflows" :value="workflow.id" :key="index">
                                    {{ workflow.workflow }}
                                    </option>
                                </select>
                            </div>
                        </th>
                        <th scope="col" @click="sort('status')" class="mobile-hide-row">
                            <div class="d-flex">
                                <label class="font-weight-bold align-self-center table-label" for="option">Status:</label>
                                <select class="custom-select text-capitalize ml-2" id="category" v-model="filterStatusType">
                                    <option> {{ type }}</option>
                                    <option v-for="(status, index) in filterStatuses" :key="index">
                                    {{ status }}
                                    </option>
                                </select>
                            </div>
                        </th>
                        <th scope="col" class="text-center table-label">Details</th>
                    </tr>
                </thead> 
                <tbody class="client-info table-bordered" v-if="!tableLoaded">
                    <tr v-for="(engagement, index) in sortedEngagements"  :key="index" @click="viewDetails(engagement.id)">
                        <td class="text-capitalize">{{ engagement.name }}</td>
                        <td v-if="engagement.return_type != null" class="hide-row">{{ engagement.return_type }}</td>
                        <td v-else class="hide-row">None</td>
                        <td class="mobile-hide-row">{{ engagement.year }}</td>
                        <td>{{ engagement.assigned_to }}</td>
                        <td class="mobile-hide-row">{{ workflowName(engagement.workflow_id) }}</td>
                        <td class="mobile-hide-row">{{ engagement.status }}</td>
                        <td class="text-center"><router-link v-bind:to="'/engagement/' + engagement.id+ '/details'"><i class="far fa-eye"></i></router-link></td>
                    </tr>
                </tbody>
            </table>

            <div v-if="sortedEngagements.length < 1 && !tableLoaded" class="d-flex flex-column m-3">
                <span class="h5">There Are <span class="text-primary">0</span> Engagements {{ engagementFilter }}</span>
                <NoFirm class="m-3" />
            </div>
        </div>


        <nav aria-label="pagination" class="d-flex" v-if="!tableLoaded && sortedEngagements.length >= 1" :class="{'mb-5': sortedEngagements.length < 8}">
        <ul class="pagination">
            <li class="page-item">
                <button class="page-link font-weight-bold" @click="prevPage" :disabled="currentPage <= 1">Previous</button>            
            </li>
            <li class="page-item">
                <a class="page-link">
                 {{ currentPage }}
                </a>            
            </li>
            <li class="page-item">
                <button class="page-link font-weight-bold" @click="nextPage">Next</button>           
            </li>
        </ul>
        <div class="pl-3 mobile-hide-row">
            <div class="input-group">
                <div class="input-group-prepend">
                    <label class="input-group-text font-weight-bold" for="option">Per Page:</label>
                </div>
                <select class="custom-select" id="option" v-model="pageSize">
                    <option v-for="option in options" :key="option.id" :value="option">{{ option }}</option>
                </select>
            </div>
        </div>
        <div class="ml-auto align-self-center mobile-hide-row">
            <label for="count" class="font-weight-bold">Viewing: </label>
            <span id="count">
                {{ sortedEngagements.length }} of {{ engagements.length }}
            </span>
        </div>   
    </nav>
  
        <spinner v-if="tableLoaded"></spinner>
        <ConfirmModal v-if="confirmDownload" @submit-download="downloadEngagements" @close-modal="cancelDownload" />

    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import Spinner from '@/components/loaders/Spinner.vue'
import NoFirm from '@/components/placeholders/NoFirm.vue'
import ConfirmModal from '@/components/modals/ConfirmModal.vue'

export default {
    name: 'EngagementsList',
    props: ['engagements', 'filters'],
    components: {
        Spinner,
        NoFirm,
        ConfirmModal
    },
    data() {
        return {
            typeChecked: false,
            statusChecked: false,
            returnChecked: false,
            categoryChecked: false,
            assignedChecked: false,
            yearChecked: false,
            workflowChecked: false,
            tableLoaded: false,
            showInput: false,
            filterEngageType: '',
            filterStatusType: '',
            filterType: '',
            filterCategory: '',
            filterAssigned: '',
            filterYear: '',
            filterWorkflow: '',
            searchEngagement: '',
            currentSort: 'last_name',
            currentSortDir: 'asc',
            currentPage: 1,
            pageSize: null,
            options: ['10', '25', '50', '100'],
            type: 'All'
        }
    },
    computed: {
        ...mapGetters(['allWorkflows', 'engagementFilter', 'processing', 'confirmDownload']),
        sortedEngagements:function() {
            return this.engagements.sort((a,b) => {
            let modifier = 1;
            if(this.currentSortDir === 'desc') modifier = -1;
            if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
            if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
            return 0;
            }).filter(engagement => {
              if(this.filterType === 'All'){ return engagement } else{ return engagement.return_type === this.filterType} 
            }).filter(engagement => {
              if(this.filterCategory === 'All'){ return engagement } else{ return engagement.category === this.filterCategory} 
            }).filter(engagement => {
              if(this.filterAssigned === 'All'){ return engagement } else{ return engagement.assigned_to === this.filterAssigned} 
            }).filter(engagement => {
              if(this.filterYear === 'All'){ return engagement } else{ return engagement.year === this.filterYear} 
            }).filter(engagement => {
              if(this.filterWorkflow === 'All'){ return engagement } else{ return engagement.workflow_id === this.filterWorkflow} 
            }).filter(engagement => {
              if(this.filterEngageType === 'All'){ return engagement } else{ return engagement.type === this.filterEngageType} 
            }).filter(engagement => {
              if(this.filterStatusType === 'All'){ return engagement } else{ return engagement.status === this.filterStatusType} 
            }).filter( engagement => {
            return !this.searchEngagement || engagement.name.toLowerCase().indexOf(this.searchEngagement.toLowerCase()) >= 0 })
            .filter((row, index) => {
            let start = (this.currentPage-1)*this.pageSize;
            let end = this.currentPage*this.pageSize;
            if(index >= start && index < end) return true;
            }); 
        },
        sortedEngagementsForDownload:function() {
            return this.engagements.sort((a,b) => {
            let modifier = 1;
            if(this.currentSortDir === 'desc') modifier = -1;
            if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
            if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
            return 0;
            }).filter(engagement => {
              if(this.filterType === 'All'){ return engagement } else{ return engagement.return_type === this.filterType} 
            }).filter(engagement => {
              if(this.filterCategory === 'All'){ return engagement } else{ return engagement.category === this.filterCategory} 
            }).filter(engagement => {
              if(this.filterAssigned === 'All'){ return engagement } else{ return engagement.assigned_to === this.filterAssigned} 
            }).filter(engagement => {
              if(this.filterYear === 'All'){ return engagement } else{ return engagement.year === this.filterYear} 
            }).filter(engagement => {
              if(this.filterWorkflow === 'All'){ return engagement } else{ return engagement.workflow_id === this.filterWorkflow} 
            }).filter(engagement => {
              if(this.filterEngageType === 'All'){ return engagement } else{ return engagement.type === this.filterEngageType} 
            }).filter(engagement => {
              if(this.filterStatusType === 'All'){ return engagement } else{ return engagement.status === this.filterStatusType} 
            }).filter( engagement => {
            return !this.searchEngagement || engagement.name.toLowerCase().indexOf(this.searchEngagement.toLowerCase()) >= 0 })
        },
        filterReturnTypes() {
            //map return types
            const returns = this.engagements.filter(r => r.return_type != null).map(engagement => engagement.return_type)
            //filter duplicates
            const result = returns.filter((v, i) => returns.indexOf(v) === i)
            //return result
            return result
        },
        filterStatuses() {
            //map return types
            const statuses = this.engagements.map(engagement => engagement.status)
            //filter duplicates
            const result = statuses.filter((v, i) => statuses.indexOf(v) === i)
            //return result
            return result
        },
        filterCategories() {
            //map categories
            const categories = this.engagements.map(engagement => engagement.category)
            //filter duplicates
            const result = categories.filter((v, i) => categories.indexOf(v) === i)
            //return result
            return result
        },
        filterAssignedTo() {
            //map names
            const names = this.engagements.filter(r => r.assigned_to != 'Complete').map(engagement => engagement.assigned_to)
            //filter duplicates
            const result = names.filter((v, i) => names.indexOf(v) === i)

            return result
        },
        filterYears() {
            //map year
            const years = this.engagements.map(engagement => engagement.year)
            //filter duplicates
            const result = years.filter((v, i) => years.indexOf(v) === i)

            return result
        },
        filterTypes() {
            const type = this.engagements.map(engagement => engagement.type)

            const result = type.filter((v, i) => type.indexOf(v) === i)

            return result
        }
    },
    methods:{
        sort:function(s) {
        //if s == current sort, reverse
        if(s === this.currentSort) {
            this.currentSortDir = this.currentSortDir==='asc'?'desc':'asc';
        }
        this.currentSort = s;
        },
        nextPage:function() {
            if((this.currentPage*this.pageSize) < this.engagements.length) this.currentPage++;
        },
        prevPage:function() {
            if(this.currentPage > 1) this.currentPage--; 
        },
        downloadEngagements() {
            this.$store.dispatch('downloadEngagements', this.sortedEngagementsForDownload.reduce((acc, eng) => {
                acc.push(eng.id)
                return acc;
            }, []))
        },
        viewDetails(id) {
            this.$router.push({path: '/engagement/' + id + '/details'})
        },
        clearFilters() {
            this.$router.replace('/engagements')
            this.typeChecked = false
            this.statusChecked = false
            this.categoryChecked = false
            this.returnChecked = false
            this.yearChecked = false
            this.workflowChecked = false
            this.assignedChecked = false
            this.showInput = false
            this.filterEngageType = this.type
            this.filterStatusType = this.type
            this.filterType = this.type
            this.filterCategory = this.type
            this.filterAssigned = this.type
            this.filterYear = this.type
            this.filterWorkflow = this.type
            this.searchEngagement = ''
        },
        fixCasing(string) {
            if(string == 'taxreturn') {
                const newString = string.replace("taxreturn", "Tax Return")

                return newString
            }
        },
        showSearchInput() {
            this.showInput = !this.showInput
        },
        confirmEngagementsDownload() {
            this.$store.commit('confirmDownloadState')
        },
        cancelDownload() {
            this.$store.commit('confirmDownloadState')
        },
        workflowName(id) {
            return this.allWorkflows.filter(w => w.id == id)[0].workflow
        }
    },
    created() {
        this.$store.dispatch('retrieveEngagements')
        this.$store.dispatch('retrieveWorkflows')
        this.tableLoaded = true;
        this.filterType = this.type
        this.filterCategory = this.type
        this.filterAssigned = this.type
        this.filterYear = this.type
        this.filterWorkflow = this.type
        this.filterEngageType = this.type
        this.filterStatusType = this.type
        this.pageSize = this.options[1]
        var self = this;
        setTimeout(() => {
            self.tableLoaded = false;
            if(self.filters) {
                if(self.filters.chart == 'Workflow') {
                    self.filterWorkflow = this.filters.workflow.id
                    self.filterStatusType = this.filters.label
                    self.filterYear = this.filters.year
                } else if (this.filters.chart == 'Firm') {
                    self.filterYear = this.filters.year
                    self.filterWorkflow = this.allWorkflows.filter(w => w.workflow == this.filters.label)[0].id
                }
            }
        }, 3000)
    },
}
</script>

<style lang="scss" scoped>

.engagement-search-input {
    width: 100%;
    border: 1px solid lightgray;
    padding: 10px;
    box-sizing: border-box;
}

.engagement-list-header {
    background: lightgray;
    border-radius: 5px 0 0 0;
}

.dropdown .dropdown-toggle {
    border-radius: 0 5px 0 0;
    height: 100%;
}

.table thead th {
    vertical-align: middle;
    padding: 10px 15px;

    .table-label {
        white-space: nowrap;
        margin-bottom: 0;
    }
}

.dropdown-item {
    cursor: pointer;
}

.engagement-table {
    min-height: 50vh!important;
    height: 100%;
}

.hover {

    &:hover {
        cursor: pointer;
    }
}

tr {
    cursor: pointer;
}



@media screen and (max-width: 1300px) {
    .table {
        font-size: .8rem!important;
    }

    .hide-row {
        display: none;
    }
}

@media screen and (max-width: 767px) {
    .table {
        font-size: .75rem!important;
    }

    .mobile-hide-row {
        display: none!important;
    }
}

</style>