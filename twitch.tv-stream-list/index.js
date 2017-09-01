var channels = ['ESL_SC2', 'OgamingSC2', 'cretetion', 'freecodecamp', 'habathcx', 'RobotCaleb', 'noobs2ninjas'];
var sUrl = 'https://wind-bow.gomix.me/twitch-api/streams/';
var cUrl = 'https://wind-bow.gomix.me/twitch-api/channels/';

function getStream() {
	channels.forEach(function(chan) {
		$.getJSON(sUrl + chan + '?callback=?', function(s) {
			var html = '<div class="chanRow col-xs-12 col-sm-12 col-md-12">';

			if (s.stream === null) {
				$.getJSON(cUrl + chan + '?callback=?', function(c) {
					html +=
						'<a href="' +
						c.url +
						'" target="_blank"><div class="offRow"><div class="icon"><img src="' +
						c.logo +
						'" alt="icon" class="fcc-img"></div><div class="detail"><h4>' +
						c.display_name +
						'</h4><p class="off"><i class="fa fa-circle" class="off-icon"></i> offline</p></div></div></a></div>';
					$('.streamers').append(html);
				});
			}

			html +=
				'<a href="' +
				s.stream.channel.url +
				'" target="_blank"><div class="onRow"><div class="icon"><img src="' +
				s.stream.channel.logo +
				'" alt="icon" class="fcc-img"></div><div class="detail"><h4>' +
				s.stream.channel.display_name +
				'</h4><p class="on"><i class="fa fa-circle" aria-hidden="true" class="on-icon"></i> LIVE ' +
				s.stream.viewers +
				' viewers</p></div><div class="streaming"><h4>' +
				s.stream.game +
				'</h4></div></div></a></div>';
			$('.streamers').prepend(html);
		});
	});
}

$(document).ready(function() {
	getStream();

	$('.online').click(function() {
		$('.offRow').fadeOut('medium');
		$('.onRow').fadeIn('medium');
	});
	$('.all').click(function() {
		$('.onRow').fadeIn('medium');
		$('.offRow').fadeIn('medium');
	});
	$('.offline').click(function() {
		$('.onRow').fadeOut('medium');
		$('.offRow').fadeIn('medium');
	});
});
