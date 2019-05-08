export function validate(model, required) {
    const empty = []
    var props = Object.keys(model)
    for(var i = 0; i < props.length; i++) {
        var prop = required.filter(key => key == props[i])
        if(prop && prop.length >= 1) {
            var value = model[props[i]]
            if(!value || value == 'Choose..') {
                empty.push(prop[0])
            }
        }
    }
    return empty
}