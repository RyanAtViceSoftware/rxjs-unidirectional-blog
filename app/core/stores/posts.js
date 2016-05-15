import Rx from 'rx-dom';
import {Dispatcher, toMessage} from '../../infrastructure/dispatcher';
import {Messages} from './../messages';
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
    .map(users => toMessage(Messages.PostsUpdated, users))
    .shareReplay(1);