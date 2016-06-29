# rxjs-unidirectional-blog
Sample code showing how to build a blog using RxJs to implement unidirectional data flows in React using RxJs.

# Running the Code
1. ```npm install```
2. ```npm start```
3. Open ```http://localhost:8080/``` in a browser

# How the App Works
The app is a simple blog application that feteches all the posts from http://jsonplaceholder.typicode.com/posts which is a testing API. At this time the site features:

1. Async call and busy indicator
    1. The site will call the ```/posts``` endpoint and while waiting for a response will display "Loading..." to the user as shown below.

        ![image](https://cloud.githubusercontent.com/assets/10080111/16415888/26c29a66-3d05-11e6-9e06-0e434dfae0b8.png)

    2. Once the API returns the site will show a list of post titles as shown below.
    
        ![image](https://cloud.githubusercontent.com/assets/10080111/16416075/0f92d2b0-3d06-11e6-8560-58d7ee55577f.png)

2. Router with Default Route
   1. I began to explore how routing would work by implementing a default route. 

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

# What's Next?
OK, so that's cool, we have shown how to do an async call but what all do we need to demonstrate before we could provide a useful starting point. Based on my experience I think we need to demonstrate the items that follow. After that I'd feel confident in taking on a project using this approach.

1. Explore using .startWith() for each store to provide initial state (ala Redux)
1. Explore stream lifetime management - how to make streams unsubscribe
1. Explore routing more
1. Explore error handling
1. Adding interactivity
1. Forms
1. Validations
1. Tests
