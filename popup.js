function handleClick() {
    console.log("Clicked!");
    chrome.extension.sendMessage({
        action: "getHTTP"
    })
}

$(document).ready(function () {
    $("#button").click(handleClick);
});

