var React = require('react');
var ReactDOM = require('react-dom');

var {Provider} = require('react-redux');
var configureStore = require('configureStore');
var {TodoList} = require('TodoList');
var TodoApp = require('TodoApp');

var expect = require('expect');
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');

describe('TodoApp', () => {
    it('should exist', () => {
        expect(TodoApp).toExist();
    });

    it('should render todo list', () => {
        var store = configureStore.configure();
        
        var provider = TestUtils.renderIntoDocument(
            <Provider store={store}>
                <TodoApp />
            </Provider>
        );

        var todoapp = TestUtils.scryRenderedComponentsWithType(provider, TodoApp)[0];
        var todolist = TestUtils.scryRenderedComponentsWithType(todoapp, TodoList);

        expect(todolist.length).toEqual(1);
    });
});