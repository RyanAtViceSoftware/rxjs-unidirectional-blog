import React from 'react';
import {dispatcher$} from '../../infrastructure/dispatcher';

export const routerActions = {
	setIsBusy: 'setIsBusy'
}

const SetIsBusy$ = dispatcher$
	.filter(x => x.action === routerActions.setIsBusy)
	.map(mapIsBusy)
	.shareReplay(1);

function mapIsBusy(dispatcherAction) {
	return function(state) {
		return Object.assign({}, state, dispatcherAction, {
			isBusy: true
		});
	}
}

export const RouterState$ 
	= Rx.Observable.merge(SetIsBusy$);