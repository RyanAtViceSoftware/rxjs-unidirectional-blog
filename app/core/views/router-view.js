import React from 'react';
import {PostActions} from '../domain/posts';
import {State$} from '../domain/state';
import {PostsView$} from './posts-view';

const busyView = () => <span>Loading...</span>;

const PostsRouteInit$ = State$
	.do(x => console.log('PostsRouteInit$ before: ', x))
	.filter(state => state.route === 'posts' || state.route === '/')
	.distinctUntilChanged(state => state.route)
	.do(x => console.log('PostsRouteInit$ after .filter(): ', x))
	.do(() => PostActions.getPosts())	
	.do(x => console.log('PostsRouteInit$ after PostActions.getPosts(): ', x))
	.map(busyView);

const PostsRouteShowView$ = State$
	.do(x => console.log('PostsRouteShowView$ before: ', x))
	.filter(state => state.route === 'posts' || state.route === '/')
	.do(x => console.log('PostsRouteShowView$ after filter: ', x))
 	.switchMap(PostsView$)
	.do(x => console.log('PostsRouteShowView$ after .switchMap(): ', x));

const PostsRoute$ 
	= Rx.Observable.merge(PostsRouteInit$, PostsRouteShowView$);

export const Router$ 
	= Rx.Observable.merge(PostsRoute$);