<template>
    <b-modal v-model="computedModal" hide-footer title='Rubex Integration' @hidden="resetModal" class="automation-approval">
        <div class="bg-primary p-3 mb-3">
            <img src="../../assets/RubexLogo.png" alt="rubex" class="integration-logo">
        </div>
        <div class="text-left d-flex flex-column">
            <span class="pb-3 border-bottom">Would you like to create drawer in <strong>Rubex</strong> for 
            <strong v-if="rubexModalData && rubexModalData.contact">{{fullName(rubexModalData.contact)}}</strong>
            <strong v-if="rubexModalData && rubexModalData.business">{{rubexModalData.business.business_name}}</strong>
            ?
            </span>
            <span class="font-weight-bold pt-3">1) Start by choosing a location.</span>
            <ul class="rubex-list">
                <li class="rubex-item" v-for="(item, index) in rubexPortfolios" :key="index" @click="setPortfolio(item)">
                    <input type="checkbox" :value="item.name" v-model="selectedName">
                    <span class="ml-2">
                        {{item.name}}
                    </span>
                </li>
            </ul>
            <p v-if="checkIfExists">Sorry, It appears a drawer by the name <strong>"{{contactName}}"</strong> already exists. Would you like to create anyway?</p>
            <p v-else-if="!checkIfExists && selectedName.length > 0">
                <span v-if="rubexModalData && rubexModalData.contact">Add drawer for <strong>{{contactName}}</strong> to <strong>{{selectedName[0]}}</strong> drawer?</span>
                <span v-if="rubexModalData && rubexModalData.business">Add drawer for <strong>{{rubexModalData.business.business_name}}</strong> to <strong>{{selectedName[0]}}</strong> drawer?</span>
            </p>
            <p v-else>Please start by selecting a location.</p>
        </div>

        <div class="d-flex justify-content-between">
            <button class="btn btn-sm btn-primary font-weight-bold" type="button" @click="confirm" :disabled="processing || selectedName.length < 1">
                <span v-if="!processing">Add Drawer</span>
                <span v-if="processing">Adding...</span>
            </button>
            <button class="btn btn-sm btn-secondary font-weight-bold px-4" type="button" @click="closeModal">No</button>
        </div>
      </b-modal>
</template>

<script>
import bModal from 'bootstrap-vue/es/components/modal/modal'
import bModalDirective from 'bootstrap-vue/es/directives/modal/modal'
import {contactFullName} from '../../plugins/filters'
import { mapGetters } from 'vuex'

export default {
    name: 'RubexIntegrationModal',
    data() {
      return {
        modal: true,
        selectedPortfolio: null,
        selectedName: [],
        parentID: null
      }
    },
    components:{
        'b-modal': bModal,
    },
    directives: {
        'b-modal': bModalDirective
    },
    computed: {
      ...mapGetters([
          'processing', 
          'errorMsgAlert',
          'rubexModal', 
          'rubexModalData', 
          'rubexPortfolios',
          'rubexPortfolioFolders',
          'rubexNodes',
          'rubexAccountSetting'
          ]),
      computedModal: {
            get: function() {
                return this.rubexModal
		    },
            set: function(newValue) {
                return newValue
            }
      },
      checkIfExists() {
          if(this.parentID && this.rubexPortfolioFolders && this.rubexPortfolioFolders.length > 0) {
             const names = this.rubexPortfolioFolders.map(a => (
                  a.name
              ))
              return names.includes(this.contactName)
          } else {
              return false
          }
      },
      contactName() {
          if(this.rubexModalData) {
              return contactFullName(this.rubexModalData.contact)
          }
      }
    },
    watch: {
        'processing': function(value) {
            if(!value && this.automationApproved) {
                setTimeout(() => {
                    this.$store.commit('showRubexIntegrationModal', null)
                }, 2000)
            }
        },
        'errorMsgAlert': function(value) {
            if(value) {
                 this.$store.commit('showRubexIntegrationModal', null)
            }
        }
    },
    methods: {
      closeModal() {
        this.$emit('close-modal')
      },
      confirm() {
          this.$store.dispatch('addRubexNode', {
              parentID: this.parentID,
              accountID: this.rubexAccountSetting[0].accountID,
              name: this.rubexModalData.contact ? this.contactName : this.rubexModalData.business.business_name
          })
      },
      resetModal() {
        this.$emit('reset-modal')
      },
      setPortfolio(item) {
          this.selectedPortfolio = item
          this.selectedName = []
          this.selectedName.push(item.name)
          this.parentID = item.portfolioNodes[0].nodeID
          this.$store.dispatch('getRubexNodeChildren', item.portfolioNodes[0].nodeID)
      },
      fullName(contact) {
          return contactFullName(contact)
      }
    },
    created() {
        if(localStorage.getItem('rubex_access_tokens')) {
            this.$store.dispatch('getRubexPortfolios')
            this.$store.dispatch('getRubexNodes')
            this.$store.dispatch('getRubexAccountSetting')
        }
    }
}
</script>

<style lang="scss">
    .rubex-list {
        list-style: none;
        padding: 0;
        .rubex-item {
            padding: 5px;
            cursor: pointer;

            &:hover {
                background: rgb(241, 241, 241);
                border-radius: 3px;
            }
        }
    }

    .integration-logo {
        height: 50px;
        width: auto;
    }
</style>
