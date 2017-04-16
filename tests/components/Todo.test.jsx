var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');

var Todo = require('Todo');

describe('Todo', () => {
    it('should exist', () => {
        expect(Todo).toExist();
    });

    it('should call prop onToggle with id when text is clicked', () => {
        var todoData = {
            id: 11,
            text: 'Test features',
            completed: false
        };

        var spy = expect.createSpy();
        var todo = TestUtils.renderIntoDocument(<Todo {...todoData} onToggle={spy} />);
        var $el = $(ReactDOM.findDOMNode(todo));

        // Click event on the root element -> $el[0]
        TestUtils.Simulate.click($el[0]);
        expect(spy).toHaveBeenCalledWith(todoData.id);
    });
});