import Rx from 'rx-dom';
import {Posts$} from './posts';
import {RouterState$} from './router';
import initialState from './initial-state';

export const State$ = Rx.Observable.merge(Posts$, RouterState$)
	.startWith(initialState)
	.scan(function (state, project) {
		return project(state);
	})
	.do(x => console.log('State$:', x));
