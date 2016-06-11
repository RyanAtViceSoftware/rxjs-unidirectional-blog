import Rx from 'rx-dom';
import {Posts$} from './posts';
import {RouterState$} from './router';
import initialState from './initial-state';

export const State$ = Rx.Observable.merge(Posts$, RouterState$)
	.startWith(getInitialState())
	.do(x => console.log('State$', x))
	.scan(function (state, project) {
		console.log('state, project', state, project);
		return project(state);
	})
	.do(x => {
		console.log('scan', x);
		return x;
	});

function getInitialState() {
	console.log('getInitialState()');
	return initialState;
}
