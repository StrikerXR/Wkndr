// Wait for the document to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {
    
    // Get references to the HTML elements we need to update
    const currentDateElement = document.getElementById('current-date');
    const tomorrowDateElement = document.getElementById('tomorrow-date');
    const weekendCountdownNumberElement = document.getElementById('weekend-countdown-number');
    const weekendCountdownTextElement = document.getElementById('weekend-countdown-text');

    // Function to format dates into a readable string (e.g., "Tuesday, September 23, 2025")
    const formatDate = (date) => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    // --- Core Logic ---

    // 1. Calculate and display the current date
    const today = new Date();
    currentDateElement.textContent = formatDate(today);

    // 2. Calculate and display tomorrow's date
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    tomorrowDateElement.textContent = formatDate(tomorrow);

    // 3. Calculate and display days until the weekend
    const currentDay = today.getDay(); // Sunday = 0, Monday = 1, ..., Saturday = 6

    let daysUntilWeekend;

    if (currentDay === 5) { // Friday
        daysUntilWeekend = 1;
        weekendCountdownNumberElement.textContent = daysUntilWeekend;
        weekendCountdownTextElement.textContent = "day until the weekend!";
    } else if (currentDay === 6) { // Saturday
        daysUntilWeekend = 0;
        weekendCountdownNumberElement.textContent = "🎉";
        weekendCountdownTextElement.textContent = "It's the weekend!";
    } else if (currentDay === 0) { // Sunday
        daysUntilWeekend = 0;
        weekendCountdownNumberElement.textContent = "😎";
        weekendCountdownTextElement.textContent = "Enjoy your weekend!";
    } else { // Monday to Thursday
        daysUntilWeekend = 5 - currentDay; // Days until Friday
        weekendCountdownNumberElement.textContent = daysUntilWeekend;
        weekendCountdownTextElement.textContent = daysUntilWeekend === 1 ? "day until the weekend" : "days until the weekend";
    }

});
