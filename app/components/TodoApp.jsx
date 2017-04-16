var React = require('react');

var TodoList = require('TodoList');
var AddTodo = require('AddTodo');

var TodoApp = React.createClass({
    getInitialState: function() {
        return {
            todos: [
                {
                    id: 1,
                    text: "Walk the dog"
                },
                {
                    id: 2,
                    text: "Clean the yard"
                },
                {
                    id: 3,
                    text: "Make a protein shake"
                },
                {
                    id: 4,
                    text: "Watch Andrew's lectures"
                },
            ],
        };
    },
    handleAddTodo: function(text) {
        alert('new todo : ' + text);
    },
    render: function() {
        var {todos} = this.state;

        return (
            <div>
                <p>TodoApp.jsx Rendered</p>
                <TodoList todos={todos} />
                <AddTodo onNewTodo={this.handleAddTodo} />
                {this.props.children}
            </div>
        );
    }
});

module.exports = TodoApp;