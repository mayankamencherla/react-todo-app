var $ = require('jQuery');

module.exports = {
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
        // If a is not completed and b isn't, then a comes before b
        filteredTodos.sort((todo1, todo2) => {
            if (!todo1.completed && todo2.completed) {
                return -1;
            } else if (todo1.completed && !todo2.completed) {
                return 1;
            } else {
                return 0;
            }
        });

        return filteredTodos;
    }
};