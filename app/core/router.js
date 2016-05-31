import React from 'react';
import {PostActions} from './domain/posts';
import {PostsView$} from './views/posts-view';
import {State$} from './domain/state';
import initialState from './domain/initial-state';

const ShowPostsAction$ = new Rx.Subject();

const ShowPostsHandler$ = ShowPostsAction$
	.do(x => console.log('showPostsactions', x))
	.map(mapShowPosts);

function mapShowPosts() {
	return function(state) {
		return Object.assign({}, state, {
			route: 'posts'
		});
	};
}

const RouterState$ = Rx.Observable
	.merge(State$, ShowPostsHandler$)
	.startWith(initialState)
	.do(x => console.log('RouterState$', x))
	.scan(function (state, project) {
		console.log('state, project', state, project);
		return project(state);
	})
	.do(x => console.log('scan', x))

export const NavigateTo = {
	posts: function () {
		ShowPostsAction$.onNext();
	}
}

const PostsRoute$ = RouterState$
	.filter(state => state.route === 'posts')
	.do(() => PostActions.getPosts())
	.switchMap(PostsView$);

const BusyRoute$ = RouterState$
	.filter(state => state.isBusy)
	.map(() => <span>Loading...</span>);

export const Router$ = Rx.Observable.merge(PostsRoute$, BusyRoute$);