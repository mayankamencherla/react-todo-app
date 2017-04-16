var $ = require('jQuery');

module.exports = {
    setTodos: function(todos) {
        if ($.isArray(todos)) {
            localStorage.setItem('todos', JSON.stringify(todos));
            return todos;
        }
    },
    getTodos: function() {
        var stringTodos = localStorage.getItem('todos');
        var todos = [];

        try {
            todos = JSON.parse(stringTodos);
        } catch (e) {
            alert(e);
        }

        return ($.isArray(todos) === true ? todos : []);
    },
    filterTodos: function(todos, showCompleted, searchText) {
        var filteredTodos = todos;

        // If the todo is incomplete or if the showCompleted 
        // button is clicked, then show the todo
        filteredTodos = filteredTodos.filter((todo) => {
            return !todo.completed || showCompleted;
        });

        // filter by search text
        filteredTodos = filteredTodos.filter((todo) => {
            return todo.text.toLowerCase().includes(searchText.toLowerCase());
        });

        // sort and move incomplete todos to the top

        return filteredTodos;
    }
};