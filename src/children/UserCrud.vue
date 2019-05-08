<template>
    <div class="d-flex flex-column align-items-center mt-3">
         <Spinner v-if="!dataSet" />
         <div v-if="errorArray.length >= 1 && errorArray.includes('email')" class="error">Email is the wrong format. Ex: email@example.com</div>
         <Form
            v-if="dataSet"
            :title="formName"
            :inputs="3"
            :selects="1"
            :labels="['Role']"
            :options="roles"
            :values="selectValues"
            :placeholders="placeHolders" 
            :data="user"
            :datakeys="dataKeys"
            :errs="errorArray"
            :rules="addOnly"
            :crud="action" 
            :btn="'Submit'" 
            :key="key" 
            @submit-form="validateSubmit"
            @select-change="selected"
            @change="clear" 
        />
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Form from '@/components/Form.vue'
import {validate, validateEmail} from '../plugins/validate.js'
import Spinner from '@/components/Spinner.vue'
export default {
    name: 'UserCrud',
    components: {
      Form,
      Spinner
    },
    data() {
      return {
        dataSet: false,
        key: false,
        placeHolders: ['Name', 'Email', 'Password'],
        roles: [['Admin', 'Manager', 'User', 'Outsource']],
        dataKeys: ['name', 'email', 'password', 'role'],
        required: ['name', 'email', 'password', 'role'],
        addOnly: ['password'],
        selectValues: ['role'],
        errorArray: [],
      }
    },
    computed: {
        ...mapGetters(['user']),
    formName() {
        if(this.$route.params.user == 0) {
          return 'Add User'
        } return `Edit User | ${this.user.name}`
      },
    action() {
          if(this.$route.params.user == 0) {
              return 'add'
          } else return 'edit'
      }
    },
    methods: {
        ...mapActions(['updateUser', 'addUser']),
    validateSubmit() {
        const check = validate(this.user, this.required)
        const email = validateEmail('email', this.user.email)
        if(check.length >= 1) {
            this.errorArray = check
            return
        } else if(email.length >= 1) {
            this.errorArray = email
            return
        } this.submitForm()
    },
    submitForm() {
        if(this.$route.params.user == 0) {
            this.addUser(this.user) 
        } else {
            this.updateUser(this.user)
        }
        this.key = !this.key
    },
    selected(label, select) {
            var props = Object.getOwnPropertyNames(this.user);
            for(var i = 0; i < props.length; i++) {
                var prop = props[i]
                if(prop == label.toLowerCase()) {
                    this.user[prop] = select
                }
            } return
        },
    clear() {
        this.errorArray = []
    }
    },
    created() {
        this.$store.dispatch('retrieveUserToUpdate', this.$route.params.user)
        setTimeout(() => {
            this.dataSet = true
        }, 2500)
    }
}
</script>

<style scoped>
.error {
    background: rgb(255, 98, 98);
    width: 100%;
    max-width: 600px;
    margin-bottom: 10px;
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 1.1rem;
    color: white;
    font-weight: bold;
}

</style>

