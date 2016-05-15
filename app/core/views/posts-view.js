import Rx from 'rx-dom';
import React from 'react';
import {Stores$} from '../stores/root-store';
import {Actions} from '../actions';
import {Messages} from '../messages';
import {send} from '../../infrastructure/dispatcher';
import {RouterMessages, RouterStates} from '../router-view';

const PostUpdated$ = Stores$
  .filter(x => x.type === Messages.PostsUpdated)
  .map(postsToList)
  .shareReplay(1);

const ShowBusy$ = Stores$
  .filter(x => x.type === Messages.PostsIsBusy)
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
  return <div>Loading...</div>;
}

export const PostsView$ 
  = Rx.Observable.merge(PostUpdated$, ShowBusy$);
