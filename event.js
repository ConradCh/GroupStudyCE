function validateResponse(data) {
    
    // Naive way to make sure the repsponse is valid. 
    if ($($.parseHTML(data)).find(".reservations").length > 0) {
      console.log("Valid request!");
    } else {
      console.log("Invalid request.");
    }  
}

function getHTTP() {
    var library_url = "https://bookings.library.utoronto.ca/gerstein/Web/schedule.php";

    // Make AJAX call to get libraries schedule.php
    var jqxhr = $.ajax({
        url: library_url,
        type: "GET",
        dataType: "html",
        xhrFields: {
            withCredentials: true
        }})
        .done(function(data) {
            console.log("Success!");
            console.log(data.slice(100, 150));
            validateResponse(data);
        })
        .fail(function(jqxhr) {
            console.log("Request Failed, status : " + jqxhr.status)
        });
}

/* chrome.browserAction.onClicked.addListener(function(tab) {
    getHTTP();
}); */
