<template>
    <div class="bg-white timesheet">
        <div class="timesheet-sticky d-flex flex-column" :key="timesheet">
            <div class="d-flex justify-content-between px-3">
                <span class="align-self-center font-weight-bold"><i class="fas fa-stopwatch mr-2 text-primary"></i>Timesheet</span>
                <button @click="closeTimesheet" class="btn btn-link text-danger font-weight-bold timesheet-close-btn">X</button>
            </div>
           
            <TimesheetCard v-if="tsheetsAccessToken" />

            <div class="mt-5 d-flex flex-column align-items-center" v-else>
                <div class="d-flex justify-content-between w-100 px-5">
                    <img src="../assets/tsheets_logo.png" alt="tsheets_logo" />
                    <ConnectButton />
                </div>
                <p class="px-5 mt-2">Easily capture time of each engagement and your teams hours using the Tsheets Time Tracking integration. Simply click the <strong>"Connect Tsheets"</strong> button, provide your login information and you will be set to start tracking time today! If you do not have a Tsheets account <a href="https://www.tsheets.com">Click Here</a> to get signed up today.</p>
            </div>
            
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import TimesheetCard from '@/tsheets/TimesheetCard.vue'
import ConnectButton from '@/tsheets/ConnectButton.vue'

export default {
    name: 'Timesheet',
    data () {
        return {
            
        }
    },
    components: {
        TimesheetCard,
        ConnectButton
    },
    computed: {
        ...mapGetters(['successAlert', 'errorAlert', 'errorMsgAlert', 'timesheet']),
        tsheetsAccessToken() {
            return localStorage.getItem('tsheets_access_token')
        }
    },
    methods: {
        closeTimesheet() {
            this.$store.commit('toggleTimesheet')
        }
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

    .timesheet {
        position: fixed;
        top: 0;
        bottom: 0;
        right: 0;
        z-index: 101; /* Behind the navbar */
        padding: 52px 0 0; /* Height of navbar */
        box-shadow: -5px 0px 10px 1px rgba(0, 0, 0, 0.555);
        width: 500px!important;
    }

    .timesheet-body {
        width: 100%;
    }

    .timesheet-sticky {
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
        .timesheet-sticky {
            position: -webkit-sticky;
            position: sticky;
        }
    }



    .timesheet .nav-link {
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

    .timesheet-close-btn {
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


    .timesheet-heading {
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

