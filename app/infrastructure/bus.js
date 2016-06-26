import Rx from 'rx-dom';

export const bus$ = new Rx.ReplaySubject(1);

export function send(message) {
	console.log('send:', message)
	bus$.onNext({message: message});
}		