import {Stores$} from './stores/root-store';
import {PostsView$} from './views/posts-view';
import {Actions} from './actions';
import {Messages} from './messages';
import {toMessage, send} from '../infrastructure/dispatcher';
import {RouterActions} from './router'

export const RouterStates = {
	Default: 'Default',
	Posts: 'Posts'
}

export const RouterMessages = {
	NavigateTo: RouterActions.NavigateTo
}

function toRouterState(state, view) {
	return toMessage(
		Messages.ShowView, 
		{ state: state, view: view }
	);
}

const Posts$ = Stores$
	.filter(x => x.type === RouterMessages.NavigateTo)
	.filter(x => x.data === RouterStates.Default ||
  		x.data === RouterStates.Posts)
	.do(x => send(Actions.GetPosts))
	.flatMap(PostsView$)
	.shareReplay(1);

export const RouterView$ = Rx.Observable.merge(Posts$);