javascript: (function () {
	var BASE = "https://libguidesally.reecen.dev/";
	var KEY = "bm_cache";
	var cached = JSON.parse(localStorage.getItem(KEY) || "null");
	function run(code) {
		var s = document.createElement("script");
		s.textContent = code;
		document.documentElement.appendChild(s);
		s.remove();
	}
	function installAndRun(version) {
		return fetch(BASE + "bookmarklet.js?cb=" + Date.now())
			.then((r) => r.text())
			.then(function (code) {
				localStorage.setItem(KEY, JSON.stringify({ code, version }));
				console.log("[LAT] Installed version: " + version);
				run(code);
			});
	}
	function checkVersionAndExecute() {
		return fetch(BASE + "version.txt?nocache=" + Date.now())
			.then((r) => r.text())
			.then((v) => v.trim())
			.then(function (version) {
				// if (!cached || cached.version !== version) {
				// 	console.log("[LAT] New version available: " + version + " — Downloading...");
				// 	return installAndRun(version);
				// }
				// if (cached) {
				// 	console.log("[LAT] Running from cache (version: " + cached.version + ")...");
				// 	return run(cached.code);
				// }
				console.log("[LAT] No cache present — Downloading version: " + version);
				return installAndRun(version);
			});
	}
	checkVersionAndExecute().catch(function () {
		console.log("[LAT] Network or server unavailable. Checking cache...");
		if (cached && cached.code) {
			console.log("[LAT] Running cached version: " + (cached.version || "unknown"));
			run(cached.code);
		} else {
			console.error("[LAT] No network and no cached version available.");
		}
	});
})();
