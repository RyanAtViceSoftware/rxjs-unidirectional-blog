import ReactDOM from 'react-dom';
import content from './content';
import Rx from 'rx-dom';
import {send} from './infrastructure/dispatcher';
import {RootView$} from './core/views/root-view';
import {NavigateTo} from './core/router';

document.body.appendChild(content());

RootView$.subscribe(function(state) {
  console.log('state', state);
  ReactDOM.render(state, document.querySelector('#content'));
});

NavigateTo.posts();