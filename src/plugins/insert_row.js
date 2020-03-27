export function detach(element) {
    return element.parentElement.removeChild(element);
}

export function move(src, dest, isBefore) {
    dest.insertAdjacentElement(isBefore ? 'beforebegin' : 'afterend', detach(src));
}

export function children(element, selector) {
    return element.querySelectorAll(selector);
}

export function row(table, index) {
    // Generic Version: return child(table.querySelector('tbody'), 'tr', index);
    return table.querySelector('tbody').querySelector(`tr:nth-child(${index})`);
}

export function moveRow(table, fromIndex, toIndex, isBefore) {
    move(row(table, fromIndex), row(table, toIndex), isBefore);
}