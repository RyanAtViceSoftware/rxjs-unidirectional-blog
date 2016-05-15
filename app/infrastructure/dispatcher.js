import {logError, logDebug} from './logger';
export const Dispatcher = new Rx.Subject();

export function toMessage(type, data) {
	logDebug('toMessage: ', type, data);
	return {type: type, data: data};
}

export function send(action, data) {
	logDebug('send: ', action);
	if (!action) {
		logError("No action was defined when calling send().");
	}
	Dispatcher.onNext({action: action, data: data});
}