var React = require('react');
var ReactDOM = require('react-dom');
var {Provider} = require('react-redux');
var {Route, Router, IndexRoute, hashHistory} = require('react-router');

var TodoApi = require('TodoApi');
import TodoApp from 'TodoApp';
import Login from 'Login';
import firebase from 'app/firebase/';

var actions = require('actions');
var store = require('configureStore').configure();

// On login, go to todos
// On logout, go to /
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        hashHistory.push('/todos');
    } else {
        hashHistory.push('/');
    }   
});

// Load foundation
require('style!css!foundation-sites/dist/foundation.min.css');
$(document).foundation();

// Load custom css
require('!style!css!sass!applicationStyles');

store.dispatch(actions.startAddTodos());

// Sending user back to login page if user not logged in
var requireLogin = (nextState, replace, next) => {
    if (!firebase.auth().currentUser) {
        replace('/');
    }
    next();
};

// Redirect to todos page if user already logged in 
var redirectIfLoggedIn = (nextState, replace, next) => {
    if (firebase.auth().currentUser) {
        replace('/todos');
    }
    next();
};

ReactDOM.render(
    <Provider store={store}>
        <Router hitory={hashHistory}>
            <Route path="/">
                <Route path="todos" component={TodoApp} onEnter={requireLogin} />
                <IndexRoute component={Login} onEnter={redirectIfLoggedIn} />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('app')
);
