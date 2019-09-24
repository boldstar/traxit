<template>
    <div class="files">
        <div class="header p-0 d-flex flex-row justify-content-between mt-2 shadow-sm">
            <div class="ml-3 pr-2  h3 align-self-center m-0">
                <i class=" far fa-folder-open text-primary"></i> |
                <span>Files</span>
            </div>
            <div class="btn-group dropleft  m-0 align-self-center mr-3 ">
                <button class="btn btn-primary btn-sm dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="mr-2 fas fa-plus-square"></i></button>
                <div class="dropdown-menu">
                    <button class="btn dropdown-item font-weight-bold" type="button">Create Folder</button>
                    <button class="btn dropdown-item font-weight-bold" type="button">Map Folder</button>
                    <button class="btn dropdown-item font-weight-bold" type="button">Share File</button>
                    <button class="btn dropdown-item font-weight-bold" type="button">Upload File</button>
                </div>
            </div>
        </div>
        <table class="table m-0">
            <thead class="border">
                <tr>
                    <th><input type="checkbox"></th>
                    <th>Name</th>
                    <th>Size</th>
                    <th>Uploaded</th>
                    <th>Creator</th>
                </tr>
            </thead>
            <tbody class="table-bordered">
                <tr>
                    <td><input type="checkbox"></td>
                    <td>Name, Name</td>
                    <td>5kb</td>
                    <td>01/01/2019</td>
                    <td>Lisa H.</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>


export default {
    name: 'Files',
    
}
</script>

<style lang="scss" scoped>

    .header {
        height: 4em;
    }
</style>