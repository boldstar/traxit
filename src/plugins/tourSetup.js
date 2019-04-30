addClickListener = function(el, fn) {
    if (el.addEventListener) {
      el.addEventListener('click', fn, false);
    }
    else {
      el.attachEvent('onclick', fn);
    }
  },

module.exports = {
    init: (tour) => {
    var calloutId = 'startTourCallout',
        mgr = hopscotch.getCalloutManager(),
        state = hopscotch.getState();
    
    if (state && state.indexOf('default-hopscotch:') === 0) {
        // Already started the tour at some point!
        hopscotch.startTour(tour);
    }
    else {
        // Looking at the page for the first(?) time.
        setTimeout(function() {
        mgr.createCallout({
            id: calloutId,
            target: document.querySelector("#app"),
            placement: 'bottom',
            title: 'Welcome To TRAXIT',
            content: `
                <h5 class="custom-bubble-content-title">Your Custom Practice Management Workflow Tool</h5>
                <div class="custom-bubble-guide">
                    <h5>Here is a quick start guide</h5>
                    <ol>
                        <li>Upload a list of contacts or create from scratch</li>
                        <li>Create your first workflow located in the admin section</li>
                        <li>Start an engagement, and assign to a team member or yourself</li>
                    </ol>
                </div>
            `,
            showCloseButton: false,
            showCTAButton: true
        });
        }, 100);

        addClickListener(document.querySelector("#app"), function() {
            if (!hopscotch.isActive && !localStorage.getItem('tour_complete')) {
                mgr.removeAllCallouts();
                hopscotch.startTour(tour);
            }
        });
    }
    
    },
}