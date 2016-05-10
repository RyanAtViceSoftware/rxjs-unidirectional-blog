import {Actions} from './actions';
import {Dispatcher, toAction} from '../infrastructure/dispatcher';

export const Router$ = Dispatcher
  .filter(x => x.action === Actions.InitializeApp)
  .map(toAction(Actions.ShowPosts))
  .shareReplay(1);