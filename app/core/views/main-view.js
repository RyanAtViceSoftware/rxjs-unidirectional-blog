import Rx from 'rx-dom';
import React from 'react';
import {Router$} from '../router';
import {send} from '../../infrastructure/dispatcher';
import {Actions} from '../actions';


export const MainView$ = Router$
	.do(x => console.log(x))
	.filter(x => x.action === Actions.ShowView)
	.do(x => console.log(x))
	.flatMap(mapToView)
	.map(view => <div><h1>Hi</h1>{view}</div>)
	.shareReplay(1);

function mapToView(x) {
	return x.data;
}

  