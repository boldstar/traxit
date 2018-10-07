<template>
   <div>
        <!-- this is the header for the contact engagements with the add engagement button -->
        <div class="header p-0 d-flex flex-row justify-content-between mt-2 mb-4 shadow-sm">
            <div class="ml-3 pr-2  h3 align-self-center m-0">
                <i class=" far fa-clipboard text-primary"></i> |
                <span>{{ clientNotes.length }}</span>
            </div>
            <router-link :to=" '/contact/' + client.id + '/notes/add-note'" class="mr-3 btn btn-primary btn-sm m-0 align-self-center"><i class="mr-2 fas fa-plus-square"></i>Note</router-link>
        </div>

        <!-- this is where the add-engagement route shows up if route is matched -->
        <transition name="router-animation" enter-active-class="animated bounceInDown" leave-active-class="animated zoomOut" mode="out-in">
            <router-view></router-view>
        </transition>

        <!-- this will show if there is no engagements only -->
        <div v-if="noNotes & !notesLoaded" class="mt-5">
            This Contact Has No Notes...
        </div>

        <!-- this shows if there is engagements -->
        <div v-else>

            <div v-if="!notesLoaded">
                <div class="card mb-3 shadow-sm p-0" v-for="(note, index) in clientNotes" :key="index" v-if="$route.name == 'notes'">
                    <div class="card-header text-left font-weight-bold">
                        Note
                    </div>
                    <div class="card-body text-left">
                        <span v-html="note.note"></span>
                    </div>
                    <div class="card-footer d-flex justify-content-between">
                        <router-link :to="'/contact/' + client.id + '/notes/edit-note/' +note.id " class="btn btn-secondary ml-auto"><i class="far fa-eye mr-2"></i>Edit</router-link>
                    </div>
                </div>
            </div>

        </div>

        
    <!-- this is the loading ring for the engagements -->
    <div v-if="notesLoaded" class="lds-dual-ring justify-content-center"></div>

    </div>
</template>

<script>
import { mapGetters } from 'vuex'


export default {
    name: 'Notes',
    data() {
        return {
            notesLoaded: false,
            noNotes: false,
        }
    },
    computed: {
    ...mapGetters(['clientNotes', 'client']),
    },
    created() {
        this.$store.dispatch('getClientNotes', this.$route.params.id);
        this.notesLoaded = true;
        var self = this;
        setTimeout(() => {
            self.notesLoaded = false;
            if(self.clientNotes == 0){
                 self.noNotes = true
            } else {
                self.noNotes = false
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