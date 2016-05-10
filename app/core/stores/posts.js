import Rx from 'rx-dom';
import {Dispatcher, toAction} from '../../infrastructure/dispatcher';
import {Actions} from './../actions';

export const Posts$ = Dispatcher
    .filter(x => x.action === Actions.GetPosts)
    // Fetch a list of users from GitHub.
    .flatMap(() => Rx.DOM.getJSON('http://jsonplaceholder.typicode.com/posts'))
    // Format the response. Carry the action through.
    .map(users => toAction(Actions.PostsUpdated, users))
    // Cache the response so multiple subscribers can grab
    // this data without triggering redundant ajax requests.
    .shareReplay(1);