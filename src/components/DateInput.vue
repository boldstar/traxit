<template>
    <div>
        <input 
        class="form-control"
        :placeholder="placeholder" 
        v-model="formatDate" 
        @blur="handleInputState"
        @focus="handleInputState"
        maxlength="10"
        v-validate="'date_format:MM/DD/YYYY'"
        :name="name"
        :class="{ 'input-error': errors.has(name) }"
        >
        <span class="form-error" v-show="errors.has(name)">{{ errors.first(name) }}</span>
    </div>
</template>

<script>
import moment from 'moment'

const masks = {
  date: {
    mask (value) {
      return value
    },
    unmask (value) {
        value = value.replace(/[^0-9]/g, '')
            .replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3')
        return value;
    },
  },
}

export default {
    name: 'date-input',
    props: {
        value: null,
        maskType: String,
        placeholder: '',
        name: ''
    },
    data: function() {
        return {
            inputFocused: false
        }
    },
    methods: {
        handleInputState (event) {
            this.inputFocused = event.type === 'focus'
        },
        unmask (value) {
            return masks[this.maskType].unmask(value)
        },
        mask (value) {
            return masks[this.maskType].mask(value)
        },
    },
    computed: {
        formatDate: {
            get: function() {
                if (this.inputFocused) {
                return this.value
                } else {
                return this.mask(this.value)
                }
            },
            set: function(modifiedValue) {        
                this.$emit('input', this.unmask(modifiedValue))
            }
        }
    }
}
</script>

<style>
 .input-error {
        border: 1px solid red;
    }
</style>
