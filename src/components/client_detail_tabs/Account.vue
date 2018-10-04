<template>
    <div>
        

        <!-- this is the details of the account -->
    <div class="col-8 col-md-7 d-inline-flex flex-column pl-0 ml-2" v-if="$route.name == 'account'">
        <div class="">
            <div class="card mb-3">
                <div class="card-header text-left d-flex justify-content-between py-0">
                    <div class="d-flex h4 mt-3">
                        <strong class="card-title mr-3 text-primary">Taxpayer: </strong>
                        <span class="card-title text-capitalize">{{ client.first_name }} {{client.middle_initial}} {{client.last_name}}</span>
                    </div>
                    <i class="fas fa-user-circle fa-3x mt-2"></i>
                </div>
                <ul class="list-group list-group-flush h6 text-left">
                    <li class="list-group-item"><span class="font-weight-bold">Date Of Birth: </span>{{client.dob}}</li>
                    <li class="list-group-item text-capitalize"><span class="font-weight-bold">Occupation: </span>{{client.occupation}}</li>
                    <li class="list-group-item"><span class="font-weight-bold">Email: </span>{{client.email}}</li>
                    <li class="list-group-item"><span class="font-weight-bold">Cell Phone: </span>{{client.cell_phone}}</li>
                    <li class="list-group-item"><span class="font-weight-bold">Work Phone: </span>{{client.work_phone}}</li>
                </ul>
            </div>
        </div>
        <div class="mb-3">
            <div class="card">
                <div class="card-header text-left d-flex justify-content-between py-0">
                    <div class="d-flex h4 mt-3">
                        <strong class="card-title mr-3 text-primary">Spouse: </strong>
                        <span class="card-title text-capitalize">{{ client.spouse_first_name }} {{client.spouse_middle_initial}} {{client.spouse_last_name}}</span>
                    </div>
                    <i class="fas fa-user-circle fa-3x mt-2"></i>
                </div>
                <ul class="list-group list-group-flush h6 text-left">
                    <li class="list-group-item"><span class="font-weight-bold">Date Of Birth: </span> {{client.spouse_dob}}</li>
                    <li class="list-group-item text-capitalize"><span class="font-weight-bold">Occupation: </span> {{client.spouse_occupation}}</li>
                    <li class="list-group-item"><span class="font-weight-bold">Email: </span> {{client.spouse_email}}</li>
                    <li class="list-group-item"><span class="font-weight-bold">Cell Phone: </span> {{client.spouse_cell_phone}}</li>
                    <li class="list-group-item"><span class="font-weight-bold">Work Phone: </span> {{client.spouse_work_phone}}</li>
                </ul>
            </div>
        </div>


    </div>
        <!-- this is the address of the account contact -->
        <div class="float-right col-3 col-sm-4 ml-0 pl-0 mr-4 mb-3 mr-sm-2" v-if="$route.name == 'account'">
            <div class="card mb-3">
                <div class="card-header text-left text-primary font-weight-bold">
                        Details
                </div>
                <ul class="list-group">
                    <li class="list-group-item text-left justify-content-between d-flex">
                        <span class="font-weight-bold">Category: </span>
                        <div class="text-right">{{ client.category }}</div>
                    </li>
                    <li class="list-group-item text-left justify-content-between d-flex">
                        <span class="font-weight-bold">Referred By: </span>
                        <div class="text-capitalize">{{ client.referral_type }}</div>  
                    </li>
                    <li class="list-group-item text-left justify-content-between d-flex">
                        <span class="font-weight-bold">Address: </span>
                        <div class="text-right">{{ client.street_address }}, {{ client.city }}, {{ client.state }}, {{ client.postal_code }}</div>
                    </li>
                </ul>
            </div>

            <!-- this is the dependents belonging to the client -->
            <div class="card mb-3" v-for="dependent in client.dependents" :key="dependent.id" v-if="$route.name == 'account'">
                <div class="card-header text-left text-primary font-weight-bold">
                    Dependent
                </div>
                <div class="list-group">
                    <div class="list-group-item text-left justify-content-between d-flex">
                        <span class="font-weight-bold">
                            Name: 
                        </span>
                        <div>
                            {{ dependent.first_name }} {{ dependent.middle_name }} {{ dependent.last_name }}
                        </div>
                    </div>
                    <div class="list-group-item text-left justify-content-between d-flex">
                        <span class="font-weight-bold">
                            Date Of Birth:
                        </span>
                        <div>
                            {{ dependent.dob }}
                        </div>
                    </div>
                </div>
            </div>
        </div>

<!-- this is where the edit contact child view shows up -->
    <router-view ></router-view>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'


export default {
    name: 'account',
    data() {
        return {
            alert: ''
        }
    },
    computed: {
    ...mapGetters(['client'])
    },
    // this will get the message from the url
    created: function(){
    this.$store.dispatch('getDetails', this.$route.params.id);
  }
    
}
</script>

<style lang="scss">

</style>