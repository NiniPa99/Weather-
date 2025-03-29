import os
import requests
import logging
import json
from flask import Flask, render_template, jsonify, request

# Set up logging for easier debugging
logging.basicConfig(level=logging.DEBUG)

# Create the app
app = Flask(__name__)
app.secret_key = os.environ.get("SESSION_SECRET")

# Get Weatherstack API key from environment
WEATHERSTACK_API_KEY = os.environ.get("WEATHERSTACK_API_KEY")
WEATHERSTACK_BASE_URL = "http://api.weatherstack.com/current"

# Default cities to display (limited to 8)
DEFAULT_CITIES = [
    "London", "Paris", "Berlin", "Rome",
    "New York", "Tokyo", "Sydney", "Dubai"
]

@app.route('/')
def index():
    """Render the main page"""
    return render_template('index.html', cities=DEFAULT_CITIES)

# Map Weatherstack weather descriptions to our condition categories
def map_condition(weather_description):
    """Map Weatherstack weather descriptions to our condition categories"""
    description = weather_description.lower()
    
    if any(term in description for term in ['clear', 'sunny']):
        return 'Clear'
    elif any(term in description for term in ['cloud', 'overcast']):
        return 'Clouds'
    elif any(term in description for term in ['rain', 'drizzle', 'shower']):
        return 'Rain'
    elif any(term in description for term in ['snow', 'sleet', 'blizzard']):
        return 'Snow'
    elif any(term in description for term in ['thunder', 'lightning', 'storm']):
        return 'Thunderstorm'
    elif any(term in description for term in ['fog', 'mist', 'haze']):
        return 'Mist'
    else:
        return 'Clear'  # Default if no match

# Calculate Air Quality Index from components
def calculate_aqi(air_quality):
    """Calculate a simplified Air Quality Index from components"""
    if not air_quality:
        return 50  # Default moderate value if not available
    
    # Extract values and convert to float
    try:
        pm2_5 = float(air_quality.get('pm2_5', 0))
        pm10 = float(air_quality.get('pm10', 0))
        no2 = float(air_quality.get('no2', 0))
        o3 = float(air_quality.get('o3', 0))
        
        # Simplified calculation based on components
        # Actual AQI calculation is more complex, this is a simplified version
        aqi = (pm2_5 * 5) + (pm10 * 0.5) + (no2 * 0.6) + (o3 * 0.3)
        return min(int(aqi), 300)  # Cap at 300
    except (ValueError, TypeError):
        return 50  # Default value if calculation fails

# Calculate UV index based on conditions
def estimate_uv_index(visibility, cloudcover, is_day):
    """Estimate UV index based on available data"""
    if is_day == "no":
        return 0  # Nighttime has 0 UV
    
    # Base UV on clear day
    base_uv = 7
    
    # Adjust for cloud cover (0-100)
    cloud_factor = 1 - (float(cloudcover) / 100)
    
    # Adjust for visibility (0-10)
    visibility_factor = float(visibility) / 10
    
    # Calculate estimated UV
    estimated_uv = int(base_uv * cloud_factor * visibility_factor)
    
    # Ensure UV is in valid range
    return max(0, min(11, estimated_uv))

@app.route('/api/weather/<city>')
def get_weather(city):
    """Get real-time weather data for a specific city using Weatherstack API"""
    if not WEATHERSTACK_API_KEY:
        return jsonify({
            'error': 'Weatherstack API key not configured'
        }), 500
    
    # Log the API request
    logging.debug(f"Fetching weather data for {city}")
    
    try:
        # Make request to Weatherstack API
        params = {
            'access_key': WEATHERSTACK_API_KEY,
            'query': city
        }
        
        response = requests.get(WEATHERSTACK_BASE_URL, params=params)
        data = response.json()
        
        # Log the response for debugging
        logging.debug(f"Weatherstack API response for {city}: {json.dumps(data)}")
        
        # Check for errors in the API response
        if 'error' in data:
            logging.error(f"Weatherstack API error: {data['error']['info']}")
            return jsonify({
                'city': city,
                'error': f"Weather API error: {data['error']['info']}"
            }), 500
            
        # Extract the needed data
        current = data.get('current', {})
        location = data.get('location', {})
        
        # Get the main weather description
        weather_descriptions = current.get('weather_descriptions', [])
        weather_description = weather_descriptions[0] if weather_descriptions else "Unknown"
        
        # Map to our condition categories
        condition = map_condition(weather_description)
        
        # Get temperature
        temperature = current.get('temperature', 0)
        
        # Extract air quality data if available
        air_quality = current.get('air_quality', {})
        aqi = calculate_aqi(air_quality)
        
        # Estimate UV index based on available data
        uv_index = current.get('uv_index', None)
        if uv_index is None:
            # If UV index not provided, estimate it
            cloudcover = current.get('cloudcover', 50)
            visibility = current.get('visibility', 5)
            is_day = current.get('is_day', 'yes')
            uv_index = estimate_uv_index(visibility, cloudcover, is_day)
        
        # Prepare the response
        weather_data = {
            'city': location.get('name', city),
            'temp': temperature,
            'condition': condition,
            'aqi': aqi,
            'uv': uv_index,
            'description': weather_description,
            'humidity': current.get('humidity', 0),
            'wind_speed': current.get('wind_speed', 0),
            'wind_dir': current.get('wind_dir', 'N'),
            'country': location.get('country', '')
        }
        
        return jsonify(weather_data)
        
    except Exception as e:
        logging.error(f"Error fetching weather data for {city}: {str(e)}")
        return jsonify({
            'city': city,
            'error': f"Unable to fetch weather data: {str(e)}"
        }), 500

# Function to get nearby cities based on coordinates
def get_nearby_cities(lat, lon, country):
    """Get nearby cities based on user's location coordinates and country"""
    # Define nearby cities for different regions
    nearby_cities_by_region = {
        # Europe
        'United Kingdom': ['London', 'Manchester', 'Edinburgh', 'Birmingham'],
        'France': ['Paris', 'Lyon', 'Marseille', 'Nice'],
        'Germany': ['Berlin', 'Munich', 'Hamburg', 'Frankfurt'],
        'Italy': ['Rome', 'Milan', 'Venice', 'Florence'],
        'Spain': ['Madrid', 'Barcelona', 'Valencia', 'Seville'],
        'Serbia': ['Belgrade', 'Novi Sad', 'Niš', 'Kragujevac'],
        
        # North America
        'United States of America': ['New York', 'Los Angeles', 'Chicago', 'Miami'],
        'Canada': ['Toronto', 'Vancouver', 'Montreal', 'Calgary'],
        'Mexico': ['Mexico City', 'Cancun', 'Guadalajara', 'Monterrey'],
        
        # Asia
        'Japan': ['Tokyo', 'Osaka', 'Kyoto', 'Sapporo'],
        'China': ['Beijing', 'Shanghai', 'Hong Kong', 'Guangzhou'],
        'India': ['Mumbai', 'New Delhi', 'Bangalore', 'Chennai'],
        
        # Australia & Oceania
        'Australia': ['Sydney', 'Melbourne', 'Brisbane', 'Perth'],
        'New Zealand': ['Auckland', 'Wellington', 'Christchurch', 'Queenstown'],
        
        # Middle East
        'United Arab Emirates': ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman'],
        
        # Default list for other countries
        'default': ['London', 'New York', 'Tokyo', 'Sydney']
    }
    
    # Return appropriate nearby cities list based on country
    return nearby_cities_by_region.get(country, nearby_cities_by_region['default'])

@app.route('/api/geolocation')
def get_geolocation_weather():
    """Get weather for coordinates provided by client-side geolocation"""
    lat = request.args.get('lat')
    lon = request.args.get('lon')
    
    if not lat or not lon:
        return jsonify({'error': 'Latitude and longitude are required'}), 400
    
    # Create a query string with coordinates
    query = f"{lat},{lon}"
    
    try:
        # Make request to Weatherstack API
        params = {
            'access_key': WEATHERSTACK_API_KEY,
            'query': query
        }
        
        response = requests.get(WEATHERSTACK_BASE_URL, params=params)
        data = response.json()
        
        # Check for errors in the API response
        if 'error' in data:
            logging.error(f"Weatherstack API error: {data['error']['info']}")
            return jsonify({
                'error': f"Weather API error: {data['error']['info']}"
            }), 500
            
        # Extract the needed data
        current = data.get('current', {})
        location = data.get('location', {})
        
        # Get the main weather description
        weather_descriptions = current.get('weather_descriptions', [])
        weather_description = weather_descriptions[0] if weather_descriptions else "Unknown"
        
        # Map to our condition categories
        condition = map_condition(weather_description)
        
        # Get temperature
        temperature = current.get('temperature', 0)
        
        # Extract air quality data if available
        air_quality = current.get('air_quality', {})
        aqi = calculate_aqi(air_quality)
        
        # Estimate UV index based on available data
        uv_index = current.get('uv_index', None)
        if uv_index is None:
            # If UV index not provided, estimate it
            cloudcover = current.get('cloudcover', 50)
            visibility = current.get('visibility', 5)
            is_day = current.get('is_day', 'yes')
            uv_index = estimate_uv_index(visibility, cloudcover, is_day)
        
        # Format location name
        country = location.get('country', '')
        city_name = location.get('name', 'Unknown')
        location_name = f"{city_name}, {country}"
        
        # Get nearby cities based on current location
        nearby_cities = get_nearby_cities(lat, lon, country)
        
        # Prepare the response
        weather_data = {
            'city': location_name,
            'temp': temperature,
            'condition': condition,
            'aqi': aqi,
            'uv': uv_index,
            'description': weather_description,
            'humidity': current.get('humidity', 0),
            'wind_speed': current.get('wind_speed', 0),
            'wind_dir': current.get('wind_dir', 'N'),
            'nearby_cities': nearby_cities,
            'lat': lat,
            'lon': lon
        }
        
        return jsonify(weather_data)
        
    except Exception as e:
        logging.error(f"Error fetching weather data for coordinates: {str(e)}")
        return jsonify({
            'error': f"Unable to fetch weather data: {str(e)}"
        }), 500

@app.route('/api/nearby')
def get_nearby_cities_weather():
    """Get weather for cities near the user's location"""
    lat = request.args.get('lat')
    lon = request.args.get('lon')
    cities = request.args.get('cities', '').split(',')
    
    if not lat or not lon or not cities:
        return jsonify({'error': 'Latitude, longitude and cities are required'}), 400
    
    # Limit to max 3 nearby cities
    cities = cities[:3]
    
    # Collect weather data for each nearby city
    nearby_data = []
    for city in cities:
        try:
            # Make request to Weatherstack API
            params = {
                'access_key': WEATHERSTACK_API_KEY,
                'query': city.strip()
            }
            
            response = requests.get(WEATHERSTACK_BASE_URL, params=params)
            data = response.json()
            
            # Skip if there's an error
            if 'error' in data:
                continue
                
            # Extract the needed data
            current = data.get('current', {})
            location = data.get('location', {})
            
            # Get the main weather description
            weather_descriptions = current.get('weather_descriptions', [])
            weather_description = weather_descriptions[0] if weather_descriptions else "Unknown"
            
            # Map to our condition categories
            condition = map_condition(weather_description)
            
            # Get temperature
            temperature = current.get('temperature', 0)
            
            # Extract air quality data if available
            air_quality = current.get('air_quality', {})
            aqi = calculate_aqi(air_quality)
            
            # Estimate UV index based on available data
            uv_index = current.get('uv_index', None)
            if uv_index is None:
                # If UV index not provided, estimate it
                cloudcover = current.get('cloudcover', 50)
                visibility = current.get('visibility', 5)
                is_day = current.get('is_day', 'yes')
                uv_index = estimate_uv_index(visibility, cloudcover, is_day)
            
            # Format location name
            country = location.get('country', '')
            city_name = location.get('name', city.strip())
            location_name = f"{city_name}, {country}"
            
            # Prepare the response
            city_data = {
                'city': location_name,
                'temp': temperature,
                'condition': condition,
                'aqi': aqi,
                'uv': uv_index,
                'description': weather_description,
                'humidity': current.get('humidity', 0),
                'wind_speed': current.get('wind_speed', 0),
                'wind_dir': current.get('wind_dir', 'N')
            }
            
            nearby_data.append(city_data)
            
        except Exception as e:
            logging.error(f"Error fetching weather data for nearby city {city}: {str(e)}")
            continue
    
    return jsonify(nearby_data)
