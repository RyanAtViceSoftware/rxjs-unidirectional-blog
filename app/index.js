import ReactDOM from 'react-dom';
import content from './content';
import {MainView$} from './core/views/main-view';

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