var React = require('react');
var ReactDOM = require('react-dom');
var {Provider} = require('react-redux');
var {hashHistory} = require('react-router');

import firebase from 'app/firebase/';

var actions = require('actions');
var store = require('configureStore').configure();

import router from 'app/router/';

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

ReactDOM.render(
    <Provider store={store}>
        {router}
    </Provider>,
    document.getElementById('app')
);
