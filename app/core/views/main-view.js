import Rx from 'rx-dom';
import React from 'react';
import {Router$} from '../router';
import {send} from '../../infrastructure/dispatcher';
import {Messages} from '../messages';

console.log('mainview');

export const MainView$ = Router$
	.do(x => console.log('MainView', x))
	.filter(x => x.type === Messages.ShowView)
	.do(x => console.log(x))
	.flatMap(mapToView)
	.map(view => <div><h1>Hi</h1>{view}</div>)
	.shareReplay(1);

function mapToView(x) {
	return x.data;
}
