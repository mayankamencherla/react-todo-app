var React = require('react');

var TodoApp = (props) => {
    return (
            <div>
                <p>TodoApp.jsx Rendered</p>
                {props.children}
            </div>
    );
}

module.exports = TodoApp;