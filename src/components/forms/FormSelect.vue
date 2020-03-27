<template>
    <div>
        <div class="input-group my-3">
          <div class="input-group-prepend">
            <label class="input-group-text text-primary font-weight-bold custom-input-label" for="option">{{label}}<span class="text-danger" v-if="required">*</span></label>
          </div>
          <select class="form-control" :id="label" v-model="model" v-validate="{ is_not: selected }" name="Category" @change="handleSelect($event)" v-if="value_type === 'array'" :class="{'input-error': formError.length > 0 && formError.includes(prop)}">
            <option disabled>{{ selected }}</option>
            <option v-for="(option, index) in options" :key="index" :value="option">
              {{ option }}
            </option>
          </select>
          <select :class="{'input-error': formError.length > 0 && formError.includes(prop)}" class="form-control" id="client_id" v-model="model" v-validate="{ is_not: selected }" name="Category" @change="handleSelect($event)" v-if="value_type === 'objects'">
            <option disabled>{{ selected }}</option>
            <option v-for="(option, index) in options" :key="index" :value="option.id">
                <span v-if="prop === 'client_id'">{{ option.value }}</span>
                <span v-if="prop === 'assigned_to'">{{ option.name }}</span>
                <span v-if="prop === 'status'">{{ option.status }}</span>
                <span v-if="prop === 'difficulty'">{{ option.value }}</span>
                <span v-if="prop === 'priority'">{{ option.value }}</span>
            </option>
          </select>
        </div>
        <span class="form-error" v-show="errors.has(label)">{{ errors.first(label) }}</span>
    </div>
</template>

<script>
export default {
    name: 'FormSelect',
    props: ['options', 'label', 'selected', 'prop', 'value_type', 'required', 'formError'],
    data() {
        return {
            model: null      
        }
    },
    methods: {
        handleSelect(event) {
            if(this.prop == 'client_id' || this.prop == 'assgined_to' || this.prop == 'priority' || this.prop == 'difficulty') {
                var value = parseInt(event.target.value)
            } else {
                value = event.target.value
            }
            this.$emit('select-change', this.prop, value)
        },
    },
    created() {
        this.model = this.selected
    }
}
</script>

<style>
    .custom-input-label {
        width: 8em;
    }

    .input-error {
        border: 1px solid red;
    }
</style>
