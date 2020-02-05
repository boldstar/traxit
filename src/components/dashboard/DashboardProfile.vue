<template>
    <div class="profile-card">
        <div class="h-100 mb-3" >
            <div class="p-2 text-left d-flex justify-content-between">
                <div>
                    <div  v-if="details && details.business_name" class="h5 mb-0">
                        <i class="fas fa-building mr-2 text-primary"></i>
                        <span class="font-weight-bold">{{ businessName }}</span>
                    </div>
                    <router-link :disabled="role != 'Admin'" to="/administrator/account" class="btn btn-secondary btn-sm font-weight-bold align-self-center" v-else>Add Bussiness Name</router-link>
                </div>
                <div class="input-group input-group-sm ml-2 w-25">
                    <div class="input-group-prepend">
                        <label class="input-group-text text-secondary bg-white font-weight-bold" for="option">Tax Year</label>
                    </div>
                    <select name="year" id="year" class="form-control form-control-sm" v-model="current">
                        <option selected>{{option}}</option>
                        <option v-for="(year, index) in filterYears" :value="year" :key="index">{{year}}</option>
                    </select>
                </div>
            </div>
            <div class="card-body px-0 pb-0 d-flex justify-content-center">
                <img class="profile-logo" v-if="details && details.logo && logo" v-bind:src="logo" />
                <router-link :disabled="role != 'Admin'" to="/administrator/account" class="btn btn-primary font-weight-bold my-5" v-else>Add Logo</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import DashboardTotal from '@/components/dashboard/DashboardTotal.vue'
import moment from 'moment'
import { mapGetters } from 'vuex'

export default {
   name: 'DashboardProfile',
   props: ['workflows', 'engagements', 'tax_year', 'details'],
   components: {DashboardTotal},
    data () {
        return {
            selected: false,
            option: 'All',
        }
    },
    computed: {
        current: {
            get: function() {
                return this.tax_year
            },
            set: function(value) {
                this.$emit('change-year', value)
            }
        },
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
        filterYears() {
            //map year
            const years = this.engagements.map(engagement => engagement.year)
            //filter duplicates
            const result = years.filter((v, i) => years.indexOf(v) === i)

            return result
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
        }
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
        flex-grow: 1;
    }

    .profile-header {
        white-space: nowrap;
    }
</style>