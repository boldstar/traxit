<template>
    <div class="taxreturns-wrapper">
        <div class="taxreturns-overview">
            <div class="taxreturns-body">
                <div class="taxreturns-sidebar">
                    <ul class="taxreturns-sidebar-body">
                        <li class="taxreturns-sidebar-item" @click="changeItem('Pending')">
                            <div class="taxreturns-sidebar-item-body">
                                <span>Pending</span>
                                <span class="badge badge-primary">10</span>
                            </div>
                        </li>
                        <li class="taxreturns-sidebar-item" @click="changeItem('Pending')">
                            <div class="taxreturns-sidebar-item-body">
                                <span>Past Due</span>
                                <span class="badge badge-primary">15</span>
                            </div>
                        </li>
                        <li class="taxreturns-sidebar-item" @click="changeItem('Pending')">
                            <div class="taxreturns-sidebar-item-body">
                                <span>Due Date</span>
                                <span class="badge badge-primary">200</span>
                            </div>
                        </li>
                        <li class="taxreturns-sidebar-item" @click="changeItem('Pending')">
                            <div class="taxreturns-sidebar-item-body">
                                <span>Priority</span>
                                <span class="badge badge-primary">5</span>
                            </div>
                        </li>
                        <li class="taxreturns-sidebar-item" @click="changeItem('Pending')">
                            <div class="taxreturns-sidebar-item-body">
                                <span>Return Type</span>
                                <span class="badge badge-primary">400</span>
                            </div>
                        </li>
                        <li class="taxreturns-sidebar-item" @click="changeItem('Pending')">
                            <div class="taxreturns-sidebar-item-body">
                                <span>Difficulty</span>
                                <span class="badge badge-primary">600</span>
                            </div>
                        </li>
                        <li class="taxreturns-sidebar-item" @click="changeItem('Pending')">
                            <div class="taxreturns-sidebar-item-body">
                                <span>Archived</span>
                                <span class="badge badge-primary">200</span>
                            </div>
                        </li>
                        <li class="taxreturns-sidebar-item" @click="changeItem('Pending')">
                            <div class="taxreturns-sidebar-item-body">
                                <span>Complete</span>
                                <span class="badge badge-primary">200</span>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="taxreturns-content">
                    <TaxReturnsList :engagements="allEngagements" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Spinner from '@/components/loaders/Spinner.vue'
import TaxReturnsList from '@/components/firm/TaxReturnsList.vue'
export default {
    name: 'TaxReturns',
    props: ['allEngagements'],
    components: {Spinner,TaxReturnsList},
    methods: {
        changeItem(item) {

        }
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
                    max-width: 400px;
                    margin-right: 30px;
                    box-shadow: 0 0 5px 0 rgba(0,0,0,.25px);
                    border-radius: 5px;
                    align-self: flex-start;

                    ul {
                        list-style: none;
                        margin: 0;
                        padding: 15px;

                        li {
                            padding: 10px;
                            border-radius: 5px;
                            cursor: pointer;
                            margin-bottom: 5px;

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
                    }
                }

                .taxreturns-content {
                    flex-grow: 1;
                    margin-left: 30px;
                }
            }
        }
    }
</style>