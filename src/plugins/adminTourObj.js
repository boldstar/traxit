// Define the tour!
const adminTour = {
    id: "admin-hopscotch",
    steps: [
        {
            id: "Account",
            title: "Account",
            content: "Account is the details of your company, not crucial information however it is used if you choose to use the email feature. We suggest providing as much information as possible. Also by adding a logo it will appear on the dashboard view.",
            target: document.querySelector('#app'),
            placement: "right",
            yOffset: 50,
            xOffset: 200,
            showNextButton: true
        },
        {
            id: "Team",
            title: "Team",
            content: "The team are the users of TRAXIT, here you have the full ability to describe roles, add or remove users and reset passwords.",
            target: document.querySelector('#app'),
            placement: "right",
            yOffset: 110,
            xOffset: 200,
            showNextButton: true
        },
        {
            id: "Workflows",
            title: "Workflows",
            content: "The Workflows view is were you create and manage your workflows. These are the backbone of this application and are fully customizable to meet your needs. If you have already uploaded a list of contacts we suggest creating your worklflow next.",
            target: document.querySelector('#app'),
            placement: "right",
            yOffset: 175,
            xOffset: 200,
            showNextButton: true
        },
        {
            id: "Reports",
            title: "Reports",
            content: "The Reports view is used to get specific details about the engagements you are processing and the history. Use this feature to learn the necessary information to make future decisions of your firm.",
            target: document.querySelector('#app'),
            placement: "right",
            yOffset: 225,
            xOffset: 200,
            showNextButton: true
        },
        {
            id: "Templates",
            title: "Templates",
            content: "The Templates view is a preview of the email templates used to send to contacts. There are currently 2 different templates. 'Questions Pending' & 'Status Update'. Use these features to create easy transparency between you and your contacts.",
            target: document.querySelector('#app'),
            placement: "right",
            yOffset: 280,
            xOffset: 200,
            showNextButton: true
        },
        {
            id: "Subscription",
            title: "Subscription",
            content: "The Subscription view is to view your invoices and current subscription. Used this view to end your account at anytime. If subscription is canceled you will have 30 days to renew it or you will have to contact sales to renew it.",
            target: document.querySelector('#app'),
            placement: "right",
            yOffset: 340,
            xOffset: 200,
            showNextButton: true,
        },
    ],
    showPrevButton: true,
    showCloseButton: false,
    onEnd: function() {
        localStorage.setItem('admin_tour_complete', true)
    },
};
   
export default adminTour