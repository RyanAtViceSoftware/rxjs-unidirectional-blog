import {logError} from './logger';
export const Dispatcher = new Rx.Subject();

export function toAction(action, data) {
	return {action: action, data: data};
}

export function send(action, data) {
	console.log('Sending: ', action);
	if (!action) {
		logError("No action was defined when calling send().");
	}
	Dispatcher.onNext({action: action, data: data});
}