<template>
   <div class="teamoverview-wrapper">
        <div class="teamoverview-overview">
            <div class="teamoverview-body"  v-if="allEngagements && allEngagements.length > 0">
                <div class="teamoverview-sidebar">
                    <div class="teamoverview-sidebar-header">
                        <span>Team Members</span>
                    </div>
                    <ul class="teamoverview-sidebar-body">
                        <li class="teamoverview-sidebar-hint">
                            <span>Choose team member to view in progress and assigned tasks or today's history</span>
                        </li>
                        <li class="teamoverview-sidebar-item" v-for="user in filteredUsers" :key="user.id" :class="{'selected-item': selectedUser.id == user.id}" @click="selectedUser = user">
                            <div class="teamoverview-sidebar-item-body">
                                <span>{{user.name}}</span>
                                <span class="badge badge-primary">{{ tasksLength(user.name) }}</span>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="teamoverview-content">
                   <SelectedUserTasks
                    :tasks="currentTasks"
                    :user="selectedUser"
                    :workflows="allWorkflows"
                   />
                </div>
            </div>
            <Spinner v-else/>
        </div>
    </div>
</template>

<script>
import Spinner from '@/components/loaders/Spinner.vue'
import SelectedUserTasks from '@/components/firm/SelectedUserTasks.vue'
export default {
    name: 'TeamOverview',
    props: ['allEngagements', 'allWorkflows', 'users'],
    components: {Spinner, SelectedUserTasks},
    data() {
        return {
            itemFilter: null,
            selectedUser: null
        }
    },
    computed: {
        filteredUsers() {
            const users = this.users.filter(user => user.name != 'Admin')
            if(users && users.length > 0) {
                this.selectedUser = users[0]
            }
            return users
        },
        currentTasks() {
            return this.allEngagements.filter(eng => eng.assigned_to == this.selectedUser.name)
        }
    },
    methods: {
        tasksLength(user) {
            return this.allEngagements.filter(eng => eng.assigned_to == user).length
        }
    }
}
</script>

<style lang="scss">
    .teamoverview-wrapper {
        width: 100%;
        height: 100%;
        max-height: calc(100vh - 200px);
        min-height: calc(100vh - 200px);

        .teamoverview-overview { 
            margin-top: 20px;

            .teamoverview-body {
                display: grid;
                grid-template-columns: 1fr 3fr;
                width: 100%;
                width: 100%;

                .teamoverview-sidebar {
                    width: 100%;
                    box-shadow: 0 0 5px 0 rgba(0,0,0,.25px);
                    border-radius: 5px;
                    align-self: flex-start;

                    .teamoverview-sidebar-header {
                        background: rgb(236, 236, 236);
                        padding: 10px 0;


                        span {
                            font-weight: bold;
                            font-size: 1.2rem;
                        }
                    }

                    ul {
                        list-style: none;
                        margin: 0;
                        padding: 15px;

                        .teamoverview-sidebar-hint {
                            padding-top: 0;
                            font-weight: bold;
                            color: rgb(148, 148, 148);
                            font-size: .9rem;
                        }

                        li {
                            padding: 13px;
                            border-radius: 5px;
                            cursor: pointer;

                            .teamoverview-sidebar-item-body {
                                display: flex;
                                justify-content: space-between;
                                width: 100%;

                                span {
                                    font-weight: bold;
                                }

                                .badge {
                                    align-self: center;
                                    padding: 5px 8px;
                                }
                            }

                            &:hover {
                                background: rgb(235, 235, 235);
                            }
                        }

                        .selected-item {
                            box-shadow: 0 0 5px 0 rgba(0,0,0,.25px);
                        }
                    }
                }

                .teamoverview-content {
                    flex-grow: 1;
                    margin-left: 50px;
                }
            }
        }
    }
</style>