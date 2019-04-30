// Define the tour!
const Tour = {
    id: "default-hopscotch",
    steps: [
        {
            id: "Dashboard",
            title: "Dashboard",
            content: "The Dashboard gives you a complete overview of your firm. From active engagements to assigned tasks and breakdowns by workflow, this is a great place to see the activity you are experienceing and where you may be experiencing bottle necks",
            target: document.querySelector('#app'),
            placement: "right",
            yOffset: 105,
            xOffset: 200,
            showNextButton: true
        },
        {
            id: "Firm",
            title: "Firm",
            content: "The Firm is the overview of all workflows currently being used by your firm. It gives a breakdown by workflow and then a breakdown by status. We allow those with the role of 'Admin' to manage engagements from this view.",
            target: document.querySelector('#app'),
            placement: "right",
            yOffset: 170,
            xOffset: 200,
            showNextButton: true
        },
        {
            id: "Tasks",
            title: "Tasks",
            content: "The Tasks view is what is currently awaiting your attention. Each task represents an engagement and typically the task description is the type of work required. Once the task is complete you can easily move the engagement to the next team member or complete it all together.",
            target: document.querySelector('#app'),
            placement: "right",
            yOffset: 235,
            xOffset: 200,
            showNextButton: true
        },
        {
            id: "Engagements",
            title: "Engagements",
            content: "The Engagements is the list of all engagements. You can easily filter by name and more. Also available is the ability to export. For more export abilities head over the admin view and locate the reports section.",
            target: document.querySelector('#app'),
            placement: "right",
            yOffset: 310,
            xOffset: 200,
            showNextButton: true
        },
        {
            id: "Contacts",
            title: "Contacts",
            content: "The Contacts view is the list of all contacts. Once again you have the ability to filter by name and anytime you can easily view the contact email and numbers. Clicking on the table row representing the contact you will be taking to more details about the contact.",
            target: document.querySelector('#app'),
            placement: "right",
            yOffset: 375,
            xOffset: 200,
            showNextButton: true
        },
        {
            id: "Add New",
            title: "Add New",
            content: "The Add New view is your quick way to on-board new contacts/clients, businesses, or start a new engagement.",
            target: document.querySelector('#app'),
            placement: "right",
            yOffset: 445,
            xOffset: 200,
            showNextButton: true,
        },
    ],
    showPrevButton: true,
    showCloseButton: false,
    onEnd: function() {
        localStorage.setItem('tour_complete', true)
    },
};
   
export default Tour