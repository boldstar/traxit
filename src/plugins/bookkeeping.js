export function getStartDate(mth, year, start_date) {
    var date = new Date(dates.filter(date => date.mth == mth)[0].value + year)
    if(date < new Date(start_date)) return true;
    else return false
}

export function getCloseDate(mth, year, close_date) {
    var date = new Date(dates.filter(date => date.mth == mth)[0].value + year)
    if(date > new Date(close_date)) return true;
    else return false
}

const dates = [
    {mth: 'jan', value: '01/31/'},
    {mth: 'feb', value: '02/28/'},
    {mth: 'mar', value: '03/30/'},
    {mth: 'apr', value: '04/31/'},
    {mth: 'may', value: '05/30/'},
    {mth: 'jun', value: '06/31/'},
    {mth: 'jul', value: '07/30/'},
    {mth: 'aug', value: '08/31/'},
    {mth: 'sep', value: '09/30/'},
    {mth: 'oct', value: '10/31/'},
    {mth: 'nov', value: '11/30/'},
    {mth: 'dec', value: '12/31/'},
]