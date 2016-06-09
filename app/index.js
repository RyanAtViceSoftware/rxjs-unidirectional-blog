import ReactDOM from 'react-dom';
import content from './content';
import Rx from 'rx-dom';
import {RootView$} from './core/views/root-view';
import {NavigateTo} from './core/domain/router';

document.body.appendChild(content());

RootView$.subscribe(
	function(view) {
		console.log('test');
		console.log('subscribe: ', view);
		ReactDOM.render(view, document.querySelector('#content'));
		console.log('render sucess');
	}, 
	function(error) {
		console.error('RootView$ error:', error);
	}, 
	function() {
		console.log('RootView$ complete');
	});