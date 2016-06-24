$(document).ready(function() {
	//client side form validation
	$('#lets-go').click(function(event) {
		event.preventDefault();
		console.log("trying");
		var link 		= $('input[name=searching]').val();
		var validLink = valid(link);
		if (validLink) {
			$.ajax({
				url: 'pub/scripts/shorty.php',
				method: 'POST',
				data : {'link' : link},
				dataType: 'json',
				beforeSend: function() {
					$("#short-link").text('trying');
				},
				success: function(data) {
					console.log(data);
					console.log('it worked!');
					$("#short-link").text(data);
				},
				error: function(err) {
					console.log(err);
					$("#short-link").text('errr'+err);
				}
			});
		} else {
			$("#short-link").text('stop playing me');
		}
	});

	//is it null or empty
	function valid(entry) {
		if (entry == "" || entry == null) {
			return false;
		}
		return true;
	}
});