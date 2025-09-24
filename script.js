// Wait for the document to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    
    // --- Get references to HTML elements ---
    const currentDateElement = document.getElementById('current-date');
    const tomorrowDateElement = document.getElementById('tomorrow-date');
    const countdownWrapper = document.getElementById('countdown-wrapper');
    const weekendCountdownNumberElement = document.getElementById('weekend-countdown-number');
    const weekendCountdownTextElement = document.getElementById('weekend-countdown-text');
    const aboutBtn = document.getElementById('about-btn');
    const aboutDialog = document.getElementById('about-dialog');
    const closeDialogBtn = document.getElementById('close-dialog-btn');

    const TIMEZONE = 'America/Chicago'; // Central Time for Broken Arrow, OK

    // --- Modern async function to fetch time and update UI ---
    const initializeTracker = async () => {
        try {
            // Fetch data from the WorldTimeAPI
            const response = await fetch(`http://worldtimeapi.org/api/timezone/${TIMEZONE}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();

            // Create a Date object from the server's ISO 8601 datetime string
            // This is the key to ignoring the system clock!
            const today = new Date(data.datetime);

            // --- Update UI with fetched data ---
            updateDates(today);
            updateWeekendCountdown(today);

        } catch (error) {
            console.error('Failed to fetch time:', error);
            currentDateElement.textContent = 'Error syncing time.';
        }
    };

    // Helper function to format dates
    const formatDate = (date) => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    // Function to update the date cards
    const updateDates = (today) => {
        currentDateElement.textContent = formatDate(today);
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        tomorrowDateElement.textContent = formatDate(tomorrow);
    };

    // Function to update the weekend countdown
    const updateWeekendCountdown = (today) => {
        const currentDay = today.getDay(); // Sunday = 0, ..., Saturday = 6

        // Add this class for the :has() CSS selector
        const addWeekendGlow = () => {
            weekendCountdownNumberElement.classList.add('weekend-emoji');
        };

        if (currentDay === 5) { // Friday
            weekendCountdownNumberElement.textContent = '1';
            weekendCountdownTextElement.textContent = "day until the weekend!";
        } else if (currentDay === 6 || currentDay === 0) { // Saturday or Sunday
            weekendCountdownNumberElement.textContent = currentDay === 6 ? "🎉" : "😎";
            weekendCountdownTextElement.textContent = "It's the weekend!";
            addWeekendGlow(); // Activate the special style
        } else { // Monday to Thursday
            const daysUntilFriday = 5 - currentDay;
            weekendCountdownNumberElement.textContent = daysUntilFriday;
            weekendCountdownTextElement.textContent = daysUntilFriday === 1 ? "day until the weekend" : "days until the weekend";
        }
    };

    // --- Event Listeners for the Dialog ---
    aboutBtn.addEventListener('click', () => {
        aboutDialog.showModal(); // Native browser API to show the dialog
    });

    closeDialogBtn.addEventListener('click', () => {
        aboutDialog.close(); // Native browser API to close the dialog
    });

    // --- Start the app ---
    initializeTracker();
});
                          
