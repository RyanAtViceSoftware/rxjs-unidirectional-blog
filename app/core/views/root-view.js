import Rx from 'rx-dom';
import {MainView$} from './main-view';
import {PostsView$} from './posts-view';
import {RouterView$} from '../router-view';

export const RootView$ 
	= Rx.Observable.merge(MainView$, PostsView$, RouterView$);