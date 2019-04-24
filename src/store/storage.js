export default (options) => (store) => {

    if (localStorage.state) {
      const storedState = JSON.parse(localStorage.state)
      store.replaceState(Object.assign(store.state, storedState))
    }
  
    return store.subscribe((mutation, state) => {
      if (options.destroyOn && options.destroyOn.indexOf(mutation.type) !== -1) {
        return localStorage.removeItem('state')
      }

      if(localStorage.getItem('rules') == null) {
        const newState = options.storedKeys.reduce((map, key) => {
          map[key] = state.auth[key]
          return map
        }, {})
        localStorage.state = JSON.stringify(newState)
      } 
      
      return
    })
  }