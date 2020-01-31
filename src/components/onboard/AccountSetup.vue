<template>
    <form action="" class="account-setup">
        <div class="overlay" v-if="accountSuccess"></div>
        <input type="text" placeholder="Business Name" class="form-control mb-3" v-model="account.business_name" @change="handleChange" @input="handleInput" :class="{'input-error': error && account.business_name == ''}">
        <input type="email" placeholder="Email" class="form-control mb-3" v-model="account.email" @change="handleChange" @input="handleInput" :class="{'input-error': error && account.email == ''}">
        <input type="text" placeholder="Phone Number" class="form-control mb-3" v-model="account.phone" @change="handleChange" @input="handleInput" :class="{'input-error': error && account.phone == ''}">
    </form>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    name: 'AccountSetup',
    props: ['error'],
    data() {
        return {
            account: {
                business_name: '',
                email: '',
                phone: '',
            }
        }
    },
    computed: {
        ...mapGetters(['accountSuccess'])
    },
    methods: {
        handleChange () {
           this.$emit('change')
        },
        handleInput () {
            return this.$emit('input', this.account)
        },
        setCurrentValue (account) {
            this.account = account
        }
    },
    watch: {
        value (val) {
            if (!val) return
            this.setCurrentValue(val)
        }
  }
}
</script>

<style lang="scss">

.account-setup {
    width: 80%;
    margin: 0 auto;
    position: relative;
}

.overlay {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: rgb(216, 216, 216);
    border-radius: 5px;

    &:before{
        content: '';
        display: block;
        background: white;
        height: 60px;
        width: 60px;
        margin: auto;
        margin-top: 50px;
        border-radius: 50%;
    }

    &:after{
        content: '';
        display: block;
        width: 25px;
        height: 45px;
        border: solid #0077ff;
        border-width: 0 7px 7px 0;
        transform: rotate(45deg);
        margin: auto;
        margin-top: -55px;
    }
}

.input-error {
    border: 1px solid red!important;
}

</style>
