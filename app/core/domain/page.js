import Rx from 'rx-dom';

// GetPosts
const UpdateIsBusyAction$ = new Rx.Subject();

const UpdatePageIsBusyHandler$ = UpdateIsBusyAction$
  .map(mapPageIsBusy);

function mapPageIsBusy(state) {
	return Object.assign({}, state, {
		posts: response,
    	isBusy: false
	});
}