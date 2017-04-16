var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');

var AddTodo = require('AddTodo');

describe('AddTodo', () => {
    it('should exist', () => {
        expect(AddTodo).toExist();
    });

    it('should call spy if valid todo entered', () => {
        var todo = 'Walk the dog';
        var spy = expect.createSpy();
        var addTodo = TestUtils.renderIntoDocument(<AddTodo onNewTodo={spy} />);
        var $el = $(ReactDOM.findDOMNode(addTodo));

        addTodo.refs.todo.value = todo;
        TestUtils.Simulate.submit($el.find('form')[0]);

        expect(spy).toHaveBeenCalledWith(todo);
    });

    it('should not call spy if invalid todo entered', () => {
        var spy = expect.createSpy();
        var addTodo = TestUtils.renderIntoDocument(<AddTodo onNewTodo={spy} />);
        var $el = $(ReactDOM.findDOMNode(addTodo));

        addTodo.refs.todo.value = '';
        TestUtils.Simulate.submit($el.find('form')[0]);

        expect(spy).toNotHaveBeenCalled();
    });
});