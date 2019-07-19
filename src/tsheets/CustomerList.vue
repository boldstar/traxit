<template>
     <div class="mx-3 ">
      <input type="text" @input="searchJobCodes($event)" class="search-customer-input" placeholder="Search for customers">
      <ul class="p-0 customer-card">
        <!-- <li class="d-flex justify-content-between p-2 border">
          <span class="align-self-center py-2">
            {{ currentJob[0].name }}
          </span>
          <button class="btn btn-sm btn-danger clock-in-btn" @click="clockOut(currentJob[0].id)">Clock Out</button>
        </li> -->
        <li class="d-flex justify-content-between p-2 border" v-for="(code, index) in computedJobCodes" :key="index" @mouseover="showClockIn(code.id)">
          <span class="align-self-center py-2">
            {{code.name}}
          </span>
          <button class="btn btn-sm btn-success clock-in-btn" v-if="clock && code.id == hoveredId">Clock In</button>
          <button class="btn btn-sm btn-success clock-in-btn" v-else-if="code.id == hoveredId">Switch</button>
        </li>
      </ul>
    </div>
</template>

<script>
import {compressItems} from '../plugins/tsheets'
import {mapActions} from 'vuex'
export default {
    name: 'CustomerList',
    props: ['customers', 'clock'],
    data() {
        return {
            searchJob: 'All',
            hoveredId: null
        }
    },
    computed: {
        computedJobCodes() {
            return compressItems(this.customers).filter(code => {if(this.searchJob === 'All'){ return code } else{ return code.name.toLowerCase().indexOf(this.searchJob.toLowerCase()) >= 0}})
        },
    },
    methods: {
        searchJobCodes(event) {
            if(event.target.value.length > 0) {
                this.searchJob = event.target.value
            } else {
                this.searchJob = 'All'
            }
        },
        showClockIn(id) {
            this.hoveredId = id
        },
    }
}
</script>

<style>
    .customer-card {
        height: 300px;
        overflow-y: scroll;
    }

    .search-customer-input {
        width: 100%;
        padding: 10px;
        font-size: 1.25rem;
    }
</style>
