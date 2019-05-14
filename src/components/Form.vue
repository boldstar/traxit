<template>
    <form id="dynamicForm">
        <div class="form-header">
            <span>{{title}}</span>
            <button type="button" class="cancel-btn" @click="goBack">Cancel</button>
        </div>
        <div v-for="(input, index) in inputFields" :key="index" class="input" v-if="crudRules(index)">
            <label :for="input.placeholder">{{input.placeholder}}</label>
            <input type="text" :value="model[property(index)]"  :placeholder="input.placeholder" @change="handleChange" @input="handleInput(index, $event)" :class="{'input-error': errs.length >= 1 && errs.includes(property(index)[0])}">
        </div>
        <div v-for="(select, index) in selectFields" :key="select.label" class="select" v-if="selectFields.length >= 1">
            <label :for="select">{{select.label}}</label>
            <select :name="select" :id="select" @change="handleSelect(index, $event)" v-model="model[selectValue(values)]" :class="{'input-error': errs.length >= 1 && errs.includes(values[index])}">
                <option disabled value="">{{ selected }}</option>
                <option :value="option" v-for="(option, index) in select.choices" :key="index">{{option}}</option>
            </select>
        </div>
        <button type="button" @click="submitForm" class="submit-btn" :disabled="processing">
            <span v-if="!processing">{{ btn }}</span>
            <span v-if="processing">Processing...</span>
        </button>
    </form>
</template>

<script>
import {mapGetters} from 'vuex'
import {formatNumber} from '../plugins/filters.js'
import {formatDob} from '../plugins/filters.js'
export default {
    name: 'Form',
    props: [
        'inputs', 
        'placeholders', 
        'data', 
        'btn', 
        'selects', 
        'options',
        'labels',
        'datakeys',
        'title',
        'errs',
        'values',
        'rules',
        'crud'
    ],
    data() {
        return {
            selectFields: [],
            model: {},
            selected:'Choose..',
            chosen: true
        }
    },
    computed: {
        inputFields() {
            return this.createInputs(this.inputs)
        },
        ...mapGetters(['processing']),
    },
    methods: {
        property(i) {
            const props = Object.keys(this.model)
            return props.filter(key => key == this.datakeys[i])
            return
        },
        selectValue(v) {
            const keys = Object.keys(this.model)
            for(var i = 0; i < keys.length; i++) {
                if(v.includes(keys[i])) {
                    return keys[i]
                }
            }
        },
        crudRules(i) {
            if(this.rules.length < 1) return true;
            const value = this.rules.filter(key => key == this.datakeys[i])
            if(value[0] == this.datakeys[i] && this.crud == 'edit') {
                return false
            } return true
        },
        createInputs(x) {
            const fields = []
            for(var i = 0; i < x; i++) {
                fields.push({ placeholder: this.placeholders[i] })
            }
            return fields
        },
        createSelects(x) {
            for(var i = 0; i < x; i++) {
                this.selectFields.push({ id: i, choices: this.options[i], label: this.labels[i] })
            }
        },
        handleChange () {
           this.$emit('change')
        },
        handleInput (index, event) {
            var number = formatNumber(event.target.value)
            var date = formatDob(number)
            var final = date
            this.$set(this.model, this.datakeys[index], final);
            return this.$emit('input', this.model)
        },
        handleSelect(index, event) {
            this.$emit('select-change', this.selectFields[index].label, event.target.value)
            this.chosen = false
        },
        setCurrentValue (model) {
            this.model = model
        },
        submitForm() {
            this.$emit('submit-form')
        },
        goBack() {
            this.$router.go(-1)
            this.model = {}
        }
    },
    watch: {
        value (val) {
            if (!val) return
            this.setCurrentValue(val)
        },
    },
    mounted() {
        this.createSelects(this.selects)
        setTimeout(() => {
            this.model = this.data
        }, 200)
    }
}
</script>

<style scoped>

form {
    display: flex;
    flex-direction: column;
    max-width: 600px;
    width: 100%;
    background: white;
    border-radius: 6px!important;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.250);
    text-align: left;
    margin-bottom: 30px;
}

input {
    height: 40px;
    padding-left: 10px;
    border-radius: 5px;
    border: 1px solid lightgray;
}

select {
    height: 40px;
    padding-left: 10px;
    border-radius: 5px;
    border: 1px solid lightgray;
}

.input {
    display: flex;
    flex-direction: column;
    width: 95%;
    margin: 5px auto;
}

.input-error {
    border: 1px solid red;
}

.select {
    display: flex;
    flex-direction: column;
    width: 95%;
    margin: 10px auto;
}

.form-header {
    display: flex;
    justify-content: space-between;
    background: rgb(240, 240, 240);
    color: black;
    font-weight: bold;
    font-size: 1.25rem;
    padding: 8px 15px;
}

.cancel-btn {
    background: #a9a9a9;
    font-weight: bold;
    border: none;
    border-radius: 3px;
    font-size: 1rem;
    color: white;
    padding: 2px 5px;
    cursor: pointer;
    text-decoration: none;
    width: auto;
    height: auto;
    margin: 0;
}

.submit-btn {
    height: 40px;
    width: 95%;
    margin: 10px auto;
    background: #0077ff;
    border: none;
    border-radius: 5px;
    font-size: 1.25rem;
    font-weight: bold;
    color: white;
    cursor: pointer;
}


</style>
