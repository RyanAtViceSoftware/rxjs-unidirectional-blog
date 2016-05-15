import Rx from 'rx-dom';
import {Dispatcher, toAction} from '../../infrastructure/dispatcher';
import {Actions} from './../actions';
import {send} from '../../infrastructure/dispatcher';

export const Posts$ = Dispatcher
    .filter(x => x.action === Actions.GetPosts)
    .flatMap(() => 
    	Rx.DOM.getJSON('http://jsonplaceholder.typicode.com/posts'))
    .catch(error => 
    	send(
    		Actions.RequestError, 
    		{ displayMessage: 'Error getting posts', error: error}
		)
	)
    .map(users => toAction(Actions.PostsUpdated, users))
    .shareReplay(1);