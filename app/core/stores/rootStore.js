import Rx from 'rx-dom';
import {Posts$} from './posts';
import {Router$} from '../router'; 

export const Stores$ = Rx.Observable.merge(Router$, Posts$);