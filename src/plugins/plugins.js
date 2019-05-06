const Plugins = {
    install(Vue, options) {
        Vue.mixin({
            // Anything added to a mixin will be injected into all components.
            // In this case, the mounted() method runs when the component is added to the DOM.
            mounted() {
                
            }
        });
    
        //add more global methods here
    }
}

export default Plugins;