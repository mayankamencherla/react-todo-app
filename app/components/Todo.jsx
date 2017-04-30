var React = require('react');

var {connect} = require('react-redux');
var actions = require('actions');

var moment = require('moment');

export var Todo = React.createClass({
    render: function() {
        var {id, text, completed, createdAt, completedAt, dispatch} = this.props;
        var todoClassName = completed ? 'todo todo-completed' : 'todo';
        var renderDate = () => {
            var message = 'Created ';
            var timestamp = createdAt;

            if (completed) {
                message = 'Completed';
                timestamp = completedAt;
            }

            var currMoment = moment.unix(timestamp).format('MMMM Do, YYYY @ h:mm A');
            return `${message} ${currMoment}`;
        };

        return (
            <div className={todoClassName} onClick={() => {
                dispatch(actions.startToggleTodo(id, !completed));
            }}>
                <div>
                    <input type="checkbox" checked={completed} />
                </div>
                <div>
                    <p>{text}</p>
                    <p className="todo__subtext">{renderDate()}</p>
                </div>
            </div>
        );
    }
});

export default connect()(Todo);