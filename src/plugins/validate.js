//validate the required key values, return those that are required but are either null or empty strings
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

// validate email structure
export function validateEmail(prop, value) {
    var email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    console.log(email)
    if(email.test(String(value).toLowerCase())) return [];
    if(!email.test(String(value).toLowerCase())) return [prop];
}