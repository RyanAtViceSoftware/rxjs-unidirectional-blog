import Rx from 'rx-dom';

// GetPosts
const GetPostsAction$ = new Rx.Subject();

const GetPostsHandler$ = GetPostsAction$
  .flatMap(getPosts, mapPosts)
  .shareReplay(1);

function getPosts() {
	return Rx.DOM.getJSON(
    'http://jsonplaceholder.typicode.com/posts');
}

function mapPosts(state, response) {
	return Object.assign({}, state, {
		posts: response,
        isBusy: false
	});
}

// PostsIsBusy$
const PostsIsBusy$ = Rx.Observable.merge(GetPostsAction$)
  .map(mapPostsBusy);

function mapPostsBusy(state) {
  return Object.assign({}, state, {
		isBusy: true
	});
}

// Posts Actions
export const PostActions = {
  getPosts: function() {
    GetPostsAction$.onNext()
  }
}

// Post Action Handlers
export const Posts$ = Rx.Observable
  .merge(GetPostsHandler$, PostsIsBusy$);


