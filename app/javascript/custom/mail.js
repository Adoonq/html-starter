$('form').submit(function(e) {
	var th = $(this);

	$.ajax({
		type: "POST",
		url: "assets/php/mail.php",
		data: th.serialize()
	})
	.done(function() {
		th.trigger('reset');
	})
	.fail(function(xhr) {});

	return false;
});
