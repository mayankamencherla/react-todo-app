var expect = require('expect');

var TodoApi = require('TodoApi');

describe('TodoApi', () => {
    beforeEach(() => {
        localStorage.removeItem('todos');
    });

    it('should exist', () => {
        expect(TodoApi).toExist();
    });

    describe('setTodos', () => {
        it('should set valid todos array', () => {
            var todos = [
                {
                    id: 1, 
                    text: 'Walk the dogs',
                    completed: true,
                },
                {
                    id: 2, 
                    text: 'Play Fifa',
                    completed: false,
                }
            ];

            TodoApi.setTodos(todos);

            var actualTodos = JSON.parse(localStorage.getItem('todos'));

            expect(actualTodos).toEqual(todos);
        });

        it('should not set invalid todos array', () => {
            var todos = {
                id: 1, 
                text: 'Walk the dogs',
                completed: true,
            };

            TodoApi.setTodos(todos);

            var actualTodos = JSON.parse(localStorage.getItem('todos'));

            expect(actualTodos).toNotEqual(todos);
            expect(actualTodos).toBe(null);
        });
    });

    describe('getTodos', () => {
        it('should get todos if valid todos array in localStorage', () => {
            var todos = [
                {
                    id: 1, 
                    text: 'Walk the dogs',
                    completed: true,
                },
                {
                    id: 2, 
                    text: 'Play Fifa',
                    completed: false,
                }
            ];

            localStorage.setItem('todos', JSON.stringify(todos));

            var actualTodos = TodoApi.getTodos();
            expect(actualTodos).toEqual(todos);
        });

        it('should return [] for bad localStorage data', () => {
            var actualTodos = TodoApi.getTodos();
            expect(actualTodos).toEqual([]);
        });
    });

    describe('filterTodos', () => {
        var todos = [
            {
                id: 1,
                text: 'Some text here',
                completed: true
            },
            {
                id: 2,
                text: 'Some other text here',
                completed: false
            },
            {
                id: 3,
                text: 'Some more text here',
                completed: true
            }
        ];

        it('should return 3 items if showCompleted is true', () => {
            var filteredTodos = TodoApi.filterTodos(todos, true, "");
            expect(filteredTodos.length).toBe(todos.length);
        });

        it('should return 1 item if showCompleted is false', () => {
            var filteredTodos = TodoApi.filterTodos(todos, false, "");
            expect(filteredTodos.length).toBe(1);
        });

        it('should return 1 todo if other is passed in as searchText', () => {
            var filteredTodos = TodoApi.filterTodos(todos, true, 'other');
            expect(filteredTodos.length).toBe(1);
        });

        it('should place the completed item after the incomplete item', () => {
            var filteredTodos = TodoApi.filterTodos(todos, true, '');
            expect(filteredTodos[0].completed).toBe(false);
            expect(filteredTodos[0].text).toBe(todos[1].text);
            expect(filteredTodos.length).toBe(todos.length);
        });
    });
});

