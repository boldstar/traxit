<template>
    <div class="row">
        <div class="col-lg-12 col-md-3">
            <div class="card mr-md-1">
                <div class="card-header text-left">
                    <strong>Tax Payer</strong>
                    <h6 class="float-right">Status: <span class="badge badge-danger">Status</span></h6>
                    </div>
                    <div class="card-body h5">
                    <i class="fas fa-user-circle fa-5x"></i>
                    <h5 class="card-title mt-3">{{ client.name }}</h5>
                    <p class="card-text h6">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                    <ul class="list-group list-group-flush h6 text-left">
                    <li class="list-group-item">{{client.type}}</li>
                    <li class="list-group-item">{{client.email}}</li>
                    <li class="list-group-item">{{client.phone}}</li>
                    <li class="list-group-item">{{client.address}}</li>
                    </ul>
                    <div class="card-body mr-auto">
                    <a href="#" class="btn btn-sm btn-outline-secondary card-link">Edit</a>
                </div>
            </div>
        </div>
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