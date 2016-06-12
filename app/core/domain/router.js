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

const ShowBusyAction$ = new Rx.Subject();

const ShowBusyHandler$ = ShowBusyAction$
	.map(mapShowBusy);

function mapShowBusy() {
	return function(state) {
		return Object.assign({}, state, {
			isBusy: true
		});
	};
}

export const RouterState$ = Rx.Observable
	.merge(ShowPostsHandler$, ShowBusyHandler$);

export const NavigateTo = {
	posts: function () {
		ShowPostsAction$.onNext();
	},
	busy: function() {
		ShowBusyAction$.onNext();
	}
}