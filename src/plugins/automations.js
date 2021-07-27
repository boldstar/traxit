import store from '../store/store'

const automation_options = [
    {
        id: 1,
        option: 'Remove Engagement From Call List',
        action: 'removeFromCallList'
    },
    {
        id: 2,
        option: 'Notify Admins Of Status Change',
        action: 'notifyAdminsOfStatusChange'
    },
]

export function automate(data) {
    data.forEach(automation => {
        const option = automation_options.filter(a => a.id === automation.action_id)[0]
        store.dispatch(option.action, data.data)
    });
}


export default {
    options: automation_options
}