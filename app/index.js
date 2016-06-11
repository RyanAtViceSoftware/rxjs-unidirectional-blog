import ReactDOM from 'react-dom';
import content from './content';
import Rx from 'rx-dom';
import {MainView$} from './core/views/main-view';
import {NavigateTo} from './core/domain/router';
import {PostActions} from './core/domain/posts';

document.body.appendChild(content());

MainView$.subscribe(
	function(view) {
		ReactDOM.render(view, document.querySelector('#content'));
	}, 
	function(error) {
		console.error('MainView$ error:', error);
	}, 
	function() {
		console.debug('MainView$ complete');
	});