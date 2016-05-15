export function logError() {
	console.error(arguments[0], [].slice.call(arguments,1));
}

export function logDebug() {
	console.log(arguments[0], [].slice.call(arguments,1));
}