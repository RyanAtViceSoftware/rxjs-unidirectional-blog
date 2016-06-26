import Rx from 'rx-dom';

export const dispatcher$ = new Rx.ReplaySubject(1);

dispatcher$.subscribe(x => console.log('bus:', x));

export function send(action) {
	console.log('send:', action)
	dispatcher$.onNext({action: action});
}		