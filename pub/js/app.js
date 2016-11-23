$('#form').submit(function(event) {
	event.preventDefault();
	console.log("trying");
	var link = $('input[name=searching]').val();
	if (link.indexOf('dwy.io') >= 0) {
		$("input").val("Try entering a link");
		return;
	}
	if ((link.indexOf('http')!=0)) {
		link = 'http://' + link;
	}
	console.log(link);
	if (!(valid(link))) {
		$("input").val("Enter a url first.");
		return;
	}

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
				$("#input-box").val("dwy.io/"+data.link);
				$("#submit-btn").val("Done!");
			} else {
				$("#input-box").val("these scripts are not to be trifled with");
				$("#submit-btn").val(":(!");
			}
		},
		error: function(err) {
			$("input").val("didn't work :(");
		}
	});
});

function valid(entry) {
	if (entry == "" || entry == null) {
		return false;
	}
	return true;
}