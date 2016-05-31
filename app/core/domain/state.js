import Rx from 'rx-dom';
import {Posts$} from './posts';

export const State$ = Rx.Observable.merge(Posts$);