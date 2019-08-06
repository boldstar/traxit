<template>
    <div class="mx-auto w-100">
        <div class="card mt-5 w-25 mx-auto shadow-sm" v-if="!data">
            <div class="card-body">
                <i class="fas fa-file-invoice-dollar fa-5x"></i>
            </div>
            <button class="py-2 btn-primary font-weight-bold" @click="data = true">Create Invoice</button>
        </div>

        <Invoice :eng="engagement" v-if="data" @close="data = false" />
    </div>
</template>

<script>
import Invoice from '@/components/Invoice.vue'
export default {
    name: 'EngageInvoice',
    props: ['engagement'],
    components: {Invoice},
    data() {
        return {
            data: false
        }
    }
}
</script>

<style>
    .construction-img {
        overflow: hidden;
        height: 75vh;
        width: 100%;
        object-fit: cover;
    }

    .invoice-label {
        width: 85px;
    }

    .tax-input {
        width: 100px;
    }

    .amount-input {
        width: 200px;
        margin: 0 auto;
    }
</style>
