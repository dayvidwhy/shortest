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
					$("input").val("working on it");
				},
				success: function(data) {
					$("input").val("dwy.io/"+data.link);
				},
				error: function(err) {
					$("input").val("didn't work :(");
				}
			});
		} else {
			$("input").val("Enter a url first.");
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