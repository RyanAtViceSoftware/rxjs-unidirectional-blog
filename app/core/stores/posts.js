import Rx from 'rx-dom';
import {Dispatcher, toMessage} from '../../infrastructure/dispatcher';
import {Messages} from './../messages';
import {Actions} from './../actions';
import {send, sendMessage} from '../../infrastructure/dispatcher';

export const Posts$ = Dispatcher
    .filter(x => x.action === Actions.GetPosts)
    .do(x => sendMessage(Messages.PostsIsBusy))
    .flatMap(() => 
    	Rx.DOM.getJSON('http://jsonplaceholder.typicode.com/posts'))
    .catch(handleError)
    .map(users => toMessage(Messages.PostsUpdated, users))
    .shareReplay(1);

function handleError(error) {
	send(
		Actions.RequestError, 
		{ displayMessage: 'Error getting posts', error: error}
	);
} 
    	