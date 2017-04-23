var React = require('react');
var ReactDOM = require('react-dom');
var {Route, Router, IndexRoute, hashHistory} = require('react-router');

var TodoApp = require('TodoApp');

var actions = require('actions');
var store = require('configureStore').configure();

// Load foundation
require('style!css!foundation-sites/dist/foundation.min.css');
$(document).foundation();

// Load custom css
require('!style!css!sass!applicationStyles');

store.subscribe(() => {
    console.log('newState', store.getState());
});

store.dispatch(actions.addTodo('Clean the yard'));
store.dispatch(actions.setSearchText('yard'));
store.dispatch(actions.toggleShowCompleted());

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={TodoApp}>
            
        </Route>
    </Router>,
    document.getElementById('app')
);