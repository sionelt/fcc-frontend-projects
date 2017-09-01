function searchWiki() {
	var squery = $('.enter-search').val();
	var url =
		'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + squery + '&namespace=0  &format=json&callback=?';

	$.ajax({
		url: url,
		contentType: 'application/json; charset=utf-8',
		async: false,
		dataType: 'json',
		type: 'GET',
		success: function(data) {
			var html = '';
			for (var d = 0; d < data[1].length; d++) {
				html +=
					"<div class='wikRow col-xs-12 col-sm-12 col-md-12'><a href=" +
					data[3][d] +
					" target='_blank'><h3>" +
					data[1][d] +
					'</h3>' +
					'<p>' +
					data[2][d] +
					'</p></a></div>';
			}
			$('#display').html(html);
		}
	});
}

$(document).ready(function() {
	/*fade in and out when search*/
	$('.submit-search').click(function() {
		if ($('.container').css('margin-top') !== '5px') {
			$('.container').fadeOut('fast');
			$('.container').animate({ marginTop: '5px' }, 'slow');
			$('.container').fadeIn('slow');
		} else {
			$('#display').fadeOut('fast');
			$('#display').animate('slow');
			$('#display').fadeIn('slow');
		}

		searchWiki(); //call api
	});

	/*enable searching with entery key*/
	$('.enter-search').keypress(function(e) {
		if (e.which == 13) {
			$('.submit-search').click();
		}
	});
});
