function load() {
	var currentVersion = document.getElementById('version').getAttribute('content');

	var client = new XMLHttpRequest();
	client.open('GET', 'index.html');
	client.onreadystatechange = function () {
		var parser = new DOMParser();
		var doc = parser.parseFromString(client.responseText);
		var newVersion = doc.getElementById('version').getAttribute('content');

		if (newVersion !== currentVersion) {
			console.log('new');
			// twttr.widgets.load(doc.getElementById('content'));
			document.getElementById("content").remove();
		} else{
			console.log('same');
		}
	}
	client.send();
}

window.onload = function () {
	document.getElementById('loader').style.display = 'none';
	document.getElementById('content').style.display = 'block';
}

//reload every  seconds
setInterval(function () {
	load()
}, 5 * 1000);
