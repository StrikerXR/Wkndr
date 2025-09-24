// Wait for the document to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {

    // Get references to the HTML elements
    const currentDateElement = document.getElementById('current-date');
    const tomorrowDateElement = document.getElementById('tomorrow-date');
    const weekendCountdownNumberElement = document.getElementById('weekend-countdown-number');
    const weekendCountdownTextElement = document.getElementById('weekend-countdown-text');
    const body = document.body;

    // --- Weather Integration Logic ---
    const API_KEY = 'bd5e378503939ddaee76f12ad7a97608'; // Replace with your actual API key
    const CITY_NAME = 'Broken Arrow';
    const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${CITY_NAME}&appid=${API_KEY}&units=imperial`;

    const fetchWeather = async () => {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error('Weather data not available.');
            }
            const data = await response.json();

            // Get references to the weather elements
            const weatherLocationElement = document.getElementById('weather-location');
            const weatherDescriptionElement = document.getElementById('weather-description');
            const weatherTemperatureElement = document.getElementById('weather-temperature');
            const weatherIconElement = document.getElementById('weather-icon');

            // Update the HTML with the weather data
            weatherLocationElement.textContent = data.name;
            weatherTemperatureElement.textContent = `${Math.round(data.main.temp)}°F`;
            weatherDescriptionElement.textContent = data.weather[0].description;

            // Set the weather icon based on the condition
            const weatherCondition = data.weather[0].main.toLowerCase();
            let icon = '☀️'; // Default icon

            if (weatherCondition.includes('cloud')) {
                icon = '☁️';
            } else if (weatherCondition.includes('rain')) {
                icon = '🌧️';
            } else if (weatherCondition.includes('clear')) {
                icon = '☀️';
            } else if (weatherCondition.includes('snow')) {
                icon = '❄️';
            } else if (weatherCondition.includes('thunderstorm')) {
                icon = '⛈️';
            } else if (weatherCondition.includes('wind')) {
                icon = '🌬️';
            }

            weatherIconElement.textContent = icon;

        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
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

    const formatDate = (date) => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    updateContent(); // Initial update
    setInterval(updateContent, 3600000); // Update content hourly for accuracy

    // Call the weather fetch function on page load
    fetchWeather();
});
