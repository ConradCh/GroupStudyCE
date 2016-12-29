var date = "12/29/2016";

function processHTML(data) {
    console.log("Processing...");
    var day = $(data).find(".resdate:contains("+ date +")");
    var times = $(day).siblings();
    var rooms = $(day).parent()
}

function validateResponse(data) {
    
    // Naive way to make sure the repsponse is valid. 
    return $(data).find(".reservations").length > 0;
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
            var parsedData = $.parseHTML(data);
            if (validateResponse(parsedData)) {
                console.log("Valid");
                processHTML(parsedData);
            } else {
                console.log("Invalid");
            }
        })
        .fail(function(jqxhr) {
            console.log("Request Failed, status : " + jqxhr.status)
        });
}

chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
    if (request.action = "getHTTP") {
        getHTTP();
    }
});

/* chrome.browserAction.onClicked.addListener(function(tab) {
    getHTTP();
}); */
