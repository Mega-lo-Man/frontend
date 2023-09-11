import { validateNameLength, validatePasswordLength } from "./length";

describe('Field length validation', () => {
  describe('Name field', () => {
    let name = '';

    test('a name should fail length validation if it is not set', () => {
      expect(validateNameLength(name)).toEqual(false);
    });

    test('a name should fail length validation if it is less then 2 characters', () => {
      name = 'd';
      expect(validateNameLength(name)).toEqual(false);
    });

    test('a name should pass length validation if it is 2 characters', () => {
      name = 'da';
      expect(validateNameLength(name)).toEqual(true);
    });

    test('a name should fail length validation if it is more then 2 characters', () => {
      name = 'Dag';
      expect(validateNameLength(name)).toEqual(true);
    });
  })

  describe('Password field validation', () => {
    let password = '';

    test('a password should fail length validation if it is not set', () => {
      expect(validatePasswordLength(password)).toEqual(false);
    });

    test('a password should fail length validation if it is less than 6 characters', () => {
      password = '12345';
      expect(validatePasswordLength(password)).toEqual(false);
    });

    test('a password should fail length validation if it is 6 - 20 characters', () => {
      password = '1q2w3e4r5t6y7u8i9o0p';
      expect(validatePasswordLength(password)).toEqual(true);
    });

    test('a password should fail length validation if it is more than 20 characters', () => {
      password = '1q2w3e4r5t6y7u8i9o0py';
      expect(validatePasswordLength(password)).toEqual(false);
    });
  })
})