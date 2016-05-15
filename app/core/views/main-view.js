import Rx from 'rx-dom';
import React from 'react';
import {Router$} from '../router';
import {send} from '../../infrastructure/dispatcher';
import {Messages} from '../messages';
import {Stores$} from '../stores/root-store';
import {RouterView$, RouterMessages} from '../router-view';

export const MainView$ = Stores$
	.filter(x => x.type === RouterMessages.NavigateTo)
	.flatMap(RouterView$)
	.map(view => <div><h1>Blog</h1>{view}</div>)
	.shareReplay(1);

function mapToView(x) {
	return RouterView$;
}
