export function notLastItem(fields, fieldsLength) {
    for(var i = 0; i < fieldsLength ;i++){
        if((i + 1) == (fieldsLength)){
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

export function currentTotal(start) {
    var date = new Date(start);
    var addMin = date.setMinutes( date.getMinutes() - 2)
    var startDate = new Date(addMin).getTime()
    // Get today's date and time
    var now = new Date().getTime();
        
    // Find the distance between now and the count down date
    var distance = now - startDate;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
    // Output the result in an element with id="demo"
   
    return (JSON.stringify(seconds).length <= 1) ? hours + ":" + minutes + ":" + '0' + seconds : hours + ":" + minutes + ":" + seconds

}

export function distance(start) {
    var date = new Date(start);
    var addMin = date.setMinutes( date.getMinutes() - 2)
    var startDate = new Date(addMin).getTime()

    var now = new Date().getTime();
    return now - startDate;
}

export function daysTotal(time, current) {
    var totals = []
    for(var i in time) {
        var start = time[i]['start']
        var end = time[i]['end']
        // Set the date we're counting down to
        var start_date = new Date(start);
        var addStartMin = start_date.setMinutes( start_date.getMinutes() - 2)
        var startTime = new Date(addStartMin).getTime()

        // Get today's date and time
        var end_date = new Date(end);
        var addEndMin = end_date.setMinutes( end_date.getMinutes() - 2)
        var endTime = new Date(addEndMin).getTime()

        var distance = endTime - startTime;
        totals.push(distance)
    }
    totals.push(current)
    const total = totals.reduce((a, b) => a + b, 0)
    var hours = Math.floor((total % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((total % (1000 * 60 * 60)) / (1000 * 60));
    return (JSON.stringify(minutes).length <= 1) ? hours + ':' + '0' + minutes : hours + ':' + minutes
}

export function getMonday(d) {
    d = new Date(d);
    var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
    return new Date(d.setDate(diff));
}
























// export function getTime(start, end) {
//     var startTime = new Date(start).getTime();

//     var endTime = new Date(end).getTime();
        
//     // Find the distance between now and the count down date
//     var distance = endTime - startTime;

//     var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//     var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

//     return hours + 'h' + ' ' + minutes + 'm'
// }

// export function daysTotal(timesheets) {
//     if(localStorage.tsheets_tsheet_id && localStorage.tsheets_tsheet_id != 'undefined') {
//         var times = []
//         var total = []
//         for(var i in timesheets) {
//           times.push(i)
//         }   for( var i = 0; i < times.length; i++) {
//           var start = timesheets[times[i]].start
//           var end = timesheets[times[i]].end
//           total.push({
//             start: start,
//             end: end
//           })
//         } return total
//       } else return;
// }