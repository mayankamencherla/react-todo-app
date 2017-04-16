var React = require('react');

var AddTodo = React.createClass({
    handleSubmit: function(e) {
        e.preventDefault();

        var todo = this.refs.todo;

        if (typeof todo.value === 'string' && todo.value.length > 0) {
            {this.props.onNewTodo(todo.value)};
            todo.value = '';
        } else {
            todo.focus();
        }
    },
    render: function() {
        return (
            <div className="container__footer">
                <form onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="What do you need to do?" ref="todo" />
                    <button type="submit" className="button expanded">Submit</button>
                </form>
            </div>
        );
    }
});

module.exports = AddTodo;