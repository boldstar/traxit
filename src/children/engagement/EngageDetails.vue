<template>
    <div class="w-100 text-left engage-details">
        <h4 class="mb-0">Engagement Details</h4>
        <span class="title-description text-secondary">A general overview for the details of the engagement</span>

        <div class="card px-0 mt-3 mb-5 shadow-sm w-100">
            <div class="card-body p-2">
                <ul class="p-0 m-0">
                    <li class="d-flex details-list-item p-2 pt-0">
                        <span>Name:</span>
                        <span class="font-weight-bold">{{ engagement.name}}</span>
                    </li>
                    <li class="d-flex details-list-item p-2" v-if="engagement.type != 'bookkeeping'">
                        <span>Fee:</span>
                        <span class="font-weight-bold">{{ amount(engagement.fee) }}</span>
                    </li>
                    <li class="d-flex details-list-item p-2" v-if="engagement.type == 'bookkeeping'">
                        <span>Time Period:</span>
                        <span class="font-weight-bold">{{ engagement.title}}</span>
                    </li>
                    <li class="d-flex details-list-item p-2">
                        <span>Subject:</span>
                        <span class="font-weight-bold">{{ engagement.description}}</span>
                    </li>
                    <li class="d-flex details-list-item p-2" v-if="engagement.type == 'taxreturn'">
                        <span>Return Type:</span>
                        <span class="font-weight-bold">{{ engagement.return_type}}</span>
                    </li>
                    <li class="d-flex details-list-item p-2">
                        <span>Year:</span>
                        <span class="font-weight-bold">{{ engagement.year}}</span>
                    </li>
                    <li class="d-flex details-list-item p-2" v-if="engagement.done == false">
                        <span>Currently Assigned:</span>
                        <span class="font-weight-bold">{{ engagement.assigned_to}}</span>
                    </li>
                    <li class="d-flex details-list-item p-2">
                        <span>Status:</span>
                        <span class="font-weight-bold">{{ engagement.status}}</span>
                    </li>
                    <li class="d-flex details-list-item p-2">
                        <span>Due Date:</span>
                        <span class="font-weight-bold">{{ engagement.estimated_date | formatDate }}</span>
                    </li>
                    <li class="d-flex details-list-item p-2">
                        <span>Paid:</span>
                        <span class="font-weight-bold">{{ paid(engagement.paid) }}</span>
                    </li>
                </ul>
                <div class="d-flex mt-3 ml-2 mb-1">
                    <button class="btn btn-sm btn-secondary font-weight-bold mr-3" type="button">Edit Details</button>
                </div>
            </div>
        </div>

        <h4 class="mb-0">Engagement Status</h4>
        <span class="title-description text-secondary">The current status of the engagement</span>
        <div class="card px-0 mt-3 mb-5 shadow-sm w-100">
            <div class="card-body p-2">
                <div class="p-2">
                    <h5 class="mb-0">Current Status: {{engagement.status}}</h5>
                    <span class="font-weight-bold text-secondary">Last updated: {{engagement.updated_at | formatDate}}</span>
                    <EngagementDoughnut class="mt-3" :percentage="percentage" />
                </div>
                <div class="d-flex mt-3 ml-2 mb-1">
                    <button class="btn btn-sm btn-secondary font-weight-bold" type="button">Update Status</button>
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
                <div class="d-flex mt-3 ml-2 mb-1">
                    <button class="btn btn-sm btn-danger font-weight-bold" type="button">Delete Engagement</button>
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
    props: ['engagement'],
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
        ...mapGetters(['successAlert', 'processing', 'errorMsgAlert', 'engagementWorkflow']),
        percentage() {
            const statuses = this.engagementWorkflow.statuses
            const percentage = this.calcPercent(statuses.length)
            return percentage
        },
        currentWidth() {
            const status = this.engagement.status
            const statuses = this.engagementWorkflow.statuses
            const index = statuses.findIndex(s => s.status == status)

            return (index + 1) * this.percentage
        }
    },
    methods: {
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
        }
    }
}
</script>

<style lang="scss">

    .details-list-item {
        max-width: 400px;
        width: 100%;
        justify-content: space-between;
    }
</style>
