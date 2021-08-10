<template>
    <div class="w-100 text-left engage-details">
        <h4 class="mb-0">Engagement Details</h4>
        <span class="title-description text-secondary">A general overview for the details of the engagement</span>

        <div class="card px-0 mt-3 mb-5 shadow-sm w-100">
            <div class="card-body p-0 py-2">
                <div class="px-3 pt-2 pb-3 border-bottom">
                    <h5 class="mb-0">General Information</h5>
                </div>
                <ul class="m-0 p-0 details-list">
                    <li class="details-list-item p-2 pt-0">
                        <div>
                            <span>Name:</span>
                            <span class="font-weight-bold">{{ engagement.name}}</span>
                        </div>
                    </li>
                    <li class="details-list-item p-2" v-if="engagement.type != 'bookkeeping'">
                        <div>
                            <span>Prep Fee:</span>
                            <span class="font-weight-bold">{{ amount(engagement.fee) }}</span>
                        </div>
                    </li>
                    <li class="details-list-item p-2" v-if="engagement.type == 'bookkeeping'">
                        <div>
                            <span>Time Period:</span>
                            <span class="font-weight-bold">{{ engagement.title}}</span>
                        </div>
                    </li>
                    <li class="details-list-item p-2">
                        <div>
                            <span>Subject:</span>
                            <span class="font-weight-bold">{{ engagement.description}}</span>
                        </div>
                    </li>
                    <li class="details-list-item p-2" v-if="engagement.type == 'taxreturn'">
                        <div>
                            <span>Return Type:</span>
                            <span class="font-weight-bold">{{ engagement.return_type}}</span>
                        </div>
                    </li>
                    <li class="details-list-item p-2">
                        <div>
                            <span>Year:</span>
                            <span class="font-weight-bold">{{ engagement.year}}</span>
                        </div>
                    </li>
                    <li class="details-list-item p-2" v-if="engagement.done == false">
                        <div>
                            <span>Currently Assigned:</span>
                            <span class="font-weight-bold">{{ engagement.assigned_to}}</span>
                        </div>
                    </li>
                    <li class="details-list-item p-2">
                        <div>
                            <span>Status:</span>
                            <span class="font-weight-bold">{{ engagement.status}}</span>
                        </div>
                    </li>
                    <li class="details-list-item p-2">
                        <div>
                            <span>Due Date:</span>
                            <span class="font-weight-bold" v-if="engagement.estimated_date">{{ engagement.estimated_date | formatDate }}</span>
                            <span class="font-weight-bold" v-else>N/A</span>
                        </div>
                    </li>
                    <li class="details-list-item p-2">
                        <div>
                            <span>Paid:</span>
                            <span class="font-weight-bold">{{ paid(engagement.paid) }}</span>
                        </div>
                    </li>
                </ul>
                <div class="d-flex mt-3 ml-3 mb-2">
                    <router-link v-if="!engagement.done" class="engage-edit-btn font-weight-bold mr-3" :to="'/engagement/' +engagement.id+ '/edit'">Edit Info</router-link>
                </div>
            </div>
        </div>

        <h4 class="mb-0">Engagement Status</h4>
        <span class="title-description text-secondary">The current status of the engagement</span>

        <div class="d-flex">
            <div class="card px-0 mt-3 mb-5 shadow-sm w-100">
                <div class="card-body p-0 py-2">
                    <div class="px-3 pt-2 pb-3 border-bottom">
                        <h5 class="mb-0">Current Status: {{engagement.status}}</h5>
                        <span class="font-weight-bold text-secondary">Last updated: {{engagement.updated_at | formatDate}}</span>
                    </div>
                    <ul class="m-0 p-0 details-list">
                        <li class="details-list-item p-2">
                            <div>
                                <span>Workflow:</span>
                                <span class="font-weight-bold">{{ workflow.workflow }}</span>
                            </div>
                        </li>
                        <li class="details-list-item p-2 pt-0">
                            <div>
                                <span>Current Status:</span>
                                <span class="font-weight-bold">{{ engagement.status}}</span>
                            </div>
                        </li>
                        <li class="details-list-item p-2">
                            <div>
                                <span>Currently Assigned To:</span>
                                <span class="font-weight-bold">{{ engagement.assigned_to }}</span>
                            </div>
                        </li>
                        <li class="details-list-item p-2">
                            <div>
                                <span>Last Updated:</span>
                                <span class="font-weight-bold">{{ engagement.updated_at | formatDate }}</span>
                            </div>
                        </li>
                    </ul>
                    <div class="d-flex mt-3 ml-3 mb-2">
                        <button class="engage-edit-btn font-weight-bold" type="button" @click="showStatusModal" v-if="!engagement.done">Update Status</button>
                    </div>
                </div>
            </div>

            <div class="card px-0 mt-3 mb-5 shadow-sm w-100 ml-5">
                <EngagementDoughnut :percentage="currentWidth" />
            </div>
        </div>

        <h4 class="mb-0">Call History</h4>
        <span class="title-description text-secondary">The history of the contact calling for status update</span>

        <div class="d-flex">
            <div class="card px-0 mt-3 mb-5 shadow-sm w-100">
                <div class="card-body p-0 py-2">
                    <div class="px-3 pt-2 pb-3 border-bottom">
                        <h5 class="mb-0">Last Called: {{callListItem.last_called_date | formatDate}}</h5>
                        <span class="font-weight-bold text-secondary">Total Calls: {{callListItem.total_calls}}</span>
                    </div>
                    <ul class="m-0 p-0 details-list">
                        <li class="details-list-item p-2 pb-0">
                            <div class="d-flex flex-column">
                                <span class="py-2">First Called: <strong>{{callListItem.first_called_date | formatDate}}</strong></span>
                                <span>Comments: <button class="btn btn-link p-0 font-weight-bold comments-btn" @click="addComments"> Add/Edit</button></span> 
                                <div class="font-weight-bold" v-html="callListItem.comments" v-if="callListItem.comments">
                                </div>
                                <div v-else class="font-weight-bold w-100">
                                     <p class="text-nowrap">There are currently no comments 
                                    </p>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div class="d-flex ml-3 mb-2">
                        <button class="engage-edit-btn font-weight-bold" type="button" @click="updateLastCalled" v-if="callListItem">Update Last Called</button>
                        <button class="engage-edit-btn font-weight-bold ml-3" type="button" @click="removeFromCallList(callListItem.id)" v-if="callListItem">Remove From Call List</button>
                        <button class="engage-edit-btn bg-danger text-white font-weight-bold ml-3" type="button" @click="deleteCallListHistory(callListItem.id)" v-if="callListItem">Delete History</button>
                        <button class="engage-edit-btn font-weight-bold" type="button" @click="addToCallList" v-else>Add To Call List</button>
                    </div>
                </div>
            </div>
        </div>

        <h4 class="mb-0">Danger Zone</h4>
        <span class="title-description text-secondary">Action taken past this point is irreversable</span>
        <div class="card px-0 mt-3 mb-5 shadow-sm w-100">
            <div class="card-body p-2">
                <div class="p-2">
                    <h5 class="mb-0">Delete Engagement</h5>
                    <span class="font-weight-bold text-secondary">Once deleted it cannot be undone</span>
                </div>
                <div class="d-flex mt-3 ml-2 mb-1" v-if="$can('delete', engagement)">
                    <button class="btn btn-sm btn-danger font-weight-bold" type="button" @click="deleteEngagement">Delete Engagement</button>
                </div>
                <div v-else>
                    <span class="font-weight-bold m-3 text-danger">Only Admins can delete this engagement.</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Alert from '@/components/alerts/Alert.vue'
import bModal from 'bootstrap-vue/es/components/modal/modal'
import bModalDirective from 'bootstrap-vue/es/directives/modal/modal'
import Spinner from '@/components/loaders/Spinner.vue'
import NoteModal from '@/components/engagement/NoteModal.vue'
import EditNoteModal from '@/components/engagement/EditNoteModal.vue'
import EngagementDoughnut from '@/components/engagement/EngagementDoughnut.vue'

export default {
    name: 'EngageDetails',
    props: ['engagement', 'workflow', 'callListItem'],
    components:{
        'b-modal': bModal,
        Alert,
        Spinner,
        NoteModal,
        EditNoteModal,
        EngagementDoughnut
    },
    directives: {
        'b-modal': bModalDirective
    },
    computed: {
        ...mapGetters(['successAlert', 'processing', 'errorMsgAlert', 'engagementWorkflow', 'engagementStatusModal']),
        percentage() {
            const statuses = this.engagementWorkflow.statuses
            const percentage = this.calcPercent(statuses.length)
            return percentage
        },
        currentWidth() {
            if(this.engagement.done) return 100
            const status = this.engagement.status
            const statuses = this.engagementWorkflow.statuses
            const index = statuses.findIndex(s => s.status == status)

            return Math.round((index + 1) * this.percentage)
        }
    },
    methods: {
        deleteEngagement() {
            this.$emit('delete-engagement')
        },
        fixCasing(string) {
            if(string == 'taxreturn') {
                const newString = string.replace("taxreturn", "Tax Return")
                return newString
            } else {
                return string
            }
        },
        amount(fee) {
            if(fee == null || fee == '') {
                return '$0.00'
            } else {
                return '$' + fee
            }
        },
        removeCommas(fee) {
            const commaless = fee.replace(/[, ]+/g, " ").trim();
            return commaless
        },
            calcPercent(statuses) {
            return 100/statuses
        },
        paid(state) {
            if(state) {
                return 'Yes'
            } else {
                return 'No'
            }
        },
        showStatusModal() {
            this.$store.commit('showStatusModal', true)
        },
        addToCallList() {
            this.$store.dispatch('addToCallList', {
                engagement_id: this.$route.params.id,
                engagement_name: this.engagement.name,
                current_status: this.engagement.status,
                first_called_date: new Date(),
                last_called_date: new Date(),
                total_calls: 1
            })
        },
        updateLastCalled() {
            this.$store.dispatch('updateLastCalled', {
                id: this.callListItem.id,
                last_called_date: new Date(),
                total_calls: this.callListItem.total_calls + 1
            })
        },
        removeFromCallList(id) {
            this.$store.dispatch('removeFromCallList', id)
        },
        addComments() {

        },
        deleteCallListHistory(id) {
            this.$store.dispatch('deleteCallHistoryItem', id)
        }
    }
}
</script>

<style lang="scss">

    .details-list {
        list-style: none;
        .details-list-item {
            div {
            padding: 5px 8px;
                display: flex;
                max-width: 400px;
                width: 100%;
                justify-content: space-between;
            }

            &:nth-of-type(even) {
                background: rgb(243, 243, 243);
            }
        }
    }

    .engage-edit-btn {
        background: rgb(228, 228, 228);
        border-radius: 5px;
        border: none;
        font-weight: bold;
        padding: 5px 15px;
        color: black;
        text-decoration: none;

        &:hover {
            text-decoration: none;
            background: rgb(218, 218, 218);
            color: black;
        }
    }

    .comments-btn {
        font-size: .9rem;
    }
</style>
