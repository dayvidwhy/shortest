// go get a short url
function formSubmitted (event) {
    event.preventDefault();
    var link = $('input[name=searching]').val();

    // do some validation
    if (link.indexOf('shortest.glitch.me') >= 0) {
        $("input").val("Try entering a link to somewhere else.");
        return;
    }

    // can't be empty
    if (link === "" || link === null) {
        $("input").val("Enter a url first.");
        return;
    }

    // does it start with http://
    if ((link.indexOf('http') !== 0)) {
        link = 'http://' + link;
    }

    // make the request
    $.ajax({
        url: '/encode',
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
}

// bind listener
$("#form").submit(formSubmitted);
