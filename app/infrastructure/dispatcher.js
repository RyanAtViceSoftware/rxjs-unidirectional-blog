import {logError} from './logger';
export const Dispatcher = new Rx.Subject();

export function toMessage(type, data) {
	return {type: type, data: data};
}

export function send(action, data) {
	console.log('Sending: ', action);
	if (!action) {
		logError("No action was defined when calling send().");
	}
	Dispatcher.onNext({action: action, data: data});
}