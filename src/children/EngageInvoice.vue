<template>
    <div class="mx-auto w-100">
        <div class="card mt-5" v-if="data">
            <div class="card-body">
                <i class="fas fa-file-invoice-dollar fa-5x"></i>
            </div>
            <button class="py-2 btn-primary font-weight-bold" >Create Invoice</button>
        </div>
        <div class="invoice w-50 mx-auto">
            <div class="card">
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
                         <i class="fas fa-file-invoice-dollar fa-5x"></i>
                    </div>
                </div>
                <div class="card-body p-0">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Quantity</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>Item One</th>
                                <td>1</td>
                                <td>50</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="card-footer d-flex justify-content-between">
                    <div class="align-self-center">
                        <button class="btn btn-primary font-weight-bold">Send</button>
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
    </div>
</template>

<script>
export default {
    name: 'EngageInvoice',
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
</style>
