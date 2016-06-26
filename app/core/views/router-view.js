import React from 'react';
import {postsActions} from '../domain/posts';
import {routerActions} from '../domain/router';
import {State$} from '../domain/state';
import {PostsView$} from './posts-view';
import {NavigateTo} from '../domain/router';
import {send} from '../../infrastructure/dispatcher';

const busyView$ = State$
	.filter(state => state.isBusy)
	.map(() => <span>Loading...</span>);

const PostsRouteInit$ = State$
	.distinctUntilChanged(state => state.route)
	.filter(state => state.route === 'posts' || state.route === '/')
	.do(() => send(routerActions.setIsBusy))
	.do(() => send(postsActions.getPosts))
	.switchMap(busyView$);

const PostsRouteShowView$ = State$
	.filter(state => 
		(state.route === 'posts' || state.route === '/') 
		&& !state.isBusy 
		&& state.action === postsActions.postsUpdated)
 	.switchMap(PostsView$);

const PostsRoute$ 
	= Rx.Observable.merge(
			PostsRouteShowView$, 
			PostsRouteInit$, 
			busyView$
		);

function isBusy(state) {
	return function(state) {
		return Object.assign({}, state, {
			isBusy: true
		});
	}
}

export const Router$ 
	= Rx.Observable.merge(PostsRoute$);