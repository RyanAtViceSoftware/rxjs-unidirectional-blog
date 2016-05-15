import {Dispatcher, toMessage} from '../../infrastructure/dispatcher';
import {Actions} from './../actions';

export const Messages$ = Dispatcher
    .filter(x => x.action === Actions.SendMessage)
    .map(x => toMessage(x.data.type, x.data.data))
    .shareReplay(1);