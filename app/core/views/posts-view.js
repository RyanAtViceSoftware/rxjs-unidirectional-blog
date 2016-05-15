import Rx from 'rx-dom';
import React from 'react';
import {Stores$} from '../stores/rootStore';
import {Actions} from '../actions';
import {send} from '../../infrastructure/dispatcher';

const PostUpdated$ = Stores$
  .do(x => console.log(x))
  .filter(x => x.action === Actions.PostsUpdated)
  .map(postsToList)
  .shareReplay(1);

const ShowPosts$ = Stores$
  .do(x => console.log('showposts', x))
  .filter(x => x.action === Actions.ShowPosts)
  .do(x => send(Actions.GetPosts))
  .map(mapToEmptyList)
  .shareReplay(1);

function postRow(post) { 
  return (
    <li key={post.id}>{post.title}</li>
  );
};

function postsToList({data}) {
  return (
    <ul>{data.map(postRow)}</ul>
  );
};

function mapToEmptyList() {
  return <div>No posts</div>;
}

export const PostsView$ = Rx.Observable.merge(PostUpdated$, ShowPosts$);
