<template>
    <div class="timesheet-selects mx-3">
        <div class="input-group item-select text-left mb-3" v-for="(field, index) in cfields" :key="index">
            <div class="input-group-prepend">
                <label class="input-group-text text-primary font-weight-bold item-label" :for="field.name">{{field.name}}</label>
            </div>
            <select :name="field.name" :id="field.name" class="form-control item-select" @change="mapCustomFields(index, $event)">
                <option :value="[item.id, item.customfield_id]" v-for="(item, index) in serviceItems" :key="index" v-if="item.customfield_id === field.id">{{ item.name }}</option>
            </select>
        </div>
    </div>
</template>

<script>
import {compressItems} from '../plugins/tsheets'
export default {
    name: 'TimesheetSelects',
    props: ['cfields', 'items'],
    computed: {
        serviceItems() {
            return compressItems(this.items)
        }
    },
    data() {
        return {
            customFields: {}
        }
    },
    methods: {
        mapCustomFields(index, event) {
            var comIndex = event.target.value.indexOf(',')
            var value_id = event.target.value.slice(0, comIndex)
            var custom_id = event.target.value.slice(comIndex+1)
            var obj = {}
            if(custom_id in this.customFields) {
                this.customFields[custom_id] = this.serviceItems.filter(item => item.id === JSON.parse(value_id))[0].name
            } else {
                for( var i in this.cfields) {
                obj[this.cfields[i].id] = ''
                }
                this.customFields = obj
                this.customFields[custom_id] = this.serviceItems.filter(item => item.id === JSON.parse(value_id))[0].name
            }   console.log(this.customFields)
            return
        }
    }
}
</script>

<style>
 label.item-label {
     width: 130px;
 }
</style>
