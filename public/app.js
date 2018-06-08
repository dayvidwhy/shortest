// send the request
function makeRequest (link) {
    $.ajax({
        url: "/encode",
        method: "POST",
        data : {
            link
        },
        dataType: "json",
        beforeSend: () => {
            $("input").val("working on it");
        },
        success: (data) => {
            if (data.status === 1) {
                $("#input-box").val("https://shortest.glitch.me/"+data.link);
                $("#submit-btn").val("Done!");
            } else {
                $("#input-box").val("these scripts are not to be trifled with");
                $("#submit-btn").val(":(!");
            }
        },
        error: (err) => {
            $("input").val("didn't work :(");
        }
    });
}

// go get a short url
function formSubmitted (event) {
    event.preventDefault();
    let link = $("input[name=searching]").val();

    // do some validation
    if (link.indexOf("shortest.glitch.me") >= 0) {
        $("input").val("Try entering a link to somewhere else.");
        return;
    }

    // can"t be empty
    if (link === "" || link === null) {
        $("input").val("Enter a url first.");
        return;
    }

    // does it start with http://
    if ((link.indexOf("http") !== 0)) {
        link = "http://" + link;
    }

    // make the request
    makeRequest(link);
}

// bind listener
$("#form").submit(formSubmitted);
