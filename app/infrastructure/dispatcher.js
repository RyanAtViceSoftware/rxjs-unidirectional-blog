import Rx from 'rx-dom';

export const dispatcher$ = new Rx.Subject();

dispatcher$.subscribe(x => console.debug('bus:', x));

export function send(action) {
	console.debug('send:', action)
	dispatcher$.onNext({action: action});
}		