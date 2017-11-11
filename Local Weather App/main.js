$(document).ready(function () {

    var currentLocation = {
        lat: 0,
        lng: 0
    };

    var celsius = '&#8451;';
    var fahrenheit = '&#8457;';

    var setWeather = function () {
        jQuery.ajax('https://fcc-weather-api.glitch.me/api/current?lat=' + currentLocation.lat + '&lon=' + currentLocation.lng,
            {
                success: function (response) {
                    var weather = response.weather[0];
                    var location = response.name;
                    var temp_c = Math.round(response.main.temp);
                    var temp_f = Math.round(temp_c* 9/5 + 32);
                    $('#location').html(location);
                    $('#temp').html(temp_c);
                    $('#meter').html(celsius);
                    $('#meter').on('click', function(){
                        if ($(this).html().charCodeAt(0)===8457) {
                            $('#temp').html(temp_c);
                            $('#meter').html(celsius);
                        }
                        else{
                            $('#temp').html(temp_f);
                            $(this).html(fahrenheit);
                        }
                    });
                    $('#weather-main').html(weather.main);
                    $('#weather-desc').html(weather.description);
                    IconGen(weather.main.toLowerCase());
                },
                error: function (error) {
                    console.log(error);
                    $('#location').html("Weather Station didn't respond.");
                }
            }
        );
    };

    var getLocation = function () {

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                currentLocation.lat = position.coords.latitude;
                currentLocation.lng = position.coords.longitude;
                $('#location').html("Calling Weather Station...");
                setWeather();
            });
        } else {
            $('#location').html("Geolocation is not supported by this browser.");
            $('div.clear').addClass('hide');
            console.log("Geolocation is not supported by this browser.");
        }
    };

    getLocation();
});

function IconGen(desc) {
    desc = desc.toLowerCase();
    $('div.clear').addClass('hide');
    switch (desc) {
        case 'drizzle':
            addIcon('drizzle');
            break;
        case 'clouds':
            addIcon('clouds');
            break;
        case 'rain':
            addIcon('rainy');
            break;
        case 'snow':
            addIcon('snowy');
            break;
        case 'clear':
            addIcon('clear');
            break;
        case 'thunderstorm':
            addIcon('thunderstorm');
            break;
        default:
            $('div.clouds').removeClass('hide');
    }
}

function addIcon(desc) {
    $('div.' + desc).removeClass('hide');
}