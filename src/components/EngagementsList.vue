<template>
    <div>

         <div class="d-flex mb-3">
            <div class="btn-group mr-2">
                <button type="button" class="btn btn-outline-primary" @click="showSearchInput">
                    <i class="fas fa-search"></i>
                </button>
                <button id="btnGroupDrop1" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="btn btn-outline-secondary font-weight-bold dropdown-toggle dropdown-toggle-split">
                    Filter Options
                </button>
                <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
                    <div class="dropdown-item d-flex justify-content-between py-0 px-1">
                        <span class="pb-1 font-weight-bold">Type</span>
                        <input type="checkbox" class="align-self-center" v-model="typeChecked">
                    </div>
                    <div class="dropdown-divider"></div>
                    <div class="dropdown-item d-flex justify-content-between py-0 px-1">
                        <span class="pb-1 font-weight-bold">Status</span>
                        <input type="checkbox" class="align-self-center" v-model="statusChecked">
                    </div>
                    <div class="dropdown-divider"></div>
                    <div class="dropdown-item d-flex justify-content-between py-0 px-1">
                        <span class="pb-1 font-weight-bold">Category</span>
                        <input type="checkbox" class="align-self-center" v-model="categoryChecked">
                    </div>
                    <div class="dropdown-divider"></div>
                    <div class="dropdown-item d-flex justify-content-between py-0 px-1">
                        <span class="pb-1 font-weight-bold">Return Type</span>
                        <input type="checkbox" class="align-self-center" v-model="returnChecked">
                    </div>
                    <div class="dropdown-divider"></div>
                    <div class="dropdown-item d-flex justify-content-between py-0 px-1">
                        <span class="pb-1 font-weight-bold">Assigned To</span>
                        <input type="checkbox" class="align-self-center" v-model="assignedChecked">
                    </div>
                    <div class="dropdown-divider"></div>
                    <div class="dropdown-item d-flex justify-content-between py-0 px-1">
                        <span class="pb-1 font-weight-bold">Year</span>
                        <input type="checkbox" class="align-self-center" v-model="yearChecked">
                    </div>
                    <div class="dropdown-divider"></div>
                    <div class="dropdown-item d-flex justify-content-between py-0 px-1">
                        <span class="pb-1 font-weight-bold">Workflows</span>
                        <input type="checkbox" class="align-self-center" v-model="workflowChecked">
                    </div>
                    <div class="dropdown-divider"></div>
                </div>
            </div>
            <div class="d-flex">
                <div class="mx-2" v-if="returnChecked">
                    <div class="input-group">
                    <div class="input-group-prepend">
                    <label class="input-group-text font-weight-bold bg-light text-primary" for="option">Return Type</label>
                    </div>
                    <select class="custom-select" id="client_id" v-model="filterType">
                        <option> {{ type }}</option>
                        <option v-for="(returntype, index) in filterReturnTypes" :key="index" v-if="returntype != null">
                        {{ returntype }}
                        </option>
                    </select>
                    </div>
                </div>  
                <div class="mx-2" v-if="categoryChecked">
                    <div class="input-group">
                    <div class="input-group-prepend">
                    <label class="input-group-text font-weight-bold bg-light text-primary" for="option">Category</label>
                    </div>
                    <select class="custom-select text-capitalize" id="category" v-model="filterCategory">
                        <option> {{ type }}</option>
                        <option v-for="(category, index) in filterCategories" :key="index">
                        {{ category }}
                        </option>
                    </select>
                    </div>
                </div>
                <div class="mx-2" v-if="assignedChecked">
                    <div class="input-group">
                    <div class="input-group-prepend">
                    <label class="input-group-text font-weight-bold bg-light text-primary" for="option">Assigned To</label>
                    </div>
                    <select class="custom-select text-capitalize" id="category" v-model="filterAssigned">
                        <option> {{ type }}</option>
                        <option v-for="(name, index) in filterAssignedTo" :key="index" v-if="name != 'Complete'">
                        {{ name }}
                        </option>
                    </select>
                    </div>
                </div>
                <div class="mx-2" v-if="yearChecked">
                    <div class="input-group">
                    <div class="input-group-prepend">
                    <label class="input-group-text font-weight-bold bg-light text-primary" for="option">Year</label>
                    </div>
                    <select class="custom-select text-capitalize" id="category" v-model="filterYear">
                        <option> {{ type }}</option>
                        <option v-for="(year, index) in filterYears" :key="index">
                        {{ year }}
                        </option>
                    </select>
                    </div>
                </div>
                <div class="mx-2" v-if="workflowChecked">
                    <div class="input-group">
                    <div class="input-group-prepend">
                    <label class="input-group-text font-weight-bold bg-light text-primary" for="option">Workflows</label>
                    </div>
                    <select class="custom-select text-capitalize" id="category" v-model="filterWorkflow">
                        <option> {{ type }}</option>
                        <option v-for="(workflow, index) in allWorkflows" :key="index" :value="workflow.id">
                        {{ workflow.workflow }}
                        </option>
                    </select>
                    </div>
                </div>
                <div class="mx-2" v-if="typeChecked">
                    <div class="input-group">
                    <div class="input-group-prepend">
                    <label class="input-group-text font-weight-bold bg-light text-primary" for="option">Type</label>
                    </div>
                    <select class="custom-select text-capitalize" id="category" v-model="filterEngageType">
                        <option> {{ type }}</option>
                        <option v-for="(engagetype, index) in filterTypes" :key="index">
                        {{ engagetype }}
                        </option>
                    </select>
                    </div>
                </div>
                <div class="mx-2" v-if="statusChecked">
                    <div class="input-group">
                    <div class="input-group-prepend">
                    <label class="input-group-text font-weight-bold bg-light text-primary" for="option">Status</label>
                    </div>
                    <select class="custom-select text-capitalize" id="category" v-model="filterStatusType">
                        <option> {{ type }}</option>
                        <option v-for="(status, index) in filterStatuses" :key="index">
                        {{ status }}
                        </option>
                    </select>
                    </div>
                </div>
            </div>

            <div class="btn-group ml-auto">
                <button class="btn btn-outline-primary" @click="clearFilters" data-toggle="tooltip" data-placement="top" title="Clear Filters"><i class="fas fa-filter"></i></button>
                <button class="btn btn-outline-secondary" @click="downloadEngagements" data-toggle="tooltip" data-placement="top" title="Download Engagements"><i class="far fa-file-excel"></i></button>
                <router-link to="/add" class="btn btn-primary pt-2" data-toggle="tooltip" data-placement="top" title="Add New Engagement"><i class="far fa-plus-square"></i></router-link>
            </div>

        </div>

        <div class="d-flex flex-column">
            <input v-if="showInput" class="form-control mb-3" placeholder="Filter By Last Name" v-model="searchEngagement" type="search">
            <table class="table border table-light table-hover text-left">
                <thead class="text-primary hover">
                    <tr>
                        <th scope="col">Client</th>
                        <th scope="col" @click="sort('category')">Category</th>
                        <th scope="col">Engagement Type</th>
                        <th scope="col" @click="sort('return_type')">Return Type</th>
                        <th scope="col" @click="sort('year')">Year</th>
                        <th scope="col" @click="sort('assigned_to')">Assigned To</th>
                        <th scope="col" @click="sort('status')">Status</th>
                        <th scope="col" class="text-center">Details</th>
                    </tr>
                </thead> 
                <tbody class="client-info table-bordered" v-if="!tableLoaded">
                    <tr v-for="(engagement, index) in sortedEngagements"  :key="index" @click="viewDetails(engagement.id)">
                        <td class="text-capitalize">{{ engagement.name }}</td>
                        <td class="text-capitalize">{{ engagement.category }}</td>
                        <td class="text-capitalize" v-if="engagement.type == 'taxreturn'">{{ fixCasing(engagement.type) }}</td>
                        <td class="text-capitalize" v-else>{{ engagement.type }}</td>
                        <td v-if="engagement.return_type != null">{{ engagement.return_type }}</td>
                        <td v-else>None</td>
                        <td>{{ engagement.year }}</td>
                        <td>{{ engagement.assigned_to }}</td>
                        <td>{{ engagement.status }}</td>
                        <td class="text-center"><router-link v-bind:to="'/engagement/' + engagement.id"><i class="far fa-eye"></i></router-link></td>
                    </tr>
                </tbody>
            </table>
        </div>


        <nav aria-label="pagination" class="d-flex" v-if="!tableLoaded">
        <ul class="pagination">
            <li class="page-item">
                <button class="page-link" @click="prevPage">Previous</button>            
            </li>
            <li class="page-item">
                <a class="page-link">
                 {{ currentPage }}
                </a>            
            </li>
            <li class="page-item">
                <button class="page-link" @click="nextPage">Next</button>           
            </li>
        </ul>
        <div class="pl-3">
            <div class="input-group">
                <div class="input-group-prepend">
                    <label class="input-group-text" for="option">Per Page:</label>
                </div>
                <select class="custom-select" id="option" v-model="pageSize">
                    <option v-for="option in options" :key="option.id" :value="option">{{ option }}</option>
                </select>
            </div>
        </div>
        <div class="ml-auto align-self-center">
            <label for="count" class="font-weight-bold">Viewing: </label>
            <span id="count">
                {{ sortedEngagements.length }} of {{ engagements.length }}
            </span>
        </div>   
    </nav>
  
        <div v-if="tableLoaded" class="lds-dual-ring justify-content-center"></div>

    </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
    name: 'EngagementsList',
    props: {
        engagements: {
            type: Array,
            default: () => []
        }
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
        ...mapGetters(['allWorkflows']),
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
        filterReturnTypes() {
            //map return types
            const returns = this.engagements.map(engagement => engagement.return_type)
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
            const names = this.engagements.map(engagement => engagement.assigned_to)
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
            this.$store.dispatch('downloadEngagements')
        },
        viewDetails(id) {
            this.$router.push({path: '/engagement/' + id})
        },
        clearFilters() {
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
        }, 3000)
    },
}
</script>

<style lang="scss" scoped>
.dropdown-item {
    cursor: pointer;
}
.search-input {
    width: 200px;
}
.hover {

    &:hover {
        cursor: pointer;
    }
}

tr {
    cursor: pointer;
}

</style>