<template>
  <div class="bookkeeping-wrapper">
        <Spinner v-if="loadingData" class="mx-auto" />
        <div class="bookkeeping-overview" v-else>
            <div class="bookkeeping-list">
                <input class="bookkeeping-list-input" type="text" placeholder="Filter By Name..." v-model="search">
                <div class="bookkeeping-list-tabs">
                    <button :class="{'selected': showActive}" @click="show('active')">Active</button>
                    <button :class="{'selected': showContacts}" @click="show('contacts')">Contact</button>
                    <button :class="{'selected': showBusinessList}" @click="show('businesses')">Business</button>
                </div>
                <ul class="bookkeeping-list-body">
                    <li v-if="activeAccounts && activeAccounts.length < 1 && showActive"><p class="font-weight-bold m-3">There are currently no accounts being tracked.</p><small>Start by selecting contact or business tab and choose the name of the account you would like to start tracking.</small></li>
                    <li v-if="activeAccounts && activeAccounts.length >= 1 && showActive"><p class="font-weight-bold">A list of active accounts being tracked.</p></li>
                    <li class="bookkeeping-list-item" :class="{'selected-item': account.id == selectedID && account.belongs_to == belongsToActive && account.name == selectedName}" v-for="(account, index) in activeAccounts" :key="'current' + `${index}`" v-show="showActive && activeAccounts.length > 0" @click="changeSelectedItem(account.id, account.belongs_to, account.name)">
                        <span>{{ account.name }}</span>
                    </li>
                    <li class="bookkeeping-list-item" :class="{'selected-item': client.id == selectedID}" v-for="(client, index) in filteredContacts" :key="'client' + `${index}`" v-show="showContacts" @click="changeSelectedItem(client.id, null, client.name)">
                        <span>{{ client.name }}</span>
                    </li>
                    <li class="bookkeeping-list-item" :class="{'selected-item': business.client_id == selectedID && business.name == selectedName}" v-for="(business, index) in filteredBusinessList" :key="index" v-show="showBusinessList" @click="changeSelectedItem(business.client_id, null, business.name)">
                        <span>{{ business.name }}</span>
                    </li>
                </ul>
            </div>
            <div class="selected-bookkeeping-list-account" v-if="!loadingData">
                <div class="text-left mb-2 d-flex flex-column">
                    <h5 class="mb-0">Bookkeeping Accounts</h5>
                    <span class="text-secondary font-weight-bold">A list of accounts filtered by year for the selected contact or business.</span>
                    <small>Click the box for the month complete. A check mark will represent completion. <strong>To uncheck simply reclick the box.</strong></small>
                </div>
                <div class="text-left"  v-if="error && errorMsg">
                    <p class="text-danger font-weight-bold">{{errorMsg}} <button class="error-close-btn" @click="error = false">X</button></p>
                </div>
                <div class="selected-bookkeeping-list-account-body">
                    <ProcessingBar v-if="processing && !timesheet" />
                    <div class="selected-account-header">
                        <span v-if="filteredAccountName" @click="goTo" class="account-name">{{filteredAccountName}}</span>
                        <span>Year: </span>
                        <select name="tax_year" id="tax_year" v-model="selectedYear">
                            <option v-for="(year, index) in selectedAccountYears" :key="index" :value="year">{{year}}</option>
                        </select>
                        <div class="selected-account-btns">
                            <button @click="addAccountRequest">Add Account</button>
                        </div>
                        <div class="selected-account-btns" v-if="mostRescentYear">
                            <button @click="startNewYear">Start New Year For {{JSON.parse(selectedYear) + 1}} <i class="far fa-calendar-alt ml-2"></i></button>
                        </div>
                    </div>
                    <table class="table table-bordered" ref="account-table">
                        <thead>
                            <tr>
                                <td>Account Name</td>
                                <td>Account Type</td>
                                <td>Jan</td>
                                <td>Feb</td>
                                <td>Mar</td>
                                <td>Apr</td>
                                <td>May</td>
                                <td>Jun</td>
                                <td>Jul</td>
                                <td>Aug</td>
                                <td>Sep</td>
                                <td>Oct</td>
                                <td>Nov</td>
                                <td>Dec</td>
                                <td>Edit</td>
                            </tr>
                        </thead>
                        <tbody v-if="bookkeepingAccounts && accounts &&  bookkeepingAccounts.length > 0 && accounts.length > 0">
                            <tr v-for="(account, index) in accounts" :key="index" :ref="'account-row' + `${index}`">
                                <th class="account-name">{{account.account_name}}</th>
                                <td class="account-name">{{accountType(account.account_type)}}</td>
                                <th @click="updateMonth(account.id, 'jan')" :class="{'checked': account.jan}">
                                    <i class="fas fa-check" v-if="account.jan"></i>
                                    <i class="fas fa-times" v-else-if="dateStart('01/31/'+selectedYear, account.account_start_date)"></i>
                                    <span class="account-closed" v-else-if="dateClose('01/31/'+selectedYear, account.account_close_date)">CLSD</span>
                                </th>
                                <th @click="updateMonth(account.id, 'feb')" :class="{'checked': account.feb}">
                                    <i class="fas fa-check" v-if="account.feb"></i>
                                    <i class="fas fa-times" v-else-if="dateStart('02/28/'+selectedYear, account.account_start_date)"></i>
                                    <span class="account-closed" v-else-if="dateClose('02/28/'+selectedYear, account.account_close_date)">CLSD</span>
                                </th>
                                <th @click="updateMonth(account.id, 'mar')" :class="{'checked': account.mar}">
                                    <i class="fas fa-check" v-if="account.mar"></i>
                                    <i class="fas fa-times" v-else-if="dateStart('03/31/'+selectedYear, account.account_start_date)"></i>
                                    <span class="account-closed" v-else-if="dateClose('03/31/'+selectedYear, account.account_close_date)">CLSD</span>
                                </th>
                                <th @click="updateMonth(account.id, 'apr')" :class="{'checked': account.apr}">
                                    <i class="fas fa-check" v-if="account.apr"></i>
                                    <i class="fas fa-times" v-else-if="dateStart('04/30/'+selectedYear, account.account_start_date)"></i>
                                    <span class="account-closed" v-else-if="dateClose('04/30/'+selectedYear, account.account_close_date)">CLSD</span>
                                </th>
                                <th @click="updateMonth(account.id, 'may')" :class="{'checked': account.may}">
                                    <i class="fas fa-check" v-if="account.may"></i>
                                    <i class="fas fa-times" v-else-if="dateStart('05/31/'+selectedYear, account.account_start_date)"></i>
                                    <span class="account-closed" v-else-if="dateClose('05/31/'+selectedYear, account.account_close_date)">CLSD</span>
                                </th>
                                <th @click="updateMonth(account.id, 'jun')" :class="{'checked': account.jun}">
                                    <i class="fas fa-check" v-if="account.jun"></i>
                                    <i class="fas fa-times" v-else-if="dateStart('06/30/'+selectedYear, account.account_start_date)"></i>
                                    <span class="account-closed" v-else-if="dateClose('06/30/'+selectedYear, account.account_close_date)">CLSD</span>
                                </th>
                                <th @click="updateMonth(account.id, 'jul')" :class="{'checked': account.jul}">
                                    <i class="fas fa-check" v-if="account.jul"></i>
                                    <i class="fas fa-times" v-else-if="dateStart('07/31/'+selectedYear, account.account_start_date)"></i>
                                    <span class="account-closed" v-else-if="dateClose('07/31/'+selectedYear, account.account_close_date)">CLSD</span>
                                </th>
                                <th @click="updateMonth(account.id, 'aug')" :class="{'checked': account.aug}">
                                    <i class="fas fa-check" v-if="account.aug"></i>
                                    <i class="fas fa-times" v-else-if="dateStart('08/31/'+selectedYear, account.account_start_date)"></i>
                                    <span class="account-closed" v-else-if="dateClose('08/31/'+selectedYear, account.account_close_date)">CLSD</span>
                                </th>
                                <th @click="updateMonth(account.id, 'sep')" :class="{'checked': account.sep}">
                                    <i class="fas fa-check" v-if="account.sep"></i>
                                    <i class="fas fa-times" v-else-if="dateStart('09/30/'+selectedYear, account.account_start_date)"></i>
                                    <span class="account-closed" v-else-if="dateClose('09/30/'+selectedYear, account.account_close_date)">CLSD</span>
                                </th>
                                <th @click="updateMonth(account.id, 'oct')" :class="{'checked': account.oct}">
                                    <i class="fas fa-check" v-if="account.oct"></i>
                                    <i class="fas fa-times" v-else-if="dateStart('10/31/'+selectedYear, account.account_start_date)"></i>
                                    <span class="account-closed" v-else-if="dateClose('10/31/'+selectedYear, account.account_close_date)">CLSD</span>
                                </th>
                                <th @click="updateMonth(account.id, 'nov')" :class="{'checked': account.nov}">
                                    <i class="fas fa-check" v-if="account.nov"></i>
                                    <i class="fas fa-times" v-else-if="dateStart('11/30/'+selectedYear, account.account_start_date)"></i>
                                    <span class="account-closed" v-else-if="dateClose('11/30/'+selectedYear, account.account_close_date)">CLSD</span>
                                </th>
                                <th @click="updateMonth(account.id, 'dec')" :class="{'checked': account.dec}">
                                    <i class="fas fa-check" v-if="account.dec"></i>
                                    <i class="fas fa-times" v-else-if="dateStart('12/31/'+selectedYear, account.account_start_date)"></i>
                                    <span class="account-closed" v-else-if="dateClose('12/31/'+selectedYear, account.account_close_date)">CLSD</span>
                                </th>
                                <td v-if="$can('delete', admin)">
                                    <button @click="editAccountRow(index, account.id)" class="btn btn-link p-0">
                                    <i class="fas fa-edit"></i></button>
                                </td>
                            </tr>
                            <tr class="edit-account-row" ref="edit-account-row" v-show="showEditRow" :key="showEditRow">
                                <td :class="{'edit-account-row-body': showEditRow}" colspan="15" v-if="selectedAccount">
                                    <div class="edit-account-row-body-content">
                                        <div class="d-flex justify-content-between w-100">

                                            <div class="custom-input-group text-left">
                                                <span>Account Name</span>
                                                <input type="text" v-model="selectedAccount.account_name">
                                            </div>

                                            <div class="custom-input-group text-left">
                                                <span>Account Type</span>
                                                <select name="account_type" id="account_type" v-model="selectedAccount.account_type">
                                                    <option value="credit">Credit Card Account</option>
                                                    <option value="bank">Bank Account</option>
                                                    <option value="other">Other Liability</option>
                                                </select>
                                            </div>

                                            <div class="custom-input-group text-left">
                                                <span>Opening Date</span>
                                                <v-date-picker
                                                mode='single'
                                                v-model='startDate'
                                                id="start_date"
                                                :popover-direction="'top'"
                                                ></v-date-picker>
                                            </div>

                                            <div class="custom-input-group text-left">
                                                <span>Close Date</span>
                                                <v-date-picker
                                                mode='single'
                                                v-model='closeDate'
                                                id="close_date"
                                                :popover-direction="'top'"
                                                ></v-date-picker>
                                            </div>

                                            <div class="edit-row-btns">
                                                    <button @click="hideEditRow" class="btn btn-sm edit-row-btn text-danger">Cancel</button>
                                                    <button @click="saveEditChanges" class="btn btn-sm edit-row-btn text-primary">Save Changes</button>
                                                    <button @click="requestRemoval" class="btn btn-sm edit-row-btn">Remove Account</button>
                                            </div>
                                        </div>
                                        <div class="edit-row-instructions">
                                            <ul>
                                                <li>
                                                    <div><strong>Account Name: </strong>Required</div>
                                                    <small>The name of the account.</small>
                                                </li>
                                                <li>
                                                    <div><strong>Account Type: </strong>Required</div>
                                                    <small>The type of the account.</small>
                                                </li>
                                                <li>
                                                    <div><strong>Opening Date: </strong>Not Required</div>
                                                    <small>The date the account was open. If date is selected the fields before that date will be marked.</small>
                                                    <small>To remove simply delete the date and save your changes.</small>
                                                </li>
                                                <li>
                                                    <div><strong>Closing Date: </strong>Not Required</div>
                                                    <small>The date the account was open. If date is selected the fields after that date will be marked.</small>
                                                    <small>To remove simply delete the date and save your changes.</small>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                        <tbody v-else>
                            <tr>
                                <td colspan="15">
                                    <p class="mb-0 font-weight-bold">There are currently no accounts being tracked.</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="selected-account-footer">
                        <div class="selected-account-legend">
                            <div class="selected-account-legend-item">
                                <span class="text">Completed: </span>
                                <i class="fas fa-check"></i>
                            </div>
                            <div class="selected-account-legend">
                                <span class="text">Before Opening Date: </span>
                                <i class="fas fa-times"></i>
                            </div>
                            <div class="selected-account-legend-item">
                                <span class="text">Account Closed:</span>
                                <span>CLSD</span>
                            </div>
                        </div>
                        <div class="selected-account-footer-btns">
                            <button @click="requestDeleteYear">Remove {{selectedYear}}</button>
                            <button @click="requestDeleteAllAccounts">Delete All Accounts<i class="fas fa-trash ml-2"></i></button>
                        </div>
                    </div>
                </div>
            </div>
            <AddAccountModal v-if="addAccountModal" @submit-form="addAccount" @close-modal="$store.commit('TOGGLE_ACCOUNT_MODAL')"/>
        </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {detach, move, moveRow, children, row} from '../../plugins/insert_row'
import {getCloseDate, getStartDate} from '../../plugins/bookkeeping'
import AddAccountModal from '@/components/firm/AddAccountModal.vue'
import Spinner from '@/components/loaders/Spinner.vue'
import ProcessingBar from '@/components/loaders/ProcessingBar.vue'
export default {
    name: 'Bookkeeping',
    props: ['admin'],
    components: {AddAccountModal,Spinner,ProcessingBar},
    data() {
        return {
            showActive: false,
            showContacts: false,
            showBusinessList: false,
            selectedID: null,
            selectedName: null,
            loadingData: false,
            showEditRow: false,
            editRowIndex: null,
            accountID: null,
            selectedYear: null,
            belongsTo: null,
            belongsToActive: null,
            loaded: [],
            search: '',
            startDate: null,
            closeDate: null,
            error: false,
            errorMsg: ''
        }
    },
    computed: {
        ...mapGetters(['bookkeepingAccounts', 'allClients', 'businessList', 'addAccountModal', 'timesheet', 'processing']),
        activeAccounts() {
            const mapped = this.bookkeepingAccounts.map(a => ({
                id: a.client_id,
                belongs_to: a.belongs_to,
                name: a.business_name
            }))

            return mapped.filter(function({id, belongs_to, name}) {

            const key =`${id}${belongs_to}${name}`;

            return !this.has(key) && this.add(key);

            }, new Set).filter(account => { return !this.search || account.name.toLowerCase().indexOf(this.search.toLowerCase()) >= 0 })
        },
        filteredContacts() {
            return this.allClients.reduce((acc, client) => {
                acc.push({
                    id: client.id,
                    name: this.contactName(client)
                })
                return acc
            }, [])
            .filter(client => { return !this.search || client.name.toLowerCase().indexOf(this.search.toLowerCase()) >= 0 })
        },
        filteredBusinessList() {
            return this.businessList.reduce((acc, business) => {
                acc.push({
                    id: business.id,
                    client_id: business.client_id,
                    name: business.business_name
                })
                return acc
            }, []).filter(business => { return !this.search || business.name.toLowerCase().indexOf(this.search.toLowerCase()) >= 0 })
        },
        accounts() {
            if(this.belongsTo != 'active') {
                return this.bookkeepingAccounts
                        .filter(account => account.client_id == this.selectedID && account.belongs_to == this.belongsTo && account.business_name == this.selectedName)
                        .filter(acct => acct.year == this.selectedYear)
            } else {
                return this.bookkeepingAccounts
                        .filter(account => account.client_id == this.selectedID && account.belongs_to == this.belongsToActive && account.business_name == this.selectedName)
                        .filter(acct => acct.year == this.selectedYear)
            }
        },
        filteredAccountName() {
            if(this.showContacts || this.belongsToActive == 'contact') {
                return this.contactName(this.allClients.filter(client => client.id == this.selectedID)[0])
            } else if (this.showBusinessList || this.belongsToActive == 'business') {
                return this.businessName(this.businessList.filter(business => business.client_id === this.selectedID && business.business_name == this.selectedName)[0])
            } else return
        },
        selectedAccount() {
            return this.bookkeepingAccounts.filter(account => account.id === this.accountID)[0]
        },
        selectedAccountYears() {
            const years = this.bookkeepingAccounts.filter(acct => acct.client_id == this.selectedID)
                        .filter(acct => this.belongsTo != 'active' ? acct.belongs_to == this.belongsTo : acct.belongs_to == this.belongsToActive)
                        .filter(acct => acct.business_name == this.selectedName)
                        .map(account => account.year)
            //filter duplicates
            const result = years.filter((v, i) => years.indexOf(v) === i)

            const sorted =  result.sort((a, b) => b - a)

            if(sorted.length > 0) {
                this.selectedYear = sorted[0]
            }

            return sorted
        },
        mostRescentYear() {
            if(this.selectedYear && this.selectedAccountYears && this.selectedAccountYears.length > 0) {
                return this.selectedYear < this.selectedAccountYears[0] ? false : true
            }
        }
    },
    methods: {
        addAccountRequest() {
            this.$store.commit('TOGGLE_ACCOUNT_MODAL')
        },
        requestRemoval() {
            this.$store.commit('toggleDeleteModal', {
                action: 'deleteBookkeepingAccount',
                id: this.selectedAccount.id
            })
        },
        requestDeleteAllAccounts() {
            this.$store.commit('toggleDeleteModal', {
                action: 'deleteAllBookkeepingAccounts',
                id: this.filteredAccountName,
                name: this.filteredAccountName,
                warning: 'This will remove all bookkeeping accounts and years for the chosen Business or Contact.'
            })
        },
        requestDeleteYear() {
            this.$store.commit('toggleDeleteModal', {
                action: 'deleteBookkeepingAccountYear',
                id: {name: this.filteredAccountName, client_id: this.selectedID, year: this.selectedYear},
                warning: 'This will delete the bookkeeping accounts for the year ' + this.selectedYear + ' on the selected contact or business.'
            })
        },
        updateMonth(id, mth) {
            this.error = false
            this.errorMsg = null
            if(this.validatedUpdate(id, mth)) {
                this.$store.dispatch('updateBookkeepingMonth', {
                    id: id,
                    mth: mth
                })
            } else {
                this.error = true
                this.errorMsg = 'Update Not Allowed. Please Adjust Close or Open Date Before Updating.'
            }
        },
        validatedUpdate(id, mth) {
            const account = this.accounts.filter(acct => acct.id == id)[0]
            if(account && account[mth]) return true;
            if(account.account_closed && getCloseDate(mth, this.selectedYear, account.account_close_date)) return false;
            else if(account.account_start_date && getStartDate(mth, this.selectedYear, account.account_start_date)) return false;
            else return true;
        },
        contactName(client) {
            if(client.has_spouse) {
                return client.spouse_last_name ? client.last_name + ' , ' + client.first_name + ' & ' +  client.spouse_last_name + ' , ' + client.spouse_first_name : client.last_name + ' , ' + client.first_name + ' & ' + client.spouse_first_name
            }
            return client.last_name + ' , ' + client.first_name 
        },
        businessName(business) {
            if(business) {
                return business.business_name
            } else return null
        },
        show(list) {
            this.search = ''
            if(list == 'active') {
                this.showActive = true
                this.showContacts = false
                this.showBusinessList = false
                this.selectedID = this.activeAccounts.length > 0 ? this.activeAccounts[0].id : null
                this.belongsToActive = this.activeAccounts.length > 0 ? this.activeAccounts[0].belongs_to : null
                this.selectedName = this.activeAccounts.length > 0 ? this.activeAccounts[0].name : null
                this.belongsTo = 'active'
            } else if(list == 'contacts') {
                this.selectedID = this.allClients[0].id
                this.selectedName = this.contactName(this.allClients[0])
                this.showContacts = true
                this.showBusinessList = false
                this.showActive = false
                this.belongsToActive = null
                this.belongsTo = 'contact'
            } else if(list == 'businesses') {
                this.selectedID = this.businessList[0].client_id
                this.selectedName = this.businessName(this.businessList[0])
                this.showContacts = false
                this.showBusinessList = true
                this.showActive = false
                this.belongsToActive = null
                this.belongsTo = 'business'
            }
            return
        },
        addAccount(data) {
            this.$store.dispatch('addBookkeepingAccount', {
                client_id: this.selectedID,
                belongs_to: this.belongsToActive ? this.belongsToActive : this.belongsTo,
                business_name: this.filteredAccountName,
                account_name: data.account_name,
                account_type: data.account_type,
                year:  JSON.stringify(data.year),
                account_start_date: data.account_start_date
            }).then(response => {
                this.selectedID = response.data.client_id
            })
        },
        changeSelectedItem(id, belongs_to, name) {
            this.error = false
            this.errorMsg = ''
            this.selectedID = id
            this.selectedName = name
            if(belongs_to) {
                this.belongsToActive = belongs_to
            }
        },
        accountType(type) {
            if(type == 'bank') {
                return 'Bank Account'
            } else if(type == 'credit') {
                return 'Credit Card Account'
            } else if (type == 'other') {
                return 'Other Liability'
            } else return 'None'
        },
        editAccountRow(index, id) {
            this.showEditRow = true
            this.accountID = id
            const toIndex = this.$refs['account-row' + index][0].rowIndex
            const fromIndex = document.getElementsByClassName('edit-account-row')[0].rowIndex
            this.editRowIndex = fromIndex
            const table = this.$refs['account-table']
            this.startDate = this.selectedAccount.account_start_date ? new Date(this.selectedAccount.account_start_date) : null
            this.closeDate = this.selectedAccount.account_close_date ? new Date(this.selectedAccount.account_close_date) : null
            moveRow(table, fromIndex, toIndex, false);
        },
        hideEditRow() {
            this.showEditRow = false
            this.accountID = null
        },
        saveEditChanges() {
            this.startDate ? this.selectedAccount.account_start_date = this.startDate : this.selectedAccount.account_start_date = null
            this.closeDate ? this.selectedAccount.account_close_date = this.closeDate : this.selectedAccount.account_close_date = null
            this.$store.dispatch('updateBookkeepingAccount', this.selectedAccount)
            this.showEditRow = false
            this.accountID = null
        },
        dataLoaded(key) {
            this.loaded.push(key)
            if(this.loaded.includes('accounts') && this.loaded.includes('clients')) {
                this.loadingData = false
                this.belongsTo = 'active'
                if(this.activeAccounts && this.activeAccounts.length > 0) {
                    this.selectedID = this.activeAccounts[0].id
                    this.belongsToActive = this.activeAccounts[0].belongs_to
                    this.selectedName = this.activeAccounts[0].name
                }
            }
        },
        startNewYear() {
            const id = this.selectedID
            const belongs_to = this.belongsTo
            const active = this.belongsToActive
            this.$store.dispatch('startNewBookkeepingAccountYear', {
                year: this.selectedYear,
                id: this.selectedID
            }).then(response => {
                this.selectedID = id
                this.belongsTo = belongs_to
                this.belongsToActive = active
            })
        },
        goTo() {
            this.$router.push('/contact/' + this.selectedID + '/account')
        },
        dateStart(mth, start_date) {
            if(start_date) {
                if(new Date(mth) < new Date(start_date)) {
                    return true
                }
            } return false
        },
        dateClose(mth, close_date) {
            if(close_date) {
                if(new Date(mth) < new Date(close_date)) {
                    return false
                } else {
                    return true
                }
            } return false
        },
    },
    watch: {
        'allClients': function(value) {
            if(!this.loaded.includes('clients') && value && value.length > 0) {
                this.dataLoaded('clients')
            }
        },
        'bookkeepingAccounts': function(value) {
            if(!this.loaded.includes('accounts') && value) {
                this.dataLoaded('accounts')
            }
        }
    },
    created() {
        this.loadingData = true
        this.showActive = true
        this.$store.dispatch('getBookkeepingAccounts')
        this.$store.dispatch('retrieveClients')
        this.$store.dispatch('retrieveBusinessList')
    }
}
</script>

<style lang="scss">
.bookkeeping-wrapper {
    width: 100%;

    .bookkeeping-overview {
        display: grid;
        grid-template-columns: 1fr 3fr;
        width: 100%;
        margin-top: 20px;
        z-index: 1;

        .bookkeeping-list {
            background: white;
            border-radius: 5px;
            box-shadow: 0 0 5px 0 rgba(0,0,0,.25px);
            height: 100%;
            max-height: calc(100vh - 200px);
            min-height: calc(100vh - 200px);
            overflow: hidden;

            .bookkeeping-list-input {
                width: 100%;
                border: 2px solid lightgray;
                border-left: transparent;
                border-right: transparent;
                border-top: transparent;
                border-radius: 5px 5px 0 0;
                padding: 12px;
            }

            .bookkeeping-list-tabs {
                width: 100%;
                box-shadow: 0 0 5px 0 rgba(0,0,0,.25px);

                button {
                    border: none;
                    font-weight: bold;
                    width: 33.3%;
                    padding: 15px;
                    outline: none;
                    cursor: pointer;
                }

                .selected {
                    background: white;
                    color: #0077ff;
                }
            }

            .bookkeeping-list-body {
                padding: 10px;
                margin: 0;
                list-style: none;
                overflow: scroll;
                overflow-x: hidden;
                height: calc(100vh - 300px);

                .bookkeeping-list-item {
                    padding: 13px;
                    text-align: left;
                    cursor: pointer;

                    span {
                        font-weight: bold;
                    }

                    &:hover {
                        background: rgb(236, 236, 236);
                    }

                    &:last-of-type {
                        margin-bottom: 30px;
                    }
                }

                .selected-item {
                    box-shadow: 0 0 5px 0 rgba(0,0,0,.25px);
                    border-radius: 5px;

                    span {
                        color: #0077ff!important;
                    }
                }
            }
        }

        .selected-bookkeeping-list-account {
            margin-left: 50px;

            .error-close-btn {
                color: red;
                font-weight: bold;
                background: none;
                border: none;
                cursor: pointer;

                &:hover {
                    color: black;
                }
            }

            .selected-bookkeeping-list-account-body {
                position: relative;

                .selected-account-header {
                    border: 1px solid lightgray;
                    border-radius: 5px 5px 0 0;
                    display: flex;
                    justify-content: flex-start;
                    width: 100%;
                    background: white;

                    .account-name {
                        cursor: pointer;

                        &:hover {
                            color: #0077ff;
                            background: lightgray;
                        }
                    }

                    span {
                        font-weight: bold;
                        padding: 10px;
                        border-right: 2px solid lightgray;
                    }

                    select {
                        width: 100px;
                        border: none;
                        background: rgb(243, 243, 243);
                    }

                    .selected-account-btns {
                        border-left: 2px solid lightgray;

                        button {
                            padding: 10px;
                            background: none;
                            border: none;
                            font-weight: bold;
                            color: #0077ff;
                            cursor: pointer;

                            &:hover {
                                background: lightgray;
                            }
                        }   
                    }
                }

                .table {
                    background: white;
                    margin-bottom: 0!important;
                    tbody {

                        tr {
                            .account-name {

                                &:hover {
                                    background: white;
                                }
                            }

                            .checked {
                                background: rgba(38, 177, 38, 0.74);
                            }

                            th {
                                cursor: pointer;

                                .account-closed {
                                    color: lightgray;
                                    font-size: .8rem;
                                }

                                &:hover {
                                    background: lightgray;
                                }
                            }

                        }
                    }
                }

                .selected-account-footer {
                    background: rgb(235, 235, 235);
                    border-radius: 0 0 5px 5px;
                    padding: 10px;
                    display: flex;
                    justify-content: space-between;

                    .selected-account-legend {
                        display: flex;
                        align-self: center;

                        .text {
                            padding: 0 10px;
                            color: rgb(156, 156, 156);

                        }
                        i {
                            align-self: center;
                        }

                        span {
                            font-weight: bold;
                        }

                        .fa-times {
                            margin-top: 4px;
                        }
                    }

                    .selected-account-footer-btns {

                        button {
                            border: none;
                            font-weight: bold;
                            border-radius: 5px;
                            cursor: pointer;
                            padding: 5px 10px;
                            margin: 0 10px;
                            background: white;

                            &:hover {
                                box-shadow: 0 0 5px 0 rgba(0,0,0,.250);
                                color: #0077ff;
                            }

                            &:hover:nth-of-type(even) {
                                color: red;
                            }

                            &:hover:last-of-type {
                                color: red;
                            }
                        }
                    }
                }
            }
        }
    }
}

.edit-account-row {
background: rgb(241, 241, 241);
width: 100%;
box-sizing: border-box;

.edit-account-row-body {
    width: 100%;
    box-sizing: border-box;
    
    .edit-account-row-body-content {
    display: flex;
    flex-direction: column;
    width: 100%;

    .edit-row-instructions {
        display: flex;
        flex-direction: column;
        text-align: left;
        padding: 0 20px;

        ul {
            margin: 0;
            padding: 0;

            li {
                display: flex;
                flex-direction: column;
                text-align: left;
                margin-bottom: 5px;


                small {
                    padding-left: 8px;
                }
            }
        }
    }

    .edit-row-btns {
        align-self: center;
        display: flex;
        margin-left: 10px;

        .edit-row-btn {
        text-decoration: none;
        margin: 0 8px;
        background: white;
        color: black;
        font-weight: bold;
        box-shadow: 0 0 5px 0 rgba(0,0,0,.250);
        cursor: pointer;
        }
    }
    }
}
}

</style>