import Rx from 'rx-dom';
import {bus$} from '../../infrastructure/bus';
import {routerMessages} from './router';

// GetPosts
export const postMessages = {
	getPosts: 'getPosts'
}

const GetPosts$ = bus$
	.filter(x => x.message === postMessages.getPosts)
	.flatMap(getPosts)
	.map(mapPosts)
	.shareReplay(1); // Prevent's multiple calls by buffering one call to share for all subscribers

function getPosts() {
	return Rx.DOM.getJSON(
		'http://jsonplaceholder.typicode.com/posts');
		
	// Uncomment this and comment the code above to run on stubbed data
	// return Rx.Observable.just(
	// 	[
	// 	  {
	// 	    "userId": 1,
	// 	    "id": 1,
	// 	    "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
	// 	    "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
	// 	  },
	// 	  {
	// 	    "userId": 1,
	// 	    "id": 2,
	// 	    "title": "qui est esse",
	// 	    "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
	// 	  }
	// 	]);
}

function mapPosts(response) {
	return function(response, state) {
		return Object.assign({}, state, {
			posts: response,
			isBusy: false
		});
	}.bind(null, response);
}

export const Posts$ 
	= Rx.Observable.merge(GetPosts$);
