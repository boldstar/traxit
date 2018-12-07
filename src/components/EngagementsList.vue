<template>
    <div>

         <div class="d-flex mb-3">

            <input class="form-control w-25" placeholder="Filter By Last Name" v-model="searchEngagement" type="search">
            <div class="mr-auto d-flex">

                    <div class="mx-2">
                        <div class="input-group">
                        <div class="input-group-prepend">
                        <label class="input-group-text font-weight-bold bg-light text-primary" for="option">Type</label>
                        </div>
                        <select class="custom-select" id="client_id" v-model="filterType">
                            <option> {{ type }}</option>
                            <option v-for="(returntype, index) in filterReturnTypes" :key="index">
                            {{ returntype }}
                            </option>
                        </select>
                        </div>
                    </div>  
                    <div>
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
            </div>

            <div class="btn-group ml-auto">
                <button class="btn btn-outline-secondary" @click="downloadEngagements">Download<span><i class="fas fa-download ml-2"></i></span></button>
                <router-link to="/add" class="btn btn-primary pt-2">Engagement<i class="ml-2 fas fa-plus"></i></router-link>
            </div>

        </div>

        <table class="table border table-light table-hover text-left">
            <thead class="text-primary hover">
                <tr>
                    <th scope="col">Client</th>
                    <th scope="col" @click="sort('category')">Category</th>
                    <th scope="col" @click="sort('return_type')">Return Type</th>
                    <th scope="col" @click="sort('year')">Year</th>
                    <th scope="col" @click="sort('assigned_to')">Assigned To</th>
                    <th scope="col" @click="sort('status')">Status</th>
                    <th scope="col" class="text-center">Details</th>
                </tr>
            </thead> 
            <tbody class="client-info table-bordered" v-if="!tableLoaded">
                <tr v-for="(engagement, index) in sortedEngagements"  :key="index">
                    <td class="text-capitalize">{{ engagement.name }}</td>
                    <td class="text-capitalize">{{ engagement.category }}</td>
                    <td>{{ engagement.return_type }}</td>
                    <td>{{ engagement.year }}</td>
                    <td>{{ engagement.assigned_to }}</td>
                    <td>{{ engagement.status }}</td>
                    <td class="text-center"><router-link v-bind:to="'/engagement/' + engagement.id"><i class="far fa-eye"></i></router-link></td>
                </tr>
            </tbody>
        </table>


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
            tableLoaded: false,
            filterType: '',
            filterCategory: '',
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
            }).filter( engagement => {
            return !this.searchEngagement || engagement.name.toLowerCase().indexOf(this.searchEngagement.toLowerCase()) >= 0 })
            .filter((row, index) => {
            let start = (this.currentPage-1)*this.pageSize;
            let end = this.currentPage*this.pageSize;
            if(index >= start && index < end) return true;
            }); 
        },
        filterReturnTypes() {
            //map categories
            const returns = this.engagements.map(engagement => engagement.return_type)
            //filter duplicates
            const result = returns.filter((v, i) => returns.indexOf(v) === i)
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
        }
    },
    created() {
        this.$store.dispatch('retrieveEngagements')
        this.tableLoaded = true;
        this.filterType = this.type
        this.filterCategory = this.type
        this.pageSize = this.options[1]
        var self = this;
        setTimeout(() => {
            self.tableLoaded = false;
        }, 3000)
    },
}
</script>

<style lang="scss" scoped>

.hover {

    &:hover {
        cursor: pointer;
    }
}


</style>