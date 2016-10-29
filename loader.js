'use strict';
var tweets;

function load() {
    var client = new XMLHttpRequest();
    client.open('GET', 'tweets.js');
    client.onreadystatechange = function () {
        eval(client.responseText);
        // document.getElementById("test").innerHTML = tweets;
    }
    client.send();
}

//load
load();

//and then reload every 30 seconds
setInterval(load, 30 * 1000);
