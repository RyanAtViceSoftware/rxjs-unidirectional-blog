import React from 'react';
import {bus$} from '../../infrastructure/bus';

export const routerMessages = {
	showPosts: 'showPosts'
}

export const ShowPostsHandler$ = bus$
	.filter(x => x.message === routerMessages.showPosts)
	.map(mapShowPosts);

function mapShowPosts() {
	return function(state) {
		return Object.assign({}, state, {
			route: 'posts'
		});
	};
}

export const RouterState$ = Rx.Observable
	.merge(ShowPostsHandler$);