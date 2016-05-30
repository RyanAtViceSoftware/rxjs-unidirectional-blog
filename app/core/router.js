import React from 'react';
import {PostActions} from './domain/posts';
import {PostsView$} from './views/posts-view';
import {State$} from './domain/state';

const ShowPosts$ = new Rx.Subject();

export const NavigateTo = {
	posts: function () {
		ShowPosts$.onNext();
	}
}

const PostsRoute$ = ShowPosts$
	.do(() => PostActions.getPosts())
	.switchMap(PostsView$);

const BusyRoute$ = State$
	.filter(state => state.isBusy)
	.map(() => <span>Loading...</span>);

export const Router$ = Rx.Observable.merge(PostsRoute$, BusyRoute$);