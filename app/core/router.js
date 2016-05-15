import {Dispatcher, send, toMessage} from '../infrastructure/dispatcher';

export const RouterActions = {
	NavigateTo: 'NavigateTo'
}

export function navigateTo(state) {
	send(RouterActions.NavigateTo, state);
}

export const Router$ = Dispatcher
	.filter(x => x.action === RouterActions.NavigateTo)
	.map(x => toMessage(RouterActions.NavigateTo, x.data))
	.shareReplay(1);




