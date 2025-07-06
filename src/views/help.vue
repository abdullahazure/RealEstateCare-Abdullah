<template>
    <main class="container" aria-label="Getting Started">
            <router-link
                :to="{ name: 'home' }"
                class="btn btn-sm btn-danger"
                aria-label="Go Back">
                Go back
            </router-link>
        <h2 class="my-3" aria-label="Getting Started">Getting Started</h2>
        <ul class="list-group">
            <li class="list-group-item" aria-label="Log in with your provided email and password.">Log in with your provided email and password.</li>
            <li class="list-group-item" aria-label="Once logged in, you will be directed to the main dashboard.">Once logged in, you will be directed to the main dashboard.</li>
            <li class="list-group-item" aria-label="From here, you can access your scheduled inspections, completed inspections, the knowledge base and settings.">From here, you can access your scheduled inspections, completed inspections, the knowledge base and settings.</li>
        </ul>

        <h2 class="my-3" aria-label="Scheduled Inspections">Scheduled Inspections</h2>
        <ul class="list-group">
            <li class="list-group-item" aria-label="From the main dashboard, click on Scheduled Inspections to view a list of all the addresses that have been assigned to you.">From the main dashboard, click on "Scheduled Inspections" to view a list of all the addresses that have been assigned to you.</li>
            <li class="list-group-item" aria-label="Click on an address to view the list of inspections assigned to that address.">Click on an address to view the list of inspections assigned to that address.</li>
            <li class="list-group-item" aria-label="Click on an inspection to open it and begin filling in the information.">Click on an inspection to open it and begin filling in the information.</li>
            <li class="list-group-item" aria-label="You can take photos, add notes and complete multiple sections within an inspection.">You can take photos, add notes and complete multiple sections within an inspection.</li>
            <li class="list-group-item" aria-label="Once you have completed an inspection, you can submit it for review by your supervisor.">Once you have completed an inspection, you can submit it for review by your supervisor.</li>
        </ul>

        <h2 class="my-3" aria-label="Completed Inspections">Completed Inspections</h2>
        <ul class="list-group">
            <li class="list-group-item" aria-label="From the main dashboard, click on Completed Inspections to view a list of all the addresses that you have completed inspections for.">From the main dashboard, click on "Completed Inspections" to view a list of all the addresses that you have completed inspections for.</li>
            <li class="list-group-item" aria-label="Click on an address to view the list of inspections completed for that address.">Click on an address to view the list of inspections completed for that address.</li>
            <li class="list-group-item">Click on an inspection to view it, make edits or add additional information.</li>
        </ul>

        <h2 class="my-3" aria-label="Knowledge Base">Knowledge Base</h2>
        <ul class="list-group">
            <li class="list-group-item" aria-label="From the main dashboard, click on Knowledge Base to access a variety of helpful documents and resources.">From the main dashboard, click on "Knowledge Base" to access a variety of helpful documents and resources.</li>
            <li class="list-group-item" aria-label="Here you can find information on how to use the app, best practices for completing inspections, and other useful information.">Here you can find information on how to use the app, best practices for completing inspections, and other useful information.</li>
        </ul>

        <h2 class="my-3" aria-label="Settings">Settings</h2>
        <ul class="list-group">
            <li class="list-group-item" aria-label="From the main dashboard, click on Settings to access your profile information, change your password, and customize your notification preferences.">From the main dashboard, click on "Settings" to access your profile information, change your password, and customize your notification preferences.</li>
            <li class="list-group-item" aria-label="In the profile section, you can update your contact information and personal details.">In the profile section, you can update your contact information and personal details.</li>
            <li class="list-group-item" aria-label="In the password section, you can change your password for added security.">In the password section, you can change your password for added security.</li>
            <li class="list-group-item" aria-label="In the notifications section, you can turn on or off notifications for new inspections and completed inspections.">In the notifications section, you can turn on or off notifications for new inspections and completed inspections.</li>
        </ul>
    </main>
</template>