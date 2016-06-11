import React from 'react';

const ShowPostsAction$ = new Rx.Subject();

const ShowPostsHandler$ = ShowPostsAction$
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

export const NavigateTo = {
	posts: function () {
		ShowPostsAction$.onNext();
	}
}