import Rx from 'rx-dom';

// GetPosts
const SetIsBusyAction$ = new Rx.Subject();

const SetIsBusyHandler$ = SetIsBusyAction$
	.map(mapIsBusy)
	.shareReplay(1);

function mapIsBusy() {
	return function(response, state) {
		return Object.assign({}, state, {
			isBusy: true
		});
	}
}  

const GetPostsAction$ = new Rx.Subject();

const GetPostsHandler$ = GetPostsAction$
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

// Posts Actions
export const PostActions = {
	getPosts: function() {
		GetPostsAction$.onNext();
	},
	setIsBusy: function() {
		SetIsBusyAction$.onNext();
	}
}

// Post Action Handlers
export const Posts$ = Rx.Observable
	.merge(GetPostsHandler$, SetIsBusyHandler$);
