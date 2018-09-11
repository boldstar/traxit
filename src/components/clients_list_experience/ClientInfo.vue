<template>
<div>

<!-- this is the row of buttons above the clients list -->
    <div class="d-flex mb-3">.
      <input class="form-control w-25" placeholder="Filter By Last Name" v-model="searchClient" type="search">
      <div class="mr-auto ml-2">
        <button class="btn btn-outline-primary dropdown-toggle dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <span>Category:</span>
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
        <router-link to="/add" class="btn btn-primary pt-2">Add Client</router-link>
      </div>

    </div>

        <!-- <div class="lds-dual-ring"></div> -->
        
    <!-- this is the table for the list of clients -->
    <table class="table table-bordered table-light table-striped table-hover text-left">
        <thead class="thead-primary hover">
            <tr>
                <th scope="col" @click="sort('name')">Name</th>
                <th scope="col" @click="sort('type')">Category</th>
                <th scope="col">Taxpayer Email</th>
                <th scope="col">Taxpayer Phone</th>
                <th scope="col">Spouse Email</th>
                <th scope="col">Spouse Phone</th>
                <th scope="col" class="text-center">Details</th>
            </tr>
        </thead> 
        <tbody class="client-info">
            <tr v-for="(client, index) in sortedClients"  :key="index">
                <td>{{ client.last_name }}, {{client.first_name}} & {{ client.spouse_first_name }}</td>
                <td>{{ client.category }}</td>
                <td>{{ client.email }}</td>
                <td>{{ client.cell_phone }}</td>
                <td>{{ client.spouse_email }}</td>
                <td>{{ client.spouse_cell_phone }}</td>
                <td class="text-center"><router-link v-bind:to="'/client/'+client.id"><i class="far fa-eye"></i></router-link></td>
            </tr>
        </tbody>
    </table>


    <nav aria-label="pagination" class="d-flex">
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
        <div class="align-self-center h6 pl-3">
           Per Page: {{ pageSize }}
        </div>
        
    </nav>

    </div>
</template>

<script>


export default {
    name: 'client-info',
    props: {
        clients: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            searchClient: '',
            currentSort: 'name',
            currentSortDir: 'asc',
            pageSize: 10,
            currentPage: 1,
        }
    },
    created() {
    this.$store.dispatch('retrieveClients')
    },
    computed: {
        sortedClients:function() {
            return this.clients.sort((a,b) => {
            let modifier = 1;
            if(this.currentSortDir === 'desc') modifier = -1;
            if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
            if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
            return 0;
            }).filter((row, index) => {
            let start = (this.currentPage-1)*this.pageSize;
            let end = this.currentPage*this.pageSize;
            if(index >= start && index < end) return true;
            }).filter( client => {
            return !this.searchClient || client.last_name.toLowerCase().indexOf(this.searchClient.toLowerCase()) >= 0 }); 
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
            if((this.currentPage*this.pageSize) < this.clients.length) this.currentPage++;
        },
            prevPage:function() {
            if(this.currentPage > 1) this.currentPage--;
        }
    }
}
</script>

<style lang="scss" scoped>
.hover {

    &:hover {
        cursor: pointer;
    }
}


</style>


