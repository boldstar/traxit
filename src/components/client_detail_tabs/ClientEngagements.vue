<template>
    <div>
        <div class="header p-0 d-flex flex-row justify-content-between mt-2 mb-4 shadow-sm">
            <i class="ml-3 pr-2 far fa-folder-open h3 text-primary align-self-center m-0"></i>
            <router-link :to=" { path: '/client/' + client.id + '/engagements/add-engagement' }" class="mr-3 btn btn-primary btn-sm m-0 align-self-center"><i class="mr-2 fas fa-plus-square"></i>Engagement</router-link>
        </div>

        <!-- this is where the add-engagement route shows up if route is matched -->
        <transition name="router-animation" enter-active-class="animated bounceInDown" leave-active-class="animated zoomOut" mode="out-in">
            <router-view></router-view>
        </transition>

        <div class="row mx-2 px-2 justify-content-between engagements" v-if="!engagementLoaded">
            <div class="card mb-3 shadow-sm col-lg-5 col-md-3 p-0" v-for="(engagement, index) in clientEngagements" :key="index">
                <div class="d-flex justify-content-between card-header">
                    <h3 class="m-0 text-muted">{{ index + 1 }}</h3>
                    <h5 class="align-self-center m-0"><span>Return Type: </span> {{ engagement.return_type }} </h5>
                </div>
                <div class="card-body text-left p-0 my-1">
                    <h5 class="p-4"><span>Year: </span> {{ engagement.year }} </h5>
                    <hr class="my-1">
                    <h5 class="p-4"><span>Assigned To: </span> {{ engagement.assigned_to }} </h5>
                    <hr class="my-1">
                    <h5 class="p-4"><span>Status: </span> {{ engagement.status}} </h5>
                </div>
                <div class="card-footer d-flex justify-content-between">
                    <router-link to="#" class="btn">View</router-link>
                    <router-link to="#" class="btn">Edit</router-link>
                </div>
            </div>
        </div>

    <div v-if="engagementLoaded" class="lds-dual-ring justify-content-center"></div>

    </div>



</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'client-engagements',
    data() {
        return {
            engagementLoaded: false,
        }
    },
    computed: {
    ...mapGetters(['clientEngagements', 'client']),
    },
    created() {
        this.$store.dispatch('getClientEngagements', this.$route.params.id);
        this.engagementLoaded = true;
        var self = this;
        setTimeout(() => {
            self.engagementLoaded = false;
        }, 3000);
    },   
}
</script>

<style lang="scss" scoped>

    .header {
        height: 4em;
    }

    .card {
        height: 375px;
    }

    .engagements {
        overflow-y: scroll;
        height: 80vh;
    }

     //this is the css for the loading spinner
    .lds-dual-ring {
        display: inline-block;
        width: 64px;
        height: 64px;
        margin-top: 100px;
        margin-bottom: 100px;
    }

    .lds-dual-ring:after {
        content: " ";
        display: block;
        width: 46px;
        height: 46px;
        margin: 1px;
        border-radius: 50%;
        border: 5px solid #0077ff;
        border-color: #0077ff transparent #0077ff transparent;
        animation: lds-dual-ring 1.2s linear infinite;
    }
        @keyframes lds-dual-ring {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    .lds-ellipsis-container {
        position: absolute;
        right: 50%;
        padding-right: 20px;
    }

    .lds-ellipsis {
        display: inline-block;
        position: relative;
        width: 64px;
        height: 11px;
    }

    .lds-ellipsis div {
        position: absolute;
        width: 11px;
        height: 11px;
        border-radius: 50%;
        background: #fff;
        animation-timing-function: cubic-bezier(0, 1, 1, 0);
    }

    .lds-ellipsis div:nth-child(1) {
        left: 6px;
        animation: lds-ellipsis1 0.6s infinite;
    }
    .lds-ellipsis div:nth-child(2) {
        left: 6px;
        animation: lds-ellipsis2 0.6s infinite;
    }
    .lds-ellipsis div:nth-child(3) {
        left: 26px;
        animation: lds-ellipsis2 0.6s infinite;
    }
    .lds-ellipsis div:nth-child(4) {
        left: 45px;
        animation: lds-ellipsis3 0.6s infinite;
    }
    @keyframes lds-ellipsis1 {
        0% {
            transform: scale(0);
        }
        100% {
            transform: scale(1);
        }
        }
        @keyframes lds-ellipsis3 {
        0% {
            transform: scale(1);
        }
        100% {
            transform: scale(0);
        }
        }
        @keyframes lds-ellipsis2 {
        0% {
            transform: translate(0, 0);
        }
        100% {
            transform: translate(19px, 0);
        }
    }

</style>