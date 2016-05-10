import Rx from 'rx-dom';
import React from 'react';
import {Stores$} from '../stores/rootStore';
import {send} from '../../infrastructure/dispatcher';
import {Actions} from '../actions';
import {PostsView$} from './posts-view';

export const MainView$ = Stores$
  .filter(x => x.action === Actions.ShowPosts)
  .do(() => send(Actions.GetPosts))
  .flatMap(PostsView$)
  .map(view => <div><h1>Hi</h1>{view}</div>)
  .shareReplay(1);