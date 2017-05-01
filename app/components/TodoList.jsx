var React = require('react');

var {connect} = require('react-redux');
import Todo from 'Todo';

var TodoApi = require('TodoApi');

export var TodoList = React.createClass({
    render: function() {
        var {todos, showCompleted, searchText} = this.props;

        var filteredTodos = TodoApi.filterTodos(todos, showCompleted, searchText);

        var renderTodos = () => {
            if (filteredTodos.length === 0) {
                return (<p className="container__message">Nothing to do.</p>);
            }

            return TodoApi.filterTodos(todos, showCompleted, searchText).map((todo) => {
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
        return state;
    }
)(TodoList);