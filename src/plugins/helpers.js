export function storeHistory(history) {
    if(localStorage.getItem('browser_history')) {
        var values = JSON.parse(localStorage.getItem('browser_history'))
        values.push({
            'path': history.fullPath
        })
        localStorage.setItem('browser_history', JSON.stringify(values))
    } else {
        const value = {
            'path': history.fullPath,
        }
        localStorage.setItem('browser_history', JSON.stringify([value]))
    }

    return
}