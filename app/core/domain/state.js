import Rx from 'rx-dom';
import {Posts$} from './posts';
import initialState from './initial-state';

export const State$ = Rx.Observable.merge(Posts$);