export function notLastItem(fields, fieldsLength) {
    console.log(fields, fieldsLength)
    for(var i = 0; i < fieldsLength ;i++){
        var item = Object.keys(fields)[i];
        // Do something if is the last iteration of the array
        if((i + 1) == (fieldsLength)){
            console.log(true)
            return true
        } else return false
    }
  }

export function compressItems(items) {
    var newArr = []
    for(var i in items) {
        var keys = items[i]
        for( var ii in keys) {
        newArr.push(keys[ii])
        }
    }
    return newArr
}

export function requiredFields(fields) {
    var keys = Object.keys(fields)
    var required = []
    for(var i =0; i < keys.length; i++) {
        if(fields[keys[i]].required) {
            required.push(keys[i])
        }
    }
    return required
}

export function validateFields(required, fields) {
    var missing = []
    for(var i = 0; i < required.length; i++) {
        if(!fields[required[i]]) {
            missing.push(required[i])
        }
    } return missing
}