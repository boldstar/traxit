const init = require('./nextTour')
const tour = require('./tourObj')

const appSetup = {
    id: "app-setup-hopscotch",
    steps: [
        {
            id: "Step One",
            title: "Step One",
            placement: "top",
            content: `
            <div class="contact-img"></div>
            <div class="custom-bubble-guide">
            <h5>Add Contacts</h5>
                <ul>
                    <li>Option One: Upload spreadsheet with list of contacts in specific format. The format of the spreadsheet will be emailed to you.</li>
                    <li>Option Two: Create a new contact manually using the "Add New" view.</li>
                </ul>
                <p>Note: This is needed for creating engagements.</p>
            </div>
            `,
            target: document.querySelector('#app'),
            placement: "right",
            yOffset: 225,
            showNextButton: true,
        },
        {
            id: "Step Two",
            title: "Step Two",
            placement: "top",
            content: `
            <div class="workflow-img"></div>
            <div class="custom-bubble-guide">
            <h5>Create Workflow</h5>
                <ul>
                    <li>Locate the workflow view in the admin section. Use the "Create Workflow" button to start your first workflow.</li>
                </ul>
                <p>Note: This is needed for creating engagements, and is what is used to manage the steps required to complete the engagement.</p>
            </div>
            `,
            target: document.querySelector('#app'),
            placement: "right",
            yOffset: 225,
            showNextButton: true,
        },
        {
            id: "Step Three",
            title: "Step Three",
            placement: "top",
            content: `
            <div class="addnew-img"></div>
            <div class="custom-bubble-guide">
            <h5>Start Engagement</h5>
                <ul>
                    <li>Use the "Add New" view to start your first engagement. At this time you will also have the ability to assign it to yourself or a team member.</li>
                    <li>Click "Start" on the engagement panel to begin the process of creating your first engagement!</li>
                </ul>
                <p>Note: This is not a requirement for getting started however it is the purpose of this tool. Please feel free to do this at anytime. Click done to continue the tour.</p>
            </div>
            <h6 class="continue">Click "Done" to continue tour</h6>
            `,
            target: document.querySelector('#app'),
            placement: "right",
            yOffset: 225,
            showNextButton: true
        },
    ],
    showPrevButton: true,
    showCloseButton: false,
    onEnd: function() {
        if(window.location.pathname != '/login') {
            init.nextTour(tour.default)
        }
    },
}

export default appSetup