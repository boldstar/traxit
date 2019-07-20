<template>
    <div class="timesheet-selects mx-3">
        <div class="input-group item-select text-left mb-3" v-for="(field, index) in cfields" :key="index">
            <div class="input-group-prepend">
                <label class="input-group-text text-primary font-weight-bold item-label" :for="field.name">{{field.name}}</label>
            </div>
            <select 
            :name="field.name" 
            :id="field.name" 
            class="form-control item-select"
            :class="{'input-error': missingFields.includes(JSON.stringify(field.id))}" 
            @change="mapCustomFields(index, $event)" 
            v-model="customFields[field.id]"
            >
               <option disabled value="">{{ option }} <span v-if="!field.required">(Optional)</span> </option>
               <option :selected="customFields[field.id]" v-if="customFields[field.id]">{{customFields[field.id]}}</option>
                <option :value="[item.id, item.customfield_id]" v-for="(item, index) in serviceItems" :key="index" v-if="item.customfield_id === field.id &&item.name != customFields[field.id]">{{ item.name }}</option>
            </select>
        </div>
    </div>
</template>

<script>
import {compressItems} from '../plugins/tsheets'
export default {
    name: 'TimesheetSelects',
    props: ['cfields', 'items', 'current-fields', 'missing-fields'],
    computed: {
        serviceItems() {
            return compressItems(this.items)
        }
    },
    data() {
        return {
            customFields: {},
            option: 'Choose...',
            showSelects: false
        }
    },
    methods: {
        mapCustomFields(index, event) {
            var comIndex = event.target.value.indexOf(',')
            var value_id = event.target.value.slice(0, comIndex)
            var custom_id = event.target.value.slice(comIndex+1)
            if(custom_id in this.customFields) {
                this.customFields[custom_id] = this.serviceItems.filter(item => item.id === JSON.parse(value_id))[0].name
                this.$emit('item-select', this.customFields)
                this.$emit('remove-error', custom_id)
            }
            return
        },
    },
    mounted() {
        var self = this
        setTimeout(() => {
            self.customFields = self.currentFields
            self.$emit('current-obj', self.currentFields)
        }, 300)
    }
}
</script>

<style>
 label.item-label {
     width: 130px;
 }

 .input-error {
     border: 1px solid red;
 }
</style>
