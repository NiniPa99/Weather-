/**
 * Weather Dashboard Logic
 * This file handles fetching weather data and updating the UI
 */

// Weather condition to icon mapping
const weatherIcons = {
    'Clear': 'fa-sun',
    'Clouds': 'fa-cloud',
    'Rain': 'fa-cloud-rain',
    'Drizzle': 'fa-cloud-rain',
    'Thunderstorm': 'fa-bolt',
    'Snow': 'fa-snowflake',
    'Mist': 'fa-smog',
    'Smoke': 'fa-smog',
    'Haze': 'fa-smog',
    'Dust': 'fa-smog',
    'Fog': 'fa-smog',
    'Sand': 'fa-smog',
    'Ash': 'fa-smog',
    'Squall': 'fa-wind',
    'Tornado': 'fa-wind'
};

// Weather condition to card color mapping (Bootstrap contextual classes)
const weatherColors = {
    'Clear': 'bg-warning bg-opacity-25',
    'Clouds': 'bg-secondary bg-opacity-25',
    'Rain': 'bg-info bg-opacity-25',
    'Drizzle': 'bg-info bg-opacity-25',
    'Thunderstorm': 'bg-dark bg-opacity-25',
    'Snow': 'bg-light bg-opacity-25',
    'Mist': 'bg-light bg-opacity-25',
    'Smoke': 'bg-secondary bg-opacity-25',
    'Haze': 'bg-secondary bg-opacity-25',
    'Dust': 'bg-warning bg-opacity-25',
    'Fog': 'bg-light bg-opacity-25',
    'Sand': 'bg-warning bg-opacity-25',
    'Ash': 'bg-secondary bg-opacity-25',
    'Squall': 'bg-secondary bg-opacity-25',
    'Tornado': 'bg-danger bg-opacity-25'
};

/**
 * Clear all weather cards except the user location card
 */
function clearWeatherCards() {
    const cardsContainer = document.getElementById('weather-cards');
    const userLocationCard = document.getElementById('user-location-card');
    
    // Store the user location card if it exists
    if (userLocationCard) {
        userLocationCard.remove(); // Temporarily remove it
    }
    
    // Clear all other cards
    cardsContainer.innerHTML = '';
    
    // Add back the user location card if it existed
    if (userLocationCard) {
        cardsContainer.appendChild(userLocationCard);
    }
}

/**
 * Initialize the weather dashboard with city cards
 * @param {Array} cities - List of cities to display
 */
function initWeatherDashboard(cities) {
    const cardsContainer = document.getElementById('weather-cards');
    const loadingMessage = document.getElementById('loading-message');
    const errorMessage = document.getElementById('error-message');
    
    // Clear the container except for user location card
    clearWeatherCards();
    
    // Create a card for each city (limit to 8 total)
    const limitedCities = cities.slice(0, 8);
    limitedCities.forEach((city, index) => {
        fetchCityWeather(city, index, limitedCities.length);
    });
    
    // Hide loading message after all cards are loaded or after timeout
    setTimeout(() => {
        loadingMessage.classList.add('d-none');
        
        // If no cards were created, show error
        if (cardsContainer.children.length === 0) {
            errorMessage.classList.remove('d-none');
            document.getElementById('error-text').textContent = 'No weather data could be loaded. Please try again later.';
        }
    }, 5000);
}

/**
 * Fetch weather data for a specific city
 * @param {string} city - City name
 * @param {number} index - City index (for staggered animations)
 * @param {number} total - Total number of cities (for grid sizing)
 */
function fetchCityWeather(city, index, total) {
    const cardsContainer = document.getElementById('weather-cards');
    const loadingMessage = document.getElementById('loading-message');
    const errorMessage = document.getElementById('error-message');
    
    // Create a column for the card
    const colSize = total <= 4 ? 'col-md-3' : 'col-md-4 col-lg-3 col-xl-2';
    const cardCol = document.createElement('div');
    cardCol.className = `col-sm-6 ${colSize} mb-4 weather-card-col`;
    cardCol.setAttribute('data-city', city);
    
    // Create a placeholder card
    cardCol.innerHTML = `
        <div class="card h-100 placeholder-glow">
            <div class="card-body text-center">
                <h3 class="card-title placeholder col-6 mx-auto"></h3>
                <div class="weather-icon my-3">
                    <i class="fas fa-circle-notch fa-spin fa-2x"></i>
                </div>
                <p class="card-text placeholder col-4 mx-auto"></p>
            </div>
        </div>
    `;
    
    // Add to the container
    cardsContainer.appendChild(cardCol);
    
    // Trigger entrance animation for the placeholder
    animateCardEntrance(cardCol, index);
    
    // Fetch the weather data from our API
    fetch(`/api/weather/${encodeURIComponent(city)}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Log the weather data for debugging
            console.log(`Weather data for ${city}:`, data);
            
            // Check if there's an error in the response
            if (data.error) {
                throw new Error(data.error);
            }
            
            // Hide loading message if this is the first card
            if (index === 0) {
                loadingMessage.classList.add('d-none');
            }
            
            // Add more detailed information if available
            if (data.description) {
                data.fullDescription = data.description;
            }
            
            // Add location information if available
            if (data.country) {
                data.fullLocation = `${data.city}, ${data.country}`;
            }
            
            // Update the card with real data
            updateWeatherCard(cardCol, data);
        })
        .catch(error => {
            console.error(`Error fetching weather for ${city}:`, error);
            
            // Update with error state
            updateWeatherCard(cardCol, {
                city: city,
                temp: '??',
                condition: 'Error',
                error: error.message || 'Could not load data'
            });
            
            // Show error message if this is the first card
            if (index === 0) {
                loadingMessage.classList.add('d-none');
                errorMessage.classList.remove('d-none');
                document.getElementById('error-text').textContent = `Error loading weather data: ${error.message}`;
            }
        });
}

/**
 * Helper function to get AQI status and color
 * @param {number} aqi - Air Quality Index value
 * @returns {Object} - Contains status text and Bootstrap color class
 */
function getAQIStatus(aqi) {
    if (aqi <= 50) {
        return { status: 'Good', color: 'success' };
    } else if (aqi <= 100) {
        return { status: 'Moderate', color: 'warning' };
    } else if (aqi <= 150) {
        return { status: 'Unhealthy for Sensitive Groups', color: 'warning' };
    } else if (aqi <= 200) {
        return { status: 'Unhealthy', color: 'danger' };
    } else if (aqi <= 300) {
        return { status: 'Very Unhealthy', color: 'danger' };
    } else {
        return { status: 'Hazardous', color: 'dark' };
    }
}

/**
 * Helper function to get UV status and color
 * @param {number} uv - UV Index value
 * @returns {Object} - Contains status text and Bootstrap color class
 */
function getUVStatus(uv) {
    if (uv <= 2) {
        return { status: 'Low', color: 'success' };
    } else if (uv <= 5) {
        return { status: 'Moderate', color: 'warning' };
    } else if (uv <= 7) {
        return { status: 'High', color: 'warning' };
    } else if (uv <= 10) {
        return { status: 'Very High', color: 'danger' };
    } else {
        return { status: 'Extreme', color: 'dark' };
    }
}

/**
 * Update a weather card with data
 * @param {HTMLElement} cardCol - The card column element
 * @param {Object} data - Weather data
 * @param {boolean} isUserLocation - Whether this is the user's location card
 */
function updateWeatherCard(cardCol, data, isUserLocation = false) {
    // Get appropriate icon class for the weather condition
    const iconClass = data.condition && weatherIcons[data.condition] 
        ? weatherIcons[data.condition] 
        : 'fa-question';
    
    // Get appropriate background class for the weather condition
    const bgClass = data.condition && weatherColors[data.condition]
        ? weatherColors[data.condition]
        : '';
    
    // Add special class for user's location card
    const locationClass = isUserLocation ? 'my-location-card' : '';
    
    // Process air quality and UV data if available
    let aqiInfo = { status: 'Unknown', color: 'secondary' };
    let uvInfo = { status: 'Unknown', color: 'secondary' };
    
    if (data.aqi !== undefined) {
        aqiInfo = getAQIStatus(data.aqi);
    }
    
    if (data.uv !== undefined) {
        uvInfo = getUVStatus(data.uv);
    }
    
    // Create card content
    let cardHTML = `
        <div class="card h-100 ${bgClass} shadow ${locationClass}">
            <div class="card-body text-center">
                <h3 class="card-title">${data.city}</h3>
                <div class="weather-icon my-3">
                    <i class="fas ${iconClass} fa-2x weather-icon"></i>
                </div>
                <p class="card-text">${data.fullDescription || data.condition}, ${data.temp}°C</p>
                
                <!-- Additional weather details if available -->
                ${data.humidity !== undefined ? `
                <div class="weather-details small mt-2">
                    <span title="Humidity"><i class="fas fa-tint me-1"></i>${data.humidity}%</span>
                    ${data.wind_speed !== undefined ? `
                    <span class="ms-2" title="Wind Speed"><i class="fas fa-wind me-1"></i>${data.wind_speed} km/h</span>
                    ` : ''}
                </div>
                ` : ''}
    `;
    
    // Add location badge if this is the user's location
    if (isUserLocation) {
        cardHTML += `
                <span class="badge bg-info mb-2">Your Location</span>
        `;
    }
    
    // Add Air Quality widget
    if (data.aqi !== undefined) {
        cardHTML += `
                <div class="air-quality-widget mt-3">
                    <h6 class="widget-title"><i class="fas fa-wind me-1"></i> Air Quality</h6>
                    <div class="progress" style="height: 8px;" title="AQI: ${data.aqi} - ${aqiInfo.status}">
                        <div class="progress-bar bg-${aqiInfo.color}" role="progressbar" 
                            style="width: ${Math.min(100, data.aqi / 3)}%;" 
                            aria-valuenow="${data.aqi}" aria-valuemin="0" aria-valuemax="300"></div>
                    </div>
                    <div class="d-flex justify-content-between mt-1">
                        <small>${data.aqi} AQI</small>
                        <small class="text-${aqiInfo.color}">${aqiInfo.status}</small>
                    </div>
                </div>
        `;
    }
    
    // Add UV Index widget
    if (data.uv !== undefined) {
        cardHTML += `
                <div class="uv-index-widget mt-3">
                    <h6 class="widget-title"><i class="fas fa-sun me-1"></i> UV Index</h6>
                    <div class="progress" style="height: 8px;" title="UV: ${data.uv} - ${uvInfo.status}">
                        <div class="progress-bar bg-${uvInfo.color}" role="progressbar" 
                            style="width: ${Math.min(100, data.uv * 9)}%;" 
                            aria-valuenow="${data.uv}" aria-valuemin="0" aria-valuemax="11"></div>
                    </div>
                    <div class="d-flex justify-content-between mt-1">
                        <small>${data.uv} UV</small>
                        <small class="text-${uvInfo.color}">${uvInfo.status}</small>
                    </div>
                </div>
        `;
    }
    
    // Add error message if present
    if (data.error) {
        cardHTML += `
                <div class="alert alert-danger mt-2 small p-1">
                    <small>${data.error}</small>
                </div>
        `;
    }
    
    cardHTML += `
            </div>
    `;
    
    // Add rain animation for rainy conditions
    if (data.condition === 'Rain' || data.condition === 'Drizzle') {
        cardHTML += `
            <div class="rain-container">
                ${createRainDrops(20)}
            </div>
        `;
    }
    
    // Add snow animation for snow conditions
    if (data.condition === 'Snow') {
        cardHTML += `
            <div class="snow-container">
                ${createSnowflakes(30)}
            </div>
        `;
    }
    
    // Add sunny animation for clear conditions
    if (data.condition === 'Clear' || data.condition === 'Sunny') {
        cardHTML += `
            <div class="sun-container">
                ${createSunAnimation()}
            </div>
        `;
    }
    
    cardHTML += `</div>`;
    
    // Update the card
    cardCol.innerHTML = cardHTML;
    
    // Start animations
    if (data.condition === 'Rain' || data.condition === 'Drizzle') {
        animateRain(cardCol);
    }
    
    if (data.condition === 'Snow') {
        animateSnow(cardCol);
    }
    
    if (data.condition === 'Clear' || data.condition === 'Sunny') {
        animateSun(cardCol);
    }
    
    // Animate the card update
    animateCardUpdate(cardCol);
}

/**
 * Create HTML for rain drops
 * @param {number} count - Number of raindrops to create
 * @returns {string} HTML string with raindrops
 */
function createRainDrops(count) {
    let drops = '';
    for (let i = 0; i < count; i++) {
        const left = Math.floor(Math.random() * 100); // Position horizontally
        const delay = Math.random() * 2; // Random delay for staggered effect
        const opacity = 0.2 + Math.random() * 0.4; // Random opacity
        
        drops += `<div class="rain-drop" style="left: ${left}%; opacity: ${opacity};"></div>`;
    }
    return drops;
}

/**
 * Create HTML for snowflakes
 * @param {number} count - Number of snowflakes to create
 * @returns {string} HTML string with snowflakes
 */
function createSnowflakes(count) {
    let flakes = '';
    for (let i = 0; i < count; i++) {
        const left = Math.floor(Math.random() * 100); // Position horizontally
        const delay = Math.random() * 4; // Random delay for staggered effect
        const size = 2 + Math.random() * 3; // Random size
        
        flakes += `<div class="snow-flake" style="left: ${left}%; width: ${size}px; height: ${size}px;"></div>`;
    }
    return flakes;
}

/**
 * Animate rain drops
 * @param {HTMLElement} cardElement - The card element containing raindrops
 */
function animateRain(cardElement) {
    const raindrops = cardElement.querySelectorAll('.rain-drop');
    
    raindrops.forEach((drop, index) => {
        const delay = Math.random() * 2;
        const duration = 0.7 + Math.random() * 0.5;
        
        gsap.set(drop, { y: -50 - (index % 10) * 15 });
        
        gsap.to(drop, {
            y: 300,
            duration: duration,
            delay: delay,
            ease: "none",
            repeat: -1
        });
    });
}

/**
 * Animate snowflakes
 * @param {HTMLElement} cardElement - The card element containing snowflakes
 */
function animateSnow(cardElement) {
    const snowflakes = cardElement.querySelectorAll('.snow-flake');
    
    snowflakes.forEach((flake, index) => {
        const delay = Math.random() * 3;
        const duration = 3 + Math.random() * 2;
        
        gsap.set(flake, { y: -20 - (index % 10) * 15, x: 0 });
        
        gsap.to(flake, {
            y: 300,
            x: (Math.random() > 0.5 ? '+=' : '-=') + Math.random() * 50,
            rotation: Math.random() * 360,
            duration: duration,
            delay: delay,
            ease: "power1.in",
            repeat: -1
        });
    });
}

/**
 * Create HTML for sun animation
 * @returns {string} HTML string with sun and rays
 */
function createSunAnimation() {
    let html = `<div class="sun"></div>`;
    
    // Add 8 rays around the sun (4 straight, 4 diagonal)
    const rayPositions = [
        { top: '20px', left: '-10px', class: 'sun-ray-horizontal' },  // Left
        { top: '20px', right: '-10px', class: 'sun-ray-horizontal' }, // Right
        { top: '-10px', left: '20px', class: 'sun-ray-vertical' },    // Top
        { bottom: '-10px', left: '20px', class: 'sun-ray-vertical' }, // Bottom
        
        // Diagonal rays
        { top: '5px', left: '5px', rotate: '-45deg', class: 'sun-ray-diagonal' },
        { top: '5px', right: '5px', rotate: '-135deg', class: 'sun-ray-diagonal' },
        { bottom: '5px', left: '5px', rotate: '45deg', class: 'sun-ray-diagonal' },
        { bottom: '5px', right: '5px', rotate: '135deg', class: 'sun-ray-diagonal' }
    ];
    
    rayPositions.forEach(pos => {
        let style = '';
        for (const [key, value] of Object.entries(pos)) {
            if (key !== 'class' && key !== 'rotate') {
                style += `${key}: ${value}; `;
            }
        }
        
        if (pos.rotate) {
            style += `transform: rotate(${pos.rotate}); `;
        }
        
        html += `<div class="sun-ray ${pos.class}" style="${style}"></div>`;
    });
    
    return html;
}

/**
 * Animate sun and rays
 * @param {HTMLElement} cardElement - The card element containing the sun animation
 */
function animateSun(cardElement) {
    const sun = cardElement.querySelector('.sun');
    const rays = cardElement.querySelectorAll('.sun-ray');
    
    // Animate the sun with a pulsing effect
    gsap.to(sun, {
        duration: 2,
        scale: 1.1,
        boxShadow: '0 0 30px rgba(255, 193, 7, 0.8)',
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });
    
    // Animate the rays with a different pulsing effect
    rays.forEach((ray, index) => {
        const delay = index * 0.1;
        gsap.to(ray, {
            duration: 1.5,
            opacity: 1,
            repeat: -1,
            yoyo: true,
            delay: delay,
            ease: "sine.inOut"
        });
    });
}

/**
 * Use geolocation to get user's current location and nearby cities
 */
function getUserLocation() {
    // Show loading indicator
    const loadingMessage = document.getElementById('loading-message');
    loadingMessage.classList.remove('d-none');
    loadingMessage.innerHTML = '<i class="fas fa-map-marker-alt me-2"></i> Getting your location...';
    
    // Clear any existing cards except user location card
    clearWeatherCards();
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                // Show location found message
                loadingMessage.innerHTML = '<i class="fas fa-check-circle me-2"></i> Location found! Fetching weather...';
                
                // Get the coordinates
                const lat = position.coords.latitude.toFixed(4);
                const lon = position.coords.longitude.toFixed(4);
                
                // Fetch weather data from our API using coordinates
                fetch(`/api/geolocation?lat=${lat}&lon=${lon}`)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`HTTP error! Status: ${response.status}`);
                        }
                        return response.json();
                    })
                    .then(data => {
                        // Log the weather data for debugging
                        console.log(`Weather data for location (${lat},${lon}):`, data);
                        
                        // Check if there's an error in the response
                        if (data.error) {
                            throw new Error(data.error);
                        }
                        
                        // Hide loading message
                        loadingMessage.classList.add('d-none');
                        
                        // Add the user location card at the top
                        addUserLocationCard(data);
                        
                        // Get nearby cities and display their weather
                        if (data.nearby_cities && data.nearby_cities.length > 0) {
                            // Update loading message
                            loadingMessage.classList.remove('d-none');
                            loadingMessage.innerHTML = '<i class="fas fa-globe me-2"></i> Getting nearby cities weather...';
                            
                            // Only take the first 3 cities to limit API calls
                            const nearbyCities = data.nearby_cities.slice(0, 3);
                            
                            // Create cards for nearby cities
                            nearbyCities.forEach((city, index) => {
                                fetchCityWeather(city, index + 1, nearbyCities.length);
                            });
                            
                            // Hide loading message after some time
                            setTimeout(() => {
                                loadingMessage.classList.add('d-none');
                            }, 3000);
                        }
                    })
                    .catch(error => {
                        console.error(`Error fetching weather for location:`, error);
                        
                        // Hide loading message
                        loadingMessage.classList.add('d-none');
                        
                        // Show error message
                        const errorMessage = document.getElementById('error-message');
                        errorMessage.classList.remove('d-none');
                        document.getElementById('error-text').textContent = `Error getting weather for your location: ${error.message}`;
                        
                        // Hide error after 5 seconds
                        setTimeout(() => {
                            errorMessage.classList.add('d-none');
                        }, 5000);
                    });
            },
            (error) => {
                // Error handling
                loadingMessage.classList.add('d-none');
                const errorMessage = document.getElementById('error-message');
                errorMessage.classList.remove('d-none');
                
                let errorText = 'Unable to get your location';
                switch(error.code) {
                    case error.PERMISSION_DENIED:
                        errorText = 'Location access was denied. Please allow location access and try again.';
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorText = 'Location information is unavailable. Please try again later.';
                        break;
                    case error.TIMEOUT:
                        errorText = 'Location request timed out. Please try again.';
                        break;
                }
                
                document.getElementById('error-text').textContent = errorText;
                
                // Hide error after 5 seconds
                setTimeout(() => {
                    errorMessage.classList.add('d-none');
                }, 5000);
            }
        );
    } else {
        // Browser doesn't support geolocation
        loadingMessage.classList.add('d-none');
        const errorMessage = document.getElementById('error-message');
        errorMessage.classList.remove('d-none');
        document.getElementById('error-text').textContent = 'Geolocation is not supported by your browser.';
        
        // Hide error after 5 seconds
        setTimeout(() => {
            errorMessage.classList.add('d-none');
        }, 5000);
    }
}

/**
 * Add user location card to the top of the dashboard
 * @param {Object} weatherData - Weather data for user's location
 */
function addUserLocationCard(weatherData) {
    const cardsContainer = document.getElementById('weather-cards');
    
    // Create a new card column for the user's location
    const locationCardCol = document.createElement('div');
    locationCardCol.className = 'col-sm-6 col-md-4 col-lg-3 col-xl-2 mb-4 weather-card-col';
    locationCardCol.setAttribute('data-city', 'user-location');
    locationCardCol.id = 'user-location-card';
    
    // Update the card with location data
    updateWeatherCard(locationCardCol, weatherData, true);
    
    // If user location card already exists, replace it
    const existingLocationCard = document.getElementById('user-location-card');
    if (existingLocationCard) {
        cardsContainer.replaceChild(locationCardCol, existingLocationCard);
    } else {
        // Otherwise, add it to the beginning
        cardsContainer.insertBefore(locationCardCol, cardsContainer.firstChild);
    }
    
    // Create special animation timeline just for the user location card
    const tl = gsap.timeline();
    
    // First set initial state
    gsap.set(locationCardCol, {
        opacity: 0,
        scale: 0.01, // Start even smaller than regular cards
        transformOrigin: "center center",
        filter: "blur(15px)"
    });
    
    // Create extra particles for more dramatic effect
    const particles = createBlowOutParticles(locationCardCol, 30);
    
    // Create a dramatic flash effect
    const flash = document.createElement('div');
    flash.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: white;
        border-radius: 15px;
        opacity: 0;
        z-index: 5;
    `;
    locationCardCol.appendChild(flash);
    
    // Flash animation first
    tl.to(flash, {
        opacity: 0.9,
        duration: 0.2,
        ease: "power1.in"
    });
    
    tl.to(flash, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.out"
    }, "+=0.1");
    
    // Blow out the card with more dramatic effect
    tl.to(locationCardCol, {
        opacity: 1,
        scale: 1.3, // Bigger overshoot for special effect
        filter: "blur(0px)",
        duration: 0.5,
        ease: "power4.out", 
        onStart: function() {
            const card = locationCardCol.querySelector('.card');
            gsap.set(card, {
                boxShadow: "0 0 60px rgba(13, 202, 240, 1)" // Info color glow
            });
            
            // Play a subtle "pop" sound (optional - would need to be added to the project)
            // const popSound = new Audio('/static/sounds/pop.mp3');
            // popSound.volume = 0.3;
            // popSound.play();
        }
    }, "-=0.2");
    
    // Animate particles with more dramatic outward burst
    particles.forEach(particle => {
        const angle = Math.random() * Math.PI * 2;
        const distance = 150 + Math.random() * 200; // Longer distance
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        
        gsap.to(particle, {
            x: tx,
            y: ty,
            opacity: 0.9,
            duration: 0.3,
            ease: "power2.out",
            delay: tl.recent().startTime,
            onComplete: function() {
                gsap.to(particle, {
                    opacity: 0,
                    duration: 0.4,
                    ease: "power1.in"
                });
            }
        });
    });
    
    // Settle back to normal size with more dramatic elastic bounce
    tl.to(locationCardCol, {
        scale: 1,
        duration: 0.7,
        ease: "elastic.out(1.2, 0.3)", // More pronounced elastic effect
        onComplete: function() {
            gsap.to(locationCardCol.querySelector('.card'), {
                boxShadow: "0 0 20px rgba(13, 202, 240, 0.5)",
                duration: 0.8,
                repeat: 1,
                yoyo: true,
                ease: "sine.inOut",
                onComplete: function() {
                    // Clean up
                    setTimeout(() => {
                        const container = locationCardCol.querySelector('.particle-container');
                        if (container) container.remove();
                        if (flash) flash.remove();
                    }, 1000);
                }
            });
        }
    }, "-=0.1");
}
