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
        var uid;
        var todosRef;

        beforeEach((done) => {
            firebase.auth().signInAnonymously().then((user) => {
                uid = user.uid;
                todosRef = firebaseRef.child(`users/${uid}/todos`);

                return todosRef.remove();
            }).then(() => {
                testTodoRef = todosRef.push();

                return testTodoRef.set({
                    text: 'Something to do',
                    createdAt: 3234234234,
                    completed: false
                });
            }).then(() => done())
            .catch(done);
        });

        afterEach((done) => {
            todosRef.remove().then(() => done());
        });

        it('should create todo and dispatch add todo', (done) => {
            const store = createMockStore({auth: {uid}});
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

        it('should toggle todo and dispatch update todo action', (done) => {
            const store = createMockStore({auth: {uid}});
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

        it('should populate todos and dispatch add todos', (done) => {
            const store = createMockStore({auth: {uid}});
            const action = actions.startAddTodos();

            store.dispatch(action).then(() => {
                const mockActions = store.getActions();

                expect(mockActions[0].type).toEqual('ADD_TODOS');
                expect(mockActions[0].todos.length).toEqual(1);
                expect(mockActions[0].todos[0].text).toEqual('Something to do');

                done();
            }, done);
        });

        it('should generate login object', () => {
            var uid = 12323232;

            var action = actions.login(uid);
            expect(action.type).toBe('LOGIN');
            expect(action.uid).toBe(uid);
        });

        it('should generate logout object', () => {
            var action = actions.logout();
            expect(action.type).toBe('LOGOUT');
        });
    });
});

