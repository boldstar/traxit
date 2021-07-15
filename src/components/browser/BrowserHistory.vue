<template>
    <div class="bg-white browserhistory">
        <div class="browserhistory-sticky d-flex flex-column" :key="browserHistory">
            <div class="d-flex justify-content-between px-3">
                <span class="align-self-center font-weight-bold"><i class="fas fa-stopwatch mr-2 text-primary"></i>Browser History</span>
                <button @click="closeBrowserHistory" class="btn btn-link text-danger font-weight-bold browserhistory-close-btn">X</button>
            </div>
           
            <BrowserHistoryCard :contacts="allClients" :engagements="allEngagements" />
            
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import BrowserHistoryCard from '@/components/browser/BrowserHistoryCard.vue'

export default {
    name: 'BrowserHistory',
    data () {
        return {
            
        }
    },
    components: {
        BrowserHistoryCard,
    },
    computed: {
        ...mapGetters(['successAlert', 'errorAlert', 'errorMsgAlert', 'browserHistory', 'allEngagements', 'allClients']),
      
    },
    methods: {
        closeBrowserHistory() {
            this.$store.commit('BROWSER_HISTORY')
        }
    },
    created() {
        this.$store.dispatch('retrieveEngagements')
        this.$store.dispatch('retrieveClients')
    }
}
</script>

<style lang="scss" scoped>

    .list-enter-active, .list-leave-active {
        transition: opacity 1s;
        min-height: 215px;
        height: 100%;
    }
    .list-enter, .list-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
        height: 0;
    }

    .browserhistory {
        position: fixed;
        top: 0;
        bottom: 0;
        right: 0;
        z-index: 101; /* Behind the navbar */
        padding: 52px 0 0; /* Height of navbar */
        box-shadow: -5px 0px 10px 1px rgba(0, 0, 0, 0.555);
        width: 500px!important;
    }

    .browserhistory-body {
        width: 100%;
    }

    .browserhistory-sticky {
        position: relative;
        top: 0;
        height: calc(100vh - 52px);
        padding-top: .5rem;
        overflow-x: hidden;
        overflow-y: auto; /* Scrollable contents if viewport is shorter than content. */

        i {
            margin-right: 10px;
            font-size: 16px;
        }

        .title {
            font-size: 16px;
        }
    }

    @supports ((position: -webkit-sticky) or (position: sticky)) {
        .browserhistory-sticky {
            position: -webkit-sticky;
            position: sticky;
        }
    }



    .browserhistory .nav-link {
        font-size: 19px;
        font-weight: 600;
        color: rgb(0, 0, 0);
        list-style: none;
        letter-spacing: .05em;
        transition-duration: .3s;
        padding-top: 20px;
        padding-bottom: 20px;
        transition: .5s;

        i {
            font-size: 22px;
        }

        &:hover {
            background:rgb(223, 231, 253);
        }
    }

    .browserhistory-close-btn {
        font-size: 1.25rem!important;
    }

    .is-active {
        background: rgb(223, 231, 253);

        i {
            color: #0077ff;
        }

        &:after {
            content: " ";
            position: absolute;
            height: 0;
            width: 0;
            border-bottom: 15px solid transparent;
            border-top: 15px solid transparent;
            border-right: 15px solid white;
            margin-top: 0;
            left: 200px;
            transition: 1s;
        }

    }


    .browserhistory-heading {
        font-size: 1.0rem;
        text-transform: uppercase;
        font-weight: bold;
        letter-spacing: .2em;
    }

    .nav {
        margin-top: 32px!important;
    }

    .sublist {
        list-style: none;
        text-align: right;
        background: #fff;
        padding: 10px;
        font-weight: bold;
        border-right: 1px solid rgb(231, 231, 231);
        transition: all .5s;

        li {
            margin-right: 20px;
            margin-bottom: 8px;
            position: relative;
        
            &:hover {
                cursor: pointer;
            }

            &:before {
                content: "";
                position: absolute;
                left: 12px;
                margin-top: 8px;
                height: 10px;
                width: 10px;
                box-sizing: border-box;
                border-radius: 50%;
                background: rgb(231, 231, 231);
            }

        }

    }

    .sublist-link {
        color: #0077ff;

        &:after {
            content: " ";
            position: absolute;
            height: 0;
            width: 0;
            border-bottom: 8px solid transparent;
            border-top: 8px solid transparent;
            border-right: 8px solid rgb(231, 231, 231);
            margin-top: 5px;
            left: 196px;
            transition: 1s;
        }
    }

</style>

