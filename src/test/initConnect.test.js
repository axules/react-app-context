import { checkActions } from '../initConnect';


describe('initConnect', () => {
  describe('checkActions', () => {
    test('should return true for empty value', () => {
      expect(checkActions({})).toBe(true);
    });

    test('should return true for valid actions', () => {
      expect(checkActions({
        add: () => null,
      })).toBe(true);
    });

    test('should throw exception for invalid action - number', () => {
      expect(() => {
        checkActions({ add: 1 });
      }).toThrow('initConnect: "add" should be function, it is "number"');
    });

    test('should throw exception for invalid action - string', () => {
      expect(() => {
        checkActions({ fff: '111234' });
      }).toThrow('initConnect: "fff" should be function, it is "string"');
    });

    test('should throw exception for invalid action - array', () => {
      expect(() => {
        checkActions({ fff: [] });
      }).toThrow('initConnect: "fff" should be function, it is "object"');
    });

    test('should throw exception for invalid action - object', () => {
      expect(() => {
        checkActions({ fff: {} });
      }).toThrow('initConnect: "fff" should be function, it is "object"');
    });
  });
});
