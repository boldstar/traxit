<template>
    <div class="d-flex flex-column profile-card bg-white" v-if="!loading && !noData">
        <div class="h-100 mb-3" >
            <div class="p-2 text-left">
                <span class="h5 ml-3 mb-0 font-weight-bold align-self-center" v-if="details && details.business_name">{{ businessName }}</span>
                <router-link :disabled="role != 'Admin'" to="/administrator/account" class="btn btn-secondary btn-sm font-weight-bold align-self-center" v-else>Add Bussiness Name</router-link>
            </div>
            <div class="card-body px-0 pb-0">
                <img class="ml-5 profile-logo" v-if="details && details.logo && logo" v-bind:src="logo" />
                <router-link :disabled="role != 'Admin'" to="/administrator/account" class="btn btn-primary font-weight-bold my-5" v-else>Add Logo</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment'
import { mapGetters } from 'vuex'

export default {
   name: 'DashboardProfile',
   props: ['workflows', 'engagements', 'tax_year', 'details'],
    data () {
        return {
            barHeight: 250,
            workflowKey: null,
            chartData: false,
            taskData: false,
            loading: false,
            noData: false,
            selected: false,
            option: 'All',
            averageCalc: false,
           
        }
    },
    computed: {
        businessName() {
            return this.details.business_name
        },
        logo() {
            return `data:image/png;base64, ${this.details.logo}`
        },
        activeEngagements() {
            return this.engagements.filter(engagement => engagement.done == false).filter(eng => this.tax_year === 'All' ? eng : eng.year === this.tax_year).length
        },
        totalTaxReturns() {
            return this.engagements.filter(engagement => engagement.type == 'taxreturn').filter(eng => this.tax_year === 'All' ? eng : eng.year === this.tax_year).length
        },
        totalBookkeeping() {
            return this.engagements.filter(engagement => engagement.type == 'bookkeeping').filter(eng => this.tax_year === 'All' ? eng : eng.year === this.tax_year).length
        },
    },
    methods: {
        getUnique(arr, comp) {
            const unique = arr.map(e => e[comp]).map((e, i, final) => final.indexOf(e) === i && i).filter(e => arr[e]).map(e => arr[e]);
            return unique
        },
        mapCreatedDates(arr) {
            var a = [], prev;

            arr.sort();
            for ( var i = 0; i < arr.length; i++ ) {
                if ( arr[i] !== prev ) {
                    a.push({
                        x: arr[i],
                        y: 1
                    })
                } else {
                    a[a.length-1].y++
                }
                prev = arr[i];
            }

            return a;
        },
    },
}
</script>

<style lang="scss">
    .profile-logo {
        max-height: 150px;
        width: auto;
        margin-top: 50px;
    }

    .profile-card {
        width: 100%;
        max-width: 300px;
    }
</style>