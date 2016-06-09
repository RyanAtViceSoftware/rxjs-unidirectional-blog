import React from 'react';
import {State$} from '../domain/state';

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
	.do(x => console.log('PostsView$ before:', x))
    .filter(hasPosts)
    .map(postsToList);

function hasPosts(state) {
	return state.posts;
}