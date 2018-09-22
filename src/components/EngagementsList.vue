<template>
    <div>

         <div class="d-flex mb-3">

            <input class="form-control w-25" placeholder="Filter By Last Name" v-model="searchEngagement" type="search">
            <div class="mr-auto ml-2">
                <button class="btn btn-outline-primary dropdown-toggle dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span>Type:</span>
                All
                </button>
                <div class="dropdown-menu dropdown-menu-left">
                <a class="dropdown-item" href="#">Client</a>
                <a class="dropdown-item" href="#">Prospect</a>
                </div>
            </div>         

            <div class="btn-group ml-auto">
                <button class="btn btn-outline-secondary"><i class="fas fa-print"></i></button>
                <button class="btn btn-outline-success">Import <span><i class="fas fa-download"></i></span></button>
                <button class="btn btn-outline-danger">Export <span><i class="fas fa-upload"></i></span></button>
                <router-link to="/add" class="btn btn-primary pt-2">Engagement<i class="ml-2 fas fa-plus"></i></router-link>
            </div>

        </div>

        <table class="table table-bordered table-light table-striped table-hover text-left">
            <thead class="thead-primary hover">
                <tr>
                    <th scope="col" @click="sort('last_name')">Client</th>
                    <th scope="col" @click="sort('return_type')">Return Type</th>
                    <th scope="col" @click="sort('year')">Year</th>
                    <th scope="col" @click="sort('assigned_to')">Assigned To</th>
                    <th scope="col" @click="sort('status')">Status</th>
                    <th scope="col" class="text-center">Details</th>
                </tr>
            </thead> 
            <tbody class="client-info" v-if="!tableLoaded">
                <tr v-for="(engagement, index) in sortedEngagements"  :key="index">
                    <td>{{ engagement.client.last_name }}, {{ engagement.client.first_name }} & {{ engagement.client.spouse_first_name }}</td>
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
            searchEngagement: '',
            currentSort: 'last_name',
            currentSortDir: 'asc',
            currentPage: 1,
            pageSize: null,
            options: ['10', '25', '50', '100']
        }
    },
    created() {
        this.$store.dispatch('retrieveEngagements')
        this.tableLoaded = true;
        this.pageSize = this.options[1]
        var self = this;
        setTimeout(() => {
            self.tableLoaded = false;
        }, 3000)
    },
    computed: {
        sortedEngagements:function() {
            return this.engagements.sort((a,b) => {
            let modifier = 1;
            if(this.currentSortDir === 'desc') modifier = -1;
            if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
            if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
            return 0;
            }).filter((row, index) => {
            let start = (this.currentPage-1)*this.pageSize;
            let end = this.currentPage*this.pageSize;
            if(index >= start && index < end) return true;
            }).filter( engagement => {
            return !this.searchEngagement || engagement.client.last_name.toLowerCase().indexOf(this.searchEngagement.toLowerCase()) >= 0 }); 
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
        }
    },
}
</script>

<style lang="scss" scoped>

    .input-group {
        font-size: 14px;
        height: 35px;

        select {
            height: 35px;
        }
    }
</style>