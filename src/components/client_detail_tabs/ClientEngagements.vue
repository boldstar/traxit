<template>
    <div>
        <div class="header p-0 d-flex flex-row justify-content-between mt-2 mb-4 shadow-sm">
            <i class="ml-3 pr-2 far fa-folder-open h3 text-primary align-self-center m-0"></i>
            <router-link to="/add-engagement" class="mr-3 btn btn-success btn-sm m-0 align-self-center"><i class="mr-2 fas fa-plus-square"></i>Engagement</router-link>
        </div>

        <div class="row mx-1">
            <div class="card mb-3 mr-3 shadow-sm col-4 p-0" v-for="(engagement, index) in engagement" :key="index">
                <div class="d-flex justify-content-between card-header">
                    <h3 class="m-0 text-muted">{{ index + 1 }}</h3>
                    <h5 class="align-self-center m-0"><span>Return Type: </span> {{ engagement.return_type }} </h5>
                </div>
                <div class="card-body text-left p-0 my-1">
                    <h5 class="p-4"><span class="desc">Assigned To: </span> {{ engagement.assigned_to }} </h5>
                    <hr class="my-1">
                    <h5 class="p-4"><span class="desc">Status: </span> {{ engagement.status}} </h5>
                </div>
                <div class="card-footer d-flex justify-content-between">
                    <router-link to="#" class="btn">View</router-link>
                    <router-link to="#" class="btn">Edit</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'client-engagements',
    computed: {
    ...mapGetters(['engagement'])
    },
    created() {
        this.$store.dispatch('getClientEngagement', this.$route.params.id)
    },    
}
</script>

<style lang="scss">

    .header {
        height: 4em;
    }


</style>