module.exports = {
    init: (tour) => {
            var mgr = hopscotch.getCalloutManager()
            mgr.removeCallout('startTourCallout')
            hopscotch.startTour(tour);
    },
}