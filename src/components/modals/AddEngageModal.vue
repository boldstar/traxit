<template>
    <b-modal v-model="modal" hide-footer title='Add Engagement'>
        <div class="custom-input-group">
            <label for="workflow">Workflow<span class="text-danger">*</span></label>
            <select id="workflow" v-model="engagement.workflow_id" :class="{'error': error.includes('workflow_id')}" @change="removeError('workflow_id')">
                <option disabled>{{option}}</option>
                <option v-for="(workflow, index) in workflows" :key="index" :value="workflow.id">{{workflow.workflow}}</option>
            </select>
        </div>
        <div class="custom-input-group">
            <label for="category">Engagement Category<span class="text-danger">*</span></label>
            <select id="category" v-model="engagement.category" :class="{'error': error.includes('category')}" @change="removeError('category')">
                <option disabled>{{option}}</option>
                <option v-for="(category, index) in categories" :key="index" :value="category">{{category}}</option>
            </select>
        </div>
        <div class="custom-input-group">
            <label for="year">Tax Year<span class="text-danger">*</span></label>
            <select id="year" v-model="engagement.year" :class="{'error': error.includes('year')}" @change="removeError('year')">
                <option disabled>{{option}}</option>
                <option v-for="(year, index) in years" :key="index" :value="year">{{year}}</option>
            </select>
        </div>
        <div class="custom-input-group" v-if="engagementType == 'Bookkeeping'">
            <label for="timespan">Timespan<span class="text-danger">*</span></label>
             <select  id="timespan" v-model="timespan" name="timespan" @change="setTimespan($event)">
                <option disabled>{{option}}</option>
                <option v-for="(option, index) in timespans" :key="index" :value="option">{{ option }}</option>
            </select>
        </div>
        <div class="custom-input-group" v-if="engagementType == 'Bookkeeping'">
            <label for="time">Month Of<span class="text-danger">*</span></label>
            <select  id="time" v-model="engagement.title" name="Title" :class="{'error': error.includes('title')}" @change="removeError('title')">
                <option disabled>{{option}}</option>
                <option v-for="(month, index) in monthly" :key="index" :value="month">{{ month }}</option>
            </select>
        </div>
        <div class="custom-input-group" v-if="engagementType == 'Bookkeeping'">
            <label for="option">Quarter Of<span class="text-danger">*</span></label>
            <select id="type" v-model="engagement.title" name="Title" :class="{'error': error.includes('title')}" @change="removeError('title')">
                <option disabled>{{option}}</option>
                <option v-for="(quarter, index) in quarterly" :key="index" :value="quarter">{{ quarter }}</option>
            </select>
        </div>
        <div class="custom-input-group">
            <label for="contact">Contact<span class="text-danger">*</span></label>
            <select id="contact" v-model="engagement.client_id" :class="{'error': error.includes('client_id')}" @change="removeError('client_id')">
                <option disabled>{{option}}</option>
                <option v-for="(client, index) in sortedClients" :key="index" :value="client.id">{{client.value}}</option>
            </select>
        </div>
        <div class="custom-input-group" v-if="engagement.category == 'Business'">
            <label for="business">Business<span class="text-danger">*</span></label>
            <select id="business" v-model="engagement.name" :class="{'error': error.includes('name') && engagement.category == 'Business'}" @change="removeError('name')">
                <option disabled>{{option}}</option>
                <option v-for="(business, index) in clientBusinesses" :key="index" :value="business">{{business}}</option>
            </select>
        </div>
        <div class="custom-input-group" v-if="engagementType && engagementType != 'Bookkeeping'">
            <label for="return_type">Return Type<span class="text-danger">*</span></label>
            <select id="return_type" v-model="engagement.return_type" :class="{'error': error.includes('return_type')}" @change="removeError('return_type')">
                <option disabled>{{option}}</option>
                <option v-for="(item, index) in return_types" :key="index" :value="item.return_type">{{item.return_type}}</option>
            </select>
        </div>
        <div class="custom-input-group">
            <label for="assign_to">Assign To<span class="text-danger">*</span></label>
            <select id="assign_to" v-model="engagement.assigned_to" :class="{'error': error.includes('assigned_to')}" @change="removeError('assigned_to')">
                <option disabled>{{option}}</option>
                <option v-for="(user, index) in filteredUsers" :key="index" :value="user.id">{{user.name}}</option>
            </select>
        </div>
        <div class="custom-input-group" v-if="engagement.workflow_id && engagement.workflow_id != option">
            <label for="status">Status<span class="text-danger">*</span></label>
              <select id="status" v-model="engagement.status" :class="{'error': error.includes('status')}" @change="removeError('status')">
                <option disabled>{{option}}</option>
              <option v-for="(status, index) in statuses" :key="index" :value="status">
                {{ status }}
              </option>
            </select>
        </div>
        <div class="custom-input-group">
            <label for="priority">Priority</label>
            <select id="priority" v-model="engagement.priority">
                <option disabled>{{option}}</option>
                <option v-for="(level, index) in priority_levels" :key="index" :value="level.level">
                {{ level.value }}
                </option>
            </select>
        </div>
        <div class="custom-input-group">
            <label for="difficulty">Difficulty</label>
            <select id="difficulty" v-model="engagement.difficulty">
                <option disabled>{{option}}</option>
                <option v-for="(level, index) in difficulty_levels" :key="index" :value="level.level">
                {{ level.value }}
                </option>
            </select>
        </div>
        <div class="custom-input-group">
            <label for="due_date">Due Date</label>
            <v-date-picker
                mode='single'
                v-model='engagement.estimated_date'
                id="due_date"
            >
            </v-date-picker>
        </div>
        <div class="d-flex justify-content-between">
            <button class="btn btn-sm btn-primary font-weight-bold" type="button" @click="addNewEngagement" :disabled="processing">
                <span v-if="!processing">Add</span>
                <span v-if="processing">Adding...</span>
            </button>
            <button class="btn btn-sm btn-secondary mr-2 font-weight-bold" type="button" @click="closeModal">Cancel</button>
        </div>
      </b-modal>
</template>

<script>
    import bModal from 'bootstrap-vue/es/components/modal/modal'
    import bModalDirective from 'bootstrap-vue/es/directives/modal/modal'
    import { mapGetters, mapActions } from 'vuex'
    import levels from '../../plugins/levels'
export default {
    name: 'AddEngageModal',
    props: ['workflows', 'users', 'clients', 'return_types', 'years'],
    data() {
      return {
        modal: true,
        monthRange: false,
        quarterRange: false,
        annualRange: false,
        monthChecked: false,
        quarterChecked: false,
        annualChecked: false,
        nothingChecked: false,
        difficulty_levels: levels.difficulty_levels,
        priority_levels: levels.priority_levels,
        option: 'Choose...',
        empty: 'Please select workflow first...',
        categories:['Personal', 'Business'],
        monthly: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        timespans: ['Monthly', 'Quarterly', 'Annual'],
        quarterly: ['Jan-Mar', 'Apr-Jun', 'Jul-Sep', 'Oct-Dec'],
        required: ['title', 'year', 'category', 'client_id', 'workflow_id', 'type', 'assigned_to', 'status', 'return_type', 'name'],
        timespan: null,
        error: [],
        engagement: {
            title: null,
            year: null,
            category: null,
            client_id: null,
            name: null,
            workflow_id: null,
            return_type: null,
            assigned_to: null,
            status: null,
            difficulty: null,
            priority: null,
            estimated_date: null,
            type: null
        }
      }
    },
    components:{
        'b-modal': bModal,
    },
    directives: {
        'b-modal': bModalDirective
    },
    computed: {
      ...mapGetters(['processing']),
        statuses() {
            return this.workflow.statuses.reduce((acc, status) => {
                acc.push(status.status)
                return acc
            }, [])
        },
        engagementType() {
            if(this.engagement.workflow_id && this.engagement.workflow_id != this.option) {
                const type = this.workflows.filter(w => w.id === this.engagement.workflow_id)[0].engagement_type
                this.engagement.type = type
                return type
            }
        },
        engagementName() {
            if(this.engagement.category && this.engagement.client_id && this.engagement.category != this.option && this.engagement.client_id != this.option) {
                if(this.engagement.category == 'Business') {
                    return this.engagement.name
                } else {
                    const name = this.sortedClients.filter(c => c.id === this.engagement.client_id)[0].value
                    this.engagement.name = name
                    return name
                }
            }
        },
        filteredUsers() {
            return this.users.filter(user => user.name != 'Admin')
        },
        clientBusinesses() {
            if(this.engagement.client_id && this.engagement.client_id != this.option) {
                const client = this.clients.filter(client => client.id === this.engagement.client_id)
                const businesses = client.map(c => c.businesses)
                const clientBusinesses = businesses.flat();
                return clientBusinesses.reduce((acc, bus) => {
                    acc.push(bus.business_name)
                    return acc
                }, [])
            }
        },
        sortedClients() {
        const sorted = this.clients.sort((a,b) => {
            if(a.last_name < b.last_name) return -1;
            if(a.last_name > b.last_name)  return 1;
            return 0;
        })
        
        const reduced = sorted.reduce((acc, client) => {
            const name = client.spouse_first_name ? client.last_name +', ' + client.first_name + ' & ' + client.spouse_first_name : client.last_name +', ' + client.first_name
            
            acc.push({value: name, id: client.id})
            return acc
        }, [])

        return reduced
        },
        statuses() {
            if(this.engagement.workflow_id  && this.engagement.workflow_id != this.option) {
                return this.workflows.filter(w => w.id === this.engagement.workflow_id)[0].statuses.reduce((acc, status) => {
                    acc.push(status.status)
                    return acc
                }, [])
            }
        }
    },
    methods: {
      ...mapActions(['addEngagement']),
      closeModal() {
        this.$emit('close-modal')
      },
      setTimespan(event) {
        var timespan = event.target.value
        if(timespan == 'Monthly') {
            this.selectedMonthRange()
            return
        } else if(timespan == 'Quarterly') {
            this.selectedQuarterRange()
            return
        } else if(timespan == 'Annual') {
            this.selectedAnnualRange()
            return
        } else {
            return
        }
      },
      selectedMonthRange() {
        this.monthRange = !this.monthRange
        this.quarterRange = false
        this.annualRange = false
        this.quarterChecked = false
        this.annualChecked = false
        this.nothingChecked = false
      },
        selectedQuarterRange() {
        this.quarterRange = !this.quarterRange
        this.monthRange = false
        this.annualRange = false
        this.monthChecked = false
        this.annualChecked = false
        this.nothingChecked = false
      },
        selectedAnnualRange() {
        this.annualRange = !this.annualRange
        this.monthRange = false
        this.quarterRange = false
        this.monthChecked = false
        this.quarterChecked = false
        this.nothingChecked = false
      },
      addNewEngagement() {
        this.error = []
        if(this.validated()) {
            this.addEngagement({
                type: this.engagementType.replace(/[^a-zA-Z0-9 ]/g, "").replace(/\s+/g,'' ).replace(/^\s/,'').replace(/\s$/,'').toLowerCase(),
                title: this.engagementType == 'Bookkeeping' ? this.engagement.title : null,
                description: this.workflows.filter(w => w.id == this.engagement.workflow_id)[0].workflow,
                category: this.engagement.category,
                client_id: this.engagement.client_id,
                name: this.engagementName,
                workflow_id: this.engagement.workflow_id,
                return_type: this.engagement.return_type == this.option ? null : this.engagement.return_type,
                year: typeof(this.engagement.year) === 'string' ? this.engagement.year : JSON.stringify(this.engagement.year),
                assigned_to: this.engagement.assigned_to,
                status: this.engagement.status,
                difficulty: this.engagement.difficulty == this.option ? null : this.engagement.difficulty,
                priority: this.engagement.priority == this.option ? 0 : this.engagement.priority,
                estimated_date: this.engagement.estimated_date == this.option ? null : this.engagement.estimated_date,
                done: false
            }).then(() => {
                this.$store.dispatch('retrieveTasks')
                this.closeModal()
            })
        } else {
            return
        }
      },
      validated() {
            for(var i = 0; i < this.required.length; i++) {
                if(!this.engagement[this.required[i]] || this.engagement[this.required[i]] == this.option) {
                    this.error.push(this.required[i])
                }
            }
            if(this.error.length > 0) {
                if(this.error.includes('title') && this.engagementType != 'Bookkeeping' && this.error.length == 1) {
                    return true
                } else {
                    return false
                }
            } else {
                return true
            }
      },
      removeError(error) {
            const index = this.error.findIndex(e => e == error)
            this.error.splice(index, 1)
      }
    },
    created() {
        this.error = []
        this.timespan = this.option
        for(const key in this.engagement) {
            if(!key.includes('date')) {
                this.engagement[key] = this.option
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .error {
        border: 2px solid red!important;
    }
</style>
