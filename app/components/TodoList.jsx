var React = require('react');

var {connect} = require('react-redux');
import Todo from 'Todo';

export var TodoList = React.createClass({
    render: function() {
        var {todos} = this.props;
        var renderTodos = () => {
            if (todos.length === 0) {
                return (<p className="container__message">Nothing to do.</p>);
            }

            return todos.map((todo) => {
                return (
                    <Todo key={todo.id} {...todo} />
                );
            });
        };

        return (
            <div>
                {renderTodos()}
            </div>
        );
    }
});

// Connecting Provider to TodoList
// Making a prop called todos and setting it to state.todos
export default connect(
    (state) => {
        return {
            todos: state.todos
        };
    }
)(TodoList);