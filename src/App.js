import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Header from './common/header';
import Home from './pages/home';
import './style.js';

class App extends Component {
	render(){
		return (
			<Provider store={store}>
				<div>
					<Header />
					<BrowserRouter>
						<Route exact path="/" component={Home} />
					</BrowserRouter>
				</div>
			</Provider>
		)
	}
}

export default App