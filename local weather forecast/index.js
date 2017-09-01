var lat, lon, temp, cTemp, fTemp;
var api = 'https://fcc-weather-api.glitch.me//api/current?lat=';

function getWeather(lat, lon) {
	$.ajax({
		url: api + lat + '&lon=' + lon,
		success: function(w) {
			var html = '<h2>' + w.name + ', ' + w.sys.country + '</h2>';
			html += '<img src="' + w.weather[0].icon + '">';
			html += '<h3>' + w.weather[0].description + '</h3>';
			fTemp = '<h1>' + Math.round(w.main.temp * 9 / 5 + 32) + ' &#176;F</h1>';
			cTemp = '<h1>' + Math.round(w.main.temp * 10) / 10 + ' &#176;C</h1>';
			$('#weather').html(html + fTemp);

			$('button').click(function() {
				temp = temp == cTemp ? fTemp : cTemp;
				$('#weather').html(html + temp);
				$(this).text(function(i, text) {
					return text === 'fahrenheit' ? 'celsius' : 'fahrenheit';
				});
			});
		}
	});
}

$(document).ready(function() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(pos) {
			lat = pos.coords.latitude;
			lon = pos.coords.longitude;

			getWeather(lat, lon);
		});
	}
});
