<template>
    <nav class="bg-light timesheet">
        <div class="timesheet-sticky d-flex flex-column">
            <div class="d-flex justify-content-between px-3">
                <span class="align-self-center font-weight-bold">Timesheet | 01/01/2019 10:30:33</span>
                <button @click="closeTimesheet" class="btn btn-link font-weight-bold timesheet-close-btn">X</button>
            </div>
            <div class="timesheet-body">
                <table class="table table-bordered mb-0">
                    <thead>
                        <tr>
                            <th>Current</th>
                            <th>Today</th>
                            <th>Week</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>5:00 HR</td>
                            <td>5:00 HR</td>
                            <td>15:00 HR</td>
                        </tr>
                    </tbody>
                </table>
                <div class="card-footer text-right">
                    <button class="btn btn-sm btn-danger">Clock Out</button>
                </div>
            </div>
            <div class="timesheet-in-progress card m-3 shadow-sm">
                <div class="card-header text-left">
                    <span class="font-weight-bold">Currently Working On</span>
                </div>
                <div class="card-body">
                    Details of what is in progress
                </div>
                <div class="card-footer">
                    <button class=" btn btn-sm btn-secondary">Stop</button>
                </div>
            </div>
            <div class="timesheet-body">
                <div class="card-header text-left">
                    <span class="font-weight-bold">Team</span>
                </div>
                <table class="table table-bordered mb-0">
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Time</th>
                            <th>Week</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>John Doe</td>
                            <td>5:00 HR</td>
                            <td>15:00 HR</td>
                        </tr>
                        <tr>
                            <td>Jane Go</td>
                            <td>8:00 HR</td>
                            <td>20:00 HR</td>
                        </tr>
                        <tr>
                            <td>David John</td>
                            <td>5:00 HR</td>
                            <td>10:00 HR</td>
                        </tr>
                    </tbody>
                </table>
                <div class="card-footer text-right">
                    <button class="btn btn-sm btn-danger">Clock Out</button>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
    name: 'Timesheet',
    data () {
        return {
        isActive: false,
        role: localStorage.getItem('role')
        }
    },
    computed: {
        ...mapGetters(['successAlert', 'errorAlert', 'errorMsgAlert', 'engagementFilter'])
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

