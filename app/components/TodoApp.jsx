var React = require('react');
var uuid = require('node-uuid');

var TodoList = require('TodoList');
var AddTodo = require('AddTodo');
var TodoSearch = require('TodoSearch');

var TodoApp = React.createClass({
    getInitialState: function() {
        return {
            searchText: "",
            showCompleted: false,
            todos: [
                {
                    id: uuid(),
                    text: "Walk the dog"
                },
                {
                    id: uuid(),
                    text: "Clean the yard"
                },
                {
                    id: uuid(),
                    text: "Make a protein shake"
                },
                {
                    id: uuid(),
                    text: "Watch Andrew's lectures"
                },
            ],
        };
    },
    handleAddTodo: function(text) {
        this.setState({
            todos: [
                ...this.state.todos,
                {
                    id: uuid(),
                    text: text
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
        var {todos} = this.state;

        return (
            <div>
                <p>TodoApp.jsx Rendered</p>
                <TodoSearch onSearch={this.handleSearch} />
                <TodoList todos={todos} />
                <AddTodo onNewTodo={this.handleAddTodo} />
                {this.props.children}
            </div>
        );
    }
});

module.exports = TodoApp;