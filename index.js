function load() {
	var currentVersion = document.getElementById('version').getAttribute('content');

	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'index.html');
	xhr.onreadystatechange = function () {
		if (xhr.readyState !== XMLHttpRequest.DONE || xhr.status !== 200)
			return;

		var parser = new DOMParser();
		var doc = parser.parseFromString(xhr.responseText, 'text/html');
		var newVersion = doc.getElementById('version').getAttribute('content');

		if (newVersion !== currentVersion) {
			console.log('new');
			// twttr.widgets.load(doc.getElementById('content'));
			document.getElementById("content").remove();
		} else {
			console.log('same');
		}
	}
	xhr.send();
}

window.onload = function () {
	document.getElementById('loader').style.display = 'none';
	document.getElementById('content').style.display = 'block';
}

//reload every  seconds
setInterval(function () {
	load()
}, 5 * 1000);
