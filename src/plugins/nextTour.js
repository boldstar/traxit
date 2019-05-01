module.exports = {
    nextTour: (tour) => {
        var mgr = hopscotch.getCalloutManager()
        setTimeout(() => {
            mgr.removeAllCallouts();
            hopscotch.startTour(tour);
        }, 1000)
    }
}