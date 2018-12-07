<template>
    <div>
        <!-- this is the header for the contact engagements with the add engagement button -->
        <div class="header p-0 d-flex flex-row justify-content-between mt-2 mb-4 shadow-sm">
            <div class="ml-3 pr-2  h3 align-self-center m-0">
                <i class=" far fa-folder-open text-primary"></i> |
                <span>{{ clientEngagements.length }}</span>
            </div>
            <router-link :to=" { path: '/contact/' + client.id + '/engagements/add-engagement' }" class="mr-3 btn btn-primary btn-sm m-0 align-self-center"><i class="mr-2 fas fa-plus-square"></i>Engagement</router-link>
        </div>

        <!-- this is where the add-engagement route shows up if route is matched -->
        <transition name="router-animation" enter-active-class="animated bounceInDown" leave-active-class="animated zoomOut" mode="out-in">
            <router-view></router-view>
        </transition>

        <!-- this will show if there is no engagements only -->
        <div v-if="noEngagements & !engagementLoaded" class="mt-5">
            This Contact Has No Engagements...
        </div>

        <!-- this shows if there is engagements -->
        <div v-else>

            <div v-if="!engagementLoaded">
                
                        <table class="table">
                            <thead class="text-primary border">
                                <tr>
                                <th  scope="col">Category</th>
                                <th  scope="col">Return Type</th>
                                <th  scope="col">Year</th>
                                <th scope="col">Assigned To</th>
                                <th  scope="col">Status</th>
                                <th  scope="col">Created Date</th>
                                <th  scope="col">Details</th>
                                </tr>
                            </thead>
                            <tbody class="table-bordered">
                                <tr v-for="(engagement, index) in clientEngagements" :key="index">
                                <th class="text-capitalize">{{ engagement.category}}</th>
                                <th>{{ engagement.return_type}}</th>
                                <th>{{ engagement.year }}</th>
                                <th>{{ engagement.assigned_to}}</th>
                                <th>{{ engagement.status }}</th>
                                <th>{{ engagement.created_at | formatDate }}</th>
                                <th><router-link v-bind:to="'/engagement/' + engagement.id " class="btn btn-primary btn-sm ml-auto"><i class="far fa-eye mr-2"></i>View</router-link></th>
                                </tr>
                            </tbody>
                        </table> 
                    </div>

        </div>

        
    <!-- this is the loading ring for the engagements -->
    <div v-if="engagementLoaded" class="lds-dual-ring justify-content-center"></div>

    </div>



</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'contact-engagements',
    data() {
        return {
            engagementLoaded: false,
            noEngagements: false,
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
            if(self.clientEngagements == 0){
                 self.noEngagements = true
            } else {
                self.noEngagements = false
            }
        }, 3000);
    },   
}
</script>

<style lang="scss" scoped>

    .header {
        height: 4em;
    }

    .engagements {
        overflow-y: scroll;
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