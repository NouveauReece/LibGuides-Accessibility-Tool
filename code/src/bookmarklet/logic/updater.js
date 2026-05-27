import CONFIG from '../config.json' assert { type: 'json' };

export async function getLatestVersionInfo() {
	try {
		const response = await fetch(CONFIG['version-check'], { method: 'GET', cache: 'no-cache' });
		if (!response.ok) { throw Error(`Couldn't fetch latest version from ${CONFIG['version-check']}`)}
		return await response.json();
	} catch (error) {
		console.error(`[LAT] Unable to check version:\n${error}`);
		return null;
	}
}


export async function isUpdateAvailable(i) {
	const updateLogStyle = 'border-left: 5px solid #006298; color: white; padding: 5px 10px;';
	console.log(i.version !== CONFIG.version);
	return i.version !== CONFIG.version;
}