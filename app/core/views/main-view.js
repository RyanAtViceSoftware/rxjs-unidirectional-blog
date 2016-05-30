import React from 'react';
import {Router$} from '../router';

export const MainView$ 
	= Router$.map(view => <div><h1>Hi</h1>{view}</div>);