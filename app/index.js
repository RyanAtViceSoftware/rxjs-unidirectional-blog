import ReactDOM from 'react-dom';
import content from './content';
import {RootView$} from './core/views/root-view';
import {navigateTo} from './core/router';
import {RouterStates} from './core/router-view';

document.body.appendChild(content());

RootView$.subscribe(function(state) {
  ReactDOM.render(state, document.querySelector('#content'));
});

navigateTo(RouterStates.Default);