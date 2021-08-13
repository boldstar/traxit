import store from '../store/store'

const automation_options = [
    {
        id: 1,
        option: 'Remove Engagement From Call List',
        action: 'automatedRemoveFromCallList'
    },
    {
        id: 2,
        option: 'Notify Admins Of Status Change',
        action: 'automatedNotifyAdminsOfStatusChange'
    },
]

export function automate(data) {
    data.forEach(automation => {
        const option = automation_options.filter(a => a.id === automation.action_id)[0]
        const item = data.filter(d => d.action_id === automation.action_id)[0]
        store.dispatch(option.action, item.data.data)
    });
}


export default {
    options: automation_options
}