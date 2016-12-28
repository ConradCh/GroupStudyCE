function getHTTP() {
   
    var url = 'https://bookings.library.utoronto.ca/gerstein/Web/schedule.php';
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            console.log(xhr.responseText);
        }
    }
    xhr.open('GET', url);
    xhr.withCredentials = true;
    xhr.send();
}

window.addEventListener('load', getHTTP);

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  // No tabs or host permissions needed!
  console.log('Turning ' + tab.url + ' red!');
  chrome.tabs.executeScript({
    code: 'document.body.style.backgroundColor="red"'
  });
});
