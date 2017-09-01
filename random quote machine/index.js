function quoteGenerator() {
	$.ajax({
		url: 'https://api.forismatic.com/api/1.0/?',
		dataType: 'jsonp',
		data: 'method=getQuote&format=jsonp&lang=en&jsonp=?',
		success: function(q) {
			$('#quote').html(
				"<blockquote id='quote'>" + q.quoteText + '<footer> <cite>' + q.quoteAuthor + '</cite></footer></blockquote>'
			);

			$('#tweetQuote').attr('href', 'https://twitter.com/home/?status=' + '"' + q.quoteText + '" by ' + q.quoteAuthor);
		}
	});
}

$(document).ready(function() {
	quoteGenerator();

	$('#getQuote').click(function() {
		quoteGenerator();
		$('#quote').fadeIn('900');
	});
});

$('#getQuote').click(function() {
	$('#quote').fadeOut('900');
});
