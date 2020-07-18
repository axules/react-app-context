'use strict';

var _initConnect = require('../initConnect');

describe('initConnect', function () {
  describe('checkActions', function () {
    test('should return true for empty value', function () {
      expect((0, _initConnect.checkActions)({})).toBe(true);
    });

    test('should return true for valid actions', function () {
      expect((0, _initConnect.checkActions)({
        add: function add() {
          return null;
        }
      })).toBe(true);
    });

    test('should throw exception for invalid action - number', function () {
      expect(function () {
        (0, _initConnect.checkActions)({ add: 1 });
      }).toThrow('initConnect: "add" should be function, it is "number"');
    });

    test('should throw exception for invalid action - string', function () {
      expect(function () {
        (0, _initConnect.checkActions)({ fff: '111234' });
      }).toThrow('initConnect: "fff" should be function, it is "string"');
    });

    test('should throw exception for invalid action - array', function () {
      expect(function () {
        (0, _initConnect.checkActions)({ fff: [] });
      }).toThrow('initConnect: "fff" should be function, it is "object"');
    });

    test('should throw exception for invalid action - object', function () {
      expect(function () {
        (0, _initConnect.checkActions)({ fff: {} });
      }).toThrow('initConnect: "fff" should be function, it is "object"');
    });
  });
});