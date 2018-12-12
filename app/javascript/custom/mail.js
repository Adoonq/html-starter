$('form').submit(function(e) {
	var form = $(this);

	form.find('button').attr('disabled', true);

	$.ajax({
		type: 'POST',
		url: 'assets/php/mail.php',
		data: form.serialize()
	})
	.done(function() {})
	.fail(function(xhr) {})
	.always(function() {
		form.trigger('reset');
		form.find('button').attr('disabled', false);
	});

	return false;
});


// objectifyForm(form.serializeArray())
function objectifyForm(formArray) {
	var returnArray = {};
	for (var i = 0; i < formArray.length; i++){
		returnArray[formArray[i]['name']] = formArray[i]['value'];
	}
	return returnArray;
}
