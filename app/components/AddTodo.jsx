var React = require('react');

var AddTodo = React.createClass({
    onFormSubmit: function(e) {
        e.preventDefault();

        var todo = this.refs.todo;

        if (typeof todo.value === 'string' && todo.value.length > 0) {
            {this.props.onNewTodo(todo.value)};
            todo.value = '';
        }
    },
    render: function() {
        return (
            <div className="todo-form">
                <form onSubmit={this.onFormSubmit}>
                    <input type="text" placeholder="Enter Todo" ref="todo" />
                    <button type="submit" className="button expanded">Submit</button>
                </form>
            </div>
        );
    }
});

module.exports = AddTodo;