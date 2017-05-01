var React = require('react');
var ReactDOM = require('react-dom');
var {Provider} = require('react-redux');
var {Route, Router, IndexRoute, hashHistory} = require('react-router');

var TodoApp = require('TodoApp');
var TodoApi = require('TodoApi');

var actions = require('actions');
var store = require('configureStore').configure();

// Load foundation
require('style!css!foundation-sites/dist/foundation.min.css');
$(document).foundation();

// Load custom css
require('!style!css!sass!applicationStyles');

store.dispatch(actions.startAddTodos());

ReactDOM.render(
        <Provider store={store}>
            <TodoApp />
        </Provider>,
    document.getElementById('app')
);
