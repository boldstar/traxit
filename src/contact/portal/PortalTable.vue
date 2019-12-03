<template>
    <div class="w-100 ml-3">
        <table class="table border">
            <thead>
                <tr>
                    <td>Batch Action</td>
                    <td>Name</td>
                    <td>Size</td>
                    <td>Shared On</td>
                    <td>Shared By</td>
                    <td>Options</td>
                    <td>Preview</td>
                </tr>
            </thead>
            <tbody class="table-bordered">
                <tr>
                    <th> <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" id="customCheck1">
                            <label class="custom-control-label batch-label pb-3" for="customCheck1"></label>
                        </div></th>
                    <th>file.pdf</th>
                    <th>1.2 kb</th>
                    <th>12/01/2019</th>
                    <th>User Name</th>
                    <th>
                        <button class="btn-link btn btn-sm font-weight-bold">View</button>
                        <!-- <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" id="customCheck1">
                            <label class="custom-control-label" for="customCheck1">Shared</label>
                        </div>
                        <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" id="customCheck1">
                            <label class="custom-control-label" for="customCheck1">Downloadable</label>
                        </div>
                        <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" id="customCheck1">
                            <label class="custom-control-label" for="customCheck1">Signature Required</label>
                        </div>
                        <div class="custom-control custom-checkbox">
                            <input type="checkbox" class="custom-control-input" id="customCheck1">
                            <label class="custom-control-label" for="customCheck1">Payment Required</label>
                        </div> -->
                    </th>
                    <th><button class="btn-link btn btn-sm font-weight-bold">View</button></th>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name: 'PortalTable'
}
</script>

<style>

.btn-link {
    text-decoration: none!important;
}
</style>
