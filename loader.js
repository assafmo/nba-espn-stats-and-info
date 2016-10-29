'use strict';
function load() {
    var client = new XMLHttpRequest();
    client.open('GET', 'tweets.js');
    client.onreadystatechange = function () {
        var tweets = eval(client.responseText);
        document.getElementById("content").innerHTML = '';
        for (var i = 0; i < tweets.length; i++)
            document.getElementById("content").insertAdjacentHTML('beforeend', tweets[i].html);
    }
    client.send();
}

//load
load();

//and then reload every 30 seconds
setInterval(load, 30 * 1000);
