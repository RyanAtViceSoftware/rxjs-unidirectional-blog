import ReactDOM from 'react-dom';
import content from './content';
import Rx from 'rx-dom';
import {Actions} from './core/actions';
import {send} from './infrastructure/dispatcher';
import {RootView$} from './core/views/root-view';

document.body.appendChild(content());

RootView$.subscribe(function(state) {
  ReactDOM.render(state, document.querySelector('#content'));
});

send(Actions.InitializeApp);