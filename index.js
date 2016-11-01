// window.currentHtml = document.body.innerHtml.match(/<div id="content".*\/div>/)[0];

// function loadIndex() {
// 	var client = new XMLHttpRequest();
// 	client.open('GET', 'index.html');
// 	client.onreadystatechange = function () {
// 		var data = client.responseText.match(/<div id="content".*\/div>/)[0];
// 		if (data !== window.currentHtml) {
// 			document.getElementById("content").outerHTML = '';
// 			document.body.insertAdjacentHTML('beforeend', data);
// 			twttr.widgets.load(document.getElementById("content"));
// 		}
// 	}
// 	client.send();
// }

window.onload = function () {
	document.getElementById('loading').style.height = 0;
	document.getElementById('content').style.display = '';
}

//reload every 60 seconds
setInterval(function () {
	window.location = window.location;
}, 60 * 1000);
