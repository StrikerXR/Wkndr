// Wait for the document to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {

    // Get references to the HTML elements we need to update
    const currentDateElement = document.getElementById('current-date');
    const tomorrowDateElement = document.getElementById('tomorrow-date');
    const weekendCountdownNumberElement = document.getElementById('weekend-countdown-number');
    const weekendCountdownTextElement = document.getElementById('weekend-countdown-text');
    const body = document.body;

    // Function to format dates into a readable string (e.g., "Tuesday, September 23, 2025")
    const formatDate = (date) => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    // --- Dynamic Background Logic ---
    const updateBackground = () => {
        const hour = new Date().getHours();
        if (hour >= 6 && hour < 18) {
            // Daytime (6am to 5:59pm)
            body.style.setProperty('--current-gradient', 'var(--day-gradient)');
        } else if (hour >= 18 && hour < 21) {
            // Sunset (6pm to 8:59pm)
            body.style.setProperty('--current-gradient', 'var(--sunset-gradient)');
        } else {
            // Nighttime (9pm to 5:59am)
            body.style.setProperty('--current-gradient', 'var(--night-gradient)');
        }
    };

    // Run on page load and every minute
    updateBackground();
    setInterval(updateBackground, 60000); // 60000 milliseconds = 1 minute

    // --- Core Logic (Bug Fixes & Refinements) ---
    const updateContent = () => {
        const today = new Date();
        currentDateElement.textContent = formatDate(today);

        const tomorrow = new Date();
        tomorrow.setDate(today.getDate() + 1);
        tomorrowDateElement.textContent = formatDate(tomorrow);

        const currentDay = today.getDay(); // Sunday = 0, Monday = 1, ..., Saturday = 6

        let daysUntilWeekend;

        if (currentDay === 6 || currentDay === 0) {
            // Saturday or Sunday
            weekendCountdownNumberElement.textContent = "🎉";
            weekendCountdownTextElement.textContent = "It's the weekend!";
        } else {
            // Monday to Friday
            daysUntilWeekend = 5 - currentDay;
            weekendCountdownNumberElement.textContent = daysUntilWeekend;
            weekendCountdownTextElement.textContent = daysUntilWeekend === 1 ? "day until the weekend" : "days until the weekend";
        }
    };

    updateContent(); // Initial update
    setInterval(updateContent, 3600000); // Update content hourly for accuracy
});
