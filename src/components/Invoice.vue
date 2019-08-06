<template>
     <div class="invoice w-50 mx-auto mt-5">
            <div class="card shadow mb-3">
                <div class="card-header text-left">
                    <span class="font-weight-bold">Invoice</span>
                </div>
                <div class="card-header d-flex">
                    <div class="flex-fill mr-3">
                        <div class="input-group mb-2">
                            <div class="input-group-prepend">
                                <label class="input-group-text invoice-label font-weight-bold" for="email_to">Bill To</label>
                            </div>
                            <input type="text" class="form-control" placeholder="email@example.com">
                        </div>
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <label class="input-group-text invoice-label font-weight-bold" for="cc">CC</label>
                            </div>
                            <input type="text" class="form-control" placeholder="email@example.com">
                        </div>
                    </div>
                    <div class="align-self-center text-primary">
                         <i class="fas fa-file-invoice-dollar fa-5x shadow"></i>
                    </div>
                </div>
                <div class="card-body p-0">
                    <table class="table mb-0 table-bordered">
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Quantity</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>{{ eng.description }}</th>
                                <td>1</td>
                                <td><input type="text" placeholder="Enter Amount Ex: 50" class="form-control amount-input"></td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="text-left p-3">
                        <span class="font-weight-bold mb-2">Special Note:</span>
                        <textarea class="form-control" placeholder="Start typing..." name="" id="" cols="30" rows="5"></textarea>
                    </div>
                </div>
                <div class="card-footer d-flex justify-content-between">
                    <div class="align-self-center d-flex">
                        <button class="btn btn-info font-weight-bold mr-2">Create</button>
                        <button class="btn btn-primary font-weight-bold mr-2">Create & Send</button>
                        <button class="btn btn-secondary font-weight-bold" @click="cancelInvoice">Cancel</button>
                    </div>
                    <div class="d-flex flex-column font-weight-bold text-left">
                        <div class="d-flex mb-2"><span class="align-self-center mr-1">Tax:</span> <input type="text" class="form-control align-self-center tax-input mr-1" placeholder="8.25"><span class="align-self-center">%</span></div>
                        <div class="d-flex justify-content-between">
                            <span>Total:</span>
                            <span class="text-primary">50</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
export default {
    name: 'Invoice',
    props: ['eng'],
    methods: {
        cancelInvoice() {
            this.$emit('close')
        }
    }
}
</script>

<style>

</style>
