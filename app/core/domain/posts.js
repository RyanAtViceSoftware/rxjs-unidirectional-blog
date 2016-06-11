import Rx from 'rx-dom';

// GetPosts
const GetPostsAction$ = new Rx.Subject();

const GetPostsHandler$ = GetPostsAction$
	.do(x => console.log('GetPostsHandler$: ', x))
	.flatMap(getPosts)
	.catch(err => Rx.Observable.just('GetPostsHandler$ error: ' + error))
	.do(x => console.log('GetPostsHandler$: after flatMap', x))
	.map(mapPosts)
	.do(x => console.log('GetPostsHandler$ after: ', x))
	.shareReplay(1); // Prevent's multiple calls

function getPosts() {
	console.log('getPosts()');
	return Rx.DOM.getJSON(
		'http://jsonplaceholder.typicode.com/posts')
		.catch(err => Rx.Observable.just('getPosts() error: ' + error)) ;
}

function mapPosts(response) {
	return function(response, state) {
		console.log('mapPosts : ', response);
		return Object.assign({}, state, {
			posts: response,
			isBusy: false
		});
	}.bind(null, response);
}

// Posts Actions
export const PostActions = {
	getPosts: function() {
		console.log('PostActions$.getPosts()');
		GetPostsAction$.onNext();
	}
}

// Post Action Handlers
export const Posts$ = Rx.Observable
	.merge(GetPostsHandler$);
