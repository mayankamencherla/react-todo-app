var React = require('react');
var uuid = require('node-uuid');
var moment = require('moment');

import TodoList from 'TodoList';
var AddTodo = require('AddTodo');
var TodoSearch = require('TodoSearch');
var TodoApi = require('TodoApi');

var TodoApp = React.createClass({
    getInitialState: function() {
        return {
            searchText: "",
            showCompleted: false,
            todos: TodoApi.getTodos(),
        };
    },
    componentDidUpdate: function(prevProps, prevState) {
        TodoApi.setTodos(this.state.todos);
    },
    handleAddTodo: function(text) {
        this.setState({
            todos: [
                ...this.state.todos,
                {
                    id: uuid(),
                    text: text,
                    completed: false,
                    createdAt: moment().unix(),
                    completedAt: undefined,
                }
            ]
        });
    },
    handleSearch: function(searchText, showCompleted) {
        this.setState({
            searchText: searchText.toLowerCase(), 
            showCompleted: showCompleted
        });
    },
    render: function() {
        var {todos, showCompleted, searchText} = this.state;
        var filteredTodos = TodoApi.filterTodos(todos, showCompleted, searchText);

        return (
            <div>
                <h1 className="page-title">Todo App</h1>
                <div className="row">
                    <div className="column small-centered small-11 medium-6 large-4">
                        <div className="container">
                            <TodoSearch onSearch={this.handleSearch} />
                            <TodoList />
                            <AddTodo onNewTodo={this.handleAddTodo} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = TodoApp;