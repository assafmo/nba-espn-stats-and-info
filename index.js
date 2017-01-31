/*var currentVersion = document.getElementById('version').getAttribute('content');
function load() {

	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'https://raw.githubusercontent.com/assafmo/nba-espn-stats-and-info/master/index.html');
	xhr.onreadystatechange = function () {
		if (xhr.readyState !== XMLHttpRequest.DONE || xhr.status !== 200)
			return;

		var parser = new DOMParser();
		var doc = parser.parseFromString(xhr.responseText, 'text/html');
		var newVersion = doc.getElementById('version').getAttribute('content');

		if (newVersion !== currentVersion) {
			twttr.widgets.load(doc.getElementById('content'));

			console.log('new');
			currentVersion = newVersion;
			document.getElementById('content').remove();

			var domToInsert = doc.getElementById('content');
			domToInsert.style.display = 'block';
			var domToInsertAfter = document.getElementById('loader');
			domToInsertAfter.parentNode.insertBefore(domToInsert, domToInsertAfter.nextSibling);
		} else {
			console.log('same');
		}
	}
	xhr.send();
}*/

window.onload = function () {
	setTimeout(function () {
		document.getElementById('loader').style.display = 'none';
		document.getElementById('content').style.display = 'block';
	}, 1000);
}
