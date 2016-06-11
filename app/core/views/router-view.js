import React from 'react';
import {PostActions} from '../domain/posts';
import {State$} from '../domain/state';
import {PostsView$} from './posts-view';

const busyView$ = State$
	.filter(state => 
			(state.route === 'posts' || state.route === '/') 
			&& !state.posts
		)
	.map(() => <span>Loading...</span>);

const PostsRouteInit$ = State$
	.distinctUntilChanged(state => state.route)
	.filter(state => state.route === 'posts' || state.route === '/')
	.do(() => PostActions.getPosts())	
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

export const Router$ 
	= Rx.Observable.merge(PostsRoute$);