$(document).ready(function() {
	//client side form validation
	$('#lets-go').click(function(event) {
		event.preventDefault();
		console.log("trying");
		var link 		= $('input[name=searching]').val();
		if (link.indexOf('dwy.io')>=0) {
			$("input").val("Try entering a link");
			return;
		}
		if (!(link.indexOf('http')>=0)) {
			link = 'http://' + link;
		}
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
					if (data.status === 1) {
						$("input").val("dwy.io/"+data.link);
					} else {
						$("input").val("these scripts are not to be trifled with");
					}
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