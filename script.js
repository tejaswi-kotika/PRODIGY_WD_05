const apiKey = 'b60591ab77e416fa0ef96921292f9fce';  // Replace with your OpenWeatherMap API key

// Fetch Weather by City Name
async function getWeatherByCity() {
    const city = document.getElementById('city').value;
    if (!city) {
        alert('Please enter a city name.');
        return;
    }
    fetchWeather(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
}

// Fetch Weather by User's Location
function getWeatherByLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            fetchWeather(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`);
        }, () => {
            alert('Unable to access location. Please enable location services.');
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
}

// Fetch Data from API
async function fetchWeather(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod !== 200) {
            alert('City not found.');
            return;
        }

        displayWeather(data);
    } catch (error) {
        alert('Error fetching weather data.');
    }
}

// Display Weather Data
function displayWeather(data) {
    document.getElementById('location-name').textContent = data.name;
    document.getElementById('temperature').textContent = Math.round(data.main.temp);
    document.getElementById('weather-description').textContent = data.weather[0].description;
    document.getElementById('humidity').textContent = data.main.humidity;
    document.getElementById('wind-speed').textContent = data.wind.speed;

    document.getElementById('weather-info').style.display = 'block';
}
