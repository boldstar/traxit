export function storeHistory(history) {
    const current = localStorage.getItem('browser_history')
    if(current) {
        var values = JSON.parse(current)
        if(!current.includes(history.fullPath) && /\d+/.test(history.fullPath)) {
            values.push({
                'id': history.fullPath.split('/')[2],
                'path': history.fullPath,
                'category': history.fullPath.split('/')[1],
                'page': history.fullPath.split('/')[3]
            })
        }
        localStorage.setItem('browser_history', JSON.stringify(values))
    } else {
        if(/\d+/.test(history.fullPath)) {
            const value = {
                'id': history.fullPath.split('/')[2],
                'path': history.fullPath,
                'category': history.fullPath.split('/')[1],
                'page': history.fullPath.split('/')[3]
            }
            localStorage.setItem('browser_history', JSON.stringify([value]))
        }
    }

    return
}