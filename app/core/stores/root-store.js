import Rx from 'rx-dom';
import {Posts$} from './posts';
import {Router$} from '../router'; 
import {Messages$} from './messages';

export const Stores$ 
	= Rx.Observable.merge(Router$, Posts$, Messages$);