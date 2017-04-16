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
                    text: "Walk the dog",
                    completed: false,
                },
                {
                    id: uuid(),
                    text: "Clean the yard",
                    completed: true,
                },
                {
                    id: uuid(),
                    text: "Make a protein shake",
                    completed: true,
                },
                {
                    id: uuid(),
                    text: "Watch Andrew's lectures",
                    completed: false,
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
                    text: text,
                    completed: false
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
    handleToggle: function(id) {
        var updatedTodos = this.state.todos.map((todo) => {
            if (todo.id === id){
                todo.completed = !todo.completed;
            }

            return todo;
        });

        this.setState({todos: updatedTodos});
    },
    render: function() {
        var {todos} = this.state;

        return (
            <div>
                <p>TodoApp.jsx Rendered</p>
                <TodoSearch onSearch={this.handleSearch} />
                <TodoList todos={todos} onToggle={this.handleToggle} />
                <AddTodo onNewTodo={this.handleAddTodo} />
                {this.props.children}
            </div>
        );
    }
});

module.exports = TodoApp;