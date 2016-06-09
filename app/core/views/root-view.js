import Rx from 'rx-dom';
import {MainView$} from './main-view';
import {PostsView$} from './posts-view';


export const RootView$ 
	= Rx.Observable.merge(MainView$);