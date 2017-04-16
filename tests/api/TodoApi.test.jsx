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
});

