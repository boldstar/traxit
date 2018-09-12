<template>
    <div>
    <div class="row">
        <div class="col-lg-6 col-md-3">
            <div class="card mr-md-1">
                <div class="card-header text-left">
                    <strong>Tax Payer</strong>
                    </div>
                    <div class="card-body h5">
                    <i class="fas fa-user-circle fa-5x"></i>
                    <h5 class="card-title mt-3 text-capitalize">{{ client.first_name }} {{client.middle_initial}} {{client.last_name}}</h5>
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
        <div class="col-lg-6 col-md-3 mb-3">
            <div class="card">
                <div class="card-header text-left">
                    <strong>Spouse</strong>
                    </div>
                    <div class="card-body h5">
                    <i class="fas fa-user-circle fa-5x"></i>
                    <h5 class="card-title mt-3 text-capitalize">{{ client.spouse_first_name }} {{client.spouse_middle_initial}} {{client.spouse_last_name}}</h5>
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
    <ul class="list-group mb-3">
        <li class="list-group-item text-left justify-content-between d-flex">
            <div><span class="font-weight-bold">Address: </span>{{ client.street_address }}, {{ client.city }}, {{ client.state }} {{ client.postal_code }}</div>
            <div class="text-capitalize"><span class="font-weight-bold">Referred By: </span>{{ client.referral_type }}</div>  
        </li>
    </ul>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'account',
    computed: {
    ...mapGetters(['client'])
    },
    created: function(){
    this.$store.dispatch('getDetails', this.$route.params.id);
  }
    
}
</script>

<style lang="scss">

</style>