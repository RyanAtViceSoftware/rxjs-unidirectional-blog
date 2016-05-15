
import {PostsView$} from './views/posts-view';

const PostsView$ = Store$
	.do(x => console.log(x))
	.filter(state => state === RouterStates.Default ||
  		state === RouterStates.Posts)
	.do(x => request(Actions.GetPosts))
	.map(toResponse(Actions.ShowView, PostsView$))
	.shareReplay(1);

export const RouterViews$ = Rx.Observable.merge(PostsView$);
