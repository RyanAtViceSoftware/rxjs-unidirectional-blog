import ReactDOM from 'react-dom';
import content from './content';
import Rx from 'rx-dom';
import {MainView$} from './core/views/main-view';
import {NavigateTo} from './core/domain/router';

document.body.appendChild(content());

MainView$.subscribe(
	function(view) {
		console.log('test');
		console.log('subscribe: ', view);
		ReactDOM.render(view, document.querySelector('#content'));
		console.log('render sucess');
	}, 
	function(error) {
		console.error('MainView$ error:', error);
	}, 
	function() {
		console.log('MainView$ complete');
	});

MainView$.subscribe(() => console.log('=>State$'));