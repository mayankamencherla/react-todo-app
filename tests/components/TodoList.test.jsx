var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');

import ConnectedTodoList, {TodoList} from 'TodoList';
import ConnectedTodo, {Todo} from 'Todo';
import {configure} from 'configureStore';

var {Provider} = require('react-redux');

describe('TodoList', () => {
    it('should exist', () => {
        expect(TodoList).toExist();
    });

    it('should render 3 Todo for 3 Todo items', () => {
        var todos = [
            {
                id: 1,
                text: "Walk the dog",
                completed: false,
                completedAt: undefined,
                createdAt: 500,
            },
            {
                id: 2,
                text: "Clean the yard",
                completed: false,
                completedAt: undefined,
                createdAt: 6500,
            },
            {
                id: 3,
                text: "Make a protein shake",
                completed: false,
                completedAt: undefined,
                createdAt: 7500,
            }
        ];

        // Setting initial state
        var store = configure({todos});

        // Creating the provider to render default todoList component
        var provider = TestUtils.renderIntoDocument(
            <Provider store={store}>
                <ConnectedTodoList />  
            </Provider>
        )

        // Getting the todoList component
        var todoList = TestUtils.scryRenderedComponentsWithType(provider, ConnectedTodoList)[0];
        // Getting the todos from the todoList
        var todosComponents = TestUtils.scryRenderedComponentsWithType(todoList, ConnectedTodo);

        // Expect that the lengths are equal
        expect(todosComponents.length).toBe(todos.length);
    });

    it('should render message when there are no todos', () => {
        var todos = [];

        var todolist = TestUtils.renderIntoDocument(<TodoList todos={todos} />);
        var $el = $(ReactDOM.findDOMNode(todolist));

        expect($el.find('.container__message').length).toBe(1);
    });
});