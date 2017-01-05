function handleClick() {
    console.log("Clicked!");
    chrome.runtime.sendMessage({
        action: "getHTTP",
        date: document.getElementById("dateField").value,
        time: document.getElementById("time").value,
        hours: document.getElementById("hours").value
    })
}

$(document).ready(function () {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();
    var h = today.getHours();
    if(dd<10){
        dd='0'+dd
    }
    if(mm<10){
        mm='0'+mm
    }

    today = yyyy+'-'+mm+'-'+dd;
    h = h + 1;
    document.getElementById("dateField").setAttribute("min", today);
    document.getElementById("dateField").valueAsDate = new Date();
    document.getElementById("time").selectedIndex = h;

    $("#button").click(handleClick);
});
