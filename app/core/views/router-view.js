import React from 'react';
import {postMessages} from '../domain/posts';
import {State$} from '../domain/state';
import {PostsView$} from './posts-view';
import {NavigateTo} from '../domain/router';
import {send} from '../../infrastructure/bus';

const busyView$ = State$
	.filter(state => state.isBusy)
	.map(() => <span>Loading...</span>);

const PostsRouteInit$ = State$
	.distinctUntilChanged(state => state.route)
	.filter(state => state.route === 'posts' || state.route === '/')
	.do(x => console.log('PostsRouteInit', x))
	.do(() => send(postMessages.setIsBusy))
	.do(() => send(postMessages.getPosts))
	.switchMap(busyView$);

const PostsRouteShowView$ = State$
	.filter(state => state.route === 'posts' || state.route === '/')
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