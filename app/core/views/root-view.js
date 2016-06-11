import Rx from 'rx-dom';
import {MainView$} from './main-view';

export const RootView$ = Rx.Observable.merge(MainView$);