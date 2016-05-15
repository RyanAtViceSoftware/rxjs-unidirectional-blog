import Rx from 'rx-dom';
import {Actions} from './actions';
import {Dispatcher, toMessage, send} from '../infrastructure/dispatcher';
import {PostsView$} from './views/posts-view';

const RouterActions = {
	NavigateTo: 'NavigateTo'
}

export const RouterStates = {
	Default: 'Default',
	Posts: 'Posts'
}

export function navigateTo(state) {
	send(RouterActions.NavigateTo, state);
}

const NavigateTo$ = Dispatcher
	.filter(x => x.action === RouterActions.NavigateTo)
	.do(x => console.log(x))
	.map(x => x.data);
  

const Posts$ = NavigateTo$
	.do(x => console.log(x))
	.filter(state => state === RouterStates.Default ||
  		state === RouterStates.Posts)
	.do(x => send(Actions.GetPosts))
	.map(toMessage(Actions.ShowView, PostsView$))
	.shareReplay(1);

export const Router$ = Rx.Observable.merge(Posts$);