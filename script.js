document.addEventListener('DOMContentLoaded', () => {
    // Get references to the HTML elements
    const currentDateElement = document.getElementById('current-date');
    const tomorrowDateElement = document.getElementById('tomorrow-date');
    const weekendCountdownNumberElement = document.getElementById('weekend-countdown-number');
    const weekendCountdownTextElement = document.getElementById('weekend-countdown-text');
    const body = document.body;

    // Function to format dates
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

        // Bug Fix: Correctly calculate days for Sunday and Saturday
        if (currentDay === 6 || currentDay === 0) {
            // Saturday or Sunday
            weekendCountdownNumberElement.textContent = "🎉";
            weekendCountdownTextElement.textContent = "It's the weekend!";
        } else {
            // Monday to Friday
            // This is the correct way to handle Friday, since 5-5 = 0
            // Bug Fix: Correctly calculate Friday
            daysUntilWeekend = 5 - currentDay;
            weekendCountdownNumberElement.textContent = daysUntilWeekend;
            weekendCountdownTextElement.textContent = daysUntilWeekend === 1 ? "day until the weekend" : "days until the weekend";
        }
    };

    updateContent(); // Initial update
    setInterval(updateContent, 3600000); // Update content hourly for accuracy
});
