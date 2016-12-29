var date = "12/29/2016";
var time = "10";
var hours = 2;

function processHTML(data) {
    console.log("Processing...");

    // Get the row containing the requested day.
    var day = $(data).find(".resdate:contains("+ date +")");

    // Get array of all table columns for rooms on requested day.
    var rooms = $(day).parent().nextUntil().map(function() {
        return $(this).find(".resourcename");
    });

    /* For each room, we find the table column the is the slot starting at the
     * requested time. From there we look ahead to see how many free slots are
     * available, and compare this number to the number of hours requested.
     */
    $(rooms).each(function() {
        var slots = $(this).nextUntil();

        /* Each slot contains an <input class="start"> with 'value' attribute of the form
         * 'yyyy-mm-dd%20HH%3A00%3A00' where HH is the hour of the start time
         * for the slot. */
        var start = $(slots).find(".start[value*='%20" + time + "%']").parent().parent();

        // If the start slot is reservable, and so are following slots, this
        // room is valid for the request.
        if ($(start).is(".slot.reservable") && 
            $(start).nextUntil(".reserved,.unreservable").length >= (hours - 1)) {
            console.log(this);
        }
    });
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
