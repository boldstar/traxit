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
                <div class="bubble-img"></div>
                <div class="custom-bubble-guide">
                    <h5>Here is a quick start guide</h5>
                    <ol>
                        <li>Upload a list of contacts or create from scratch</li>
                        <li>Create your first workflow located in the admin section</li>
                        <li>Start an engagement, and assign to a team member or yourself</li>
                    </ol>
                </div>
                <div class="custom-bubble-action">
                <button class="btn btn-primary callout-btn">Continue Tour</button>
                </div>
            `,
            showCloseButton: false,
            showCTAButton: true,
            onShow: function() {
                setTimeout(() => {
                    const button = document.getElementsByClassName("callout-btn")[0]
                    button.addEventListener('click', function() {
                        mgr.removeAllCallouts();
                        hopscotch.startTour(tour);
                    })
                }, 3000)
            }
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