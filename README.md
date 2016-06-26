# rxjs-unidirectional-blog
Sample code showing how to build a blog using RxJs to implement unidirectional data flows in React using RxJs.

# Running the Code
1. ```npm install```
2. ```npm start```
3. Open ```http://localhost:8080/``` in a browser

# Approach
I'm exploring implementing one way data flows with Functional Reactive Programming libraries and here I'm using RxJs. It's very easy to implement messaging patterns (actions and dispatcher) in RxJs. An added benifit of using RxJs is that it's also very easy to implement immutable application state and mutators (Redux style approach).

In this code we are using a Subject for our dispatcher as shown below.

```javascript
export const dispatcher$ = new Rx.Subject();

dispatcher$.subscribe(x => console.debug('bus:', x));

export function send(action) {
	console.debug('send:', action)
	dispatcher$.onNext({action: action});
}
```

An Rx subject is basically a bus that allows for sending messages (or actions in our case). We've created a conveince method for sending actions, ```send()```, and we ```console.debug``` the actions to the console for debugging.

Now we can have our stores react to actions as shown below.

```javascript
const SetIsBusy$ = dispatcher$
	.filter(x => x.action === routerActions.setIsBusy)
	.map(mapIsBusy)
	.shareReplay(1); // Prevent's multiple calls by buffering one call to share for all subscribers

function mapIsBusy(dispatcherAction) {
	return function(state) {
		return Object.assign({}, state, dispatcherAction, {
			isBusy: true
		});
	}
}
```

By convention we have all our stores return a function that mutates our application state (Reducer in Redux). We then merge all our our stores to create our application state as shown below.

```javascript
export const State$ = Rx.Observable.merge(Posts$, RouterState$)
	.startWith(initialState)
	.scan(function (state, project) {
		return project(state);
	})
	.do(x => console.debug('State$:', x));
```

Once we merge all our stores we will have a stream of state mutators (reducers) that we can simply apply to the current state to get our next state. This results in ```State$``` being a stream of immutable application states.

The only thing left is wiring up our views to render based on the current application state. Below is our ```PostsView$``` that renders the posts we fetch from the http://jsonplaceholder.typicode.com/ API.

```javascript
var postRow = function(post) { 
	return (
		<li key={post.id}>{post.title}</li>
	);
};

var postsToList = function({posts}) {
	return (
		<ul>{posts.map(postRow)}</ul>
	);
};

export const PostsView$ = State$
	.filter(hasPosts)
	.map(postsToList);

function hasPosts(state) {
	return state.posts;
}
```

Here if the state has posts then we render them and return the view as output of the stream. We then use that view in our MainView$ as shown below.

```javscript
export const MainView$ 
	= Router$
		.map(view => <div><h1>Blog</h1>{view}</div>);
```

We then wire up ```MainView$``` in ```index.js``` to render the latest view using the ```ReactDOM.render()``` method as shown below.

```javascript
MainView$.subscribe(
	function(view) {
		ReactDOM.render(view, document.querySelector('#content'));
	}, 
	function(error) {
		console.error('MainView$ error:', error);
	}, 
	function() {
		console.debug('MainView$ complete');
	});
```
