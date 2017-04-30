var expect = require('expect');
var actions = require('actions');

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

// Set up the mock store
var createMockStore = configureMockStore([thunk]);

describe('Actions', () => {
    it('should generate searchText action', () => {
        var action = {
            type: 'SET_SEARCH_TEXT',
            searchText: 'Dog',
        };

        var res = actions.setSearchText(action.searchText);

        expect(res).toEqual(action);
    });

    it('should generate add todo action', () => {
        var action = {
            type: 'ADD_TODO',
            todo: {
                id: '123abc',
                text: 'Anything we like',
                completed: false,
                createdAt: 0
            }
        };

        var res = actions.addTodo(action.todo);

        expect(res).toEqual(action);
    });

    it('should create todo and dispatch add todo', (done) => {
        const store = createMockStore({});
        const text = 'Anything will do';

        store.dispatch(actions.startAddTodo(text)).then(() => {
            const actions = store.getActions();
            expect(actions[0]).toInclude({
                type: 'ADD_TODO'
            });
            expect(actions[0].todo).toInclude({text});
            done();
        }).catch(done);
    });

    it('should generate toggle show completed action', () => {
        var action = {
            type: 'TOGGLE_SHOW_COMPLETED'
        };

        var res = actions.toggleShowCompleted();

        expect(res).toEqual(action);
    }); 

    it('should generate toggle todo action', () => {
        var action = {
            type: 'TOGGLE_TODO',
            id: 1,
        };

        var res = actions.toggleTodo(action.id);

        expect(res).toEqual(action);
    }); 

    it('should generate add todos action object', () => {
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

        var res = actions.addTodos(todos);
        expect(res).toEqual(action);
    });
});

