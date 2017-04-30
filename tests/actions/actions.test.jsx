var expect = require('expect');
var actions = require('actions');

import firebase, {firebaseRef} from 'app/firebase/';
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
            type: 'UPDATE_TODO',
            id: 1,
            updates: {completed: false}
        };

        var res = actions.updateTodo(action.id, action.updates);

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

    describe('tests with firebase todos', () => {
        var testTodoRef;

        beforeEach((done) => {
            testTodoRef = firebaseRef.child('todos').push();

            testTodoRef.set({
                text: 'Something to do',
                createdAt: 3234234234,
                completed: false
            }).then(() => done());
        });

        afterEach((done) => {
            testTodoRef.remove().then(() => done());
        });

        it('should toggle todo and dispatch update todo action', (done) => {
            const store = createMockStore({});
            const action = actions.startToggleTodo(testTodoRef.key, true);

            store.dispatch(action).then(() => {
                const mockActions = store.getActions();

                expect(mockActions[0]).toInclude({
                    type: 'UPDATE_TODO',
                    id: testTodoRef.key,
                });
                expect(mockActions[0].updates).toInclude({
                    completed: true
                });
                expect(mockActions[0].updates.completedAt).toExist();
                done();
                
            }, done);
        });
    });
});

