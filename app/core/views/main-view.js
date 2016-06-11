import React from 'react';
import Rx from 'rx-dom';
import {Router$} from './router-view';

export const MainView$ 
	= Router$.map(view => <div><h1>Hi</h1>{view}</div>)
		.catch(err => Rx.Observable.just('MainView$ error' + err));
