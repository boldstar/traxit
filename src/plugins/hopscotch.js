module.exports = {
    init: () => {
        if (document.getElementById('hopscotch-tour')) return; // was already loaded
        if (localStorage.getItem('tour_complete')) return; // tour was already completed
        if (localStorage.getItem('role') != 'Admin') return; // user is not the admin
        var scriptTag = document.createElement("script");
        scriptTag.src = "https://cdnjs.cloudflare.com/ajax/libs/hopscotch/0.3.1/js/hopscotch.min.js";
        scriptTag.id = "hopscotch-tour";
        document.getElementsByTagName('head')[0].appendChild(scriptTag);
        return;
    }
}