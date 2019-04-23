import { Ability } from '@casl/ability'

export const ability = new Ability()

export const abilityPlugin = (store) => {
    ability.update(store.state.rules)
    const rules = store.subscribe((mutation) => {
        switch (mutation.type) {
            case 'createSession':
            ability.update(mutation.payload[0])
            break
            case 'destroySession':
            ability.update([{ actions: '', subject: '' }])
            break
        }
    })
    return rules
}
