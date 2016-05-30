import Rx from 'rx-dom';
import {Posts$} from './posts';

const intialState = {isBusy: true};

export const State$ = Rx.Observable.merge(Posts$)
  .startWith({ isBusy: true, foo: 'bar'});