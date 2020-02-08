<template>
    <input 
    class="form-control"
    :placeholder="placeholder" 
    v-model="formatCurrency" 
    @blur="handleInputState"
    @focus="handleInputState"
  >
</template>

<script>
const masks = {
  currency: {
    mask (value) {
      return value
    },
    unmask (value) {
        if(value.indexOf(".") >= 0) {
            var decimal_pos = value.indexOf(".")
            var left_side = value.substring(0, decimal_pos)
            var right_side = value.substring(decimal_pos)
            var decimals = right_side.substring(0,3)
            value = left_side  + decimals
            return value
      } else {
          value = value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
           return value
      }
      return value
    },
  },
}

export default {
    name: 'currency-input',
    props: {
        value: null,
        maskType: String,
        placeholder: ''
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
        formatCurrency: {
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

