import Rx from 'rx-dom';

export const bus$ = new Rx.Subject();

export function send(message) {
	console.log('send:', message)
	bus$.onNext({message: message});
}