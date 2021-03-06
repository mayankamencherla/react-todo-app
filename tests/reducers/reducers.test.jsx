var expect = require('expect');
var df = require('deep-freeze-strict');
var reducers = require('reducers');

describe('Reducers', () => {
    describe('searchTextReducer', () => {
        it('should set search text', () => {
            var action = {
                type: 'SET_SEARCH_TEXT',
                searchText: 'Walk the dogs'
            };

            var res = reducers.searchTextReducer(df(''), df(action));

            expect(res).toBe(action.searchText);
        });

        it('should not set search text', () => {
            var action = {
                type: 'GET_SEARCH_TEXT',
                searchText: 'Walk the dogs'
            };

            var res = reducers.searchTextReducer(df(''), df(action));

            expect(res).toBe('');
        });
    });

    describe('showCompletedReducer', () => {
        it('should toggle show completed state', () => {
            var action = {
                type: 'TOGGLE_SHOW_COMPLETED'
            };

            var res = reducers.showCompletedReducer(df(false), df(action));
            expect(res).toBe(true);

            var res = reducers.showCompletedReducer(df(true), df(action));
            expect(res).toBe(false);
        });

        it('should not toggle show completed state', () => {
            var action = {
                type: 'GOGGLE_SHOW_COMPLETED'
            };

            var res = reducers.showCompletedReducer(false, action);
            expect(res).toBe(false);

            var res = reducers.showCompletedReducer(true, action);
            expect(res).toBe(true);
        });
    });

    describe('todosReducer', () => {
        it('should add new todo', () => {
            var action = {
                type: 'ADD_TODO',
                todo: {
                    id: 'abc123',
                    text: 'Something to do',
                    completed: false,
                    createdAt: 124232323,
                },
            };

            var res = reducers.todosReducer(df([]), df(action));
            expect(res.length).toBe(1);
            expect(res[0]).toEqual(action.todo);
        });

        it('should update todo', () => {
            var todos = [{
                id: 'abc123',
                text: 'Something to do',
                completed: false,
                createdAt: 24324234,
                completedAt: null,
            }];

            var updates = {
                completed: true,
                completedAt: 3648726438,
            };

            var action = {
                type: 'UPDATE_TODO',
                id: todos[0].id,
                updates
            };

            var res = reducers.todosReducer(df(todos), df(action));

            expect(res[0].completed).toBe(updates.completed);
            expect(res[0].completedAt).toBe(updates.completedAt);
            expect(res[0].text).toEqual(todos[0].text);
        });

        it('should add todos', () => {
            var todos = [
                {
                    id: 111,
                    text: 'Anything',
                    completed: false,
                    completedAt: undefined,
                    createdAt: 50000
                }
            ];

            var action = {
                type: 'ADD_TODOS',
                todos,
            };

            var res = reducers.todosReducer(df([]), df(action));
            expect(res).toEqual(todos);
        });

        it('should wipe out all todos on logout', () => {
            var todos = [{
                id: 'abc123',
                text: 'Something to do',
                completed: false,
                createdAt: 24324234,
                completedAt: null,
            }];

            var action = {
                type: 'LOGOUT',
            };

            var res = reducers.todosReducer(df(todos), df(action));
            expect(res).toEqual([]);
        });
    });

    describe('authReducer', () => {
        it('should add auth object to state', () => {
            var action = {
                type: 'LOGIN',
                uid: 13342343
            };

            var res = reducers.authReducer(undefined, df(action));
            expect(res.uid).toEqual(action.uid);
        });

        it('should remove auth object from state', () => {
            var action = {
                type: 'LOGOUT'
            };

            var state = {
                uid: 131232
            };

            var res = reducers.authReducer(df(state), df(action));
            expect(res).toEqual({});
        });
    });
});