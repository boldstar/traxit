<template>
    <div class="taxreturns-wrapper">
        <div class="taxreturns-overview">
            <div class="taxreturns-body"  v-if="allWorkflows && allWorkflows.length > 0">
                <div class="taxreturns-sidebar" v-if="allWorkflows && allWorkflows.length > 0">
                    <ul class="taxreturns-sidebar-body">
                        <li class="taxreturns-sidebar-item" :class="{'selected-item': itemFilter == 'Pending'}" @click="changeItem('Pending')">
                            <div class="taxreturns-sidebar-item-body">
                                <span>Pending</span>
                                <span class="badge badge-primary">{{pending.length}}</span>
                            </div>
                        </li>
                        <li class="taxreturns-sidebar-item" :class="{'selected-item': itemFilter == 'Past Due'}" @click="changeItem('Past Due')">
                            <div class="taxreturns-sidebar-item-body">
                                <span>Past Due</span>
                                <span class="badge badge-primary">{{pastdue.length}}</span>
                            </div>
                        </li>
                        <li class="taxreturns-sidebar-item" :class="{'selected-item': itemFilter == 'Archived'}" @click="changeItem('Archived')">
                            <div class="taxreturns-sidebar-item-body">
                                <span>Archived</span>
                                <span class="badge badge-primary">{{archived.length}}</span>
                            </div>
                        </li>
                        <li class="taxreturns-sidebar-item" :class="{'selected-item': itemFilter == 'Complete'}" @click="changeItem('Complete')">
                            <div class="taxreturns-sidebar-item-body">
                                <span>Complete</span>
                                <span class="badge badge-primary">{{completed.length}}</span>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="taxreturns-content">
                    <TaxReturnsList 
                        :engagements="allEngagements" 
                        :workflows="allWorkflows" 
                        :filter="itemFilter"
                    />
                </div>
            </div>
            <Spinner v-else/>
        </div>
    </div>
</template>

<script>
import Spinner from '@/components/loaders/Spinner.vue'
import TaxReturnsList from '@/components/firm/TaxReturnsList.vue'
export default {
    name: 'TaxReturns',
    props: ['allEngagements', 'allWorkflows'],
    components: {Spinner,TaxReturnsList},
    data() {
        return {
            itemFilter: null
        }
    },
    computed: {
        pending() {
            const workflowStatuses = this.allWorkflows.map(worklfow => worklfow.statuses)
            const statuses = workflowStatuses.reduce((acc, statuses) => {
                statuses.forEach(status => {
                    acc.push(status)
                })
                acc.push(status)
                return acc
            }, [])

            const result = statuses.filter((v, i) => statuses.indexOf(v) === i).filter(s => s.state == 'Pending')
            
            return this.allEngagements.filter(eng => {
                const workflows = result.map(r => r.workflow_id)
                const states = result.map(r => r.status)
                if(workflows.includes(eng.workflow_id) && states.includes(eng.status)) {
                    return eng
                }
            })
        },
        pastdue() {
            return this.allEngagements.filter(eng => eng.type == 'taxreturn').filter(eng => {
                if(!eng.done && eng.estimated_date && new Date(eng.estimated_date) < new Date()) {
                    return eng
                }
            })
        },
        archived() {
            return this.allEngagements.filter(eng => eng.type == 'taxreturn').filter(eng => eng.archived)
        },
        completed() {
            return this.allEngagements.filter(eng => eng.type == 'taxreturn' && eng.done)
        }
    },
    methods: {
        changeItem(item) {
            this.itemFilter = item
        }
    },
    created() {
        this.itemFilter = 'Pending'
    }
}
</script>

<style lang="scss">
    .taxreturns-wrapper {
        width: 100%;
        height: 100%;
        max-height: calc(100vh - 200px);
        min-height: calc(100vh - 200px);

        .taxreturns-overview { 
            margin-top: 20px;

            .taxreturns-body {
                display: grid;
                grid-template-columns: 1fr 3fr;
                width: 100%;
                width: 100%;

                .taxreturns-sidebar {
                    width: 100%;
                    box-shadow: 0 0 5px 0 rgba(0,0,0,.25px);
                    border-radius: 5px;
                    align-self: flex-start;

                    ul {
                        list-style: none;
                        margin: 0;
                        padding: 15px;

                        li {
                            padding: 13px;
                            border-radius: 5px;
                            cursor: pointer;

                            .taxreturns-sidebar-item-body {
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

                .taxreturns-content {
                    flex-grow: 1;
                    margin-left: 50px;
                }
            }
        }
    }
</style>