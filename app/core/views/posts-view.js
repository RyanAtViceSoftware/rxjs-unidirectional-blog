import Rx from 'rx-dom';
import React from 'react';
import {Stores$} from '../stores/rootStore';
import {Actions} from '../actions';

var postRow = function(post) { 
  return (
    <li key={post.id}>{post.title}</li>
  );
};

var postsToList = function({data}) {
  return (
    <ul>{data.map(postRow)}</ul>
  );
};

export const PostsView$ = Stores$
    .filter(x => x.action === Actions.PostsUpdated)
    .map(postsToList)
    .shareReplay(1);