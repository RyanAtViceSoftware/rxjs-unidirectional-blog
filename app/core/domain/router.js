import React from 'react';
import {bus$} from '../../infrastructure/bus';

export const routerMessages = {
	setIsBusy: 'setIsBusy',
	showPosts: 'showPosts'
}

export const ShowPosts$ = bus$
	.filter(x => x.message === routerMessages.showPosts)
	.map(mapShowPosts);

function mapShowPosts() {
	return function(state) {
		return Object.assign({}, state, {
			route: 'posts'
		});
	};
}

const SetIsBusy$ = bus$
	.filter(x => x.message === routerMessages.setIsBusy)
	.map(mapIsBusy)
	.shareReplay(1);

function mapIsBusy() {
	return function(response, state) {
		return Object.assign({}, state, {
			isBusy: true
		});
	}
}

export const RouterState$ = Rx.Observable
	.merge(ShowPosts$, SetIsBusy$);