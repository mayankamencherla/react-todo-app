var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');

var TodoList = require('TodoList');
var Todo = require('Todo');

describe('TodoList', () => {
    it('should exist', () => {
        expect(TodoList).toExist();
    });

    it('should render 3 Todo for 3 Todo items', () => {
        var todos = [
            {
                id: 1,
                text: "Walk the dog"
            },
            {
                id: 2,
                text: "Clean the yard"
            },
            {
                id: 3,
                text: "Make a protein shake"
            }
        ];

        var todolist = TestUtils.renderIntoDocument(<TodoList todos={todos} />);
        var todosComponents = TestUtils.scryRenderedComponentsWithType(todolist, Todo);

        expect(todosComponents.length).toBe(todos.length);
    });

    it('should render message when there are no todos', () => {
        var todos = [];

        var todolist = TestUtils.renderIntoDocument(<TodoList todos={todos} />);
        var $el = $(ReactDOM.findDOMNode(todolist));

        expect($el.find('.container__message').length).toBe(1);
    });
});