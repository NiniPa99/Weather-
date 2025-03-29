/**
 * Animated Weather Icons
 * This file contains SVG-based animated weather icons
 */

// Object to store SVG code for each weather condition
const weatherIconsSVG = {
    // Clear/Sunny icon - animated sun with pulsing rays
    'Clear': `
        <svg class="weather-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle class="sun-circle" cx="50" cy="50" r="20" fill="orange">
                <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" />
            </circle>
            <!-- Sun rays -->
            <g class="sun-rays">
                <!-- Top ray -->
                <line x1="50" y1="15" x2="50" y2="25" stroke="orange" stroke-width="4" stroke-linecap="round">
                    <animate attributeName="y1" values="15;10;15" dur="2s" repeatCount="indefinite" />
                </line>
                <!-- Right ray -->
                <line x1="75" y1="50" x2="85" y2="50" stroke="orange" stroke-width="4" stroke-linecap="round">
                    <animate attributeName="x2" values="85;90;85" dur="2s" repeatCount="indefinite" />
                </line>
                <!-- Bottom ray -->
                <line x1="50" y1="75" x2="50" y2="85" stroke="orange" stroke-width="4" stroke-linecap="round">
                    <animate attributeName="y2" values="85;90;85" dur="2s" repeatCount="indefinite" />
                </line>
                <!-- Left ray -->
                <line x1="25" y1="50" x2="15" y2="50" stroke="orange" stroke-width="4" stroke-linecap="round">
                    <animate attributeName="x2" values="15;10;15" dur="2s" repeatCount="indefinite" />
                </line>
                <!-- Diagonal rays -->
                <line x1="30" y1="30" x2="20" y2="20" stroke="orange" stroke-width="4" stroke-linecap="round">
                    <animate attributeName="x2" values="20;15;20" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="y2" values="20;15;20" dur="2s" repeatCount="indefinite" />
                </line>
                <line x1="70" y1="30" x2="80" y2="20" stroke="orange" stroke-width="4" stroke-linecap="round">
                    <animate attributeName="x2" values="80;85;80" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="y2" values="20;15;20" dur="2s" repeatCount="indefinite" />
                </line>
                <line x1="30" y1="70" x2="20" y2="80" stroke="orange" stroke-width="4" stroke-linecap="round">
                    <animate attributeName="x2" values="20;15;20" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="y2" values="80;85;80" dur="2s" repeatCount="indefinite" />
                </line>
                <line x1="70" y1="70" x2="80" y2="80" stroke="orange" stroke-width="4" stroke-linecap="round">
                    <animate attributeName="x2" values="80;85;80" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="y2" values="80;85;80" dur="2s" repeatCount="indefinite" />
                </line>
            </g>
        </svg>
    `,
    
    // Clouds icon - animated moving clouds
    'Clouds': `
        <svg class="weather-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <g class="cloud-group">
                <!-- Background clouds -->
                <path class="cloud bg-cloud" d="M25,60 Q25,50 35,50 Q40,40 50,45 Q60,40 65,50 Q75,50 75,60 Q75,70 65,70 Q60,75 40,75 Q35,70 35,70 Q25,70 25,60" fill="#E0E0E0">
                    <animateTransform attributeName="transform" type="translate" values="-5,0;5,0;-5,0" dur="7s" repeatCount="indefinite" />
                </path>
                <!-- Foreground cloud -->
                <path class="cloud fg-cloud" d="M35,65 Q35,55 45,55 Q50,45 60,50 Q70,45 75,55 Q85,55 85,65 Q85,75 75,75 Q70,80 50,80 Q45,75 45,75 Q35,75 35,65" fill="#F8F8F8">
                    <animateTransform attributeName="transform" type="translate" values="5,0;-5,0;5,0" dur="5s" repeatCount="indefinite" />
                </path>
            </g>
        </svg>
    `,
    
    // Rain icon - animated raindrops falling from cloud
    'Rain': `
        <svg class="weather-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <!-- Cloud -->
            <path class="cloud" d="M25,45 Q25,35 35,35 Q40,25 50,30 Q60,25 65,35 Q75,35 75,45 Q75,55 65,55 Q60,60 40,60 Q35,55 35,55 Q25,55 25,45" fill="#E0E0E0" />
            
            <!-- Raindrops -->
            <g class="raindrops">
                <path class="raindrop" d="M40,65 L40,75 Q40,78 43,75 Z" fill="#6EB5FF">
                    <animate attributeName="opacity" values="0;1;0" dur="1s" begin="0s" repeatCount="indefinite" />
                    <animate attributeName="transform" type="translate" values="0,0;0,20" dur="1s" begin="0s" repeatCount="indefinite" />
                </path>
                <path class="raindrop" d="M50,65 L50,75 Q50,78 53,75 Z" fill="#6EB5FF">
                    <animate attributeName="opacity" values="0;1;0" dur="1s" begin="0.2s" repeatCount="indefinite" />
                    <animate attributeName="transform" type="translate" values="0,0;0,20" dur="1s" begin="0.2s" repeatCount="indefinite" />
                </path>
                <path class="raindrop" d="M60,65 L60,75 Q60,78 63,75 Z" fill="#6EB5FF">
                    <animate attributeName="opacity" values="0;1;0" dur="1s" begin="0.4s" repeatCount="indefinite" />
                    <animate attributeName="transform" type="translate" values="0,0;0,20" dur="1s" begin="0.4s" repeatCount="indefinite" />
                </path>
                <path class="raindrop" d="M30,65 L30,75 Q30,78 33,75 Z" fill="#6EB5FF">
                    <animate attributeName="opacity" values="0;1;0" dur="1s" begin="0.6s" repeatCount="indefinite" />
                    <animate attributeName="transform" type="translate" values="0,0;0,20" dur="1s" begin="0.6s" repeatCount="indefinite" />
                </path>
                <path class="raindrop" d="M70,65 L70,75 Q70,78 73,75 Z" fill="#6EB5FF">
                    <animate attributeName="opacity" values="0;1;0" dur="1s" begin="0.8s" repeatCount="indefinite" />
                    <animate attributeName="transform" type="translate" values="0,0;0,20" dur="1s" begin="0.8s" repeatCount="indefinite" />
                </path>
            </g>
        </svg>
    `,
    
    // Drizzle icon - lighter version of rain
    'Drizzle': `
        <svg class="weather-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <!-- Cloud -->
            <path class="cloud" d="M25,45 Q25,35 35,35 Q40,25 50,30 Q60,25 65,35 Q75,35 75,45 Q75,55 65,55 Q60,60 40,60 Q35,55 35,55 Q25,55 25,45" fill="#E0E0E0" />
            
            <!-- Drizzle drops (smaller and fewer than rain) -->
            <g class="drizzle-drops">
                <path class="drizzle-drop" d="M38,65 L38,70 Q38,72 40,70 Z" fill="#A4D4FF">
                    <animate attributeName="opacity" values="0;1;0" dur="1.5s" begin="0s" repeatCount="indefinite" />
                    <animate attributeName="transform" type="translate" values="0,0;0,15" dur="1.5s" begin="0s" repeatCount="indefinite" />
                </path>
                <path class="drizzle-drop" d="M50,65 L50,70 Q50,72 52,70 Z" fill="#A4D4FF">
                    <animate attributeName="opacity" values="0;1;0" dur="1.5s" begin="0.3s" repeatCount="indefinite" />
                    <animate attributeName="transform" type="translate" values="0,0;0,15" dur="1.5s" begin="0.3s" repeatCount="indefinite" />
                </path>
                <path class="drizzle-drop" d="M62,65 L62,70 Q62,72 64,70 Z" fill="#A4D4FF">
                    <animate attributeName="opacity" values="0;1;0" dur="1.5s" begin="0.6s" repeatCount="indefinite" />
                    <animate attributeName="transform" type="translate" values="0,0;0,15" dur="1.5s" begin="0.6s" repeatCount="indefinite" />
                </path>
                <path class="drizzle-drop" d="M44,70 L44,75 Q44,77 46,75 Z" fill="#A4D4FF">
                    <animate attributeName="opacity" values="0;1;0" dur="1.5s" begin="0.9s" repeatCount="indefinite" />
                    <animate attributeName="transform" type="translate" values="0,0;0,15" dur="1.5s" begin="0.9s" repeatCount="indefinite" />
                </path>
                <path class="drizzle-drop" d="M56,70 L56,75 Q56,77 58,75 Z" fill="#A4D4FF">
                    <animate attributeName="opacity" values="0;1;0" dur="1.5s" begin="1.2s" repeatCount="indefinite" />
                    <animate attributeName="transform" type="translate" values="0,0;0,15" dur="1.5s" begin="1.2s" repeatCount="indefinite" />
                </path>
            </g>
        </svg>
    `,
    
    // Thunderstorm icon - lightning flashes from cloud
    'Thunderstorm': `
        <svg class="weather-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <!-- Dark cloud -->
            <path class="thunder-cloud" d="M25,45 Q25,35 35,35 Q40,25 50,30 Q60,25 65,35 Q75,35 75,45 Q75,55 65,55 Q60,60 40,60 Q35,55 35,55 Q25,55 25,45" fill="#666666" />
            
            <!-- Lightning bolt -->
            <path class="lightning" d="M55,55 L45,70 L55,70 L40,90" stroke="#FFD700" stroke-width="2" fill="none">
                <animate attributeName="opacity" values="0;1;0" dur="2s" begin="0s" repeatCount="indefinite" />
            </path>
            <path class="lightning-flash" d="M30,45 L70,45 L70,55 L30,55 Z" fill="#FFD700" opacity="0">
                <animate attributeName="opacity" values="0;0.7;0" dur="2s" begin="0s" repeatCount="indefinite" />
            </path>
            
            <!-- Rain drops -->
            <g class="thunder-raindrops">
                <path class="raindrop" d="M30,65 L30,75 Q30,78 33,75 Z" fill="#6EB5FF">
                    <animate attributeName="opacity" values="0;1;0" dur="1s" begin="0.3s" repeatCount="indefinite" />
                    <animate attributeName="transform" type="translate" values="0,0;0,20" dur="1s" begin="0.3s" repeatCount="indefinite" />
                </path>
                <path class="raindrop" d="M70,65 L70,75 Q70,78 73,75 Z" fill="#6EB5FF">
                    <animate attributeName="opacity" values="0;1;0" dur="1s" begin="0.6s" repeatCount="indefinite" />
                    <animate attributeName="transform" type="translate" values="0,0;0,20" dur="1s" begin="0.6s" repeatCount="indefinite" />
                </path>
            </g>
        </svg>
    `,
    
    // Snow icon - animated snowflakes
    'Snow': `
        <svg class="weather-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <!-- Cloud -->
            <path class="cloud" d="M25,45 Q25,35 35,35 Q40,25 50,30 Q60,25 65,35 Q75,35 75,45 Q75,55 65,55 Q60,60 40,60 Q35,55 35,55 Q25,55 25,45" fill="#E0E0E0" />
            
            <!-- Snowflakes -->
            <g class="snowflakes">
                <!-- Snowflake 1 -->
                <g class="snowflake" transform="translate(35, 65)">
                    <line x1="0" y1="-5" x2="0" y2="5" stroke="white" stroke-width="2" />
                    <line x1="-5" y1="0" x2="5" y2="0" stroke="white" stroke-width="2" />
                    <line x1="-3.5" y1="-3.5" x2="3.5" y2="3.5" stroke="white" stroke-width="2" />
                    <line x1="-3.5" y1="3.5" x2="3.5" y2="-3.5" stroke="white" stroke-width="2" />
                    <animate attributeName="opacity" values="0;1;0" dur="3s" begin="0s" repeatCount="indefinite" />
                    <animate attributeName="transform" type="translate" values="35,65;35,85" dur="3s" begin="0s" repeatCount="indefinite" />
                    <animateTransform attributeName="transform" type="rotate" values="0;180" dur="3s" additive="sum" repeatCount="indefinite" />
                </g>
                
                <!-- Snowflake 2 -->
                <g class="snowflake" transform="translate(50, 65)">
                    <line x1="0" y1="-5" x2="0" y2="5" stroke="white" stroke-width="2" />
                    <line x1="-5" y1="0" x2="5" y2="0" stroke="white" stroke-width="2" />
                    <line x1="-3.5" y1="-3.5" x2="3.5" y2="3.5" stroke="white" stroke-width="2" />
                    <line x1="-3.5" y1="3.5" x2="3.5" y2="-3.5" stroke="white" stroke-width="2" />
                    <animate attributeName="opacity" values="0;1;0" dur="3s" begin="0.5s" repeatCount="indefinite" />
                    <animate attributeName="transform" type="translate" values="50,65;50,85" dur="3s" begin="0.5s" repeatCount="indefinite" />
                    <animateTransform attributeName="transform" type="rotate" values="0;180" dur="3s" additive="sum" repeatCount="indefinite" />
                </g>
                
                <!-- Snowflake 3 -->
                <g class="snowflake" transform="translate(65, 65)">
                    <line x1="0" y1="-5" x2="0" y2="5" stroke="white" stroke-width="2" />
                    <line x1="-5" y1="0" x2="5" y2="0" stroke="white" stroke-width="2" />
                    <line x1="-3.5" y1="-3.5" x2="3.5" y2="3.5" stroke="white" stroke-width="2" />
                    <line x1="-3.5" y1="3.5" x2="3.5" y2="-3.5" stroke="white" stroke-width="2" />
                    <animate attributeName="opacity" values="0;1;0" dur="3s" begin="1s" repeatCount="indefinite" />
                    <animate attributeName="transform" type="translate" values="65,65;65,85" dur="3s" begin="1s" repeatCount="indefinite" />
                    <animateTransform attributeName="transform" type="rotate" values="0;180" dur="3s" additive="sum" repeatCount="indefinite" />
                </g>
            </g>
        </svg>
    `,
    
    // Mist/Fog/Haze icon - animated horizontal layers
    'Mist': `
        <svg class="weather-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <!-- Mist layers -->
            <g class="mist-layers">
                <path class="mist-layer" d="M15,40 Q30,45 45,40 Q60,35 75,40 Q90,45 95,40" stroke="#E0E0E0" stroke-width="5" fill="none">
                    <animate attributeName="d" values="M15,40 Q30,45 45,40 Q60,35 75,40 Q90,45 95,40;M15,40 Q30,35 45,40 Q60,45 75,40 Q90,35 95,40;M15,40 Q30,45 45,40 Q60,35 75,40 Q90,45 95,40" dur="5s" repeatCount="indefinite" />
                </path>
                <path class="mist-layer" d="M5,55 Q20,60 35,55 Q50,50 65,55 Q80,60 95,55" stroke="#E0E0E0" stroke-width="5" fill="none">
                    <animate attributeName="d" values="M5,55 Q20,60 35,55 Q50,50 65,55 Q80,60 95,55;M5,55 Q20,50 35,55 Q50,60 65,55 Q80,50 95,55;M5,55 Q20,60 35,55 Q50,50 65,55 Q80,60 95,55" dur="7s" repeatCount="indefinite" />
                </path>
                <path class="mist-layer" d="M15,70 Q30,75 45,70 Q60,65 75,70 Q90,75 95,70" stroke="#E0E0E0" stroke-width="5" fill="none">
                    <animate attributeName="d" values="M15,70 Q30,75 45,70 Q60,65 75,70 Q90,75 95,70;M15,70 Q30,65 45,70 Q60,75 75,70 Q90,65 95,70;M15,70 Q30,75 45,70 Q60,65 75,70 Q90,75 95,70" dur="6s" repeatCount="indefinite" />
                </path>
            </g>
        </svg>
    `,
    
    // Same as Mist for various fog/haze conditions
    'Fog': `
        <svg class="weather-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <!-- Fog layers -->
            <g class="fog-layers">
                <path class="fog-layer" d="M15,40 Q30,45 45,40 Q60,35 75,40 Q90,45 95,40" stroke="#E0E0E0" stroke-width="5" fill="none">
                    <animate attributeName="d" values="M15,40 Q30,45 45,40 Q60,35 75,40 Q90,45 95,40;M15,40 Q30,35 45,40 Q60,45 75,40 Q90,35 95,40;M15,40 Q30,45 45,40 Q60,35 75,40 Q90,45 95,40" dur="5s" repeatCount="indefinite" />
                </path>
                <path class="fog-layer" d="M5,55 Q20,60 35,55 Q50,50 65,55 Q80,60 95,55" stroke="#E0E0E0" stroke-width="5" fill="none">
                    <animate attributeName="d" values="M5,55 Q20,60 35,55 Q50,50 65,55 Q80,60 95,55;M5,55 Q20,50 35,55 Q50,60 65,55 Q80,50 95,55;M5,55 Q20,60 35,55 Q50,50 65,55 Q80,60 95,55" dur="7s" repeatCount="indefinite" />
                </path>
                <path class="fog-layer" d="M15,70 Q30,75 45,70 Q60,65 75,70 Q90,75 95,70" stroke="#E0E0E0" stroke-width="5" fill="none">
                    <animate attributeName="d" values="M15,70 Q30,75 45,70 Q60,65 75,70 Q90,75 95,70;M15,70 Q30,65 45,70 Q60,75 75,70 Q90,65 95,70;M15,70 Q30,75 45,70 Q60,65 75,70 Q90,75 95,70" dur="6s" repeatCount="indefinite" />
                </path>
            </g>
        </svg>
    `,
    
    'Haze': `
        <svg class="weather-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <!-- Faded sun behind haze -->
            <circle class="haze-sun" cx="50" cy="35" r="15" fill="orange" opacity="0.5" />
            
            <!-- Haze layers -->
            <g class="haze-layers">
                <path class="haze-layer" d="M15,50 Q30,55 45,50 Q60,45 75,50 Q90,55 95,50" stroke="#E0E0E0" stroke-width="5" fill="none">
                    <animate attributeName="d" values="M15,50 Q30,55 45,50 Q60,45 75,50 Q90,55 95,50;M15,50 Q30,45 45,50 Q60,55 75,50 Q90,45 95,50;M15,50 Q30,55 45,50 Q60,45 75,50 Q90,55 95,50" dur="5s" repeatCount="indefinite" />
                </path>
                <path class="haze-layer" d="M5,65 Q20,70 35,65 Q50,60 65,65 Q80,70 95,65" stroke="#E0E0E0" stroke-width="5" fill="none">
                    <animate attributeName="d" values="M5,65 Q20,70 35,65 Q50,60 65,65 Q80,70 95,65;M5,65 Q20,60 35,65 Q50,70 65,65 Q80,60 95,65;M5,65 Q20,70 35,65 Q50,60 65,65 Q80,70 95,65" dur="7s" repeatCount="indefinite" />
                </path>
                <path class="haze-layer" d="M15,80 Q30,85 45,80 Q60,75 75,80 Q90,85 95,80" stroke="#E0E0E0" stroke-width="5" fill="none">
                    <animate attributeName="d" values="M15,80 Q30,85 45,80 Q60,75 75,80 Q90,85 95,80;M15,80 Q30,75 45,80 Q60,85 75,80 Q90,75 95,80;M15,80 Q30,85 45,80 Q60,75 75,80 Q90,85 95,80" dur="6s" repeatCount="indefinite" />
                </path>
            </g>
        </svg>
    `,
    
    // Wind icon for Squall/Wind
    'Squall': `
        <svg class="weather-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <!-- Wind lines -->
            <g class="wind-lines">
                <path class="wind-line" d="M10,35 Q40,25 60,35 T90,30" stroke="#E0E0E0" stroke-width="5" fill="none" stroke-linecap="round">
                    <animate attributeName="d" values="M10,35 Q40,25 60,35 T90,30;M10,35 Q40,45 60,35 T90,40;M10,35 Q40,25 60,35 T90,30" dur="3s" repeatCount="indefinite" />
                </path>
                <path class="wind-line" d="M15,55 Q45,45 65,55 T95,50" stroke="#E0E0E0" stroke-width="5" fill="none" stroke-linecap="round">
                    <animate attributeName="d" values="M15,55 Q45,45 65,55 T95,50;M15,55 Q45,65 65,55 T95,60;M15,55 Q45,45 65,55 T95,50" dur="4s" repeatCount="indefinite" />
                </path>
                <path class="wind-line" d="M5,75 Q35,65 55,75 T85,70" stroke="#E0E0E0" stroke-width="5" fill="none" stroke-linecap="round">
                    <animate attributeName="d" values="M5,75 Q35,65 55,75 T85,70;M5,75 Q35,85 55,75 T85,80;M5,75 Q35,65 55,75 T85,70" dur="3.5s" repeatCount="indefinite" />
                </path>
            </g>
        </svg>
    `,
    
    // Dust/Sand/Ash - particles blowing
    'Dust': `
        <svg class="weather-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <!-- Dust background -->
            <rect class="dust-bg" x="0" y="0" width="100" height="100" fill="#D2B48C" opacity="0.3" />
            
            <!-- Dust particles -->
            <g class="dust-particles">
                <!-- Row 1 -->
                <circle cx="20" cy="30" r="2" fill="#D2B48C">
                    <animate attributeName="cx" values="20;25;20" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle cx="40" cy="20" r="3" fill="#D2B48C">
                    <animate attributeName="cx" values="40;45;40" dur="3s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.4;0.8;0.4" dur="3s" repeatCount="indefinite" />
                </circle>
                <circle cx="60" cy="35" r="2.5" fill="#D2B48C">
                    <animate attributeName="cx" values="60;65;60" dur="2.5s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.5;0.9;0.5" dur="2.5s" repeatCount="indefinite" />
                </circle>
                <circle cx="80" cy="25" r="2" fill="#D2B48C">
                    <animate attributeName="cx" values="80;85;80" dur="2.2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2.2s" repeatCount="indefinite" />
                </circle>
                
                <!-- Row 2 -->
                <circle cx="15" cy="50" r="2.5" fill="#D2B48C">
                    <animate attributeName="cx" values="15;20;15" dur="2.7s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2.7s" repeatCount="indefinite" />
                </circle>
                <circle cx="35" cy="55" r="3" fill="#D2B48C">
                    <animate attributeName="cx" values="35;40;35" dur="3.2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.5;0.9;0.5" dur="3.2s" repeatCount="indefinite" />
                </circle>
                <circle cx="55" cy="45" r="2" fill="#D2B48C">
                    <animate attributeName="cx" values="55;60;55" dur="2.3s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2.3s" repeatCount="indefinite" />
                </circle>
                <circle cx="75" cy="50" r="2.5" fill="#D2B48C">
                    <animate attributeName="cx" values="75;80;75" dur="2.8s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2.8s" repeatCount="indefinite" />
                </circle>
                
                <!-- Row 3 -->
                <circle cx="25" cy="70" r="2" fill="#D2B48C">
                    <animate attributeName="cx" values="25;30;25" dur="2.5s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.5;0.9;0.5" dur="2.5s" repeatCount="indefinite" />
                </circle>
                <circle cx="45" cy="75" r="3" fill="#D2B48C">
                    <animate attributeName="cx" values="45;50;45" dur="3s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.3;0.7;0.3" dur="3s" repeatCount="indefinite" />
                </circle>
                <circle cx="65" cy="65" r="2.5" fill="#D2B48C">
                    <animate attributeName="cx" values="65;70;65" dur="2.7s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2.7s" repeatCount="indefinite" />
                </circle>
                <circle cx="85" cy="75" r="2" fill="#D2B48C">
                    <animate attributeName="cx" values="85;90;85" dur="2.3s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.5;0.9;0.5" dur="2.3s" repeatCount="indefinite" />
                </circle>
            </g>
        </svg>
    `,
    
    'Sand': `
        <svg class="weather-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <!-- Sand background -->
            <rect class="sand-bg" x="0" y="0" width="100" height="100" fill="#DAA520" opacity="0.3" />
            
            <!-- Sand particles -->
            <g class="sand-particles">
                <!-- Row 1 -->
                <circle cx="20" cy="30" r="2" fill="#DAA520">
                    <animate attributeName="cx" values="20;25;20" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle cx="40" cy="20" r="3" fill="#DAA520">
                    <animate attributeName="cx" values="40;45;40" dur="3s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.4;0.8;0.4" dur="3s" repeatCount="indefinite" />
                </circle>
                <circle cx="60" cy="35" r="2.5" fill="#DAA520">
                    <animate attributeName="cx" values="60;65;60" dur="2.5s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.5;0.9;0.5" dur="2.5s" repeatCount="indefinite" />
                </circle>
                <circle cx="80" cy="25" r="2" fill="#DAA520">
                    <animate attributeName="cx" values="80;85;80" dur="2.2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2.2s" repeatCount="indefinite" />
                </circle>
                
                <!-- Row 2 -->
                <circle cx="15" cy="50" r="2.5" fill="#DAA520">
                    <animate attributeName="cx" values="15;20;15" dur="2.7s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2.7s" repeatCount="indefinite" />
                </circle>
                <circle cx="35" cy="55" r="3" fill="#DAA520">
                    <animate attributeName="cx" values="35;40;35" dur="3.2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.5;0.9;0.5" dur="3.2s" repeatCount="indefinite" />
                </circle>
                <circle cx="55" cy="45" r="2" fill="#DAA520">
                    <animate attributeName="cx" values="55;60;55" dur="2.3s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2.3s" repeatCount="indefinite" />
                </circle>
                <circle cx="75" cy="50" r="2.5" fill="#DAA520">
                    <animate attributeName="cx" values="75;80;75" dur="2.8s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2.8s" repeatCount="indefinite" />
                </circle>
                
                <!-- Row 3 -->
                <circle cx="25" cy="70" r="2" fill="#DAA520">
                    <animate attributeName="cx" values="25;30;25" dur="2.5s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.5;0.9;0.5" dur="2.5s" repeatCount="indefinite" />
                </circle>
                <circle cx="45" cy="75" r="3" fill="#DAA520">
                    <animate attributeName="cx" values="45;50;45" dur="3s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.3;0.7;0.3" dur="3s" repeatCount="indefinite" />
                </circle>
                <circle cx="65" cy="65" r="2.5" fill="#DAA520">
                    <animate attributeName="cx" values="65;70;65" dur="2.7s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2.7s" repeatCount="indefinite" />
                </circle>
                <circle cx="85" cy="75" r="2" fill="#DAA520">
                    <animate attributeName="cx" values="85;90;85" dur="2.3s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.5;0.9;0.5" dur="2.3s" repeatCount="indefinite" />
                </circle>
            </g>
        </svg>
    `,
    
    'Ash': `
        <svg class="weather-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <!-- Ash background -->
            <rect class="ash-bg" x="0" y="0" width="100" height="100" fill="#708090" opacity="0.3" />
            
            <!-- Ash particles -->
            <g class="ash-particles">
                <!-- Row 1 -->
                <circle cx="20" cy="30" r="2" fill="#708090">
                    <animate attributeName="cy" values="30;35;30" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle cx="40" cy="20" r="3" fill="#708090">
                    <animate attributeName="cy" values="20;25;20" dur="3s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.4;0.8;0.4" dur="3s" repeatCount="indefinite" />
                </circle>
                <circle cx="60" cy="35" r="2.5" fill="#708090">
                    <animate attributeName="cy" values="35;40;35" dur="2.5s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.5;0.9;0.5" dur="2.5s" repeatCount="indefinite" />
                </circle>
                <circle cx="80" cy="25" r="2" fill="#708090">
                    <animate attributeName="cy" values="25;30;25" dur="2.2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2.2s" repeatCount="indefinite" />
                </circle>
                
                <!-- Row 2 -->
                <circle cx="15" cy="50" r="2.5" fill="#708090">
                    <animate attributeName="cy" values="50;55;50" dur="2.7s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2.7s" repeatCount="indefinite" />
                </circle>
                <circle cx="35" cy="55" r="3" fill="#708090">
                    <animate attributeName="cy" values="55;60;55" dur="3.2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.5;0.9;0.5" dur="3.2s" repeatCount="indefinite" />
                </circle>
                <circle cx="55" cy="45" r="2" fill="#708090">
                    <animate attributeName="cy" values="45;50;45" dur="2.3s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2.3s" repeatCount="indefinite" />
                </circle>
                <circle cx="75" cy="50" r="2.5" fill="#708090">
                    <animate attributeName="cy" values="50;55;50" dur="2.8s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2.8s" repeatCount="indefinite" />
                </circle>
                
                <!-- Row 3 -->
                <circle cx="25" cy="70" r="2" fill="#708090">
                    <animate attributeName="cy" values="70;75;70" dur="2.5s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.5;0.9;0.5" dur="2.5s" repeatCount="indefinite" />
                </circle>
                <circle cx="45" cy="75" r="3" fill="#708090">
                    <animate attributeName="cy" values="75;80;75" dur="3s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.3;0.7;0.3" dur="3s" repeatCount="indefinite" />
                </circle>
                <circle cx="65" cy="65" r="2.5" fill="#708090">
                    <animate attributeName="cy" values="65;70;65" dur="2.7s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2.7s" repeatCount="indefinite" />
                </circle>
                <circle cx="85" cy="75" r="2" fill="#708090">
                    <animate attributeName="cy" values="75;80;75" dur="2.3s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.5;0.9;0.5" dur="2.3s" repeatCount="indefinite" />
                </circle>
            </g>
        </svg>
    `,
    
    // Tornado icon - animated spiral
    'Tornado': `
        <svg class="weather-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <!-- Tornado funnel -->
            <g class="tornado-funnel">
                <!-- Top of funnel (widest) -->
                <path d="M30,20 Q50,15 70,20" stroke="#6B7280" stroke-width="6" fill="none">
                    <animate attributeName="d" values="M30,20 Q50,15 70,20;M32,20 Q50,17 68,20;M30,20 Q50,15 70,20" dur="2s" repeatCount="indefinite" />
                </path>
                
                <!-- Upper middle section -->
                <path d="M35,35 Q50,30 65,35" stroke="#6B7280" stroke-width="5" fill="none">
                    <animate attributeName="d" values="M35,35 Q50,30 65,35;M37,35 Q50,32 63,35;M35,35 Q50,30 65,35" dur="2s" repeatCount="indefinite" />
                </path>
                
                <!-- Middle section -->
                <path d="M40,50 Q50,45 60,50" stroke="#6B7280" stroke-width="4" fill="none">
                    <animate attributeName="d" values="M40,50 Q50,45 60,50;M42,50 Q50,47 58,50;M40,50 Q50,45 60,50" dur="2s" repeatCount="indefinite" />
                </path>
                
                <!-- Lower middle section -->
                <path d="M43,65 Q50,60 57,65" stroke="#6B7280" stroke-width="3" fill="none">
                    <animate attributeName="d" values="M43,65 Q50,60 57,65;M45,65 Q50,62 55,65;M43,65 Q50,60 57,65" dur="2s" repeatCount="indefinite" />
                </path>
                
                <!-- Bottom of funnel (narrowest) -->
                <path d="M46,80 Q50,75 54,80" stroke="#6B7280" stroke-width="2" fill="none">
                    <animate attributeName="d" values="M46,80 Q50,75 54,80;M47,80 Q50,77 53,80;M46,80 Q50,75 54,80" dur="2s" repeatCount="indefinite" />
                </path>
            </g>
            
            <!-- Swirling debris -->
            <g class="tornado-debris">
                <circle cx="40" cy="25" r="1" fill="#9CA3AF">
                    <animate attributeName="cx" values="40;55;40" dur="1.5s" repeatCount="indefinite" />
                    <animate attributeName="cy" values="25;35;25" dur="1.5s" repeatCount="indefinite" />
                </circle>
                <circle cx="60" cy="30" r="1" fill="#9CA3AF">
                    <animate attributeName="cx" values="60;45;60" dur="1.7s" repeatCount="indefinite" />
                    <animate attributeName="cy" values="30;40;30" dur="1.7s" repeatCount="indefinite" />
                </circle>
                <circle cx="45" cy="45" r="1" fill="#9CA3AF">
                    <animate attributeName="cx" values="45;55;45" dur="1.3s" repeatCount="indefinite" />
                    <animate attributeName="cy" values="45;55;45" dur="1.3s" repeatCount="indefinite" />
                </circle>
                <circle cx="55" cy="60" r="1" fill="#9CA3AF">
                    <animate attributeName="cx" values="55;45;55" dur="1.6s" repeatCount="indefinite" />
                    <animate attributeName="cy" values="60;70;60" dur="1.6s" repeatCount="indefinite" />
                </circle>
            </g>
        </svg>
    `
};

// Copy Mist SVG for other similar conditions
weatherIconsSVG['Smoke'] = weatherIconsSVG['Mist'];
weatherIconsSVG['Haze'] = weatherIconsSVG['Mist'];
weatherIconsSVG['Fog'] = weatherIconsSVG['Mist'];

// Copy Dust SVG for similar conditions
weatherIconsSVG['Sand'] = weatherIconsSVG['Dust'];
weatherIconsSVG['Ash'] = weatherIconsSVG['Dust'];

// Copy Squall SVG for similar conditions
weatherIconsSVG['Wind'] = weatherIconsSVG['Squall'];

// Add Sunny as alias for Clear
weatherIconsSVG['Sunny'] = weatherIconsSVG['Clear'];