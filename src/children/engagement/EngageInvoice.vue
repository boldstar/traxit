<template>
    <div class="mx-auto w-100">
        <div class="card mt-5 w-50 mx-auto shadow-sm" v-if="!data">
            <div class="card-body">
                <InvoiceSvg />
            </div>
            <div class="card-footer">
                <button class="btn btn-block btn-primary font-weight-bold" @click="data = true">Create Invoice</button>
            </div>
        </div>

        <Invoice :eng="engagement" v-if="data" @close="data = false" />
    </div>
</template>

<script>
import Invoice from '@/components/invoice/Invoice.vue'
import InvoiceSvg from '@/components/invoice/InvoiceSvg.vue'
export default {
    name: 'EngageInvoice',
    props: ['engagement'],
    components: {Invoice, InvoiceSvg},
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
