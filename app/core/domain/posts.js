import Rx from 'rx-dom';

// GetPosts
const GetPostsAction$ = new Rx.Subject();

const GetPostsHandler$ = GetPostsAction$
  .do(x => console.log('GetPostsAction$', x))
  .flatMap(getPosts, mapPosts)
  .do(x => console.log('Posts mapped', x))
  .shareReplay(1);

function getPosts() {
    console.log('getPosts');
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
  .do(x => console.log('PostsIsBusy$', x))
  .map(mapPostsBusy);

function mapPostsBusy(state) {
  console.log('projectGetPostsBusy');
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


