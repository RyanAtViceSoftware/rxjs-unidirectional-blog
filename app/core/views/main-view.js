import React from 'react';
import Rx from 'rx-dom';
import {Router$} from './router-view';

export const MainView$ 
	= Router$.map(view => <div><h1>Blog</h1>{view}</div>);
