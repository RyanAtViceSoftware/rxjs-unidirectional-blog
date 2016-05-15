import {logError, logDebug} from './logger';
import {Actions} from '../core/actions';

export const Dispatcher = new Rx.Subject();

export function toMessage(type, data) {
	logDebug('toMessage: ', type, data);
	return {type: type, data: data};
}

export function send(action, data) {
	logDebug('send: ', action, data);
	if (!action) {
		logError("No action was defined when calling send().");
	}
	Dispatcher.onNext({action: action, data: data});
}

export function sendMessage(type, data) {
	logDebug('sendMessage:', type, data);
	Dispatcher.onNext(
		{
			action: Actions.SendMessage, 
			data: { type: type, data: data}
		});
}